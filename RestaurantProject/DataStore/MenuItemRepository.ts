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
                        '6283f1ac7309e224f7c500ee'
                ]
            },
            {
                name: 'Vegetable_Soup',
                price: 15,
                type: 2,
                description: 'Vegetable soup made of carrot, parsley, onion, tomato and cucumber',
                products: 
                [
                    '6283f1ac7309e224f7c500f0',
                    '6283f1ac7309e224f7c500f1',
                    '6283f1ac7309e224f7c500f2',
                    '6283f1ac7309e224f7c500f3',
                    '6283f1ac7309e224f7c500f4'
                ]
            },
            {
                name: 'Red_Wine',
                price: 15,
                type: 3,
                description: 'Red wine bottle',
                products: 
                [
                    '6283f1ac7309e224f7c500f5'
                ]
            },
            {
                name: 'Springrolls',
                price: 25,
                type: 0,
                description: 'Springrolls made of chicken, cabbage, onion, carrot and mushroom',
                products:
                [
                    '6283f1ac7309e224f7c500f6',
                    '6283f1ac7309e224f7c500f8',
                    '6283f1ac7309e224f7c500f2',
                    '6283f1ac7309e224f7c500f0',
                    '6283f1ac7309e224f7c500f7'
                ]
            },
            {
                name: 'Chicken_Nuggets',
                price: 30,
                type: 1,
                description: 'Chicken nuggets',
                products:
                [
                    '6283f1ac7309e224f7c500f6'
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

    async getMenuItemById(id: string) : Promise<MenuItem>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let menuItem = await this.MenuItemModel.findById(id);

        if(menuItem)
        {
            return menuItem;
        }
        else
        {
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

    async getMenu() : Promise<MenuCategory[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        // gets all menu items
        let menuItems = await this.MenuItemModel.find();
        let menu: MenuCategory[] = [];
        let starters: MenuPosition[] = [];
        menu.push({name: 'Starters', menuPositions: starters});
        let mains: MenuPosition[] = [];
        menu.push({name: 'Mains', menuPositions: mains});
        let soups: MenuPosition[] = [];
        menu.push({name: 'Soups', menuPositions: soups});
        let drinks: MenuPosition[] = [];
        menu.push({name: 'Drinks', menuPositions: drinks});
        let desserts: MenuPosition[] = [];
        menu.push({name: 'Desserts', menuPositions: desserts});

        // iterates through all menu items
        for(let i = 0; i < menuItems.length; i++)
        {
            // gets menu item
            let menuItem = menuItems[i];
            // gets menu item type
            let menuItemCategory = menuItem.type;
            // maps menu item to menu position (name, price, description)
            let menuPosition : MenuPosition = {
                name: menuItem.name,
                price: menuItem.price,
                description: menuItem.description
            };
            
            // puts menu item in the correct menu category based on type
            menu[menuItemCategory].menuPositions.push(menuPosition);
        }

        // returns menu
        return menu;
    }
}

// support class to build menu
export class MenuCategory
{
    name: string;
    menuPositions: MenuPosition[];

    constructor(name: string, menuPositions: MenuItem[])
    {
        this.name = name;
        this.menuPositions = menuPositions;
    }
}

// simplified menu item
export class MenuPosition
{
    name: string;
    price: number;
    description: string;

    constructor(name: string, price: number, description: string)
    {
        this.name = name;
        this.price = price;
        this.description = description;
    }
}