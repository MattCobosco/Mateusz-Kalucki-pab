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
exports.OrderRepository = void 0;
var mongoose_1 = require("mongoose");
var EmployeeModel_1 = require("../CoreBusiness/EmployeeModel");
var MenuItemModel_1 = require("../CoreBusiness/MenuItemModel");
var TableModel_1 = require("../CoreBusiness/TableModel");
var OrderRepository = /** @class */ (function () {
    function OrderRepository() {
        this.orderSchema = new mongoose_1.Schema({
            employee: { type: EmployeeModel_1["default"], ref: 'Employee' },
            items: [{ type: MenuItemModel_1["default"], ref: 'MenuItem' }],
            status: { type: Number, required: true },
            table: { type: TableModel_1["default"], ref: 'Table' },
            price: { type: Number, required: true }
        });
        this.orderModel = mongoose_1.model('Order', this.orderSchema);
    }
    OrderRepository.prototype.populateOrders = function () {
        return __awaiter(this, void 0, Promise, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        orders = [
                            {
                                employee: '62826aff5986dcfe48d66dd4',
                                items: [
                                    '6283fc51124f7b21d9c97d61',
                                    '6283fc51124f7b21d9c97d65'
                                ],
                                status: 1,
                                table: '6284ab720b1b925fc9c801fe',
                                price: 35
                            }
                        ];
                        return [4 /*yield*/, this.orderModel.countDocuments()];
                    case 2:
                        if (!((_a.sent()) === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.orderModel
                                .insertMany(orders)
                                .then(function () {
                                console.log("Orders have been populated!");
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
    ;
    OrderRepository.prototype.addOrder = function (order) {
        return __awaiter(this, void 0, Promise, function () {
            var price, i, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        if (!order.price) {
                            price = 0;
                            for (i = 0; i < order.items.length; i++) {
                                item = order.items[i];
                                price += item.price;
                            }
                            order.price = price;
                        }
                        return [4 /*yield*/, this.orderModel
                                .create(order)
                                .then(function () {
                                console.log("Order has been added!");
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
    OrderRepository.prototype.deleteOrderById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.orderModel.exists({ _id: id })];
                    case 2:
                        exists = _a.sent();
                        return [4 /*yield*/, this.orderModel
                                .findByIdAndDelete(id)
                                .then(function () {
                                console.log("Order has been deleted!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderRepository.prototype.getOrderById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.orderModel.findById(id)];
                    case 2:
                        order = _a.sent();
                        if (order)
                            return [2 /*return*/, order];
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderRepository.prototype.getOrders = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderModel.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    OrderRepository.prototype.updateOrderById = function (id, order) {
        return __awaiter(this, void 0, Promise, function () {
            var orderToUpdate, price, i, itemPrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.orderModel.findById(id)];
                    case 2:
                        orderToUpdate = _a.sent();
                        if (!orderToUpdate) return [3 /*break*/, 4];
                        if (order.employee)
                            orderToUpdate.employee = order.employee;
                        if (order.items)
                            orderToUpdate.items = order.items;
                        if (order.status)
                            orderToUpdate.status = order.status;
                        if (order.table)
                            orderToUpdate.table = order.table;
                        if (order.price)
                            orderToUpdate.price = order.price;
                        else {
                            price = 0;
                            for (i = 0; i < orderToUpdate.items.length; i++) {
                                itemPrice = orderToUpdate.items[i].price;
                                price += +itemPrice;
                            }
                            orderToUpdate.price = price;
                        }
                        return [4 /*yield*/, orderToUpdate.save()
                                .then(function () {
                                console.log("Order has been updated!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    // get orders by employee id
    OrderRepository.prototype.getOrdersByEmployeeId = function (employeeId) {
        return __awaiter(this, void 0, Promise, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.orderModel.find({ employee: employeeId })];
                    case 2:
                        orders = _a.sent();
                        if (orders)
                            return [2 /*return*/, orders];
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    // get orders in a given time period
    OrderRepository.prototype.getOrdersByTimePeriod = function (startDate, endDate) {
        return __awaiter(this, void 0, Promise, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.orderModel.find({ createdAt: { $gte: startDate, $lte: endDate } })];
                    case 2:
                        orders = _a.sent();
                        if (orders)
                            return [2 /*return*/, orders];
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    // get income in a given time period
    OrderRepository.prototype.getIncomeByTimePeriod = function (startDate, endDate) {
        return __awaiter(this, void 0, Promise, function () {
            var orders, income, _i, orders_1, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.orderModel.find({ createdAt: { $gte: startDate, $lte: endDate } })];
                    case 2:
                        orders = _a.sent();
                        if (orders) {
                            income = 0;
                            for (_i = 0, orders_1 = orders; _i < orders_1.length; _i++) {
                                order = orders_1[_i];
                                income += order.price;
                            }
                            return [2 /*return*/, income];
                        }
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    return OrderRepository;
}());
exports.OrderRepository = OrderRepository;
