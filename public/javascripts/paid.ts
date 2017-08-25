
import * as $ from "jquery"

let loadContent = (token: string) => {
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

$('#load-paid-content').click(() => {
  let token = (<HTMLInputElement>document.querySelector('#token')).value
  loadContent(token)
})

let token = (<HTMLInputElement>document.querySelector('#token')).value
loadContent(token)
