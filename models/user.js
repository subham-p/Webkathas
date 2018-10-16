var mongoose = require("mongoose");
var passportLocalMongoose =require("passport-local-mongoose");
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username:{type:String,unique : true,sparse: true},
    local:
    {
    email:String,
    password:String,
    isVerified:{type:Boolean, default:false},
    confirmationToken:String,
    confirmationExpires:Date
    },
    facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	},
    profilePic:{type:String,default:"https://res.cloudinary.com/webkathas/image/upload/v1536643285/Genre/user.png"},
    profileId: String,
    firstName:String,
    lastName:String,
    gender:{type:String, default:"Secret"},
    isAdmin:{type:Boolean,default:false},
    selfText:String,
    date:Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    library:[
     {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Library",
     }
    
   ]
});

//UserSchema.plugin(passportLocalMongoose, {usernameQueryFields: ["email"]});

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

UserSchema.methods.validPassword = function(password){
    console.log(bcrypt.compareSync(password, this.local.password));
    
	return bcrypt.compareSync(password, this.local.password,);
	
}


module.exports =mongoose.model("User", UserSchema);