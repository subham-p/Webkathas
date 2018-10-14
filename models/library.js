var mongoose = require("mongoose");
 
var librarySchema = new mongoose.Schema({
    text:String,
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    book: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book"
        },
         book_image:String,
         book_title:String
    }
    
 
        
});
 
module.exports = mongoose.model("Library", librarySchema);