"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = express_1.default();
app.use(express_1.default.json()); //req.body // === bodyParser.json()
/**
|--------------------------------------------------
| Data
|--------------------------------------------------
*/
let userList = [];
const getUsernameList = () => {
    console.log('UPDATE DATA');
    axios_1.default
        .get('https://ex-digi-default-rtdb.firebaseio.com/userid.json')
        .then((res) => {
        userList = [];
        const data = Object.entries(res.data);
        console.log(data);
        for (let v of data) {
            userList.push({
                uid: v[0],
                data: v[1],
            });
        }
        console.log(userList);
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
    // Type annotaion ~ const body = req.body as LoginBody;
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing username or password',
        });
    }
    else {
        console.log(req.body);
        axios_1.default
            .post('https://ex-digi-default-rtdb.firebaseio.com/userid.json', req.body)
            .then((res) => getUsernameList()) // manually update userList for local callback
            .then(() => {
            res.status(200).json({
                message: 'ok',
            });
        });
    }
});
/* Login */
app.post('/api/v1/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({
            message: 'wrong username or password',
        });
    }
    else {
        console.log('LOGIN', req.body);
        console.log(userList.find((value) => value.data.username === req.body.username));
        const userData = userList.find((value) => value.data.username === req.body.username);
        if (userData) {
            res.status(200).json({
                message: 'ok',
                data: userData,
            });
        }
        else {
            res.status(400).json({
                message: 'username not found',
            });
        }
    }
});
const port = 3001;
app.listen(port, () => {
    console.log('hello');
});
