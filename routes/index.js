var express =require("express");
var router =express.Router(),
 passport    = require("passport"),
 User        = require("../models/user"),
 Book  = require("../models/book"),
 Recomended        = require("../models/recomended"),
 Carousel        = require("../models/carousel"),
Chapter= require("../models/chapter");

var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

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
  api_secret: process.env.CLOUDINARY_KEY
});


// ====================
// Home ROUTES:Showing the home page
// ====================

router.get("/", function(req, res){
    //Searching for the books or author
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        
        Book.find({$or:[{title:regex},{"author.username":regex}]}).populate("ratings author.id").sort({"date":-1}).exec(function(err,foundBook){
        if(err){
            console.log(err);
        } else{
            if(foundBook.length<1){
                              res.render("search",{book:foundBook,"error": "No Book or Author Found"}); 
            } else {
                           res.render("search",{book:foundBook}); 
            }
     }
    })
        
    } else{
        //homepage
    Book.find({},async function(err,foundBook){
        if(err ||!foundBook){
            console.log(err );
        } else{
            try{
              let carousel = await   Carousel.find({});
              let recomended = await  Recomended.find({})
              let foundChapter = await Chapter.find({}).populate({path : "author.id author.book_id"}).sort({datechap:-1}).limit(8).exec();
              res.render("landing",{book:foundBook,chapter:foundChapter,recomended:recomended,carousel:carousel});
            }catch(err){
                console.log(err);
            }
        }
    })
    }  
 });
 
 
 // =====================================================

//Auth routes 

//=========================
//Logn page
//=========================


	router.get('/login', function(req, res){
		res.render('login', { message: req.flash('loginMessage') });
	});
	router.post('/login', passport.authenticate('local-login', {
		failureRedirect: '/login',
		failureFlash: true
	}),function(req, res) {
	  if(req.user.local.isVerified===true)
	  {
	     if(!req.user.username){
           res.redirect('/username/' + req.user._id)
      }
      else{
           req.flash("success","welcome "+req.user.username)
            res.redirect('/profile/' + req.user._id);
      }
	  } else {
	    req.logout();
	    req.flash("error","verify your mail")
            res.redirect('/login');
	  }
  });
  
  
  //=========================
//signup page
//=========================

	router.get('/register', function(req, res){
		res.render('register', { message: req.flash('signupMessage') });
	});


	router.post('/register', passport.authenticate('local-signup', {
		failureRedirect: '/register',
		failureFlash: true 
	}),function(req, res) {
           req.flash("success","A mail has been sent you welcome ");
           res.redirect('/confirm')
            
	});


//=========================
//facebook signup
//=========================
router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	router.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { 
	                                      failureRedirect: '/' }),function(req, res) {
     
      console.log(req.user.username)
      if(!req.user.username){
           res.redirect('/username/' + req.user._id)
      }
      else{
           req.flash("success","welcome "+req.user.username)
            res.redirect('/profile/' + req.user._id);
  
      }
  });

//=========================
//google signup
//=========================

router.get('/auth/google', passport.authenticate('google', {scope: ['email']}));

	router.get('/auth/google/callback', 
	  passport.authenticate('google', { 
	                                      failureRedirect: '/' }),function(req, res) {
      
      console.log(req.user.username)
     if(!req.user.username){
           res.redirect('/username/' + req.user._id)
      }
      else{
           req.flash("success","welcome "+req.user.username)
            res.redirect('/profile/' + req.user._id);
  
      }
  });



//=========================
//twitter signup
//=========================
router.get('/auth/twitter', passport.authenticate('twitter'));

	router.get('/auth/twitter/callback', 
	  passport.authenticate('twitter', { 
	                                      failureRedirect: '/' }),function(req, res) {
     
      console.log(req.user.username)
      if(!req.user.username){
           res.redirect('/username/' + req.user._id)
      }
      else{
           req.flash("success","welcome "+req.user.username)
            res.redirect('/profile/' + req.user._id);
  
      }
  });

//===============================================
//password reset
//===============================================
router.get('/forgot', function(req, res) {
  res.render('users/forgot');
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ 'local.email': req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'webkathas@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.local.email,
        from: 'webkathas@gmail.com',
        subject: 'Webkathas Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.local.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('users/reset', {token: req.params.token});
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
             user.local.password = user.generateHash(req.body.password);
             user.resetPasswordToken = undefined;
             user.resetPasswordExpires = undefined;

            user.save(function(err) {
                done(err, user);
                req.flash('success','Password has been reset')
                res.redirect('/login');
              });
         
          
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'webkathas@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.local.email,
        from: 'webkathas@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});



//===============================================
//Mail verification
//===============================================

router.get('/confirmMail', function(req, res) {
  res.render('users/confirmMail');
});


router.post('/confirmMail', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ 'local.email': req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/login');
        }
        if (user.local.isVerified===true) {
          req.flash('error', 'Your email has been already verified.');
          return res.redirect('/login');
        }

        user.local.confirmationToken = token;
        user.local.confirmationExpires = Date.now() + 259200000; // 1 hour

        user.save(function(err) {
          req.logout();
           req.flash('success', 'An Mail has been sent to you.');
          res.redirect('/login');
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'webkathas@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.local.email,
        from: 'webkathas@gmail.com',
        subject: 'Webkathas Confirmation',
        text: 
          'Please click on the following link, or paste this into your browser to complete the mail verification process:\n\n' +
          'http://' + req.headers.host + '/confirm/' + token + '\n\n' +
          'If you did not request this, please ignore this email.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'A confirmation e-mail has been sent to ' + user.local.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/login');
  });
});

router.get('/confirm', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ 'local.email': req.user.local.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/login');
        }

        user.local.confirmationToken = token;
        user.local.confirmationExpires = Date.now() + 259200000; // 1 hour

        user.save(function(err) {
          req.logout();
           req.flash('success', 'A confirmation e-mail has been sent to ' + user.local.email + ' with further instructions.');
          res.redirect('/login');
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'webkathas@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.local.email,
        from: 'webkathas@gmail.com',
        subject: 'Webkathas Confirmation',
        text: 
          'Please click on the following link, or paste this into your browser to complete the mail verification process:\n\n' +
          'http://' + req.headers.host + '/confirm/' + token + '\n\n' +
          'If you did not request this, please ignore this email.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.local.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/login');
  });
});



router.get('/confirm/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ 'local.confirmationToken': req.params.token, 'local.confirmationExpires': { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Confirmation token is invalid or has expired.');
          return res.redirect('/login');
        }  else {
          user.local.isVerified=true;
             user.local.confirmationToken = undefined;
             user.local.confirmationExpires = undefined;

            user.save(function(err) {
                done(err, user);
                 req.flash('success', 'Success! Your Email has been verified.');
                res.redirect('/login');
              });
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'webkathas@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.local.email,
        from: 'webkathas@gmail.com',
        subject: 'Your Mail   hasbeen confirmed',
        text: 'Hello,\n\n' +
          'This is a confirmation that your mail has been verified.Welcome to webkathas\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your Mail has been verified.');
        done(err);
      });
    }
  ], function(err) {
    req.flash('error',err);
    res.redirect('/login');
  });
});



//=========================
//logout
//=========================

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})















function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports=router;
