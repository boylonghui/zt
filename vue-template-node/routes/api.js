var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res, next) => {
  console.log('上传的图片')
  console.log(req.files.image)
  let file = req.files.image;
  let types = file.name.split('.')
  let suffix = types[types.length - 1]
  let fileName = new Date().getTime() + '.' + suffix;
  fs.renameSync(file.path, './public/images/' + fileName)
  res.send('http://localhost:3000/images/' + fileName)
})

module.exports = router;