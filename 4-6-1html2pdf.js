const URLs = 'https://jpub.tistory.com/';
const SAVE_PATH = './test.pdf';

const casper = require('casper').create();
casper.start();
casper.page.paperSize = {
  width: '8.5in',
  height: '11in',
  orientation: 'portrait',
  margin: '1cm'
};
casper.open(URLs);
casper.then(function(){
  casper.capture(SAVE_PATH);
})
casper.run();

// 실행 명령어 : node_modules/casperjs/bin/casperjs 파일명.js