var mongoose = require("mongoose");
 
var carouselSchema = new mongoose.Schema({
   image: String,
});
 
module.exports = mongoose.model("Carousel", carouselSchema);