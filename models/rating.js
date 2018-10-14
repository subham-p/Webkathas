var mongoose = require("mongoose");

var ratingSchema = new mongoose.Schema({
	rating: Number,
	writingStyle:Number,
	grammarScore:Number,
	storyDevelopment:Number,
	characterDesign:Number,
	worldBackground:Number,
	review:String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String,
		image:String
	}, book:{
          bookid:{ type:mongoose.Schema.Types.ObjectId,
            ref:"Book"},
        title:String,
        image:String
      },
	dateRev:Date
});

module.exports = mongoose.model("Rating", ratingSchema);