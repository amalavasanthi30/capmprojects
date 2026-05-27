namespace service.srv;
using {schema as db} from '../db/schema';
using {views as vi} from '../db/view';

service viewApi
 {
//     // @cds.redirection.target:'db.student'
     entity student as projection on db.student;
    @cds.redirection.target:'db.teacher'
     entity teacher as projection on db.teacher;


     entity fetch  as SELECT  from db.student where sid='s01';


     entity countsalary as SELECT from db.teacher{
          count(salary) as countofsalary
     }
     entity likeop  as SELECT from db.teacher where name like 'k%' or name
          

//     entity Fetch as projection on  vi.Fetch;
//     entity fetch1 as projection on vi.Fetchs;

//     entity  fetchlike as projection on vi. fetchlike;
   
//     entity fetchsalary as projection on vi.fetchsalary;
//     entity ijoin as projection on vi.ijoin;
//     entity ljoin as projection on vi.ljoin;
//     entity rjoin as projection on vi.rjoin;
//     entity fjoin as projection on vi.fjoin;
//      entity cjoin as projection on vi.cjoin;
//      entity sum as projection on vi.sum;
//      entity salcoount as projection on vi.salarycount;
}