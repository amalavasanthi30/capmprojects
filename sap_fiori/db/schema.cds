namespace schema;

entity student
{
    key id:String;
    name:String;
    age:Integer;
    criticality:Integer;
    tRef:Association to teacher;
    sRef:Association to  school;
}

entity school
{
    key id:String;
    s_name:String;
    Description:String;
}
entity teacher
{
    key id:String;
       tname:String;
       salary:Integer;
}