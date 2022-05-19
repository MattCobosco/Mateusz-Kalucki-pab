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
exports.RestaurantRepository = void 0;
var mongoose_1 = require("mongoose");
var RestaurantRepository = /** @class */ (function () {
    function RestaurantRepository() {
        this.restaurantSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            address: { type: String, required: true },
            phone: { type: String, required: true },
            nip: { type: String, required: true },
            email: { type: String, required: true },
            website: { type: String, required: true },
            description: String
        });
        this.RestaurantModel = (0, mongoose_1.model)('Restaurant', this.restaurantSchema);
    }
    RestaurantRepository.prototype.populateRestaurants = function () {
        return __awaiter(this, void 0, void 0, function () {
            var restaurants;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        restaurants = [
                            {
                                name: 'Restaurant1',
                                address: 'Address1',
                                phone: '123456789',
                                nip: '123456789',
                                email: 'someEmail@something.com',
                                website: 'someWebsite.com'
                            },
                        ];
                        return [4 /*yield*/, this.RestaurantModel.countDocuments()];
                    case 2:
                        if (!((_a.sent()) === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.RestaurantModel
                                .insertMany(restaurants)
                                .then(function () {
                                console.log("Restaurants have been populated!");
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
    RestaurantRepository.prototype.addRestaurant = function (restaurant) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.RestaurantModel
                                .create(restaurant)
                                .then(function () {
                                console.log('Restaurant ' + restaurant.name + ' has been added!');
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.RestaurantModel.findOne({ name: restaurant.name })];
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
    RestaurantRepository.prototype.deleteRestaurantByName = function (restaurantName) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.RestaurantModel.exists({ name: restaurantName })];
                    case 2:
                        exists = _a.sent();
                        if (!exists) {
                            console.log('Restaurant ' + restaurantName + ' does not exist!');
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.RestaurantModel
                                .deleteOne({ name: restaurantName })
                                .then(function () {
                                console.log("Restaurant " + restaurantName + " has been deleted!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    RestaurantRepository.prototype.getRestaurantByName = function (restaurantName) {
        return __awaiter(this, void 0, void 0, function () {
            var restaurant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.RestaurantModel.findOne({ name: restaurantName })];
                    case 2:
                        restaurant = _a.sent();
                        if (restaurant)
                            return [2 /*return*/, restaurant];
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    RestaurantRepository.prototype.getRestaurants = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.RestaurantModel.find({})];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestaurantRepository.prototype.updateRestaurant = function (restaurantName, restaurant) {
        return __awaiter(this, void 0, void 0, function () {
            var restaurantToUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.RestaurantModel.findOne({ name: restaurantName })];
                    case 2:
                        restaurantToUpdate = _a.sent();
                        if (!restaurantToUpdate) return [3 /*break*/, 4];
                        if (restaurant.name)
                            restaurantToUpdate.name = restaurant.name;
                        if (restaurant.address)
                            restaurantToUpdate.address = restaurant.address;
                        if (restaurant.phone)
                            restaurantToUpdate.phone = restaurant.phone;
                        if (restaurant.nip)
                            restaurantToUpdate.nip = restaurant.nip;
                        if (restaurant.email)
                            restaurantToUpdate.email = restaurant.email;
                        if (restaurant.website)
                            restaurantToUpdate.website = restaurant.website;
                        if (restaurant.description)
                            restaurantToUpdate.description = restaurant.description;
                        return [4 /*yield*/, this.RestaurantModel
                                .updateOne({ name: restaurantName }, restaurantToUpdate)
                                .then(function () {
                                console.log("Restaurant " + restaurantName + " has been updated!");
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4:
                        console.log("Restaurant " + restaurantName + " does not exist!");
                        return [2 /*return*/, false];
                }
            });
        });
    };
    return RestaurantRepository;
}());
exports.RestaurantRepository = RestaurantRepository;
