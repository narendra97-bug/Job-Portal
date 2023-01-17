var jwt = require('jsonwebtoken');
const JWT_SECRET = 'neelauth';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({success:false, error:"Login Required" })
        console.log("token " + token)
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({success:false, error: "Login Required" })
    }

}

module.exports = fetchuser;