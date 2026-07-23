using{schema as db} from '../db/schema';
service TeacherApi
{
    entity teach as projection on db.teacher;
    action updatedesignation(id:String,designation:String,salary:Integer)
    action updatesalary(id:String,salary:Integer)
}