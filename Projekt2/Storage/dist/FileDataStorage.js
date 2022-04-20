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
    FileDataStorage.prototype.addNote = function (note, user) {
        var _a;
        console.log(note);
        if (note.tags != undefined) {
            note.tags.forEach(function (tag) {
                if (!storage.tags.find(function (t) { return t.name === tag.name; })) {
                    var newTag = {
                        id: Date.now(),
                        name: tag.name
                    };
                    storage.tags.push(newTag);
                }
            });
        }
        note.id = Date.now();
        storage.notes.push(note);
        user.notesCreatedIds.push((_a = note.id) !== null && _a !== void 0 ? _a : 0);
        repo.updateStorage(JSON.stringify(storage));
    };
    FileDataStorage.prototype.getNotes = function (registeredUser) {
        return storage.notes.filter(function (n) { var _a; return registeredUser.notesCreatedIds.includes((_a = n.id) !== null && _a !== void 0 ? _a : 0); });
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
    FileDataStorage.prototype.getPublicNotesByUsername = function (username) {
        var _this = this;
        return storage.notes.filter(function (n) { var _a; return n.private === false && _this.getUserByUsername(username).notesCreatedIds.includes((_a = n.id) !== null && _a !== void 0 ? _a : 0); });
    };
    FileDataStorage.prototype.addTag = function (tag) {
        throw new Error('Method not implemented.');
    };
    FileDataStorage.prototype.getTags = function () {
        throw new Error('Method not implemented.');
    };
    FileDataStorage.prototype.getTagById = function (tagId) {
        throw new Error('Method not implemented.');
    };
    FileDataStorage.prototype.editTagById = function (tagId) {
        throw new Error('Method not implemented.');
    };
    FileDataStorage.prototype.deleteTagById = function (tagId) {
        throw new Error('Method not implemented.');
    };
    FileDataStorage.prototype.getUserByUsername = function (username) {
        return storage.users.find(function (u) { return u.login === username; });
    };
    return FileDataStorage;
}());
exports["default"] = FileDataStorage;
