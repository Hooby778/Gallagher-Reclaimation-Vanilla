require("dotenv").config();

const express = require("express");
const path = require("path");
const controllers = require("./controllers.js");

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// TODO: Define routes
app.get('/', () => {});
app.get('/employees', controllers.getEmployees);
app.post('/employees', controllers.postEmployees);
app.delete('/employees', controllers.deleteEmployees);
app.get('/jobname', controllers.getJobs);
app.post('/jobname', controllers.postJobs);
app.delete('/jobname', controllers.deleteJobs);
app.get('/timesheets', controllers.getTimesheet);
app.post('/timesheets', controllers.postTimesheet);
app.post('/pass', (req, res) => {
  if (req.body.pass === process.env.ADMIN_PASSWORD) {
    res.status(200).send('success')
  } else {
    res.status(500).send('fail')
  }
})


const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
