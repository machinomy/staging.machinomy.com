import {Payment, PaymentChannel} from "machinomy/lib/channel";
import Web3 = require("web3")
import * as $ from "jquery"

type YnosPayInChannelResponse = {
  channel: PaymentChannel
  payment: Payment
}

interface Ynos {
  getAccount: () => Promise<string>
  openChannel: (receiverAccount: string, channelValue: BigNumber.BigNumber) => Promise<PaymentChannel>
  depositToChannel: (ch: PaymentChannel) => Promise<PaymentChannel>
  closeChannel: (ch: PaymentChannel) => Promise<PaymentChannel>;
  listChannels: () => Promise<Array<PaymentChannel>>;
  makePayment: () => void // web3.eth.sendTransaction
  payInChannel: (ch: PaymentChannel, amount: number) => Promise<YnosPayInChannelResponse> // FIXME What about lifecycle events? Amount is bignumber, actually.
  initAccount: () => Promise<void>
  initFrame: (frame?: HTMLIFrameElement) => Promise<void>
  getWeb3(): Promise<Web3>
}

let ynosAddress:String
declare var ynos:Ynos

window.addEventListener("load", function () {
  $('#request-ether').click(() => {
    $.ajax({
      type: 'POST',
      url: '/faucet/request',
      data: JSON.stringify({address: ynosAddress}),
      contentType: 'application/json',
      success: (data: any) => {
        let txid = data.txid;
        let etherscanUrl = 'https://ropsten.etherscan.io/tx/' + txid;
        $('#faucet-transactions').append('<li><a href="'+ etherscanUrl +'">' + txid + '</a></li>')
      }
    })
  })

  ynos.initFrame().then(() => {
    return ynos.initAccount()
  }).then(() => {
    return ynos.getAccount()
  }).then(address => {
    ynosAddress = address
    let span = document.getElementById("account_address")
    if (span) {
      let p = span
      let a = document.createElement("a")
      a.href = "https://ropsten.etherscan.io/address/" + address.replace(/0x/, '')
      a.text = address
      let arr: Array<HTMLElement> = [].slice.call(p.childNodes);
      arr.forEach(element => {
        p.removeChild(element)
      })
      p.appendChild(a)
    }
  }).catch(error => {
    console.log(error)
  })
});
