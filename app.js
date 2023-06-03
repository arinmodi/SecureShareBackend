const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./routes");
const { errorHandler } = require("./helpers/error");

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())

app.use("/", routes)

app.use(errorHandler)

// Home route
app.get("/", (_req, res) => {
	res.status(200).json({ message: "Hello There!! You are at Backend" });
});

// handle the error safely
process.on("uncaughtException", (err) => {
	console.log(err);
});

module.exports = app;