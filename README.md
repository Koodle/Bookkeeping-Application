# Bookkeeping-Application

This web application will allow you to record bookkeeping transactions for your business.

It uses Next.js with TypeScript, Express.js, Node.js and PostgreSQL.

## Software Requirements

Windows 10 operating system, PostgreSQL, Node.js V18.15.0

## Installation

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