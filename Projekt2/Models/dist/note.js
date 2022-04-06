"use strict";
exports.__esModule = true;
var Note = /** @class */ (function () {
    function Note(note) {
        this.title = note.title;
        this.content = note.content;
        this.createDate = note.createDate;
        this.tags = note.tags;
        this.id = note.id;
    }
    return Note;
}());
exports["default"] = Note;
