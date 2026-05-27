namespace trainingstudent.srv;

using{trainingstudent.db as db} from '../db/schema';

service Studentapi{
    
    entity students as projection on db.Student;
}