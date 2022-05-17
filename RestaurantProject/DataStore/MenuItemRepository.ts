import {Schema, model, connect} from 'mongoose';
import MenuItem from '../CoreBusiness/MenuItemModel';

export class MenuItemRepository
{
    MenuItemSchema = new Schema<MenuItem>(
        {
            name: {type: String, required: true},
            price: {type: Number, required: true},
            type: {type: Number, required: true},
            description: {type: String, required: true},
            products: [{type: Schema.Types.ObjectId, ref: 'Product', required: true}]
        });

    MenuItemModel = model<MenuItem>('MenuItem', this.MenuItemSchema);

    async populateMenuItems() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        const menuItems =
        [
            {
                name: 'Coca_Cola',
                price: 5,
                type: 3,
                description: 'Coca Cola can',
                products: 
                [
                        '6283c1db0ff7f2140b54e984'
                ]
            },
            {
                name: 'Fanta',
                price: 5,
                type: 3,
                description: 'Fanta can',
                products: 
                [
                    '6283c1db0ff7f2140b54e985'
                ]
            },
            {
                name: 'Vegetable soup',
                price: 15,
                type: 2,
                description: 'Vegetable soup made of carrot, parsley, onion, tomato and cucumber',
                products: 
                [
                    '6283c1db0ff7f2140b54e986',
                    '6283c1db0ff7f2140b54e987',
                    '6283c1db0ff7f2140b54e988',
                    '6283c1db0ff7f2140b54e989',
                    '6283c1db0ff7f2140b54e98a'
                ]
            },
            {
                name: 'Red Wine',
                price: 15,
                type: 4,
                description: 'Red wine',
                products: 
                [
                    '6283c2b5ed64cb8ae6973cdb'
                ]
            }
        ];

        if(await this.MenuItemModel.countDocuments() === 0)
        {
            await this.MenuItemModel
            .insertMany(menuItems)
            .then(function()
            {
                console.log('Menu items populated');
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
    }

    async addMenuItem(menuItem: MenuItem) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.MenuItemModel
        .create(menuItem)
        .then(function()
        {
            console.log('Menu item ' + menuItem.name + ' has been added!');
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async deleteMenuItemByName(menuItem: string) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.MenuItemModel
        .deleteOne({name: menuItem})
        .then(function()
        {
            console.log('Menu item ' + menuItem + ' has been deleted!');
        }).catch(function(err: any)
        {
            console.log(err);
        });

    }

    async getMenuItemByName(menuItemName: string) : Promise<MenuItem>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let menuItem = await this.MenuItemModel.findOne({name: menuItemName});

        if(menuItem)
        {
            return menuItem;
        }
        else
        {
            console.log("Menu item " + menuItemName + " not found!");
            return null as any;
        }
    }

    async getMenuItems() : Promise<MenuItem[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        return await this.MenuItemModel.find();
    }

    async updateMenuItem(menuItemName: string, menuItem: MenuItem) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let menuItemToUpdate = await this.MenuItemModel.findOne({name: menuItemName});

        if(menuItemToUpdate)
        {
            if(menuItem.name)
                menuItemToUpdate.name = menuItem.name;
            if(menuItem.price)
                menuItemToUpdate.price = menuItem.price;
            if(menuItem.type)
                menuItemToUpdate.type = menuItem.type;
            if(menuItem.description)
                menuItemToUpdate.description = menuItem.description;
            if(menuItem.products)
                menuItemToUpdate.products = menuItem.products;

            await menuItemToUpdate.save()
            .then(function()
            {
                console.log('Menu item ' + menuItemName + ' has been updated!');
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
        else {
            console.log('Menu item ' + menuItemName + ' does not exist!');
        }
    }
}