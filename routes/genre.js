var express =require("express");
var router =express.Router(),
 passport    = require("passport"),
 User        = require("../models/user"),
 Book  = require("../models/book"),
Chapter= require("../models/chapter");

// ====================
// Finding genre and showing it
// ====================

router.get("/genre/ALL", function(req, res) {
    Book.find({}).populate("ratings author.id").sort({"date":-1}).exec(function(err,foundBook){
        if(err){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else{
            if(foundBook.length<1){
                              res.render("search",{book:foundBook,"success": "Book coming soon"}); 
            } else {
                           res.render("search",{book:foundBook}); 
            }
     }
    })

})

router.get("/genre/:genre_id", function(req, res){
            const regex = new RegExp(escapeRegex(req.params.genre_id), 'gi');
     
        Book.find({$or:[{genre:regex}]}).populate("ratings author.id").sort({"date":-1}).exec(function(err,foundBook){
        if(err){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else{
            if(foundBook.length<1){
                              res.render("search",{book:foundBook,"success": "Book coming soon"}); 
            } else {
                           res.render("search",{book:foundBook}); 
            }
     }
    })
    })
    
    function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
    
    
module.exports=router;