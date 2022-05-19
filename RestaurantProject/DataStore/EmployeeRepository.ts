import {Schema, model, connect} from 'mongoose';
import Employee from '../CoreBusiness/EmployeeModel';
import Restaurant from '../CoreBusiness/RestaurantModel';

export class EmployeeRepository
{
    employeeSchema = new Schema<Employee>(
        {
            name: {type: String, required: true},
            surname: {type: String, required: true},
            position: {type: String, required: true},
            restaurant: {type: Restaurant, required: true}
        });

    EmployeeModel = model<Employee>('Employee', this.employeeSchema);

    async populateEmployees() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const employees =
        [
            {
                name: 'Employee1',
                surname: 'Employee1',
                position: 'Manager',
                restaurant: {
                    name: 'Restaurant1',
                    address: 'Address1',
                    phone: '123456789',
                    nip: '123456789',
                    email: 'someEmail@something.com',
                    website: 'someWebsite.com'
                }
            },
            {
                name: 'Employee2',
                surname: 'Employee2',
                position: 'Waiter',
                restaurant: 
                {
                    name: 'Restaurant1',
                    address: 'Address1',
                    phone: '123456789',
                    nip: '123456789',
                    email: 'someEmail@something.com',
                    website: 'someWebsite.com'
                }
            },
            {
                name: 'Employee3',
                surname: 'Employee3',
                position: 'Waiter',
                restaurant: 
                {
                    name: 'Restaurant1',
                    address: 'Address1',
                    phone: '123456789',
                    nip: '123456789',
                    email: 'someEmail@something.com',
                    website: 'someWebsite.com'
                }
            },
            {
                name: 'Employee4',
                surname: 'Employee4',
                position: 'Manager',
                restaurant: 
                {
                    name: 'Restaurant1',
                    address: 'Address1',
                    phone: '123456789',
                    nip: '123456789',
                    email: 'someEmail@something.com',
                    website: 'someWebsite.com'
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
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
    }

    async addEmployee(employee: Employee) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        await this.EmployeeModel
        .create(employee)
        .then(function()
        {
            console.log("Employee " + employee.surname + " has been added!");
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const result = await this.EmployeeModel.findOne({surname: employee.surname});
        if(result)
            return true;
        else
            return false;
    }

    async deleteEmployeeBySurname(employeeSurname: string) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.EmployeeModel
        .deleteOne({surname: employeeSurname})
        .then(function()
        {
            console.log("Employee " + employeeSurname + " has been deleted!");
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async getEmployeeBySurname(employeeSurname: string) : Promise<Employee>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let employee = await this.EmployeeModel.findOne({surname: employeeSurname});
        if(employee)
        {
            return employee;
        }
        else
        {
            return null as any;
        }
    }

    async getEmployees() : Promise<Employee[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
    
        let employees = await this.EmployeeModel.find();
        if(employees)
        {
            return employees;
        }
        else
        {
            return null as any;
        }
    }

    async getEmployeesByRestaurantName(restaurantName: string) : Promise<Employee[]>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let employees = await this.EmployeeModel.find({restaurant: restaurantName});
        if(employees)
        {
            return employees;
        }
        else
        {
            return null as any;
        }
    }

    async updateEmployee(employeeSurname: string, employee: Employee) : Promise<boolean>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let employeeToUpdate = await this.EmployeeModel.findOne({surname: employeeSurname});

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
                console.log("Employee " + employee.surname + " has been updated!");
            }).catch(function(err: any)
            {
                console.log(err);
            });

            return true;
        }
        else 
        {
            console.log("Employee " + employee.surname + " does not exist!");
            return false;
        }
    }
}