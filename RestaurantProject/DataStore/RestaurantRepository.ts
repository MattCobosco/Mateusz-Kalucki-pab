import {Schema, model, connect} from 'mongoose';
import Restaurant from '../CoreBusiness/RestaurantModel';

const restaurantSchema = new Schema<Restaurant>(
    {
        name: {type: String, required: true},
        address: {type: String, required: true},
        phone: {type: String, required: true},
        nip: {type: String, required: true},
        email: {type: String, required: true},
        website: {type: String, required: true},
        description: String
    });

const RestaurantModel = model<Restaurant>('Restaurant', restaurantSchema);

async function populateRestaurants()
{
    await connect('ConnectionString');

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

    await RestaurantModel
    .insertMany(restaurants)
    .then(function()
    {
        console.log("Restaurants have been populated!")
    }).catch(function(err)
    {
        console.log(err);
    });
}

async function addRestaurant(restaurant: Restaurant) : Promise<void>
{
    await RestaurantModel
    .create(restaurant)
    .then(function()
    {
        console.log("Restaurant has been added!")
    });
}

async function deleteRestaurantByName(restaurantName: string) : Promise<void>
{
    await RestaurantModel
    .deleteOne({name: restaurantName})
    .then(function()
    {
        console.log("Restaurant has been deleted!")
    });
}

async function getRestaurantByName(restaurantName: string) : Promise<Restaurant>
{
    let restaurant: Restaurant;

    await RestaurantModel
    .findOne({name: restaurantName})
    .then(function(res)
    {
        restaurant = res;
    });

    return restaurant;
}

async function getRestaurants() : Promise<Restaurant[]>
{
    let restaurants: Restaurant[];

    await RestaurantModel
    .find()
    .then(function(res)
    {
        restaurants = res;
    });

    return restaurants;
}


