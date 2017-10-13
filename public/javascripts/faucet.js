import * as $ from "jquery"

document.write('<script src="' + window.VYNOS_URL + '"></script>')

window.addEventListener("load", function () {
  let displayButton = document.getElementById('display')
  if (displayButton) {
    displayButton.onclick = () => {
      vynos.display()
    }
  }

  $('#request-ether').click(() => {
    $.ajax({
      type: 'POST',
      url: '/faucet/request',
      data: JSON.stringify({address: vynosAddress}),
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
      if (accounts && accounts[0]) {
        window.vynosAddress = accounts[0]
        $('#vynos-address').html(vynosAddress)
        web3.eth.getBalance(vynosAddress, (err, balance) => {
          const vynosBalance = web3.fromWei(balance, 'ether').toString()
          $('#vynos-balance').html(vynosBalance)

        })
      }
    })
  })
});
