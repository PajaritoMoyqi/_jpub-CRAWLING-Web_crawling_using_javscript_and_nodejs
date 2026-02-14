var request = require('request');
var fs = require('fs');

var myKey = 'MyKeyString'
var decodedKey = decodeURI(myKey);
var url = `https://data.myhome.go.kr/rentalHouseList?brtcCode=11&signguCode=110&ServiceKey=${decodedKey}`

request(url, function(err, response, body){
  if(err||response.statusCode!=200){
    console.log("Error: ", err);
    return;
  }

  const r = JSON.parse(body);
  console.log(body);
})