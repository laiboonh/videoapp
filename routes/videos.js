var express = require('express');
var router = express.Router();
const fs = require('fs');
const videos_folder = './public/videos';

var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else {
            let mtime = stat.mtime;
            /* Is a file */
            results.push({name: file.slice(videos_folder.length), time: mtime});
        }
    });
    return results;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('videos', { title: 'Video App', video_files: walk(videos_folder) });
});

module.exports = router;
