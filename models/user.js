//models/user.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	password: String,
	passwordConf: String,
	role: {
		type: String,
		enum: ['Волонтер', 'Людина яка потребує допомоги'],
		default: 'Людина яка потребує допомоги'
	}
}),
User = mongoose.model('User', userSchema);

module.exports = User;
