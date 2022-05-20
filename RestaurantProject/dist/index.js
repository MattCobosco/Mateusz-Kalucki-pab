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
const express = require("express");
const bodyParser = require("body-parser");
const CustomerRepository_1 = require("./DataStore/CustomerRepository");
// import { EmployeeRepository } from './DataStore/EmployeeRepository';
// import { MenuItemRepository } from './DataStore/MenuItemRepository';
// import { OrderRepository } from './DataStore/OrderRepository';
const ProductRepository_1 = require("./DataStore/ProductRepository");
// import { ReservationRepository } from './DataStore/ReservationRepository';
const RestaurantRepository_1 = require("./DataStore/RestaurantRepository");
// import { TableRepository } from './DataStore/TableRepository';
const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
const customerRepository = new CustomerRepository_1.CustomerRepository();
// const employeeRepository = new EmployeeRepository();
// const menuItemRepository = new MenuItemRepository();
// const orderRepository = new OrderRepository();
const productRepository = new ProductRepository_1.ProductRepository();
// const reservationRepository = new ReservationRepository();
const restaurantRepository = new RestaurantRepository_1.RestaurantRepository();
// const tableRepository = new TableRepository();
// DATABASE POPULATION:
customerRepository.populateCustomers();
// employeeRepository.populateEmployees();
// menuItemRepository.populateMenuItems();
// orderRepository.populateOrders();
productRepository.populateProducts();
// reservationRepository.populateReservations();
restaurantRepository.populateRestaurants();
// tableRepository.populateTables();
// REST API for Customer
// get all customers
router.get('/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customerRepository.getCustomers()
        .then(function (customers) {
        if (customers)
            res.status(200).send(customers);
        else
            res.status(404).send("Customers could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// get customer by name
router.get('/customer/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customerRepository.getCustomerByName(req.params.name)
        .then(function (customer) {
        if (customer)
            res.status(200).send(customer);
        else
            res.status(404).send("Customer " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// delete customer by name
router.delete('/customer/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customerRepository.deleteCustomerByName(req.params.name)
        .then(function (customerDeleted) {
        if (customerDeleted)
            res.status(200).send("Customer " + req.params.name + " has been successfully deleted.");
        else
            res.status(404).send("Customer " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// add customer from request body
router.post('/customer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.body;
    yield customerRepository.addCustomer(customer)
        .then(function (customerAdded) {
        if (customerAdded)
            res.status(201).send("Customer " + customer.name + " has been successfully added.");
        else
            res.status(404).send("Customer " + customer.name + " already exists.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// update customer from request body
router.put('/customer/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customerRepository.updateCustomer(req.params.name, req.body)
        .then(function (customerUpdated) {
        if (customerUpdated)
            res.status(200).send("Customer " + req.params.name + " has been successfully updated.");
        else
            res.status(404).send("Customer " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// add loyalty points to customer
router.put('/customer/:name/:loyaltyPoints', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customerRepository.addLoyaltyPoints(req.params.name, +req.params.loyaltyPoints)
        .then(function (loyaltyPointsAdded) {
        if (loyaltyPointsAdded)
            res.status(200).send(req.params.loyaltyPoints + " loyalty points to " + req.params.name + ".");
        else
            res.status(400).send("Customer " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// // REST API for Employee
// // get all employees
// router.get('/employees', async (req: Request, res: Response) => {
//     await employeeRepository.getEmployees()
//     .then(function(employees: any)
//     {
//         res.send(employees);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get employee by surname
// router.get('/employee/:name', async (req: Request, res: Response) => {
//     await employeeRepository.getEmployeeBySurname(req.params.name)
//     .then(function(employee: any)
//     {
//         res.send(employee);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // delete employee by surname
// router.delete('/employee/:name', async (req: Request, res: Response) => {
//     await employeeRepository.deleteEmployeeBySurname(req.params.name)
//     .then(function()
//     {
//         res.send('Employee ' + req.params.name + ' has been deleted!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // add employee from request body
// router.post('/employee', async (req: Request, res: Response) => {
//     await employeeRepository.addEmployee(req.body)
//     .then(function()
//     {
//         res.send('Employee ' + req.body.name + ' has been added!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // update employee from request body
// router.put('/employee/:name', async (req: Request, res: Response) => {
//     await employeeRepository.updateEmployee(req.params.name, req.body)
//     .then(function()
//     {
//         res.send('Employee ' + req.body.name + ' has been updated!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // REST API for Menu Item
// // get all menu items
// router.get('/menuItems', async (req: Request, res: Response) => {
//     await menuItemRepository.getMenuItems()
//     .then(function(menuItems: any)
//     {
//         res.send(menuItems);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get menu item by name
// router.get('/menuItem/:name', async (req: Request, res: Response) => {
//     await menuItemRepository.getMenuItemByName(req.params.name)
//     .then(function(menuItem: any)
//     {
//         res.send(menuItem);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // delete menu item by name
// router.delete('/menuItem/:name', async (req: Request, res: Response) => {
//     await menuItemRepository.deleteMenuItemByName(req.params.name)
//     .then(function()
//     {
//         res.send('Menu Item ' + req.params.name + ' has been deleted!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // add menu item from request body
// router.post('/menuItem', async (req: Request, res: Response) => {
//     await menuItemRepository.addMenuItem(req.body)
//     .then(function()
//     {
//         res.send('Menu Item ' + req.body.name + ' has been added!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // update menu item from request body
// router.put('/menuItem/:name', async (req: Request, res: Response) => {
//     await menuItemRepository.updateMenuItem(req.params.name, req.body)
//     .then(function()
//     {
//         res.send('Menu Item ' + req.body.name + ' has been updated!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get menu grouped by type
// router.get('/menu', async (req: Request, res: Response) => {
//     await menuItemRepository.getMenu()
//     .then(function(menu: any)
//     {
//         res.send(menu);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // REST API for Order
// // get all orders
// router.get('/orders', async (req: Request, res: Response) => {
//     await orderRepository.getOrders()
//     .then(function(orders: any)
//     {
//         res.send(orders);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get order by id
// router.get('/order/:id', async (req: Request, res: Response) => {
//     await orderRepository.getOrderById(req.params.id)
//     .then(function(order: any)
//     {
//         res.send(order);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // delete order by id
// router.delete('/order/:id', async (req: Request, res: Response) => {
//     await orderRepository.deleteOrderById(req.params.id)
//     .then(function()
//     {
//         res.send('Order ' + req.params.id + ' has been deleted!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // add order from request body
// router.post('/order', async (req: Request, res: Response) => {
//     await orderRepository.addOrder(req.body)
//     .then(function()
//     {
//         res.send('Order ' + req.body.id + ' has been added!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // update order from request body
// router.put('/order/:id', async (req: Request, res: Response) => {
//     await orderRepository.updateOrderById(req.params.id, req.body)
//     .then(function()
//     {
//         res.send('Order ' + req.body.id + ' has been updated!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get orders by employee id
// router.get('/orders/employee/:id', async (req: Request, res: Response) => {
//     await orderRepository.getOrdersByEmployeeId(req.params.id)
//     .then(function(orders: any)
//     {
//         res.send(orders);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get orders in a given time period
// router.get('/orders/time/:start/:end', async (req: Request, res: Response) => {
//     await orderRepository.getOrdersByTimePeriod(new Date(req.params.start), new Date(req.params.end))
//     .then(function(orders: any)
//     {
//         res.send(orders);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get income in a given time period
// router.get('/income/time/:start/:end', async (req: Request, res: Response) => {
//     await orderRepository.getIncomeByTimePeriod(new Date(req.params.start), new Date(req.params.end))
//     .then(function(income: any)
//     {
//         res.send(income);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// REST API for Product in Storage
// get all products
router.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productRepository.getProducts()
        .then(function (products) {
        if (products)
            res.status(200).send(products);
        else
            res.status(404).send("Products could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// get product by name
router.get('/product/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productRepository.getProductByName(req.params.name)
        .then(function (product) {
        if (product)
            res.status(200).send(product);
        else
            res.status(404).send("Product " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// delete product by name
router.delete('/product/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productRepository.deleteProductByName(req.params.name)
        .then(function (productDeleted) {
        if (productDeleted)
            res.status(200).send("Product " + req.params.name + " has been successfully deleted.");
        else
            res.status(404).send("Product " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// add product from request body
router.post('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    yield productRepository.addProduct(product)
        .then(function (productAdded) {
        if (productAdded)
            res.status(201).send("Product " + product.name + " has been successfully added.");
        else
            res.status(400).send("Product " + product.name + " already exists.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// update product from request body
router.put('/product/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productRepository.updateProduct(req.params.name, req.body)
        .then(function (productUpdated) {
        if (productUpdated)
            res.status(200).send("Product " + req.params.name + " has been successfully updated.");
        else
            res.status(404).send("Product " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// // REST API for Reservation
// // get all reservations
// router.get('/reservations', async (req: Request, res: Response) => {
//     await reservationRepository.getReservations()
//     .then(function(reservations: any)
//     {
//         res.send(reservations);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get reservation by id
// router.get('/reservation/:id', async (req: Request, res: Response) => {
//     await reservationRepository.getReservationById(req.params.id)
//     .then(function(reservation: any)
//     {
//         res.send(reservation);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // delete reservation by id
// router.delete('/reservation/:id', async (req: Request, res: Response) => {
//     await reservationRepository.deleteReservationById(req.params.id)
//     .then(function()
//     {
//         res.send('Reservation ' + req.params.id + ' has been deleted!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // add reservation from request body
// router.post('/reservation', async (req: Request, res: Response) => {
//     await reservationRepository.addReservation(req.body)
//     .then(function()
//     {
//         res.send('Reservation ' + req.body.id + ' has been added!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // update reservation from request body
// router.put('/reservation/:id', async (req: Request, res: Response) => {
//     await reservationRepository.updateReservationById(req.params.id, req.body)
//     .then(function()
//     {
//         res.send('Reservation ' + req.params.id + ' has been updated!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get reservations by customer id
// router.get('/reservations/customer/:id', async (req: Request, res: Response) => {
//     await reservationRepository.getReservationsByCustomerId(req.params.id)
//     .then(function(reservations: any)
//     {
//         res.send(reservations);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get reservations by table id
// router.get('/reservations/table/:id', async (req: Request, res: Response) => {
//     await reservationRepository.getReservationsByTableId(req.params.id)
//     .then(function(reservations: any)
//     {
//         res.send(reservations);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// REST API for Restaurant
// get all restaurants
router.get('/restaurants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurantRepository.getRestaurants()
        .then(function (restaurants) {
        if (restaurants)
            res.status(200).send(restaurants);
        else
            res.status(404).send("Restaurants could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// get restaurant by name
router.get('/restaurant/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurantRepository.getRestaurantByName(req.params.name)
        .then(function (restaurant) {
        if (restaurant)
            res.status(200).send(restaurant);
        else
            res.status(404).send("Restaurant " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// delete restaurant by name
router.delete('/restaurant/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantDeleted = yield restaurantRepository.deleteRestaurantByName(req.params.name);
    if (restaurantDeleted)
        res.status(200).send("Restaurant " + req.params.name + " has been successfully deleted.");
    else
        res.status(404).send("Restaurant " + req.params.name + " could not be found.");
}));
// add a restaurant from request body
router.post('/restaurant', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = req.body;
    const restaurantAdded = yield restaurantRepository.addRestaurant(restaurant);
    if (restaurantAdded)
        res.status(201).send("Restaurant " + restaurant.name + " has been successfully added.");
    else
        res.status(400).send("Restaurant " + restaurant.name + " already exists.");
}));
// update restaurant from request body
router.put('/restaurant/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantUpdated = yield restaurantRepository.updateRestaurant(req.params.name, req.body);
    if (restaurantUpdated)
        res.status(200).send("Restaurant " + req.params.name + " has been successfully updated.");
    else
        res.status(404).send("Restaurant " + req.params.name + " could not be found.");
}));
// // REST API for Table
// // get all tables
// router.get('/tables', async (req: Request, res: Response) => {
//     await tableRepository.getTables()
//     .then(function(tables: any)
//     {
//         res.send(tables);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get table by number
// router.get('/table/:number', async (req: Request, res: Response) => {
//     await tableRepository.getTableByNumber(+req.params.number)
//     .then(function(table: any)
//     {
//         res.send(table);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // delete table by number
// router.delete('/table/:number', async (req: Request, res: Response) => {
//     await tableRepository.deleteTableByNumber(+req.params.number)
//     .then(function()
//     {
//         res.send('Table ' + +req.params.number + ' has been deleted!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // add table from request body
// router.post('/table', async (req: Request, res: Response) => {
//     await tableRepository.addTable(req.body)
//     .then(function()
//     {
//         res.send('Table ' + req.body.number + ' has been added!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // update table from request body
// router.put('/table/:number', async (req: Request, res: Response) => {
//     await tableRepository.updateTableByNumber(+req.params.number, req.body)
//     .then(function()
//     {
//         res.send('Table ' + req.params.number + ' has been updated!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get free tables in a given time period for a given number of people from body request
// router.post('/tables/free', async (req: Request, res: Response) => {
//     await tableRepository.getFreeTables(new Date(req.body.startDateTime), new Date(req.body.endDateTime), req.body.people)
//     .then(function(tables: any)
//     {
//         res.send(tables);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
app.listen(3000);
