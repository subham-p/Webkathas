var mongoose = require("mongoose");
 
var recomendedSchema = new mongoose.Schema({
   title: String,
   image: String,
   bookid:String,
   synopsis:String
});
 
module.exports = mongoose.model("Recomended", recomendedSchema);