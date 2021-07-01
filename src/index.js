const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const db_user = process.env.db_user;
const db_pwd = process.env.db_pwd;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
	`mongodb+srv://${db_user}:${db_pwd}@cluster0.57zvw.mongodb.net/ratenectDB?retryWrites=true&w=majority`,
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

app.listen(3000, () => {
	console.log("Server started at port 3000");
});

app.get("/", (_, res) => {
	res.send("<h1>Welcome to Ratenect!<h1>");
});
