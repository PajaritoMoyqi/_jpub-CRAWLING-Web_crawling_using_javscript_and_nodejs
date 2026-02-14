var myKey2 = 'MyKeyString'

var api = `http://apis.data.go.kr/9710000/BillInfoService2/getRecentPasageList?ServiceKey=${myKey2}&numOfRows=20`;
var request = require('request');
var fs = require('fs');

request(api, function(err, response, body){
  if(err||response.statusCode!=200){
    console.log("ERROR: ", err);
    return;
  }

  console.log(body);
})

// var xhr = new XMLHttpRequest();
// var url = 'https://data.myhome.go.kr:443/rentalHouseList'; /*URL*/
// var queryParams = '?'
// queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent(myKey2); /**/
// queryParams += '&' + encodeURIComponent('brtcCode') + '=' + encodeURIComponent('11'); /**/
// queryParams += '&' + encodeURIComponent('signguCode') + '=' + encodeURIComponent('110'); /**/
// queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
// queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
// xhr.open('GET', url + queryParams);
// xhr.onreadystatechange = function () {
//     if (this.readyState == 4) {
//         alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
//     }
// };

// xhr.send('');
