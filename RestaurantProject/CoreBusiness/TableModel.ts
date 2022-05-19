enum TableStatus
{
    Available,
    Occupied,
    Dirty,
    OutOfOrder
}

class Table
{
    id: string;
    number: number;
    seats: number;
    status: TableStatus;

    constructor(id: string, number: number, seats: number, status: TableStatus)
    {
        this.id = id;
        this.number = number;
        this.seats = seats;
        this.status = status;
    }
}

export default Table;