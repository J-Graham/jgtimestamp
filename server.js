// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  //isDate(request.query)
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:date", function (request, response) {
  
  //console.log(request.params.date)
  var incomingValue = request.params.date;
  var res = checkDate(incomingValue)
  console.log(res);
  console.log(JSON.stringify(res));
  //isDate(request.query)
  response.setHeader('Content-Type', 'application/json');
  response.json(res);
  
  //response.sendFile(__dirname + '/views/index.html');
});

function checkDate(incomingDate){
  var validDate = Date.parse(incomingDate);
   
  if (!isNaN(validDate)){
    
   return formatReturn(new Date(validDate).getTime() / 1000, validDate)
  }
  var intTime = parseInt(incomingDate);
  if (incomingDate == intTime){
     if (!isNaN(new Date(intTime))){
       return formatReturn(intTime);
     }
    
  }
    
  return null;
 
}

function formatReturn(unixDate){
  var ret = {};
  ret.unix = unixDate;
  ret.natural =  timeConverter(unixDate);
  return ret;
}
  
  function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ["January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =  month + ' ' + date + ' ' + year;
  return time;
}
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
