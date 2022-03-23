"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.use(express.json());
var notes = [];
var tags = [];
// CRUD NOTATKI:
// Dodanie nowej notatki
app.post('/note', function (req, res) {
    var note = req.body;
    if (note.title === undefined || note.content === undefined) {
        res.status(400).send('Missing note title/content');
    }
    // TODO: Checking if any of the tags exists
    else {
        note.id = Date.now();
        notes.push(note);
        res.status(201).send(note.id);
    }
});
// Wyświetlenie listy notatek
app.get('/notes', function (req, res) {
    if (notes === undefined) {
        res.status(400).send('Could not get notes');
    }
    else {
        res.status(200).send(notes);
    }
});
// Odczytanie notatki o danym id
app.get('/note/:id', function (req, res) {
    var note = notes.find(function (i) { return i.id === req.body.id; });
    if (note === undefined) {
        res.status(404).send('Note of this id does not exist');
    }
    else {
        res.status(200).send(note);
    }
});
// Edycja notatki o danym id
app.put('/note/:id', function (req, res) {
    var newNote = req.body;
    if (newNote.title === undefined || newNote.content === undefined || newNote.id === undefined) {
        res.status(400).send('Missing note title/content/id');
    }
    // TODO: Checking if any of the tags exists
    else {
        var currentNote = notes.find(function (i) { return i.id === newNote.id; });
        for (var i = 0; i < currentNote.tags.length - 1; i++) {
            for (var j = 0; j < tags.length - 1; i++) {
                if (currentNote.tags[i] === tags[j]) {
                    break;
                }
                tags.push(currentNote.tags[i]);
            }
        }
        if (currentNote === undefined) {
            res.status(404).send('Note of this id does not exist');
        }
        else {
            currentNote = newNote;
            res.status(200).send(currentNote);
        }
    }
});
// Usunięcie notatki o danym id
app["delete"]('/note/:id', function (req, res) {
    var note = notes.find(function (i) { return i.id == req.body.id; });
    if (note === undefined) {
        res.status(400).send('Note of this id does not exist');
    }
    else {
        notes.splice(req.body.id, 1);
        res.status(204).send('The requested note has been deleted');
    }
});
// CRUD TAGI:
// Dodanie nowego tagu:
app.post('/tag', function (req, res) {
    var tag = req.body;
    if (tag.name === undefined) {
        res.status(400).send('Missing tag name');
    }
    else if (!contains(tags, tag.name.toLowerCase())) {
        tag.id = tags.length - 1;
        tag.name = tag.name.toLowerCase();
        tags.push(tag);
        res.status(200).send(tag.id);
    }
});
// Wyświetlenie listy tagów
app.get('/tags', function (req, res) {
    if (tags === undefined) {
        res.status(400).send('Could not get tags');
    }
    else {
        res.status(200).send(tags);
    }
});
//Usuniecie tagu z listy
app["delete"]('tag/:id', function (req, res) {
    var tag = tags.find(function (i) { return i.id == req.body.id; });
    if (tag === undefined) {
        res.status(400).send('The tag of this id does not exist');
    }
    else {
        res.status(204).send('The requested tag has been deleted');
    }
});
function contains(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === obj) {
            return true;
        }
        else {
            return false;
        }
    }
}
app.listen(3000);
