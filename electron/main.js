import { app, BrowserWindow, shell, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'electron-updater';
const { autoUpdater } = pkg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure logging
autoUpdater.logger = console;
autoUpdater.autoDownload = false;

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        titleBarStyle: 'hiddenInset', // Premium look on Mac
    });

    // In production, load the local index.html
    // In development, load the Vite dev server
    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    } else {
        win.loadURL('http://localhost:5173');
    }

    // Open external links in default browser
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    return win;
}

app.whenReady().then(() => {
    createWindow();

    // Check for updates
    if (app.isPackaged) {
        autoUpdater.checkForUpdates();
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Auto-update events
autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Update Available',
        message: 'A new version is available. Do you want to download it now?',
        buttons: ['Yes', 'No']
    }).then((result) => {
        if (result.response === 0) {
            autoUpdater.downloadUpdate();
        }
    });
});

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Update Ready',
        message: 'Update downloaded. Application will restart to install.',
        buttons: ['Restart']
    }).then(() => {
        autoUpdater.quitAndInstall();
    });
});

autoUpdater.on('error', (err) => {
    console.error('Auto-update error:', err);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
