namespace schema;

entity teacher
{
    key id:String;
    name:String;
    salary:String;
}
entity student
{
key sid:String;
name:String;
age:String;
tref:Association to teacher;
}

