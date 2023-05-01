const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

async function main() {
  //Users:
  const user1 = await prisma.user.upsert({
    where: { email: "kazim@prisma.io" },
    update: {},
    create: {
      email: "kazim@prisma.io",
      fname: "kazim",
      lname: "manji",
      password: bcrypt.hashSync("password", 10),
    },
  });

  //Business Data:
  const businessData1 = await prisma.businessData.upsert({
    where: { userID: 1 },
    update: {},
    create: {
      companyName: "Seven Spice Ltd",
      address: "1 Melton Road",
      telephone: "07826353",
      currency: "GBP",
      financialYearEnd: "March",
      userID: 1,
    },
  });

  //Nominal accounts:
  const nominalAccounts1 = await prisma.nominalAccounts.createMany({
    skipDuplicates: true,
    data: [
      //Profit loss accounts
      {
        id: 1,
        accountName: "Retail sales",
        code: 4000,
        financialStatement: "Income Statement",
        groupName: "Income",
      },
      {
        id: 2,
        accountName: "Services",
        code: 4010,
        financialStatement: "Income Statement",
        groupName: "Income",
      },
      {
        id: 3,
        accountName: "Discounts allowed",
        code: 4020,
        financialStatement: "Income Statement",
        groupName: "Income",
      },
      {
        id: 4,
        accountName: "Purchases",
        code: 4400,
        financialStatement: "Income Statement",
        groupName: "Cost of sales",
      },
      {
        id: 5,
        accountName: "Packaging",
        code: 4410,
        financialStatement: "Income Statement",
        groupName: "Cost of sales",
      },
      {
        id: 6,
        accountName: "Discounts received",
        code: 4420,
        financialStatement: "Income Statement",
        groupName: "Cost of sales",
      },
      {
        id: 7,
        accountName: "Shipping costs",
        code: 4430,
        financialStatement: "Income Statement",
        groupName: "Cost of sales",
      },
      {
        id: 8,
        accountName: "Import duty",
        code: 4440,
        financialStatement: "Income Statement",
        groupName: "Cost of sales",
      },
      {
        id: 9,
        accountName: "Productive Labour",
        code: 4470,
        financialStatement: "Income Statement",
        groupName: "Cost of sales",
      },
      {
        id: 10,
        accountName: "Research and development",
        code: 4800,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 11,
        accountName: "Sales commissions",
        code: 5000,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 12,
        accountName: "Sales promotion",
        code: 5010,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 13,
        accountName: "Research and development",
        code: 4800,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 14,
        accountName: "Advertising",
        code: 5020,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 15,
        accountName: "Gifts & samples",
        code: 5030,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 16,
        accountName: "Payroll",
        code: 5200,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 17,
        accountName: "Contract labor",
        code: 5210,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 18,
        accountName: "Computer and internet",
        code: 5250,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 19,
        accountName: "Software",
        code: 5260,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 20,
        accountName: "Website",
        code: 5270,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 21,
        accountName: "Rent",
        code: 5280,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 22,
        accountName: "Utilities",
        code: 5300,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 23,
        accountName: "Motor expenses",
        code: 5310,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 24,
        accountName: "Travelling",
        code: 5320,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 25,
        accountName: "Postage & carriage",
        code: 5360,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },
      {
        id: 26,
        accountName: "Depreciation",
        code: 5600,
        financialStatement: "Income Statement",
        groupName: "Expense",
      },

      ///Balance sheet accounts
      {
        id: 28,
        accountName: "Bank account",
        code: 1000,
        financialStatement: "Balance sheet",
        groupName: "Current assets",
      },
      {
        id: 29,
        accountName: "Allowance for doubtful debts account",
        code: 1210,
        financialStatement: "Balance sheet",
        groupName: "Current assets",
      },
      {
        id: 30,
        accountName: "Inventory",
        code: 1400,
        financialStatement: "Balance sheet",
        groupName: "Current assets",
      },
      {
        id: 31,
        accountName: "Prepayments",
        code: 1600,
        financialStatement: "Balance sheet",
        groupName: "Current assets",
      },
      {
        id: 32,
        accountName: "Land and Buildings",
        code: 1800,
        financialStatement: "Balance sheet",
        groupName: "Long term assets",
      },
      {
        id: 33,
        accountName: "Land and Buildings Depreciation",
        code: 1810,
        financialStatement: "Balance sheet",
        groupName: "Long term assets",
      },
      {
        id: 34,
        accountName: "Accounts Payable",
        code: 2000,
        financialStatement: "Balance sheet",
        groupName: "Current liabilities",
      },
      {
        id: 35,
        accountName: "Accrued expenses",
        code: 2220,
        financialStatement: "Balance sheet",
        groupName: "Current liabilities",
      },
      {
        id: 36,
        accountName: "Loans",
        code: 2600,
        financialStatement: "Balance sheet",
        groupName: "Long-term liabilities",
      },
      {
        id: 37,
        accountName: "Capital",
        code: 3000,
        financialStatement: "Balance sheet",
        groupName: "Equity",
      },
    ],
  });

  //TODO:   Transactions:
  const Transactions1 = await prisma.transactions.createMany({
    skipDuplicates: true,
    data: [
      //Capital
      {
        nominalAccountID: 1000,
        entryType: "Debit",
        transactionDate: new Date("2022-01-01"),
        description: "£2000 Captial for business account",
        amount: 2000.0,
        userID: 1,
        reference: 1,
        doubleEntryID: 2,
      },
      {
        nominalAccountID: 3000,
        entryType: "Credit",
        transactionDate: new Date("2022-01-01"),
        description: "£2000 Capital for business account",
        amount: 2000.0,
        userID: 1,
        reference: 2,
        doubleEntryID: 1,
      },
      //Retail sales
      {
        nominalAccountID: 4000,
        entryType: "Credit",
        transactionDate: new Date("2022-02-01"),
        description: "Sales",
        amount: 20.0,
        userID: 1,
        reference: 3,
        doubleEntryID: 4,
      },
      {
        nominalAccountID: 1000,
        entryType: "Debit",
        transactionDate: new Date("2022-02-01"),
        description: "Sales",
        amount: 20.0,
        userID: 1,
        reference: 4,
        doubleEntryID: 3,
      },
      {
        nominalAccountID: 4000,
        entryType: "Credit",
        transactionDate: new Date("2022-03-01"),
        description: "Sales",
        amount: 20.0,
        userID: 1,
        reference: 5,
        doubleEntryID: 6,
      },
      {
        nominalAccountID: 1000,
        entryType: "Debit",
        transactionDate: new Date("2022-03-01"),
        description: "Sales",
        amount: 20.0,
        userID: 1,
        reference: 6,
        doubleEntryID: 5,
      },
      {
        nominalAccountID: 4000,
        entryType: "Credit",
        transactionDate: new Date("2022-04-01"),
        description: "Sales",
        amount: 33.20,
        userID: 1,
        reference: 7,
        doubleEntryID: 8,
      },
      {
        nominalAccountID: 1000,
        entryType: "Debit",
        transactionDate: new Date("2022-04-01"),
        description: "Sales",
        amount: 33.20,
        userID: 1,
        reference: 8,
        doubleEntryID: 7,
      },
      //Purchases
      {
        nominalAccountID: 4400,
        entryType: "Debit",
        transactionDate: new Date("2022-05-01"),
        description: "Purchase of Inventory",
        amount: 1000,
        userID: 1,
        reference: 9,
        doubleEntryID: 10,
      },
      {
        nominalAccountID: 1000,
        entryType: "Credit",
        transactionDate: new Date("2022-05-01"),
        description: "Purchase of Inventory",
        amount: 1000,
        userID: 1,
        reference: 10,
        doubleEntryID: 9,
      },
      //Expenses
      {
        nominalAccountID: 1000,
        entryType: "Credit",
        transactionDate: new Date("2022-06-01"),
        description: "Google Advertising",
        amount: 25,
        userID: 1,
        reference: 11,
        doubleEntryID: 12,
      },
      {
        nominalAccountID: 5020,
        entryType: "Debit",
        transactionDate: new Date("2022-06-01"),
        description: "Google Advertising",
        amount: 25,
        userID: 1,
        reference: 12,
        doubleEntryID: 11,
      },
      {
        nominalAccountID: 1000,
        entryType: "Credit",
        transactionDate: new Date("2022-07-01"),
        description: "CRM software fee",
        amount: 20,
        userID: 1,
        reference: 13,
        doubleEntryID: 14,
      },
      {
        nominalAccountID: 5260,
        entryType: "Debit",
        transactionDate: new Date("2022-07-01"),
        description: "CRM software fee",
        amount: 20,
        userID: 1,
        reference: 14,
        doubleEntryID: 13,
      },
      {
        nominalAccountID: 1000,
        entryType: "Credit",
        transactionDate: new Date("2022-08-01"),
        description: "Royal Mail Postage",
        amount: 5,
        userID: 1,
        reference: 15,
        doubleEntryID: 16,
      },
      {
        nominalAccountID: 5360,
        entryType: "Debit",
        transactionDate: new Date("2022-08-01"),
        description: "Royal Mail Postage",
        amount: 5,
        userID: 1,
        reference: 16,
        doubleEntryID: 15,
      },
      {
        nominalAccountID: 1000,
        entryType: "Credit",
        transactionDate: new Date("2022-09-01"),
        description: "Royal Mail Postage",
        amount: 5,
        userID: 1,
        reference: 17,
        doubleEntryID: 18,
      },
      {
        nominalAccountID: 5360,
        entryType: "Debit",
        transactionDate: new Date("2022-09-01"),
        description: "Royal Mail Postage",
        amount: 5,
        userID: 1,
        reference: 18,
        doubleEntryID: 17,
      },
      {
        nominalAccountID: 1000,
        entryType: "Credit",
        transactionDate: new Date("2022-10-01"),
        description: "Royal Mail Postage",
        amount: 5,
        userID: 1,
        reference: 19,
        doubleEntryID: 20,
      },
      {
        nominalAccountID: 5360,
        entryType: "Debit",
        transactionDate: new Date("2022-10-01"),
        description: "Royal Mail Postage",
        amount: 5,
        userID: 1,
        reference: 20,
        doubleEntryID: 19,
      },
      //service Sales:
      {
        nominalAccountID: 1000,
        entryType: "Debit",
        transactionDate: new Date("2022-11-01"),
        description: "Consulting fee",
        amount: 150.0,
        userID: 1,
        reference: 21,
        doubleEntryID: 22,
      },
      {
        nominalAccountID: 4010,
        entryType: "Credit",
        transactionDate: new Date("2022-11-01"),
        description: "Consulting fee",
        amount: 150.0,
        userID: 1,
        reference: 22,
        doubleEntryID: 21,
      },

      //BS
      {
        nominalAccountID: 1800,
        entryType: "Debit",
        transactionDate: new Date("2022-03-01"),
        description: "New Property",
        amount: 150.0,
        userID: 1,
        reference: 23,
        doubleEntryID: 24,
      },
      {
        nominalAccountID: 1000,
        entryType: "Credit",
        transactionDate: new Date("2022-03-01"),
        description: "New Property",
        amount: 150.0,
        userID: 1,
        reference: 24,
        doubleEntryID: 23,
      },
      {
        nominalAccountID: 4400,
        entryType: "Debit",
        transactionDate: new Date("2022-02-01"),
        description: "Purchase on credit",
        amount: 23.99,
        userID: 1,
        reference: 25,
        doubleEntryID: 26,
      },
      {
        nominalAccountID: 2000,
        entryType: "Credit",
        transactionDate: new Date("2022-02-01"),
        description: "Purchase on credit",
        amount: 23.99,
        userID: 1,
        reference: 26,
        doubleEntryID: 25,
      },
      {
        nominalAccountID: 1000,
        entryType: "Debit",
        transactionDate: new Date("2022-11-01"),
        description: "Bank Loan",
        amount: 2000,
        userID: 1,
        reference: 27,
        doubleEntryID: 28,
      },
      {
        nominalAccountID: 2600,
        entryType: "Credit",
        transactionDate: new Date("2022-11-01"),
        description: "Bank Loan",
        amount: 2000,
        userID: 1,
        reference: 28,
        doubleEntryID: 27,
      },

    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });