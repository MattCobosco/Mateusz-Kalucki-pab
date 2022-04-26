"use strict";
exports.__esModule = true;
var Storage_1 = require("./Storage");
var Repository_1 = require("../Repository");
var repo = new Repository_1["default"]();
var storage;
repo.readStorage().then(function (data) {
    if (data)
        storage = JSON.parse(data);
    else
        storage = new Storage_1["default"]();
});
var FileDataStorage = /** @class */ (function () {
    function FileDataStorage() {
    }
    FileDataStorage.prototype.populateDatabase = function () {
        return new Promise(function (resolve, reject) {
            repo.readStorage().then(function (data) {
                if (data)
                    storage = JSON.parse(data);
                else
                    storage = new Storage_1["default"]();
                resolve();
            });
        });
    };
    // CRUD dla notatek
    FileDataStorage.prototype.addNote = function (note, user) {
        var _this = this;
        var _a;
        console.log(note);
        if (note.tags != undefined) {
            note.tags.forEach(function (tag) {
                if (!storage.tags.find(function (t) { return t.name === tag.name; })) {
                    var newTag = {
                        id: Date.now(),
                        name: tag.name
                    };
                    _this.addTag(newTag, user);
                }
            });
        }
        note.id = Date.now();
        storage.notes.push(note);
        user.notesCreatedIds.push((_a = note.id) !== null && _a !== void 0 ? _a : 0);
        repo.updateStorage(JSON.stringify(storage));
    };
    FileDataStorage.prototype.getNotes = function (user) {
        return storage.notes.filter(function (n) { var _a; return user.notesCreatedIds.includes((_a = n.id) !== null && _a !== void 0 ? _a : 0); });
    };
    FileDataStorage.prototype.getNoteById = function (noteId) {
        return storage.notes.find(function (n) { return n.id === noteId; });
    };
    FileDataStorage.prototype.editNoteById = function (noteId, noteContent) {
        var noteToEdit = storage.notes.find(function (n) { return n.id === noteId; });
        if (noteToEdit) {
            noteToEdit.title = noteContent.title;
            noteToEdit.content = noteContent.content;
            noteToEdit.tags = noteContent.tags;
            repo.updateStorage(JSON.stringify(storage));
        }
    };
    FileDataStorage.prototype.deleteNoteById = function (noteId) {
        var noteToDelete = storage.notes.find(function (n) { return n.id === noteId; });
        if (noteToDelete) {
            storage.notes.splice(storage.notes.indexOf(noteToDelete), 1);
            repo.updateStorage(JSON.stringify(storage));
        }
    };
    FileDataStorage.prototype.getPublicNotesByLogin = function (login) {
        var user = storage.users.find(function (u) { return u.login === login; });
        return storage.notes.filter(function (n) { var _a; return n.private === false && user.notesCreatedIds.includes((_a = n.id) !== null && _a !== void 0 ? _a : 0); });
    };
    FileDataStorage.prototype.shareNote = function (noteId, login) {
        var user = storage.users.find(function (n) { return n.login === login; });
        if (user) {
            user.notesSharedToUserIds.push(noteId);
            repo.updateStorage(JSON.stringify(storage));
        }
    };
    FileDataStorage.prototype.getNotesSharedToUserByLogin = function (login) {
        var user = storage.users.find(function (n) { return n.login === login; });
        if (user) {
            return storage.notes.filter(function (n) { var _a; return user.notesSharedToUserIds.includes((_a = n.id) !== null && _a !== void 0 ? _a : 0); });
        }
    };
    // CRUD dla tagów
    FileDataStorage.prototype.addTag = function (tag, user) {
        var _a;
        tag.id = Date.now();
        storage.tags.push(tag);
        user.tagsCreatedIds.push((_a = tag.id) !== null && _a !== void 0 ? _a : 0);
        repo.updateStorage(JSON.stringify(storage));
    };
    FileDataStorage.prototype.getTags = function (user) {
        return storage.tags.filter(function (t) { var _a; return user.tagsCreatedIds.includes((_a = t.id) !== null && _a !== void 0 ? _a : 0); });
    };
    FileDataStorage.prototype.getTagById = function (tagId) {
        return storage.tags.find(function (t) { return t.id === tagId; });
    };
    FileDataStorage.prototype.editTagById = function (tagId, tagContent) {
        var tagToEdit = storage.tags.find(function (t) { return t.id === tagId; });
        if (tagToEdit) {
            tagToEdit.name = tagContent.name;
            repo.updateStorage(JSON.stringify(storage));
        }
    };
    FileDataStorage.prototype.deleteTagById = function (tagId) {
        var tagToDelete = storage.tags.find(function (t) { return t.id === tagId; });
        if (tagToDelete) {
            storage.tags.splice(storage.tags.indexOf(tagToDelete), 1);
            repo.updateStorage(JSON.stringify(storage));
        }
    };
    // CRUD dla użytkowników
    FileDataStorage.prototype.addUser = function (user) {
        user.id = storage.users.length + 1;
        storage.users.push(user);
        repo.updateStorage(JSON.stringify(storage));
    };
    FileDataStorage.prototype.editUserByLogin = function (login, userContent) {
        var userToEdit = storage.users.find(function (u) { return u.login === login; });
        if (userToEdit) {
            userToEdit.login = userContent.login;
            userToEdit.password = userContent.password;
            userToEdit.isAdmin = userContent.isAdmin;
            repo.updateStorage(JSON.stringify(storage));
        }
    };
    FileDataStorage.prototype.getUserByLogin = function (login) {
        return storage.users.find(function (u) { return u.login === login; });
    };
    FileDataStorage.prototype.getUsers = function () {
        return storage.users;
    };
    FileDataStorage.prototype.deleteUserByLogin = function (login) {
        var userToDelete = storage.users.find(function (u) { return u.login === login; });
        userToDelete.tagsCreatedIds.forEach(function (id) {
            var tagToDelete = storage.tags.find(function (t) { return t.id === id; });
            storage.tags.splice(storage.tags.indexOf(tagToDelete), 1);
        });
        userToDelete.notesCreatedIds.forEach(function (id) {
            var noteToDelete = storage.notes.find(function (n) { return n.id === id; });
            storage.notes.splice(storage.notes.indexOf(noteToDelete), 1);
        });
        storage.users.splice(storage.users.indexOf(userToDelete), 1);
        repo.updateStorage(JSON.stringify(storage));
    };
    return FileDataStorage;
}());
exports["default"] = FileDataStorage;
