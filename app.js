const express = require('express');
const path = require('path');
const dbLayer = require('./config/db');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const app = express();
const port = 9000;

const User = require('./model/User');
const e = require('express');

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.json());


app.get('/login', async (req, res) => {

	if (req.headers.authorization) {
		let raw = req.headers.authorization.split(' ')[1];
		raw = Buffer.from(raw, "base64").toString();
		// ${user}:${pwd}
		let up = raw.split(":");

		const user = up[0];
		const hash = crypto.createHash("sha256").update(up[1]).digest("hex");

		//console.log(user, hash);

		let userData = await User.getUser(user, hash);

		if (userData.user != null) {
			res.json({ auth: true, user: userData });
		} else {
			r = { auth: false }
			res.json(r);
		}

	} else {
		r = { auth: false }
		res.json(r);
	}

});



app.listen(port, () => {
	dbLayer.init();
	console.log(`listening on port: ${port}`);
});
