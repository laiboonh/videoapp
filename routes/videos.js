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
    results.sort((a,b) => b.time - a.time);
    return results;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('videos', { title: 'Video App', video_files: walk(videos_folder) });
});
router.get("/delete", function(req, res, next) {
  fs.unlink(`./public/videos/${req.query.video_file}`, function (err) {
    if (err) res.status(500).json({err: err})
    else res.status(200).json({video_file: req.query.video_file})
  })

})

module.exports = router;
