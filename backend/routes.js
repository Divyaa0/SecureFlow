const express = require("express");
const db = require('./db');
const app = express();
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const secretKey = "SOME_SECRET";
// cache



const cors = require('cors');
console.log("secret key ", secretKey)
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

let role_url_ui = {};
let role_url_api = {};

async function verifyToken(req, res, next) {
    console.log("in verification function : ", secretKey)
    const token = req.headers['authorization']; // token is sent in the 'Authorization' header
    // console.log("🚀 ~ token in verification function :", token)
    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }
    const tokenExists = await db.query('SELECT COUNT(*) FROM accesstoken WHERE access_token = $1', [token]);
    const count = parseInt(tokenExists.rows[0].count);
    console.log("token count is ", count)
    if (count === 0) {
        console.log('Token expired');
    }
    else {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log("error is ", err)
                return res.status(401).json({ message: 'Invalid token' });
            }
            // If token is valid, can access its payload in 'decoded'
            req.user = decoded;
            const { username, userid } = decoded;
            console.log("req.user is", req.user)
            const role_id=req.user.role_id;
            //   console.log(username," ......",userid)
            // res.status(200).json({ username, role_id, message: 'Token Verified' });
            next();
        });
    }

}
const Caching = async()=> { 
    console.log("In caching function  : ",role_url_api)
    console.log("🚀 ~ file: routes.js:53 ~ Caching ~ Object.keys(role_url_api).length === 0:", Object.keys(role_url_api).length === 0)
        if (Object.keys(role_url_api).length === 0) {
            console.log("cache is empty...query will execute")
        try {
            const caching = await db.query('SELECT role_id, url, url_type FROM role_screen JOIN screen_urls ON role_screen.screen_id = screen_urls.screen_id');
            const role_url = caching.rows;
            console.log("total role_url : ", caching.rows);
            role_url_api = role_url.filter(data => data.url_type === 'backend')
            role_url_ui = role_url.filter(data => data.url_type === 'frontend')
            console.log("backend role url present in cache   : ", role_url_api)
            console.log("frontend role url present in cache   : ", role_url_ui)
            // return role_url_api,role_url_ui;
            return{
                "role_url_uii":role_url_ui,
                "role_url_apii":role_url_api
            }
            return obj
            // return{role_url_uii:role_url_ui , role_url_apii:role_url_api}

        } catch (error) {
            console.log("🚀  cacheUrls ~ error:", error)
            return error;        
        }
    }
    else {
        console.log("🚀cache filled : ",role_url_api)
        // return role_url_api;
        return{
            "role_url_uii":role_url_ui,
            "role_url_apii":role_url_api
        }
 
    }
}
const checkURLAccess = async (req, res,next) => {
    console.log("check URL access function called")
    try {
        const {role_url_apii}= await Caching();
        console.log("🚀 ~ file: routes.js:81 ~ checkURLAccess ~ _test:", role_url_apii)
        console.log("Cached data recieved: ",  role_url_apii );
        const reqURL=req.route.path;
        const reqRole_id=req.user.role_id;
        console .log("role_id requesting for screen access: ",reqRole_id)
        console.log("requested url requesting for screen access : ", reqURL)
        const checkApi=role_url_apii.some(data=>{return data.role_id===reqRole_id && data.url===reqURL})
        // const checkUI=cachedAPIData.some(data=>{return data.role_id===reqRole_id && data.url===reqURL})
        if(checkApi)
        {
            res.status(200).json({ reqRole_id, message: 'Token Verified' });
            console.log("access granted")
            next()
        }
        else
        {
            console.log("access denied")
            return res.status(401).json({ message: 'Not Accessible url' });      
        }
        
    } catch (error) {
        // Handle errors if caching fails
        console.error("Error while caching: ", error);
        // Respond with an appropriate error message
        res.status(500).json({ message: 'Error', error: error.message });
    }
};
const Login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        console.log("user details are  : ", user)
        userid = user.id;
        console.log("users pw", user.password, "set pw : ", password)

        if (user && user.password === password) {
            console.log("correct credentials");
            // console.log("userid is ",userid)
            const role_id = user.role_id;
            // TOKEN GENERATION
            const tokenVal = jwt.sign({ username, role_id }, secretKey, { expiresIn: '18000s' });
            // CALL CACHE
            const{role_url_uii}=await Caching();
            console.log("cache of frontend urls : ",role_url_uii)

            const token_id = 'token_id';
            await db.query('INSERT INTO AccessToken (id,user_id, access_token, expiration_timestamp) VALUES (nextval($1), $2, $3,$4)',
                [token_id, user.id, tokenVal, new Date(Date.now() + 3600000)]);

            // console.log("🚀 In Login Function , token value :", tokenVal);

            if (user.role_id == 1001) {
                res.status(200).json({ tokenVal, role_url_uii,userid,role_id, message: `Welcome ${username}` });
            }
            else if (user.role_id == 1003) {
                res.status(200).json({ tokenVal,role_url_uii, userid,role_id, message: `WelcomeAdmin ${username}` });
            }
            else {
                res.status(200).json({ tokenVal, role_url_uii, userid,role_id, message: `WelcomeTenant ${username}` });
            }
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'No User Found' });
    }

};
const AdminDashboard = (req, res) => {
    console.log("Admin Dashboard verification");
}
const UploadData = (req, res) => {
    console.log("Upload Data verification");
}
const Foreclosure = (req, res) => {
    console.log("Foreclosure verification");
}
const Dashboard = (req, res) => {
    console.log("Dashboard verification");
}
const Logout = async (req, res) => {
    const authToken = req.headers.authorization;
    const tokenDetails = req.user;
    try {
        const invd_id = 'ex_id';
        await db.query('INSERT INTO expired_tokens(id,token) VALUES (nextval($1),$2)', [invd_id, authToken]);
        await db.query('DELETE FROM accesstoken WHERE access_token = $1', [authToken]);

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'No User Found' });
    }
}


module.exports = {
    Login, Logout, AdminDashboard, verifyToken, UploadData, Foreclosure, Dashboard, checkURLAccess,Caching
};


