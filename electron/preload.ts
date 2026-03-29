import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  db: {
    getSaveSlots: () => ipcRenderer.invoke('db:getSaveSlots'),
    createSave: (name: string) => ipcRenderer.invoke('db:createSave', name),
    loadSave: (slotId: string) => ipcRenderer.invoke('db:loadSave', slotId),
    saveGame: (slotId: string, data: unknown) => ipcRenderer.invoke('db:saveGame', slotId, data),
    deleteSave: (slotId: string) => ipcRenderer.invoke('db:deleteSave', slotId)
  },
  ai: {
    chat: (messages: unknown[], options?: unknown) => ipcRenderer.invoke('ai:chat', messages, options),
    setProvider: (provider: 'cloud' | 'local', config: unknown) => 
      ipcRenderer.invoke('ai:setProvider', provider, config),
    generateEvent: (context: unknown) => ipcRenderer.invoke('ai:generateEvent', context),
    generateDescription: (type: string, data: unknown) => 
      ipcRenderer.invoke('ai:generateDescription', type, data)
  }
})
