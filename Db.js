var express = require('express');
var http = require('http');
var path = require('path');
var config = require('nodejs-config');
var Product = require('./models/product').Product;
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/promsnabdbadmin');

Product.insert = function (title, description, category, price, show, meta) {
    var product = new Product({
        title: title,
        description: description,
        category: category,
        price: price,
        show: show,
        meta: meta
    });

    product.save(function (err) {
        if (err) throw err;
        Product.find(function (err, product) {
            console.log(product);
        });
    });
};
Product.findToTitle =  function (title) {
Product.find({title:title}, function (err, product) {
   if (err) throw err;
   Product.item = product;
})
};
module.exports = Product;




