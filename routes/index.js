var express = require('express');
var router = express.Router();
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var Image = require('../models/Image');


var slike = [
  slika1 = ['ceca', 'deca', 'nista'],
  slika2 = ['sise', 'velike', 'nisu'],
  slika3 = ['actress']
]

var mozeDaProdje = []

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/imagesWithTags', async (req, res) => {
  let { tags } = req.body;
  tags = Array.isArray(tags) ? tags : tags.split();
  Image.find({}, (err, allImages) => {
    if (err) res.json(err);
    allImages.forEach(s => {
      var poklopljeniTagovi = 0;
      console.log(s)
      s.tags.forEach(ms => {
        tags.forEach(tag => {
          if (tag == ms) {
            poklopljeniTagovi += 1
          }
        })
      })
      if (poklopljeniTagovi != 0) {
        mozeDaProdje.push([poklopljeniTagovi + ',' + (s)])
      }
    })
    var newArray = mozeDaProdje.sort()
    var reversed = newArray.reverse()
    res.json(reversed)
    mozeDaProdje = []
    // console.log('=-========', mozeDaProdje)
  });
});

router.post('/profile', upload.single('banner'), (req, res, next) => {
  const { filename, originalname, path } = req.file;
  const { tags } = req.body;

  var newImage = {
    filename,
    originalname,
    path,
    tags
  }

  Image.create(newImage, (error, data) => {
    if (error) console.log(error);
    res.json(data);
  })
})

module.exports = router;
