import express = require ('express');
import {Request, Response} from 'express';
import Note from '../note';

const app = express();
app.use(express.json());

const notes : Note[] = [];

// Dodanie nowej notatki
app.post('/note', function(req : Request, res : Response)
{
    const note : Note = req.body;
    if(note.title === undefined || note.content === undefined)
    {
        res.status(400).send('Missing note title/content')
    }
    else
    {
        note.id=Date.now();
        notes.push(note);
        res.status(201).send(note.id);
    }
})

// Odczytanie notatki o danym id
app.get('/note/:id', function(req : Request,res : Response)
{
  const note = notes.find(i=>i.id === req.body.id);
  if(note===undefined)
  {
    res.status(404).send('Note of this id does not exist');
  }
  else
  {
    res.status(200).send(note)
  }
})

// Edycja notatki o danym id
app.put('/note/:id', function(req: Request, res: Response)
{
  const newNote: Note = req.body;
  if(newNote.title === undefined || newNote.content === undefined || newNote.id === undefined)
  {
    res.status(400).send('Missing note title/content/id');
  } 
  else
  {
    let currentNote: Note = notes.find(i=>i.id === newNote.id)
    if(currentNote === undefined)
    {
      res.status(404).send('Note of this id does not exist');
    }
    else
    {
      currentNote = newNote;
      res.status(200).send(currentNote);
    }
  }
})

//TODO: getting id from url
// Usunięcie notatki o danym id
app.delete('/note/:id', function(req : Request, res : Response)
{
  const note: Note = notes.find(i=>i.id == req.body.id);
  if(note === undefined)
  {
    res.status(400).send('Note of this id does not exist');
  }
  else
  {
    notes.splice(req.body.id, 1);
    res.status(204).send('The requested note has been deleted')
  }
})

app.listen(3000)