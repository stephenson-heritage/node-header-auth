const User = require('../model/User');
const crypto = require('crypto');

module.exports = async (req, res, next) => {

    const auth = { isAuth: false };

    if (req && req.headers.authorization) {
        let raw = req.headers.authorization.split(' ')[1];
        raw = Buffer.from(raw, "base64").toString();
        // ${user}:${pwd}
        let up = raw.split(":");

        const user = up[0];
        const hash = crypto.createHash("sha256").update(up[1]).digest("hex");

        //console.log(user, hash);

        let userData = await User.getUser(user, hash);

        if (userData.user != null) {
            // user validated
            auth.isAuth = true;
            auth.user = userData.user;
        }
    }

    req.auth = auth;
    next();
}