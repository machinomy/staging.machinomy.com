"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
exports.router = express.Router();
var machinomy = require('machinomy');
var settings = machinomy.configuration.receiver();
var config = require('config');
var web3 = machinomy.configuration.web3();
web3.personal.unlockAccount(settings.account, settings.password, 10000000);
var FAUCET_ACCOUNT = config.get('FAUCET_ACCOUNT');
var FAUCET_PASSWORD = config.get('FAUCET_PASSWORD');
web3.personal.unlockAccount(FAUCET_ACCOUNT, FAUCET_PASSWORD, 10000000);
// let balance =  web3.fromWei(web3.eth.getBalance(FAUCET_ACCOUNT))
exports.router.get('/faucet', function (req, res, next) {
    res.sendFile('./views/faucet.html', { root: '.' });
});
exports.router.post('/api/request', function (req, res, next) {
    var callFaucet = function (address, callback) {
        web3.eth.sendTransaction({ from: FAUCET_ACCOUNT, to: address, value: web3.toWei(0.01, 'ether') }, callback);
    };
    var address = req.body.address;
    console.log('address');
    console.log(address);
    if (address) {
        callFaucet(address, function (err, txid) {
            if (err) {
                console.log(err);
                res.writeHead(500);
                res.end();
            }
            else {
                res.json({ txid: txid });
            }
        });
    }
    else {
        res.writeHead(400, 'No Address');
        res.end();
    }
});
