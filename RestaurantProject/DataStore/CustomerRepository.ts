import {Schema, model, connect} from 'mongoose';
import Customer from '../CoreBusiness/CustomerModel';

export class CustomerRepository
{
    customerSchema = new Schema<Customer>(
        {
            name: {type: String, required: true},
            email: {type: String, required: true},
            phone: {type: String, required: true},
            address: {type: String, required: true},
            loyaltyPoints: {type: Number, required: true}
        });

    CustomerModel = model<Customer>('Customer', this.customerSchema);

    async populateCustomers() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
    
        const customers = [
            {
                name: 'Customer1',
                email: 'customer1@gmail.com',
                phone: '123456789',
                address: 'CustomerAddress1',
                loyaltyPoints: 0
            },
            {
                name: 'Customer2',
                email: 'customer2@gmail.com',
                phone: '987654321',
                address: 'CustomerAddress2',
                loyaltyPoints: 0
            }];

        await this.CustomerModel
        .insertMany(customers)
        .then(function()
        {
            console.log("Customers have been populated!")
        }
        ).catch(function(err)
        {
            console.log(err);
        });
    }

    async addCustomer(customer: Customer) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        await this.CustomerModel
        .create(customer)
        .then(function()
        {
            console.log("Customer has been added!")
        }
        ).catch(function(err)
        {
            console.log(err);
        });
    }

    async deleteCustomerByName(customerName: string) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.CustomerModel
        .deleteOne({name: customerName})
        .then(function()
        {
            console.log("Customer has been deleted!")
        }
        ).catch(function(err)
        {
            console.log(err);
        });
    }

    async getCustomerByName(customerName: string) : Promise<Customer>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        let customer = await this.CustomerModel.findOne({name: customerName});
        if (customer)
            return customer;
        else
            return null as any;
    }

    async getCustomers() : Promise<Customer[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        return await this.CustomerModel.find({});
    }

    async updateCustomer(customer: Customer) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.CustomerModel
        .updateOne({name: customer.name}, customer)
        .then(function()
        {
            console.log("Customer has been updated!")
        }
        ).catch(function(err)
        {
            console.log(err);
        });
    }

    async addLoyaltyPoints(customerName: string, loyaltyPoints: number) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        let customer = await this.CustomerModel.findOne({name: customerName});
        if (customer)
        {
            customer.loyaltyPoints += loyaltyPoints;
            await this.CustomerModel
            .updateOne({name: customerName}, customer)
            .then(function()
            {
                console.log("Customer loyalty points have been added!")
            }
            ).catch(function(err)
            {
                console.log(err);
            });
        }
        else
            console.log("Customer not found!");
    }
}

