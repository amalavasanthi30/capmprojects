using {schema as db} from '../db/schma';

service StudentApi
{
    entity student as projection on db.student;
}