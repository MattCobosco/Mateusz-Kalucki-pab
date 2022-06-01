import {Schema, model, connect} from 'mongoose';
import Restaurant from '../CoreBusiness/Restaurant';

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
            description: {type: String, required: false}
        });

    RestaurantModel = model<Restaurant>('Restaurant', this.restaurantSchema);

    async populateRestaurants() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const restaurants = 
        [
            {
                name: "Restaurant1",
                address: "Address1",
                phone: "123456789",
                nip: "123456789",
                email: "someEmail@something.com",
                website: "someWebsite.com"
            },
        ];

        if(await this.RestaurantModel.countDocuments() === 0)
        {
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
    }

    async addRestaurant(restaurant: Restaurant) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const alreadyExists = await this.RestaurantModel.findOne({name: restaurant.name});
        if(alreadyExists)
            return false;

        await this.RestaurantModel
        .create(restaurant)
        .then(function()
        {
            console.log("Restaurant " + restaurant.name + " has been added!");
        }).catch(function(err)
        {
            console.log(err);
        });

        const existsAfter = await this.RestaurantModel.findOne({name: restaurant.name});
        if (existsAfter)
            return true;
        else
            return false;
    }

    async deleteRestaurantByName(restaurantName: string) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const exists = await this.RestaurantModel.exists({name: restaurantName});
        if (!exists)
            return false;

        await this.RestaurantModel
        .deleteOne({name: restaurantName})
        .then(function()
        {
            console.log("Restaurant " + restaurantName + " has been deleted!");
        }).catch(function(err)
        {
            console.log(err);
        });

        const existsAfter = await this.RestaurantModel.findOne({name: restaurantName});
        if (!existsAfter)
            return true;
        else
            return false;
    }
    
    async getRestaurantByName(restaurantName: string) : Promise<Restaurant | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        const restaurant = await this.RestaurantModel.findOne({name: restaurantName});
        if (restaurant)
            return restaurant;
        else
            return false;
    }

    async getRestaurants() : Promise<Restaurant[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        const restaurants = await this.RestaurantModel.find({});
        if(restaurants.length > 0)
            return restaurants;
        else
            return false;
    }

    async updateRestaurant(restaurantName: string, restaurant: Restaurant) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let restaurantToUpdate = await this.RestaurantModel.findOne({name: restaurantName});
        if (restaurantToUpdate)
        {
            if(restaurant.name)
                restaurantToUpdate.name = restaurant.name;
            if(restaurant.address)
                restaurantToUpdate.address = restaurant.address;
            if(restaurant.phone)
                restaurantToUpdate.phone = restaurant.phone;
            if(restaurant.nip)
                restaurantToUpdate.nip = restaurant.nip;
            if(restaurant.email)
                restaurantToUpdate.email = restaurant.email;
            if(restaurant.website)
                restaurantToUpdate.website = restaurant.website;
            if(restaurant.description)
                restaurantToUpdate.description = restaurant.description;

            await this.RestaurantModel
            .updateOne({name: restaurantName}, restaurantToUpdate)
            .then(function()
            {
                console.log("Restaurant " + restaurantName + " has been updated!");
            }).catch(function(err)
            {
                console.log(err);
            });
            return true;
        }
        else
            return false;
    }
}