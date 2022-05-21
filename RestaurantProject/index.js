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
var CustomerRepository_1 = require("./DataStore/CustomerRepository");
var EmployeeRepository_1 = require("./DataStore/EmployeeRepository");
var MenuItemRepository_1 = require("./DataStore/MenuItemRepository");
// import { OrderRepository } from './DataStore/OrderRepository';
var ProductRepository_1 = require("./DataStore/ProductRepository");
// import { ReservationRepository } from './DataStore/ReservationRepository';
var RestaurantRepository_1 = require("./DataStore/RestaurantRepository");
var TableRepository_1 = require("./DataStore/TableRepository");
var app = express();
var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
var customerRepository = new CustomerRepository_1.CustomerRepository();
var employeeRepository = new EmployeeRepository_1.EmployeeRepository();
var menuItemRepository = new MenuItemRepository_1.MenuItemRepository();
// const orderRepository = new OrderRepository();
var productRepository = new ProductRepository_1.ProductRepository();
// const reservationRepository = new ReservationRepository();
var restaurantRepository = new RestaurantRepository_1.RestaurantRepository();
var tableRepository = new TableRepository_1.TableRepository();
// DATABASE POPULATION:
customerRepository.populateCustomers();
employeeRepository.populateEmployees();
menuItemRepository.populateMenuItems();
// orderRepository.populateOrders();
productRepository.populateProducts();
// reservationRepository.populateReservations();
restaurantRepository.populateRestaurants();
tableRepository.populateTables();
// REST API for Customer
// get all customers
router.get('/customers', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, customerRepository.getCustomers()
                    .then(function (customers) {
                    if (customers)
                        res.status(200).send(customers);
                    else
                        res.status(404).send("Customers could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// get customer by name
router.get('/customer/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, customerRepository.getCustomerByName(req.params.name)
                    .then(function (customer) {
                    if (customer)
                        res.status(200).send(customer);
                    else
                        res.status(404).send("Customer " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// add customer from request body
router.post('/customer', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var customer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customer = req.body;
                return [4 /*yield*/, customerRepository.addCustomer(customer)
                        .then(function (customerAdded) {
                        if (customerAdded)
                            res.status(201).send("Customer " + customer.name + " has been successfully added.");
                        else
                            res.status(404).send("Customer " + customer.name + " already exists.");
                    })["catch"](function (err) {
                        res.status(500).send(err);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// delete customer by name
router["delete"]('/customer/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, customerRepository.deleteCustomerByName(req.params.name)
                    .then(function (customerDeleted) {
                    if (customerDeleted)
                        res.status(200).send("Customer " + req.params.name + " has been successfully deleted.");
                    else
                        res.status(404).send("Customer " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// update customer from request body
router.put('/customer/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, customerRepository.updateCustomer(req.params.name, req.body)
                    .then(function (customerUpdated) {
                    if (customerUpdated)
                        res.status(200).send("Customer " + req.params.name + " has been successfully updated.");
                    else
                        res.status(404).send("Customer " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// add loyalty points to customer
router.put('/customer/:name/:loyaltyPoints', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, customerRepository.addLoyaltyPoints(req.params.name, +req.params.loyaltyPoints)
                    .then(function (loyaltyPointsAdded) {
                    if (loyaltyPointsAdded)
                        res.status(200).send(req.params.loyaltyPoints + " loyalty points to " + req.params.name + ".");
                    else
                        res.status(400).send("Customer " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// REST API for Employee
// get all employees
router.get('/employees', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, employeeRepository.getEmployees()
                    .then(function (employees) {
                    if (employees)
                        res.status(200).send(employees);
                    else
                        res.status(404).send("Employees could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// get employees by surname
router.get('/employees/:surname', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, employeeRepository.getEmployeesBySurname(req.params.surname)
                    .then(function (employees) {
                    if (employees)
                        res.status(200).send(employees);
                    else
                        res.status(404).send("Employees of surname " + req.params.surname + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// add employee from request body
router.post('/employee', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var employee;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                employee = req.body;
                return [4 /*yield*/, employeeRepository.addEmployee(employee)
                        .then(function (employeeAdded) {
                        if (employeeAdded)
                            res.status(201).send("Employee " + employee.surname + " " + employee.name + " has been successfully added.");
                        else
                            res.status(400).send("Employee " + employee.surname + " " + employee.name + " already exists.");
                    })["catch"](function (err) {
                        res.status(500).send(err);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// delete employee by surname
router["delete"]('/employee/:surname/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, employeeRepository.deleteEmployeeBySurnameAndName(req.params.surname, req.params.name)
                    .then(function (employeeDeleted) {
                    if (employeeDeleted)
                        res.status(200).send("Employee " + req.params.surname + " " + req.params.name + " has been successfully deleted.");
                    else
                        res.status(404).send("Employee " + req.params.surname + " " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// update employee from request body
router.put('/employee/:surname/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, employeeRepository.updateEmployeeBySurnameAndName(req.params.surname, req.params.name, req.body)
                    .then(function (employeeUpdated) {
                    if (employeeUpdated)
                        res.status(200).send("Employee " + req.params.surname + " " + req.params.name + " has been successfully updated.");
                    else
                        res.status(404).send("Employee " + req.params.surname + " " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// REST API for Menu Item
// get all menu items
router.get('/menuItems', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, menuItemRepository.getMenuItems()
                    .then(function (menuItems) {
                    if (menuItems)
                        res.status(200).send(menuItems);
                    else
                        res.status(404).send("Menu Items could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// get menu item by name
router.get('/menuItem/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, menuItemRepository.getMenuItemByName(req.params.name)
                    .then(function (menuItem) {
                    if (menuItem)
                        res.status(200).send(menuItem);
                    else
                        res.status(404).send("Menu Item " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// add menu item from request body
router.post('/menuItem', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var menuItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                menuItem = req.body;
                return [4 /*yield*/, menuItemRepository.addMenuItem(menuItem)
                        .then(function (menuItemAdded) {
                        if (menuItemAdded)
                            res.status(201).send("Menu Item " + menuItem.name + " has been successfully added.");
                        else
                            res.status(400).send("Menu Item " + menuItem.name + " already exists.");
                    })["catch"](function (err) {
                        res.status(500).send(err);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// delete menu item by name
router["delete"]('/menuItem/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, menuItemRepository.deleteMenuItemByName(req.params.name)
                    .then(function (menuItemDeleted) {
                    if (menuItemDeleted)
                        res.status(200).send("Menu Item " + req.params.name + " has been successfully deleted.");
                    else
                        res.status(404).send("Menu Item " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// update menu item from request body
router.put('/menuItem/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, menuItemRepository.updateMenuItem(req.params.name, req.body)
                    .then(function (menuItemUpdated) {
                    if (menuItemUpdated)
                        res.send("Menu Item " + req.params.name + " has been successfully updated.");
                    else
                        res.status(404).send("Menu Item " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// get menu grouped by type
router.get('/menu', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, menuItemRepository.getMenu()
                    .then(function (menu) {
                    res.send(menu);
                })["catch"](function (err) {
                    res.send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
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
router.get('/products', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productRepository.getProducts()
                    .then(function (products) {
                    if (products)
                        res.status(200).send(products);
                    else
                        res.status(404).send("Products could not be found.");
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
                        res.status(404).send("Product " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// add product from request body
router.post('/product', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product = req.body;
                return [4 /*yield*/, productRepository.addProduct(product)
                        .then(function (productAdded) {
                        if (productAdded)
                            res.status(201).send("Product " + product.name + " has been successfully added.");
                        else
                            res.status(400).send("Product " + product.name + " already exists.");
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
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productRepository.deleteProductByName(req.params.name)
                    .then(function (productDeleted) {
                    if (productDeleted)
                        res.status(200).send("Product " + req.params.name + " has been successfully deleted.");
                    else
                        res.status(404).send("Product " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// update product from request body
router.put('/product/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productRepository.updateProduct(req.params.name, req.body)
                    .then(function (productUpdated) {
                    if (productUpdated)
                        res.status(200).send("Product " + req.params.name + " has been successfully updated.");
                    else
                        res.status(404).send("Product " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
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
router.get('/restaurants', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, restaurantRepository.getRestaurants()
                    .then(function (restaurants) {
                    if (restaurants)
                        res.status(200).send(restaurants);
                    else
                        res.status(404).send("Restaurants could not be found.");
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
                        res.status(404).send("Restaurant " + req.params.name + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
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
                    res.status(201).send("Restaurant " + restaurant.name + " has been successfully added.");
                else
                    res.status(400).send("Restaurant " + restaurant.name + " already exists.");
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
                    res.status(200).send("Restaurant " + req.params.name + " has been successfully deleted.");
                else
                    res.status(404).send("Restaurant " + req.params.name + " could not be found.");
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
                    res.status(200).send("Restaurant " + req.params.name + " has been successfully updated.");
                else
                    res.status(404).send("Restaurant " + req.params.name + " could not be found.");
                return [2 /*return*/];
        }
    });
}); });
// REST API for Table
// get all tables
router.get('/tables', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tableRepository.getTables()
                    .then(function (tables) {
                    if (tables)
                        res.status(200).send(tables);
                    else
                        res.status(404).send("Tables could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// get table by number
router.get('/table/:number', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tableRepository.getTableByNumber(+req.params.number)
                    .then(function (table) {
                    if (table)
                        res.status(200).send(table);
                    else
                        res.status(404).send("Table " + req.params.number + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// add table from request body
router.post('/table', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tableRepository.addTable(req.body)
                    .then(function (tableAdded) {
                    if (tableAdded)
                        res.status(201).send("Table " + req.body.number + " has been successfully added.");
                    else
                        res.status(400).send("Table " + req.body.number + " already exists.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// delete table by number
router["delete"]('/table/:number', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tableRepository.deleteTableByNumber(+req.params.number)
                    .then(function (tableDeleted) {
                    if (tableDeleted)
                        res.status(200).send("Table " + req.params.number + " has been successfully deleted.");
                    else
                        res.status(404).send("Table " + req.params.number + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// update table from request body
router.put('/table/:number', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tableRepository.updateTableByNumber(+req.params.number, req.body)
                    .then(function (tableUpdated) {
                    if (tableUpdated)
                        res.status(200).send("Table " + req.params.number + " has been successfully updated.");
                    else
                        res.status(404).send("Table " + req.params.number + " could not be found.");
                })["catch"](function (err) {
                    res.status(500).send(err);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// TODO: get free tables in a given time period for a given number of people from body request
app.listen(3000);
