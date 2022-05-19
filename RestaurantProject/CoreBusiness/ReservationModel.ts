import Table from './TableModel';
import Customer from './CustomerModel';

class Reservation
{
    id: string;
    table: Table;
    startDateTime: Date;
    endDateTime: Date;
    customer: Customer;

    constructor(id: string, table: Table, startDateTime: Date, endDateTime: Date, customer: Customer)
    {
        this.id = id;
        this.table = table;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.customer = customer;
    }
}

export default Reservation;