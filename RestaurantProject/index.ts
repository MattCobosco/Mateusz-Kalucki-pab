import express = require ('express');
import bodyParser = require('body-parser');
import {Request, Response} from 'express';

import { CustomerRepository } from './DataStore/CustomerRepository';
import { EmployeeRepository } from './DataStore/EmployeeRepository';
import { MenuItemRepository } from './DataStore/MenuItemRepository';
// import { OrderRepository } from './DataStore/OrderRepository';
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
// const orderRepository = new OrderRepository();
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
router.get('/customers', async (_req: Request, res: Response) => {
    await customerRepository.getCustomers()
    .then(function(customers: any)
    {
        if(customers)
            res.status(200).send(customers);
        else
            res.status(404).send("Customers could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// get customer by name
router.get('/customer/:name', async (req: Request, res: Response) => {
    await customerRepository.getCustomerByName(req.params.name)
    .then(function(customer: any)
    {
        if(customer)
            res.status(200).send(customer);
        else
            res.status(404).send("Customer " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// add customer from request body
router.post('/customer', async (req: Request, res: Response) => {
    const customer = req.body;
    await customerRepository.addCustomer(customer)
    .then(function(customerAdded: boolean)
    {
        if(customerAdded)
            res.status(201).send("Customer " + customer.name + " has been successfully added.");
        else
            res.status(404).send("Customer " + customer.name + " already exists.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// delete customer by name
router.delete('/customer/:name', async (req: Request, res: Response) => {
    await customerRepository.deleteCustomerByName(req.params.name)
    .then(function(customerDeleted: boolean)
    {
        if(customerDeleted)
            res.status(200).send("Customer " + req.params.name + " has been successfully deleted.");
        else
            res.status(404).send("Customer " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// update customer from request body
router.put('/customer/:name', async (req: Request, res: Response) => {
    await customerRepository.updateCustomer(req.params.name, req.body)
    .then(function(customerUpdated: boolean)
    {
        if(customerUpdated)
            res.status(200).send("Customer " + req.params.name + " has been successfully updated.");
        else
            res.status(404).send("Customer " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// add loyalty points to customer
router.put('/customer/:name/:loyaltyPoints', async (req: Request, res: Response) => {
    await customerRepository.addLoyaltyPoints(req.params.name, +req.params.loyaltyPoints)
    .then(function(loyaltyPointsAdded: boolean)
    {
        if(loyaltyPointsAdded)
            res.status(200).send(req.params.loyaltyPoints + " loyalty points to " + req.params.name + ".");
        else
            res.status(400).send("Customer " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// REST API for Employee
// get all employees
router.get('/employees', async (_req: Request, res: Response) => {
    await employeeRepository.getEmployees()
    .then(function(employees: any)
    {
        if(employees)
            res.status(200).send(employees);
        else
            res.status(404).send("Employees could not be found.");
    }).catch(function(err)
    {
        res.status(500).send(err);
    });
});

// get employees by surname
router.get('/employees/:surname', async (req: Request, res: Response) => {
    await employeeRepository.getEmployeesBySurname(req.params.surname)
    .then(function(employees: any)
    {
        if(employees)
            res.status(200).send(employees);
        else
            res.status(404).send("Employees of surname " + req.params.surname + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// add employee from request body
router.post('/employee', async (req: Request, res: Response) => {
    const employee = req.body;
    await employeeRepository.addEmployee(employee)
    .then(function(employeeAdded: boolean)
    {
        if(employeeAdded)
            res.status(201).send("Employee " + employee.surname + " " + employee.name + " has been successfully added.");
        else
            res.status(400).send("Employee " + employee.surname + " " + employee.name + " already exists.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// delete employee by surname
router.delete('/employee/:surname/:name', async (req: Request, res: Response) => {
    await employeeRepository.deleteEmployeeBySurnameAndName(req.params.surname, req.params.name)
    .then(function(employeeDeleted: boolean)
    {
        if(employeeDeleted)
            res.status(200).send("Employee " + req.params.surname + " " + req.params.name + " has been successfully deleted.");
        else
            res.status(404).send("Employee " + req.params.surname + " " + req.params.name + " could not be found.");
        
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// update employee from request body
router.put('/employee/:surname/:name', async (req: Request, res: Response) => {
    await employeeRepository.updateEmployeeBySurnameAndName(req.params.surname, req.params.name, req.body)
    .then(function(employeeUpdated: boolean)
    {
        if(employeeUpdated)
            res.status(200).send("Employee " + req.params.surname + " " + req.params.name + " has been successfully updated.");
        else
            res.status(404).send("Employee " + req.params.surname + " " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// REST API for Menu Item
// get all menu items
router.get('/menuItems', async (req: Request, res: Response) => {
    await menuItemRepository.getMenuItems()
    .then(function(menuItems: any)
    {
        if(menuItems)
            res.status(200).send(menuItems);
        else
            res.status(404).send("Menu Items could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// get menu item by name
router.get('/menuItem/:name', async (req: Request, res: Response) => {
    await menuItemRepository.getMenuItemByName(req.params.name)
    .then(function(menuItem: any)
    {
        if(menuItem)
            res.status(200).send(menuItem);
        else
            res.status(404).send("Menu Item " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// add menu item from request body
router.post('/menuItem', async (req: Request, res: Response) => {
    const menuItem = req.body;
    await menuItemRepository.addMenuItem(menuItem)
    .then(function(menuItemAdded: boolean)
    {   
        if(menuItemAdded)
            res.status(201).send("Menu Item " + menuItem.name + " has been successfully added.");
        else
            res.status(400).send("Menu Item " + menuItem.name + " already exists.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// delete menu item by name
router.delete('/menuItem/:name', async (req: Request, res: Response) => {
    await menuItemRepository.deleteMenuItemByName(req.params.name)
    .then(function(menuItemDeleted: boolean)
    {
        if(menuItemDeleted)
            res.status(200).send("Menu Item " + req.params.name + " has been successfully deleted.");
        else
            res.status(404).send("Menu Item " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// update menu item from request body
router.put('/menuItem/:name', async (req: Request, res: Response) => {
    await menuItemRepository.updateMenuItem(req.params.name, req.body)
    .then(function(menuItemUpdated: boolean)
    {
        if(menuItemUpdated)
            res.send("Menu Item " + req.params.name + " has been successfully updated.");
        else
            res.status(404).send("Menu Item " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
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
router.get('/products', async (_req: Request, res: Response) => {
    await productRepository.getProducts()
    .then(function(products: any)
    {
        if(products)
            res.status(200).send(products);
        else
            res.status(404).send("Products could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// get product by name
router.get('/product/:name', async (req: Request, res: Response) => {
    await productRepository.getProductByName(req.params.name)
    .then(function(product: any)
    {
        if(product)
            res.status(200).send(product);
        else
            res.status(404).send("Product " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// add product from request body
router.post('/product', async (req: Request, res: Response) => {
    const product = req.body;
    await productRepository.addProduct(product)
    .then(function(productAdded: boolean)
    {
        if(productAdded)
            res.status(201).send("Product " + product.name + " has been successfully added.");
        else
            res.status(400).send("Product " + product.name + " already exists.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// delete product by name
router.delete('/product/:name', async (req: Request, res: Response) => {
    await productRepository.deleteProductByName(req.params.name)
    .then(function(productDeleted: boolean)
    {
        if(productDeleted)
            res.status(200).send("Product " + req.params.name + " has been successfully deleted.");
        else
            res.status(404).send("Product " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });   
});

// update product from request body
router.put('/product/:name', async (req: Request, res: Response) => {
    await productRepository.updateProduct(req.params.name, req.body)
    .then(function(productUpdated: boolean)
    {
        if(productUpdated)
            res.status(200).send("Product " + req.params.name + " has been successfully updated.");
        else
            res.status(404).send("Product " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// REST API for Reservation
// get all reservations
router.get('/reservations', async (req: Request, res: Response) => {
    await reservationRepository.getReservations()
    .then(function(reservations: any)
    {
        if(reservations)
            res.status(200).send(reservations);
        else
            res.status(404).send("Reservations could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

router.get('/reservation/:id', async (req: Request, res: Response) => {
    await reservationRepository.getReservationById(req.params.id)
    .then(function(reservation: any)
    {
        if(reservation)
            res.status(200).send(reservation);
        else
            res.status(404).send("Reservation " + req.params.id + " could not be found.");
        
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// add reservation from request body
router.post('/reservation', async (req: Request, res: Response) => {
    await reservationRepository.addReservation(req.body)
    .then(function(reservationAdded: boolean | string)
    {
        if(reservationAdded === true)
            res.status(201).send("Reservation has been successfully added.");
        else
            res.status(400).send(reservationAdded);
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// delete reservation by id
router.delete('/reservation/:id', async (req: Request, res: Response) => {
    await reservationRepository.deleteReservationById(req.params.id)
    .then(function(reservationDeleted: boolean)
    {
        if(reservationDeleted)
            res.status(200).send("Reservation " + req.params.id + " has been successfully deleted.");
        else
            res.status(404).send("Reservation " + req.params.id + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// update reservation from request body
router.put('/reservation/:id', async (req: Request, res: Response) => {
    await reservationRepository.updateReservationById(req.params.id, req.body)
    .then(function(reservationUpdated: boolean)
    {
        if(reservationUpdated)
            res.status(200).send("Reservation " + req.params.id + " has been successfully updated.");
        else
            res.status(404).send("Reservation " + req.params.id + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// get reservations by customer name
router.get('/reservations/customer/:name', async (req: Request, res: Response) => {
    await reservationRepository.getReservationsByCustomerName(req.params.name)
    .then(function(reservations: any)
    {
        if(reservations)
            res.status(200).send(reservations);
        else
            res.status(404).send("Reservations could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// get reservations by table number
router.get('/reservations/table/:number', async (req: Request, res: Response) => {
    await reservationRepository.getReservationsByTableNumber(+req.params.number)
    .then(function(reservations: any)
    {
        if(reservations)
            res.status(200).send(reservations);
        else
            res.status(404).send("Reservations could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});


// REST API for Restaurant
// get all restaurants
router.get('/restaurants', async (_req: Request, res: Response) => {
    await restaurantRepository.getRestaurants()
    .then(function(restaurants: any)
    {
        if(restaurants)
            res.status(200).send(restaurants);
        else
            res.status(404).send("Restaurants could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// get restaurant by name
router.get('/restaurant/:name', async (req: Request, res: Response) => {
    await restaurantRepository.getRestaurantByName(req.params.name)
    .then(function(restaurant: any)
    {
        if(restaurant)
            res.status(200).send(restaurant);
        else
            res.status(404).send("Restaurant " + req.params.name + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// add a restaurant from request body
router.post('/restaurant', async (req: Request, res: Response) => {
    const restaurant = req.body;
    const restaurantAdded = await restaurantRepository.addRestaurant(restaurant);
    if (restaurantAdded)
        res.status(201).send("Restaurant " + restaurant.name + " has been successfully added.");
    else
        res.status(400).send("Restaurant " + restaurant.name + " already exists.");
});

// delete restaurant by name
router.delete('/restaurant/:name', async (req: Request, res: Response) => {
    const restaurantDeleted = await restaurantRepository.deleteRestaurantByName(req.params.name);
    if (restaurantDeleted)
        res.status(200).send("Restaurant " + req.params.name + " has been successfully deleted.");
    else
        res.status(404).send("Restaurant " + req.params.name + " could not be found.");
});

// update restaurant from request body
router.put('/restaurant/:name', async (req: Request, res: Response) => {
    const restaurantUpdated = await restaurantRepository.updateRestaurant(req.params.name, req.body);
    if (restaurantUpdated)
        res.status(200).send("Restaurant " + req.params.name + " has been successfully updated.");
    else 
        res.status(404).send("Restaurant " + req.params.name + " could not be found.");
});

// REST API for Table
// get all tables
router.get('/tables', async (req: Request, res: Response) => {
    await tableRepository.getTables()
    .then(function(tables: any)
    {
        if(tables)
            res.status(200).send(tables);
        else
            res.status(404).send("Tables could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// get table by number
router.get('/table/:number', async (req: Request, res: Response) => {
    await tableRepository.getTableByNumber(+req.params.number)
    .then(function(table: any)
    {
        if(table)
            res.status(200).send(table);
        else
            res.status(404).send("Table " + req.params.number + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// add table from request body
router.post('/table', async (req: Request, res: Response) => {
    await tableRepository.addTable(req.body)
    .then(function(tableAdded: any)
    {
        if(tableAdded)
            res.status(201).send("Table " + req.body.number + " has been successfully added.");
        else
            res.status(400).send("Table " + req.body.number + " already exists.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// delete table by number
router.delete('/table/:number', async (req: Request, res: Response) => {
    await tableRepository.deleteTableByNumber(+req.params.number)
    .then(function(tableDeleted: any)
    {
        if(tableDeleted)
            res.status(200).send("Table " + req.params.number + " has been successfully deleted.");
        else
            res.status(404).send("Table " + req.params.number + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

// update table from request body
router.put('/table/:number', async (req: Request, res: Response) => {
    await tableRepository.updateTableByNumber(+req.params.number, req.body)
    .then(function(tableUpdated: any)
    {
        if(tableUpdated)
            res.status(200).send("Table " + req.params.number + " has been successfully updated.");
        else
            res.status(404).send("Table " + req.params.number + " could not be found.");
    }).catch(function(err: any)
    {
        res.status(500).send(err);
    });
});

app.listen(3000);