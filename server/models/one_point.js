let mongoose = require('mongoose');

//Schema Validation

let userSchemao = mongoose.Schema({
    fx : {type: String ,required : true },
    x : {type: Number ,required : true}
    
});

let onepoint = mongoose.model('one_point',userSchemao);
module.exports = onepoint;