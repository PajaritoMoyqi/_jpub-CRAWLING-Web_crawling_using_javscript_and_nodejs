const fs = require('fs');
const ini = require('ini');

const txt = fs.readFileSync(__dirname+'/test.ini', 'utf-8');

const obj = ini.parse(txt);

for(let name in obj){
  var it = obj[name];
  console.log(name, it.price, it.color);
}