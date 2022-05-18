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
import { EmployeeRepository } from './DataStore/EmployeeRepository';
import { MenuItemRepository } from './DataStore/MenuItemRepository';
import { OrderRepository } from './DataStore/OrderRepository';
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
const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();
const reservationRepository = new ReservationRepository();
const restaurantRepository = new RestaurantRepository();
const tableRepository = new TableRepository();

// DATABASE POPULATION:
customerRepository.populateCustomers();
employeeRepository.populateEmployees();
menuItemRepository.populateMenuItems();
// orderRepository.populateOrders();
productRepository.populateProducts();
reservationRepository.populateReservations();
restaurantRepository.populateRestaurants();
tableRepository.populateTables();

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
router.put('/customer/:name', async (req: Request, res: Response) => {
    await customerRepository.updateCustomer(req.params.name, req.body)
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

// REST API for Employee
// get all employees
router.get('/employees', async (req: Request, res: Response) => {
    await employeeRepository.getEmployees()
    .then(function(employees: any)
    {
        res.send(employees);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get employee by surname
router.get('/employee/:name', async (req: Request, res: Response) => {
    await employeeRepository.getEmployeeBySurname(req.params.name)
    .then(function(employee: any)
    {
        res.send(employee);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// delete employee by surname
router.delete('/employee/:name', async (req: Request, res: Response) => {
    await employeeRepository.deleteEmployeeBySurname(req.params.name)
    .then(function()
    {
        res.send("Employee " + req.params.name + " has been deleted!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// add employee from request body
router.post('/employee', async (req: Request, res: Response) => {
    await employeeRepository.addEmployee(req.body)
    .then(function()
    {
        res.send("Employee " + req.body.name + " has been added!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// update employee from request body
router.put('/employee/:name', async (req: Request, res: Response) => {
    await employeeRepository.updateEmployee(req.params.name, req.body)
    .then(function()
    {
        res.send("Employee " + req.body.name + " has been updated!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// REST API for Menu Item
// get all menu items
router.get('/menuItems', async (req: Request, res: Response) => {
    await menuItemRepository.getMenuItems()
    .then(function(menuItems: any)
    {
        res.send(menuItems);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get menu item by name
router.get('/menuItem/:name', async (req: Request, res: Response) => {
    await menuItemRepository.getMenuItemByName(req.params.name)
    .then(function(menuItem: any)
    {
        res.send(menuItem);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// delete menu item by name
router.delete('/menuItem/:name', async (req: Request, res: Response) => {
    await menuItemRepository.deleteMenuItemByName(req.params.name)
    .then(function()
    {
        res.send("Menu Item " + req.params.name + " has been deleted!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// add menu item from request body
router.post('/menuItem', async (req: Request, res: Response) => {
    await menuItemRepository.addMenuItem(req.body)
    .then(function()
    {
        res.send("Menu Item " + req.body.name + " has been added!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// update menu item from request body
router.put('/menuItem/:name', async (req: Request, res: Response) => {
    await menuItemRepository.updateMenuItem(req.params.name, req.body)
    .then(function()
    {
        res.send("Menu Item " + req.body.name + " has been updated!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get menu grouped by type
router.get('/menu', async (req: Request, res: Response) => {
    await menuItemRepository.getMenu()
    .then(function(menu: any)
    {
        res.send(menu);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// REST API for Order
// get all orders
router.get('/orders', async (req: Request, res: Response) => {
    await orderRepository.getOrders()
    .then(function(orders: any)
    {
        res.send(orders);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get order by id
router.get('/order/:id', async (req: Request, res: Response) => {
    await orderRepository.getOrderById(req.params.id)
    .then(function(order: any)
    {
        res.send(order);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// delete order by id
router.delete('/order/:id', async (req: Request, res: Response) => {
    await orderRepository.deleteOrderById(req.params.id)
    .then(function()
    {
        res.send("Order " + req.params.id + " has been deleted!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// add order from request body
router.post('/order', async (req: Request, res: Response) => {
    await orderRepository.addOrder(req.body)
    .then(function()
    {
        res.send("Order " + req.body.id + " has been added!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// update order from request body
router.put('/order/:id', async (req: Request, res: Response) => {
    await orderRepository.updateOrderById(req.params.id, req.body)
    .then(function()
    {
        res.send("Order " + req.body.id + " has been updated!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get orders by employee id
router.get('/orders/employee/:id', async (req: Request, res: Response) => {
    await orderRepository.getOrdersByEmployeeId(req.params.id)
    .then(function(orders: any)
    {
        res.send(orders);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get orders in a given time period
router.get('/orders/time/:start/:end', async (req: Request, res: Response) => {
    await orderRepository.getOrdersByTimePeriod(new Date(req.params.start), new Date(req.params.end))
    .then(function(orders: any)
    {
        res.send(orders);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get income in a given time period
router.get('/income/time/:start/:end', async (req: Request, res: Response) => {
    await orderRepository.getIncomeByTimePeriod(new Date(req.params.start), new Date(req.params.end))
    .then(function(income: any)
    {
        res.send(income);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});


// REST API for Product in Storage
// get all products
router.get('/products', async (req: Request, res: Response) => {
    await productRepository.getProducts()
    .then(function(products: any)
    {
        res.send(products);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get product by name
router.get('/product/:name', async (req: Request, res: Response) => {
    await productRepository.getProductByName(req.params.name)
    .then(function(product: any)
    {
        res.send(product);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// delete product by name
router.delete('/product/:name', async (req: Request, res: Response) => {
    await productRepository.deleteProductByName(req.params.name)
    .then(function()
    {
        res.send("Product " + req.params.name + " has been deleted!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// add product from request body
router.post('/product', async (req: Request, res: Response) => {
    await productRepository.addProduct(req.body)
    .then(function()
    {
        res.send("Product " + req.body.name + " has been added!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// update product from request body
router.put('/product/:name', async (req: Request, res: Response) => {
    await productRepository.updateProduct(req.params.name, req.body)
    .then(function()
    {
        res.send("Product " + req.body.name + " has been updated!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// REST API for Reservation
// get all reservations
router.get('/reservations', async (req: Request, res: Response) => {
    await reservationRepository.getReservations()
    .then(function(reservations: any)
    {
        res.send(reservations);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get reservation by id
router.get('/reservation/:id', async (req: Request, res: Response) => {
    await reservationRepository.getReservationById(req.params.id)
    .then(function(reservation: any)
    {
        res.send(reservation);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// delete reservation by id
router.delete('/reservation/:id', async (req: Request, res: Response) => {
    await reservationRepository.deleteReservationById(req.params.id)
    .then(function()
    {
        res.send("Reservation " + req.params.id + " has been deleted!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// add reservation from request body
router.post('/reservation', async (req: Request, res: Response) => {
    await reservationRepository.addReservation(req.body)
    .then(function()
    {
        res.send("Reservation " + req.body.id + " has been added!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// update reservation from request body
router.put('/reservation/:id', async (req: Request, res: Response) => {
    await reservationRepository.updateReservationById(req.params.id, req.body)
    .then(function()
    {
        res.send("Reservation " + req.params.id + " has been updated!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get reservations by customer id
router.get('/reservations/customer/:id', async (req: Request, res: Response) => {
    await reservationRepository.getReservationsByCustomerId(req.params.id)
    .then(function(reservations: any)
    {
        res.send(reservations);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get reservations by table id
router.get('/reservations/table/:id', async (req: Request, res: Response) => {
    await reservationRepository.getReservationsByTableId(req.params.id)
    .then(function(reservations: any)
    {
        res.send(reservations);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});


// REST API for Restaurant
// get all restaurants
router.get('/restaurants', async (req: Request, res: Response) => {
    await restaurantRepository.getRestaurants()
    .then(function(restaurants: any)
    {
        res.send(restaurants);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get restaurant by name
router.get('/restaurant/:name', async (req: Request, res: Response) => {
    await restaurantRepository.getRestaurantByName(req.params.name)
    .then(function(restaurant: any)
    {
        res.send(restaurant);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// delete restaurant by name
router.delete('/restaurant/:name', async (req: Request, res: Response) => {
    await restaurantRepository.deleteRestaurantByName(req.params.name);
    res.status(200).send('Restaurant deleted');
});

// add a restaurant from request body
router.post('/restaurant', async (req: Request, res: Response) => {
    const restaurant = req.body;
    await restaurantRepository.addRestaurant(restaurant);
    res.status(200).send('Restaurant added');
});

// update restaurant from request body
router.put('/restaurant/:name', async (req: Request, res: Response) => {
    const restaurant = await restaurantRepository.updateRestaurant(req.params.name, req.body);
    res.status(200).send(restaurant);
});

// REST API for Table
// get all tables
router.get('/tables', async (req: Request, res: Response) => {
    await tableRepository.getTables()
    .then(function(tables: any)
    {
        res.send(tables);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get table by number
router.get('/table/:number', async (req: Request, res: Response) => {
    await tableRepository.getTableByNumber(+req.params.number)
    .then(function(table: any)
    {
        res.send(table);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// delete table by number
router.delete('/table/:number', async (req: Request, res: Response) => {
    await tableRepository.deleteTableByNumber(+req.params.number)
    .then(function()
    {
        res.send("Table " + +req.params.number + " has been deleted!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// add table from request body
router.post('/table', async (req: Request, res: Response) => {
    await tableRepository.addTable(req.body)
    .then(function()
    {
        res.send("Table " + req.body.number + " has been added!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// update table from request body
router.put('/table/:number', async (req: Request, res: Response) => {
    await tableRepository.updateTableByNumber(+req.params.number, req.body)
    .then(function()
    {
        res.send("Table " + req.params.number + " has been updated!");
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

// get free tables in a given time period for a given number of people from body request
router.post('/tables/free', async (req: Request, res: Response) => {
    await tableRepository.getFreeTables(new Date(req.body.startDateTime), new Date(req.body.endDateTime), req.body.people)
    .then(function(tables: any)
    {
        res.send(tables);
    }).catch(function(err: any)
    {
        res.send(err);
    });
});

app.listen(3000);