//models/requestSchema.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var volunteerHelpSchema = new Schema({
	unique_id: Number,
	volunteer_id: { type: Schema.Types.ObjectId, ref: 'User' },
	tg: String,
	title: String,
	location: String,
	description: String,
	status: {
		type: String,
		enum: ['Open', 'In Progress', 'Completed'],
		default: 'Open'
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

var VolunteerHelp = mongoose.model('VolunteerHelp', volunteerHelpSchema);

module.exports = VolunteerHelp;
