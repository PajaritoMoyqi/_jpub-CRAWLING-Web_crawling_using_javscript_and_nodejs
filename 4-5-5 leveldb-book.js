const levelup = require('level');
const DB_DIR = __dirname+'/jpub';

const db = levelup(DB_DIR);

const BASE_URL = 'https://jpub.tistory.com/category/';
const PAGE_NUM = 6;
const cli = require('cheerio-httpcli');
const fs = require('fs');
const urlType = require('url');

const booklist = [];

function scrape(page){
  if(page>PAGE_NUM){
    dbinsert();
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

function dbinsert(){
  const books = {};
  booklist.forEach(function(val, idx, arr){
    const words = val.split(' ');

    for(let i in words){
      const word = words[i];
      const titles = books[word];
      if(titles==undefined){
        books[word] = [];
      }
      books[word].push(val);
    }
  });
  for(let key in books){
    const titles = books[key];
    db.put(key, titles.join('\n'));
  }
  search();
}

function search(){
  const opt = { start: '이벤트', end: '이벤트\uFFFF'};

  db.createReadStream(opt)
    .on('data', function(data){
      console.log(data.key + '>>' + data.value + '\n');
    })
}

scrape(1);