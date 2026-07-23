namespace schema;

// aspect Address {
//     street  : String;
//     city    : String;
//     state   : String;
//     country : String;
// }
// entity Employee : Address {
//     name : String;
// }

// entity Customer : Address {
//     email : String;
// }


// type Email : String(100);

// entity Employee {
//     name  : String;
//     email : Email;
// }

// type Address {
//     street  : String;
//     city    : String;
//     state   : String;
//     country : String;
// }

// entity Customer {
//     key ID : UUID;
//     name : String;
//     address : Address;
// }

// entity Product {
//     tags : array of String;
// }

// entity Car { 
//   emails : many EmailAddress; 

// } 

// type EmailAddress{ 
//     kind : String; 
//     address : String; 
// } 

// entity Employee
// {
//     key id:String;
//     name :localized String;
//     age:Integer;
//     phone:Integer;
// }


using { sap.common.CodeList } from '@sap/cds/common';
entity Employee:CodeList
{
    key id:String; 
}


