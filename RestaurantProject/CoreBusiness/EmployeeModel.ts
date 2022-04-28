import Restaurant from "./RestaurantModel";

class Employee
{
    name: string;
    surname: string;
    position: string
    restaurant: Restaurant;

    constructor(name: string, surname: string, position: string, restaurant: Restaurant)
    {
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.restaurant = restaurant;
    }
}

export default Employee;