const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//authorizeentication

router.post("/register", validInfo, async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
			email,
		]);

		if (user.rows.length !== 0) {
			return res.status(401).send("User already exist!");
		}

		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(password, salt);

		let newUser = await pool.query(
			"INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
			[name, email, bcryptPassword]
		);
		// res.json(newUser.rows[0]);

		const jwtToken = jwtGenerator(newUser.rows[0].user_id);

		res.json({ jwtToken });
		// return res.json({ jwtToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/login", validInfo, async (req, res) => {
	try {
		//1 destructure the req.body

		const { email, password } = req.body;

		//2 Check if user doesn't exist (if not then we throw error)

		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
			email,
		]);

		if (user.rows.length === 0) {
			return res.status(401).json("Password of Email is incorrect");
		}

		//3 Check if incomming password is the same the database password

		const validPassword = await bcrypt.compare(
			password,
			user.rows[0].user_password
		);

		// console.log(validPassword);
		// res.json(validPassword);

		if (!validPassword) {
			return res.status(401).json("Invalid Credential");
		}

		//4 give them the jwt token

		const jwtToken = jwtGenerator(user.rows[0].user_id);
		return res.json({ jwtToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.get("/verify", authorization, (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
