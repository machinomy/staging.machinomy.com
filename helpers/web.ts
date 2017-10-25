import Web3 = require("web3")
const config = require('config')

const ETHEREUM_API = config.get('ETHEREUM_API')

let web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_API))

export {web3}