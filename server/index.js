var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var Repo = require('../database/index.js')
var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/repos/import', (req, res) => {
  // TODO
  var newRepoName = req.body.username;
  var accessToken = 'a1f57822e10f611771c8f6edfe72d8b2dd4a3a2f';
  console.log('POST request received from CLIENT!');

  const options = {
    url: `https://api.github.com/users/${newRepoName}/repos?access_token=${accessToken}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'User-Agent': 'myGithubFetcherClient'
    }  
  };

  request(options, (err, res, body) => {
    body = JSON.parse(body);
    console.log(body);

    for(var i = 0; i < body.length; i++) {  
      var newRepo = new Repo({
        user: body[i].owner.login,
        repoName: body[i].name,
        repoId: body[i].id,
        forks: body[i].forks_count
      });

    newRepo.save((err) => {
      if(err) {
        console.log('Error saving to MongoDB');
      } else {
        console.log('Data saved to MongoDB');
      }
     });
    }
    console.log('GET request sent to github from SERVER');
  });

  res.send(); 
});

app.get('/repos', function (req, res) {
  // TODO

});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

