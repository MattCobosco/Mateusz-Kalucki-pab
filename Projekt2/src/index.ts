import express = require ('express');
import jwt = require ('jsonwebtoken');
import * as fs from 'fs';

import {Request, Response} from 'express';
import Note from '../Models/Note';
import Tag from '../Models/Tag';
import User from '../Models/User';
import Storage from '../Storage/Storage';
import Repository from '../Repository';
var jsonConfig =JSON.parse(fs.readFileSync('../config.json', 'utf8'));
import FileDataStorage from '../Storage/FileDataStorage';
import DatabaseDataStorage from '../Storage/DatabaseDataStorage';

const app = express();
app.use(express.json());


const repo : Repository = new Repository();
let registeredUser : User = new User();
const secret : string = 'aezakmi';

let storage : Storage;

repo.readStorage().then(data => 
{
  if(data)
    storage = JSON.parse(data);
  else 
    storage = new Storage();
});

let dataStorage: DatabaseDataStorage | FileDataStorage;

// Wybiera dataStorage na podstawie boolean z pliku config.json
if(JSON.stringify(jsonConfig.readFromFile) === 'true')
{
  dataStorage = new FileDataStorage();
}
else
{
  dataStorage = new DatabaseDataStorage();
}

dataStorage.populateDatabase().then(() =>
{
  console.log('Database populated');
});

// CRUD NOTATKI:
// Dodanie nowej notatki
app.post('/note', function(req : Request, res : Response)
{
  const token = req.headers.authorization ?? '';
  if (registeredUser.UserIsAuthorized(token, secret))
  {
    const note : Note = req.body;
    if (note.title === undefined || note.content === undefined)
      res.status(400).send('Note title or content is missing');
    else
    {
      dataStorage.addNote(note, registeredUser);
      res.status(201).send(note);
    }
  }
  else 
      res.status(401).send('Unauthorized user');
});

// Wyświetlenie listy notatek
app.get("/notes", function (req: Request, res: Response) 
{
  const token = req.headers.authorization ?? '';
  if (registeredUser.UserIsAuthorized(token, secret)) 
  {
    try 
    {
      res.status(200).send(dataStorage.getNotes(registeredUser));
    } 
    catch (error) 
    {
      res.status(400).send(error);
    }
  } 
  else
    res.status(401).send("Unauthorized user");
});

// Odczytanie notatki o danym id
app.get("/note/:id", function (req: Request, res: Response) 
{
  const token = req.headers.authorization ?? '';
  if (registeredUser.UserIsAuthorized(token, secret)) 
  {
    const note = dataStorage.getNoteById(+req.params.id);
    if (note === undefined) 
      res.status(404).send("Note does not exist");
    else
      res.status(200).send(note);
  } 
  else 
    res.status(401).send("Unauthorized user");
});

// Odczytanie listy publicznych notatek uźytkownika
app.get("/notes/user/:login", function (req: Request, res: Response)
{
  const user = dataStorage.getUserByLogin(req.params.login);
  if (user === undefined)
    res.status(404).send("User does not exist");
  else
  {
    const notes = dataStorage.getPublicNotesByLogin(req.params.login);
    res.status(200).send(notes);
  }
});

// Udostepnienie notatki innemu uzytkownikowi
app.put("/note/share/:noteId/:login", function (req: Request, res: Response)
{
  const token = req.headers.authorization ?? '';
  if (registeredUser.UserIsAuthorized(token, secret)) 
  {
    const note = dataStorage.getNoteById(+req.params.noteId);
    const user = dataStorage.getUserByLogin(req.params.login);
    if (note === undefined || user === undefined)
      res.status(404).send("Note or user does not exist");
    else
    {
      dataStorage.shareNote(+req.params.noteId, req.params.login);
      res.status(200).send("Note shared");
    }
  } 
  else 
    res.status(401).send("Unauthorized user");
});

