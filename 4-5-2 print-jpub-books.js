const BASE_URL = 'https://jpub.tistory.com/category/';
const PAGE_NUM = 6;

const cli = require('cheerio-httpcli');
const fs = require('fs');
const urlType = require('url');

let booklist = [];

function scrape(page){
  if(page>PAGE_NUM){
    print();
    return;
  }

  const VISIT_URL = BASE_URL+'?page='+page;
  cli.fetch(VISIT_URL, function(err, $, res){
    if(err){ console.log("DL error"); return; }

    const tr = $('#content > div.inner > div');
    if(!tr){ console.log("Page selector error"); return; }

    for(let i=0;i<tr.length;i++){
      const book = tr.eq(i).children('a').children('.title').text();
      booklist.push(book);
    }
    scrape(page+1);
  })
}

function print(){
  for(let i in booklist){
    console.log(booklist[i]);
  }
}

scrape(1);