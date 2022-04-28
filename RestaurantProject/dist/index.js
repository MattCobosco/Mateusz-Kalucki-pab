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
const Restaurant = require('./CoreBusiness/RestaurantModel');
const express = require("express");
const RestaurantRepository_1 = require("./DataStore/RestaurantRepository");
const app = express();
const router = express.Router();
const restaurantRepository = new RestaurantRepository_1.RestaurantRepository();
router.get('/restaurants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let restaurants = yield restaurantRepository.getRestaurants();
    if (restaurants) {
        res.json(restaurants);
    }
    else {
        res.status(404).send("No restaurants found");
    }
}));
router.get('/restaurant/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let restaurant = yield restaurantRepository.getRestaurantByName(req.params.name);
    if (restaurant) {
        res.json(restaurant);
    }
    else {
        res.status(404).send("Restaurant not found");
    }
}));
app.use('/', router);
app.listen(3000);
