import { Schema } from "mongoose";

class Customer
{
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    loyaltyPoints: number;

    constructor(id: string, name: string, email: string, phone: string, address: string)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.loyaltyPoints = 0;
    }
}

export default Customer;