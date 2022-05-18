import Product from './ProductModel';

enum Type
{
    Starter,
    MainDish,
    Soup,
    Drink,
    Dessert
}

class MenuItem
{
    name: string;
    price: number;
    type: Type;
    description: string;
    products: Product[];

    constructor(name: string, price: number, type: Type, description: string, products: Product[])
    {
        this.name = name;
        this.price = price;
        this.type = type;
        this.description = description;
        this.products = products;
    }
}

export default MenuItem;