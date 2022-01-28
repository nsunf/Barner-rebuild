var express = require('express');
var router = express.Router();
var fs = require('fs');

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

router.get('/product/:category/:name/:color', function(req, res, next) {
  let productName = req.params.name.replace("_", " ");
  let productColor = req.params.color.replace("_", " ");

  if (req.params.category == "Eyeglasses") {
    fs.readFile('public/javascripts/glasses_products_data.json', 'utf-8', (err, data) => {
      let decodedData = JSON.parse(data);
      let productData = decodedData.filter(x => x.productName.replace("í", "i") == productName && x.productColor == productColor)[0];
      res.render('product_detail', { title: productName + " - " + productColor, product_data_list: decodedData, product_data: productData, category: req.params.category })
    })
  } else if (req.params.category == "Sunglasses") {
    fs.readFile('public/javascripts/sunglasses_products_data.json', 'utf-8', (err, data) => {
      let decodedData = JSON.parse(data);
      let productData = decodedData.filter(x => x.productName.replace("í", "i") == productName && x.productColor == productColor)[0];
      res.render('product_detail', { title: productName + " - " + productColor, product_data_list: decodedData, product_data: productData, category: req.params.category })
    })
  }
})

router.get('/about-us', function(req, res, next) {
  res.render('about-us', { title: "About-Us" });
})

router.get('/cart', function(req, res, next) {
  res.render('cart', { title: "Cart" });
})

module.exports = router;
