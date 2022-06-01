import Table from './Table';
import Customer from './Customer';

class Reservation
{
    table: Table;
    startDateTime: Date;
    endDateTime: Date;
    customer: Customer;

    constructor(table: Table, startDateTime: Date, endDateTime: Date, customer: Customer)
    {
        this.table = table;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.customer = customer;
    }
}

export default Reservation;