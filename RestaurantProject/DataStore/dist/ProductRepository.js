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
exports.ProductDemandList = exports.ProductRepository = void 0;
var mongoose_1 = require("mongoose");
var ProductRepository = /** @class */ (function () {
    function ProductRepository() {
        this.productSchema = new mongoose_1.Schema({
            productId: { type: Number, required: true },
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
                                productId: 1,
                                name: 'Coca Cola',
                                price: 2.5,
                                quantity: 330,
                                unit: 2
                            },
                            {
                                productId: 2,
                                name: 'Fanta',
                                price: 2.5,
                                quantity: 330,
                                unit: 2
                            },
                            {
                                productId: 3,
                                name: 'Carrot',
                                price: 1.5,
                                quantity: 1,
                                unit: 0
                            },
                            {
                                productId: 4,
                                name: 'Parsley',
                                price: 1.5,
                                quantity: 1,
                                unit: 0
                            },
                            {
                                productId: 5,
                                name: 'Onion',
                                price: 1.5,
                                quantity: 1,
                                unit: 0
                            },
                            {
                                productId: 6,
                                name: 'Tomato',
                                price: 1.5,
                                quantity: 1,
                                unit: 0
                            },
                            {
                                productId: 7,
                                name: 'Cucumber',
                                price: 1.5,
                                quantity: 1,
                                unit: 0
                            },
                            {
                                productId: 8,
                                name: 'Red Wine',
                                price: 5,
                                quantity: 700,
                                unit: 2
                            }
                        ];
                        return [4 /*yield*/, this.ProductModel
                                .insertMany(products)
                                .then(function () {
                                console.log("Products have been populated!");
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
    ProductRepository.prototype.addProduct = function (product) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ProductModel
                                .create(product)
                                .then(function () {
                                console.log("Product " + product.productId + " has been added!");
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
    ProductRepository.prototype.deleteProductByNumber = function (productId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ProductModel
                                .deleteOne({ productId: productId })
                                .then(function () {
                                console.log("Product " + productId + " has been deleted!");
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
    ProductRepository.prototype.getProductByNumber = function (productId) {
        return __awaiter(this, void 0, Promise, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ProductModel.findOne({ productId: productId })];
                    case 2:
                        product = _a.sent();
                        if (product)
                            return [2 /*return*/, product];
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductRepository.prototype.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.ProductModel.find({})];
                }
            });
        });
    };
    ProductRepository.prototype.updateProduct = function (product) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ProductModel
                                .updateOne({ productId: product.productId }, product)
                                .then(function () {
                                console.log("Product " + product.productId + " has been updated!");
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
    return ProductRepository;
}());
exports.ProductRepository = ProductRepository;
var ProductDemandList = /** @class */ (function () {
    function ProductDemandList() {
        this.productNames = [];
        this.productQuantities = [];
        this.productNames = [];
        this.productQuantities = [];
    }
    ProductDemandList.prototype.AddProduct = function (product) {
        var index = this.productNames.indexOf(product.name);
        if (index == -1) {
            this.productNames.push(product.name);
            this.productQuantities.push(product.quantity);
        }
        else {
            this.productQuantities[index] += product.quantity;
        }
    };
    ProductDemandList.prototype.GetProductNames = function () {
        return this.productNames;
    };
    ProductDemandList.prototype.GetDemandList = function () {
        return this;
    };
    ProductDemandList.prototype.GetProductQuantityByName = function (name) {
        var index = this.productNames.indexOf(name);
        return this.productQuantities[index];
    };
    ProductDemandList.prototype.GetProductQuantityByIndex = function (index) {
        return this.productQuantities[index];
    };
    return ProductDemandList;
}());
exports.ProductDemandList = ProductDemandList;
