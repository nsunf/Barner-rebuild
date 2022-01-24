var express = require('express');
var router = express.Router();
var fs = require('fs');
const { decode } = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('public/javascripts/glasses_products_data.json', 'utf-8', (err, glasses_data) => {
    fs.readFile('public/javascripts/sunglasses_products_data.json', 'utf-8', (err, sunglasses_data) => {
      let glassesDecodedData = JSON.parse(glasses_data);
      let sunglassesDecodedData = JSON.parse(sunglasses_data);
      res.render('index', { title: 'Barner', glasses_data: glassesDecodedData, sunglasses_data: sunglassesDecodedData });
    })
  })
});

router.get('/products/:category', function(req, res, next) {
  let cat = req.params.category;
  if (cat == 'Eyeglasses') {
    fs.readFile('public/javascripts/glasses_products_data.json', 'utf-8', (err, data) => {
      let decodedData = JSON.parse(data);
      res.render('products', { title: req.params.category, product_data: decodedData })
    })
  } else if (cat == 'Sunglasses') {
    fs.readFile('public/javascripts/sunglasses_products_data.json', 'utf-8', (err, data) => {
      let decodedData = JSON.parse(data);
      res.render('products', { title: req.params.category, product_data: decodedData })
    })
  }
})

module.exports = router;
