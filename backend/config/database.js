const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://hosannaking2019_db_user:gJ7fFcmqiDLKJjg9@cluster0.p9rfs0q.mongodb.net/testdb?appName=Cluster0" ||
        process.env.MONGODB_URI ||
        "mongodb://localhost:27017/todo-list",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
