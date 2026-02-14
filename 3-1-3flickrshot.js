const casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

casper.start();

casper.viewport(1400,800);

casper.userAgent('User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');

var text = encodeURIComponent("숲");
casper.open('https://www.flickr.com/search/?text='+text);

casper.then(function(){
  this.capture('flickr-forest.png', {
    top:0, left:0, width:1400, height:800
  })
})

casper.run();