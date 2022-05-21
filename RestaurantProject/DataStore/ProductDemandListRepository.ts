import {Schema, model, connect} from 'mongoose';
const fs = require('fs');
import Product from "../CoreBusiness/Product";

export class ProductDemandListRepository
{
    productSchema = new Schema<Product>({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true}
    });

    async PopulateProductDemandList() : Promise<void>
    {
        //create demandlist.json
        const demandList =
        [
            {
                name: "Coca_Cola_Can",
                price: 2.5,
                quantity: 250
            },
            {
                name: "Fanta_Can",
                price: 2.5,
                quantity: 250
            },
            {
                name: "Carrot",
                price: 1.5,
                quantity: 100
            }
        ];

        if(!fs.existsSync('./DataStore/ProductDemandList.json'))
        {
            fs.writeFileSync('../DemandList.json', JSON.stringify(demandList));

            console.log('ProductDemandList.json created!');
        }
    }

    async getProductDemandList() : Promise<Product[] | boolean>
    {
        const demandList = await JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'));

        if(demandList)
            return demandList;
        else
            return false;
    }

    async addToProductDemandList(product: Product) : Promise<boolean | string>
    {
        const demandList = await JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'));

        const exists = await demandList.find((p: { name: string; }) => p.name === product.name);
        if(exists)
            return "Product " + product.name + " already exists in the list.";

        demandList.push(product);
        fs.writeFileSync('../DemandList.json', JSON.stringify(demandList));

        const existsAfter = await demandList.find((p: { name: string; }) => p.name === product.name);
        if(existsAfter)
            return true;
        else
            return "Product " + product.name + " has not been added to the list.";
    }

    async removeFromProductDemandList(product: Product) : Promise<boolean | string>
    {
        const demandList = await JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'));

        const exists = await demandList.find((p: { name: string; }) => p.name === product.name);
        if(!exists)
            return "Product does not exist in the list.";

        demandList.splice(demandList.indexOf(product), 1);
        fs.writeFileSync('../DemandList.json', JSON.stringify(demandList));

        const existsAfter = await demandList.find((p: { name: string; }) => p.name === product.name);
        if(!existsAfter)
            return true;
        else
            return "Product " + product.name + " has not been removed from the list.";
    }

    async updateProductDemandList(productName: string, product: Product) : Promise<boolean | string>
    {
        const demandList = await JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'));

        const exists = await demandList.find((p: { name: string; }) => p.name === productName);
        if(!exists)
            return "Product does not exist in the list.";

        demandList[demandList.indexOf(productName)] = product;
        fs.writeFileSync('../DemandList.json', JSON.stringify(demandList));

        const existsAfter = await demandList.find((p: { name: string; }) => p.name === productName);
        if(existsAfter)
            return true;
        else
            return "Product " + productName + " has not been updated.";
    }

    async getProductFromDemandListByName(productName: string) : Promise<Product | boolean>
    {
        const demandList = await JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'));

        const product = demandList[demandList.indexOf(productName)];
        if(product)
            return product;
        else
            return false;
    }

    async productIsBought(productName: string) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        const demandList = await JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'));

        const ProductModel = model('Product', this.productSchema);

        const product = await demandList.find((p: { name: string; }) => p.name === productName);
        if(product)
        {

            //update product quantity
            const productToUpdate = await ProductModel.findOne({name: productName});
            if(productToUpdate)
            {
                productToUpdate.quantity -= +product.quantity;
                await productToUpdate.save();
            }
            // delete product from demandlist
            demandList.splice(demandList.indexOf(product), 1);
            fs.writeFileSync('../DemandList.json', JSON.stringify(demandList));
            return true;
        }
        else
            return false;
    }
}