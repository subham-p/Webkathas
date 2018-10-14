var express =require("express");
var router =express.Router(),
Guidance       = require("../models/guidance"),
middleware = require("../middleware");

//=========================
//Creating a new recomendation
//=========================

router.get("/guidance/new",checkadmin,function(req, res){
    res.render("guidance/new");
});

router.get("/guidance",function(req, res){
        Guidance.find({},function(err,updatedBook){
        if(err||!updatedBook){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else{
             res.render("guidance/show",{guidance:updatedBook})
        }
    })
});

router.post("/guidance",checkadmin,function(req, res){
    Guidance.create(req.body.recom, function(err,newRecomended){
        if(err){
            console.log(err);
        } else {
            res.redirect("/guidance");
        }
    });
});

//=========================
//Editing a new recomendation
//=========================

router.get("/guidance/edit/:id",middleware.guidadminOwnership,function(req, res){
    Guidance.findById(req.params.id,function(err,updatedBook){
                
        if(err){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else{
             res.render("guidance/edit",{guidance:updatedBook})
        }
    })
   
});

router.put("/guidance/:id",middleware.guidadminOwnership,function(req, res){
    Guidance.findByIdAndUpdate(req.params.id,req.body.recom, function(err,updatedBook){
        if(err||!updatedBook){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else{
            res.redirect("/guidance");
        }
    })
})

function checkadmin(req, res, next){
    if(req.user&&req.user.isAdmin){
        next()
    } else{
                 req.flash("error","You don't have permission to do that.")
                res.redirect("back");
            }
}

module.exports=router;