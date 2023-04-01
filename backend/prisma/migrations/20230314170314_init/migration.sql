-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NominalAccounts" (
    "id" SERIAL NOT NULL,
    "accountName" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "financialStatement" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,

    CONSTRAINT "NominalAccounts_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "reference" INTEGER,
    "nominalAccountID" INTEGER NOT NULL,
    "entryType" TEXT NOT NULL,
    "transactionDate" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "userID" INTEGER NOT NULL,
    "doubleEntryID" INTEGER,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessData" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT,
    "address" TEXT,
    "telephone" TEXT,
    "currency" TEXT,
    "financialYearEnd" TEXT,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "BusinessData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_reference_key" ON "Transactions"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_doubleEntryID_key" ON "Transactions"("doubleEntryID");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessData_userID_key" ON "BusinessData"("userID");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_nominalAccountID_fkey" FOREIGN KEY ("nominalAccountID") REFERENCES "NominalAccounts"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessData" ADD CONSTRAINT "BusinessData_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
