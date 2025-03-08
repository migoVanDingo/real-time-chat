// electron/main.js (or main.mjs)
import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Since we are using `nodeIntegration`, make sure contextIsolation is false.
    }
  });

  // This will point to the Vite dev server (if you're in dev mode)
  mainWindow.loadURL('http://localhost:5173'); // Adjust if you're running Vite on a different port

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
