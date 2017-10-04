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
    console.log(instance)
    let provider = instance.provider
    let web3 = new Web3(provider)
    web3.eth.getAccounts((err, accounts) => {
      const vynosAddress = accounts[0]
      const vynosBalance = web3.fromWei(web3.eth.getBalance(accounts), 'ether')
      $('#vynos-address').html(vynosAddress)
      $('#vynos-balance').html(vynosBalance)
    })
  })
});
