import {Schema, model, connect} from 'mongoose';
import Table from '../CoreBusiness/Table';

export class TableRepository
{
    tableSchema = new Schema<Table>(
        {
            number: {type: Number, required: true},
            seats: {type: Number, required: true},
            status: {type: Number, required: true}
        });

    TableModel = model<Table>('Table', this.tableSchema);

    async populateTables() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const tables = 
        [
            {
                number: 1,
                seats: 4,
                status: 0
            },
            {
                number: 2,
                seats: 4,
                status: 1
            },
            {
                number: 3,
                seats: 6,
                status: 2
            },
            {
                number: 4,
                seats: 8,
                status: 3
            }
        ];

        if(await this.TableModel.countDocuments() === 0)
        {
            await this.TableModel
            .insertMany(tables)
            .then(function()
            {
                console.log("Tables have been populated!")
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
    }  
    
    async addTable(table: Table) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const alreadyExists = await this.TableModel.findOne({number: table.number});
        if(alreadyExists)
            return false;

        await this.TableModel
        .create(table)
        .then(function()
        {
            console.log("Table " + table.number + " has been added!");
        }
        ).catch(function(err: any)
        {
            console.log(err);
        });

        const existsAfter = await this.TableModel.findOne({number: table.number});
        if (existsAfter)
            return true;
        else
            return false;
    }

    async deleteTableByNumber(tableNumber: number) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
    
        const exists = await this.TableModel.exists({number: tableNumber});
        if (!exists)
            return false;

        await this.TableModel
        .deleteOne({number: tableNumber})
        .then(function()
        {
            console.log("Table " + tableNumber + " has been deleted!");
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const existsAfter = await this.TableModel.exists({number: tableNumber});
        if (!existsAfter)
            return true;
        else
            return false;
    }

    async getTableByNumber(tableNumber: number) : Promise<Table | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
    
        const table = await this.TableModel.findOne({number: tableNumber});
        if (table)
            return table;
        else
            return false;
    }

    async getTables() : Promise<Table[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
    
        const tables = await this.TableModel.find({});
        if (tables)
            return tables;
        else
            return false;
    }

    async updateTableByNumber(tableNumber:number, table: Table) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let tableToUpdate = await this.TableModel.findOne({number: tableNumber});
        if (tableToUpdate)
        {
            if(table.number)
                tableToUpdate.number = table.number;
            if(table.seats)
                tableToUpdate.seats = table.seats;
            if(table.status)
                tableToUpdate.status = table.status;

            await this.TableModel
            .updateOne({number: tableNumber}, tableToUpdate)
            .then(function()
            {
                console.log("Table " + tableNumber + " has been updated!");
            }).catch(function(err: any)
            {
                console.log(err);
            });
            return true;
        }
        else
            return false;
    }
}