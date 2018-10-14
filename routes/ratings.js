var express = require("express");
var router  = express.Router();
var Rating = require("../models/rating");
var Book  = require("../models/book");
var middleware = require("../middleware");



//=========================
//Creating a new rating
//=========================

router.post('/rating/:id', middleware.isLoggedIn, function(req, res) {
	if(req.user.username){
	Book.findById(req.params.id, function(err, book) {
		if(err) {
			console.log(err);
		} else if (req.body.rating) {
				Rating.create(req.body.rating, function(err, rating) {
				  if(err) {
				    console.log(err);
				  }
				  rating.book.bookid=req.params.id;
				  rating.author.id = req.user._id;
				    rating.dateRev = new Date();
				  rating.save();
					book.ratings.push(rating);
					book.save();
				
					req.flash("success", "Successfully added rating");
				});
		} else {
				req.flash("error", "Please select a rating");
		}
		res.redirect('/books/' + book._id);
	});
} else{
        req.flash('error','username Required')
        res.redirect('/username/' + req.user._id)
    }
});

//=========================
//Editing a new rating
//=========================

router.put('/rating/:id/:ratingId', middleware.isLoggedIn, function(req, res) {
	Book.findById(req.params.id, function(err, book) {
		
		if(err) {
			console.log(err);
		} else if (req.body.rating) {
		Rating.findByIdAndUpdate(req.params.ratingId,req.body.rating, function(err, book) {
		if(err) {
			console.log(err);
		} else  {
				req.flash("success", "Successfully Edited rating");
		}});
		} else {
				req.flash("error", "Please select a rating");
		}
		res.redirect('/books/' + book._id);
	});
});

module.exports = router;