const levelup = require('level');
const db= levelup(__dirname+'/testdb')

db.put('Apple', 'red', function(err){
  if(err){ console.log('Error', err); return; }
  testGet();
})

function testGet(){
  db.get('Apple', function(err, val){
    if(err){ console.log('Error', err); return; }
    console.log('Apple='+val);
    testBatch();
  })
}

function testBatch(){
  db.batch()
    .put('Mango', 'yellow')
    .put('Banana', 'yellow')
    .put('Kiwi', 'green')
    .write(function(){
      testGet2();
    })
}

function testGet2(){
  db.get('Banana', function(err, val){
    if(err){ console.log('Error', err); return; }
    console.log('Banana=',val);
  })
}