import {Schema, model, connect} from 'mongoose';
import MenuItem from '../CoreBusiness/EmployeeModel';
import Product from '../CoreBusiness/ProductModel';

export class MenuItemRepository
{
    MenuItemSchema = new Schema<MenuItem>(
        {
            menuItemId: {type: Number, required: true},
            name: {type: String, required: true},
            price: {type: Number, required: true},
            type: {type: Number, required: true},
            description: {type: String, required: true},
            products: 
        });
}