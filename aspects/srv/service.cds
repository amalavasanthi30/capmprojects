using {schema as db}  from '../db/schema';

service employeeApi
{
    entity employee as projection on db.Employee
}