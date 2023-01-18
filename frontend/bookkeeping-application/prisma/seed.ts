import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: "kazim@prisma.io",
      fname: "kazim",
      lname: "manji",
    },
  });
  const businessData1 = await prisma.businessData.create({
    data: {
      companyName: "Seven Spice Ltd",
      address: "1 Melton Road",
      telephone: "07826353",
      currency: "GBP",
      financialYearEnd: "March",
      userID: 1,
    },
  });
  const nominalAccounts1 = await prisma.nominalAccounts.createMany({
    data: [
      ///P/L accounts
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
        id: 27,
        accountName: "Bank account",
        code: 1000,
        financialStatement: "Balance sheet",
        groupName: "Current assets",
      },
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
