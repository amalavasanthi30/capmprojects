namespace service;
using {schema as db}  from '../db/schema';

Service  StudentApi @(impl:'./service1.js')
{
 entity student as projection on db.Student actions{
        
        function fetchData(id:String) returns many String;
 }

 function getdata(id:String) returns  StudentDetails;
 
 type StudentDetails
 {
        name:String;
        age:String;
 }
}

