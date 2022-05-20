import {Schema, model, connect} from 'mongoose';
import Customer from '../CoreBusiness/Customer';

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
                name: "Customer1",
                email: "customer1@gmail.com",
                phone: "123456789",
                address: "CustomerAddress1",
                loyaltyPoints: 0
            },
            {
                name: "Customer2",
                email: "customer2@gmail.com",
                phone: "987654321",
                address: "CustomerAddress2",
                loyaltyPoints: 0
            }];
        
        if (await this.CustomerModel.countDocuments() === 0)
        {
            await this.CustomerModel
            .insertMany(customers)
            .then(function()
            {
                console.log("Customers have been populated!")
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
    }

    async addCustomer(customer: Customer) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const alreadyExists = await this.CustomerModel.findOne({name: customer.name});
        if(alreadyExists)
            return false;

        if(!customer.loyaltyPoints)
            customer.loyaltyPoints = 0; // set default value for loyalty points before saving => loyaltyPoints are required in the schema

        await this.CustomerModel
        .create(customer)
        .then(function()
        {
            console.log("Customer " + customer.name + " has been added!");
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const existsAfter = await this.CustomerModel.findOne({name: customer.name});
        if(existsAfter)
            return true;
        else
            return false;
    }

    async deleteCustomerByName(customerName: string) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const exists = await this.CustomerModel.exists({name: customerName});
        if(!exists)
            return false;

        await this.CustomerModel
        .deleteOne({name: customerName})
        .then(function()
        {
            console.log("Customer " + customerName + " has been deleted!");
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const existsAfter = await this.CustomerModel.exists({name: customerName});
        if(!existsAfter)
            return true;
        else
            return false;
    }

    async getCustomerByName(customerName: string) : Promise<Customer | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        const customer = await this.CustomerModel.findOne({name: customerName});
        if (customer)
            return customer;
        else
            return false;
    }

    async getCustomers() : Promise<Customer[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        const customers = await this.CustomerModel.find({});
        if (customers.length > 0)
            return customers;
        else
            return false;
    }

    async updateCustomer(customerName:string, customer: Customer) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let customerToUpdate = await this.CustomerModel.findOne({name: customerName});
        if (customerToUpdate)
        {
            if(customer.name)
                customerToUpdate.name = customer.name;
            if(customer.email)
                customerToUpdate.email = customer.email;
            if(customer.phone)
                customerToUpdate.phone = customer.phone;
            if(customer.address)
                customerToUpdate.address = customer.address;
            if(customer.loyaltyPoints)
                customerToUpdate.loyaltyPoints = customer.loyaltyPoints;

            await customerToUpdate.save()
            .then(function()
            {
                console.log("Customer " + customerName + " has been updated!");
            }).catch(function(err: any)
            {
                console.log(err);
            });
            return true;
        }
        else
            return false;
    }

    async addLoyaltyPoints(customerName: string, loyaltyPoints: number) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        let customer = await this.CustomerModel.findOne({name: customerName});
        if (customer)
        {
            let newLoyaltyPoints = +customer.loyaltyPoints + +loyaltyPoints;
            customer.loyaltyPoints = newLoyaltyPoints;
            await this.CustomerModel
            .updateOne({name: customerName}, customer)
            .then(function()
            {
                console.log(loyaltyPoints + " loyalty points have been added to " + customerName + "!")
            }).catch(function(err: any)
            {
                console.log(err);
            });
            return true;
        }
        else
            return false;
    }
}

