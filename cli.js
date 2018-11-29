#!/usr/bin/env node
const net = require('net')
const argv = require('minimist')(process.argv)
const CabalIRC = require('.')
const {join} = require('path')

var usage = `Usage
  cabal-irc cabal://key
  cabal-irc --db=/path/to/previously_created_folder

  Options:
    --db      Resume a previously created session.
    --key     Specify a cabal key.
    --host    Host/Address to use for incoming IRC-connections.
    --port    Port to listen for incoming IRC-connections.
    --help    Prints this message.
`

// Process arguments
let {db, key, host, port, help} = argv

// Priint usage and exit
if (help) {
  process.stderr.write(usage)
  process.exit(1)
}



// Load configuration from environment for docker-friendlyness
if (!key)   key = process.env.CABAL_KEY || null
if (!db)    db = process.env.CABAL_DB
if (!host)  host = process.env.CABAL_HOST || '127.0.0.1'
if (!port)  port = process.env.CABAL_PORT || 6667

// Strip out URL-components from keystring if availble
// TODO: Might be safer to use `new URL(key).getHost()`
if (key) key = key.replace(/^(cabal|cbl|dat):\/\//,'').replace(/\//g, '')

// If we've been provided a key but not a storage,
// then default storage to ~/.cabal/PUBKEY
if (!db && key) {

  let homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE
  let rootdir = process.env.CABAL_STORE || join(homedir, '/.cabal/archives/')
  db = join(rootdir, key)
}else if (!db && !key) {
  process.stderr.write(usage)
  process.exit(1)
}
// Initialize new instance of CabalIRC
const cabal = new CabalIRC(db, key, argv)

// Create and bind tcp-server
var server = net.createServer(function (socket) {
  cabal.listen(socket)
  console.log('Irc client-connected', socket.remoteAddress, socket.remotePort)
})

server.listen(6667, '127.0.0.1', function () {
  console.log(`listening on port ${host}:${port}`)
})
