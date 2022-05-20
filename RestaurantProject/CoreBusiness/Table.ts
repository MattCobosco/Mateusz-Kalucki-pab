enum TableStatus
{
    Available,
    Occupied,
    Dirty,
    OutOfOrder
}

class Table
{
    number: number;
    seats: number;
    status: TableStatus;

    constructor(number: number, seats: number, status: TableStatus)
    {
        this.number = number;
        this.seats = seats;
        this.status = status;
    }
}

export default Table;