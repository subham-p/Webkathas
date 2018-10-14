var express =require("express");
var router =express.Router(),
User        = require("../models/user"),
Book        = require("../models/book"),
Comment     = require("../models/comment"),
Chapter= require("../models/chapter"),
middleware = require("../middleware"),
    Library        = require("../models/library");
    var Rating = require("../models/rating");
    
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


//=========================
//showing user profile page
//=========================
router.get("/profile/:id", async function(req, res){
    
try{
    var chapter =[],i=0,k=[];
     let lib= await   Library.find().where('author.id').equals(req.params.id).exec();
     await lib.forEach(function(libra){
            Chapter.find().where('author.book_id').equals(libra.book.id).populate({path : "author.book_id author.id"}).sort({datechap:-1}).limit(1).exec(function(err,chap){
                chapter[i++]=chap;
            });
        });
     let book=  await   Book.find().where('author.id').equals(req.params.id).exec();
    let comment =  await   Comment.find().where('author.id').equals(req.params.id).populate({path : "author.id repliedTo.userid book.bookid chapter.chapterid"}).exec();
    let review=  await   Rating.find().where('author.id').equals(req.params.id).populate({path : "author.id book.bookid"}).exec();
    
        
        User.findById(req.params.id).populate({path : "library", populate : {path : "book.id author.id"}}).exec( function(err, foundUser){
            if(err||!foundUser){
                 req.flash("error","User did Not found")
                res.redirect("back")
            } else{
                res.render("users/info",{user:foundUser,comment:comment,review:review,chapter:chapter,book:book});
            }
        })
    }  catch(err){
                    throw err;
        }})
        
        
//=======================
//Adding a library
//=======================
router.post("/books/:id/library/:user_id",middleware.isLoggedIn, function(req, res){
    if(req.user.username){
    User.findById(req.params.user_id, function(err,creat){
        if(err||!creat){
            req.flash("error","User did Not found")
            res.redirect("back")
        } else{
            Book.findById(req.params.id,function(err, book){
                if(err||!book){
             req.flash("error","Book did Not found")
            res.redirect("back")
                } else{
                    var newlib={text:"added"}
                        Library.create(newlib,function(err, library){
                        if(err){
                            console.log(err);
                        } else {
                        library.author.id=req.user._id;
                        library.book.id=req.params.id;
                        library.save();
                        creat.library.push(library);
                        creat.save();
                        res.redirect("/profile/"+creat._id);
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


//=================================================
//Delete Routes:Deleting the Library
//=================================================
router.delete("/books/:id/library/:library_id",middleware.libraryOwnership, function(req ,res){
            Library.findById(req.params.library_id,function(err,library){
                if(err ||!library){
                     req.flash("error"," Not found")
            res.redirect("back")
                } else {
                    library.remove();
                    req.flash("success","Book removed");
                    res.redirect("back");
                }
            });
});
//=======================
//showinf user profile
//=======================

router.get("/username/:id",middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id,function(err, foundUser){
        if(err||!foundUser){
             req.flash("error","User did Not found")
            res.redirect("back")
        } 
        else if(req.user.username){
             req.flash("error","Username already exist")
            res.redirect("back")
        } else{
            
            res.render("users/username",{user:foundUser});
        }
    })
})

//=======================
//Creating username
//=======================
router.post("/username/:id",middleware.isLoggedIn, async function(req, res){
      var uname=false;
     await  User.findOne({'username':req.body.username},function(err,user){
         if(err)
          throw err
          if(user){
              uname=false;
          }
          else{
              uname=true
          }
         
     })
     
     if(uname===true){
         User.findById(req.params.id,function(err, foundUser){
        if(err||!foundUser){
             req.flash("error","User did Not found")
            res.redirect("back")
        } else{
            
            foundUser.username=req.body.username;
            foundUser.save();
            res.redirect('/profile/' + req.user._id);;
        }
    })
     } else{
         req.flash("error","Username already taken")
          res.redirect('/username/' + req.user._id)
     }
    
    
})



//===============================
//Put Route: updates the profile info
//===============================
router.put("/profile/:id",middleware.isLoggedIn,upload.single('image'),function(req, res){
    User.findById(req.params.id,function(err,updateUser){
        if(err||!updateUser){
            req.flash("error","User Not updated")
            res.redirect("back")
        } else {
            var usid=req.body.username;
            var profcloud=String(usid)+'/profile';
                  updateUser.firstName = req.body.profile.firstName;
                  updateUser.lastName = req.body.profile.lastName;
                  updateUser.gender = req.body.profile.gender;
                  updateUser.selfText = req.body.profile.selfText;
                  updateUser.save();
            if(req.file){
                cloudinary.uploader.destroy(updateUser.profileId, function(){
                cloudinary.uploader.upload(req.file.path, function(result) {
                  // add cloudinary url for the image to the campground object under image property
                  updateUser.profilePic = result.secure_url;
                  updateUser.profileId = result.public_id;
                  res.redirect("/profile/" + req.params.id);
                  updateUser.save();
           },{ folder: String(profcloud),use_filename: true})
           },{ folder: String(profcloud),use_filename: true})
           } else{
               res.redirect("/profile/" + req.params.id);
           }
        }
    });
});





module.exports=router;