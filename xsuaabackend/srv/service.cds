using{schema as db} from '../db/schema';
 service DeptApi
 {
    entity student
    @(restrict:[
        {
            grant:['READ'],
            to:['Viewer']
        },
        {
            grant:['*'],
            to:['Manager']
        }
    ]) as projection on db.Student;
 }
