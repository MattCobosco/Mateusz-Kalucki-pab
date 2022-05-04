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
    productId: number;
    name: string;
    price: number;
    quantity: number;
    unit: Unit;

    constructor(productId: number, name: string, price: number, quantity: number, unit: Unit)
    {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.unit = unit;
    }
}

export default Product;