const express = require("express");
const db = require('./db');
const app = express();
const jwt = require("jsonwebtoken");
const cors = require('cors');
// api functions
const {Caching}=require('./routes')
const { Login } = require('./routes')
const { Logout } = require('./routes');
const { AdminDashboard } = require('./routes');
const { UploadData } = require('./routes')
const { verifyToken } = require('./routes');
const { Foreclosure } = require('./routes');
const { Dashboard } = require('./routes')
const { checkURLAccess } = require('./routes')

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
//     console.log("🚀 ~ file: index.js:19 ~ app.post ~ result:", result)
//     const user = result.rows[0];
//     console.log("🚀 ~ file: index.js:21 ~ app.post ~ user:", user)
//     console.log("user details are  : ", user)
//     console.log("users pw", user.password, "set pw : ", password)
//     if (user && user.password === password) {
//       // console.log("correct credentials");
//       const token_id = 'token_id';
//       const tokenVal = jwt.sign({ username }, secretKey, { expiresIn: '1800s' });
//       await db.query('INSERT INTO AccessToken (id,user_id, access_token, expiration_timestamp) VALUES (nextval($1), $2, $3,$4)',
//         [token_id, user.id, tokenVal, new Date(Date.now() + 3600000)]);

//       console.log("🚀 token:", tokenVal);
//       if (user.role_id == 1001) {
//         res.status(200).json({ tokenVal, message: `Welcome ${username}` });
//       }
//       else if (user.role_id == 1003) {
//         res.status(200).json({ tokenVal, message: `WelcomeAdmin ${username}` });
//       }
//       else {
//         res.status(200).json({ tokenVal, message: `WelcomeTenant ${username}` });
//       }

//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'No User Found' });
//   }
// });

app.post('/login', Login)
app.get('/admin-dashboard', verifyToken, checkURLAccess, AdminDashboard)
app.get('/upload-data', verifyToken , checkURLAccess ,UploadData )
app.get('/dashboard', verifyToken, checkURLAccess,Dashboard)
app.get('/foreclosure', verifyToken, checkURLAccess ,Foreclosure)
app.get('/logout', verifyToken,checkURLAccess, Logout)

// caching code
// will store seed data-role id,url,url-type

Caching(); // runs for the first time at initiation of server


const port = 8000;
app.listen(port, () => console.log(`server running on port ${port}`))


