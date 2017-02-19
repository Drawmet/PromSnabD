var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    show:{
        type:Boolean,
    },
    meta:{
        type:Array
    }
});

exports.Product = mongoose.model('product', productSchema);