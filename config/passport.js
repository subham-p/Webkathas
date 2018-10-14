var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({

        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },

    function(req, email, password, done) {
      console.log(email);
        process.nextTick(function() {

            User.findOne({ 'local.email' : email}, function(err, user) {
                if (err)
                    return done(err);

                if(user) {
                    return done(null, false, req.flash('signupMessage', 'That Email is already taken.'));
                }

                else {

                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
					newUser.date=new Date();
                    newUser.save(function(err) {
                        if(err)
                            throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));



    passport.use('local-login', new LocalStrategy({

        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password,done) {

        User.findOne({ 'local.email' : email}, function(err, user) {

            if(err)
                return done(err,req.flash('error', 'Oops! Wrong password.'));

            if(!user)
                return done(null, false, req.flash('error', 'No Email found.'));

            if(!user.validPassword(password))
                return done(null, false, req.flash('error', 'Oops! Wrong password.'));

            return done(null, user);
        });
    }));
    
    
    
    
    
    
    
    passport.use(new FacebookStrategy({
	    clientID: process.env.FACEBOOK_CLIENT_ID,
	    clientSecret: process.env.FACEBOOK_SECRET,
	    callbackURL: process.env.FACEBOOK_URL,
	    profileFields: ['email','first_name','last_name','gender','profileUrl','picture.type(large)']
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'facebook.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    			{
	    				
	    			
	    					return done(null, user);
	    				
	    			}
	    			else {
	    			    
	    		User.findOne({$or:[{'local.email': profile.emails[0].value},{'google.email': profile.emails[0].value}]}, function(err, userE){
	    			    	if(err)
	    				return done(err);
	    			if(userE)
	    			{
	    			    console.log(profile);
	    			
	    				userE.facebook.id = profile.id;
	    				userE.facebook.token = accessToken;
	    				 userE.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
	    				userE.facebook.email = profile.emails[0].value;

	    				userE.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, userE);
	    				})
	    			}
	    			
	    			else {
	    			console.log(profile);
	    				var newUser = new User();
	    				newUser.facebook.id = profile.id;
	    				newUser.facebook.token = accessToken;
	    				 newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
	    				newUser.facebook.email = profile.emails[0].value;
	    			    newUser.profilePic=profile.photos[0].value
                        newUser.local.email = profile.emails[0].value;
                        newUser.date=new Date();
	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})
	    			    
	    			}
	    			    
	    			})    
	    			    
	    				console.log(profile);
	    			}
	    		});
	    	});
	    }

	));
    
    
    
    
    
    
    
    
    
    
    
    passport.use(new GoogleStrategy({
	    clientID: process.env.GOOGLE_ID,
	    clientSecret: process.env.GOOGLE_SECRET,
	    callbackURL: process.env.GOOGLE_URL,
	    profileFields: ['email','first_name','last_name','gender','profileUrl','picture.type(large)']
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'google.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    			    
	    			    
	    		User.findOne( {$or:[{'local.email': profile.emails[0].value},{'facebook.email': profile.emails[0].value}]}, function(err, userE){
	    			    	if(err)
	    				return done(err);
	    			if(userE)
	    			{
	    			    console.log(profile);
	    				userE.google.id = profile.id;
	    				userE.google.token = accessToken;
	    				userE.google.name = profile.displayName;
	    				userE.google.email = profile.emails[0].value;
	    				

	    				userE.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, userE);
	    				})
	    			}
	    			
	    			else {
	    			console.log(profile);
	    			var newUser = new User();
	    				console.log(profile)
	    				newUser.google.id = profile.id;
	    				newUser.google.token = accessToken;
	    				newUser.google.name = profile.displayName;
	    				newUser.google.email = profile.emails[0].value;
	    				 newUser.local.email = profile.emails[0].value;
	    				 newUser.date=new Date();
	    				var newSize="300"
                        var str =profile._json.image.url
	    				var res = str.split("?sz=50")[0]+"?sz="+newSize
	    				newUser.profilePic=res;

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})
	    			    
	    			}
	    			    
	    			})    
	    			    
	    				console.log(profile);
	    			    
	  
	    			}
	    		});
	    	});
	    }

	));
    
    

};