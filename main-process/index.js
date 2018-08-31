// @flow
import { app, BrowserWindow } from 'electron';
import path from 'path';
import minimist from 'minimist';

import ipc from './ipc';

export default () => {
  // configure command line args
  const args = minimist( process.argv.slice( 2 ), {
    boolean: [ 'dev-console' ]
  });

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  const windowList: Array<BrowserWindow> = [];

  // Declare url and options for the main window
  const ROOT = path.join( __dirname, '../' );

  const mainWin = {
    URL: `file://${ROOT}/renderer-process/windows/splash/index.html`,
    OPTS: {
      titleBarStyle: 'hidden',
      backgroundColor: '#000000',
      minWidth: 800,
      minHeight: 600,
      maximizable: false
    }
  };

  function createWindow(
    url: string,
    options: Object,
    onClose: Function | void = undefined
  ): BrowserWindow {
    // Create the browser window.
    // https://github.com/electron/electron/blob/master/docs/api/browser-window.md
    // https://github.com/electron/electron/blob/master/docs/api/frameless-window.md
    let win = new BrowserWindow( options );
    win.loadURL( url );

    // open dev tools if provided via cli args
    if( args[ 'dev-console' ] ) {
      win.openDevTools();
    }

    // Emitted when the window is closed.
    win.on( 'closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
    });

    return win;
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on( 'ready', () => {
    ipc();
    windowList.push( createWindow( mainWin.URL, mainWin.OPTS ) );
  });

  // Quit when all windows are closed.
  app.on( 'window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if( process.platform !== 'darwin' ) {
      app.quit();
    }
  });

  app.on( 'activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // TODO: but which one?
    if( windowList.length === 0 ) {
      windowList.push( createWindow( mainWin.URL, mainWin.OPTS ) );
    }
  });
};
