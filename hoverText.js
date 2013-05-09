function onhover(e,text) {
  $('#dialog').offset({ top: e.pageY+20, left: e.pageX+30});
  $('#dialog').text(text);
  $('#dialog').show();
}

function onexit() {
  $('#dialog').hide();
}