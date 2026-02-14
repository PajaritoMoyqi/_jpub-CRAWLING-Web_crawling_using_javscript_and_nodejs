const casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});
const utils = require('utils');

var args = casper.cli.args;
if(args.length<1){
  casper.echo("USES:");
  casper.echo("shot-tool URL [savepath]");
  casper.exit();
}

var savepath = "toolscreenshot.png";
var url = args[0];
if(args.length>=2){
  savepath = args[1];
}

casper.start();
casper.viewport(1024, 768);
casper.open(url);
casper.then(function(){
  this.capture(savepath);
});
casper.run();