import { app, BrowserWindow, ipcMain } from 'electron'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { DatabaseService } from './database'
import { AIService } from './ai'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let mainWindow: BrowserWindow | null = null
let db: DatabaseService | null = null
let ai: AIService | null = null

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    title: '修仙世界',
    show: false
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  const userDataPath = app.getPath('userData')
  db = new DatabaseService(join(userDataPath, 'saves'))
  ai = new AIService()
  
  registerIPC()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function registerIPC() {
  ipcMain.handle('db:getSaveSlots', async () => {
    return db?.getSaveSlots() ?? []
  })

  ipcMain.handle('db:createSave', async (_, name: string) => {
    return db?.createSave(name)
  })

  ipcMain.handle('db:loadSave', async (_, slotId: string) => {
    return db?.loadSave(slotId)
  })

  ipcMain.handle('db:saveGame', async (_, slotId: string, data: unknown) => {
    return db?.saveGame(slotId, data)
  })

  ipcMain.handle('db:deleteSave', async (_, slotId: string) => {
    return db?.deleteSave(slotId)
  })

  ipcMain.handle('ai:chat', async (_, messages: unknown[], options?: unknown) => {
    return ai?.chat(messages as any[], options as any)
  })

  ipcMain.handle('ai:setProvider', async (_, provider: 'cloud' | 'local', config: unknown) => {
    return ai?.setProvider(provider, config as any)
  })

  ipcMain.handle('ai:generateEvent', async (_, context: unknown) => {
    return ai?.generateEvent(context as any)
  })

  ipcMain.handle('ai:generateDescription', async (_, type: string, data: unknown) => {
    return ai?.generateDescription(type, data)
  })
}
