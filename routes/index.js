var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product').Product;
var url=require('url');

mongoose.connect('mongodb://127.0.0.1:27017/promsnabdbadmin');

router.get('/get-data',function (req, res) {
    Product.find().sort({created:'descending'})
       .then(function (doc) {
       res.send(doc);
       res.end();
   });
});

router.get('/findByTitle',function (req, res) {
    var title = req.param('title');
    Product.find({title:title})
        .then(function (doc) {
        res.send(doc);
    });
});

router.get('/findByCategory', function (req, res) {
    var category = req.param('category');
    Product.find({category:category})
        .then(function (doc) {
            res.send(doc);
        });
});

router.post('/insert-data', function (req, res) {
   var item = {
       title: req.body.title,
       description: req.body.description,
       category: req.body.category,
       subcategory: req.body.subcategory,
       price: req.body.price,
       img: req.body.img,
       show: req.body.show,
       meta: req.body.meta
   };
   var data = new Product(item);
   data.save();
   res.redirect('/');
});

router.post('/update-category', function (req, res) {
    var lastCategory = req.body.category[0];
    var newCategory = req.body.category[1];
    Product.find({category: lastCategory}, function (err, docs) {
        docs.forEach(function (item) {
            Product.findByIdAndUpdate(item._id, {
                $set: {
                    title: item.title,
                    description: item.description,
                    category: newCategory,
                    subcategory: item.subcategory,
                    price: item.price,
                    img: item.img,
                    show: item.show,
                    meta: item.meta
                }
            }, function (err) {
                if (err)
                    console.err('error, no empty found');
            })
        })
    });
    res.redirect('/');
});

router.post('/update-subcategory', function (req, res) {
    var lastCategory = req.body.category[0];
    var newCategory = req.body.category[1];
    console.log(lastCategory + newCategory);
    Product.find({subcategory: lastCategory}, function (err, docs) {
        docs.forEach(function (item) {
            Product.findByIdAndUpdate(item._id, {
                $set: {
                    title: item.title,
                    description: item.description,
                    category: item.category,
                    subcategory: newCategory,
                    price: item.price,
                    img: item.img,
                    show: item.show,
                    meta: item.meta
                }
            }, function (err) {
                if (err)
                    console.err('error, no empty found');
            })
        })
    });
    res.redirect('/');
});

router.post('/update-description', function (req, res) {
    var lastCategory = req.body.category[0];
    var newCategory = req.body.category[1];
    console.log(lastCategory + newCategory);
    Product.find({description: lastCategory}, function (err, docs) {
        docs.forEach(function (item) {
            Product.findByIdAndUpdate(item._id, {
                $set: {
                    title: item.title,
                    description: newCategory,
                    category: item.category,
                    subcategory: item.subcategory,
                    price: item.price,
                    img: item.img,
                    show: item.show,
                    meta: item.meta
                }
            }, function (err) {
                if (err)
                    console.err('error, no empty found');
            })
        })
    });
    res.redirect('/');
});

router.get('/auto-correct',function (req, res) {
    var id = req.param('id');
    Product.findById(id)
        .then(function (doc) {
            res.send(doc);
        });
});

router.post('/update-data', function (req, res) {
    console.log(req.body.title);
   var data = {
       _id : req.body._id,
       title: req.body.title,
       description : req.body.description,
       category : req.body.category,
       subcategory: req.body.subcategory,
       price : req.body.price,
       img : req.body.img,
       show : req.body.show,
       meta : req.body.meta
   };

   Product.findByIdAndUpdate(data._id, {$set: {
       title: data.title,
       description : data.description,
       category: data.category,
       subcategory: data.subcategory,
       price: data.price,
       img : data.img,
       show: data.show,
       meta: data.meta
   }}, function (err) {
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


router.get('/admin', function(req, res) {
  res.render('admin');
});

module.exports = router;
