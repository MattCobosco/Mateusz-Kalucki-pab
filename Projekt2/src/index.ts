import express = require ('express');
import jwt = require ('jsonwebtoken');
import {Request, Response} from 'express';
import Note from '../Models/Note';
import Tag from '../Models/Tag';
import User from '../Models/User';
import Storage from '../Storage/Storage';
import IDataStorage from '../Storage/IDataStorage';
import Repository from '../Repository';
import jsonConfig from '../config.json';
import FileDataStorage from '../Storage/FileDataStorage';
import DatabaseDataStorage from '../Storage/DatabaseDataStorage';

const app = express();
app.use(express.json());

const repo : Repository = new Repository();
let registeredUser : User = new User();
const secret : string = 'aezakmi';

let dataStorage: IDataStorage;
let storage : Storage;

repo.readStorage().then(data => 
{
  if(data)
    storage = JSON.parse(data);
  else 
    storage = new Storage();
});

// Wybiera dataStorage na podstawie boolean z pliku config.json
if(JSON.stringify(jsonConfig.readFromFile) === 'true')
{
  dataStorage = new FileDataStorage();
}
else
{
  dataStorage = new DatabaseDataStorage();
}

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
    const note = dataStorage.getNoteById(req.params.id);
    if (note === undefined) 
      res.status(404).send("Note does not exist");
    else
      res.status(200).send(note);
  } 
  else 
    res.status(401).send("Unauthorized user");
});

// Odczytanie listy publicznych notatek uźytkownika
app.get("/notes/user/:userName", function (req: Request, res: Response)
{
  const user = dataStorage.getUserByUsername(req.params.userName);
  if (user === undefined)
    res.status(404).send("User does not exist");
  else
  {
    const notes = dataStorage.getPublicNotesByUsername(req.params.userName);
    res.status(200).send(notes);
  }
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
      dataStorage.deleteNoteById(req.params.id);
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
      tag.id = Date.now();
      storage.tags.push(tag);
      registeredUser.tagsCreatedIds.push(tag.id ?? 0)
      res.status(201).send(tag);
      repo.updateStorage(JSON.stringify(storage));
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
      res.status(200).send(storage.tags.filter(t => registeredUser.tagsCreatedIds.includes(t.id ?? 0)));
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
    if (newTag.name === undefined)
      res.status(400).send("Tag name is undefined");
    else if (storage.tags.find((t: { name: any; }) => t.name === req.body.name))
      res.status(400).send("This tag name has already exist");
    else if (newTag.id === undefined) 
      res.status(400).send("Tag id is undefined");
    else 
    {
      let currentTag = storage.tags.find(a => a.id === newTag.id);
      if (currentTag === undefined)
        res.status(404).send("Tag does not exist");
      else 
        currentTag = newTag;
      res.status(201).send(newTag);
      repo.updateStorage(JSON.stringify(storage));
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
      storage.tags.splice(req.body.id, 1);
      registeredUser.tagsCreatedIds.splice(req.body.id, 1)
      res.status(204).send(tag);
      repo.updateStorage(JSON.stringify(storage));
    }
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

app.listen(3000);