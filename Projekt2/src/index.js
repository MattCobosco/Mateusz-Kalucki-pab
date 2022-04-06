"use strict";
exports.__esModule = true;
var express = require("express");
var jwt = require("jsonwebtoken");
var User_1 = require("../Models/User");
var Repository_1 = require("../Repository");
var app = express();
app.use(express.json());
var router = express.Router();
app.use('/', router);
var repo = new Repository_1["default"]();
var registeredUser = new User_1["default"]();
var secret = 'aezakmi';
var storage;
repo.readStorage().then(function (data) {
    if (data)
        storage = JSON.parse(data);
    else
        storage = new Storage();
});
// CRUD NOTATKI:
// Dodanie nowej notatki
router.post('/note', function (req, res) {
    var _a;
    var token = req.headers.Authorization;
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var note = req.body;
        if (note.title === undefined || note.content === undefined)
            res.status(400).send('Note title or content is missing');
        else {
            console.log(note);
            if (note.tags != undefined) {
                note.tags.forEach(function (tag) {
                    var _a;
                    if (!storage.tags.find(function (t) { return t.name === tag.name; })) {
                        var newTag = {
                            id: Date.now(),
                            name: tag.name
                        };
                        storage.tags.push(newTag);
                        registeredUser.tagsCreatedIds.push((_a = newTag.id) !== null && _a !== void 0 ? _a : 0);
                    }
                });
            }
            note.id = Date.now();
            storage.notes.push(note);
            registeredUser.notesCreatedIds.push((_a = note.id) !== null && _a !== void 0 ? _a : 0);
            res.status(201).send(note);
            repo.updateStorage(JSON.stringify(storage));
        }
    }
    else
        res.status(401).send('Unauthorized user');
});
// Wyświetlenie listy notatek
router.get("/notes", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        try {
            res.status(200).send(storage.notes.filter(function (n) { var _a; return registeredUser.notesCreatedIds.includes((_a = n.id) !== null && _a !== void 0 ? _a : 0); }));
        }
        catch (error) {
            res.status(400).send(error);
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// Odczytanie notatki o danym id
router.get("/note/:id", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var note = storage.notes.find(function (n) { return n.id === +req.params.id && registeredUser.notesCreatedIds.includes(+req.params.id); });
        if (note === undefined)
            res.status(404).send("Note does not exist");
        else
            res.status(200).send(note);
    }
    else
        res.status(401).send("Unauthorized user");
});
// Odczytanie listy publicznych notatek uźytkownika
router.get("/notes/user/:userName", function (req, res) {
    var user = storage.users.find(function (u) { return u.name === req.params.userName; });
    if (user === undefined)
        res.status(404).send("User does not exist");
    else {
        var notes = storage.notes.filter(function (n) { var _a; return n.private === false && user.notesCreatedIds.includes((_a = n.id) !== null && _a !== void 0 ? _a : 0); });
        res.status(200).send(notes);
    }
});
// Edycja notatki o danym id
router.put("/note/:id", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var newNote_1 = req.body;
        if (newNote_1.title === undefined || newNote_1.content === undefined || newNote_1.id === undefined)
            res.status(400).send("Note title, content or id is missing");
        else {
            var currentNote = storage.notes.find(function (n) { return n.id === newNote_1.id; });
            if (currentNote === undefined)
                res.status(404).send("Note does not exist");
            else
                currentNote = newNote_1;
            res.status(201).send(newNote_1);
            repo.updateStorage(JSON.stringify(storage));
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// Usunięcie notatki o danym id
router["delete"]("/note/:id", function (req, res) {
    var _a;
    var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
    if (registeredUser.UserIsAuthorized(token, secret)) {
        var note = storage.notes.find(function (n) { return n.id === +req.params.id; });
        if (note === undefined)
            res.status(400).send("Note does not exist");
        else {
            storage.notes.splice(req.body.id, 1);
            registeredUser.notesCreatedIds.splice(req.body.id, 1);
            res.status(204).send(note);
            repo.updateStorage(JSON.stringify(storage));
        }
    }
    else
        res.status(401).send("Unauthorized user");
});
// CRUD TAGI:
// Dodanie nowego tagu:
router.post("/tag", function (req, res) {
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
router.get("/tags", function (req, res) {
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
router.get("/tag/:id", function (req, res) {
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
router.put("/tag/:id", function (req, res) {
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
router["delete"]("/tag/:id", function (req, res) {
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
router.post('/login', function (req, res) {
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
