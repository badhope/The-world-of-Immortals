import Database from 'better-sqlite3'
import { join } from 'path'
import { mkdirSync, existsSync, readdirSync, statSync } from 'fs'

export interface SaveSlot {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  playTime: number
}

export class DatabaseService {
  private savesDir: string

  constructor(savesDir: string) {
    this.savesDir = savesDir
    if (!existsSync(savesDir)) {
      mkdirSync(savesDir, { recursive: true })
    }
  }

  getSaveSlots(): SaveSlot[] {
    const slots: SaveSlot[] = []
    
    if (!existsSync(this.savesDir)) {
      return slots
    }

    const dirs = readdirSync(this.savesDir)
    for (const dir of dirs) {
      const savePath = join(this.savesDir, dir)
      const stat = statSync(savePath)
      
      if (stat.isDirectory()) {
        const dbPath = join(savePath, 'save.db')
        if (existsSync(dbPath)) {
          try {
            const db = new Database(dbPath, { readonly: true })
            const meta = db.prepare('SELECT * FROM meta LIMIT 1').get() as any
            db.close()
            
            if (meta) {
              slots.push({
                id: dir,
                name: meta.name || '未命名存档',
                createdAt: meta.created_at,
                updatedAt: meta.updated_at,
                playTime: meta.play_time || 0
              })
            }
          } catch {
            // 跳过损坏的存档
          }
        }
      }
    }

    return slots.sort((a, b) => b.updatedAt - a.updatedAt)
  }

  createSave(name: string): string {
    const id = `save_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const savePath = join(this.savesDir, id)
    mkdirSync(savePath, { recursive: true })

    const db = new Database(join(savePath, 'save.db'))
    
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
    `)

    const now = Date.now()
    db.prepare('INSERT INTO meta (id, name, created_at, updated_at) VALUES (1, ?, ?, ?)').run(name, now, now)
    db.close()

    return id
  }

  loadSave(slotId: string): any {
    const dbPath = join(this.savesDir, slotId, 'save.db')
    if (!existsSync(dbPath)) {
      throw new Error('存档不存在')
    }

    const db = new Database(dbPath, { readonly: true })
    
    const playerData: Record<string, any> = {}
    const playerRows = db.prepare('SELECT key, value FROM player').all() as any[]
    for (const row of playerRows) {
      playerData[row.key] = JSON.parse(row.value)
    }

    const worldData: Record<string, any> = {}
    const worldRows = db.prepare('SELECT key, value FROM world').all() as any[]
    for (const row of worldRows) {
      worldData[row.key] = JSON.parse(row.value)
    }

    const inventory = db.prepare('SELECT * FROM inventory').all() as any[]
    const buildings = db.prepare('SELECT * FROM buildings').all() as any[]
    const events = db.prepare('SELECT * FROM events ORDER BY timestamp DESC LIMIT 100').all() as any[]

    db.close()

    return {
      player: playerData,
      world: worldData,
      inventory,
      buildings,
      events
    }
  }

  saveGame(slotId: string, data: any): boolean {
    const dbPath = join(this.savesDir, slotId, 'save.db')
    if (!existsSync(dbPath)) {
      throw new Error('存档不存在')
    }

    const db = new Database(dbPath)
    
    const now = Date.now()
    db.prepare('UPDATE meta SET updated_at = ?').run(now)

    if (data.player) {
      const stmt = db.prepare('INSERT OR REPLACE INTO player (key, value) VALUES (?, ?)')
      for (const [key, value] of Object.entries(data.player)) {
        stmt.run(key, JSON.stringify(value))
      }
    }

    if (data.world) {
      const stmt = db.prepare('INSERT OR REPLACE INTO world (key, value) VALUES (?, ?)')
      for (const [key, value] of Object.entries(data.world)) {
        stmt.run(key, JSON.stringify(value))
      }
    }

    if (data.inventory) {
      db.exec('DELETE FROM inventory')
      const stmt = db.prepare('INSERT INTO inventory (id, item_id, count, data) VALUES (?, ?, ?, ?)')
      for (const item of data.inventory) {
        stmt.run(item.id, item.itemId, item.count, JSON.stringify(item.data || {}))
      }
    }

    if (data.buildings) {
      db.exec('DELETE FROM buildings')
      const stmt = db.prepare('INSERT INTO buildings (id, type, location_id, level, data) VALUES (?, ?, ?, ?, ?)')
      for (const building of data.buildings) {
        stmt.run(building.id, building.type, building.locationId, building.level, JSON.stringify(building.data || {}))
      }
    }

    db.close()
    return true
  }

  deleteSave(slotId: string): boolean {
    const savePath = join(this.savesDir, slotId)
    if (!existsSync(savePath)) {
      return false
    }

    const { rmSync } = require('fs')
    rmSync(savePath, { recursive: true, force: true })
    return true
  }
}
