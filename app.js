let cvrAPIModule = require('./cvr-api-module/cvr-api-module');
let express = require('express');
let path = require('path');
let app = express();


let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(path.join( __dirname + '/html/index.html'));
});

app.post('/submit', function (req, res) {
    let firmanavn = req.body.name;

    cvrAPIModule.hentCVRAPIJSON(firmanavn, (objectFromAPI) => {
        res.send(
            '<p style="font-size:20px;">EASJs industrikode: ' + objectFromAPI.productionunits[8].industrycode + '</p>' + 
            '<p style="font-size:20px;">Navn: ' + objectFromAPI.productionunits[8].name + '</p>' +
            '<p style="font-size:20px;">Adresse: ' + objectFromAPI.productionunits[8].address + '</p>' +
            '<p style="font-size:20px;">Postnummer: ' + objectFromAPI.productionunits[8].zipcode + '</p>' +
            '<p style="font-size:20px;">By: ' + objectFromAPI.productionunits[8].city + '</p>'
            );
    })
});

let server = app.listen(3000, function() {
    console.log('Server is running on port ' + server.address().port);
})

/*
cvrAPIModule.hentCVRAPIJSON('Erhvervsakademi Sjælland', (objectFromAPI) => {
    console.log('EASJs industrikode: ' + objectFromAPI.productionunits[8].industrycode);
    console.log('Navn: ' + objectFromAPI.productionunits[8].name);
    console.log('Adresse: ' + objectFromAPI.productionunits[8].address);
    console.log('Postnummer: ' + objectFromAPI.productionunits[8].zipcode);
    console.log('By: ' + objectFromAPI.productionunits[8].city);
});
*/