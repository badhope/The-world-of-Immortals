import { contextBridge, ipcRenderer } from "electron";
//#region electron/preload.ts
contextBridge.exposeInMainWorld("electronAPI", {
	db: {
		getSaveSlots: () => ipcRenderer.invoke("db:getSaveSlots"),
		createSave: (name) => ipcRenderer.invoke("db:createSave", name),
		loadSave: (slotId) => ipcRenderer.invoke("db:loadSave", slotId),
		saveGame: (slotId, data) => ipcRenderer.invoke("db:saveGame", slotId, data),
		deleteSave: (slotId) => ipcRenderer.invoke("db:deleteSave", slotId)
	},
	ai: {
		chat: (messages, options) => ipcRenderer.invoke("ai:chat", messages, options),
		setProvider: (provider, config) => ipcRenderer.invoke("ai:setProvider", provider, config),
		generateEvent: (context) => ipcRenderer.invoke("ai:generateEvent", context),
		generateDescription: (type, data) => ipcRenderer.invoke("ai:generateDescription", type, data)
	}
});
//#endregion
