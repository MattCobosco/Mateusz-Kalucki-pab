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
var OrderRepository = /** @class */ (function () {
    function OrderRepository() {
        this.restaurantSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            address: { type: String, required: true },
            phone: { type: String, required: true },
            nip: { type: String, required: true },
            email: { type: String, required: true },
            website: { type: String, required: true },
            description: { type: String, required: false }
        });
        this.employeeSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            surname: { type: String, required: true },
            position: { type: String, required: true },
            restaurant: { type: this.restaurantSchema, ref: 'Restaurant' }
        });
        this.productSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        });
        this.menuItemSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            description: { type: String, required: false },
            products: [{ type: this.productSchema, ref: 'Product' }]
        });
        this.tableSchema = new mongoose_1.Schema({
            number: { type: Number, required: true },
            seats: { type: Number, required: true },
            status: { type: Number, required: true }
        });
        this.orderSchema = new mongoose_1.Schema({
            dateTime: { type: Date, required: true },
            employee: { type: this.employeeSchema, ref: 'Employee' },
            items: [{ type: this.menuItemSchema, ref: 'MenuItem' }],
            status: { type: Number, required: true },
            table: { type: this.tableSchema, ref: 'Table' },
            price: { type: Number, required: true }
        });
        this.OrderModel = (0, mongoose_1.model)('Order', this.orderSchema);
    }
    OrderRepository.prototype.populateOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        orders = [
                            {
                                dateTime: new Date(),
                                employee: {
                                    name: "Employee2",
                                    surname: "Employee2",
                                    position: "Waiter",
                                    restaurant: {
                                        name: "Restaurant1",
                                        address: "Address1",
                                        phone: "123456789",
                                        nip: "123456789",
                                        email: "someEmail@something.com",
                                        website: "someWebsite.com"
                                    }
                                },
                                items: [
                                    {
                                        name: "Coca_Cola",
                                        price: 5,
                                        type: 3,
                                        description: "Coca Cola can",
                                        products: [
                                            {
                                                name: "Coca_Cola_Can",
                                                price: 2.5,
                                                quantity: 1
                                            }
                                        ]
                                    },
                                    {
                                        name: "Chicken_Nuggets",
                                        price: 30,
                                        type: 1,
                                        description: "Chicken nuggets",
                                        products: [
                                            {
                                                name: "Chicken",
                                                price: 3,
                                                quantity: 2
                                            }
                                        ]
                                    }
                                ],
                                status: 1,
                                table: {
                                    number: 1,
                                    seats: 4,
                                    status: 0
                                },
                                price: 35
                            }
                        ];
                        return [4 /*yield*/, this.OrderModel.countDocuments()];
                    case 2:
                        if (!((_a.sent()) === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.OrderModel
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
        return __awaiter(this, void 0, void 0, function () {
            var alreadyExists, price, _i, _a, item, exists;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.OrderModel.findOne({
                                dateTime: order.dateTime,
                                'employee.name': order.employee.name
                            })];
                    case 2:
                        alreadyExists = _b.sent();
                        if (alreadyExists)
                            return [2 /*return*/, "Such order already exists."];
                        if (!order.price || order.price === 0) {
                            price = 0;
                            for (_i = 0, _a = order.items; _i < _a.length; _i++) {
                                item = _a[_i];
                                price += +item.price;
                            }
                            order.price = price;
                        }
                        return [4 /*yield*/, this.OrderModel
                                .create(order)
                                .then(function () {
                                console.log("Order has been added!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.OrderModel.findOne({
                                dateTime: order.dateTime,
                                'employee.name': order.employee.name
                            })];
                    case 4:
                        exists = _b.sent();
                        if (exists)
                            return [2 /*return*/, true];
                        else
                            return [2 /*return*/, "Order has not been added."];
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderRepository.prototype.deleteOrderById = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, existsAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.OrderModel.findById(orderId)];
                    case 2:
                        exists = _a.sent();
                        return [4 /*yield*/, this.OrderModel
                                .findByIdAndDelete(orderId)
                                .then(function () {
                                console.log("Order " + orderId + " has been deleted!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.OrderModel.findById(orderId)];
                    case 4:
                        existsAfter = _a.sent();
                        if (!existsAfter)
                            return [2 /*return*/, true];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderRepository.prototype.getOrderById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.OrderModel.findById(id)];
                    case 2:
                        order = _a.sent();
                        if (order)
                            return [2 /*return*/, order];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderRepository.prototype.getOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.OrderModel.find({})];
                    case 2:
                        orders = _a.sent();
                        if (orders.length > 0)
                            return [2 /*return*/, orders];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    OrderRepository.prototype.updateOrderById = function (id, order) {
        return __awaiter(this, void 0, void 0, function () {
            var orderToUpdate, price, _i, _a, item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.OrderModel.findById(id)];
                    case 2:
                        orderToUpdate = _b.sent();
                        if (!orderToUpdate) return [3 /*break*/, 4];
                        if (order.employee)
                            orderToUpdate.employee = order.employee;
                        if (order.items)
                            orderToUpdate.items = order.items;
                        if (order.status)
                            orderToUpdate.status = order.status;
                        if (order.table)
                            orderToUpdate.table = order.table;
                        if (order.price || order.price !== 0)
                            orderToUpdate.price = order.price;
                        else {
                            price = 0;
                            for (_i = 0, _a = order.items; _i < _a.length; _i++) {
                                item = _a[_i];
                                price += +item.price;
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
                        _b.sent();
                        return [2 /*return*/, true];
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    // get orders by employee name
    OrderRepository.prototype.getOrdersByEmployeeName = function (employeeName) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.OrderModel.find({ 'employee.name': employeeName })];
                    case 2:
                        orders = _a.sent();
                        if (orders.length > 0)
                            return [2 /*return*/, orders];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    // get orders in a given time period
    OrderRepository.prototype.getOrdersByTimePeriod = function (startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.OrderModel.find({ dateTime: { $gte: startDate, $lte: endDate } })];
                    case 2:
                        orders = _a.sent();
                        if (orders.length > 0)
                            return [2 /*return*/, orders];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    // get income in a given time period
    OrderRepository.prototype.getIncomeByTimePeriod = function (startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var orders, income, _i, orders_1, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.OrderModel.find({ dateTime: { $gte: startDate, $lte: endDate } })];
                    case 2:
                        orders = _a.sent();
                        if (orders.length > 0) {
                            income = 0;
                            for (_i = 0, orders_1 = orders; _i < orders_1.length; _i++) {
                                order = orders_1[_i];
                                income += +order.price;
                            }
                            return [2 /*return*/, income];
                        }
                        else
                            return [2 /*return*/, 0];
                        return [2 /*return*/];
                }
            });
        });
    };
    // get profit in a given time period
    OrderRepository.prototype.getProfitByTimePeriod = function (startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var orders, income, costs, profit, _i, orders_2, order, _a, _b, item, _c, _d, product;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, this.OrderModel.find({ dateTime: { $gte: startDate, $lte: endDate } })];
                    case 2:
                        orders = _e.sent();
                        if (orders.length > 0) {
                            income = 0;
                            costs = 0;
                            profit = 0;
                            for (_i = 0, orders_2 = orders; _i < orders_2.length; _i++) {
                                order = orders_2[_i];
                                income += +order.price;
                                for (_a = 0, _b = order.items; _a < _b.length; _a++) {
                                    item = _b[_a];
                                    for (_c = 0, _d = item.products; _c < _d.length; _c++) {
                                        product = _d[_c];
                                        costs += +product.price * +product.quantity;
                                    }
                                }
                                profit = (+income - +costs);
                            }
                            return [2 /*return*/, +profit];
                        }
                        else
                            return [2 /*return*/, 0];
                        return [2 /*return*/];
                }
            });
        });
    };
    return OrderRepository;
}());
exports.OrderRepository = OrderRepository;
