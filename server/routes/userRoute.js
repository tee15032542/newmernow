var express = require('express');
var router = express.Router();

let Trap = require('../models/Trap');
let bisectionmodel = require('../models/bisectionmodel');
let falsepositionmodel = require('../models/falsepositionmodel');
let newton = require('../models/newton');
let one_point = require('../models/one_point');
/* GET users listing. */

/////////////////////////////////////////////////////////////

router.get('/showtrap', function(req, res, next) {
 
  Trap.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/addtrap',(req,res)=>{
  console.log(req.body);
  let doc = new Trap(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
//////// shows ///////////
router.get('/showbisectionmodel', function(req, res, next) {
 
  bisectionmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/bisectionmodel',(req,res)=>{
  console.log(req.body);
  let doc = new bisectionmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
/////////////////////////////////////////////////////////////
router.get('/showfalsepositionmodel', function(req, res, next) {
 
  falsepositionmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/falsepositionmodel',(req,res)=>{
  console.log(req.body);
  let doc = new falsepositionmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////
router.get('/shownewton', function(req, res, next) {
 
  newton.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/newton',(req,res)=>{
  console.log(req.body);
  let doc = new newton(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////
router.get('/showone_point', function(req, res, next) {
 
  one_point.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/one_point',(req,res)=>{
  console.log(req.body);
  let doc = new one_point(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

module.exports = router;
