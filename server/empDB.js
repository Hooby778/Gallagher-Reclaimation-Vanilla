require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/Gallagher-Reclaimation`);

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    pay: Number
  },
  { timestamps: true }
);

const Employee = new mongoose.model('Employee', employeeSchema); //  TODO: Fill in arguments!

module.exports = Employee;
