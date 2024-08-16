const Employee = require('./empDB.js');
const Job = require('./jobDB.js');
const Timesheet = require('./timesheetDB');

exports.getEmployees = (req, res) => {
  Employee.find()
  .then((results) => {
    res.status(201).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

exports.getJobs = (req, res) => {
  Job.find()
  .then((results) => {
    res.status(201).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

exports.postTimesheet = (req, res) => {
  Timesheet.create(req.body)
  .then((results) => {
    res.status(201).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
}