import {Schema, model, connect} from 'mongoose';
import MenuItem from '../CoreBusiness/MenuItem';
import Product from '../CoreBusiness/Product';

export class MenuItemRepository
{
    productSchema = new Schema<Product>({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true}
    });

    menuItemSchema = new Schema<MenuItem>(
        {
            name: {type: String, required: true},
            price: {type: Number, required: true},
            type: {type: Number, required: true},
            description: {type: String, required: true},
            products: 
            [{
                type: this.productSchema, 
                required: true
            }]
        });

    MenuItemModel = model<MenuItem>('MenuItem', this.menuItemSchema);

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
                    {
                        name: "Coca_Cola_Can",
                        price: 2.5,
                        quantity: 1
                    }
                ]
            },
            {
                name: 'Fanta',
                price: 5,
                type: 3,
                description: 'Fanta can',
                products:
                [
                    {
                        name: "Fanta_Can",
                        price: 2.5,
                        quantity: 1
                    }
                ]        
            },
            {
                name: 'Vegetable_Soup',
                price: 15,
                type: 2,
                description: 'Vegetable soup made of carrot, parsley, onion, tomato and cucumber',
                products: 
                [
                    {
                        name: "Carrot",
                        price: 1.5,
                        quantity: 2
                    },
                    {
                        name: "Parsley",
                        price: 1.5,
                        quantity: 1
                    },
                    {
                        name: "Onion",
                        price: 1.5,
                        quantity: 1
                    },
                    {
                        name: "Tomato",
                        price: 1.5,
                        quantity: 2
                    },
                    {
                        name: "Cucumber",
                        price: 1.5,
                        quantity: 1
                    }
                ]
            },
            {
                name: 'Red_Wine',
                price: 15,
                type: 3,
                description: 'Red wine bottle',
                products: 
                [
                    {
                        name: "Red_Wine_Bottle",
                        price: 5,
                        quantity: 1
                    }
                ]
            },
            {
                name: 'Springrolls',
                price: 25,
                type: 0,
                description: 'Springrolls made of chicken, cabbage, onion, carrot and mushroom',
                products:
                [
                    {
                        name: "Chicken",
                        price: 3,
                        quantity: 1
                    },
                    {
                        name: "Cabbage",
                        price: 2,
                        quantity: 1
                    },
                    {
                        name: "Onion",
                        price: 1.5,
                        quantity: 1
                    },
                    {
                        name: "Carrot",
                        price: 1.5,
                        quantity: 1
                    },
                    {
                        name: "Mushroom",
                        price: 1,
                        quantity: 1
                    }
                ]
            },
            {
                name: 'Chicken_Nuggets',
                price: 30,
                type: 1,
                description: 'Chicken nuggets',
                products:
                [
                    {
                        name: "Chicken",
                        price: 3,
                        quantity: 2
                    }
                ]
            }
        ];

        if(await this.MenuItemModel.countDocuments() === 0)
        {
            await this.MenuItemModel
            .insertMany(menuItems)
            .then(function()
            {
                console.log("Menu items have been populated!");
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
    }

    async addMenuItem(menuItem: MenuItem) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const alreadyExists = await this.MenuItemModel.findOne({name: menuItem.name});
        if(alreadyExists)
            return false;

        await this.MenuItemModel
        .create(menuItem)
        .then(function()
        {
            console.log("Menu item " + menuItem.name + " has been added!");
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const existsAfter = await this.MenuItemModel.findOne({name: menuItem.name});
        if(existsAfter)
            return true;
        else
            return false;
    }

    async deleteMenuItemByName(menuItemName: string) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const exists = await this.MenuItemModel.findOne({name: menuItemName});
        if(!exists)
            return false;

        await this.MenuItemModel
        .deleteOne({name: menuItemName})
        .then(function()
        {
            console.log("Menu item " + menuItemName + " has been deleted!");
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const existsAfter = await this.MenuItemModel.findOne({name: menuItemName});
        if(!existsAfter)
            return true;
        else
            return false;
    }

    async getMenuItemByName(menuItemName: string) : Promise<MenuItem | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const menuItem = await this.MenuItemModel.findOne({name: menuItemName});
        if(menuItem)
            return menuItem;
        else
            return false;
    }

    async getMenuItems() : Promise<MenuItem[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const menuItems = await this.MenuItemModel.find();
        if(menuItems)
            return menuItems;
        else
            return false;
    }

    async updateMenuItem(menuItemName: string, menuItem: MenuItem) : Promise<boolean>
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
                console.log("Menu item " + menuItemName + " has been updated!");
            }).catch(function(err: any)
            {
                console.log(err);
            });
            return true;
        }
        else
            return false;
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