const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//What happens if I save a whole collection but only one Card throws an error?
//How can I determine what the max should be? What if what I read in is beyond the max?
//Does max really matter in a db like mongodb
//What is item_def???
//How to include price? It's not really a part of the db, but need to fetch it at some point
let CardSchema = new Schema({
	card_id : { type : Number, required : true },
	// set_name : { type : [Languages] }
	// card_name : { type : [Languages] },
	// card_text : { type : [Languages] },
	set_name : { type : String },
	card_name : { type : String },
	card_text : { type : String },
 	card_type : { type : String, required : true },
 	sub_type : { type : String },
	illustrator : { type : String },
	rarity : { type : String },
	is_red : { type : Boolean },
	is_green : { type : Boolean },
	is_blue : { type : Boolean },
	is_black : { type : Boolean },
	attack : { type : Number },
	hit_points : { type : Number },
	armor : { type : Number },
	mana_cost : { type : Number },
	gold_cost : { type : Number },
	charges : { type : Number },
	is_crosslane : { type : Boolean },
	references : { type : Array },
});

module.exports = mongoose.model('Card', CardSchema);