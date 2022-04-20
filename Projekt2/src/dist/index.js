"use strict";
exports.__esModule = true;
var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var fs = require("fs");
var User_1 = require("../Models/User");
var Storage_1 = require("../Storage/Storage");
var Repository_1 = require("../Repository");
var jsonConfig = JSON.parse(fs.readFileSync('../config.json', 'utf8'));
var FileDataStorage_1 = require("../Storage/FileDataStorage");
var DatabaseDataStorage_1 = require("../Storage/DatabaseDataStorage");
var app = express();
app.use(express.json());
mongoose.connect(jsonConfig.mongoConnectionString);
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
if (JSON.stringify(jsonConfig.readFromFile) === 'true') {
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
        var note = dataStorage.getNoteById(+req.params.id);
        if (note === undefined)
            res.status(404).send("Note does not exist");
        else
            res.status(200).send(note);
    }
    else
        res.status(401).send("Unauthorized user");
});
// Odczytanie listy publicznych notatek uźytkownika
app.get("/notes/user/:login", function (req, res) {
    var user = dataStorage.getUserByLogin(req.params.login);
    if (user === undefined)
        res.status(404).send("User does not exist");
    else {
        var notes = dataStorage.getPublicNotesByLogin(req.params.login);
        res.status(200).send(notes);
    }
});
// Udostepnienie notatki innemu uzytkownikowi
app.put("/note/share/:noteId/:login", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var note = dataStorage.getNoteById(+req.params.noteId);
        var user = dataStorage.getUserByLogin(req.params.login);
        if (note === undefined || user === undefined)
            res.status(404).send("Note or user does not exist");
        else {
            dataStorage.shareNote(+req.params.noteId, req.params.login);
            res.status(200).send("Note shared");
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// Wyswielenie notatek udostepnionych danemu uzytkownikowi
app.get("/notes/shared/:login", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var notes = dataStorage.getNotesSharedToUserByLogin(req.params.login);
        if (notes === undefined)
            res.status(404).send("User does not have any notes shared to them");
        else
            res.status(200).send(notes);
    }
    else
        res.status(401).send("Unauthorized user");
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
            dataStorage.deleteNoteById(+req.params.id);
            res.status(204).send("Note deleted");
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// CRUD TAGI:
// Dodanie nowego tagu:
app.post("/tag", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var tag = req.body;
        if (tag.name === undefined)
            res.status(400).send("Tag name is undefined");
        else if (storage.tags.find(function (t) { return t.name === req.body.name; }))
            res.status(400).send("This tag name has already exist");
        else {
            dataStorage.addTag(tag, registeredUser);
            res.status(201).send(tag);
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
            res.status(200).send(dataStorage.getTags(registeredUser));
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
        var newTag = req.body;
        if (newTag.name === undefined)
            res.status(400).send("Tag name is undefined");
        else if (dataStorage.getTagById(newTag.id) === undefined)
            res.status(400).send("This tag does not exist");
        else if (newTag.id === undefined)
            res.status(400).send("Tag id is undefined");
        else {
            var currentTag = dataStorage.editTagById(newTag.id, newTag);
            res.status(200).send(currentTag);
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
            dataStorage.deleteTagById(+req.params.id);
            res.status(204).send(tag);
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// CRUD UZYTKOWNICY:
// Dodanie nowego użytkownika
app.post("/user", function (req, res) {
    var user = req.body;
    if (user.login === undefined || user.password === undefined)
        res.status(400).send("login or password is undefined");
    else if (user.login === registeredUser.login)
        res.status(400).send("This login has already exist");
    else {
        dataStorage.addUser(user);
        res.status(201).send(user);
    }
});
// Wyświetlenie listy użytkowników
app.get("/users", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (!registeredUser.UserIsAuthorized(token, secret) || !registeredUser.isAdmin)
        res.status(401).send("Unauthorized user");
    try {
        res.status(200).send(dataStorage.getUsers());
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Wyświetlenie użytkownika o danym loginie
app.get("/user/:login", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    var user = dataStorage.getUserByLogin(req.params.login);
    if (user === undefined)
        res.status(404).send("User does not exist");
    else if (registeredUser.login != user.login || !registeredUser.isAdmin)
        res.status(401).send("Unauthorized user");
    else
        res.status(200).send(user);
});
// Edycja użytkownika o danym loginie
app.put("/user/:login", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    var user = dataStorage.getUserByLogin(req.params.login);
    if (user === undefined)
        res.status(404).send("User does not exist");
    else if (registeredUser.login != user.login || !registeredUser.isAdmin)
        res.status(401).send("Unauthorized user");
    else {
        var newUser = req.body;
        if (newUser.login === undefined || newUser.password === undefined)
            res.status(400).send("login or password is undefined");
        else {
            dataStorage.editUserByLogin(newUser.login, newUser);
            res.status(200).send(newUser);
        }
    }
});
// Usuniecie użytkownika o danym loginie
app["delete"]("/user/:login", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (!registeredUser.isAdmin)
        res.status(401).send("Unauthorized user");
    var user = dataStorage.getUserByLogin(req.params.login);
    if (user === undefined)
        res.status(404).send("User does not exist");
    else {
        dataStorage.deleteUserByLogin(req.params.login);
        res.status(204).send(user);
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
// Wylogowanie
app.post('/logout', function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        registeredUser.id = 0;
        registeredUser.login = "";
        registeredUser.password = "";
        res.status(200).send("Logout successful");
    }
    else
        res.status(401).send("Unauthorized user");
});
app.listen(3000);
