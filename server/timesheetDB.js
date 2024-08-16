require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/Gallagher-Reclaimation`);

const timesheetSchema = new mongoose.Schema(
  {
    name: String,
    job_name: String,
    classification: String,
    date: String,
    start_time: String,
    end_time: String,
    hours: Number,
    pay_earned: Number
  },
  { timestamps: true }
);

const Timesheet = new mongoose.model('Timesheet', timesheetSchema); //  TODO: Fill in arguments!

module.exports = Timesheet;