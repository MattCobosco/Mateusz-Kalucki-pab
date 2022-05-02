class Employee
{
    employeeId: number;
    name: string;
    surname: string;
    position: string
    restaurantName: string;

    constructor(employeeId: number, name: string, surname: string, position: string, restaurantName: string)
    {
        this.employeeId = employeeId;
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.restaurantName = restaurantName;
    }
}

export default Employee;