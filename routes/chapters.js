var express =require("express");
var router =express.Router(),
User        = require("../models/user"),
Book  = require("../models/book"),
middleware = require("../middleware"),
Comment     = require("../models/comment"),
Chapter= require("../models/chapter");






//==============================
// New Route:To Create New Chapters 
//==============================
router.get("/books/:id/chapters/new",middleware.isLoggedIn, function(req, res){
    if(req.user.username){
    Book.findById(req.params.id, function(err, foundBook){
        if(err){
            console.log(err);
        } else{
            res.render("chapters/new",{book:foundBook});
        }
    });
    } else{
        req.flash('error','username Required')
        res.redirect('/username/' + req.user._id)
    }
});




//==================================================
//Create route:The post route to create the chapters
//==================================================

router.post("/books/:id/chapters",middleware.isLoggedIn, function(req, res){
    Book.findById(req.params.id, function(err,book){
        if(err ||!book){
            req.flash("error",err)
            res.redirect("back");
        } else{
            
            Chapter.create(req.body.chapter,function(err, chapter){
                if(err || !chapter){
                    req.flash("error","some error")
            res.redirect("back");
                } else {
                chapter.author.id = req.user._id;
                chapter.author.book_id = req.params.id;
                chapter.datechap= new Date();
                chapter.save();
                book.chapters.push(chapter);
                book.save();
                res.redirect("/author/"+req.user._id+"/books/"+book._id);
                }
            });
        }
    });
});



//=================================================
//Index Routes(showing all the chapter information)
//=================================================
router.get("/books/:id/chapters/:chapter_id", function(req, res){
    Book.findById(req.params.id).populate("chapters author.id").exec( async function(err, book) {
        if(err||!book){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else {
      
        // using async ==============================
        try{
            
            //previous chapter
          let next1=  await Chapter.find({"_id": { "$gt":req.params.chapter_id }}).where('author.book_id').equals(book._id).sort("datechap").limit(1).exec();
          let prev1= await Chapter.find({"_id": { "$lt":req.params.chapter_id }}).where('author.book_id').equals(book._id).sort({"datechap":-1}).limit(1).exec();
          let commmentCount =  await Comment.find().where('chapter.chapterid').equals(req.params.chapter_id).countDocuments();
            Chapter.findById(req.params.chapter_id).populate({path : "comments", populate : {path : "replies author.id  repliedTo.userid"}}).exec(function(err, chapter) {
                if(err||!chapter){
                     req.flash("error","Chapter Not found")
                     res.redirect("back")
                } else{
                    
                    res.render("chapters/show",{chapter:chapter,book:book,next:next1[0],prev:prev1[0],count:commmentCount});
                }
            });    
        } catch(err){
            res.redirect("back");
            console.log(err);
        }
        }
    });
});


//=================================================
//Edit Routes:editing the chapters
//=================================================

router.get("/books/:id/chapters/:chapter_id/edit",middleware.checkChapterOwnership, function(req, res) {
    Book.findById(req.params.id, function(err, book) {
        if(err||!book){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else {
            Chapter.findById(req.params.chapter_id, function(err, chapter) {
                if(err||!chapter){
                     req.flash("error","Chapter Not found")
            res.redirect("back")
                } else{
                    res.render("chapters/edit",{chap:chapter,book:book});
                }
            });
        }
    });
});

router.put("/books/:id/chapters/:chapter_id",middleware.checkChapterOwnership, function(req ,res){
            Chapter.findByIdAndUpdate(req.params.chapter_id, req.body.chapter,async function(err,update){
                if(err){
                    req.flash("error","Chapter Not found")
            res.redirect("back")
                } else {
                    
                     res.redirect("/author/"+req.user._id+"/books/"+req.params.id);
                }
            });
});



//=================================================
//Delete Routes:Deleting the chapters
//=================================================
router.delete("/books/:id/chapters/:chapter_id",middleware.checkChapterOwnership, function(req ,res){
            Chapter.findById(req.params.chapter_id,function(err,chapter){
                if(err){
                     req.flash("error","Chapter Not found")
            res.redirect("back")
                } else {
                    chapter.remove();
                    req.flash("success","chapters removed");
                     res.redirect("/author/"+req.user._id+"/books/"+req.params.id);
                }
            });
});



module.exports=router;