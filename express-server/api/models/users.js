const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
		type: String,
		required: true,
		unique: true,
		match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'Please provide a valid email address']
	},
  number: { type: String, required: [true, 'The number field is required'] },
  name: { type: String, required: [true, 'The name field is required'] },
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', UserSchema)