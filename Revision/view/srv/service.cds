namespace service.srv;
 
using{schema.db as db} from '../db/schema';
 
service projectAPI{
    entity teacher as projection on db.Teacher;
    entity stud as projection on db.Student;
}