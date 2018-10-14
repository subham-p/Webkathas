var mongoose = require("mongoose"),
Comment     = require("./comment"),
Library        = require("../models/library"),
Chapter= require("./chapter");
 var Rating = require("../models/rating");

var bookSchema = new mongoose.Schema({
   title: String,
   image: String,
   imageId: String,
   synopsis: String,
   range:String,
   author:{
     id:{
        type:mongoose.Schema.Types.ObjectId,
            ref:"User"
     } ,
     username:String,
     userimage:String
   },
   chapters: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Chapter"
      }
   ],ratings: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Rating"
      }
   ],
   rating: { type: Number, default: 0 },
   genre:String ,
   date:Date
});
 
 bookSchema.pre('remove', async function(next) {
    try{
       await Comment.remove({
          "chapter.chapterid":{
             $in:this.chapters
          }
       })
       await Chapter.remove({
          "_id":{
             $in:this.chapters
          }
       });
       await Rating.remove({
          "_id":{
             $in:this.ratings
          }
       })
       await Library.remove({
          "book.id":{
             $in:this._id
          }
       })
       
    }catch(err){
    
       next(err);
    }
    }
 )
 
//  bookSchema.pre('save', async function(next) {
//     try{
   
//       await Chapter.findById( this.chapters ,function(err,chap){
//           chap.author.book_name=bookSchema.title;
//           chap.save()
//       })
      
     
       
//     }catch(err){
    
//       next(err);
//     }
//     }
//  )
 
module.exports = mongoose.model("Book", bookSchema);