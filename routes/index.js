var express = require('express');
var router = express.Router();
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
  res.json(newImage);
})

module.exports = router;
