import {Schema, model, connect} from 'mongoose';
import Reservation from '../CoreBusiness/ReservationModel';

export class ReservationRepository
{
    reservationSchema = new Schema<Reservation>(
        {
            table: {type: Schema.Types.ObjectId, ref: 'Table'},
            startDateTime: {type: Date, required: true},
            endDateTime: {type: Date, required: true},
            customer: {type: Schema.Types.ObjectId, ref: 'Customer'}
        });

    ReservationModel = model<Reservation>('Reservation', this.reservationSchema);

    async populateReservations() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        const reservations = 
        [
            {
                table: '6284ab720b1b925fc9c801fe',
                startDateTime: new Date(2020, 1, 1, 10, 0, 0, 0),
                endDateTime: new Date(2020, 1, 1, 11, 0, 0, 0),
                customer: '6282601eb18137f01f157f6f'
            },
            {
                table: '6284ab720b1b925fc9c801ff',
                startDateTime: new Date(2020, 1, 1, 11, 0, 0, 0),
                endDateTime: new Date(2020, 1, 1, 12, 0, 0, 0),
                customer: '62826610ec4736a45905ecae'
            }
        ];

        if(await this.ReservationModel.countDocuments() === 0)
        {
            await this.ReservationModel
            .insertMany(reservations)
            .then(function()
            {
                console.log("Reservations have been populated!")
            }).catch(function(err: any)
            {
                console.log(err);
            }); 
        }
    }

    async addReservation(reservation: Reservation) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.ReservationModel
        .create(reservation)
        .then(function()
        {
            console.log("Reservation for table " + reservation.table.number + " has been added!");
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async deleteReservationById(reservationId: string) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.ReservationModel
        .deleteOne({_id: reservationId})
        .then(function()
        {
            console.log("Reservation of ID " + reservationId + " has been deleted!");
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async getReservations() : Promise<Reservation[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
    
        return await this.ReservationModel.find({});
    }

    async getReservationById(reservationId: string) : Promise<Reservation>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let reservation = await this.ReservationModel.findById(reservationId);

        if(reservation)
            return reservation;
        else
            return null as any;
    }

    async updateReservationById(reservationId: string, reservation: Reservation) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let reservationToUpdate = await this.ReservationModel.findById(reservationId);

        if(reservationToUpdate)
        {
            if(reservation.table)
                reservationToUpdate.table = reservation.table;
            if(reservation.startDateTime)
                reservationToUpdate.startDateTime = reservation.startDateTime;
            if(reservation.endDateTime)
                reservationToUpdate.endDateTime = reservation.endDateTime;
            if(reservation.customer)
                reservationToUpdate.customer = reservation.customer;

            await reservationToUpdate.save().
            then(function()
            {
                console.log("Reservation of ID " + reservationId + " has been updated!");
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
    }

    async getReservationsByCustomerId(customerId: string) : Promise<Reservation[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        return await this.ReservationModel.find({customer: customerId});
    }

    async getReservationsByTableId(tableId: string) : Promise<Reservation[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        return await this.ReservationModel.find({table: tableId});
    }
}