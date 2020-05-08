var express = require('express');
var app = express();
var cors = require('cors');
let bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "olso",
    password: "olso",
    database: "saabeja"
});

con.connect(function(err) {
    if (err) throw err;
});

app.get('/api/ilmoitukset', function (req, res){
    let polttoaine = req.param('polttoaine');
    let hinta = req.param('hinta');
    let merkki = req.param('merkki');
    let vaihteisto = req.param("vaihteisto");
    console.log(vaihteisto);
    if (vaihteisto === "kaikki" && merkki === "kaikki" && polttoaine === "kaikki") {
        var sql = "SELECT * FROM Autoja " +
            "WHERE Hinta < " + "'" + hinta + "'";
    } else if (vaihteisto === "kaikki" && merkki !== "kaikki" && polttoaine === "kaikki") {
        var sql = "SELECT * FROM Autoja " +
            "WHERE Malli = " + "'" + merkki + "' " + "AND Hinta < " + "'" + hinta + "'";
    } else if (merkki === "kaikki" && vaihteisto !== "kaikki" && polttoaine === "kaikki") {
        var sql = "SELECT * FROM Autoja " +
            "WHERE Vaihteisto = " + "'" + vaihteisto + "' " + "AND Hinta < " + "'" + hinta + "'";
    } else if (merkki === "kaikki" && vaihteisto === 'kaikki' && polttoaine === "kaikki") {
        var sql = "SELECT * FROM Autoja " +
            "WHERE Hinta < " + "'" + hinta + "'";
    } else if (merkki === "kaikki" && vaihteisto === "kaikki" && polttoaine !== "kaikki") {
        var sql = "SELECT * FROM Autoja " +
            "WHERE Polttoaine = " + "'" + polttoaine + "' " +  "AND Hinta < " + "'" + hinta + "'";
    } else if (merkki !== "kaikki" && vaihteisto === "kaikki" && polttoaine !== "kaikki") {
        var sql = "SELECT * FROM Autoja " +
            "WHERE Malli = " + "'" + merkki + "' " + "AND Polttoaine = " + "'" + polttoaine + "' " + "AND Hinta < " + "'" + hinta + "'";
    } else if (merkki === "kaikki" && vaihteisto !== "kaikki" && polttoaine !== "kaikki") {
        var sql = "SELECT * FROM Autoja " +
            "WHERE Vaihteisto = " + "'" + vaihteisto + "' " + "AND Polttoaine = " + "'" + polttoaine + "' " + "AND Hinta < " + "'" + hinta + "'";
    } else if (merkki === "kaikki" && vaihteisto === "kaikki" && polttoaine !== "kaikki") {
        var sql = "SELECT * FROM Autoja " +
            "WHERE Polttoaine = " + "'" + polttoaine + "' " + "AND Hinta < " + "'" + hinta + "'";
    } else if (merkki !== "kaikki" && vaihteisto !== "kaikki" && polttoaine === "kaikki") {
        var sql = "SELECT * FROM Autoja " +
            "WHERE Malli = " + "'" + merkki + "' " + "AND Vaihteisto = " + "'" + vaihteisto + "' " + "AND Hinta < " + "'" + hinta + "'";
    } else {
        var sql = "SELECT * FROM Autoja " +
            "WHERE Vaihteisto = " + "'" + vaihteisto + "' " + "AND Malli = " + "'" + merkki + "' " + "AND Polttoaine = " + "'" + polttoaine + "' " + "AND Hinta < " + "'" + hinta + "'";
    }

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        //res.result;
        res.send(result);
        console.log(result);
    });
});


app.get('/api/koodihaku', function (req, res){
    //res.send('hello world');
    let koodi = req.param('Koodi');
    console.log(koodi);
    var sql = "SELECT * FROM Autoja " +
        "WHERE Koodi = " + "'" + koodi + "'";


    con.query(sql, function (err, result) {
        if (err) throw err;
        //res.result;
        res.send(result);
        console.log(result);

    });
});

app.get('/api/rekkarihaku', function (req, res){
    //res.send('hello world');
    let rekkari = req.param('rekisteritunnus');
    console.log(rekkari);
    var sql = "SELECT * FROM Autoja " +
        "WHERE Rekisteritunnus = " + "'" + rekkari + "'";


    con.query(sql, function (err, result) {
        if (err) throw err;
        //res.result;
        res.send(result);
        console.log(result);

    });
});

app.post("/api/lisays", urlencodedParser, function (req, res) {
   console.log("Got a POST request.");

   console.log("body: %j", req.body);


   var jsonObj = req.body;
    console.log(jsonObj.Hinta + " " + jsonObj.Malli +" " + jsonObj.Vuosimalli +" " + jsonObj.Ajokilometrit +" " + jsonObj.Moottori +" " + jsonObj.Vaihteisto +" " +
        jsonObj.Rekisteritunnus +" " + jsonObj.Vari +" "  + jsonObj.Koodi + jsonObj.Polttoaine);
   var sql = "INSERT INTO autoja (Hinta, Malli, Vuosimalli, Ajokilometrit, Moottori, Vaihteisto, Rekisteritunnus, Vari, Kuvaus, Kuva, Koodi, Polttoaine) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
   con.query(sql, [jsonObj.Hinta, jsonObj.Malli, jsonObj.Vuosimalli, jsonObj.Ajokilometrit, jsonObj.Moottori, jsonObj.Vaihteisto, jsonObj.Rekisteritunnus, jsonObj.Vari, jsonObj.Kuvaus, jsonObj.Kuva, jsonObj.Koodi, jsonObj.Polttoaine], function (err, data) {
       if (err){
           console.log("VIRHE" + err);
       } else {
           console.log("ONNISTUI!");
       }
   });
   res.send(req.body);
});

app.delete("/api/poisto", urlencodedParser, function (req, res) {
    console.log("Got a POST request.");
    let koodi = req.param('Koodi');
    console.log("body: %j", req.body);


    var jsonObj = req.body;
    console.log(koodi);
    var sql = "DELETE FROM autoja where Koodi='" + koodi + "'";
    con.query(sql, [jsonObj.Koodi], function (err, data) {
        if (err){
            console.log("VIRHE" + err);
            res.send("Koodilla ei löytynyt poistettavaa");
        } else {
            console.log("ONNISTUI!");
        }
    });
    res.send(req.body);

});


var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("testi", host, port);

});