var express =require("express");
var router =express.Router(),
User        = require("../models/user"),
middleware = require("../middleware"),
Chapter= require("../models/chapter"),
Library        = require("../models/library"),
Comment     = require("../models/comment"),
Book  = require("../models/book");
var moment = require("moment");


//=============================================
//Multer requirements
//=============================================

var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'webkathas', 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});






//==============================================
//Create route:The post route to create the book
//==============================================
router.post("/books",middleware.isLoggedIn, upload.single('image'), function(req, res){
    if(req.user.username){
    var usid=req.user.username;
    var bookcloud=String(usid)+'/book';
    var title =req.body.title,
        synopsis=req.body.synopsis,
        date= new Date(),
        genre=req.body.genre,
        range=req.body.range,
        author ={
        id:req.user._id
    };
    
    if(req.file){
     cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
     var image = result.secure_url,
        imageId = result.public_id;
     var newBook ={title:title,image:image,synopsis:synopsis,author:author, date:date, genre:genre,range:range, imageId: imageId};
     Book.create(newBook, function(err,newlyCreated){
         if(err){
             console.log(err);
         } else{
             res.redirect("/author/"+req.user._id);
         }
     });
},{ folder: String(bookcloud),use_filename: true});
    } else{
         var newBook ={title:title,synopsis:synopsis,author:author, date:date, genre:genre,range:range,imageId: "null"};
         Book.create(newBook, function(err,newlyCreated){
         if(err){
             console.log(err);
         } else{
             res.redirect("/author/"+req.user._id);
         }
    });
    }
    } else{
        req.flash('error','username Required')
        res.redirect('/username/' + req.user._id)
    }
});

//==============================
// New Route:To Create New books
//==============================
router.get("/books/new",middleware.isLoggedIn, function(req, res){
    if(req.user.username){
    User.findById(req.user._id, function(err, user) {
        if(err||!user)
        {
            res.redirect("back")
        } else {
             res.render("books/new",{user:user});
        }
    })
   } else{
        req.flash('error','username Required')
        res.redirect('/username/' + req.user._id)
    }
});


//===================================
// show route: To show the books info
//===================================
router.get("/books/:id", function(req, res) {
    Book.findById(req.params.id).populate("chapters author.id").populate({path : "ratings", populate : {path : "author.id"}}).exec( async function(err,foundBook){
        if(err||!foundBook){
            req.flash("error","Book Not found")
            res.redirect("back")
        } else{
                        if(foundBook.ratings.length > 0) {
              var ratings = [];
              var length = foundBook.ratings.length;
              foundBook.ratings.forEach(function(rating) { 
                ratings.push(rating.rating) 
              });
              var rating = ratings.reduce(function(total, element) {
                return total + element;
              });
              foundBook.rating = rating / length;
              foundBook.save();
            }
            console.log("Ratings:", foundBook.ratings);
            console.log("Rating:", foundBook.rating);
            //render show template with that campground
            var date= moment(foundBook.date).format('MMMM Do YYYY') ;
            
            var showReview=true;
            var UsersRating;
            foundBook.ratings.forEach(function(rating){
                if(req.user&&(rating.author.id.equals(req.user._id))){
                    showReview=false;
                    UsersRating=rating;
                }
            })
            var user=req.user,
            chapterCount;
            await Chapter.find().where('author.book_id').equals(req.params.id).countDocuments(function(err,count){ chapterCount=count;});
            if(!req.user){
                res.render("books/show",{book:foundBook,user:user,date:date,chapterCount:chapterCount,showReview:showReview,UsersRating:UsersRating});
                } else{
                    User.findById({_id:req.user._id}).populate("library").exec(function(err, givelibrary) {
                        if(err){console.log(err)}
                        else {
                                var check= false;
                            res.render("books/show",{book:foundBook,user:givelibrary,check:check,date:date,chapterCount:chapterCount,showReview:showReview,UsersRating:UsersRating});}
                    })
                }
            }
            
    });
});

//===============================================
//Edit Route: Get Route to go to edit page of book
//================================================
router.get("/books/:id/edit", middleware.checkBookOwnership, function(req, res) {
    Book.findById(req.params.id).populate("author.id").exec(function(err,editBook){
        if(err|| !editBook){
             req.flash("error","Book Not found")
            res.redirect("back")
        } else {
            res.render("books/edit",{book:editBook,user:req.user})
        }
    });
});
//===============================
//Put Route: updates the book info
//===============================
router.put("/books/:id",middleware.checkBookOwnership,upload.single('image'),function(req, res){
    Book.findById(req.params.id).populate('chapters').populate("ratings").exec(async function(err,updateBook){
        if(err||!updateBook){
            req.flash("error","Book Not updated")
            res.redirect("back")
        } else {
            var usid=req.user.username;
             var bookcloud=String(usid)+'/book';
                  updateBook.title = req.body.novels.title;
                  updateBook.genre=req.body.novels.genre;
                  updateBook.range=req.body.novels.range;
                  updateBook.synopsis = req.body.novels.synopsis;
                  updateBook.save();
            if(req.file){
                cloudinary.uploader.destroy(updateBook.imageId, function(){
                cloudinary.uploader.upload(req.file.path, async function(result) {
                  // add cloudinary url for the image to the campground object under image property
                  updateBook.image = result.secure_url;
                  updateBook.imageId = result.public_id;
                 res.redirect("/author/"+req.user._id);
                  updateBook.save();
           },{ folder: String(bookcloud),use_filename: true})
           },{ folder: String(bookcloud),use_filename: true})
           } else{
              res.redirect("/author/"+req.user._id);
           }
        }
    });
});
//=================================
//Delete Route: Deleting the route
//=================================

router.delete("/books/:id",middleware.checkBookOwnership, function(req, res){
     var usid=req.user.username;
    var bookcloud=String(usid)+'/book';
    Book.findById(req.params.id, function(err,removebook){
        if(err ||!removebook){
             req.flash("error","Book did Not found")
            res.redirect("back") 
        } else {
             cloudinary.uploader.destroy(removebook.imageId, function(){
                 removebook.remove();
                 req.flash("success","book removed")
                 res.redirect("/author/"+req.user._id);
             },{ folder: String(bookcloud),use_filename: true})
            
        }
    })
})


module.exports=router;