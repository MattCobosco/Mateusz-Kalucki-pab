import Product from './ProductModel';

enum Type
{
    Starter,
    MainDish,
    SideDish,
    Drink,
    Dessert
}

class MenuItem
{
    menuItemId: number,
    name: string;
    price: number;
    type: Type;
    description: string;
    products: Product[];

    constructor(menuItemId: number, name: string, price: number, type: Type, description: string, products: Product[])
    {
        this.menuItemId = menuItemId;
        this.name = name;
        this.price = price;
        this.type = type;
        this.description = description;
        this.products = products;
    }
}

export default MenuItem;