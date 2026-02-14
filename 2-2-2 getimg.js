var cli = require('cheerio-httpcli');
var urlType = require('url');
var fs = require('fs');
var request = require('request');

var saveDir = __dirname + "/img";
if(!fs.existsSync(saveDir)){
  fs.mkdirSync(saveDir);
}

var url = "https://ko.wikipedia.org/wiki/" + encodeURIComponent("강아지");
var param = {};

cli.fetch(url, param, function(err, $, res){
  if(err){console.log(err); return;}
  $('img').each(function(idx){
    var src = $(this).attr('src');
    src = urlType.resolve(url, src);
    var fname = urlType.parse(src).pathname;
    fname = saveDir + "/" + fname.replace(/[^a-zA-Z0-9\.]+/g, '_');
    request(src).pipe(fs.createWriteStream(fname));
  });
});