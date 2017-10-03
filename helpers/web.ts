import Web3 = require("web3")

interface GethConf {
  host: string;
  port: string;
}

let geth_config: GethConf = { host: 'localhost', port: '8545' }
try {
  if (process.env.GETH_CONFIG){
    geth_config = require(process.env.GETH_CONFIG)
  }
} catch (e) {
  console.log('config file read error')
}

const geth_host = geth_config.host
const geth_port = geth_config.port

let web3 = new Web3(new Web3.providers.HttpProvider(`http://${geth_host}:${geth_port}`))

export {web3}