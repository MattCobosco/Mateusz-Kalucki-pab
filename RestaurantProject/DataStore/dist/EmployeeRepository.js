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
exports.EmployeeRepository = void 0;
var mongoose_1 = require("mongoose");
var RestaurantRepository_1 = require("./RestaurantRepository");
var EmployeeRepository = /** @class */ (function () {
    function EmployeeRepository() {
        this.employeeSchema = new mongoose_1.Schema({
            employeeId: { type: Number, required: true },
            name: { type: String, required: true },
            surname: { type: String, required: true },
            position: { type: String, required: true },
            restaurantName: { type: String, required: true }
        });
        this.EmployeeModel = mongoose_1.model('Employee', this.employeeSchema);
    }
    EmployeeRepository.prototype.populateEmployees = function () {
        return __awaiter(this, void 0, Promise, function () {
            var employees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        employees = [
                            {
                                employeeId: 1,
                                name: 'Employee1',
                                surname: 'Employee1',
                                position: 'Manager',
                                restaurantName: 'Restaurant1'
                            },
                            {
                                employeeId: 2,
                                name: 'Employee2',
                                surname: 'Employee2',
                                position: 'Waiter',
                                restaurantName: 'Restaurant1'
                            },
                            {
                                employeeId: 3,
                                name: 'Employee3',
                                surname: 'Employee3',
                                position: 'Waiter',
                                restaurantName: 'Restaurant2'
                            },
                            {
                                employeeId: 4,
                                name: 'Employee4',
                                surname: 'Employee4',
                                position: 'Manager',
                                restaurantName: 'Restaurant2'
                            }
                        ];
                        return [4 /*yield*/, this.EmployeeModel
                                .insertMany(employees)
                                .then(function () {
                                console.log("Employees have been populated!");
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
    EmployeeRepository.prototype.addEmployee = function (employee) {
        return __awaiter(this, void 0, Promise, function () {
            var restaurantRepository, resturantExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        restaurantRepository = new RestaurantRepository_1.RestaurantRepository();
                        return [4 /*yield*/, restaurantRepository.CheckIfRestaurantExists(employee.restaurantName)];
                    case 2:
                        resturantExists = _a.sent();
                        if (!resturantExists) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.EmployeeModel
                                .create(employee)
                                .then(function () {
                                console.log("Employee " + employee.name + " has been added!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        console.log("Restaurant " + employee.restaurantName + " does not exist!");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EmployeeRepository.prototype.deleteEmployeeById = function (employeeId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.EmployeeModel
                                .deleteOne({ employeeId: employeeId })
                                .then(function () {
                                console.log("Employee " + employeeId + " has been deleted!");
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
    EmployeeRepository.prototype.getEmployeeById = function (employeeId) {
        return __awaiter(this, void 0, Promise, function () {
            var employee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.EmployeeModel.findOne({ employeeId: employeeId })];
                    case 2:
                        employee = _a.sent();
                        if (employee) {
                            return [2 /*return*/, employee];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EmployeeRepository.prototype.getEmployees = function () {
        return __awaiter(this, void 0, Promise, function () {
            var employees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.EmployeeModel.find()];
                    case 2:
                        employees = _a.sent();
                        if (employees) {
                            return [2 /*return*/, employees];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EmployeeRepository.prototype.getEmployeesByRestaurantName = function (restaurantName) {
        return __awaiter(this, void 0, Promise, function () {
            var employees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.EmployeeModel.find({ restaurantName: restaurantName })];
                    case 2:
                        employees = _a.sent();
                        if (employees) {
                            return [2 /*return*/, employees];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EmployeeRepository.prototype.updateEmployee = function (employee) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.EmployeeModel
                                .updateOne({ employeeId: employee.employeeId }, employee)
                                .then(function () {
                                console.log("Employee " + employee.employeeId + " has been updated!");
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
    return EmployeeRepository;
}());
exports.EmployeeRepository = EmployeeRepository;
