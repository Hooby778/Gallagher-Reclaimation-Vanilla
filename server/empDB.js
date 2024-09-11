require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION);

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    pay: Number
  },
  { timestamps: true }
);

const Employee = new mongoose.model('Employee', employeeSchema); //  TODO: Fill in arguments!

module.exports = Employee;
