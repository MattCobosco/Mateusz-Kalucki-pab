const mongoose = require('mongoose');


import { RestaurantRepository } from "./DataStore/RestaurantRepository";


const restaurantRepository = new RestaurantRepository();

// if restaurant collection is empty, populate it with some data
population();

async function population() 
{
    // check if restaurant collection exists
    await mongoose.connection.db.listCollections({ name: 'Restaurant' })
        .next(function (err: any, collinfo: any) 
        {
            if (collinfo) 
            {
                console.log("Restaurant collection exists");
            } 
            else 
            {
                restaurantRepository.populateRestaurants();
            }
        });
}
