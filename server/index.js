require("dotenv").config();

const express = require("express");
const path = require("path");
const controllers = require("./controllers.js");

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// TODO: Define routes
app.get('/', () => {});
// get /employee/*
// post /employee/*
// delete /employee/*
// get /jobname/*
// post /jobname/*
// delete /jobname/*


const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
