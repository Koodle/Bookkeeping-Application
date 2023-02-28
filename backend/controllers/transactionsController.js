const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*return all transactions and ledgers for the user*/
exports.index = async (req, res) => {
  console.log("transactions/index");

  //append user data
  let transactions = await getTransactions(req.user.id);

  //append user ledgers
  let ledgers = await getLedgers(req.user.id);

  // const transactions = await prisma.transactions.findMany({
  //   where: {
  //     userID: req.user.id,
  //   },
  // });

  res.send({ transactions: transactions, ledgers: ledgers });
};

/*create a new transaction*/
exports.create = async (req, res) => {
  console.log("transactions/create");
  console.log(req.body.data);
  // console.log(req.user);
  try {
    //loop through transactions array
    //save new transactions
    async function f() {
      await req.body.data.forEach(async (transaction) => {
        const create = await prisma.transactions.create({
          data: {
            nominalAccountID: parseInt(transaction.nominalAccountID),
            entryType: transaction.entryType,
            transactionDate: new Date(transaction.transactionDate),
            description: transaction.description,
            amount: parseFloat(transaction.amount),
            userID: req.user.id,
          },
        });
        console.log(create); //FIXME: update the doubleEntryID field using create object return value. The ids for both newly created transactions will be here.
      });
    }

    //TODO: save newly created transaction ID

    //TODO: assign double entry by editing both records

    //FIXME: Doesn't return the last record in table!

    //return updated transactions
    await f().then(async () => {
      const newTransactions = await prisma.transactions.findMany({
        where: {
          userID: req.user.id,
        },
      });

      res.send(newTransactions);
    });

    // res.send("newTransactions");
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message }); //500 internal server error
  }
};

/*delete a transaction*/
exports.deleteTransaction = async (req, res) => {
  console.log("transactions/delete");
};

//TODO: this should be done by date order, then will be shown in dashboard
const getTransactions = async (id) => {
  const transactions = await prisma.transactions.findMany({
    where: {
      userID: id,
    },
  });
  return transactions;
};

const getLedgers = async (id) => {
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
      userID: id,
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

  return ledgers;
};
