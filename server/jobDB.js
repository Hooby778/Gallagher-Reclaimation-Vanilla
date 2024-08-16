require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/Gallagher-Reclaimation`);

const jobSchema = new mongoose.Schema(
  {
    name: String,
    wage_decisions: Object
  },
  { timestamps: true }
);

const Job = new mongoose.model('Job', jobSchema); //  TODO: Fill in arguments!

module.exports = Job;
