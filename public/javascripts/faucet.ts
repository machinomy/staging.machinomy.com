"use strict";

window.addEventListener("load", function () {
  $('#request-ether').click(() => {
    $.ajax({
      type: 'POST',
      url: '/api/request',
      data: JSON.stringify({address: window.address}),
      contentType: 'application/json',
      success: (data: any) => {
        let txid = data.txid;
        let etherscanUrl = 'https://ropsten.etherscan.io/tx/' + txid;
        $('#faucet-transactions').append('<li><a href="'+ etherscanUrl +'">' + txid + '</a></li>')
      }
    })
  })

  let ynos = window.ynos
  ynos.initFrame().then(() => {
    return ynos.initAccount()
  }).then(() => {
    return ynos.getAccount()
  }).then(address => {
    window.address = address
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
