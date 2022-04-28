import Employee from "./EmployeeModel";
import MenuItem from "./MenuItemModel";
import Table from "./TableModel";

enum OrderStatus 
{
    Submitted,
    InProgress,
    Completed,
    BillIssued
}

class Order
{
    employee: Employee;
    items: MenuItem[];
    status: OrderStatus;
    table: Table;
    price: number;
    
    constructor(employee: Employee, items: MenuItem[], status: OrderStatus, table: Table, price: number)
    {
        this.employee = employee;
        this.items = items;
        this.status = status;
        this.table = table;
        this.price = price;
    }
}

export default Order;