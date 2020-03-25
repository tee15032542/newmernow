let mongoose = require('mongoose');

//Schema Validation

let userScheman = mongoose.Schema({
    fx : {type: String ,required : true },
    x : {type: Number ,required : true}
    
});

let newton = mongoose.model('newton',userScheman);
module.exports = newton;