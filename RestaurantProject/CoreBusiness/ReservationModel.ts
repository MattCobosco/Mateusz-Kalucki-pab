import Table from './TableModel';
import Customer from './CustomerModel';

class Reservation
{
    reservationId: Number;
    tableNumber: Number;
    startDateTime: Date;
    endDateTime: Date;
    customerId: Number;

    constructor(reservationId: Number, table: Table, startDateTime: Date, endDateTime: Date, customer: Customer)
    {
        this.reservationId = reservationId;
        this.tableNumber = table.tableNumber;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.customerId = customer.customerId;
    }
}

export default Reservation;