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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const RestaurantRepository_1 = require("./DataStore/RestaurantRepository");
const restaurantRepository = new RestaurantRepository_1.RestaurantRepository();
// if restaurant collection is empty, populate it with some data
population();
function population() {
    return __awaiter(this, void 0, void 0, function* () {
        // check if restaurant collection exists
        yield mongoose.connection.db.listCollections({ name: 'Restaurant' })
            .next(function (err, collinfo) {
            if (collinfo) {
                console.log("Restaurant collection exists");
            }
            else {
                restaurantRepository.populateRestaurants();
            }
        });
    });
}
