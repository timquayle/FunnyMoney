var https = require("https");

var username = "4a1193881ba1f187763e353d3b91201f";
var password = "131e238754fb559ec34a60071b4d0169";
var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

var request = https.request({
    method: "GET",
    host: "api.intrinio.com",
    path: "/companies?ticker=AAPL",
    headers: {
        "Authorization": auth
    }
}, function(response) {
    var json = "";
    response.on('data', function (chunk) {
        json += chunk;
    });
    response.on('end', function() {
        var company = JSON.parse(json);
        console.log(company);
    });
});

request.end();