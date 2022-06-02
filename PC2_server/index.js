const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { send } = require('express/lib/response');
require("dotenv").config();

//import models

const app = express();

let connection, db_connection_result;

const connect = () => {
    connection = mysql.createConnection({
        host: process.env.MYSQL_HOST_IP,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      }); 
      connection.connect(function(err) {
        if (err){
            db_connection_result = 'nok';
            throw err;
        } else{
            db_connection_result = 'ok'
        console.log("Connected to DB!");
        }
      });
    
}

app.use(cors());
app.use(bodyParser.json({limit:'20mb'}));
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(process.env.REACT_APP_SERVER_PORT,()=>{
    console.log(`App server now running and listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});

connect();

// ///////////////////////////////// apis ///////////////////////////////////////////////////////////////////////////////

//Connection Result
app.get('/db/verify', async (req,res)=>{
    res.send(db_connection_result);
});

app.get('/user/:id', async (req,res)=>{
    const{ id } = req.params;

    console.log(id);

    if(id) {

       const timestamp = +new Date;
       const date = new Date();
       const hash = id + timestamp;

       const user_sql = `SELECT * FROM users WHERE id = ${id}`;

       connection.query(user_sql, function (err, result) {
            if (err) {
                res.json({error:err.sqlMessage});
            }
            else {

                console.log(result);

                if (!result || !result.length) {
                   res.json({error:'User not found.'});
                }
                else {

                    const sql = `INSERT INTO docker_app_web.s (user_id,hash) VALUES (${id},'${hash}');`;

                    connection.query(sql, function (err, result) {
                        if (err) res.json({error: err.sqlMessage});
                        res.json({response:hash});
                    });

                }

                

            }
       } );

       
    }
});

app.get('/user/:id/:hash', async (req,res)=>{
    const{ id, hash } = req.params;

    console.log(id);
    console.log(hash);

    if(id && hash) {

       const sql = `SELECT * FROM s WHERE user_id = ${id} and hash = '${hash}'`;

       console.log(sql);

       connection.query(sql, function (err, result) {
            if (err) {
                res.json({error:err.sqlMessage});
            }
            else {
                if(result && result.length) {
                    console.log(result);

                    const {timestamp} = result[0];

                    const diff = Math.abs(new Date() - new Date(timestamp)) / 3600000;

                    console.log(timestamp);
                    console.log('Diff is <<<',diff);

                    if (diff <= 4) {
                        const a_sql = `INSERT INTO docker_app_web.a (user_id,hash_sent,response) VALUES (${id},'${hash}','ok');`;
                        connection.query(a_sql, function (err, result) {
                            if (err) res.json({error:err.sqlMessage});
                            res.json({response:'ok'});
                        });
                        
                    }
                    else {
                        res.json({error:'nok'});
                    }
                }
                else {
                    res.json({error:'nok'});
                }

            }
       } );

       
    }
});


app.get('/s', async (req,res)=> {

    const sql = `SELECT * FROM s order by timestamp DESC`;

    connection.query(sql, function (err, result) {
        if (err) res.json({error:err.sqlMessage});
        res.json({response:result});
    });


});

app.get('/a', async (req,res)=> {

    const sql = `SELECT * FROM a order by timestamp DESC`;

    connection.query(sql, function (err, result) {
        if (err) res.json({error:err.sqlMessage});
        res.json({response:result});
    });


});

app.delete('/a', async (req,res)=> {

    const sql = `DELETE FROM a WHERE id > 0`;

    connection.query(sql, function (err, result) {
        if (err) res.json({error: err});
        res.json({response:result});
    });
});

app.delete('/s', async (req,res)=>{

    const sql = `DELETE FROM s WHERE id > 0`;

    connection.query(sql, function (err, result) {
        if (err) res.json({error: err});
        res.json({response:result});
    });

});