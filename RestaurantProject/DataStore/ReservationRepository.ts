import {Schema, model, connect} from 'mongoose';
import Reservation from '../CoreBusiness/Reservation';
import Table from '../CoreBusiness/Table';
import Customer from '../CoreBusiness/Customer';

export class ReservationRepository
{
    tableSchema = new Schema<Table>(
       {
            number: {type: Number, required: true},
            seats: {type: Number, required: true},
            status: {type: Number, required: true}
       });
    customerSchema = new Schema<Customer>(
        {
            name: {type: String, required: true},
            email: {type: String, required: true},
            phone: {type: String, required: true}
        });

    reservationSchema = new Schema<Reservation>(
        {
            table: {type: this.tableSchema, ref: 'Table'},
            startDateTime: {type: Date, required: true},
            endDateTime: {type: Date, required: true},
            customer: {type: this.customerSchema, ref: 'Customer'}
        });

    ReservationModel = model<Reservation>('Reservation', this.reservationSchema);

    async populateReservations() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        const reservations = 
        [
            {
                table: 
                {
                    number: 1,
                    seats: 4,
                    status: 0
                },
                startDateTime: new Date(2020, 1, 1, 10, 0, 0, 0),
                endDateTime: new Date(2020, 1, 1, 11, 0, 0, 0),
                customer: 
                {
                    name: "Customer1",
                    email: "customer1@gmail.com",
                    phone: "123456789",
                    address: "CustomerAddress1"
                }
            },
            {
                table: 
                {
                    number: 2,
                    seats: 4,
                    status: 1
                },
                startDateTime: new Date(2020, 1, 1, 11, 0, 0, 0),
                endDateTime: new Date(2020, 1, 1, 12, 0, 0, 0),
                customer: 
                {
                    name: "Customer2",
                    email: "customer2@gmail.com",
                    phone: "987654321",
                    address: "CustomerAddress2"
                }
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

    async addReservation(reservation: Reservation) : Promise<boolean | string >
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const alreadyExists = await this.ReservationModel.findOne({
            'table.number': reservation.table.number,
            startDateTime: reservation.startDateTime,
            endDateTime: reservation.endDateTime,
            'customer.name': reservation.customer.name
        });
        if(alreadyExists)
            return "Such reservation already exists.";

        await this.ReservationModel
        .create(reservation)
        .then(function()
        {
            console.log("Reservation for table " + reservation.table.number + " has been added!");
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const exists = await this.ReservationModel.findOne({
            'table.number': reservation.table.number,
            startDateTime: reservation.startDateTime,
            endDateTime: reservation.endDateTime,
            'customer.name': reservation.customer.name
        });
        if(exists)
            return true;
        else
            return "Reservation has not been added.";
    }

    async deleteReservationById(reservationId: string) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const exists = await this.ReservationModel.findById(reservationId);
        if(!exists)
            return false;

        await this.ReservationModel
        .findByIdAndDelete({_id: reservationId})
        .then(function()
        {
            console.log("Reservation of ID " + reservationId + " has been deleted!");
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const existsAfter = await this.ReservationModel.findById(reservationId);
        if(!existsAfter)
            return true;
        else
            return false;
    }

    async getReservationById(reservationId: string) : Promise<Reservation | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const reservation = await this.ReservationModel.findById(reservationId);
        if(reservation)
            return reservation;
        else
            return null as any;
    }

    async getReservations() : Promise<Reservation[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
    
        const reservations = await this.ReservationModel.find({});
        if(reservations.length > 0)
            return reservations;
        else
            return false;
    }

    async updateReservationById(reservationId: string, reservation: Reservation) : Promise<boolean>
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
            return true;
        }
        else
            return false;
    }

    async getReservationsByCustomerName(customerName: string) : Promise<Reservation[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const reservations = await this.ReservationModel.find({'customer.name': customerName});
        if(reservations.length > 0)
            return reservations;
        else
            return false;
    }

    async getReservationsByTableNumber(tableNumber: number) : Promise<Reservation[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const reservations = await this.ReservationModel.find({'table.number': tableNumber});
        if(reservations.length > 0)
            return reservations;
        else
            return false;
    }
}