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
    vynos.ready().then(wallet => {
      let title = 'Outline'
      let receiver = '0xebeab176c2ca2ae72f11abb1cecad5df6ccb8dfe'
      let amount = 10000
      let gateway = 'http://localhost:3001/machinomy'
      return wallet.buy(title, receiver, amount, gateway)
    }).then(result => {
      loadContent(result.token)
      console.log('Result: ', result)
    }).catch(err => {
      console.log('Err: ', err)
    })
  }
}

loadContent()