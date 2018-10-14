var express =require("express");
var router =express.Router(),
 User        = require("../models/user"),
 Book  = require("../models/book"),
Chapter= require("../models/chapter");


router.get("/about",function(req, res) {
    res.render("index")
})


//=============================================
//Showing the author profile
//=============================================
router.get("/author/:id", function(req, res){
    User.findById(req.params.id,function(err, foundUser){
        if(err||!foundUser){
            req.flash("error","user Not found")
            res.redirect("back")
        } else{
            Book.find().where('author.id').equals(foundUser._id).exec( function(err, book){
                if(err){
                    console.log(err);
                } else{
                    res.render("author/profile",{user:foundUser,book:book});
                }
            });
        }
    });
});



//=============================================
//Showing the author books
//=============================================

router.get("/author/:id/books/:book_id", function(req, res){
    User.findById(req.params.id,function(err, foundUser){
        if(err||!foundUser){
            req.flash("error","User Not found")
            res.redirect("back")
        } else{
    Book.findById(req.params.book_id).populate("chapters").exec(function(err,foundBook){
        if(err||!foundBook){
            req.flash("error","Book Not found")
            res.redirect("back")
        } else{
            
            res.render("author/book",{book:foundBook })
        }
    })
        }
})
})

module.exports=router;