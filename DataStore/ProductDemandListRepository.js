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
exports.ProductDemandListRepository = void 0;
var mongoose_1 = require("mongoose");
var fs = require('fs');
var ProductDemandListRepository = /** @class */ (function () {
    function ProductDemandListRepository() {
        this.productSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        });
    }
    ProductDemandListRepository.prototype.populateProductDemandList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var demandList;
            return __generator(this, function (_a) {
                demandList = [
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
                    }
                ];
                if (!fs.existsSync('../DemandList.json')) {
                    fs.writeFileSync('../DemandList.json', JSON.stringify(demandList));
                    console.log('ProductDemandList.json created!');
                }
                return [2 /*return*/];
            });
        });
    };
    ProductDemandListRepository.prototype.getProductDemandList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var demandList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'))];
                    case 1:
                        demandList = _a.sent();
                        if (demandList)
                            return [2 /*return*/, demandList];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductDemandListRepository.prototype.getProductFromDemandListByName = function (productName) {
        return __awaiter(this, void 0, void 0, function () {
            var demandList, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'))];
                    case 1:
                        demandList = _a.sent();
                        return [4 /*yield*/, demandList.find(function (product) { return product.name === productName; })];
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
    ProductDemandListRepository.prototype.addProductToDemandList = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var demandList, exists, existsAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'))];
                    case 1:
                        demandList = _a.sent();
                        return [4 /*yield*/, demandList.find(function (p) { return p.name === product.name; })];
                    case 2:
                        exists = _a.sent();
                        if (exists)
                            return [2 /*return*/, "Product " + product.name + " already exists in the list."];
                        demandList.push(product);
                        fs.writeFileSync('../DemandList.json', JSON.stringify(demandList));
                        return [4 /*yield*/, demandList.find(function (p) { return p.name === product.name; })];
                    case 3:
                        existsAfter = _a.sent();
                        if (existsAfter)
                            return [2 /*return*/, true];
                        else
                            return [2 /*return*/, "Product " + product.name + " has not been added to the list."];
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductDemandListRepository.prototype.deleteProductFromDemandListByName = function (productName) {
        return __awaiter(this, void 0, void 0, function () {
            var demandList, exists, existsAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'))];
                    case 1:
                        demandList = _a.sent();
                        return [4 /*yield*/, demandList.find(function (p) { return p.name === productName; })];
                    case 2:
                        exists = _a.sent();
                        if (!exists)
                            return [2 /*return*/, "Product does not exist in the list."];
                        demandList.splice(demandList.indexOf(exists), 1);
                        fs.writeFileSync('../DemandList.json', JSON.stringify(demandList));
                        return [4 /*yield*/, demandList.find(function (p) { return p.name === productName; })];
                    case 3:
                        existsAfter = _a.sent();
                        if (!existsAfter)
                            return [2 /*return*/, true];
                        else
                            return [2 /*return*/, "Product " + productName + " has not been deleted from the list."];
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductDemandListRepository.prototype.updateProductInDemandListByName = function (productName, product) {
        return __awaiter(this, void 0, void 0, function () {
            var demandList, productToUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'))];
                    case 1:
                        demandList = _a.sent();
                        return [4 /*yield*/, demandList.find(function (p) { return p.name === productName; })];
                    case 2:
                        productToUpdate = _a.sent();
                        if (productToUpdate) {
                            if (product.name)
                                productToUpdate.name = product.name;
                            if (product.price)
                                productToUpdate.price = product.price;
                            if (product.quantity)
                                productToUpdate.quantity = product.quantity;
                            fs.writeFileSync('../DemandList.json', JSON.stringify(demandList));
                            return [2 /*return*/, true];
                        }
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductDemandListRepository.prototype.getDemandListValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var demandList, demandListValue, _i, demandList_1, listItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'))];
                    case 1:
                        demandList = _a.sent();
                        demandListValue = 0;
                        for (_i = 0, demandList_1 = demandList; _i < demandList_1.length; _i++) {
                            listItem = demandList_1[_i];
                            demandListValue += +listItem.price * +listItem.quantity;
                        }
                        return [2 /*return*/, +demandListValue];
                }
            });
        });
    };
    return ProductDemandListRepository;
}());
exports.ProductDemandListRepository = ProductDemandListRepository;
