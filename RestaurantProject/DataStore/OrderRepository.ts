import {Schema, model, connect} from 'mongoose';
import Employee from '../CoreBusiness/Employee';
import MenuItem from '../CoreBusiness/MenuItem';
import Order from '../CoreBusiness/Order';
import Table from '../CoreBusiness/Table';
import { MenuItemRepository } from './MenuItemRepository';

export class OrderRepository
{
    orderSchema = new Schema<Order>(
        {
            employee: {type: Employee, ref: 'Employee'},
            items: [{type: MenuItem, ref: 'MenuItem'}],
            status: {type: Number, required: true},
            table: {type: Table, ref: 'Table'},
            price: {type: Number, required: true}
        });

    orderModel = model<Order>('Order', this.orderSchema);

    async populateOrders() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const orders = [
            {
                employee: '62826aff5986dcfe48d66dd4',
                items: [
                    '6283fc51124f7b21d9c97d61',
                    '6283fc51124f7b21d9c97d65'
                ],
                status: 1,
                table: '6284ab720b1b925fc9c801fe',
                price: 35
            }
        ];

        if (await this.orderModel.countDocuments() === 0)
        {
            await this.orderModel
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

    async addOrder(order: Order) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        if(!order.price)
        {
            let price = 0;
            for(let i = 0; i < order.items.length; i++)
            {
                let item = order.items[i];
                price += item.price;
            }
            order.price = price;
        }

        await this.orderModel
        .create(order)
        .then(function()
        {
            console.log("Order has been added!")
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async deleteOrderById(id: string) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const exists = await this.orderModel.exists({_id: id});
        await this.orderModel
        .findByIdAndDelete(id)
        .then(function()
        {
            console.log("Order has been deleted!")
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async getOrderById(id: string) : Promise<Order>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let order = await this.orderModel.findById(id);
        if (order)
            return order;
        else
            return null as any;
    }

    async getOrders() : Promise<Order[]>
    {
        return await this.orderModel.find();
    };

    async updateOrderById(id: string, order: Order) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let orderToUpdate = await this.orderModel.findById(id);

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
            if(order.price)
                orderToUpdate.price = order.price;
            else {
                let price = 0;
                for (let i = 0; i < orderToUpdate.items.length; i++)
                {
                    let itemPrice = orderToUpdate.items[i].price;
                    price += +itemPrice;
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

    // get orders by employee id
    async getOrdersByEmployeeId(employeeId: string) : Promise<Order[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let orders = await this.orderModel.find({employee: employeeId});
        if (orders)
            return orders;
        else
            return null as any;
    }

    // get orders in a given time period
    async getOrdersByTimePeriod(startDate: Date, endDate: Date) : Promise<Order[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let orders = await this.orderModel.find({createdAt: {$gte: startDate, $lte: endDate}});
        if (orders)
            return orders;
        else
            return null as any;
    }

    // get income in a given time period
    async getIncomeByTimePeriod(startDate: Date, endDate: Date) : Promise<number>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let orders = await this.orderModel.find({createdAt: {$gte: startDate, $lte: endDate}});
        if (orders)
        {
            let income = 0;
            for (let order of orders)
                income += order.price;
            return income;
        }
        else
            return null as any;
    }
}