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
exports.ProductRepository = void 0;
var mongoose_1 = require("mongoose");
var ProductRepository = /** @class */ (function () {
    function ProductRepository() {
        this.productSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        });
        this.ProductModel = mongoose_1.model('Product', this.productSchema);
    }
    ProductRepository.prototype.populateProducts = function () {
        return __awaiter(this, void 0, Promise, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        products = [
                            {
                                name: "Coca_Cola_Can",
                                price: 2.5,
                                quantity: 250
                            },
                            {
                                name: "Fanta_Can",
                                price: 2.5,
                                quantity: 250
                            },
                            {
                                name: "Carrot",
                                price: 1.5,
                                quantity: 100
                            },
                            {
                                name: "Parsley",
                                price: 1.5,
                                quantity: 100
                            },
                            {
                                name: "Onion",
                                price: 1.5,
                                quantity: 100
                            },
                            {
                                name: "Tomato",
                                price: 1.5,
                                quantity: 100
                            },
                            {
                                name: "Cucumber",
                                price: 1.5,
                                quantity: 100
                            },
                            {
                                name: "Red_Wine_Bottle",
                                price: 5,
                                quantity: 50
                            },
                            {
                                name: "Chicken",
                                price: 3,
                                quantity: 100
                            },
                            {
                                name: "Mushroom",
                                price: 1,
                                quantity: 200
                            },
                            {
                                name: "Cabbage",
                                price: 2,
                                quantity: 500
                            }
                        ];
                        return [4 /*yield*/, this.ProductModel.countDocuments()];
                    case 2:
                        if (!((_a.sent()) === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.ProductModel
                                .insertMany(products)
                                .then(function () {
                                console.log("Products have been populated!");
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
    ProductRepository.prototype.addProduct = function (product) {
        return __awaiter(this, void 0, Promise, function () {
            var alreadyExists, existsAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ProductModel.exists({ name: product.name })];
                    case 2:
                        alreadyExists = _a.sent();
                        if (alreadyExists)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, this.ProductModel
                                .create(product)
                                .then(function () {
                                console.log("Product " + product.name + " has been added!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.ProductModel.findOne({ name: product.name })];
                    case 4:
                        existsAfter = _a.sent();
                        if (existsAfter)
                            return [2 /*return*/, true];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductRepository.prototype.deleteProductByName = function (productName) {
        return __awaiter(this, void 0, Promise, function () {
            var exists, existsAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ProductModel.exists({ name: productName })];
                    case 2:
                        exists = _a.sent();
                        if (!exists)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, this.ProductModel
                                .deleteOne({ name: productName })
                                .then(function () {
                                console.log("Product " + productName + " has been deleted!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.ProductModel.findOne({ name: productName })];
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
    ProductRepository.prototype.getProductByName = function (productName) {
        return __awaiter(this, void 0, Promise, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ProductModel.findOne({ name: productName })];
                    case 2:
                        product = _a.sent();
                        if (product)
                            return [2 /*return*/, product];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductRepository.prototype.getProducts = function () {
        return __awaiter(this, void 0, Promise, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ProductModel.find({})];
                    case 2:
                        products = _a.sent();
                        if (products.length > 0)
                            return [2 /*return*/, products];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductRepository.prototype.updateProduct = function (productName, product) {
        return __awaiter(this, void 0, Promise, function () {
            var productToUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ProductModel.findOne({ name: productName })];
                    case 2:
                        productToUpdate = _a.sent();
                        if (!productToUpdate) return [3 /*break*/, 4];
                        if (product.name)
                            productToUpdate.name = product.name;
                        if (product.price)
                            productToUpdate.price = product.price;
                        if (product.quantity)
                            productToUpdate.quantity = product.quantity;
                        return [4 /*yield*/, productToUpdate.save()
                                .then(function () {
                                console.log("Product " + productName + " has been updated!");
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
    return ProductRepository;
}());
exports.ProductRepository = ProductRepository;
