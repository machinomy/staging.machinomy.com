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
			return wallet.buy(title, receiver, amount, gateway, getMetaSite())
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

getMetaSite = () => {
	var title = document.title;
	var desc = '';
	if (document.querySelector("meta[property='og:description']")) {
		desc = document.querySelector("meta[property='og:description']").content;
	} else if (document.querySelector("meta[name='description']")) {
		desc = document.querySelector("meta[name='description']").content;
	}
	return {
		title: title,
		desc: desc,
		host: window.location.host,
		icon: getBestIcon()
	}
};

getBestIcon = () => {
	var links = document.querySelectorAll('link');

	//apple-touch-icon
	var elementsAppleTouchIcon = [];
	links.forEach(link => {
		if (/apple-touch-icon/.test(link.rel)) {
			elementsAppleTouchIcon.push(link);
		}
	});
	if (elementsAppleTouchIcon.length) {
		let maxSize = -1;
		let href = '';
		elementsAppleTouchIcon.forEach(element => {
			var size = parseInt(element.sizes) || 0;
			if (size > maxSize) {
				maxSize = size;
				href = element.href;
			}
		});
		return href;
	}

	//icon
	var elementsIcon = [];
	links.forEach(link => {
		if (/icon/.test(link.rel) && (!link.type || link.type !== 'image/x-icon') && !(/shortcut/.test(link.rel)) && (/\.png|\.jpg/.test(link.href))) {
			elementsIcon.push(link);
		}
	});
	if (elementsIcon.length) return elementsIcon[0].href;

	//og:image
	var ogLinks = document.querySelectorAll("meta[property='og:image']");
	if (ogLinks.length) {
		if (ogLinks.length > 1) {
			for (var n in ogLinks) {
				if (/logo|icon/.test(ogLinks[n].content)) return ogLinks[n].content;
			}
			return ogLinks[0].content;
		} else {
			return ogLinks[0].content;
		}
	}
	return null;
}

window.addEventListener('load', () => {
  channelsBalance()
  channels()
  loadContent()
})
