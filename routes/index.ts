import * as express from 'express';
export let router = express.Router();
const machinomy = require('machinomy');
// console.log(machinomy);
// const settings = machinomy.configuration.receiver()
const config = require('config');
// let web3 = machinomy.configuration.web3()

import Web3 = require("web3")
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
// web3.personal.unlockAccount(settings.account, settings.password, 10000000)

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
