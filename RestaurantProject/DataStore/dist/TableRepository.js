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
exports.TableRepository = void 0;
var mongoose_1 = require("mongoose");
var TableRepository = /** @class */ (function () {
    function TableRepository() {
        this.tableSchema = new mongoose_1.Schema({
            tableNumber: { type: Number, required: true },
            seats: { type: Number, required: true },
            status: { type: Number, required: true }
        });
        this.TableModel = mongoose_1.model('Table', this.tableSchema);
    }
    TableRepository.prototype.populateTables = function () {
        return __awaiter(this, void 0, Promise, function () {
            var tables;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        tables = [
                            {
                                tableNumber: 1,
                                seats: 4,
                                status: 0
                            },
                            {
                                tableNumber: 2,
                                seats: 4,
                                status: 1
                            },
                            {
                                tableNumber: 3,
                                seats: 6,
                                status: 2
                            },
                            {
                                tableNumber: 4,
                                seats: 8,
                                status: 3
                            }
                        ];
                        return [4 /*yield*/, this.TableModel
                                .insertMany(tables)
                                .then(function () {
                                console.log("Tables have been populated!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TableRepository.prototype.addTable = function (table) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.TableModel
                                .create(table)
                                .then(function () {
                                console.log("Table " + table.tableNumber + " has been added!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TableRepository.prototype.deleteTableByNumber = function (tableNumber) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.TableModel
                                .deleteOne({ tableNumber: tableNumber })
                                .then(function () {
                                console.log("Table " + { tableNumber: tableNumber } + " has been deleted!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TableRepository.prototype.getTableByNumber = function (tableNumber) {
        return __awaiter(this, void 0, Promise, function () {
            var table;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.TableModel.findOne({ tableNumber: tableNumber })];
                    case 2:
                        table = _a.sent();
                        if (table)
                            return [2 /*return*/, table];
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    TableRepository.prototype.getTables = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.TableModel.find({})];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TableRepository.prototype.updateTable = function (table) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.TableModel
                                .updateOne({ tableNumber: table.tableNumber }, table)
                                .then(function () {
                                console.log("Table " + table.tableNumber + " has been updated!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TableRepository;
}());
exports.TableRepository = TableRepository;
