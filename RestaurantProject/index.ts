const mongoose = require('mongoose');
const {Restaurant} = require('./CoreBusiness/RestaurantModel');
import express = require ('express');
import bodyParser = require('body-parser');
import {Request, Response} from 'express';

import { RestaurantRepository } from "./DataStore/RestaurantRepository";
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

const restaurantRepository = new RestaurantRepository();

router.get('/restaurants', async (req: Request, res: Response) => {
    let restaurants = await restaurantRepository.getRestaurants();
    if (restaurants.length > 0)
        res.json(restaurants);
    else if (restaurants.length == 0)
        res.status(200).send("Restaurant list is empty");
    else
        res.status(404).send("No restaurants found");
});

router.get('/restaurant/:name', async (req: Request, res: Response) => {
    const restaurant = await restaurantRepository.getRestaurantByName(req.params.name);
    if (restaurant)
        res.json(restaurant);
    else
        res.status(404).send("Restaurant not found");
});

router.delete('/restaurant/:name', async (req: Request, res: Response) => {
    await restaurantRepository.deleteRestaurantByName(req.params.name);
    res.status(200).send("Restaurant deleted");
});

router.post('/restaurant', async (req: Request, res: Response) => {
    const restaurant = req.body;
    await restaurantRepository.addRestaurant(restaurant);
    res.status(200).send("Restaurant added");
});

app.listen(3000);