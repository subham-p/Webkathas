var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    methodOverride= require("method-override"),
    LocalStrategy = require("passport-local"),
    Book  = require("./models/book"),
    Comment     = require("./models/comment"),
    Chapter     = require("./models/chapter"),
    User        = require("./models/user"),
     Recomended        = require("./models/recomended"),
     Carousel       = require("./models/carousel"),
    Library        = require("./models/library");
    var moment = require("moment");
    var cookieParser = require('cookie-parser');
    var morgan = require('morgan');
     var commentRoutes=require("./routes/comments")
    var bookRoutes=require("./routes/books");
    var chapterRoutes=require("./routes/chapters");
   var  indexRoutes=require("./routes/index");
   var  ratingRoutes=require("./routes/ratings");
   var  userRoutes=require("./routes/users");
   var  genreRoutes=require("./routes/genre"),
     authorRoutes=require("./routes/author"),
     carouselRoutes=require("./routes/carousel"),
   recomendedRoutes=require("./routes/recomended"),
   guidanceRoutes=require("./routes/guidance");
   
   var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
   
   var Swal = require('sweetalert2');
   var $ = require("jquery")
 app.locals.Swal = Swal;
 
app.locals.moment = moment; 

   
    var url= process.env.DATABASE_URL || "mongodb://localhost:27017/web_kathas_v3"
mongoose.connect(url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());

//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);
//passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error =req.flash("error");
   res.locals.success =req.flash("success");
   next();
});
app.use(methodOverride("_method"));
 app.use(bookRoutes);
 app.use(chapterRoutes);
app.use(commentRoutes);
 app.use(indexRoutes);
 app.use(userRoutes);
  app.use(genreRoutes);
  app.use(recomendedRoutes);
  app.use(authorRoutes);
  app.use(ratingRoutes);
    app.use(carouselRoutes);
  app.use(guidanceRoutes);



// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

//   // respond with json
//   if (req.accepts('json')) {
//     res.send({ error: 'Not found' });
//     return;
//   }

//   // default to plain-text. send()
//   res.type('txt').send('Not found');
});




app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The WebKathas Server Has started!");
});