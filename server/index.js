var express=require('express')

var app=express()

var appData=require('../data.json')

var seller =appData.seller
var goods =appData.goods
var ratings =appData.ratings

app.get('/seller',function(req,res){
      res.json({
            errno:0,
            data:seller
      })
})

app.get('/goods',function(req,res){
      res.json({
            errno:0,
            data:goods
      })
})

app.get('/ratings',function(req,res){
      res.json({
            errno:0,
            data:ratings
      })
})

app.listen('8000',function(){
      console.log('running at 8000')
})