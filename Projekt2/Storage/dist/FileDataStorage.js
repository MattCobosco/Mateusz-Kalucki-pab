"use strict";
exports.__esModule = true;
var storage;
var FileDataStorage = /** @class */ (function () {
    function FileDataStorage() {
    }
    FileDataStorage.prototype.addNote = function (note) {
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
    };
    FileDataStorage.prototype.getNotes = function (registeredUser) {
        return storage.notes.filter(function (n) { var _a; return registeredUser.notesCreatedIds.includes((_a = n.id) !== null && _a !== void 0 ? _a : 0); });
    };
    FileDataStorage.prototype.getNoteById = function (noteId) {
        throw new Error('Method not implemented.');
    };
    FileDataStorage.prototype.editNoteById = function (noteId) {
        throw new Error('Method not implemented.');
    };
    FileDataStorage.prototype.deleteNoteById = function (noteId) {
        throw new Error('Method not implemented.');
    };
    FileDataStorage.prototype.getPublicNotesByUsername = function (username) {
        throw new Error('Method not implemented.');
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
    return FileDataStorage;
}());
exports["default"] = FileDataStorage;
