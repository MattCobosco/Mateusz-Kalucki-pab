"use strict";
exports.__esModule = true;
exports.DatabaseDataStorage = void 0;
var DatabaseDataStorage = /** @class */ (function () {
    function DatabaseDataStorage() {
    }
    DatabaseDataStorage.prototype.addNote = function (note, user) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.getNotes = function () {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.getNoteById = function (noteId) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.editNoteById = function (noteId, noteContent) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.deleteNoteById = function (noteId) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.getPublicNotesByLogin = function (login) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.shareNote = function (noteId, login) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.getNotesSharedToUserByLogin = function (login) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.addTag = function (tag, user) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.getTags = function () {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.getTagById = function (tagId) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.editTagById = function (tagId, tagContent) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.deleteTagById = function (tagId) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.addUser = function (user) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.editUserByLogin = function (login, user) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.getUserByLogin = function (login) {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.getUsers = function () {
        throw new Error('Method not implemented.');
    };
    DatabaseDataStorage.prototype.deleteUserByLogin = function (login) {
        throw new Error('Method not implemented.');
    };
    return DatabaseDataStorage;
}());
exports.DatabaseDataStorage = DatabaseDataStorage;
exports["default"] = DatabaseDataStorage;
