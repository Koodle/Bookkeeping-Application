const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*return all transactions for the user*/
exports.index = async (req, res) => {
  console.log("transactions/index");
  const transactions = await prisma.transactions.findMany({
    where: {
      userID: req.user.id,
    },
  });

  res.send(transactions);
};

/*create a new transaction*/
exports.create = async (req, res) => {
  console.log("transactions/create");
  try {
    //save new transactions
    async function f() {
      await req.body.data.forEach(async (transaction) => {
        const create = await prisma.transactions.create({
          data: {
            nominalAccountID: transaction.nominalAccountID,
            entryType: transaction.entryType,
            transactionDate: new Date(transaction.transactionDate),
            description: transaction.description,
            amount: transaction.amount,
            userID: req.user.id,
          },
        });
        console.log(create); //FIXME: update the doubleEntryID field using create object return value. The ids for both newly created transactions will be here.
      });
    }

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
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message }); //500 internal server error
  }
};

/*delete a transaction*/
exports.deleteTransaction = async (req, res) => {};
