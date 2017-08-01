"use strict";
window.addEventListener("load", function () {
    $('#request-ether').click(function () {
        $.ajax({
            type: 'POST',
            url: '/api/request',
            data: JSON.stringify({ address: window.address }),
            contentType: 'application/json',
            success: function (data) {
                var txid = data.txid;
                var etherscanUrl = 'https://ropsten.etherscan.io/tx/' + txid;
                $('#faucet-transactions').append('<li><a href="' + etherscanUrl + '">' + txid + '</a></li>');
            }
        });
    });
    var ynos = window.ynos;
    ynos.initFrame().then(function () {
        return ynos.initAccount();
    }).then(function () {
        return ynos.getAccount();
    }).then(function (address) {
        window.address = address;
        var span = document.getElementById("account_address");
        if (span) {
            var p_1 = span;
            var a = document.createElement("a");
            a.href = "https://ropsten.etherscan.io/address/" + address.replace(/0x/, '');
            a.text = address;
            var arr = [].slice.call(p_1.childNodes);
            arr.forEach(function (element) {
                p_1.removeChild(element);
            });
            p_1.appendChild(a);
        }
    }).catch(function (error) {
        console.log(error);
    });
});
