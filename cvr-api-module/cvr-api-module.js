const request = require('request');
const utf8 = require('utf8');

exports.hentCVRAPIJSON = function (firmanavn, callback) {

    // Omkoder firmanavnet til en UTF8 string så den forstår mellemrum, æ, ø og å osv.
    let utf8String = utf8.encode(firmanavn);

    // CVR API URL hvor dataen bliver hentet fra
    let url = 'https://cvrapi.dk/api?search=' + utf8String + '&country=dk';

    // Options til request module, hvor man sætter en User-Agent header og at man henter json
    let options = {
        headers: {
            'User-Agent': 'Hello from Erik'
        },
        json: true
    };

    // Bruger request module til at hente json fra API, hvis der ikke er fejl. Returnere jsonObject i et callback
    request(url, options, (err, res, jsonObject) => {
        if (!err && res.statusCode == 200) {
            callback(jsonObject);
        } else {
            return console.log(err);
        }
    });

}