// Wyswielenie notatek udostepnionych danemu uzytkownikowi
app.get("/notes/shared/:login", function (req: Request, res: Response)
{
  const token = req.headers.authorization ?? '';
  if (registeredUser.UserIsAuthorized(token, secret)) 
  {
    const notes = dataStorage.getNotesSharedToUserByLogin(req.params.login);
    if (notes === undefined)
      res.status(404).send("User does not have any notes shared to them");
    else
      res.status(200).send(notes);
  } 
  else 
    res.status(401).send("Unauthorized user");
});

// Edycja notatki o danym id
app.put("/note/:id", function (req: Request, res: Response) 
{
  const token = req.headers.authorization ?? '';
  if (registeredUser.UserIsAuthorized(token, secret)) 
  {
    const newNote: Note = req.body;
    if (newNote.title === undefined || newNote.content === undefined || newNote.id === undefined) 
      res.status(400).send("Note title, content or id is missing");
    else if(dataStorage.getNoteById(newNote.id) === undefined)
      res.status(404).send("Note does not exist");
    else 
    {
      let currentNote = dataStorage.editNoteById(newNote.id, newNote);
      res.status(200).send(currentNote);
    }
  } 
  else
    res.status(401).send("Unauthorized user");
});

// Usunięcie notatki o danym id
app.delete("/note/:id", function (req: Request, res: Response) {
  const token = req.headers.authorization ?? ''
  if(registeredUser.UserIsAuthorized(token, secret)) {
    const note = storage.notes.find(n => n.id === +req.params.id);
    if (note === undefined)
      res.status(400).send("Note does not exist");
    else 
    {
      dataStorage.deleteNoteById(+req.params.id);
      res.status(204).send("Note deleted");
    }
  } 
  else 
    res.status(401).send("Unauthorized user");
});




// CRUD TAGI:
// Dodanie nowego tagu:
app.post("/tag", function (req: Request, res: Response) 
{
  const token = req.headers.authorization ?? '';
  if(registeredUser.UserIsAuthorized(token, secret)) 
  {
    const tag: Tag = req.body;
    if (tag.name === undefined)
      res.status(400).send("Tag name is undefined");
    else if (storage.tags.find((t: { name: any; }) => t.name === req.body.name))
      res.status(400).send("This tag name has already exist"); 
    else 
    {
      dataStorage.addTag(tag, registeredUser);
      res.status(201).send(tag);
    }
  } 
  else 
    res.status(401).send("Unauthorized user");
});

// Wyświetlenie listy tagów
app.get("/tags", function (req: Request, res: Response) 
{
  const token = req.headers.authorization ?? '';
  if(registeredUser.UserIsAuthorized(token, secret)) 
  {
    try 
    {
      res.status(200).send(dataStorage.getTags(registeredUser));
    } 
    catch (error) 
    {
      res.status(400).send(error);
    }
  } 
  else 
    res.status(401).send("Unauthorized user");
});

// Wyświetlenie tagu o danym id
app.get("/tag/:id", function (req: Request, res: Response) 
{
  const token = req.headers.authorization ?? '';
  if(registeredUser.UserIsAuthorized(token, secret))
  {
    const tag = storage.tags.find(t => t.id === +req.params.id && registeredUser.tagsCreatedIds.includes(+req.params.id));
    if (tag === undefined) 
      res.status(404).send("Tag does not exist");
    else 
      res.status(200).send(tag);
  } 
  else
    res.status(401).send("Unauthorized user");
});

// Edycja tagu o danym id
app.put("/tag/:id", function (req: Request, res: Response) 
{
  const token = req.headers.authorization ?? '';
  if(registeredUser.UserIsAuthorized(token, secret)) 
  {
    const newTag: Tag = req.body;
    if (newTag.name === undefined || newTag.id === undefined)
      res.status(400).send("Tag name or id is missing");
    else if (dataStorage.getTagById(newTag.id) === undefined)
      res.status(400).send("This tag does not exist");
    else if (newTag.id === undefined) 
      res.status(400).send("Tag id is undefined");
    else 
    {
      let currentTag = dataStorage.editTagById(newTag.id, newTag);
      res.status(200).send(currentTag);
    }
  } 
  else
    res.status(401).send("Unauthorized user");
});

