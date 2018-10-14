var express =require("express");
var router =express.Router(),
Chapter  = require("../models/chapter"),
Book  = require("../models/book"),
middleware = require("../middleware"),
Comment     = require("../models/comment");


// ====================
// NEw COMMENTS ROUTES:creating new comment
// ====================

router.get("/books/:id/chapters/:chapter_id/comments/new",middleware.isLoggedIn, function(req, res){
    // find campground by id
    Book.findById(req.params.id, function(err, book ){
        if(err||!book){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else {
            Chapter.findById(req.params.chapter_id, function(err, chapter){
                if(err||!chapter){
             req.flash("error","Chapter did Not found")
            res.redirect("back")
                } else {
                     res.render("comments/new", {chapter:chapter,book:book,reply:null});
                }
            })
            
        }
    })
});

// ====================
// Create COMMENTS ROUTES: creating new comments
// ====================

router.post("/books/:id/chapters/:chapter_id/comments",middleware.isLoggedIn,function(req, res){
   if(req.user.username){
   Book.findById(req.params.id, function(err, book){
       if(err||!book){
             req.flash("error","Book did Not found")
            res.redirect("back")
       } else {
           Chapter.findById(req.params.chapter_id, function(err, chapter) {
                if(err||!chapter){
             req.flash("error","Chapter did Not found")
            res.redirect("back")
                } else {
                    Comment.create(req.body.comment, function(err, comment){
                       if(err){
                           console.log(err);
                       } else {
                         
                           comment.book.bookid=book._id;
                           comment.chapter.chapterid=chapter._id;
                           comment.author.id = req.user._id;
                           comment.comdate= new Date();
                           comment.save();
                           chapter.comments.push(comment);
                           chapter.save();
                          
                           
                            req.flash("success","Sucessfully added comment");
                           res.redirect('/books/' + book._id+'/chapters/'+chapter._id);
                       }
                    });
                }
               
           })
        
       }
   });
} else{
        req.flash('error','username Required')
        res.redirect('/username/' + req.user._id)
    }
});

// ====================
// Edit COMMENTS ROUTES:Editing comments
// ====================



router.get("/books/:id/chapters/:chapter_id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req, res){
   Book.findById(req.params.id, function(err, book){
       if(err||!book){
             req.flash("error","Book did Not found")
            res.redirect("back")
       } else {
           Chapter.findById(req.params.chapter_id, function(err, chapter) {
                if(err||!chapter){
             req.flash("error","Chapter did Not found")
            res.redirect("back")
                } else {
                    Comment.findById(req.params.comment_id, function(err, comment){
                       if(err||!comment){
             req.flash("error","Commentr did Not found")
            res.redirect("back")
                       } else {
                           res.render("comments/edit",{Book:book,Chapter:chapter,com:comment})
                       }
                    });
                }
               
           })
        
       }
   });
});

router.put("/books/:id/chapters/:chapter_id/comments/:comment_id",middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
                       if(err||!updatedComment){
             req.flash("error","Comment did Not found")
            res.redirect("back")
                       } else {

                           res.redirect("/books/"+req.params.id+"/chapters/"+req.params.chapter_id)
                       }
                    });
});


// ====================
// Delete COMMENTS ROUTES:Deleting comments
// ====================

router.delete("/books/:id/chapters/:chapter_id/comments/:comment_id",middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err,updatedComment){
                       if(err||!updatedComment){
             req.flash("error","Commentr did Not found")
            res.redirect("back")
                       } else {
                           res.redirect("/books/"+req.params.id+"/chapters/"+req.params.chapter_id);
                       }
                    });
});




//====================================================================================
//====================================================================================
// Replies




// ====================
// NEw COMMENTS REPLY ROUTES:creating new reply comment
// ====================
router.get("/books/:id/chapters/:chapter_id/:comment_id/reply/new",middleware.isLoggedIn, function(req, res){
    // find campground by id
    Book.findById(req.params.id, function(err, book ){
        if(err||!book){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else {
            Chapter.findById(req.params.chapter_id, function(err, chapter){
                if(err||!chapter){
             req.flash("error","Chapter did Not found")
            res.redirect("back")
                } else {
                    Comment.findById(req.params.comment_id,function(err, comment) {
                        if(err||!comment){
             req.flash("error","Commentr did Not found")
            res.redirect("back")
                        } else{
                            res.render("comments/new", {chapter:chapter,book:book,comment:comment,reply:true});
                        }
                    })
                     
                }
            })
            
        }
    })
});

// ====================
// Create COMMENTS REPLY ROUTES:creating new reply comment
// ====================
router.post("/books/:id/chapters/:chapter_id/:comment_id/reply",middleware.isLoggedIn,function(req, res){
   if(req.user.username){
   Book.findById(req.params.id, function(err, book){
       if(err||!book){
             req.flash("error","Book did Not found")
            res.redirect("back")
       } else {
           Chapter.findById(req.params.chapter_id, function(err, chapter) {
                if(err||!chapter){
             req.flash("error","Chapter did Not found")
            res.redirect("back")
                } else {
                    Comment.findById(req.params.comment_id,function(err, orcomment) {
                        if(err||!orcomment){
             req.flash("error","Commentr did Not found")
            res.redirect("back")
                        } else {
                            Comment.create(req.body.comment, function(err, recomment){
                       if(err){
                           console.log(err);
                       } else {
                           
                           recomment.book.bookid=book._id;
                           recomment.chapter.chapterid=chapter._id;
                           
                           recomment.author.id = req.user._id;
                           
                           recomment.repliedTo.userid=orcomment.author.id;
                           
                           recomment.repliedTo.text=orcomment.text;
                           
                           recomment.comdate= new Date();
                           recomment.save();
    
                           orcomment.replies.push(recomment);
                           orcomment.save();
                           chapter.comments.push(recomment);
                           chapter.save();
                            req.flash("success","Sucessfully added comment")
                           res.redirect('/books/' + book._id+'/chapters/'+chapter._id);
                       }
                    });
                        }
                        
                    })
                    
                }
               
           })
        
       }
   });
   } else{
        req.flash('error','username Required')
        res.redirect('/username/' + req.user._id)
    }
});



module.exports=router;