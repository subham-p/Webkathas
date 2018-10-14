// all middlewaare goes her
var middlewareObj ={},
User        = require("../models/user"),
Chapter  = require("../models/chapter"),
Book  = require("../models/book"),
Recomended        = require("../models/recomended"),
Library        = require("../models/library"),
Guidance        = require("../models/guidance"),

Comment     = require("../models/comment");



middlewareObj.checkBookOwnership= function(req, res,next) {
    if(req.isAuthenticated()){

        Book.findById(req.params.id, function(err, foundBook){
       if(err || !foundBook)
       {
            req.flash("error","Book Not found")
           res.redirect("back");
       }
       else
       {
                   //does user own the Book?
            if(foundBook.author.id.equals(req.user._id)){
                next()
            } else{
                 req.flash("error","You don't have permission to do that.")
                res.redirect("back");
            }
          
       }
    });
    } else{
         req.flash("error","You need to be loggedin to do that.")
        res.redirect("back");
    }
}

    
middlewareObj.checkChapterOwnership= function(req, res,next) {
    if(req.isAuthenticated()){

        Chapter.findById(req.params.chapter_id, function(err, foundChapter){
       if(err|| !foundChapter)
       {
            req.flash("error","Chapter not found")
           res.redirect("back");
       }
       else
       {
                   //does user own the Book?
            if(foundChapter.author.id.equals(req.user._id)){
                next()
            } else{
                 req.flash("error","you don't have permisiion to do that")
                res.redirect("back");
            }
          
       }
    });
    } else{
         req.flash("error","you need to be logged in to do that")
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership= function(req, res,next) {
    if(req.isAuthenticated()){

        Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err|| !foundComment)
       {
            req.flash("error","Chapter not found")
           res.redirect("back");
       }
       else
       {
                   //does user own the Book?
            if(foundComment.author.id.equals(req.user._id)){
                next()
            } else{
                 req.flash("error","you don't have permisiion to do that")
                res.redirect("back");
            }
          
       }
    });
    } else{
         req.flash("error","you need to be logged in to do that")
        res.redirect("back");
    }
}

    
middlewareObj.isLoggedIn =function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be loggedin to do that.")
    res.redirect("/login");
}

middlewareObj.adminOwnership= function(req, res,next) {
    if(req.isAuthenticated()){
        Recomended.findById(req.params.id, function(err, recom){
       if(err || !recom)
       {
            req.flash("error","Book Not found")
           res.redirect("back");
       }
       else
       {
          
                   //does user own the Book?
            if(req.user &&req.user.isAdmin){
                next()
            } else{
                 req.flash("error","You don't have permission to do that.")
                res.redirect("back");
            }
          
       }
    });
    } else{
         req.flash("error","You need to be loggedin to do that.")
        res.redirect("back");
    }
}

middlewareObj.guidadminOwnership= function(req, res,next) {
    if(req.isAuthenticated()){
        Guidance.findById(req.params.id, function(err, recom){
       if(err || !recom)
       {
            req.flash("error","Book Not found")
           res.redirect("back");
       }
       else
       {
          
                   //does user own the Book?
            if(req.user &&req.user.isAdmin){
                next()
            } else{
                 req.flash("error","You don't have permission to do that.")
                res.redirect("back");
            }
          
       }
    });
    } else{
         req.flash("error","You need to be loggedin to do that.")
        res.redirect("back");
    }
}



middlewareObj.libraryOwnership= function(req, res,next) {
    if(req.isAuthenticated()){

        Library.findById(req.params.library_id, function(err, foundLibrary){
       if(err|| !foundLibrary)
       {
            req.flash("error","Chapter not found")
           res.redirect("back");
       }
       else
       {
                   //does user own the Book?
            if(foundLibrary.author.id.equals(req.user._id)){
                next()
            } else{
                 req.flash("error","you don't have permisiion to do that")
                res.redirect("back");
            }
          
       }
    });
    } else{
         req.flash("error","you need to be logged in to do that")
        res.redirect("back");
    }
}


module.exports= middlewareObj