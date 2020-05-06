Tietokannasta myyntipalstalle kategorioiden avulla tapahtuva autoyksilöiden hakeminen:

http://localhost:8080/api/ilmoitukset?vaihteisto=" + valintaVaihteisto + "&merkki=" + valinta + "&hinta=" + hinta + "&polttoaine=" + polttoaine

”Node”-puolelta suoritettavat tietokantakutsut:

"SELECT * FROM Autoja " +
    "WHERE Vaihteisto = " + "'" + vaihteisto + "' " + "AND Malli = " + "'" + merkki + "' " + "AND Polttoaine = " + "'" + polttoaine + "' " + "AND Hinta < " + "'" + hinta + "'"

Autoyksilön tiedot json-muodossa:

{"Hinta":"4200","Malli":"Saab 900","Vuosimalli":"1998","Ajokilometrit":"50000","Moottori":"1.8 l","Polttoaine":"Bensiini","Vaihteisto":"Manuaali","Rekisteritunnus":"OKS-909","Vari":"Sininen","Koodi":"koodi2","Kuva":"htttp://i.imgur.com/Testi.png","Kuvaus":"Kuvailu"}

Lisäyssivulta tapahtuva autoyksilöiden lisääminen tietokantaan:

"http://localhost:8080/api/lisays" method = "POST"

”Node”-puolelta tapahtuva auton lisääminen tietokantaan:

"INSERT INTO autoja (Hinta, Malli, Vuosimalli, Ajokilometrit, Moottori, Vaihteisto, Rekisteritunnus, Vari, Kuvaus, Kuva, Koodi, Polttoaine) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"

Auton yksilöllisen koodin perusteella tapahtuva tietokannasta poistaminen:

DELETE FROM autoja WHERE Koodi='" + jsonObj.Koodi + "'"

”Node”-puolelta tapahtuva auton yksilöllisen koodin haku:

var sql = "SELECT * FROM Autoja " +
    "WHERE Koodi = " + "'" + koodi + "'";

”Node”-puolelta tapahtuva auton rekisteritunnuksen haku:

var sql = "SELECT * FROM Autoja " +
    "WHERE Rekisteritunnus = " + "'" + rekkari + "'";

Tietokannasta myyntipalstalle tapahtuva auton haku koodin perusteella (käytetään lisäämisessä ja poistamisessa):

"http://localhost:8080/api/koodihaku?Koodi=" + koodi.value;


