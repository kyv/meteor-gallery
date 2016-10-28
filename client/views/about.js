Template.about.rendered = function (e) {
  var qrcodesvg   = new Qrcodesvg( "http://ki-ai.org", "qrcode", 250, {"ecclevel" : 1});
  return qrcodesvg.draw({"method":"classic", "fill-colors":["#1C46ED","#021872","#0125C4"]}, {"stroke-width":1});
}

//var qrcodesvg = new Qrcodesvg( input, "qr_colored_patterns", size, {"ecclevel" : 1});
//qrcodesvg.draw({"method":"classic", "fill-colors":["#1C46ED","#021872","#0125C4"]}, {"stroke-width":1});
