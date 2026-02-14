const casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

casper.start();

casper.open('http://jpub.tistory.com');

casper.then(function(){
  casper.capture('screenshot.png');
})

casper.run();