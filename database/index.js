var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  // TODO: your schema here!
  user : String,
  repoName : String,
  repoURL: String
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;