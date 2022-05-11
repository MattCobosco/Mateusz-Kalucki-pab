const mongoose = require('mongoose');
const {Customer} = require('./CoreBusiness/CustomerModel');
const {Employee} = require('./CoreBusiness/EmployeeModel');
const {MenuItem} = require ('./CoreBusiness/MenuItemModel');
const {Order} = require('./CoreBusiness/OrderModel');
const {OrderItem} = require('./CoreBusiness/OrderItemModel');
const {Product} = require('./CoreBusiness/ProductModel');
const {Reservation} = require('./CoreBusiness/ReservationModel');
const {Restaurant} = require('./CoreBusiness/RestaurantModel');
const {Table} = require('./CoreBusiness/TableModel');

import express = require ('express');
import bodyParser = require('body-parser');
import {Request, Response} from 'express';

import { CustomerRepository } from './DataStore/CustomerRepository';
import { EmployeeRepository } from './DataStore/EmployeeRepository';
import { MenuItemRepository } from './DataStore/MenuItemRepository';
import { ProductRepository } from './DataStore/ProductRepository';
import { ReservationRepository } from './DataStore/ReservationRepository';
import { RestaurantRepository } from './DataStore/RestaurantRepository';
import { TableRepository } from './DataStore/TableRepository';


const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

const customerRepository = new CustomerRepository();
const employeeRepository = new EmployeeRepository();
const menuItemRepository = new MenuItemRepository();
const productRepository = new ProductRepository();
const reservationRepository = new ReservationRepository();
const restaurantRepository = new RestaurantRepository();
const tableRepository = new TableRepository();

// REST API for Customer
// get all customers
router.get('/customers', async (req: Request, res: Response) => {
    const customers = await customerRepository.getCustomers();
    if (customers.length > 0) 
        res.status(200).json(customers);
    else if(customers.length === 0)
        res.status(404).json({message: 'Customers list is empty'});
    else
        res.status(404).json({message: 'No customer list found'});
});

// get customer by name
router.get('/customers/:name', async (req: Request, res: Response) => {
    const customer = await customerRepository.getCustomerByName(req.params.name);
    if (customer)
        res.status(200).json(customer);
    else
        res.status(404).json({message: 'Customer ' + req.params.name + ' not found'});
});

// delete customer by name
router.delete('/customers/:name', async (req: Request, res: Response) => {
    const customer = await customerRepository.deleteCustomerByName(req.params.name);
    res.status(200).json('Restaurant ' + req.params.name + ' deleted');
});

// add customer from body
router.post('/customers', async (req: Request, res: Response) => {
    const customer = await customerRepository.addCustomer(req.body);
    res.status(200).json(customer);
});

// update customer from body
router.put('/customers/', async (req: Request, res: Response) => {
    const customer = await customerRepository.updateCustomer(req.body);
    res.status(200).json(customer);
});

// add loyalty points to customer
router.put('/customers/:name/loyaltyPoints', async (req: Request, res: Response) => {
    const customer = await customerRepository.addLoyaltyPoints(req.params.name, req.body.points);
    res.status(200).json(customer);
});

// REST API for Restaurant
// get all restaurants
router.get('/restaurants', async (req: Request, res: Response) => {
    let restaurants = await restaurantRepository.getRestaurants();
    if (restaurants.length > 0)
        res.json(restaurants);
    else if (restaurants.length === 0)
        res.status(200).send('Restaurant list is empty');
    else
        res.status(404).send('No restaurants found');
});

// get restaurant by name
router.get('/restaurant/:name', async (req: Request, res: Response) => {
    const restaurant = await restaurantRepository.getRestaurantByName(req.params.name);
    if (restaurant)
        res.json(restaurant);
    else
        res.status(404).send('Restaurant not found');
});

// delete restaurant by name
router.delete('/restaurant/:name', async (req: Request, res: Response) => {
    await restaurantRepository.deleteRestaurantByName(req.params.name);
    res.status(200).send('Restaurant deleted');
});

// add a restaurant from body
router.post('/restaurant', async (req: Request, res: Response) => {
    const restaurant = req.body;
    await restaurantRepository.addRestaurant(restaurant);
    res.status(200).send('Restaurant added');
});

// update restaurant from body
router.put('/restaurant/', async (req: Request, res: Response) => {
    const restaurant = await restaurantRepository.updateRestaurant(req.body);
    res.status(200).json(restaurant);
});

app.listen(3000);