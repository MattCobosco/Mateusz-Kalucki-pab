"use strict";
exports.__esModule = true;
var express = require("express");
var jwt = require("jsonwebtoken");
var User_1 = require("../Models/User");
var Storage_1 = require("../Storage/Storage");
var Repository_1 = require("../Repository");
var config_json_1 = require("../config.json");
var FileDataStorage_1 = require("../Storage/FileDataStorage");
var DatabaseDataStorage_1 = require("../Storage/DatabaseDataStorage");
var app = express();
app.use(express.json());
var repo = new Repository_1["default"]();
var registeredUser = new User_1["default"]();
var secret = 'aezakmi';
var dataStorage;
var storage;
repo.readStorage().then(function (data) {
    if (data)
        storage = JSON.parse(data);
    else
        storage = new Storage_1["default"]();
});
// Wybiera dataStorage na podstawie boolean z pliku config.json
if (JSON.stringify(config_json_1["default"].readFromFile) === 'true') {
    dataStorage = new FileDataStorage_1["default"]();
}
else {
    dataStorage = new DatabaseDataStorage_1["default"]();
}
// CRUD NOTATKI:
// Dodanie nowej notatki
app.post('/note', function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var note = req.body;
        if (note.title === undefined || note.content === undefined)
            res.status(400).send('Note title or content is missing');
        else {
            dataStorage.addNote(note, registeredUser);
            res.status(201).send(note);
        }
    }
    else
        res.status(401).send('Unauthorized user');
});
// Wyświetlenie listy notatek
app.get("/notes", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        try {
            res.status(200).send(dataStorage.getNotes(registeredUser));
        }
        catch (error) {
            res.status(400).send(error);
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// Odczytanie notatki o danym id
app.get("/note/:id", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var note = dataStorage.getNoteById(req.params.id);
        if (note === undefined)
            res.status(404).send("Note does not exist");
        else
            res.status(200).send(note);
    }
    else
        res.status(401).send("Unauthorized user");
});
// Odczytanie listy publicznych notatek uźytkownika
app.get("/notes/user/:userName", function (req, res) {
    var user = dataStorage.getUserByUsername(req.params.userName);
    if (user === undefined)
        res.status(404).send("User does not exist");
    else {
        var notes = dataStorage.getPublicNotesByUsername(req.params.userName);
        res.status(200).send(notes);
    }
});
// Edycja notatki o danym id
app.put("/note/:id", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var newNote = req.body;
        if (newNote.title === undefined || newNote.content === undefined || newNote.id === undefined)
            res.status(400).send("Note title, content or id is missing");
        else if (dataStorage.getNoteById(newNote.id) === undefined)
            res.status(404).send("Note does not exist");
        else {
            var currentNote = dataStorage.editNoteById(newNote.id, newNote);
            res.status(200).send(currentNote);
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// Usunięcie notatki o danym id
app["delete"]("/note/:id", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var note = storage.notes.find(function (n) { return n.id === +req.params.id; });
        if (note === undefined)
            res.status(400).send("Note does not exist");
        else {
            dataStorage.deleteNoteById(req.params.id);
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// CRUD TAGI:
// Dodanie nowego tagu:
app.post("/tag", function (req, res) {
    var _a, _b;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var tag = req.body;
        if (tag.name === undefined)
            res.status(400).send("Tag name is undefined");
        else if (storage.tags.find(function (t) { return t.name === req.body.name; }))
            res.status(400).send("This tag name has already exist");
        else {
            tag.id = Date.now();
            storage.tags.push(tag);
            registeredUser.tagsCreatedIds.push((_b = tag.id) !== null && _b !== void 0 ? _b : 0);
            res.status(201).send(tag);
            repo.updateStorage(JSON.stringify(storage));
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// Wyświetlenie listy tagów
app.get("/tags", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        try {
            res.status(200).send(storage.tags.filter(function (t) { var _a; return registeredUser.tagsCreatedIds.includes((_a = t.id) !== null && _a !== void 0 ? _a : 0); }));
        }
        catch (error) {
            res.status(400).send(error);
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// Wyświetlenie tagu o danym id
app.get("/tag/:id", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var tag = storage.tags.find(function (t) { return t.id === +req.params.id && registeredUser.tagsCreatedIds.includes(+req.params.id); });
        if (tag === undefined)
            res.status(404).send("Tag does not exist");
        else
            res.status(200).send(tag);
    }
    else
        res.status(401).send("Unauthorized user");
});
// Edycja tagu o danym id
app.put("/tag/:id", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var newTag_1 = req.body;
        if (newTag_1.name === undefined)
            res.status(400).send("Tag name is undefined");
        else if (storage.tags.find(function (t) { return t.name === req.body.name; }))
            res.status(400).send("This tag name has already exist");
        else if (newTag_1.id === undefined)
            res.status(400).send("Tag id is undefined");
        else {
            var currentTag = storage.tags.find(function (a) { return a.id === newTag_1.id; });
            if (currentTag === undefined)
                res.status(404).send("Tag does not exist");
            else
                currentTag = newTag_1;
            res.status(201).send(newTag_1);
            repo.updateStorage(JSON.stringify(storage));
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// Usuniecie tagu z listy
app["delete"]("/tag/:id", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var tag = storage.tags.find(function (a) { return a.id === +req.params.id; });
        if (tag === undefined)
            res.status(400).send("Tag does not exist");
        else {
            storage.tags.splice(req.body.id, 1);
            registeredUser.tagsCreatedIds.splice(req.body.id, 1);
            res.status(204).send(tag);
            repo.updateStorage(JSON.stringify(storage));
        }
    }
});
// Logowanie za pomocą jsonwebtoken
app.post('/login', function (req, res) {
    var user = req.body;
    if (!user.login || !user.password)
        res.status(401).send('Login or password is missing');
    user.id = Date.now();
    var payload = user.id.toString();
    registeredUser.id = user.id;
    registeredUser.login = user.login;
    registeredUser.password = user.password;
    var token = jwt.sign(payload, secret);
    res.status(200).send(token);
    storage.users.push(user);
    repo.updateStorage(JSON.stringify(storage));
});
app.listen(3000);
