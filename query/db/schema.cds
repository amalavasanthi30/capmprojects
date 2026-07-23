namespace schema;
entity Employee {
    key eid       : String;
    name          : String;
    salary:Integer;
    departmentRef    : Association to Department;
}


entity Department {
    key did   : String;
    name      : String;
    employeeRef : Association to  many Employee on employeeRef.departmentRef= $self;
}