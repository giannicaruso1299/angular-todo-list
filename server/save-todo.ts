import {Request, Response} from 'express';
const fs = require('fs');

export function saveTodo(req: Request, res: Response) {
  let newTodo = req.body;
  let rawdata = fs.readFileSync('./src/assets/todos.json');
  let todos = JSON.parse(rawdata);
  todos.push(newTodo);
  let json = JSON.stringify(todos);
  console.log(newTodo);
  fs.writeFileSync('./src/assets/todos.json', json);
  res.status(200).json(`Utente correttamente creato: ${newTodo}`);
}
