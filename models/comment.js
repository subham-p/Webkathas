var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String,
        profile:String
    },
    replies:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }],
    repliedTo:{
          userid:{ type:mongoose.Schema.Types.ObjectId,
            ref:"User"},
        username:String,
        text:String,
        image:String
      },
    book:{
          bookid:{ type:mongoose.Schema.Types.ObjectId,
            ref:"Book"},
        title:String,
        image:String
      },
    chapter:{
          chapterid:{ type:mongoose.Schema.Types.ObjectId,
            ref:"Chapter"},
        no:String,
        title:String
      },
      comdate:Date
});
 
module.exports = mongoose.model("Comment", commentSchema);