var cli = require('cheerio-httpcli');
var urlType = require('url');
var fs = require('fs');
var path = require('path');

var linkLevel = 3;
var targetUrl = "https://nodejs.org/dist/latest/docs/api/";
var list = {};

function checkSaveDir(fname){
  var dir = path.dirname(fname);

  var dirlist = dir.split('/');
  var p = __dirname+'/';
  for (var i in dirlist){
    p += dirlist[i] + '/';
    if(!fs.existsSync(p)){
      fs.mkdirSync(p);
    }
  }
}

function downloadRec(url, level){
  if(level>=linkLevel) return;

  if(list[url]) return;
  list[url] = true;

  var us = targetUrl.split('/');
  us.pop();
  var base = us.join("/");
  if(url.indexOf(base) < 0) return;

  cli.fetch(url, {}, function(err, $, res){
    $("a").each(function(idx){
      var href = $(this).attr('href');
      if(!href) return;

      href = urlType.resolve(url, href);

      href = href.replace(/\#.+$/,"");
      downloadRec(href, level+1);
    })

    if(url.substr(url.length-1, 1) == '/'){
      url += "index.html";
    }
    var savePath = url.split('/').slice(2).join('/');
    checkSaveDir(savePath);
    console.log(savePath);
    fs.writeFileSync(__dirname+'/'+savePath, $.html());
  })
}

downloadRec(targetUrl, 0);