  const express = require('express');
  const bodyParser = require('body-parser');
  const mysql = require('mysql2/promise');
  const cors = require('cors');
  const sanitizeHtml = require('sanitize-html');
  const session = require('express-session')
  const bcrypt = require('bcrypt')



  const app = express();
  const port = 3000;

  app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    },
  }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static('public'))


  // Database configuration
  async function initializeDB() {
    const db = await mysql.createPool({
      host: 'localhost',
      user: 'root',   
      password: '',
      database: 'silogstore'
    })

    try {
      await db.getConnection(); // This line establishes the connection pool
      return db;
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw error;
    }
  }

  let db

  (async () => {
    try {
      db = await initializeDB();
      console.log('Database connection initialized successfully.');

    } catch (error) {
      console.error('Failed to initialize database:', error);
    }

  
    
    // CREATE ACCOUNT
  app.post("/createacc", async (req, res) => {
    try {
      const { fname, lname ,username, password } = req.body;

      const encrypted = await bcrypt.hash(password, 10);
      
      const query = 'INSERT INTO accounts (firstName, lastName ,username, password) VALUES (?,?,?,?)';
      const [insertResult] = await db.execute(query, [ fname, lname, username, encrypted]);

      return res.status(200).send("Account created")
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ error: "An error occurred while processing the request." });
    }
  });

  // AuthorizeVoidCreation
  app.post('/voidReg', async (req, res) => {
    try {
      const { vnameVal, vpassVal } = req.body;

      if (!vnameVal || !vpassVal) {
        return res.status(400).send('Name and password are required.');
      }

      const voidpassHash = await bcrypt.hash(vpassVal, 10);

      const insert = "INSERT INTO authorizedVoid (voidnumber, password) VALUES (?, ?)";
      const [result] = await db.execute(insert, [vnameVal, voidpassHash]);
      console.log("Authorized person", result);

      res.status(200).send("Registration successful.");
    } catch (err) {
      console.log("Error", err);
      res.status(500).send("An error occurred: " + err);
    }
  });



  let userTable;
  let userName;
  // LOGIN ACCOUNT
  app.post("/login", async (req, res) => {
    const { user, pass } = req.body;

    const query = "SELECT * FROM accounts WHERE username = ?";
    
    try {
      const [rows] = await db.execute(query, [user]);
      req.session.record = rows[0];

      if (!req.session.record ) {
        return res.status(401).json({ message: "Invalid credentials" });
      }


      const passwordMatch = await bcrypt.compare(pass, req.session.record.password);
      console.log("Password Match:", passwordMatch);
    
      if (passwordMatch) {
        
        const currentDate = new Date()
        const month =  currentDate.getUTCMonth() + 1
        req.session.transactionCreatedBy = req.session.record.firstName + " " + req.session.record.lastName 
        req.session.userTable = `${req.session.record.firstName}_${req.session.record.lastName}_${month}_${currentDate.getDate()}_${currentDate.getFullYear()}`
        const createTableQuery = `CREATE TABLE IF NOT EXISTS ${req.session.userTable} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          tnx VARCHAR(10),
          product LONGTEXT,
          total VARCHAR(45)
        )`;

        await db.execute(createTableQuery);
        userTable = req.session.userTable
        userName = req.session.transactionCreatedBy
        return res.status(200).json({
          message: "Login successful"
        })
      } else {
        console.log("LOGIN err");
        return res.status(401).send("Invalid credentials");
      }
    } catch (error) {
      console.error("Failed to login", error);
      return res.status(500).send("Error logging in")
    }
  });


  app.get('/isLoggedin', (req, res)=>{
    if(userName && userTable){
      console.log("Session continued");
      return res.status(200).json({
        message : "Welcome, session continued",
        user : userName
      })
    }
    else{
      console.log(userName, userTable);
      console.log("Session Expired");
      return res.status(400).json({
        message : "Session Expired",
        user : "No user found"
      })
    }
  })

  app.post('/allorders', async (req, res) => {
    if (!userTable) {
      return res.status(401).send('Unauthorized');
    }


    try {
      const { receiptContent, holderTnx, orderTotal } = req.body;
      const allOrdersQuery = 'INSERT INTO management_order_records (transactions, product, totalAmount, cashierName) VALUES (?, ?, ?, ?)';

      await db.execute(allOrdersQuery, [holderTnx, receiptContent,orderTotal, userName]);

      console.log('Data inserted into allorders successfully');
      return res.status(200).send('Data inserted into allorders successfully');
    } catch (error) {
      console.error('Error inserting data into allorders:', error);
      return res.status(500).send('Error inserting data into allorders');
    }
  });




  // Route to handle data submission 
  app.post('/userReceipt', async (req, res) => {
    if (!userTable) {
      return res.status(401).send('Unauthorized');
    }



    try {
      const { receiptContent, holderTnx, orderTotal } = req.body;
      const sanitized = sanitizeHtml(receiptContent);

      const Insertquery = `INSERT INTO ${userTable} (tnx, product, total) VALUES (?, ?, ?)`;

      await db.execute(Insertquery, [holderTnx, sanitized,orderTotal])

      console.log('Data inserted into logged successfully');
      return res.status(200).send('Data inserted into logged user successfully');
    } catch (error) {
      console.error('Error inserting data into allorders:', error);
      return res.status(500).send('Error inserting data into allorders');
    }
    
  });



  app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).json({ message: "Error logging out" });
        } else {
          userTable = ''
          userName = ''
          res.status(200).json({ message: "Logged out successfully" });
        }
    });
  });

  app.get("/shutdown", (res,req) =>{
    exec('shutdown /s /f /t 0', (error)=>{
      if(error)
      {
        res.status(500).send('Error shutting down');
      }
    })
  })


  // VOIDPASS
  app.post("/voidpass", async (req, res) => {
    try {
      const {VoidNum ,VoidPass} = req.body;
      
      console.log(VoidNum, VoidPass);
      const query = "SELECT * FROM authorizedvoid WHERE voidnumber = ?";
      const [accountRow] = await db.execute(query, [VoidNum]);
      

      if (!accountRow || accountRow.length === 0) {
        return res.status(401).send("Unauthorized");
      }

      const storedHashedPassword = accountRow[0];
      const compare = await bcrypt.compare(VoidPass, storedHashedPassword.password);

      if (compare) {
        return res.status(200).send("Password Matched");
      } else {
        return res.status(401).send("Password Mismatch");
      }

    } catch (err) {
      console.log("Error", err);
      res.status(500).send("An error occurred: ",err);
    }
  });




  app.get('/search', async (req, res) => {
    const searchTerm = req.query.q; 
    
    try {
      let query = `SELECT * FROM management_order_records  WHERE transactions = '${searchTerm}'`;

    

      const [results] = await db.execute(query);
    
      //return data to client side
      res.json(results);
    } catch (error) {
      console.error('Error searching data:', error);
      res.status(500).json({ error: 'An error occurred while searching data' });
    }
  });



    app.get('/cutoff', async (req, res) =>{
      try{  

        if(!userName){
          return res.status(400).json({ message: "No user data available" });
        }

        const retrieve = `SELECT SUM(total) AS totalEarnings FROM ${userTable}`
        const [datas] = await db.execute(retrieve)
        return res.status(200).json({cashier: userName, salary: datas[0].totalEarnings})

      }catch(err){
        console.log("Retrieving total failed");
      }
    })


    app.post('/pinCode', async (req, res) =>{
      try{  
        const {pinCodes} = req.body
        const retrievePIN = `SELECT PIN FROM managersaccounts WHERE PIN = ?`
        const [retriResult] = await db.execute(retrievePIN, [pinCodes])
        const info = retriResult[0]
        if(!info){
          console.log("PIN not found");
          console.log(info);
          return res.status(400).send("PIN not found")
          
        }
        else{
          console.log("PIN found");
          return res.status(200).send("PIN found")
        }
      }catch(err){
        console.log("Retrieving PIN failed");
        return res.status(400).send("PIN not found")
      }
    })


  })()


      app.listen(port, () => {
        console.log(`Server is listening at ${port}`);
      });
