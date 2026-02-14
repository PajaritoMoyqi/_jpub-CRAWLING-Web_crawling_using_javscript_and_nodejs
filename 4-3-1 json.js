const fs = require('fs');

const json = fs.readFileSync(__dirname+'/test.json', 'utf-8');

const obj = JSON.parse(json); // jSON -> javascript obj.. JSON.stringify ; javascript obj -> JSON..

const items = obj.items;
console.log(items);
for(let i in items){
  const item = items[i];
  const name = item.name;
  const price = item.price;
  console.log(name, price);
}