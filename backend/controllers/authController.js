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

    console.log("user found: ", user);

    //check if password matches
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Incorrect password!" });
    } //401 is forbidden

    console.log("password match");

    //generate auth token for user
    let userWithToken = await generateToken(user); //.get({raw: true}) gives a plain JS object on which we can use BCRYPT

    console.log("user with token ", userWithToken);

    //append user data
    let userWithTransactions = await appendTransactions(userWithToken);

    //append user ledgers
    let userWithLedgers = await appendLedgers(userWithTransactions);

    //append organization info
    let userWithBusinessData = await appendBusinessData(userWithLedgers);

    console.log("user with ledgers ", userWithBusinessData);

    return res.send(userWithBusinessData);
  } catch (e) {
    return res.status(500).json({ message: e.message }); //500 is internal server error
  }
};

const generateToken = async (user) => {
  delete user.password;
  //jwt.sign(payload, secretKey, Options)
  // const token = jwt.sign(user, config.appKey, { expiresIn: 86400 }); //TODO: set expiresIn for jwt
  const token = jwt.sign(user, config.appKey);
  //combine the user with the token using spread operator
  console.log("token, ", token);
  console.log("user, ", user);
  return { ...{ user }, ...{ token } };
};

const appendTransactions = async (user) => {
  const transactions = await prisma.transactions.findMany({
    where: {
      userID: user.id,
    },
  });
  return { ...user, ...{ transactions } };
};

const appendLedgers = async (user) => {
  let ledgers = {};

  const transactions = await prisma.transactions.findMany({
    orderBy: [
      {
        nominalAccountID: "asc",
      },
      {
        transactionDate: "asc",
      },
    ],
    where: {
      userID: user.id,
    },
    include: {
      nominalAccounts: true,
    },
  });

  transactions.forEach((transaction) => {
    let nominalID = transaction.nominalAccountID;

    if (nominalID in ledgers) {
      if (transaction.entryType === "Debit") {
        ledgers[nominalID].Debit.push(transaction);
      } else {
        ledgers[nominalID].Credit.push(transaction);
      }
    } else {
      if (transaction.entryType === "Debit") {
        ledgers[nominalID] = {
          nominalAccount: transaction.nominalAccounts,
          Debit: [transaction],
          Credit: [],
        };
      } else {
        ledgers[nominalID] = {
          nominalAccount: transaction.nominalAccounts,
          Debit: [],
          Credit: [transaction],
        };
      }
    }
  });

  return { ...user, ...{ ledgers } };
};

const appendBusinessData = async (user) => {
  
  const business = await prisma.businessData.findFirstOrThrow({
    where: {
      userID: user.id,
    }
  });

  return { ...user, ...{ business } };
};

