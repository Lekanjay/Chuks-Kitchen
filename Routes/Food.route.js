const express=require("express")
const foodModel=require("../Models/Food.model")
const foodRouter=express.Router()
const isAdmin = require("../Authorization/Auth").isAdmin
const Auth = require("../Authorization/Auth").passport
foodRouter.get('/', (req, res) => {
    foodModel.find()
        .then(foods => {
            res.status(200).json(foods)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})
foodRouter.post('/',Auth.authenticate("jwt", { session: false }), (req,res)=>{
    const food =req.body
    foodModel.create(food)
    .then(food=>{
        res.status(201).send(food)
    }).catch(err=>{
        console.log(err)
            res.status(500).send(err)
    })
})
module.exports=foodRouter