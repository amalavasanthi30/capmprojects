const cds=require("@sap/cds");
const { SELECT } = require("@sap/cds/lib/ql/cds-ql");

module.exports=cds.service.impl(function()
{
const{emp,dept}=this.entities;
// //-------------Read-------------------



// this.after('READ', emp, (data) => {
//     data.name = 'Available';
// });


this.after('READ', emp, (data) => {
    data.forEach(employee => {
        employee.name = 'Available';
    });
});
// this.on('READ',emp,async(req)=>{
//     const data=  SELECT.from(emp).where({name:'amala'})
//     return data;
// })


// //----------------Aggregate function--------------------

// this.on('READ',emp,async(req)=>{
//      const data=await SELECT.from(emp).columns('min(salary) as maximumsalary')
//      const result=data[0].maximumsalary
//      console.log(result)
//     return data;
// })


// // this.on('READ',emp,async(req)=>{
// //      const data=  SELECT.from(emp).columns('max(salary) as minimumsalary')
// //     return data;
// // })

// // this.on('READ',emp,async(req)=>{
// //      const data=  SELECT.from(emp).columns('count(*) as count')
// //     return data;
// // })

// this.on('READ',emp,async(req)=>{
//      const data=  SELECT.from(emp).columns('avg(salary) as averagesalary')
//     return data;
// })

// this.on('READ',emp,async(req)=>{
//      const data=  SELECT.from(emp).columns('sum(salary) as totalsalary')
//     return data;
// })

// // this.on('READ',emp,async(req)=>{
// //     const max1= await SELECT.from(emp).columns('max(salary) as maximumsalary')
// //      const maxSalary=max1[0].maximumsalary
// //      console.log(maxSalary)
// //     const max2= await SELECT.from(emp).columns('max(salary) as secondmaximumsalary').where({salary:{'<':maxSalary}})
// //     const secondMaxSalary=max2[0].secondmaximumsalary;
// //     console.log(secondMaxSalary)
// //     return max2
// // })

// //-----------------------order by---------------------------
// // this.on('READ',emp,async(req)=>{
// //      const data=  SELECT.from(emp).orderBy('name')
// //     return data;
// // })

// // this.on('READ',emp,async(req)=>{
// //      const data=  SELECT.from(emp).orderBy({salary:'asc'})
// //     return data;
// // })

// // this.on('READ',emp,async(req)=>{
// //      const data=  SELECT.from(emp).orderBy({salary:'desc'})
// //     return data;
// // })
this.on('getdata',async(req)=>{

const  data=await SELECT.from(emp).columns('max(salary) as maximumsalary')
console.log(data)
return data;

})

})