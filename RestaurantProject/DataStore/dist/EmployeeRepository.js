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
var RestaurantModel_1 = require("../CoreBusiness/RestaurantModel");
var EmployeeRepository = /** @class */ (function () {
    function EmployeeRepository() {
        this.employeeSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            surname: { type: String, required: true },
            position: { type: String, required: true },
            restaurant: { type: RestaurantModel_1["default"], required: true }
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
                                name: 'Employee1',
                                surname: 'Employee1',
                                position: 'Manager',
                                restaurant: {
                                    name: 'Restaurant1',
                                    address: 'Address1',
                                    phone: '123456789',
                                    nip: '123456789',
                                    email: 'someEmail@something.com',
                                    website: 'someWebsite.com'
                                }
                            },
                            {
                                name: 'Employee2',
                                surname: 'Employee2',
                                position: 'Waiter',
                                restaurant: {
                                    name: 'Restaurant1',
                                    address: 'Address1',
                                    phone: '123456789',
                                    nip: '123456789',
                                    email: 'someEmail@something.com',
                                    website: 'someWebsite.com'
                                }
                            },
                            {
                                name: 'Employee3',
                                surname: 'Employee3',
                                position: 'Waiter',
                                restaurant: {
                                    name: 'Restaurant1',
                                    address: 'Address1',
                                    phone: '123456789',
                                    nip: '123456789',
                                    email: 'someEmail@something.com',
                                    website: 'someWebsite.com'
                                }
                            },
                            {
                                name: 'Employee4',
                                surname: 'Employee4',
                                position: 'Manager',
                                restaurant: {
                                    name: 'Restaurant1',
                                    address: 'Address1',
                                    phone: '123456789',
                                    nip: '123456789',
                                    email: 'someEmail@something.com',
                                    website: 'someWebsite.com'
                                }
                            }
                        ];
                        return [4 /*yield*/, this.EmployeeModel.countDocuments()];
                    case 2:
                        if (!((_a.sent()) === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.EmployeeModel
                                .insertMany(employees)
                                .then(function () {
                                console.log("Employees have been populated!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EmployeeRepository.prototype.addEmployee = function (employee) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.EmployeeModel
                                .create(employee)
                                .then(function () {
                                console.log("Employee " + employee.surname + " has been added!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.EmployeeModel.findOne({ surname: employee.surname })];
                    case 3:
                        result = _a.sent();
                        if (result)
                            return [2 /*return*/, true];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    EmployeeRepository.prototype.deleteEmployeeBySurname = function (employeeSurname) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.EmployeeModel
                                .deleteOne({ surname: employeeSurname })
                                .then(function () {
                                console.log("Employee " + employeeSurname + " has been deleted!");
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
    EmployeeRepository.prototype.getEmployeeBySurname = function (employeeSurname) {
        return __awaiter(this, void 0, Promise, function () {
            var employee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.EmployeeModel.findOne({ surname: employeeSurname })];
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
                        return [4 /*yield*/, this.EmployeeModel.find({ restaurant: restaurantName })];
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
    EmployeeRepository.prototype.updateEmployee = function (employeeSurname, employee) {
        return __awaiter(this, void 0, Promise, function () {
            var employeeToUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.EmployeeModel.findOne({ surname: employeeSurname })];
                    case 2:
                        employeeToUpdate = _a.sent();
                        if (!employeeToUpdate) return [3 /*break*/, 4];
                        if (employee.name)
                            employeeToUpdate.name = employee.name;
                        if (employee.surname)
                            employeeToUpdate.surname = employee.surname;
                        if (employee.position)
                            employeeToUpdate.position = employee.position;
                        if (employee.restaurant)
                            employeeToUpdate.restaurant = employee.restaurant;
                        return [4 /*yield*/, employeeToUpdate.save()
                                .then(function () {
                                console.log("Employee " + employee.surname + " has been updated!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4:
                        console.log("Employee " + employee.surname + " does not exist!");
                        return [2 /*return*/, false];
                }
            });
        });
    };
    return EmployeeRepository;
}());
exports.EmployeeRepository = EmployeeRepository;
