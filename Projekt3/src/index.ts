import express = require ('express');
import {Request, Response} from 'express';
import Note from '../note';
import Tag from '../tag';

const app = express();
app.use(express.json());

const notes : Note[] = [];
const tags : Tag[] = [];

// CRUD NOTATKI:
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
      note.tags.forEach(tag => {
        if(!tags.find(i=>i.name === tag.name))
        {
          tags.push(tag);
        }
      });
    }
    note.id=Date.now();
    notes.push(note);
    res.status(201).send(note.id);
})

// Wyświetlenie listy notatek
app.get('/notes', function(req : Request, res : Response)
{
  if(notes === undefined)
  {
    res.status(400).send('Could not get notes');
  }
  else 
  {
    res.status(200).send(notes);
  }
})

// Odczytanie notatki o danym id
app.get('/note/:id', function(req : Request, res : Response)
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
      currentNote.tags.forEach(tag => {
        if(!tags.find(i=>i.name === tag.name))
        {
          tags.push(tag);
        }
      });
      res.status(200).send(currentNote);
    }
  }
})

// Usunięcie notatki o danym id
app.delete('/note/:id', function(req : Request, res : Response)
{
  const note: Note = notes.find(i=>i.id === +req.params.id);
  if(note === undefined)
  {
    res.status(400).send('Note of this id does not exist');
  }
  else
  {
    notes.splice(req.body.id, 1);
    res.status(204).send('The requested note has been deleted');
  }
})

// CRUD TAGI:
// Dodanie nowego tagu:
app.post('/tag', function(req : Request, res : Response)
{
  const tag : Tag = req.body;

  if(tag.name === undefined)
  {
    res.status(400).send('Missing tag name');
  }
  else if(tags.find(t=>t.name === tag.name))
  {
    res.status(400).send('Tag already exists');
  }
  else
  {
    tag.id = Date.now();
    tag.name = tag.name.toLowerCase();
    tags.push(tag);
    res.status(200).send(tag);
  }
})

// Wyświetlenie listy tagów
app.get('/tags', function(req : Request, res : Response)
{
  if(tags === undefined)
  {
    res.status(400).send('Could not get tags')
  }
  else
  {
    res.status(200).send(tags);
  }
})

// Wyświetlenie tagu o danym id
app.get('/tag/:id', function(req : Request, res : Response)
{
  const tag = tags.find(i=>i.id === req.body.id);
  if(tag === undefined)
  {
    res.status(404).send('Tag of this id does not exist');
  }
  else
  {
    res.status(200).send(tag);
  }
})

// Edycja tagu o danym id
app.put('/tag/:id', function(req : Request, res : Response)
{
  const newTag : Tag = req.body;
  if(newTag.name === undefined || newTag.id === undefined)
  {
    res.status(400).send('Missing tag name/id');
  }
  else
  {
    let currentTag : Tag = tags.find(i=>i.id === newTag.id);
    if(currentTag === undefined)
    {
      res.status(404).send('Tag of this id does not exist');
    }
    else
    {
      currentTag = newTag;
      res.status(200).send(currentTag);
    }
  }
})

//Usuniecie tagu z listy
app.delete('tag/:id', function(req : Request, res : Response)
{
  const tag : Tag = tags.find(i=>i.id == +req.params.id);
  if(tag === undefined)
  {
    res.status(400).send('The tag of this id does not exist');
  }
  else
  {
    tags.splice(req.params.id, 1);
    res.status(204).send('The requested tag has been deleted');
  }
})

app.listen(3000)