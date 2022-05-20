import {Schema, model, connect} from 'mongoose';
import Employee from '../CoreBusiness/Employee';
import Restaurant from '../CoreBusiness/Restaurant';

export class EmployeeRepository
{
    restaurantSchema = new Schema<Restaurant>(
        {
            name: {type: String, required: true},
            address: {type: String, required: true},
            phone: {type: String, required: true},
            nip: {type: String, required: true},
            email: {type: String, required: true},
            website: {type: String, required: true},
            description: {type: String, required: false}
        });


    employeeSchema = new Schema<Employee>(
        {
            name: {type: String, required: true},
            surname: {type: String, required: true},
            position: {type: String, required: true},
            restaurant: {type: this.restaurantSchema, required: true}
        });

    EmployeeModel = model<Employee>('Employee', this.employeeSchema);

    async populateEmployees() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const employees =
        [
            {
                name: "Employee1",
                surname: "Employee1",
                position: "Manager",
                restaurant: {
                    name: "Restaurant1",
                    address: "Address1",
                    phone: "123456789",
                    nip: "123456789",
                    email: "someEmail@something.com",
                    website: "someWebsite.com"
                }
            },
            {
                name: "Employee2",
                surname: "Employee2",
                position: "Waiter",
                restaurant: 
                {
                    name: "Restaurant1",
                    address: "Address1",
                    phone: "123456789",
                    nip: "123456789",
                    email: "someEmail@something.com",
                    website: "someWebsite.com"
                }
            },
            {
                name: "Employee3",
                surname: "Employee3",
                position: "Waiter",
                restaurant: 
                {
                    name: "Restaurant1",
                    address: "Address1",
                    phone: "123456789",
                    nip: "123456789",
                    email: "someEmail@something.com",
                    website: "someWebsite.com"
                }
            },
            {
                name: "Employee4",
                surname: "Employee4",
                position: "Chef",
                restaurant: 
                {
                    name: "Restaurant1",
                    address: "Address1",
                    phone: "123456789",
                    nip: "123456789",
                    email: "someEmail@something.com",
                    website: "someWebsite.com"
                }
            }
        ];

        if(await this.EmployeeModel.countDocuments() === 0)
        {
            await this.EmployeeModel
            .insertMany(employees)
            .then(function()
            {
                console.log("Employees have been populated!")
            }).catch(function(err)
            {
                console.log(err);
            });
        }
    }

    async addEmployee(employee: Employee) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        const alreadyExists = await this.EmployeeModel.findOne({name: employee.name, surname: employee.surname});
        if(alreadyExists)
            return false;

        await this.EmployeeModel
        .create(employee)
        .then(function()
        {
            console.log("Employee " + employee.name + " " + employee.surname + " has been added!");
        }).catch(function(err)
        {
            console.log(err);
        });

        const existsAfter = await this.EmployeeModel.findOne({surname: employee.surname});
        if(existsAfter)
            return true;
        else
            return false;
    }

    async deleteEmployeeBySurnameAndName(employeeSurname: string, employeeName: string) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const exists = await this.EmployeeModel.findOne({surname: employeeSurname, name: employeeName});
        if(!exists)
            return false;

        await this.EmployeeModel
        .deleteOne({name: employeeName, surname: employeeSurname})
        .then(function()
        {
            console.log("Employee " + employeeName + " " + employeeSurname + " has been deleted!");
        }).catch(function(err)
        {
            console.log(err);
        });

        const existsAfter = await this.EmployeeModel.findOne({name: employeeName, surname: employeeSurname});
        if(!existsAfter)
            return true;
        else
            return false;
    }

    async getEmployeesBySurname(employeeSurname: string) : Promise<Employee[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const employees = await this.EmployeeModel.find({surname: employeeSurname});
        if(employees.length > 0)
            return employees;
        else
            return false;
    }

    async getEmployees() : Promise<Employee[] | boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
    
        const employees = await this.EmployeeModel.find({});
        if(employees. length > 0)
            return employees;
        else
            return false;
    }

    async updateEmployeeBySurnameAndName(employeeSurname: string, employeeName:string, employee: Employee) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let employeeToUpdate = await this.EmployeeModel.findOne({surname: employeeSurname, name: employeeName});
        if(employeeToUpdate)
        {
            if(employee.name)
             employeeToUpdate.name = employee.name;
            if(employee.surname)
                employeeToUpdate.surname = employee.surname;
            if(employee.position)
                employeeToUpdate.position = employee.position;
            if(employee.restaurant)
                employeeToUpdate.restaurant = employee.restaurant;
    
            await employeeToUpdate.save()
            .then(function()
            {
                console.log("Employee " + employee.surname + " " + employee.name + " has been updated!");
            }).catch(function(err)
            {
                console.log(err);
            });

            return true;
        }
        else 
            return false;
    }
}