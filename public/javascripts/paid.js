var template = require("./channels.handlebars");

let loadContent = (token) => {
  $.ajax({
    type: 'GET',
    url: "/paid/content",
    headers: {
      authorization: `paywall ${token}`
    }
  }).done((data) => {
    $("#content").html(data);
  })
}
    
let displayButton = document.getElementById('display')
if (displayButton) {
  displayButton.onclick = () => {
    vynos.display()
  }
}

let buyButton = document.getElementById('buy')
if (buyButton) {
  buyButton.onclick = () => {
    console.log('beforeBuy')
    vynos.ready().then(wallet => {
      let title = 'Outline'
      let receiver = '0x508e6569182e0aab365cb9e91f7638fbe34c82fe'
      let amount = 1000
      let gateway = 'https://hub.machinomy.com/machinomy'
      console.log('wallet')
      console.log(wallet)
      return wallet.buy(title, receiver, amount, gateway)
    }).then(result => {
      loadContent(result.token)
      channelsBalance()
      console.log('Result: ', result)
      buyButton.style.display = 'hidden'
    }).catch(err => {
      console.log('Err: ', err)
    })
  }

}

channelsBalance = () => {
  vynos.ready().then(wallet => {
    wallet.listChannels().then((channels) => {
      let balance = 0
      channels.forEach((ch) => {
        console.log(228)
        console.log(ch)
        console.log(ch.value)
        console.log(ch.spend)
        balance += ch.value - ch.spent
      });
      $('#channels-balance').html(balance)
    }).catch(err => {
      console.log('Err: ', err)
    })
  })
}

channels = () => {
  vynos.ready().then(wallet => {
    wallet.listChannels().then((channels)=>{
      console.log(channels)
      var html = template({channels})
      $('#channles-container').html(html)
    }).catch(err => {
      console.log('Err: ', err)
    })
  })
}

closeChannel = (id) => {
  vynos.ready().then(wallet => {
    wallet.closeChannel(id).then((res) => {
      channels()
    })
  })
}

channelsBalance()
channels()
loadContent()
