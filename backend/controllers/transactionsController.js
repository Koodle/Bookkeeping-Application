const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*return all transactions and ledgers for the user*/
exports.index = async (req, res) => {
  console.log("transactions/index");

  //append user data
  let transactions = await getTransactions(req.user.id);

  //append user ledgers
  let ledgers = await getLedgers(req.user.id);

  res.send({ transactions: transactions, ledgers: ledgers });
};

/*create a new transaction*/
exports.create = async (req, res) => {
  console.log("transactions/create");
  // console.log(req.body.data);
  // console.log(req.user);
  try {
    //loop through transactions array
    //save new transactions
    async function f() {

      let lastTrans = await prisma.transactions.findFirst({
        take: -1,
        where: {
          userID: req.user.id
        }
      });

      await req.body.data.forEach(async (transaction, index) => {
        if (index === 0){
          let create = await prisma.transactions.create({
            data: {
              nominalAccountID: parseInt(transaction.nominalAccountID),
              entryType: transaction.entryType,
              transactionDate: new Date(transaction.transactionDate),
              description: transaction.description,
              amount: parseFloat(transaction.amount),
              userID: req.user.id,
              reference: transaction.reference,
              doubleEntryID: lastTrans.id + 2
            },
          });
        }else {
          let create = await prisma.transactions.create({
            data: {
              nominalAccountID: parseInt(transaction.nominalAccountID),
              entryType: transaction.entryType,
              transactionDate: new Date(transaction.transactionDate),
              description: transaction.description,
              amount: parseFloat(transaction.amount),
              userID: req.user.id,
              reference: transaction.reference,
              doubleEntryID: lastTrans.id + 1
            },
          });
        }
      });
    }

    await f().then(async() => {
      //return updated transactions
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

/*delete transactions*/
exports.deleteTransactions = async (req, res) => {
  console.log("transactions/delete");
  try {
    console.log(req.body);
    console.log(req.user);

    // req.body.transactions.forEach(async (element) => {
    //   const deleteTransaction = await prisma.transactions.delete({
    //     where: {
    //       id: element.id,
    //       // userID: req.user.id,
    //     },
    //   });
    // });

    //TODO:
    //1) find both transactions where the userID is same as that taken from token & transaction ID matches the one sent
    //2) find the second transaction, Do same checks as step 1, but also check their double entry values to see if they match.

    //FIXME: transactions and ledgers are not updated need to use .then(), if i call get transactions they are deleted

    //append transactions
    // let transactions = await getTransactions(req.user.id);

    // //append ledgers
    // let ledgers = await getLedgers(req.user.id);

    // res.send({ transactions: transactions, ledgers: ledgers });
    res.send("hi")
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};

/*edit transactions*/
exports.editTransactions = async (req, res) => {
  console.log("transactions/edit");
  
  try {
    console.log(req.body.transactions);
    // console.log(req.user);

    async function f() {
      await req.body.transactions.forEach(async (element) => {

        //remove IDs
        elementWithoutID = {...element}
        delete elementWithoutID["id"]
        delete elementWithoutID["userID"]
    
        // //correct date format
        // elementWithoutID["transactionDate"] = new Date(element.transactionDate)

        // //parse float for amount
        // elementWithoutID["amount"] = parseFloat(element.amount)

        console.log(elementWithoutID);

        const updateTransaction = await prisma.transactions.update({
          where: {
            id: element.id
          },
          data: elementWithoutID
        })
        console.log(updateTransaction); //FIXME: update the doubleEntryID field using create object return value. The ids for both newly created transactions will be here.
      });
    }

    //return updated transactions
    await f().then(async () => {
    
      //return transactions
      let transactions = await getTransactions(req.user.id);

      //return ledgers
      let ledgers = await getLedgers(req.user.id);

      //TODO:return success or failure

      res.send({ transactions: transactions, ledgers: ledgers });
    })
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};

//TODO: this should be done by date order, then will be shown in dashboard
const getTransactions = async (id) => {
  // const transactions = await prisma.transactions.findMany({
  //   where: {
  //     userID: id,
  //   },
  // });
  // return transactions;

  const transactions = await prisma.transactions.findMany({
    orderBy: [
      {
        reference: "asc",
      }
    ],
    where: {
      userID: id,
    }
  });
  return transactions
};

const getLedgers = async (id) => {
  let ledgers = {};

  const transactions = await prisma.transactions.findMany({
    orderBy: [
      {
        nominalAccountID: "asc",
      },
      {
        reference: "asc",
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
