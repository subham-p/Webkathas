var mongoose = require("mongoose");
 
var guidanceSchema = new mongoose.Schema({
   title: String,
   image: String,
   bookid:String,
});
 
module.exports = mongoose.model("Guidance", guidanceSchema);