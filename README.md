# Bookkeeping-Application

This web application will allow you to record bookkeeping transactions for your business.
It uses Next.js with TypeScript, Express.js, Node.js and PostgreSQL.

##Software Requirements

-Windows 10 operating system
-PostgreSQL
-Node.js V18.15.0

##Installation

1. clone the repository
2. navigate to ```\backend``` folder:
```bash 
npm install
```
```bash 
npm install -g nodemon
```

3. create a database in PostgreSQL
4. Update the ```.env``` file with the new database information:
Example:
DATABASE_URL="postgresql://postgres:password@localhost:5432/bookkeeper?schema=public"
APP_PORT=4000
APP_URL=http@//127.0.0.1
APP_KEY=b1183f932273abc7384235db29245393643b2b8eadd4d229e44567439e11488124af01b12d9b711a248852b36f775ba8928f00d75774d8e1d68239882600b530

5. Migrate schemas from Prisma:
```bash 
npx prisma migrate dev --name init
npm rebuild
```
6. To Seed the database:
```bash 
npx prisma db seed
```

7. navigate to ```\frontend\Bookkeeping-Application``` folder:


frontend -> npm run dev
backend -> npm run start

Files:
(list all files)


##Starting The Application

###To start backend
Either click on the executable file ```backend-win.exe``` OR navigate to ```\backend``` and type ```npm start```

###To start frontend

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



""""""""""""""""""
Available commands:

backend:
npm start OR click on executable file (backend-win.exe)

frontend:
-npm run dev: start dev version

-npm run build: create optimized build of application
-npm run start: start optimized build version
""""""""""""""""""


Use of Executable:
(how the executable itself can be activated)

Software Requirements:
(details of the operating system required and any other programs that are required)

-Windows 10 operating system
-PostgreSQL
-Node.js V18.15.0