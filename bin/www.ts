#!/usr/bin/env node

require('dotenv').config()
import { app } from '../app'
import * as debugModule from 'debug'
let debug = debugModule('temp:server')
import * as http from 'http'

let port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

let server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val: string): string | number | boolean {
  let port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: {syscall: string, code: string}) {
  if (error.syscall !== 'listen') {
    throw error
  }
  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address()
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
