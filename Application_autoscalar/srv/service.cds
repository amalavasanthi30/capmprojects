using{schema as db} from '../db/schema';
service StudentApi
{
    entity student as projection on db.Student;
}