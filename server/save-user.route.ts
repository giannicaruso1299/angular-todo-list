import {Request, Response} from 'express';
const fs = require('fs');

export function saveUser(req: Request, res: Response) {
  let newUser = req.body;
  let rawdata = fs.readFileSync('./src/assets/users.json');
  let users = JSON.parse(rawdata);
  users.push(newUser);
  let json = JSON.stringify(users);
  console.log(newUser);
  fs.writeFileSync('./src/assets/users.json', json);
  res.status(200).json(`Utente correttamente creato: ${newUser}`);
}
