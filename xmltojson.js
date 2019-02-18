function xmlToJson(url, callback) {
  var req = http.get(url, function(res) {
    var xml = '';
    
    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('error', function(e) {
      callback(e, null);
    }); 

    res.on('timeout', function(e) {
      callback(e, null);
    }); 

    res.on('end', function() {
      parseString(xml, function(err, result) {
        callback(null, result);
      });
    });
  });
}

var parseString = require('xml2js').parseString;
var http = require('http');
var url = "http://www.redhat.com/security/data/oval/com.redhat.rhsa-all.xml"

xmlToJson(url, function(err, data) {
  if (err) {
    // Handle this however you like
    return console.err(err);
  }

  // Do whatever you want with the data here
  // Following just pretty-prints the object
  //console.log(JSON.stringify(data, null, 2));
console.log(data);
})
