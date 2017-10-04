import * as $ from "jquery"

window.addEventListener("load", function () {
  $('#request-ether').click(() => {
    $.ajax({
      type: 'POST',
      url: '/faucet/request',
      data: JSON.stringify({address: ynosAddress}),
      contentType: 'application/json',
      success: (data) => {
        let txid = data.txid;
        let etherscanUrl = 'https://ropsten.etherscan.io/tx/' + txid;
        $('#faucet-transactions').append('<li><a href="'+ etherscanUrl +'">' + txid + '</a></li>')
      }
    })
  })

  vynos.ready().then(instance => {
    let provider = instance.provider
    let web3 = new Web3(provider)
    web3.eth.getAccounts((err, accounts) => {
      const vynosAddress = accounts[0]
      $('#vynos-address').html(vynosAddress)
      web3.eth.getBalance(vynosAddress, (err, balance) => {
        const vynosBalance = web3.fromWei(balance, 'ether').toString()
        $('#vynos-balance').html(vynosBalance)

      })
    })
  })
});
