const express = require('express');
const path = require('path');
const dbLayer = require('./config/db');
const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;

const User = require('./model/User');

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.json());

app.listen(port, () => {
	dbLayer.init();
	console.log(`listening on port: ${port}`);
});
