enum Unit
{
    piece,
    g,
    ml,
    kg,
    l
}

class Product
{
    name: string;
    price: number;
    quantity: number;
    unit: Unit;

    constructor(name: string, price: number, quantity: number, unit: Unit)
    {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.unit = unit;
    }
}

export default Product;