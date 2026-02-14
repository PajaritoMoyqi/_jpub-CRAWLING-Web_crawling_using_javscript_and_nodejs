var xml2js = require('xml2js')
var xml = `<컴퓨터언어 shop='AAA'>
<C언어 price='100'> C </C언어>
<C언어 price='110'> C++ </C언어>
<C언어 price='90'> C# </C언어>
<JAVA price='150'> java </JAVA>
<JAVA price='200'> android </JAVA>
</컴퓨터언어>`

xml2js.parseString(xml, function(err, res){
  console.log(JSON.stringify(res));
})


var obj = {
  item: {name: "Banana", price: 150}
}

var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);
console.log(xml);