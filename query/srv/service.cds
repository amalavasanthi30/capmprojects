using {schema as db} from '../db/schema';

service StuApi{
    @cds.redirection.target
    entity  emp as projection on db.Employee;
    entity dept as projection on db.Department;
    function getdata() returns String;
     
}

// service EmpApi
// {
//     entity dept as projection on db.Employee;

// }