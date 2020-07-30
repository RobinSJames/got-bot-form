const mongoose = require('mongoose');
const dbHost = 'mongodb://database:27017/'

const connectDB = async () => {
  try {
		const connection = await mongoose.connect(dbHost, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
		console.log(`MongoDB connected: ${connection.connection.host}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
}

module.exports = connectDB;