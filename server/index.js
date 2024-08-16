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
// post /employees/*
// delete /employees/*
app.get('/jobname', controllers.getJobs);
// post /jobname/*
// delete /jobname/*
// get /timesheets
app.post('/timesheets', controllers.postTimesheet);


const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
