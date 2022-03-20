const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      require: [true, "Please provide a project name"],
      maxlegth: 50
    },
    repo: {
      type: "string",
      require: [true, "Please provide a github repo"],
      maxlegth: 100
    },
    status: {
      type: "string",
      require: [true, "Please provide a project status"],
      default: "planning"
    },
    dev: {
      type: "string",
      ref: "User",
      require: [true, "Please provide a project dev"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