// Usuniecie tagu z listy
app.delete("/tag/:id", function (req: Request, res: Response)
{
  const token = req.headers.authorization ?? '';
  if(registeredUser.UserIsAuthorized(token, secret)) 
  {
    const tag = storage.tags.find(a => a.id === +req.params.id);
    if (tag === undefined)
      res.status(400).send("Tag does not exist"); 
    else 
    {
      dataStorage.deleteTagById(+req.params.id);
      res.status(204).send(tag);
    }
  }
  else
   res.status(401).send("Unauthorized user");
});

// CRUD UZYTKOWNICY:
// Dodanie nowego użytkownika
app.post("/user", function (req: Request, res: Response)
{
  const user = req.body;
  if (user.login === undefined || user.password === undefined)
    res.status(400).send("login or password is undefined");
  else if (user.login === registeredUser.login)
    res.status(400).send("This login has already exist");
  else
  {
    dataStorage.addUser(user);
    res.status(201).send(user);
  }
});

// Wyświetlenie listy użytkowników
app.get("/users", function (req: Request, res: Response)
{
  const token = req.headers.authorization ?? '';
  if(!registeredUser.UserIsAuthorized(token, secret) || !registeredUser.isAdmin)
    res.status(401).send("Unauthorized user");

  try 
  {
    res.status(200).send(dataStorage.getUsers());
  } 
  catch (error) 
  {
    res.status(400).send(error);
  }
});

// Wyświetlenie użytkownika o danym loginie
app.get("/user/:login", function (req: Request, res: Response)
{
  const token = req.headers.authorization ?? '';
  const user = dataStorage.getUserByLogin(req.params.login);
  if (user === undefined)
    res.status(404).send("User does not exist");
  else if(registeredUser.login != user.login || !registeredUser.isAdmin)
    res.status(401).send("Unauthorized user");
  else
    res.status(200).send(user);
});

// Edycja użytkownika o danym loginie
app.put("/user/:login", function (req: Request, res: Response)
{
  const token = req.headers.authorization ?? '';
  const user = dataStorage.getUserByLogin(req.params.login);
  if (user === undefined)
    res.status(404).send("User does not exist");
  else if(registeredUser.login != user.login || !registeredUser.isAdmin)
    res.status(401).send("Unauthorized user");
  else
  {
    const newUser: User = req.body;
    if (newUser.login === undefined || newUser.password === undefined)
      res.status(400).send("login or password is undefined");
    else
    {
      dataStorage.editUserByLogin(newUser.login, newUser);
      res.status(200).send(newUser);
    }
  }
});

// Usuniecie użytkownika o danym loginie
app.delete("/user/:login", function (req: Request, res: Response)
{
  const token = req.headers.authorization ?? '';
  if (!registeredUser.isAdmin)
    res.status(401).send("Unauthorized user");
  const user = dataStorage.getUserByLogin(req.params.login);
  if (user === undefined)
    res.status(404).send("User does not exist");
  else
  {
    dataStorage.deleteUserByLogin(req.params.login);
    res.status(204).send(user);
  }
});

// Logowanie za pomocą jsonwebtoken
app.post('/login', function(req : Request, res : Response)
{
   const user : User = req.body;
   if(!user.login || !user.password)
    res.status(401).send('Login or password is missing');
  user.id = Date.now();
  const payload = user.id.toString();
  registeredUser.id = user.id;
  registeredUser.login = user.login;
  registeredUser.password = user.password;
  const token = jwt.sign(payload, secret);
  res.status(200).send(token);
  storage.users.push(user);
  repo.updateStorage(JSON.stringify(storage));
});

// Wylogowanie
app.post('/logout', function(req : Request, res : Response)
{
  const token = req.headers.authorization ?? '';
  if(registeredUser.UserIsAuthorized(token, secret))
  {
    registeredUser.id = 0;
    registeredUser.login = "";
    registeredUser.password = "";
    res.status(200).send("Logout successful");
  }
  else
    res.status(401).send("Unauthorized user");
});

app.listen(3000);