const url = 'http://jpub.tistory.com/';
const savepath = __dirname+'/test.html';

const http = require('http');
const fs = require('fs');

const outfile = fs.createWriteStream(savepath);

http.get(url, function(res){
  res.pipe(outfile);
  res.on('end', function(){
    outfile.close();
    console.log('ok');
  });
});