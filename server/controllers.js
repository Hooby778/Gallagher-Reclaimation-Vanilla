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
    res.status(200).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
}

exports.postEmployees = (req, res) => {
  Employee.create(req.body)
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
}

exports.deleteEmployees = (req, res) => {
  Employee.deleteOne({name: req.body.name})
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
}

exports.postJobs = (req, res) => {
  Job.create(req.body)
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    req.status(500).send(err);
  })
}

exports.deleteJobs = (req, res) => {
  Job.deleteOne({name: req.body.name})
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
}

exports.getTimesheet = (req, res) => {
  Timesheet.find({name: req.query.name, date: req.query.date})
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
}