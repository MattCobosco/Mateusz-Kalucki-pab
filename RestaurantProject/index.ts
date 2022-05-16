const mongoose = require('mongoose');
const {Customer} = require('./CoreBusiness/CustomerModel');
const {Employee} = require('./CoreBusiness/EmployeeModel');
const {MenuItem} = require ('./CoreBusiness/MenuItemModel');
const {Order} = require('./CoreBusiness/OrderModel');
const {Product} = require('./CoreBusiness/ProductModel');
const {Reservation} = require('./CoreBusiness/ReservationModel');
const {Restaurant} = require('./CoreBusiness/RestaurantModel');
const {Table} = require('./CoreBusiness/TableModel');

import express = require ('express');
import bodyParser = require('body-parser');
import {Request, Response} from 'express';


import { CustomerRepository } from './DataStore/CustomerRepository';
/*
import { EmployeeRepository } from './DataStore/EmployeeRepository';
import { MenuItemRepository } from './DataStore/MenuItemRepository';
import { OrderRepository } from './DataStore/OrderRepository';
import { ProductRepository } from './DataStore/ProductRepository';
import { ReservationRepository } from './DataStore/ReservationRepository';
*/
import { RestaurantRepository } from './DataStore/RestaurantRepository';
//import { TableRepository } from './DataStore/TableRepository';


const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);


const customerRepository = new CustomerRepository();
/*
const employeeRepository = new EmployeeRepository();
const menuItemRepository = new MenuItemRepository();
const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();
const reservationRepository = new ReservationRepository();
*/
const restaurantRepository = new RestaurantRepository();
// const tableRepository = new TableRepository();

// restaurantRepository.populateRestaurants();
// customerRepository.populateCustomers();

// REST API for Customer
// get all customers
router.get('/customers', async (req: Request, res: Response) => {
    await customerRepository.getCustomers()
    .then(function(customers: any)
    {
        res.send(customers);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get customer by name
router.get('/customer/:name', async (req: Request, res: Response) => {
    await customerRepository.getCustomerByName(req.params.name)
    .then(function(customer: any)
    {
        res.send(customer);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// delete customer by name
router.delete('/customer/:name', async (req: Request, res: Response) => {
    await customerRepository.deleteCustomerByName(req.params.name)
    .then(function()
    {
        res.send("Customer " + req.params.name + " has been deleted!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// add customer from request body
router.post('/customer', async (req: Request, res: Response) => {
    await customerRepository.addCustomer(req.body)
    .then(function()
    {
        res.send("Customer " + req.body.name + " has been added!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// update customer from request body
router.put('/customer', async (req: Request, res: Response) => {
    await customerRepository.updateCustomer(req.body)
    .then(function()
    {
        res.send("Customer " + req.body.name + " has been updated!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// add loyalty points to customer
router.put('/customer/:name/', async (req: Request, res: Response) => {
    await customerRepository.addLoyaltyPoints(req.params.name, req.body.loyaltyPoints)
    .then(function()
    {
        res.send(req.body.loyaltyPoints + " loyalty points for " + req.params.name + "!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// REST API for Restaurant
// get all restaurants
router.get('/restaurants', async (req: Request, res: Response) => {
    let restaurants = await restaurantRepository.getRestaurants();
    if (restaurants.length > 0)
        res.json(restaurants);
    else if (restaurants.length === 0)
        res.status(200).json('Restaurant list is empty');
    else
        res.status(404).json('No restaurants found');
});

// get restaurant by name
router.get('/restaurant/:name', async (req: Request, res: Response) => {
    const restaurant = await restaurantRepository.getRestaurantByName(req.params.name);
    if (restaurant)
        res.json(restaurant);
    else
        res.status(404).json('Restaurant not found');
});

// delete restaurant by name
router.delete('/restaurant/:name', async (req: Request, res: Response) => {
    await restaurantRepository.deleteRestaurantByName(req.params.name);
    res.status(200).json('Restaurant deleted');
});

// add a restaurant from request body
router.post('/restaurant', async (req: Request, res: Response) => {
    const restaurant = req.body;
    await restaurantRepository.addRestaurant(restaurant);
    res.status(200).json('Restaurant added');
});

// update restaurant from request body
router.put('/restaurant/', async (req: Request, res: Response) => {
    const restaurant = await restaurantRepository.updateRestaurant(req.body);
    res.status(200).json(restaurant);
});

app.listen(3000);