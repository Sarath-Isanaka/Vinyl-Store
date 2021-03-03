const mongoose = require("mongoose");
const product = require("./product");
const {ObjectId} = mongoose.Schema

const ProductCartSchema = new mongoose.Schema({
    product: {
        type : ObjectId,
        ref : "Product"
    },
    name : String,
    count : Number,
    price : Number
})

var ProductCart = mongoose.model("ProcuctCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema({
    products : [ProductCartSchema],
    transaction_id : {},
    amount : {type : Number},
    address : String,
    status : {
        type : String,
        default : "Received",
        enum : ["Cancelled", "Delivered", "Shipped", "Processing", "Received"]
    },
    updated : Date,
    user : {
        type : ObjectId,
        ref : "User",
    }
},{timestamps : true})

const Order = mongoose.model("Order",OrderSchema);

module.exports = {Order, ProductCart}