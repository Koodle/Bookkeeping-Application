const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/app");
const { use } = require("../router");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //const secret = require("crypto").randomBytes(64).toString("hex") use this to create a secret key & store in .env file

    //Find user
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    //check if user found
    if (!user) {
      console.log("not found");
      return res.status(404).json({ message: "user not found" });
    }

    console.log("user", user);

    //check if password matches
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Incorrect password!" });
    } //401 is forbidden

    //generate auth token for user
    const userWithToken = generateToken(user); //.get({raw: true}) gives a plain JS object on which we can use BCRYPT

    return res.send(userWithToken);
  } catch (e) {
    return res.status(500).json({ message: e.message }); //500 is internal server error
  }
};

const generateToken = (user) => {
  //https://www.youtube.com/watch?v=7Q17ubqLfaM
  delete user.password;
  //jwt.sign(payload, secretKey, Options)
  // const token = jwt.sign(user, config.appKey, { expiresIn: 86400 }); //TODO: set expiresIn for jwt
  const token = jwt.sign(user, config.appKey);
  //combine the user with the token
  return { ...{ user }, ...{ token } };
};
