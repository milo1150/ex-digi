import express, { Request, Response } from 'express';
import { LoginBody, UserData2 } from './Type';
import axios from 'axios';

const app = express();
app.use(express.json()); //req.body // === bodyParser.json()

/**
|--------------------------------------------------
| Data
|--------------------------------------------------
*/
let userList: UserData2[] = [];
const getUsernameList = () => {
  console.log('UPDATE DATA');
  axios
    .get('https://ex-digi-default-rtdb.firebaseio.com/userid.json')
    .then((res) => {
      userList = [];
      const data = Object.entries(res.data) as [string, any];
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
app.post(
  '/api/v1/register',
  (req: Request<{}, {}, LoginBody>, res: Response) => {
    // Type annotaion ~ const body = req.body as LoginBody;
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing username or password',
      });
    } else {
      console.log(req.body);
      axios
        .post(
          'https://ex-digi-default-rtdb.firebaseio.com/userid.json',
          req.body
        )
        .then((res) => getUsernameList()) // manually update userList for local callback
        .then(() => {
          res.status(200).json({
            message: 'ok',
          });
        });
    }
  }
);

/* Login */
app.post('/api/v1/login', (req: Request<{}, {}, LoginBody>, res: Response) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: 'wrong username or password',
    });
  } else {
    console.log('LOGIN', req.body);
    console.log(
      userList.find((value) => value.data.username === req.body.username)
    );
    const userData = userList.find(
      (value) => value.data.username === req.body.username
    );
    if (userData) {
      res.status(200).json({
        message: 'ok',
        data: userData,
      });
    } else {
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
