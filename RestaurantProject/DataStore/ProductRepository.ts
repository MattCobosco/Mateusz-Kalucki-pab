import {Schema, model, connect} from 'mongoose';
import Product from '../CoreBusiness/ProductModel';

export class ProductRepository
{
    productSchema = new Schema<Product>(
        {
            productId: {type: Number, required: true},
            name: {type: String, required: true},
            price: {type: Number, required: true},
            quantity: {type: Number, required: true}
        });

    ProductModel = model<Product>('Product', this.productSchema);


    async populateProducts() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const products =
        [
            {
                productId: 1,
                name: 'Coca Cola',
                price: 2.5,
                quantity: 330,
                unit: 2
            },
            {
                productId: 2,
                name: 'Fanta',
                price: 2.5,
                quantity: 330,
                unit: 2
            },
            {
                productId: 3,
                name: 'Carrot',
                price: 1.5,
                quantity: 1,
                unit: 0,
            },
            {
                productId: 4,
                name: 'Parsley',
                price: 1.5,
                quantity: 1,
                unit: 0,
            },
            {
                productId: 5,
                name: 'Onion',
                price: 1.5,
                quantity: 1,
                unit: 0,
            },
            {
                productId: 6,
                name: 'Tomato',
                price: 1.5,
                quantity: 1,
                unit: 0,
            },
            {
                productId: 7,
                name: 'Cucumber',
                price: 1.5,
                quantity: 1,
                unit: 0,
            },
            {
                productId: 8,
                name: 'Red Wine',
                price: 5,
                quantity: 700,
                unit: 2
            }
        ];

        await this.ProductModel
        .insertMany(products)
        .then(function()
        {
            console.log("Products have been populated!")
        }).catch(function(err)
        {
            console.log(err);
        });
    }

    async addProduct(product: Product) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        await this.ProductModel
        .create(product)
        .then(function()
        {
            console.log("Product " + product.productId + " has been added!");
        }).catch(function(err)
        {
            console.log(err);
        });
    }

    async deleteProductByNumber(productId: number) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.ProductModel
        .deleteOne({productId: productId})
        .then(function()
        {
            console.log("Product " + productId + " has been deleted!");
        }).catch(function(err)
        {
            console.log(err);
        });
    }

    async getProductByNumber(productId: number) : Promise<Product>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let product = await this.ProductModel.findOne({productId: productId})
        
        if(product)
            return product;
        else
            return null as any;
    }

    async getProducts()
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        return this.ProductModel.find({});
    }

    async updateProduct(product: Product) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.ProductModel
        .updateOne({productId: product.productId}, product)
        .then(function()
        {
            console.log("Product " + product.productId + " has been updated!");
        }).catch(function(err)
        {
            console.log(err);
        });
    }
}

export class ProductDemandList
{
    productNames : string[] = [];
    productQuantities : number[] = [];
    
    constructor()
    {
        this.productNames = [];
        this.productQuantities = [];
    }

    AddProduct(product: Product)
    {
        let index = this.productNames.indexOf(product.name);
        if(index == -1)
        {
            this.productNames.push(product.name);
            this.productQuantities.push(product.quantity);
        }
        else
        {
            this.productQuantities[index] += product.quantity;
        }
    }

    GetProductNames()
    {
        return this.productNames;
    }

    GetDemandList()
    {
        return this;
    }

    GetProductQuantityByName(name: string)
    {
        let index = this.productNames.indexOf(name);
        return this.productQuantities[index];
    }

    GetProductQuantityByIndex(index: number)
    {
        return this.productQuantities[index];
    }
}