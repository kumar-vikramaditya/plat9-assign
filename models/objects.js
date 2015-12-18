var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var objSchema = new Schema({
	id:{ type: Number},
    color : { type: String}
});
      
module.exports = mongoose.model('Object', objSchema);