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
exports.MenuPosition = exports.MenuCategory = exports.MenuItemRepository = void 0;
var mongoose_1 = require("mongoose");
var MenuItemRepository = /** @class */ (function () {
    function MenuItemRepository() {
        this.productSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        });
        this.menuItemSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            type: { type: Number, required: true },
            description: { type: String, required: true },
            products: [{
                    type: this.productSchema,
                    required: true
                }]
        });
        this.MenuItemModel = (0, mongoose_1.model)('MenuItem', this.menuItemSchema);
    }
    MenuItemRepository.prototype.populateMenuItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var menuItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        menuItems = [
                            {
                                name: 'Coca_Cola',
                                price: 5,
                                type: 3,
                                description: 'Coca Cola can',
                                products: [
                                    {
                                        name: "Coca_Cola_Can",
                                        price: 2.5,
                                        quantity: 1
                                    }
                                ]
                            },
                            {
                                name: 'Fanta',
                                price: 5,
                                type: 3,
                                description: 'Fanta can',
                                products: [
                                    {
                                        name: "Fanta_Can",
                                        price: 2.5,
                                        quantity: 1
                                    }
                                ]
                            },
                            {
                                name: 'Vegetable_Soup',
                                price: 15,
                                type: 2,
                                description: 'Vegetable soup made of carrot, parsley, onion, tomato and cucumber',
                                products: [
                                    {
                                        name: "Carrot",
                                        price: 1.5,
                                        quantity: 2
                                    },
                                    {
                                        name: "Parsley",
                                        price: 1.5,
                                        quantity: 1
                                    },
                                    {
                                        name: "Onion",
                                        price: 1.5,
                                        quantity: 1
                                    },
                                    {
                                        name: "Tomato",
                                        price: 1.5,
                                        quantity: 2
                                    },
                                    {
                                        name: "Cucumber",
                                        price: 1.5,
                                        quantity: 1
                                    }
                                ]
                            },
                            {
                                name: 'Red_Wine',
                                price: 15,
                                type: 3,
                                description: 'Red wine bottle',
                                products: [
                                    {
                                        name: "Red_Wine_Bottle",
                                        price: 5,
                                        quantity: 1
                                    }
                                ]
                            },
                            {
                                name: 'Springrolls',
                                price: 25,
                                type: 0,
                                description: 'Springrolls made of chicken, cabbage, onion, carrot and mushroom',
                                products: [
                                    {
                                        name: "Chicken",
                                        price: 3,
                                        quantity: 1
                                    },
                                    {
                                        name: "Cabbage",
                                        price: 2,
                                        quantity: 1
                                    },
                                    {
                                        name: "Onion",
                                        price: 1.5,
                                        quantity: 1
                                    },
                                    {
                                        name: "Carrot",
                                        price: 1.5,
                                        quantity: 1
                                    },
                                    {
                                        name: "Mushroom",
                                        price: 1,
                                        quantity: 1
                                    }
                                ]
                            },
                            {
                                name: 'Chicken_Nuggets',
                                price: 30,
                                type: 1,
                                description: 'Chicken nuggets',
                                products: [
                                    {
                                        name: "Chicken",
                                        price: 3,
                                        quantity: 2
                                    }
                                ]
                            }
                        ];
                        return [4 /*yield*/, this.MenuItemModel.countDocuments()];
                    case 2:
                        if (!((_a.sent()) === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.MenuItemModel
                                .insertMany(menuItems)
                                .then(function () {
                                console.log("Menu items have been populated!");
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
    MenuItemRepository.prototype.addMenuItem = function (menuItem) {
        return __awaiter(this, void 0, void 0, function () {
            var alreadyExists, existsAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel.findOne({ name: menuItem.name })];
                    case 2:
                        alreadyExists = _a.sent();
                        if (alreadyExists)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, this.MenuItemModel
                                .create(menuItem)
                                .then(function () {
                                console.log("Menu item " + menuItem.name + " has been added!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel.findOne({ name: menuItem.name })];
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
    MenuItemRepository.prototype.deleteMenuItemByName = function (menuItemName) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, existsAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel.findOne({ name: menuItemName })];
                    case 2:
                        exists = _a.sent();
                        if (!exists)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, this.MenuItemModel
                                .deleteOne({ name: menuItemName })
                                .then(function () {
                                console.log("Menu item " + menuItemName + " has been deleted!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel.findOne({ name: menuItemName })];
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
    MenuItemRepository.prototype.getMenuItemByName = function (menuItemName) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel.findOne({ name: menuItemName })];
                    case 2:
                        menuItem = _a.sent();
                        if (menuItem)
                            return [2 /*return*/, menuItem];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuItemRepository.prototype.getMenuItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var menuItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel.find()];
                    case 2:
                        menuItems = _a.sent();
                        if (menuItems)
                            return [2 /*return*/, menuItems];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuItemRepository.prototype.updateMenuItem = function (menuItemName, menuItem) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItemToUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel.findOne({ name: menuItemName })];
                    case 2:
                        menuItemToUpdate = _a.sent();
                        if (!menuItemToUpdate) return [3 /*break*/, 4];
                        if (menuItem.name)
                            menuItemToUpdate.name = menuItem.name;
                        if (menuItem.price)
                            menuItemToUpdate.price = menuItem.price;
                        if (menuItem.type)
                            menuItemToUpdate.type = menuItem.type;
                        if (menuItem.description)
                            menuItemToUpdate.description = menuItem.description;
                        if (menuItem.products)
                            menuItemToUpdate.products = menuItem.products;
                        return [4 /*yield*/, menuItemToUpdate.save()
                                .then(function () {
                                console.log("Menu item " + menuItemName + " has been updated!");
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
    MenuItemRepository.prototype.getMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            var menuItems, menu, starters, mains, soups, drinks, desserts, i, menuItem, menuItemCategory, menuPosition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel.find()];
                    case 2:
                        menuItems = _a.sent();
                        menu = [];
                        starters = [];
                        menu.push({ name: 'Starters', menuPositions: starters });
                        mains = [];
                        menu.push({ name: 'Mains', menuPositions: mains });
                        soups = [];
                        menu.push({ name: 'Soups', menuPositions: soups });
                        drinks = [];
                        menu.push({ name: 'Drinks', menuPositions: drinks });
                        desserts = [];
                        menu.push({ name: 'Desserts', menuPositions: desserts });
                        // iterates through all menu items
                        for (i = 0; i < menuItems.length; i++) {
                            menuItem = menuItems[i];
                            menuItemCategory = menuItem.type;
                            menuPosition = {
                                name: menuItem.name,
                                price: menuItem.price,
                                description: menuItem.description
                            };
                            // puts menu item in the correct menu category based on type
                            menu[menuItemCategory].menuPositions.push(menuPosition);
                        }
                        // returns menu
                        return [2 /*return*/, menu];
                }
            });
        });
    };
    return MenuItemRepository;
}());
exports.MenuItemRepository = MenuItemRepository;
// support class to build menu
var MenuCategory = /** @class */ (function () {
    function MenuCategory(name, menuPositions) {
        this.name = name;
        this.menuPositions = menuPositions;
    }
    return MenuCategory;
}());
exports.MenuCategory = MenuCategory;
// simplified menu item
var MenuPosition = /** @class */ (function () {
    function MenuPosition(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }
    return MenuPosition;
}());
exports.MenuPosition = MenuPosition;
