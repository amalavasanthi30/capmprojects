namespace schema;

// entity Departments {
//     key id      : String;
//     name           : String;
//     employees      : Association to many Employees
//                      on employees.department = $self;
// }

entity Employees {
    key id        : String;
    name           : String;
    email          : String;
    salary         : Decimal(10,2);
   // department     : Association to Departments;
}