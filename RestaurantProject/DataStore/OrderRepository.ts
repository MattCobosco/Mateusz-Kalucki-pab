import {Schema, model, connect} from 'mongoose';
import Employee from '../CoreBusiness/Employee';
import MenuItem from '../CoreBusiness/MenuItem';
import Order from '../CoreBusiness/Order';
import Product from '../CoreBusiness/Product';
import Restaurant from '../CoreBusiness/Restaurant';
import Table from '../CoreBusiness/Table';

export class OrderRepository
{
    restaurantSchema = new Schema<Restaurant>({
        name: {type: String, required: true},
        address: {type: String, required: true},
        phone: {type: String, required: true},
        nip: {type: String, required: true},
        email: {type: String, required: true},
        website: {type: String, required: true},
        description: {type: String, required: false}
    });

    employeeSchema = new Schema<Employee>({
        name: {type: String, required: true},
        surname: {type: String, required: true},
        position: {type: String, required: true},
        restaurant: {type: this.restaurantSchema, ref: 'Restaurant'}
    });

    productSchema = new Schema<Product>({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true}
    });

    menuItemSchema = new Schema<MenuItem>({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: false},
        products: [{type:this.productSchema, ref: 'Product'}]
    });
    
    tableSchema = new Schema<Table>({
        number: {type: Number, required: true},
        seats: {type: Number, required: true},
        status: {type: Number, required: true}
    });
    
    orderSchema = new Schema<Order>(
        {
            dateTime: {type: Date, required: true},
            employee: {type: this.employeeSchema, ref: 'Employee'},
            items: [{type: this.menuItemSchema, ref: 'MenuItem'}],
            status: {type: Number, required: true},
            table: {type: this.tableSchema, ref: 'Table'},
            price: {type: Number, required: true}
        });

    OrderModel = model<Order>('Order', this.orderSchema);

    async populateOrders() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const orders = [
            {
                dateTime: new Date(),
                employee: 
                {
                    name: "Employee2",
                    surname: "Employee2",
                    position: "Waiter",
                    restaurant: 
                    {
                        name: "Restaurant1",
                        address: "Address1",
                        phone: "123456789",
                        nip: "123456789",
                        email: "someEmail@something.com",
                        website: "someWebsite.com",
                    }
                },
                items: 
                [
                    {
                        name: "Coca_Cola",
                        price: 5,
                        type: 3,
                        description: "Coca Cola can",
                        products: 
                        [
                            {
                                name: "Coca_Cola_Can",
                                price: 2.5,
                                quantity: 1
                            }
                        ]
                    },
                    {
                        name: "Chicken_Nuggets",
                        price: 30,
                        type: 1,
                        description: "Chicken nuggets",
                        products:
                        [
                            {
                                name: "Chicken",
                                price: 3,
                                quantity: 2
                            }
                        ]
                    }
                ],
                status: 1,
                table: 
                {
                    number: 1,
                    seats: 4,
                    status: 0
                },
                price: 35
            }
        ];

        if (await this.OrderModel.countDocuments() === 0)
        {
            await this.OrderModel
            .insertMany(orders)
            .then(function()
            {
                console.log("Orders have been populated!")
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
    };

    async addOrder(order: Order) : Promise<boolean | string>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const alreadyExists = await this.OrderModel.findOne({
            dateTime: order.dateTime,
           'employee.name': order.employee.name,
        });
        if(alreadyExists)
            return "Such order already exists.";

        if(!order.price || order.price === 0)
        {
            let price = 0;
            for(let item of order.items)
            {
                price += +item.price;
            }
            order.price = price;
        }

        await this.OrderModel
        .create(order)
        .then(function()
        {
            console.log("Order has been added!")
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const exists = await this.OrderModel.findOne({
            dateTime: order.dateTime,
            'employee.name': order.employee.name,
        });
        if(exists)
            return true;
        else
            return "Order has not been added.";
    }

    async deleteOrderById(orderId: string) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const exists = await this.OrderModel.findById(orderId);
        if(!exists)
            return false;

        await this.OrderModel
        .findByIdAndDelete(orderId)
        .then(function()
        {
            console.log("Order " + orderId + " has been deleted!")
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const existsAfter = await this.OrderModel.findById(orderId);
        if(!existsAfter)
            return true;
        else
            return false;
    }

    async getOrderById(id: string) : Promise<Order | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const order = await this.OrderModel.findById(id);
        if (order)
            return order;
        else
            return false;
    }

    async getOrders() : Promise<Order[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
    
        const orders = await this.OrderModel.find({});
        if(orders.length > 0)
            return orders;
        else
            return false;
    };

    async updateOrderById(id: string, order: Order) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let orderToUpdate = await this.OrderModel.findById(id);
        if (orderToUpdate)
        {
            if(order.employee)
                orderToUpdate.employee = order.employee;
            if(order.items)
                orderToUpdate.items = order.items;
            if(order.status)
                orderToUpdate.status = order.status;
            if(order.table)
                orderToUpdate.table = order.table;
            if(order.price || order.price !== 0)
                orderToUpdate.price = order.price;
            else 
            {
                let price = 0;
                for (let item of order.items)
                {
                    price += +item.price;
                }
                orderToUpdate.price = price;
            }

            await orderToUpdate.save()
            .then(function()
            {
                console.log("Order has been updated!")
            }).catch(function(err: any)
            {
                console.log(err);
            });
            return true;
        }
        else
            return false;
    }

    // get orders by employee name
    async getOrdersByEmployeeName(employeeName: string) : Promise<Order[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const orders = await this.OrderModel.find({'employee.name': employeeName});
        if (orders.length > 0)
            return orders;
        else
            return false;
    }

    // get orders in a given time period
    async getOrdersByTimePeriod(startDate: Date, endDate: Date) : Promise<Order[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let orders = await this.OrderModel.find({dateTime: {$gte: startDate, $lte: endDate}});
        if (orders.length > 0)
            return orders;
        else
            return false;
    }

    // get income in a given time period
    async getIncomeByTimePeriod(startDate: Date, endDate: Date) : Promise<number>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let orders = await this.OrderModel.find({dateTime: {$gte: startDate, $lte: endDate}});
        if (orders.length > 0)
        {
            let income = 0;
            for (let order of orders)
            {
                income += +order.price;
            }
            return income;
        }
        else
            return 0;
    }

    // get profit in a given time period
    async getProfitByTimePeriod(startDate: Date, endDate: Date) : Promise<number>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let orders = await this.OrderModel.find({dateTime: {$gte: startDate, $lte: endDate}});
        if (orders.length > 0)
        {
            let income = 0;
            let costs = 0;
            let profit = 0;
            for (let order of orders)
            {
                income += +order.price;
                for(let item of order.items)
                {
                    for (let product of item.products)
                    {
                        costs += +product.price * +product.quantity;
                    }
                }
                
                profit = (+income - +costs);
            }
            return +profit;
        }
        else
            return 0;
    }
}