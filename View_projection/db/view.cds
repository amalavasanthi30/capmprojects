// namespace views;

// using{schema as view} from './schema';

// entity  Fetch as  select from view.student{
//      sid
// }
// entity  Fetchs as select from view.student{
//     sid,
//     tref.tid as Steacherid
// }

// entity  fetchlike as select from view.student{
//     name
// } where name like 'a%';


// entity fetchsalary as select from view.teacher{
//     name 
// }  where salary>40000;


// entity ijoin as select from view.student as s  inner join view.teacher as t on s.tref.tid=t.tid{
//     s.name,
//     t.salary
// }

// entity ljoin as select from view.student as s left join  view.teacher as t  on s.tref.tid=t.tid{
//     s.name
// }
// entity rjoin as select from view.student as s right join  view.teacher as t  on s.tref.tid=t.tid{
//     s.name
// }
// entity fjoin as select from view.student as s full join  view.teacher as t  on s.tref.tid=t.tid{
//     s.name
// }

// entity cjoin as select from view.student as s cross join  view.teacher as t {
//     s.name
// }
// entity sum as select from view.teacher{
//     min(salary) as totalsalary
// }
// entity  salarycount as select from view.teacher{
//     tid,
//     count(salary) as salarycount 
// } group by tid;