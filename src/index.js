const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const ngoRoutes = require("../routes/ngo");

const app = express();

env.config();

const db_user = process.env.db_user;
const db_pwd = process.env.db_pwd;
const db_id = process.env.db_id;
const db_name = process.env.db_name;
const port = process.env.PORT;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use("/api", ngoRoutes);

mongoose
	.connect(
		`mongodb+srv://${db_user}:${db_pwd}@dev.yt0g9.mongodb.net/${db_name}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		}
	)
	.then(() => {
		console.log("Database connected.");
	});

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});

app.get("/", (_, res) => {
	res.send("<h1>Welcome to Ratenect!<h1>");
});
