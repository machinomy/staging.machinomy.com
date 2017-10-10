var template = require("./channels.handlebars");

document.write('<script src="' + window.VYNOS_URL + '"></script>')

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
      let receiver = window.RECEIVER
      let amount = 1000
      let gateway = window.GATEWAY_URL
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

window.addEventListener('load', () => {
  channelsBalance()
  channels()
  loadContent()
})
