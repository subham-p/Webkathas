var mongoose = require("mongoose"),
Comment     = require("./comment");
 
var chapterSchema = new mongoose.Schema({
    text: String,
    title: String,
    author_thought:String,
    chapter_no:Number,
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },username:String,
        book_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book"
        },book_name:String
        
    },
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
   datechap:Date,
});
 
 chapterSchema.pre('remove', async function(next) {
    try{
       await Comment.remove({
          "_id":{
             $in:this.comments
          }
       })
       
    }catch(err){
    
       next(err);
    }
    }
 )
 
 
module.exports = mongoose.model("Chapter", chapterSchema);