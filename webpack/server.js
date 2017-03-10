import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack-dev.js';
import { spawn } from 'child_process';

const PORT = process.env.PORT || 3000;
const ROOT = path.join( `${__dirname}/../` );

const app = express();
const compiler = webpack( config );
const argv = require ( 'minimist' )( process.argv.slice( 2 ) );

// inject the webpack middleware modules into the server
const wdm = webpackDevMiddleware( compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: 'errors-only'
});

app.use( wdm );
app.use( webpackHotMiddleware( compiler ) );

// start the server!
const server = app.listen( PORT, 'localhost', err => {
  if( err ) {
    console.error( err );
    return;
  }

  // are we also starting electron?
  if( argv[ 'dev-electron' ] ) {
    spawn( 'npm', [ 'run', 'start:dev-electron' ], {
      shell: true,
      env: process.env,
      stdio: 'inherit'
    })
    .on( 'close', code => process.exit( code ) )
    .on( 'error', spawnError => console.error( spawnError ) );
  }

  console.log( `Listening at http://localhost:${PORT}` );
});

// we need to handle exiting the server since we're spawning a process above
// depending on the arguments passed
process.on( 'SIGTERM', () => {
  console.log( 'Stopping dev server' );

  wdm.close();
  server.close( () => process.exit( 0 ) );
});