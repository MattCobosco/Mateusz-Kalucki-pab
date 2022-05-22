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

    async populateProductDemandList() : Promise<void>
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

        if(!fs.existsSync('../DemandList.json'))
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
    
    async getProductFromDemandListByName(productName: string) : Promise<Product | boolean>
    {
        const demandList = await JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'));

        const product = await demandList.find((product: { name: string; }) => product.name === productName);
        if(product)
            return product;
        else
            return false;
    }

    async addProductToDemandList(product: Product) : Promise<boolean | string>
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

    async deleteProductFromDemandListByName(productName: string) : Promise<boolean | string>
    {
        const demandList = await JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'));

        const exists = await demandList.find((p: { name: string; }) => p.name === productName);
        if(!exists)
            return "Product does not exist in the list.";

        demandList.splice(demandList.indexOf(exists), 1);
        fs.writeFileSync('../DemandList.json', JSON.stringify(demandList));

        const existsAfter = await demandList.find((p: { name: string; }) => p.name === productName);
        if(!existsAfter)
            return true;
        else
            return "Product " + productName + " has not been deleted from the list.";
    }

    async updateProductInDemandListByName(productName: string, product: Product) : Promise<boolean>
    {
        const demandList = await JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'));

        let productToUpdate = await demandList.find((p: { name: string; }) => p.name === productName);
        if(productToUpdate)
        {
            if(product.name)
                productToUpdate.name = product.name;
            if(product.price)
                productToUpdate.price = product.price;
            if(product.quantity)
                productToUpdate.quantity = product.quantity;

            fs.writeFileSync('../DemandList.json', JSON.stringify(demandList));
            return true;
        }
        else
            return false;
    }

    async getDemandListValue() : Promise<number>
    {
        const demandList : Product[] = await JSON.parse(fs.readFileSync('../DemandList.json', 'utf8'));
        let demandListValue = 0;
        for(let listItem of demandList)
        {
            demandListValue += +listItem.price * +listItem.quantity;
        }
        return +demandListValue;
    }
}