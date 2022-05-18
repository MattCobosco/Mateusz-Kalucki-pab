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
const { Customer } = require('./CoreBusiness/CustomerModel');
const { Employee } = require('./CoreBusiness/EmployeeModel');
const { MenuItem } = require('./CoreBusiness/MenuItemModel');
const { Order } = require('./CoreBusiness/OrderModel');
const { Product } = require('./CoreBusiness/ProductModel');
const { Reservation } = require('./CoreBusiness/ReservationModel');
const { Restaurant } = require('./CoreBusiness/RestaurantModel');
const { Table } = require('./CoreBusiness/TableModel');
const express = require("express");
const bodyParser = require("body-parser");
const CustomerRepository_1 = require("./DataStore/CustomerRepository");
const EmployeeRepository_1 = require("./DataStore/EmployeeRepository");
const MenuItemRepository_1 = require("./DataStore/MenuItemRepository");
// import { OrderRepository } from './DataStore/OrderRepository';
const ProductRepository_1 = require("./DataStore/ProductRepository");
const ReservationRepository_1 = require("./DataStore/ReservationRepository");
const RestaurantRepository_1 = require("./DataStore/RestaurantRepository");
const TableRepository_1 = require("./DataStore/TableRepository");
const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
const customerRepository = new CustomerRepository_1.CustomerRepository();
const employeeRepository = new EmployeeRepository_1.EmployeeRepository();
const menuItemRepository = new MenuItemRepository_1.MenuItemRepository();
// const orderRepository = new OrderRepository();
const productRepository = new ProductRepository_1.ProductRepository();
const reservationRepository = new ReservationRepository_1.ReservationRepository();
const restaurantRepository = new RestaurantRepository_1.RestaurantRepository();
const tableRepository = new TableRepository_1.TableRepository();
// DATABASE POPULATION:
customerRepository.populateCustomers();
employeeRepository.populateEmployees();
menuItemRepository.populateMenuItems();
productRepository.populateProducts();
reservationRepository.populateReservations();
restaurantRepository.populateRestaurants();
tableRepository.populateTables();
// REST API for Customer
// get all customers
router.get('/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customerRepository.getCustomers()
        .then(function (customers) {
        res.send(customers);
    }).catch(function (err) {
        res.send(err);
    });
}));
// get customer by name
router.get('/customer/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customerRepository.getCustomerByName(req.params.name)
        .then(function (customer) {
        res.send(customer);
    }).catch(function (err) {
        res.send(err);
    });
}));
// delete customer by name
router.delete('/customer/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customerRepository.deleteCustomerByName(req.params.name)
        .then(function () {
        res.send("Customer " + req.params.name + " has been deleted!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// add customer from request body
router.post('/customer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customerRepository.addCustomer(req.body)
        .then(function () {
        res.send("Customer " + req.body.name + " has been added!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// update customer from request body
router.put('/customer/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customerRepository.updateCustomer(req.params.name, req.body)
        .then(function () {
        res.send("Customer " + req.body.name + " has been updated!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// add loyalty points to customer
router.put('/customer/:name/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customerRepository.addLoyaltyPoints(req.params.name, req.body.loyaltyPoints)
        .then(function () {
        res.send(req.body.loyaltyPoints + " loyalty points for " + req.params.name + "!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// REST API for Employee
// get all employees
router.get('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield employeeRepository.getEmployees()
        .then(function (employees) {
        res.send(employees);
    }).catch(function (err) {
        res.send(err);
    });
}));
// get employee by surname
router.get('/employee/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield employeeRepository.getEmployeeBySurname(req.params.name)
        .then(function (employee) {
        res.send(employee);
    }).catch(function (err) {
        res.send(err);
    });
}));
// delete employee by surname
router.delete('/employee/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield employeeRepository.deleteEmployeeBySurname(req.params.name)
        .then(function () {
        res.send("Employee " + req.params.name + " has been deleted!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// add employee from request body
router.post('/employee', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield employeeRepository.addEmployee(req.body)
        .then(function () {
        res.send("Employee " + req.body.name + " has been added!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// update employee from request body
router.put('/employee/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield employeeRepository.updateEmployee(req.params.name, req.body)
        .then(function () {
        res.send("Employee " + req.body.name + " has been updated!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// REST API for Menu Item
// get all menu items
router.get('/menuItems', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menuItemRepository.getMenuItems()
        .then(function (menuItems) {
        res.send(menuItems);
    }).catch(function (err) {
        res.send(err);
    });
}));
// get menu item by name
router.get('/menuItem/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menuItemRepository.getMenuItemByName(req.params.name)
        .then(function (menuItem) {
        res.send(menuItem);
    }).catch(function (err) {
        res.send(err);
    });
}));
// delete menu item by name
router.delete('/menuItem/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menuItemRepository.deleteMenuItemByName(req.params.name)
        .then(function () {
        res.send("Menu Item " + req.params.name + " has been deleted!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// add menu item from request body
router.post('/menuItem', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menuItemRepository.addMenuItem(req.body)
        .then(function () {
        res.send("Menu Item " + req.body.name + " has been added!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// update menu item from request body
router.put('/menuItem/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menuItemRepository.updateMenuItem(req.params.name, req.body)
        .then(function () {
        res.send("Menu Item " + req.body.name + " has been updated!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// get menu grouped by type
router.get('/menu', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menuItemRepository.getMenu()
        .then(function (menu) {
        res.send(menu);
    }).catch(function (err) {
        res.send(err);
    });
}));
// REST API for Product in Storage
// get all products
router.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productRepository.getProducts()
        .then(function (products) {
        res.send(products);
    }).catch(function (err) {
        res.send(err);
    });
}));
// get product by name
router.get('/product/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productRepository.getProductByName(req.params.name)
        .then(function (product) {
        res.send(product);
    }).catch(function (err) {
        res.send(err);
    });
}));
// delete product by name
router.delete('/product/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productRepository.deleteProductByName(req.params.name)
        .then(function () {
        res.send("Product " + req.params.name + " has been deleted!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// add product from request body
router.post('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productRepository.addProduct(req.body)
        .then(function () {
        res.send("Product " + req.body.name + " has been added!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// update product from request body
router.put('/product/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productRepository.updateProduct(req.params.name, req.body)
        .then(function () {
        res.send("Product " + req.body.name + " has been updated!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// REST API for Reservation
// get all reservations
router.get('/reservations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.getReservations()
        .then(function (reservations) {
        res.send(reservations);
    }).catch(function (err) {
        res.send(err);
    });
}));
// get reservation by id
router.get('/reservation/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.getReservationById(req.params.id)
        .then(function (reservation) {
        res.send(reservation);
    }).catch(function (err) {
        res.send(err);
    });
}));
// delete reservation by id
router.delete('/reservation/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.deleteReservationById(req.params.id)
        .then(function () {
        res.send("Reservation " + req.params.id + " has been deleted!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// add reservation from request body
router.post('/reservation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.addReservation(req.body)
        .then(function () {
        res.send("Reservation " + req.body.id + " has been added!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// update reservation from request body
router.put('/reservation/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.updateReservationById(req.params.id, req.body)
        .then(function () {
        res.send("Reservation " + req.params.id + " has been updated!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// get reservations by customer id
router.get('/reservations/customer/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.getReservationsByCustomerId(req.params.id)
        .then(function (reservations) {
        res.send(reservations);
    }).catch(function (err) {
        res.send(err);
    });
}));
// get reservations by table id
router.get('/reservations/table/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.getReservationsByTableId(req.params.id)
        .then(function (reservations) {
        res.send(reservations);
    }).catch(function (err) {
        res.send(err);
    });
}));
// REST API for Restaurant
// get all restaurants
router.get('/restaurants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurantRepository.getRestaurants()
        .then(function (restaurants) {
        res.send(restaurants);
    }).catch(function (err) {
        res.send(err);
    });
}));
// get restaurant by name
router.get('/restaurant/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurantRepository.getRestaurantByName(req.params.name)
        .then(function (restaurant) {
        res.send(restaurant);
    }).catch(function (err) {
        res.send(err);
    });
}));
// delete restaurant by name
router.delete('/restaurant/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurantRepository.deleteRestaurantByName(req.params.name);
    res.status(200).send('Restaurant deleted');
}));
// add a restaurant from request body
router.post('/restaurant', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = req.body;
    yield restaurantRepository.addRestaurant(restaurant);
    res.status(200).send('Restaurant added');
}));
// update restaurant from request body
router.put('/restaurant/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurantRepository.updateRestaurant(req.params.name, req.body);
    res.status(200).send(restaurant);
}));
// REST API for Table
// get all tables
router.get('/tables', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tableRepository.getTables()
        .then(function (tables) {
        res.send(tables);
    }).catch(function (err) {
        res.send(err);
    });
}));
// get table by number
router.get('/table/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tableRepository.getTableByNumber(+req.params.number)
        .then(function (table) {
        res.send(table);
    }).catch(function (err) {
        res.send(err);
    });
}));
// delete table by number
router.delete('/table/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tableRepository.deleteTableByNumber(+req.params.number)
        .then(function () {
        res.send("Table " + +req.params.number + " has been deleted!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// add table from request body
router.post('/table', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tableRepository.addTable(req.body)
        .then(function () {
        res.send("Table " + req.body.number + " has been added!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// update table from request body
router.put('/table/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tableRepository.updateTableByNumber(+req.params.number, req.body)
        .then(function () {
        res.send("Table " + req.params.number + " has been updated!");
    }).catch(function (err) {
        res.send(err);
    });
}));
// get free tables in a given time period for a given number of people from body request
router.post('/tables/free', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tableRepository.getFreeTables(new Date(req.body.startDateTime), new Date(req.body.endDateTime), req.body.people)
        .then(function (tables) {
        res.send(tables);
    }).catch(function (err) {
        res.send(err);
    });
}));
app.listen(3000);
