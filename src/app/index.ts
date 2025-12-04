import path from 'node:path';
import { app, BrowserWindow } from 'electron';
import {application} from 'express'

const createWindow = (): void => {
    const mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    // Start express server or other background processes here
    application.listen(3000, "127.0.0.1", () => {
        console.log('Express server listening on port 3000');
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});