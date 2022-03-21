"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.use(express.json());
var notes = [];
// Dodanie nowej notatki
app.post('/note', function (req, res) {
    var note = req.body;
    if (note.title === undefined || note.content === undefined) {
        res.status(400).send('Missing note title/content');
    }
    else {
        note.id = Date.now();
        notes.push(note);
        res.status(201).send(note.id);
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
    else {
        var currentNote = notes.find(function (i) { return i.id === newNote.id; });
        if (currentNote === undefined) {
            res.status(404).send('Note of this id does not exist');
        }
        else {
            currentNote = newNote;
            res.status(200).send(currentNote);
        }
    }
});
//TODO: getting id from url
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
app.listen(3000);
