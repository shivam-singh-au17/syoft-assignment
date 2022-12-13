
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return reject(err);
            }
            return resolve(user);
        });
    });
};

module.exports = async (req, res, next) => {

    // Check if authorization header is present if not then throw an error

    const bearerToken = req?.headers?.authorization;

    if (!bearerToken)
        return res.status(400).json({
            status: "Failed",
            message: "You did not send the authorization header",
        });


    // Check if authorization header is present then it start with "Bearer " if not throw an error

    if (!bearerToken.startsWith("Bearer "))
        return res.status(400).json({
            status: "Failed",
            message: "You did not send the authorization header starts with Bearer ",
        });

    // Extract the token from the bearer token
    const token = bearerToken.split(" ")[1].trim();

    // decrypt the token and try to fetch the user
    try {

        const user = await verifyToken(token);
        req.user = user.user;
        return next();

    } catch (err) {
        return res.status(400).json({
            status: "failed",
            message: "You are not sending the correct token",
        });
    }

};
