using{schema as db} from '../db/schema';
service TeacherApi
{
   
    entity teach  @(restrict:[
        {
            grant:['*'],
            to:'Administrator'
        }
    ])as projection on db.teacher;
}