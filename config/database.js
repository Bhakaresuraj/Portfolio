const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Mongoose v6+ uses the MongoDB Node driver v4+ defaults.
    // `useNewUrlParser` and `useUnifiedTopology` are deprecated no-ops now.
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
