# Bookkeeping-Application

This web application will allow you to record bookkeeping transactions for your business.

Frontend: Next.js (TypeScript), Redux.js, Tailwind.css 
Backend: Node.js Express.js, Prisma ORM (PostgreSQL)

1) [Demo](#demo)
2) [Installation](#installation)

<a name="demo"/>

# Demo

### Dashboard
![Dashboard](https://github.com/Koodle/Bookkeeping-Application/blob/main/demoImages/Dashboard.png)

### Ledgers
![Ledgers](https://github.com/Koodle/Bookkeeping-Application/blob/main/demoImages/Ledgers.png)

### Reports
![Reports](https://github.com/Koodle/Bookkeeping-Application/blob/main/demoImages/Reports.png)

### Journals Add
![JournalsAdd](https://github.com/Koodle/Bookkeeping-Application/blob/main/demoImages/AddJournals.png)

### Journals Edit
![JournalsEdit](https://github.com/Koodle/Bookkeeping-Application/blob/main/demoImages/EditJournals.png)

### User Info
![UserInfo](https://github.com/Koodle/Bookkeeping-Application/blob/main/demoImages/UserInfo.png)

### Login
![Login](https://github.com/Koodle/Bookkeeping-Application/blob/main/demoImages/Login.png)

<a name="installation"/>

# Installation

## Software Requirements

Windows 10 operating system, PostgreSQL 15, Node.js V18.15.0

## Method

1. Clone the repository
2. Navigate to ```\backend``` folder:
```bash 
npm install
```
```bash 
npm install -g nodemon
```

3. Create a database in PostgreSQL
4. Update the ```.env``` file with the new database information:

Example:
```bash 
DATABASE_URL="postgresql://postgres:password@localhost:5432/bookkeeper?schema=public"
```

5. Migrate schemas from Prisma:
```bash 
npx prisma migrate dev --name init
npm rebuild
```
6. To Seed the database:
```bash 
npx prisma db seed
```

7. Navigate to ```\frontend\Bookkeeping-Application``` folder:
```bash 
npm install
```

## Starting The Application

### To start the backend
Navigate to ```\backend``` folder:

Either click on the executable file ```backend-win.exe``` OR type in console ```npm start```

### To start the frontend
Navigate to ```\frontend\Bookkeeping-Application``` folder:

To start in dev mode:
```bash 
npm run dev
```

To start in build mode:
```bash 
npm run build
npm run start
```

### Accessing the application

In your browser navigate to ```http://localhost:3000/```
