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
exports.CustomerRepository = void 0;
var mongoose_1 = require("mongoose");
var CustomerRepository = /** @class */ (function () {
    function CustomerRepository() {
        this.customerSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            loyaltyPoints: { type: Number, required: true }
        });
        this.CustomerModel = mongoose_1.model('Customer', this.customerSchema);
    }
    CustomerRepository.prototype.populateCustomers = function () {
        return __awaiter(this, void 0, Promise, function () {
            var customers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        customers = [
                            {
                                name: 'Customer1',
                                email: 'customer1@gmail.com',
                                phone: '123456789',
                                address: 'CustomerAddress1',
                                loyaltyPoints: 0
                            },
                            {
                                name: 'Customer2',
                                email: 'customer2@gmail.com',
                                phone: '987654321',
                                address: 'CustomerAddress2',
                                loyaltyPoints: 0
                            }
                        ];
                        return [4 /*yield*/, this.CustomerModel.countDocuments()];
                    case 2:
                        if (!((_a.sent()) === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.CustomerModel
                                .insertMany(customers)
                                .then(function () {
                                console.log("Customers have been populated!");
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
    CustomerRepository.prototype.addCustomer = function (customer) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        customer.loyaltyPoints = 0; // set default value for loyalty points before saving => loyaltyPoints are required in the schema
                        return [4 /*yield*/, this.CustomerModel
                                .create(customer)
                                .then(function () {
                                console.log("Customer " + customer.name + " has been added!");
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
    CustomerRepository.prototype.deleteCustomerByName = function (customerName) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.CustomerModel
                                .deleteOne({ name: customerName })
                                .then(function () {
                                console.log("Customer " + customerName + " has been deleted!");
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
    CustomerRepository.prototype.getCustomerByName = function (customerName) {
        return __awaiter(this, void 0, Promise, function () {
            var customer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.CustomerModel.findOne({ name: customerName })];
                    case 2:
                        customer = _a.sent();
                        if (customer)
                            return [2 /*return*/, customer];
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomerRepository.prototype.getCustomers = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.CustomerModel.find({})];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CustomerRepository.prototype.updateCustomer = function (customerName, customer) {
        return __awaiter(this, void 0, Promise, function () {
            var customerToUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.CustomerModel.findOne({ name: customerName })];
                    case 2:
                        customerToUpdate = _a.sent();
                        if (!customerToUpdate) return [3 /*break*/, 4];
                        if (customer.name)
                            customerToUpdate.name = customer.name;
                        if (customer.email)
                            customerToUpdate.email = customer.email;
                        if (customer.phone)
                            customerToUpdate.phone = customer.phone;
                        if (customer.address)
                            customerToUpdate.address = customer.address;
                        if (customer.loyaltyPoints)
                            customerToUpdate.loyaltyPoints = customer.loyaltyPoints;
                        return [4 /*yield*/, customerToUpdate.save()
                                .then(function () {
                                console.log("Customer " + customerName + " has been updated!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        console.log("Customer " + customerName + " does not exist!");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CustomerRepository.prototype.addLoyaltyPoints = function (customerName, loyaltyPoints) {
        return __awaiter(this, void 0, Promise, function () {
            var customer, newLoyaltyPoints;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.CustomerModel.findOne({ name: customerName })];
                    case 2:
                        customer = _a.sent();
                        if (!customer) return [3 /*break*/, 4];
                        newLoyaltyPoints = +customer.loyaltyPoints + +loyaltyPoints;
                        customer.loyaltyPoints = newLoyaltyPoints;
                        return [4 /*yield*/, this.CustomerModel
                                .updateOne({ name: customerName }, customer)
                                .then(function () {
                                console.log("Customer loyalty points have been added to " + customerName + "!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        console.log("Customer " + customerName + " does not exist!");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CustomerRepository;
}());
exports.CustomerRepository = CustomerRepository;
