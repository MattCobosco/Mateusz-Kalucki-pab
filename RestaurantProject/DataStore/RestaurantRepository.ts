import {Schema, model, connect} from 'mongoose';
import Restaurant from '../CoreBusiness/RestaurantModel';

export class RestaurantRepository
{
    restaurantSchema = new Schema<Restaurant>(
        {
            name: {type: String, required: true},
            address: {type: String, required: true},
            phone: {type: String, required: true},
            nip: {type: String, required: true},
            email: {type: String, required: true},
            website: {type: String, required: true},
            description: String
        });

    RestaurantModel = model<Restaurant>('Restaurant', this.restaurantSchema);

    async populateRestaurants() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const restaurants = [
            {
                name: 'Restaurant1',
                address: 'Address1',
                phone: '123456789',
                nip: '123456789',
                email: 'someEmail@something.com',
                website: 'someWebsite.com'
            },
            {
                name: 'Restaurant2',
                address: 'Address2',
                phone: '987654321',
                nip: '987654321',
                email: 'someEmail@somethingElse.com',
                website: 'someOtherWebsite.com'
            }];

        await this.RestaurantModel
        .insertMany(restaurants)
        .then(function()
        {
            console.log("Restaurants have been populated!")
        }).catch(function(err)
        {
            console.log(err);
        });
    }

    async addRestaurant(restaurant: Restaurant) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.RestaurantModel
        .create(restaurant)
        .then(function()
        {
            console.log("Restaurant" + restaurant.name + "has been added!");
        }).catch(function(err)
        {
            console.log(err);
        });
    }

    async deleteRestaurantByName(restaurantName: string) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        await this.RestaurantModel
        .deleteOne({name: restaurantName})
        .then(function()
        {
            console.log("Restaurant" + restaurantName + "has been deleted!")
        }).catch(function(err)
        {
            console.log(err);
        });
    }
    
    async getRestaurantByName(restaurantName: string) : Promise<Restaurant>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        let restaurant = await this.RestaurantModel.findOne({name: restaurantName});
        if (restaurant)
            return restaurant;
        else
            return null as any;
    }

    async getRestaurants() : Promise<Restaurant[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        return await this.RestaurantModel.find({});
    }

    async updateRestaurant(restaurant: Restaurant) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.RestaurantModel
        .updateOne({name: restaurant.name}, restaurant)
        .then(function()
        {
            console.log("Restaurant" + restaurant.name + "has been updated!")
        }
        ).catch(function(err)
        {
            console.log(err);
        });
    }
}

