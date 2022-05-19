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
var express = require("express");
var bodyParser = require("body-parser");
// import { CustomerRepository } from './DataStore/CustomerRepository';
// import { EmployeeRepository } from './DataStore/EmployeeRepository';
// import { MenuItemRepository } from './DataStore/MenuItemRepository';
// import { OrderRepository } from './DataStore/OrderRepository';
var ProductRepository_1 = require("./DataStore/ProductRepository");
// import { ReservationRepository } from './DataStore/ReservationRepository';
var RestaurantRepository_1 = require("./DataStore/RestaurantRepository");
// import { TableRepository } from './DataStore/TableRepository';
var app = express();
var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
// const customerRepository = new CustomerRepository();
// const employeeRepository = new EmployeeRepository();
// const menuItemRepository = new MenuItemRepository();
// const orderRepository = new OrderRepository();
var productRepository = new ProductRepository_1.ProductRepository();
// const reservationRepository = new ReservationRepository();
var restaurantRepository = new RestaurantRepository_1.RestaurantRepository();
// const tableRepository = new TableRepository();
// DATABASE POPULATION:
// customerRepository.populateCustomers();
// employeeRepository.populateEmployees();
// menuItemRepository.populateMenuItems();
// orderRepository.populateOrders();
productRepository.populateProducts();
// reservationRepository.populateReservations();
restaurantRepository.populateRestaurants();
// tableRepository.populateTables();
// // REST API for Customer
// // get all customers
// router.get('/customers', async (req: Request, res: Response) => {
//     await customerRepository.getCustomers()
//     .then(function(customers: any)
//     {
//         res.send(customers);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // get customer by name
// router.get('/customer/:name', async (req: Request, res: Response) => {
//     await customerRepository.getCustomerByName(req.params.name)
//     .then(function(customer: any)
//     {
//         res.send(customer);
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // delete customer by name
// router.delete('/customer/:name', async (req: Request, res: Response) => {
//     await customerRepository.deleteCustomerByName(req.params.name)
//     .then(function()
//     {
//         res.send('Customer ' + req.params.name + ' has been deleted!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // add customer from request body
// router.post('/customer', async (req: Request, res: Response) => {
//     await customerRepository.addCustomer(req.body)
//     .then(function()
//     {
//         res.send('Customer ' + req.body.name + ' has been added!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // update customer from request body
// router.put('/customer/:name', async (req: Request, res: Response) => {
//     await customerRepository.updateCustomer(req.params.name, req.body)
//     .then(function()
//     {
//         res.send('Customer ' + req.body.name + ' has been updated!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
// // add loyalty points to customer
// router.put('/customer/:name/', async (req: Request, res: Response) => {
//     await customerRepository.addLoyaltyPoints(req.params.name, req.body.loyaltyPoints)
//     .then(function()
//     {
//         res.send(req.body.loyaltyPoints + ' loyalty points for ' + req.params.name + '!');
//     }).catch(function(err: any)
//     {
//         res.send(err);
//     });
// });
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
router.get('/products', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productRepository.getProducts()
                    .then(function (products) {
                    if (products)
                        res.status(200).send(products);
                    else
                        res.status(404).send('Products could not be found.');
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// get product by name
router.get('/product/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productRepository.getProductByName(req.params.name)
                    .then(function (product) {
                    if (product)
                        res.status(200).send(product);
                    else
                        res.status(404).send('Product ' + req.params.name + ' could not be found.');
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// delete product by name
router["delete"]('/product/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productDeleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productRepository.deleteProductByName(req.params.name)];
            case 1:
                productDeleted = _a.sent();
                if (productDeleted)
                    res.send('Product ' + req.params.name + ' has been deleted.');
                else
                    res.status(404).send('Product ' + req.params.name + ' could not be found.');
                return [2 /*return*/];
        }
    });
}); });
// add product from request body
router.post('/product', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, productAdded;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product = req.body;
                return [4 /*yield*/, productRepository.addProduct(product)];
            case 1:
                productAdded = _a.sent();
                if (productAdded)
                    res.status(201).send('Product ' + product.name + ' has been added.');
                else
                    res.status(400).send('Product ' + product.name + ' already exists.');
                return [2 /*return*/];
        }
    });
}); });
// update product from request body
router.put('/product/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productUpdated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productRepository.updateProduct(req.params.name, req.body)];
            case 1:
                productUpdated = _a.sent();
                if (productUpdated)
                    res.status(200).send('Product ' + req.params.name + ' has been updated.');
                else
                    res.status(404).send('Product ' + req.params.name + ' could not be found.');
                return [2 /*return*/];
        }
    });
}); });
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
router.get('/restaurants', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, restaurantRepository.getRestaurants()
                    .then(function (restaurants) {
                    if (restaurants)
                        res.status(200).send(restaurants);
                    else
                        res.status(404).send('Restaurants could not be found.');
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// get restaurant by name
router.get('/restaurant/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, restaurantRepository.getRestaurantByName(req.params.name)
                    .then(function (restaurant) {
                    if (restaurant)
                        res.status(200).send(restaurant);
                    else
                        res.status(404).send('Restaurant ' + req.params.name + ' could not be found.');
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// delete restaurant by name
router["delete"]('/restaurant/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurantDeleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, restaurantRepository.deleteRestaurantByName(req.params.name)];
            case 1:
                restaurantDeleted = _a.sent();
                if (restaurantDeleted)
                    res.status(200).send('Restaurant ' + req.params.name + ' has been deleted.');
                else
                    res.status(404).send('Restaurant ' + req.params.name + ' could not be found.');
                return [2 /*return*/];
        }
    });
}); });
// add a restaurant from request body
router.post('/restaurant', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurant, restaurantAdded;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                restaurant = req.body;
                return [4 /*yield*/, restaurantRepository.addRestaurant(restaurant)];
            case 1:
                restaurantAdded = _a.sent();
                if (restaurantAdded)
                    res.status(201).send('Restaurant ' + restaurant.name + ' has been added.');
                else
                    res.status(400).send('Restaurant ' + restaurant.name + ' already exists.');
                return [2 /*return*/];
        }
    });
}); });
// update restaurant from request body
router.put('/restaurant/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurantUpdated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, restaurantRepository.updateRestaurant(req.params.name, req.body)];
            case 1:
                restaurantUpdated = _a.sent();
                if (restaurantUpdated)
                    res.status(200).send('Restaurant ' + req.params.name + ' has been updated.');
                else
                    res.status(404).send('Restaurant ' + req.params.name + ' could not be found.');
                return [2 /*return*/];
        }
    });
}); });
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
