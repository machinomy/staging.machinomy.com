var template = require("./channels.handlebars");

(function (d, l) {
	var e = d.getElementsByTagName('script')[0];
	var c = d.createElement('script');
	var src = l.href.match(/dev=true/) ? window.VYNOS_URL.replace('.js', '.dev.js') : window.VYNOS_URL;
	c.async = true;
	c.src = src;
	e.parentElement.insertBefore(c, e);
})(document, location);

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

      return wallet.buy(receiver, amount, gateway)
    }).then(result => {
      loadContent(result.token)
      channelsBalance()
      console.log('Result: ', result)
      buyButton.style.display = 'none'
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
		wallet.listChannels().then((channels) => {
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
  if (vynos) {
      channelsBalance()
      channels()
  }
  loadContent()
})
