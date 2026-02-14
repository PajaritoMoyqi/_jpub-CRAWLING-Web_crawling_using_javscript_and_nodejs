var RSS = `https://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109`;
var RSS2 = `http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1144068000`;

var xml2js = require('xml2js');
var request = require('request');
var cli = require('cheerio-httpcli');


function analyzeRSS(xml){
  xml2js.parseString(xml, function(err, obj){
    if(err){console.log(err); return;}
    var datas = obj.rss.channel[0].item[0].description[0].body[0].location[0].data;
    var city = obj.rss.channel[0].item[0].description[0].body[0].location[0].city;
    // console.log(obj.rss.channel[0].item[0].description[0].body[0].location[0].data[1])

    for(var i in datas){
      var data = datas[i];
      console.log(`${data.tmEf} ${city} 날씨: ${data.wf} / 강수확률: ${data.rnSt}`);
    }
  })
}

request(RSS, function(err, response, body){
  if(!err && response.statusCode==200){
    analyzeRSS(body);
  }
})

cli.fetch(RSS2, {}, function(err, $, res){
  if(err){ console.log(err); return; }

  $("body > data").each(function(idx){
    var hour = $(this).find('hour').text();
    var temp = $(this).find('temp').text();
    var wfKor = $(this).find('wfKor').text();
    var pop = $(this).find('pop').text();
    var day = $(this).find('day').text();
    let date = '';
    if(day==0){
      date = '오늘';
    }else if(day==1){
      date = '내일';
    }else if(day==2){
      date = '모레';
    }
    console.log(`서울시 마포구 합정동 ${date} ${hour}시 날씨: ${wfKor},  기온: ${temp}, 강수확률: ${pop}`)
  })
})