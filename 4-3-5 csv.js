const fs = require('fs');
const CSV = require('comma-separated-values');
const Iconv = require('iconv').Iconv;

const iconv = new Iconv('EUC-KR', 'utf-8');
const buf = fs.readFileSync(__dirname+'/test.csv');
const txt = iconv.convert(buf).toString('utf-8');

const csv = new CSV(text, {header: false});
const records = csv.parse();

records.shift();

for(let i=0;i<records.length;i++){
  const fs = records[i];
  const name = fs[0];
  const price = fs[1];
  const memo = fs[2];
  console.log(name, price, memo);
}