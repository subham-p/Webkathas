var express =require("express");
var router =express.Router(),
Carousel       = require("../models/carousel"),
middleware = require("../middleware");


//=================================
//Showing the new carousel
//=================================

router.get("/carousel/new",checkadmin,function(req, res){
    res.render("carousel/new")
});


//=================================
//Creating  new carousel
//=================================

router.post("/carousel",checkadmin,function(req, res){
    Carousel .create(req.body.crsl, function(err,newRecomended){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});


//=================================
//Editing the new carousel
//=================================

router.get("/carousel/:id/edit",checkadmin,function(req, res){
    Carousel.findById(req.params.id,function(err,updatedBook){
        if(err||!updatedBook){
            console.log(err);
             req.flash("error","Carousel did Not found")
            res.redirect("back")
            
        } else{
             res.render("carousel/edit",{recomend:updatedBook})
        }
    })
   
});

router.put("/carousel/:id",checkadmin,function(req, res){
    Carousel .findByIdAndUpdate(req.params.id,req.body.crsl, function(err,updatedBook){
        if(err||!updatedBook){
             req.flash("error","Book did Not found")
            res.redirect("back")
        } else{
            res.redirect("/");
        }
    })
})



//=================================
//Checking if admin or not
//=================================
function checkadmin(req, res, next){
    if(req.user&&req.user.isAdmin){
        next()
    } else{
                 req.flash("error","You don't have permission to do that.")
                res.redirect("back");
            }
}

module.exports=router;