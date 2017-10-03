import * as express from 'express';
export let router = express.Router();
import { web3 } from '../helpers/web'
import { buildERC20Contract } from 'machinomy-contracts'

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction): any => {
  // const addresses = [
  //   '0xc8ebc512fd59a9e9b04233a2178e28aa3e42608d',
  //   '0x5bf66080c92b81173f470e25f9a12fc146278429',
  //   '0xebeab176c2ca2ae72f11abb1cecad5df6ccb8dfe'
  // ]

  // const instanceERC20 = buildERC20Contract('0x8ad5c3cd38676d630b060a09baa40b0a3cb0b4b5')

  // let addrs = addresses.map(async (address)=>{
  //   const balance = web3.fromWei(await web3.eth.getBalance(address), 'ether')
  //   return { address: address, balance: balance}
  // })

  // let addrsERC20 = addresses.map(async (address) => {
  //   let deployedERC20 = await instanceERC20.deployed()
  //   const balance = await deployedERC20.balanceOf(address)
  //   console.log(balance)
  //   return { address: address, balance: balance }
  // })
    
  // Promise.all(addrs).then((addrs) => {
  //   Promise.all(addrsERC20).then((addrsERC20) => {
  //     res.render('admin/wallets', {addrs, addrsERC20})
  //   })
  // })
})