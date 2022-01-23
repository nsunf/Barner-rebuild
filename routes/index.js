var express = require('express');
var router = express.Router();
var fs = require('fs');
const { decode } = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('public/javascripts/glasses_products_data.json', 'utf-8', (err,data) => {
    let decodedData = JSON.parse(data);
    res.render('index', { title: 'Barner', glasses_data: decodedData });
  })
});

module.exports = router;
