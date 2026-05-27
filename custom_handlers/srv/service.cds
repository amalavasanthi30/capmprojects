namespace customhandler.srv;
using{customhandler.db as db}  from '../db/schema';
service empApi{
    entity emp as projection on db.employee;
    // function getempsalary(empId:String) returns Decimal(20,3)
    // action promotenewrole(empId:String,newRole:String)  returns String


  
    function getTotalSalary() returns Decimal(15,2);
 
    action increaseSalary( empId : String, amount : Decimal(10,2) ) returns String;
}