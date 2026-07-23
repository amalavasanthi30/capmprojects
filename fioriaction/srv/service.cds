using {schema as db} from '../db/scehma';
service OrderApi
{
    entity  order as projection on db.order ;
    action updatestatus(id:String)
    
}