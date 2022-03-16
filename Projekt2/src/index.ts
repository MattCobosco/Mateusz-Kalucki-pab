import express from 'express'
import {Request, Response} from 'express'
import Note from 'note'

const app = express()

app.use(express.json())

app.get('/', function (req: Request, res: Response) {
  res.send('GET Hello World')
})
app.post('/', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title 
  res.sendStatus(200).send('POST Hello World')
})

let notes : Note[] = [];
let currentId = 1;

// Dodanie nowej notatki
app.post('/note', function(req, res){
    let newNoteTitle = req.body.title;
    let newNoteContent = req.body.content;
    let newNoteCreateDate = req.body.createDate;
    let newNoteTags = req.body.tags;
    let newNoteId = currentId;

    if(newNoteTitle === null || newNoteContent === null)
    {
        res.status(400).send('Missing note title/content')
    }
    else
    {
        let newNote : Note = {
            title : newNoteTitle,
            content : newNoteContent,
            createDate : newNoteCreateDate,
            tags : newNoteTags,
            id : newNoteId
        }

        notes.push(newNote)
        res.status(201).send('New note added with ID:' + newNoteId)
        currentId++
    }
})
// TODO: getting id from url
// Odczytanie notatki o danym id
app.get('/note/:id', function(req,res){
    const id = +req.query.id;
    const jsonNote = notes.find(i=>i.id ===id)
    const note = JSON.parse(jsonNote) 
    res.status(200).send(note)
})

// TODO:
app.put()

//TODO: getting id from url
// Usunięcie notatki o danym id
app.delete('/note/:id', function(req, res){
  try {  
    const id = +req.query.id
    const removeIndex = notes.findIndex(i=>i.id ===id)
    notes.splice(removeIndex,1)
    res.status(200).send(`Notatka od id ${id} została usunięta pomyślnie`)
    } catch (error) {
      res.status(400).send(error)
    }
})

app.listen(3000)