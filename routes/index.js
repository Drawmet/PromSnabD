var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product').Product;

mongoose.connect('mongodb://127.0.0.1:27017/promsnabdbadmin');

router.get('/get-data',function (req, res) {
   Product.find()
       .then(function (doc) {
       res.send(doc);
   });
});

router.get('/findByTitle',function (req, res) {
    Product.find({title:req.body.title})
        .then(function (doc) {
        res.send(doc);
    });
});

router.get('/findByCategory', function (req, res) {
    Product.find({category:req.body.category})
        .then(function (doc) {
            res.send(doc);
        });
});

router.post('/insert-data', function (req, res) {
   var item = {
       title: req.body.title,
       description: req.body.description,
       category: req.body.category,
       price: req.body.price,
       img: req.body.img,
       show: req.body.show,
       meta: req.body.meta
   };
   var data = new Product(item);
   data.save();
   res.redirect('/');
});

router.post('/update-data', function (req, res) {
   var data = {
       _id : req.body._id,
       title: req.body.title,
       description : req.body.description,
       category : req.body.category,
       price : req.body.price,
       img : req.body.img,
       show : req.body.show,
       meta : req.body.meta
   };
   Product.findByIdAndUpdate(data._id, {$set: {
       title: data.title,
       description : data.description,
       category: data.category,
       price: data.price,
       img : data.img,
       show: data.show,
       meta: data.meta
   }}, function (err, doc) {
       if(err){
         console.error('error, no entry found');
       }
   });
   res.redirect('/');
});

router.post('/delete-data', function (req, res) {
    Product.findByIdAndRemove(req.body._id,function (err) {
        if (err) {
            console.error('error, no entry found');
        }
    });
    res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
