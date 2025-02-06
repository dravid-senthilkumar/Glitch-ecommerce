const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    const { token } = req.headers;

    try {
        if (!token) {
            return res.status(400).json({ success: false, message: "User not authorized" });
        }

        const authToken = jwt.verify(token, process.env.SECRET_CODE);
        req.user = authToken.id;
        console.log("User Authenticated:", token);

        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = verifyUser;
