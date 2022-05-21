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
// orderRepository.populateOrders();
productRepository.populateProducts();
reservationRepository.populateReservations();
restaurantRepository.populateRestaurants();
tableRepository.populateTables();
// REST API for Customer
// get all customers
router.get('/customers', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// REST API for Employee
// get all employees
router.get('/employees', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield employeeRepository.getEmployees()
        .then(function (employees) {
        if (employees)
            res.status(200).send(employees);
        else
            res.status(404).send("Employees could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// get employees by surname
router.get('/employees/:surname', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield employeeRepository.getEmployeesBySurname(req.params.surname)
        .then(function (employees) {
        if (employees)
            res.status(200).send(employees);
        else
            res.status(404).send("Employees of surname " + req.params.surname + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// add employee from request body
router.post('/employee', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = req.body;
    yield employeeRepository.addEmployee(employee)
        .then(function (employeeAdded) {
        if (employeeAdded)
            res.status(201).send("Employee " + employee.surname + " " + employee.name + " has been successfully added.");
        else
            res.status(400).send("Employee " + employee.surname + " " + employee.name + " already exists.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// delete employee by surname
router.delete('/employee/:surname/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield employeeRepository.deleteEmployeeBySurnameAndName(req.params.surname, req.params.name)
        .then(function (employeeDeleted) {
        if (employeeDeleted)
            res.status(200).send("Employee " + req.params.surname + " " + req.params.name + " has been successfully deleted.");
        else
            res.status(404).send("Employee " + req.params.surname + " " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// update employee from request body
router.put('/employee/:surname/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield employeeRepository.updateEmployeeBySurnameAndName(req.params.surname, req.params.name, req.body)
        .then(function (employeeUpdated) {
        if (employeeUpdated)
            res.status(200).send("Employee " + req.params.surname + " " + req.params.name + " has been successfully updated.");
        else
            res.status(404).send("Employee " + req.params.surname + " " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// REST API for Menu Item
// get all menu items
router.get('/menuItems', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menuItemRepository.getMenuItems()
        .then(function (menuItems) {
        if (menuItems)
            res.status(200).send(menuItems);
        else
            res.status(404).send("Menu Items could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// get menu item by name
router.get('/menuItem/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menuItemRepository.getMenuItemByName(req.params.name)
        .then(function (menuItem) {
        if (menuItem)
            res.status(200).send(menuItem);
        else
            res.status(404).send("Menu Item " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// add menu item from request body
router.post('/menuItem', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menuItem = req.body;
    yield menuItemRepository.addMenuItem(menuItem)
        .then(function (menuItemAdded) {
        if (menuItemAdded)
            res.status(201).send("Menu Item " + menuItem.name + " has been successfully added.");
        else
            res.status(400).send("Menu Item " + menuItem.name + " already exists.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// delete menu item by name
router.delete('/menuItem/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menuItemRepository.deleteMenuItemByName(req.params.name)
        .then(function (menuItemDeleted) {
        if (menuItemDeleted)
            res.status(200).send("Menu Item " + req.params.name + " has been successfully deleted.");
        else
            res.status(404).send("Menu Item " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// update menu item from request body
router.put('/menuItem/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menuItemRepository.updateMenuItem(req.params.name, req.body)
        .then(function (menuItemUpdated) {
        if (menuItemUpdated)
            res.send("Menu Item " + req.params.name + " has been successfully updated.");
        else
            res.status(404).send("Menu Item " + req.params.name + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
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
router.get('/products', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// REST API for Reservation
// get all reservations
router.get('/reservations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.getReservations()
        .then(function (reservations) {
        if (reservations)
            res.status(200).send(reservations);
        else
            res.status(404).send("Reservations could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
router.get('/reservation/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.getReservationById(req.params.id)
        .then(function (reservation) {
        if (reservation)
            res.status(200).send(reservation);
        else
            res.status(404).send("Reservation " + req.params.id + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// add reservation from request body
router.post('/reservation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.addReservation(req.body)
        .then(function (reservationAdded) {
        if (reservationAdded === true)
            res.status(201).send("Reservation has been successfully added.");
        else
            res.status(400).send(reservationAdded);
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// delete reservation by id
router.delete('/reservation/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.deleteReservationById(req.params.id)
        .then(function (reservationDeleted) {
        if (reservationDeleted)
            res.status(200).send("Reservation " + req.params.id + " has been successfully deleted.");
        else
            res.status(404).send("Reservation " + req.params.id + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// update reservation from request body
router.put('/reservation/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.updateReservationById(req.params.id, req.body)
        .then(function (reservationUpdated) {
        if (reservationUpdated)
            res.status(200).send("Reservation " + req.params.id + " has been successfully updated.");
        else
            res.status(404).send("Reservation " + req.params.id + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// get reservations by customer name
router.get('/reservations/customer/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.getReservationsByCustomerName(req.params.name)
        .then(function (reservations) {
        if (reservations)
            res.status(200).send(reservations);
        else
            res.status(404).send("Reservations could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// get reservations by table number
router.get('/reservations/table/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield reservationRepository.getReservationsByTableNumber(+req.params.number)
        .then(function (reservations) {
        if (reservations)
            res.status(200).send(reservations);
        else
            res.status(404).send("Reservations could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// REST API for Restaurant
// get all restaurants
router.get('/restaurants', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// add a restaurant from request body
router.post('/restaurant', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = req.body;
    const restaurantAdded = yield restaurantRepository.addRestaurant(restaurant);
    if (restaurantAdded)
        res.status(201).send("Restaurant " + restaurant.name + " has been successfully added.");
    else
        res.status(400).send("Restaurant " + restaurant.name + " already exists.");
}));
// delete restaurant by name
router.delete('/restaurant/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantDeleted = yield restaurantRepository.deleteRestaurantByName(req.params.name);
    if (restaurantDeleted)
        res.status(200).send("Restaurant " + req.params.name + " has been successfully deleted.");
    else
        res.status(404).send("Restaurant " + req.params.name + " could not be found.");
}));
// update restaurant from request body
router.put('/restaurant/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantUpdated = yield restaurantRepository.updateRestaurant(req.params.name, req.body);
    if (restaurantUpdated)
        res.status(200).send("Restaurant " + req.params.name + " has been successfully updated.");
    else
        res.status(404).send("Restaurant " + req.params.name + " could not be found.");
}));
// REST API for Table
// get all tables
router.get('/tables', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tableRepository.getTables()
        .then(function (tables) {
        if (tables)
            res.status(200).send(tables);
        else
            res.status(404).send("Tables could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// get table by number
router.get('/table/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tableRepository.getTableByNumber(+req.params.number)
        .then(function (table) {
        if (table)
            res.status(200).send(table);
        else
            res.status(404).send("Table " + req.params.number + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// add table from request body
router.post('/table', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tableRepository.addTable(req.body)
        .then(function (tableAdded) {
        if (tableAdded)
            res.status(201).send("Table " + req.body.number + " has been successfully added.");
        else
            res.status(400).send("Table " + req.body.number + " already exists.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// delete table by number
router.delete('/table/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tableRepository.deleteTableByNumber(+req.params.number)
        .then(function (tableDeleted) {
        if (tableDeleted)
            res.status(200).send("Table " + req.params.number + " has been successfully deleted.");
        else
            res.status(404).send("Table " + req.params.number + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
// update table from request body
router.put('/table/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tableRepository.updateTableByNumber(+req.params.number, req.body)
        .then(function (tableUpdated) {
        if (tableUpdated)
            res.status(200).send("Table " + req.params.number + " has been successfully updated.");
        else
            res.status(404).send("Table " + req.params.number + " could not be found.");
    }).catch(function (err) {
        res.status(500).send(err);
    });
}));
app.listen(3000);
