import * as express from 'express';
export let router = express.Router();
import Web3 = require("web3")

const config = require('config');

interface GethConf {
  host: string;
  port: string;
}
let config_geth:GethConf = {host: 'localhost', port: '8545'}
try {
  config_geth = require('~/.staging/config_geth.json')
} catch (e) {
  console.log('config file read error')
}

const geth_host = config_geth.host
const geth_port = config_geth.port
let web3 = new Web3(new Web3.providers.HttpProvider(`http://${geth_host}:${geth_port}`))

const FAUCET_ACCOUNT = config.get('FAUCET_ACCOUNT')
const FAUCET_PASSWORD = config.get('FAUCET_PASSWORD')
web3.personal.unlockAccount(FAUCET_ACCOUNT, FAUCET_PASSWORD, 10000000)

router.get('/faucet', (req: express.Request, res: express.Response, next: express.NextFunction):any => {
  res.sendFile('./views/faucet.html', { root: '.' })
});

router.post('/faucet/request', function(req: express.Request, res: express.Response, next: express.NextFunction) {
    let callFaucet = (address: string, callback: (err: Error, value: string) => void) => {
      web3.eth.sendTransaction({from: FAUCET_ACCOUNT, to: address, value: web3.toWei(0.01, 'ether')}, callback)
    }
    let address = req.body.address
    if (address) {
      callFaucet(address, function (err: any, txid: string) {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end();
        } else {
          res.json({txid: txid})
        }
      })
    } else {
      res.writeHead(400, 'No Address')
      res.end()
    }
});
