import {Schema, model, connect} from 'mongoose';
import Product from '../CoreBusiness/ProductModel';

export class ProductRepository
{
    productSchema = new Schema<Product>(
        {
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
                name: 'Coca_Cola_Can',
                price: 2.5,
                quantity: 250
            },
            {
                name: 'Fanta_Can',
                price: 2.5,
                quantity: 250
            },
            {
                name: 'Carrot',
                price: 1.5,
                quantity: 100
            },
            {
                name: 'Parsley',
                price: 1.5,
                quantity: 100
            },
            {
                name: 'Onion',
                price: 1.5,
                quantity: 100
            },
            {
                name: 'Tomato',
                price: 1.5,
                quantity: 100
            },
            {
                name: 'Cucumber',
                price: 1.5,
                quantity: 100
            },
            {
                name: 'Red_Wine_Bottle',
                price: 5,
                quantity: 50
            }
        ];

        if (await this.ProductModel.countDocuments() === 0)
        {
            await this.ProductModel
            .insertMany(products)
            .then(function()
            {
                console.log("Products have been populated!")
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
    }

    async addProduct(product: Product) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        await this.ProductModel
        .create(product)
        .then(function()
        {
            console.log("Product " + product.name + " has been added!");
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async deleteProductByName(productName: string) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        await this.ProductModel
        .deleteOne({name: productName})
        .then(function()
        {
            console.log("Product " + productName + " has been deleted!");
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async getProductByName(productName: string) : Promise<Product>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let product = await this.ProductModel.findOne({name: productName});
        
        if(product)
            return product;
        else
            return null as any;
    }

    async getProducts() : Promise<Product[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        return this.ProductModel.find({});
    }

    async updateProduct(productName:string, product: Product) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let productToUpdate = await this.ProductModel.findOne({name: productName});

        if(productToUpdate)
        {
            if(product.name)
                productToUpdate.name = product.name;
            if(product.price)
                productToUpdate.price = product.price;
            if(product.quantity)
                productToUpdate.quantity = product.quantity;

            await productToUpdate.save()
            .then(function()
            {
                console.log("Product " + productName + " has been updated!");
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
        else    
        {
            console.log("Product " + productName + " does not exist!");
        }
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