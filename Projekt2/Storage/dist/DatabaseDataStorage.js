"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DatabaseDataStorage = void 0;
var Note_1 = require("../Models/Note");
var Tag_1 = require("../Models/Tag");
var User_1 = require("../Models/User");
var mongoose_1 = require("mongoose");
var fs = require("fs");
var jsonConfig = JSON.parse(fs.readFileSync('../config.json', 'utf8'));
var DatabaseDataStorage = /** @class */ (function () {
    function DatabaseDataStorage() {
        // models for mongoose
        this.noteModel = new mongoose_1["default"].model('Notes', new mongoose_1["default"].Schema(Note_1["default"]));
        this.tagModel = new mongoose_1["default"].model('Tags', new mongoose_1["default"].Schema(Tag_1["default"]));
        this.userModel = new mongoose_1["default"].model('Users', new mongoose_1["default"].Schema(User_1["default"]));
    }
    DatabaseDataStorage.prototype.populateDatabase = function () {
        return __awaiter(this, void 0, Promise, function () {
            var notes, tags, users, noteModel, tagModel, userModel, tag1, tag2, tag3, note1, note2, note3, user1, user2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!mongoose_1["default"].connection.readyState) return [3 /*break*/, 2];
                        return [4 /*yield*/, mongoose_1["default"].connect(jsonConfig.mongoConnectionString)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, mongoose_1["default"].connection.db.collection('notes').find({}).toArray()];
                    case 3:
                        notes = _a.sent();
                        return [4 /*yield*/, mongoose_1["default"].connection.db.collection('tags').find({}).toArray()];
                    case 4:
                        tags = _a.sent();
                        return [4 /*yield*/, mongoose_1["default"].connection.db.collection('users').find({}).toArray()];
                    case 5:
                        users = _a.sent();
                        if (!(notes.length === 0 && tags.length === 0 && users.length === 0)) return [3 /*break*/, 14];
                        noteModel = new mongoose_1["default"].model('Notes', new mongoose_1["default"].Schema(Note_1["default"]));
                        tagModel = new mongoose_1["default"].model('Tags', new mongoose_1["default"].Schema(Tag_1["default"]));
                        userModel = new mongoose_1["default"].model('Users', new mongoose_1["default"].Schema(User_1["default"]));
                        tag1 = new tagModel({
                            id: 1,
                            name: 'tag1'
                        });
                        return [4 /*yield*/, tag1.save()];
                    case 6:
                        _a.sent();
                        tag2 = new tagModel({
                            id: 2,
                            name: 'tag2'
                        });
                        return [4 /*yield*/, tag2.save()];
                    case 7:
                        _a.sent();
                        tag3 = new tagModel({
                            id: 3,
                            name: 'tag3'
                        });
                        return [4 /*yield*/, tag3.save()];
                    case 8:
                        _a.sent();
                        note1 = new noteModel({
                            id: 1,
                            title: 'Note 1',
                            content: 'This is note 1',
                            createDate: '2020-01-01',
                            tags: ['tag1', 'tag2'],
                            private: false
                        });
                        return [4 /*yield*/, note1.save()];
                    case 9:
                        _a.sent();
                        note2 = new noteModel({
                            id: 2,
                            title: 'Note 2',
                            content: 'This is note 2',
                            createDate: '2020-01-02',
                            tags: ['tag1', 'tag3'],
                            private: true
                        });
                        return [4 /*yield*/, note2.save()];
                    case 10:
                        _a.sent();
                        note3 = new noteModel({
                            id: 3,
                            title: 'Note 3',
                            content: 'This is note 3',
                            createDate: '2020-01-03',
                            tags: ['tag2', 'tag3'],
                            private: false
                        });
                        return [4 /*yield*/, note3.save()];
                    case 11:
                        _a.sent();
                        user1 = new userModel({
                            id: 1,
                            login: 'user1',
                            password: 'user1',
                            notesCreatedIds: [1],
                            tagsCreatedIds: [1, 2],
                            isAdmin: true,
                            notesSharedToUserIds: [3]
                        });
                        return [4 /*yield*/, user1.save()];
                    case 12:
                        _a.sent();
                        user2 = new userModel({
                            id: 2,
                            login: 'user2',
                            password: 'user2',
                            notesCreatedIds: [2, 3],
                            tagsCreatedIds: [3],
                            isAdmin: false,
                            notesSharedToUserIds: [1]
                        });
                        return [4 /*yield*/, user2.save()];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    DatabaseDataStorage.prototype.addNote = function (note, user) {
        this.noteModel.create(note);
        if (note.id !== undefined)
            user.notesCreatedIds.push(note.id);
    };
    DatabaseDataStorage.prototype.getNotes = function () {
        return this.noteModel.find({}).exec();
    };
    DatabaseDataStorage.prototype.getNoteById = function (noteId) {
        return this.noteModel.findOne({ id: noteId }).exec();
    };
    DatabaseDataStorage.prototype.editNoteById = function (noteId, noteContent) {
        this.noteModel.findOneAndUpdate({ id: noteId }, noteContent).exec();
    };
    DatabaseDataStorage.prototype.deleteNoteById = function (noteId) {
        this.noteModel.findOneAndDelete({ id: noteId }).exec();
    };
    DatabaseDataStorage.prototype.getPublicNotesByLogin = function (login) {
        var _this = this;
        var notes = [];
        var user = this.userModel.findOne({ login: login }).exec();
        if (user) {
            user.notesCreatedIds.forEach(function (noteId) {
                var note = _this.noteModel.findOne({ id: noteId }).exec();
                if (note && !note.private) {
                    notes.push(note);
                }
            });
        }
        return notes;
    };
    DatabaseDataStorage.prototype.shareNote = function (noteId, login) {
        var user = this.userModel.findOne({ login: login }).exec();
        user.notesSharedToUserIds.push(noteId);
        user.save();
    };
    DatabaseDataStorage.prototype.getNotesSharedToUserByLogin = function (login) {
        return this.userModel.findOne({ login: login }).exec().notesSharedToUserIds;
    };
    DatabaseDataStorage.prototype.addTag = function (tag, user) {
        this.tagModel.create(tag);
    };
    DatabaseDataStorage.prototype.getTags = function () {
        return this.tagModel.find({}).exec();
    };
    DatabaseDataStorage.prototype.getTagById = function (tagId) {
        return this.tagModel.findOne({ id: tagId }).exec();
    };
    DatabaseDataStorage.prototype.editTagById = function (tagId, tagContent) {
        this.tagModel.findOneAndUpdate({ id: tagId }, tagContent).exec();
    };
    DatabaseDataStorage.prototype.deleteTagById = function (tagId) {
        this.tagModel.findOneAndDelete({ id: tagId }).exec();
    };
    DatabaseDataStorage.prototype.addUser = function (user) {
        this.userModel.create(user);
    };
    DatabaseDataStorage.prototype.editUserByLogin = function (login, user) {
        this.userModel.findOneAndUpdate({ login: login }, user).exec();
    };
    DatabaseDataStorage.prototype.getUserByLogin = function (login) {
        return this.userModel.findOne({ login: login }).exec();
    };
    DatabaseDataStorage.prototype.getUsers = function () {
        return this.userModel.find({}).exec();
    };
    DatabaseDataStorage.prototype.deleteUserByLogin = function (login) {
        this.userModel.findOneAndDelete({ login: login }).exec();
    };
    return DatabaseDataStorage;
}());
exports.DatabaseDataStorage = DatabaseDataStorage;
exports["default"] = DatabaseDataStorage;
