const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(__dirname+'/test.sqlite');

db.serialize(function(){
  db.run('CREATE TABLE IF NOT EXISTS items(name, value)');

  const stmt = db.prepare('INSERT INTO items VALUES(?,?)');
  stmt.run(["Banana", 300]);
  stmt.run(["Apple", 250]);
  stmt.run(["Mango", 150]);
  stmt.finalize();

  db.each("SELECT * FROM items", function(err, row){
    console.log(row.name+":"+row.value);
  });
});

db.close();