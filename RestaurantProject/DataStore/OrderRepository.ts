import {Schema, model, connect} from 'mongoose';
import Order from '../CoreBusiness/OrderModel';

export class OrderRepository
{
    orderSchema = new Schema<Order>(
        {
            employee: {type: Schema.Types.ObjectId, ref: 'Employee'},
            items: [{type: Schema.Types.ObjectId, ref: 'MenuItem'}],
            status: {type: Number, required: true},
            table: {type: Schema.Types.ObjectId, ref: 'Table'},
            price: {type: Number, required: true}
        });

    orderModel = model<Order>('Order', this.orderSchema);

    async populateOrders() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const orders =
        []
    };
}