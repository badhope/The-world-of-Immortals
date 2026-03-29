import { BrowserWindow, app, ipcMain } from "electron";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import { existsSync, mkdirSync, readdirSync, statSync } from "fs";
//#region \0rolldown/runtime.js
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, { get: (a, b) => (typeof require !== "undefined" ? require : a)[b] }) : x)(function(x) {
	if (typeof require !== "undefined") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + x + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
//#endregion
//#region electron/database.ts
var DatabaseService = class {
	savesDir;
	constructor(savesDir) {
		this.savesDir = savesDir;
		if (!existsSync(savesDir)) mkdirSync(savesDir, { recursive: true });
	}
	getSaveSlots() {
		const slots = [];
		if (!existsSync(this.savesDir)) return slots;
		const dirs = readdirSync(this.savesDir);
		for (const dir of dirs) {
			const savePath = join(this.savesDir, dir);
			if (statSync(savePath).isDirectory()) {
				const dbPath = join(savePath, "save.db");
				if (existsSync(dbPath)) try {
					const db = new Database(dbPath, { readonly: true });
					const meta = db.prepare("SELECT * FROM meta LIMIT 1").get();
					db.close();
					if (meta) slots.push({
						id: dir,
						name: meta.name || "未命名存档",
						createdAt: meta.created_at,
						updatedAt: meta.updated_at,
						playTime: meta.play_time || 0
					});
				} catch {}
			}
		}
		return slots.sort((a, b) => b.updatedAt - a.updatedAt);
	}
	createSave(name) {
		const id = `save_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
		const savePath = join(this.savesDir, id);
		mkdirSync(savePath, { recursive: true });
		const db = new Database(join(savePath, "save.db"));
		db.exec(`
      CREATE TABLE IF NOT EXISTS meta (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        name TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        play_time INTEGER DEFAULT 0
      );
      
      CREATE TABLE IF NOT EXISTS player (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS world (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS inventory (
        id TEXT PRIMARY KEY,
        item_id TEXT NOT NULL,
        count INTEGER DEFAULT 1,
        data TEXT
      );
      
      CREATE TABLE IF NOT EXISTS buildings (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        location_id TEXT NOT NULL,
        level INTEGER DEFAULT 1,
        data TEXT
      );
      
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        data TEXT,
        timestamp INTEGER NOT NULL
      );
    `);
		const now = Date.now();
		db.prepare("INSERT INTO meta (id, name, created_at, updated_at) VALUES (1, ?, ?, ?)").run(name, now, now);
		db.close();
		return id;
	}
	loadSave(slotId) {
		const dbPath = join(this.savesDir, slotId, "save.db");
		if (!existsSync(dbPath)) throw new Error("存档不存在");
		const db = new Database(dbPath, { readonly: true });
		const playerData = {};
		const playerRows = db.prepare("SELECT key, value FROM player").all();
		for (const row of playerRows) playerData[row.key] = JSON.parse(row.value);
		const worldData = {};
		const worldRows = db.prepare("SELECT key, value FROM world").all();
		for (const row of worldRows) worldData[row.key] = JSON.parse(row.value);
		const inventory = db.prepare("SELECT * FROM inventory").all();
		const buildings = db.prepare("SELECT * FROM buildings").all();
		const events = db.prepare("SELECT * FROM events ORDER BY timestamp DESC LIMIT 100").all();
		db.close();
		return {
			player: playerData,
			world: worldData,
			inventory,
			buildings,
			events
		};
	}
	saveGame(slotId, data) {
		const dbPath = join(this.savesDir, slotId, "save.db");
		if (!existsSync(dbPath)) throw new Error("存档不存在");
		const db = new Database(dbPath);
		const now = Date.now();
		db.prepare("UPDATE meta SET updated_at = ?").run(now);
		if (data.player) {
			const stmt = db.prepare("INSERT OR REPLACE INTO player (key, value) VALUES (?, ?)");
			for (const [key, value] of Object.entries(data.player)) stmt.run(key, JSON.stringify(value));
		}
		if (data.world) {
			const stmt = db.prepare("INSERT OR REPLACE INTO world (key, value) VALUES (?, ?)");
			for (const [key, value] of Object.entries(data.world)) stmt.run(key, JSON.stringify(value));
		}
		if (data.inventory) {
			db.exec("DELETE FROM inventory");
			const stmt = db.prepare("INSERT INTO inventory (id, item_id, count, data) VALUES (?, ?, ?, ?)");
			for (const item of data.inventory) stmt.run(item.id, item.itemId, item.count, JSON.stringify(item.data || {}));
		}
		if (data.buildings) {
			db.exec("DELETE FROM buildings");
			const stmt = db.prepare("INSERT INTO buildings (id, type, location_id, level, data) VALUES (?, ?, ?, ?, ?)");
			for (const building of data.buildings) stmt.run(building.id, building.type, building.locationId, building.level, JSON.stringify(building.data || {}));
		}
		db.close();
		return true;
	}
	deleteSave(slotId) {
		const savePath = join(this.savesDir, slotId);
		if (!existsSync(savePath)) return false;
		const { rmSync } = __require("fs");
		rmSync(savePath, {
			recursive: true,
			force: true
		});
		return true;
	}
};
//#endregion
//#region electron/ai.ts
var AIService = class {
	config = null;
	setProvider(provider, config) {
		this.config = {
			provider,
			...config
		};
		return true;
	}
	async chat(messages, options) {
		if (!this.config) throw new Error("AI 未配置");
		if (this.config.provider === "cloud") return this.chatCloud(messages, options);
		else return this.chatLocal(messages, options);
	}
	async chatCloud(messages, options) {
		const { apiKey, baseUrl, model } = this.config.cloud;
		const response = await fetch(`${baseUrl || "https://api.openai.com/v1"}/chat/completions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model,
				messages,
				temperature: options?.temperature ?? .7
			})
		});
		if (!response.ok) throw new Error(`AI 请求失败: ${response.statusText}`);
		return (await response.json()).choices[0].message.content;
	}
	async chatLocal(messages, options) {
		const { baseUrl, model } = this.config.local;
		const response = await fetch(`${baseUrl}/api/chat`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				model,
				messages,
				stream: false,
				options: { temperature: options?.temperature ?? .7 }
			})
		});
		if (!response.ok) throw new Error(`本地 AI 请求失败: ${response.statusText}`);
		return (await response.json()).message.content;
	}
	async generateEvent(context) {
		const systemPrompt = `你是一个修仙世界的游戏事件生成器。根据玩家当前的状态和位置，生成一个有趣的游戏事件。
事件应该包含：
- title: 事件标题（简短）
- description: 事件描述（详细，有画面感）
- choices: 玩家可选的行动列表（数组，每个选项包含 text 和 effects）
- effects: 每个选项可能带来的后果（正面或负面）

请以 JSON 格式返回，不要包含其他内容。`;
		const userPrompt = `当前位置：${context.location || "未知"}
玩家状态：${JSON.stringify(context.playerState || {})}
最近行动：${context.recentActions?.join("、") || "无"}
世界状态：${JSON.stringify(context.worldState || {})}`;
		try {
			const response = await this.chat([{
				role: "system",
				content: systemPrompt
			}, {
				role: "user",
				content: userPrompt
			}], { temperature: .8 });
			return JSON.parse(response);
		} catch (error) {
			console.error("生成事件失败:", error);
			return this.getDefaultEvent();
		}
	}
	async generateDescription(type, data) {
		const prompt = {
			location: `描述一个修仙世界的${data.type || "地点"}，名为"${data.name}"。要求有画面感，包含环境、氛围、可能的机缘。字数100-200字。`,
			item: `描述一件修仙物品"${data.name}"，类型为${data.type || "未知"}。要求描述其外观、功效、来历。字数50-100字。`,
			npc: `描述一个修仙者"${data.name}"，境界为${data.realm || "未知"}。要求描述其外貌、气质、性格特点。字数80-150字。`,
			skill: `描述一门修仙功法"${data.name}"。要求描述其特点、修炼难度、威力。字数50-100字。`
		}[type] || `描述一个${type}：${JSON.stringify(data)}`;
		try {
			return await this.chat([{
				role: "user",
				content: prompt
			}], { temperature: .7 });
		} catch (error) {
			console.error("生成描述失败:", error);
			return data.name || "未知";
		}
	}
	getDefaultEvent() {
		const events = [{
			title: "灵气波动",
			description: "你感受到前方有一股奇异的灵气波动，似乎有什么东西在等待着你。",
			choices: [
				{
					text: "上前探查",
					effects: {
						spirit: 10,
						risk: "low"
					}
				},
				{
					text: "绕道而行",
					effects: { safe: true }
				},
				{
					text: "静观其变",
					effects: { insight: 5 }
				}
			]
		}, {
			title: "偶遇修士",
			description: "一位路过的修士向你点头致意，似乎有话要说。",
			choices: [
				{
					text: "上前搭话",
					effects: { social: 1 }
				},
				{
					text: "点头回礼",
					effects: { karma: 1 }
				},
				{
					text: "无视离开",
					effects: {}
				}
			]
		}];
		return events[Math.floor(Math.random() * events.length)];
	}
};
//#endregion
//#region electron/main.ts
var __dirname = dirname(fileURLToPath(import.meta.url));
var mainWindow = null;
var db = null;
var ai = null;
var VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 800,
		minWidth: 1024,
		minHeight: 768,
		webPreferences: {
			preload: join(__dirname, "preload.js"),
			contextIsolation: true,
			nodeIntegration: false
		},
		title: "修仙世界",
		show: false
	});
	mainWindow.once("ready-to-show", () => {
		mainWindow?.show();
	});
	if (VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(VITE_DEV_SERVER_URL);
		mainWindow.webContents.openDevTools();
	} else mainWindow.loadFile(join(__dirname, "../dist/index.html"));
}
app.whenReady().then(() => {
	db = new DatabaseService(join(app.getPath("userData"), "saves"));
	ai = new AIService();
	registerIPC();
	createWindow();
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
function registerIPC() {
	ipcMain.handle("db:getSaveSlots", async () => {
		return db?.getSaveSlots() ?? [];
	});
	ipcMain.handle("db:createSave", async (_, name) => {
		return db?.createSave(name);
	});
	ipcMain.handle("db:loadSave", async (_, slotId) => {
		return db?.loadSave(slotId);
	});
	ipcMain.handle("db:saveGame", async (_, slotId, data) => {
		return db?.saveGame(slotId, data);
	});
	ipcMain.handle("db:deleteSave", async (_, slotId) => {
		return db?.deleteSave(slotId);
	});
	ipcMain.handle("ai:chat", async (_, messages, options) => {
		return ai?.chat(messages, options);
	});
	ipcMain.handle("ai:setProvider", async (_, provider, config) => {
		return ai?.setProvider(provider, config);
	});
	ipcMain.handle("ai:generateEvent", async (_, context) => {
		return ai?.generateEvent(context);
	});
	ipcMain.handle("ai:generateDescription", async (_, type, data) => {
		return ai?.generateDescription(type, data);
	});
}
//#endregion
