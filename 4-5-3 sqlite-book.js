
const DB_PATH = __dirname + '/jpub.sqlite';
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(DB_PATH);

const BASE_URL = 'https://jpub.tistory.com/category/';
const PAGE_NUM = 6;
const cli = require('cheerio-httpcli');
const fs = require('fs');
const urlType = require('url');

let booklist = [];

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
  db.serialize(function(){
    db.run('CREATE TABLE IF NOT EXISTS book(' +
    'id INTEGER PRIMARY KEY, '+
    'token TEXT)');

    const ins_stmt = db.prepare('INSERT INTO book (token)'+
    'VALUES(?)');
    booklist.forEach(function(val, idx, arr){
      const words = val.split(' ');
      for(let i in words){
        ins_stmt.run(words[i]);
      }
    });
    ins_stmt.finalize();

    console.log('집계 결과');
    db.each('SELECT token, COUNT(token) as cnt '+
    'FROM book GROUP BY token having cnt > 3 '+
    'ORDER BY cnt DESC', function(err, row){
      console.log(row.cnt+'회:'+row.token);
    })
  })
}

scrape(1);