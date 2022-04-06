"use strict";
exports.__esModule = true;
var Note = /** @class */ (function () {
    function Note(note) {
        this.private = true;
        this.title = note.title;
        this.content = note.content;
        this.createDate = note.createDate;
        this.tags = note.tags;
        this.id = note.id;
        this.private = note.private;
    }
    return Note;
}());
exports["default"] = Note;
