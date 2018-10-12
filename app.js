const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const port=process.env.PORT || 1900;

const sql = mysql.createConnection({
  host : 'db4free.net',
  user : 'imchirag2000',
  password : 'chirag@248895',
  database : 'techdoccell',
  port : '3306'
});
// sql.query('SELECT COUNT(*) AS number FROM employee' , (err , reslt) =>{
//   if(err) throw err;
//   const n = reslt[0].number;
//   console.log(n);
// })
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine' , 'ejs');
app.set('views' , './views');
app.get('/' , (req , res) => {
  res.sendFile(path.join(__dirname , 'home.html'));
});
app.get('/register', (req , res )=>{
  res.sendFile(path.join(__dirname ,'register.html'));
});
app.get('/search' ,(req , res)=>{
  res.sendFile(path.join(__dirname , 'search.html'));
});
app.get('/remove' , (req , res)=>{
  res.sendFile(path.join(__dirname , 'delete.html'))
})
app.post('/register' , (req ,res) =>{
  sql.query('INSERT INTO Persons(Name , Email , Contact , Date) VALUE ("'+req.body.rname+'" ,"'+req.body.remail+'" , "'+req.body.rcontact+'" , "'+req.body.rage+'" )' , (err , result) =>{
    if(err) throw err ;
    console.log('Succesful')
    res.redirect("/search");
  });
});
app.post('/search' , (req , res)=>{
  sql.query('SELECT * FROM Persons WHERE '+req.body.column+' = "'+req.body.element+'" ' , (err , result)=>{
    const obj = JSON.stringify(result);
    res.render('show', {result});
    res.end();
  });
});
app.listen(port);
