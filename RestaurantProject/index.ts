const mongoose = require('mongoose');
const Restaurant = require('./CoreBusiness/RestaurantModel');
import express = require ('express');
import {Request, Response} from 'express';

import { RestaurantRepository } from "./DataStore/RestaurantRepository";
const app = express();
const router = express.Router();

const restaurantRepository = new RestaurantRepository();

router.get('/restaurants', async (req: Request, res: Response) => {
    let restaurants = await restaurantRepository.getRestaurants();
    if (restaurants) {
        res.json(restaurants);
    } else {
        res.status(404).send("No restaurants found");
    }
});

router.get('/restaurant/:name', async (req: Request, res: Response) => {
    let restaurant = await restaurantRepository.getRestaurantByName(req.params.name);
    if (restaurant)
    {
        res.json(restaurant);
    }
    else
    {
        res.status(404).send("Restaurant not found");
    }
});

app.use('/', router);

app.listen(3000);