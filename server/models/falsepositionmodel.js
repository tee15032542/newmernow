let mongoose = require('mongoose');

//Schema Validation

let userSchemaf = mongoose.Schema({
    fx : {type: String ,required : true },
    xl : {type: Number ,required : true},
    xr : {type: Number ,required : true}
});

let falsepositionmodel = mongoose.model('falsepositionmodel',userSchemaf);
module.exports = falsepositionmodel;