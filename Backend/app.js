"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = express_1.default();
app.use(express_1.default.json()); //req.body // === bodyParser.json()
/* CORS Handler */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type,Accep,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});
/**
|--------------------------------------------------
| Data
|--------------------------------------------------
*/
let userList = []; // local data for speed up some valitdate
const getUsernameList = () => {
    axios_1.default
        .get('https://ex-digi-default-rtdb.firebaseio.com/userid.json')
        .then((res) => {
        userList = [];
        const data = Object.entries(res.data);
        for (let v of data) {
            userList.push({
                uid: v[0],
                data: v[1],
            });
        }
        // console.log(userList);
    });
};
getUsernameList();
/**
|--------------------------------------------------
| API
|--------------------------------------------------
*/
/* Register */
app.post('/api/v1/register', (req, res) => {
    const isUserExist = userList.find((value) => value.data.username === req.body.username);
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Missing username or password',
        });
    }
    else if (isUserExist) {
        res.status(409).json({
            message: 'username is already exists',
        });
    }
    else if (!isUserExist) {
        try {
            axios_1.default
                .post('https://ex-digi-default-rtdb.firebaseio.com/userid.json', req.body)
                .then((res) => getUsernameList()) // manually update userList for local usecase
                .then(() => {
                return res.status(200).json({
                    message: 'ok',
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
});
/* Login */
app.post('/api/v1/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({
            message: 'Invalid value',
        });
    }
    else {
        try {
            const userData = userList.find((value) => value.data.username === req.body.username);
            const isPassword = userData?.data.password.toString() === req.body.password.toString();
            if (userData && isPassword) {
                res.status(200).json({
                    message: 'OK',
                    data: {
                        uid: userData.uid,
                        username: userData.data.username,
                        name: userData.data.name,
                    },
                });
            }
            else {
                res.status(401).json({
                    message: 'Invalid username or password',
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
});
/* Update profile */
app.patch('/api/v1/updateprofile', (req, res) => {
    const isUid = userList.findIndex((value) => value.uid === req.body.uid); // if uid not exist
    if (!req.body.uid || !req.body.name || isUid === -1) {
        res.status(400).json({
            message: 'invalid value',
        });
    }
    else {
        try {
            axios_1.default
                .patch(`https://ex-digi-default-rtdb.firebaseio.com/userid/${req.body.uid}.json`, {
                name: req.body.name,
            })
                .then((res) => getUsernameList())
                .then(() => {
                res.status(200).json({
                    message: 'OK',
                    data: { name: req.body.name },
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
});
/**
|--------------------------------------------------
| SERVER
|--------------------------------------------------
*/
const port = 3003;
app.listen(port, () => {
    console.log('online');
});
