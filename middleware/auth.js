const User = require('../model/User');
const crypto = require('crypto');

module.exports = async (req, res, next) => {
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
}