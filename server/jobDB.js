require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION);

const jobSchema = new mongoose.Schema(
  {
    name: String,
    wage_decisions: Object
  },
  { timestamps: true }
);

const Job = new mongoose.model('Job', jobSchema); //  TODO: Fill in arguments!

module.exports = Job;
