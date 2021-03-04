var express = require('express');
var router = express.Router();
const fs = require('fs');
const videosFolder = './public/videos';

var video_files;
fs.readdir(videosFolder, (err, files) => { video_files = files; });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('videos', { title: 'Video App', video_files: video_files });
});

module.exports = router;
