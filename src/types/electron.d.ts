import { SaveSlot } from '../electron/database'

declare global {
  interface Window {
    electronAPI: {
      db: {
        getSaveSlots: () => Promise<SaveSlot[]>
        createSave: (name: string) => Promise<string>
        loadSave: (slotId: string) => Promise<any>
        saveGame: (slotId: string, data: any) => Promise<boolean>
        deleteSave: (slotId: string) => Promise<boolean>
      }
      ai: {
        chat: (messages: any[], options?: any) => Promise<string>
        setProvider: (provider: 'cloud' | 'local', config: any) => Promise<boolean>
        generateEvent: (context: any) => Promise<any>
        generateDescription: (type: string, data: any) => Promise<string>
      }
    }
  }
}

export {}
