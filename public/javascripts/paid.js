document.write('<script src="' + window.VYNOS_URL + '"></script>')

let loadContent = (token) => {
	$.ajax({
		type: 'GET',
		url: "/paid/content",
		headers: {
			authorization: `paywall ${token}`
		}
	}).done((data, status, response) => {
		window.paywallMeta = response.getResponseHeader('paywall-meta')
		window.paywallGateway = response.getResponseHeader('paywall-gateway')
		window.paywallPrice = response.getResponseHeader('paywall-price')
		window.paywallAddress = response.getResponseHeader('paywall-address')
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
			let receiver = window.paywallAddress
			let amount = window.paywallPrice
			let gateway = window.paywallGateway
			let meta = window.paywallMeta

			return wallet.buy(receiver, amount, gateway, meta)
		}).then(result => {
			loadContent(result.token)
			console.log('Result: ', result)
			buyButton.style.display = 'none'
		}).catch(err => {
			console.log('Err: ', err)
		})
	}
}

window.addEventListener('load', () => {
	loadContent()
})

window.send = async (value) => {
	let eth = 0.01
	if (value) {
		eth = value
	}
	let wallet = await vynos.ready()
	let web3 = new Web3(wallet.provider)
	web3.eth.getAccounts(function (err, accounts) {
		let account = accounts[0]
		web3.eth.sendTransaction({ from: account, to: '0x5bf66080c92b81173f470e25f9a12fc146278429', value: web3.toWei(eth, 'ether') }, (err, txid) => {
			console.log(err)
			console.log(txid)
		})
	})
}

window.sign = async () => {
	let wallet = await vynos.ready()
	let web3 = new Web3(wallet.provider)
	web3.eth.getAccounts(function (err, accounts) {
		let account = accounts[0]
		web3.eth.sign(account, web3.sha3('vynos'), (err, res) => {
			console.log(err)
			console.log(res)
		})
	})
}