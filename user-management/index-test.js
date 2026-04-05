const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected for index testing");

    const result = await User.find({ email: "test@gmail.com", age: 25 })
      .explain("executionStats");

    console.log("Execution Stats:");
    console.log(result.executionStats);

    process.exit();
  })
  .catch(err => console.log(err));