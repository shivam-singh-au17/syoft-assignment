const jwt = require("jsonwebtoken");
require("dotenv").config();

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

const register = (model) => async (req, res) => {
  try {
    // check user exists or not
    let user = await model.findOne({ email: req.body.email }).lean().exec();

    // if user exists then throw an error
    if (user) {
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });
    }

    // otherwise create a user and then hash the password
    user = await model.create(req.body);

    // return data and token
    return res.status(201).send(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const login = (model) => async (req, res) => {
  try {
    // check if a user with that email already exists
    let user = await model.findOne({ email: req.body.email }).exec();

    // if not user then throw an error
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "You Are Not Registered... Register First",
      });
    }

    // if user then match the password
    const match = await user.checkPassword(req.body.password);

    // if not match then throw an error
    if (!match) {
      return res.status(400).json({
        status: "error",
        message: "Wrong Password or Email... try again",
      });
    }

    // if match then create the token
    let token = newToken(user);

    // return the token to the frontend
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getAllUser = (model) => async (req, res) => {
  try {
    const item = await model.find().lean().exec();
    return res.status(201).send(item);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = (model, itemName) => ({
  register: register(model),
  login: login(model),
  getAllUser: getAllUser(model),
});
