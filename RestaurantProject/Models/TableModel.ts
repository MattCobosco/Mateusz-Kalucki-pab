enum TableStatus
{
    Available,
    Occupied,
    Dirty,
    OutOfOrder
}

class TableModel
{
    tableNumber: number;
    seats: number;
    status: TableStatus;

    constructor(tableNumber: number, seats: number, status: TableStatus)
    {
        this.tableNumber = tableNumber;
        this.seats = seats;
        this.status = status;
    }
}

export default TableModel;