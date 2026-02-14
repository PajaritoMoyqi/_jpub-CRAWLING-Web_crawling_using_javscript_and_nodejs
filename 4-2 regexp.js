var re = /([0-9]+)([a-z]+)/g;
var str = "111jpy,8usd,xxx";
console.log(re.exec(str));
console.log(re.exec(str));
console.log(re.exec(str));
console.log(str)

var res = /^\d{3}-\d{4}$/;
console.log(res.test('123-1234'));
console.log(res.test('12-1234'));
console.log(res.test('244-4444'));
console.log(res.test('aaa-bbbb'));

var rere = 'v=20, n=40, c=30';
console.log(rere.match(/[0-9]+/));
console.log(rere.match(/[0-9]+/g));
console.log(rere.match(/\w+=\d+/g));

var str = 'zip:999-9999, mail:testemailaddressiiii@protonmail.ch';
console.log(str.search(/\d{3}-\d{4}/));
console.log(str.search(/\w+\@\w+\.\w+/));
console.log(str.search(/https?:\/\//));

var str2 = 'Today 10per OFF';
console.log(str2.replace(/\d+/, '30'));
console.log(str2.replace(/\d+[a-z]+/, '500won'));
console.log(str2.replace(/[a-zA-Z]+/g, ""));

var str3 = 'tel:045-111-2222';
console.log(str3.replace(/(\d+)-(\d+)-(\d+)/, '($1)-$2zzz-$3'));

var str4 = 'price: 100 won';
console.log(str4.replace(/\d+/, function(v){
  v = parseInt(v);
  return Math.ceil(1.08*v);
}))