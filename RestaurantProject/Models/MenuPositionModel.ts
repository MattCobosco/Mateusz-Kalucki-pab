import Product from './ProductModel';

enum Type
{
    Starter,
    MainDish,
    SideDish,
    Drink,
    Dessert
}

enum Unit{
    piece,
    g,
    ml,
    kg,
    l
}

class MenuPosition
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

export default MenuPosition;