var cli = require('cheerio-httpcli');

var url = "http://jpub.tistory.com";
var param = {};

cli.fetch(url, param, function(err, $, res){
  if(err){ console.log("ERROR: " + err); return; }

  // var body = $.html();
  // console.log(body);

  $("a").each(function(idx){
    var text = $(this).text();
    var href = $(this).attr('href');
    console.log(text+": "+href);
  })
})

/* 
[this - Javascript]

Javascript의 경우에는 이벤트가 발생한 태그 요소가 표시됩니다!

[ $(this) - Jquery]

Jquery의 경우에는 이벤트가 발생한 요소의 정보들이 Object로 표시됩니다!


[출처] [Javascript] javascript this와 $(this)의 차이점|작성자 인큐
 */