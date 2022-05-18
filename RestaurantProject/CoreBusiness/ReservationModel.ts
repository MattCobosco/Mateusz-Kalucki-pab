import Table from './TableModel';
import Customer from './CustomerModel';

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