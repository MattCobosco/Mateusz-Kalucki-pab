import {Schema, model, connect} from 'mongoose';
import Employee from '../CoreBusiness/EmployeeModel';
import {RestaurantRepository} from './RestaurantRepository';

export class EmployeeRepository
{
    employeeSchema = new Schema<Employee>(
        {
            employeeId: {type: Number, required: true},
            name: {type: String, required: true},
            surname: {type: String, required: true},
            position: {type: String, required: true},
            restaurantName: {type: String, required: true}
        });

    EmployeeModel = model<Employee>('Employee', this.employeeSchema);

    async populateEmployees() : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        const employees =
        [
            {
                employeeId: 1,
                name: 'Employee1',
                surname: 'Employee1',
                position: 'Manager',
                restaurantName: 'Restaurant1'
            },
            {
                employeeId: 2,
                name: 'Employee2',
                surname: 'Employee2',
                position: 'Waiter',
                restaurantName: 'Restaurant1'
            },
            {
                employeeId: 3,
                name: 'Employee3',
                surname: 'Employee3',
                position: 'Waiter',
                restaurantName: 'Restaurant2'
            },
            {
                employeeId: 4,
                name: 'Employee4',
                surname: 'Employee4',
                position: 'Manager',
                restaurantName: 'Restaurant2'
            }
        ];

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

    async addEmployee(employee: Employee) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        let restaurantRepository = new RestaurantRepository();
        
        let resturantExists: boolean = await restaurantRepository.CheckIfRestaurantExists(employee.restaurantName);

        if(resturantExists)
        {
            await this.EmployeeModel
            .create(employee)
            .then(function()
            {
                console.log("Employee " + employee.name + " has been added!");
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
        else
        {
            console.log("Restaurant " + employee.restaurantName + " does not exist!");
        }
    }

    async deleteEmployeeById(employeeId: number) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');
        
        await this.EmployeeModel
        .deleteOne({employeeId: employeeId})
        .then(function()
        {
            console.log("Employee " + employeeId + " has been deleted!");
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async deleteEmployeeByName(employeeName: string) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');


        await this.EmployeeModel
        .deleteOne({name: employeeName})
        .then(function()
        {
            console.log("Employee " + employeeName + " has been deleted!");
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async getEmployeeById(employeeId: number) : Promise<Employee>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let employee = await this.EmployeeModel.findOne({employeeId: employeeId});
        if(employee)
        {
            return employee;
        }
        else
        {
            return null as any;
        }
    }

    async getEmployeeByName(employeeName: string) : Promise<Employee>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        let employee = await this.EmployeeModel.findOne({name: employeeName});
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

        let employees = await this.EmployeeModel.find({restaurantName: restaurantName});
        if(employees)
        {
            return employees;
        }
        else
        {
            return null as any;
        }
    }

    async updateEmployee(employee: Employee) : Promise<void>
    {
        await connect('mongodb+srv://username:username123@cluster.itsrg.mongodb.net/RestaurantDb?retryWrites=true&w=majority');

        await this.EmployeeModel
        .updateOne({employeeId: employee.employeeId}, employee)
        .then(function()
        {
            console.log("Employee " + employee.employeeId + " has been updated!");
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }
}