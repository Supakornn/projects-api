const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: {
    type: "string",
    require: [true, "Please provide a company name"],
    maxlegth: 50
  }
});
