const express=require('express')
const path=require('path')
var router=express.Router()

router.get('/', function (req, res) {
    res.sendFile(path.resolve('./views/index.html'))
})

module.exports=router