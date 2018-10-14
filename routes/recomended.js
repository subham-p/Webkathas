var express =require("express");
var router =express.Router(),
Recomended        = require("../models/recomended"),
middleware = require("../middleware");

//=========================
//Creating a new recomendation
//=========================

router.get("/recomended/new",checkadmin,function(req, res){
    res.render("recomended/new")
});

router.post("/recomended",checkadmin,function(req, res){
    Recomended.create(req.body.recom, function(err,newRecomended){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

//=========================
//Editing a new recomendation
//=========================

router.get("/recomended/:id/edit",middleware.adminOwnership,function(req, res){
    Recomended.findById(req.params.id,function(err,updatedBook){
        if(err||!updatedBook){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else{
             res.render("recomended/edit",{recomend:updatedBook})
        }
    })
   
});

router.put("/recomended/:id",middleware.adminOwnership,function(req, res){
    Recomended.findByIdAndUpdate(req.params.id,req.body.recom, function(err,updatedBook){
        if(err||!updatedBook){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else{
            res.redirect("/");
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