var express = require('express');
var router = express.Router();
var fs = require('fs');
var { v4: uuid4 } = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('public/javascripts/json/glasses_products_data.json', 'utf-8', (err, glasses_data) => {
    fs.readFile('public/javascripts/json/sunglasses_products_data.json', 'utf-8', (err, sunglasses_data) => {
      let glassesDecodedData = JSON.parse(glasses_data);
      let sunglassesDecodedData = JSON.parse(sunglasses_data);
      res.render('index', { title: 'Barner', glasses_data: glassesDecodedData, sunglasses_data: sunglassesDecodedData });
    })
  })
});

router.get('/products/:category', function(req, res, next) {
  let cat = req.params.category;
  if (cat == 'Eyeglasses') {
    fs.readFile('public/javascripts/json/glasses_products_data.json', 'utf-8', (err, data) => {
      let decodedData = JSON.parse(data);
      res.render('products', { title: req.params.category, product_data: decodedData, testest: "Halo", layout: false })
    })
  } else if (cat == 'Sunglasses') {
    fs.readFile('public/javascripts/json/sunglasses_products_data.json', 'utf-8', (err, data) => {
      let decodedData = JSON.parse(data);
      res.render('products', { title: req.params.category, product_data: decodedData })
    })
  }
})

router.post('/products/:category', function(req, res, next) {
  res.send(req.body.test)
})

router.get('/product/:category/:name/:color', function(req, res, next) {
  let productName = req.params.name.replace("_", " ");
  let productColor = req.params.color.replace("_", " ");

  if (req.params.category == "Eyeglasses") {
    fs.readFile('public/javascripts/json/glasses_products_data.json', 'utf-8', (err, data) => {
      let decodedData = JSON.parse(data);
      let productData = decodedData.filter(x => x.productName.replace("í", "i") == productName && x.productColor.toLowerCase() == productColor.toLowerCase())[0];
      res.render('product_detail', { title: productName + " - " + productColor, product_data_list: decodedData, product_data: productData, category: req.params.category })
    })
  } else if (req.params.category == "Sunglasses") {
    fs.readFile('public/javascripts/json/sunglasses_products_data.json', 'utf-8', (err, data) => {
      let decodedData = JSON.parse(data);
      let productData = decodedData.filter(x => x.productName.replace("í", "i") == productName && x.productColor.toLowerCase() == productColor.toLowerCase())[0];
      res.render('product_detail', { title: productName + " - " + productColor, product_data_list: decodedData, product_data: productData, category: req.params.category })
    })
  }
})

router.get('/about-us', function(req, res, next) {
  res.render('about-us', { title: "About-Us" });
})

router.get('/cart', function(req, res, next) {
  if (req.cookies.cart) {
    fs.readFile('public/javascripts/json/glasses_products_data.json', 'utf-8', (err, glassesData) => {
      fs.readFile('public/javascripts/json/sunglasses_products_data.json', 'utf-8', (err, sunglassesData) => {
        let decodedGlassesData = JSON.parse(glassesData);
        let decodedSunglassesData = JSON.parse(sunglassesData);
        let aaa = decodedGlassesData.concat(decodedSunglassesData);
        var productList = [];
        
        aaa.forEach(x => {
          req.cookies.cart.forEach(y => {
            if (x.productName == y.productName && x.productColor == y.productColor) {
              productList.push({product: x, id: y.id});
            }
          })
        })
  
        res.render('cart', { title: "Cart", productList: productList });
      })
    })
  } else {
    res.render('cart', { title: "Cart", productList: [] });
  }
})

router.post('/addToCart', function(req, res, next) {
  if (!req.cookies.uuid) {
    res.cookie('uuid', uuid4(), {maxAge: 1000 * 60 * 60 * 24 * 30})
    res.send('set cookie')
  } else {
    var isExist = false
    if (req.cookies.cart) {
      if (req.cookies.cart.length > 0) {
        isExist = true;
      } 
    }

    let id = isExist ? req.cookies.cart.sort((x, y) => x.id > y.id)[0].id + 1 : 0;
    let productData = {...req.body.data, id};
    let cart = isExist ? [productData].concat(req.cookies.cart) : [productData];

    res.cookie('cart', cart, {maxAge: 1000 * 60 * 60 * 24 * 30})
    res.send('cookie exist');
  }
})

router.post('/cart/delete', function(req, res, next) {
  var selectedIndices = JSON.parse(req.body.index);
  var cart = req.cookies.cart;
  for (var i of selectedIndices) {
    cart = cart.filter(x => x.id != i);
  }
  res.cookie('cart', cart, {maxAge: 1000 * 60 * 60 * 24 * 30});
  res.redirect('/cart')
})

router.post('/glasses/search', function(req, res, next) {
  let glassesDataJson = fs.readFileSync('public/javascripts/json/glasses_products_data.json', 'utf-8');
  let sunlassesDataJson = fs.readFileSync('public/javascripts/json/sunglasses_products_data.json', 'utf-8');

  let decodedGlassesData = JSON.parse(glassesDataJson);
  let decodedSunglassesData = JSON.parse(sunlassesDataJson);

  let glassesResults = decodedGlassesData.filter(x => x.productName.toLowerCase().includes(req.body.data.value.toLowerCase()));
  let sunglassesResults = decodedSunglassesData.filter(x => x.productName.toLowerCase().includes(req.body.data.value.toLowerCase()));
  res.send({ glasses: glassesResults, sunglasses: sunglassesResults});
})

module.exports = router;
