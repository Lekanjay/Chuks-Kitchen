const express=require("express")
const orderModel=require("../Models/Order.model")
const foodModel=require("../Models/Food.model")
const orderRouter=express.Router()
const isAdmin = require("../Authorization/Auth").isAdmin
const Auth = require("../Authorization/Auth").passport

orderRouter.get('/', Auth.authenticate("jwt", { session: false }), (req, res) => {
    orderModel.find()
        .then(orders => {
            res.json(orders);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
    })
orderRouter.post('/', (req, res) => {
    const { items, totalPrice } = req.body;
    const userId = req.user._id;
    const newOrder = new orderModel({
        user: userId,
        items,
        totalPrice
    });
    newOrder.save()
        .then(order => {
            res.status(201).json(order);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
    })
module.exports=orderRouter