const cds=require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');
module.exports=cds.service.impl(async function()
{

    const { Employees } = this.entities;
 
    // function
    this.on('getTotalSalary', async (req) => {
 
        const result = await SELECT.from(Employees);
 
        let total = 0;
        result.forEach(emp => {
            total += emp.salary;
        });
 
        return total;
    });
 
 
    // action
    this.on('increaseSalary', async (req) => {
 
        const { empId, amount } = req.data;
        // Get employee
        const employee = await SELECT.one.from(Employees).where({ id: empId });
        if (!employee) {
            return req.error(404, "Employee not found");
        }
        // Update salary
        const newSalary = employee.salary + amount;
        await UPDATE(Employees)
            .set({ salary: newSalary })
            .where({ id: empId });
 
        return "Salary Updated Successfully";
    });
// const{emp}=this.entities;
// console.log(emp);
// this.on('getempsalary',async(req)=>{
//     const {empId}=req.data;
//     const result1=await SELECT.from(emp)//.where({ID:empId});
//     console.log(result1)
//     return result1[1].salary*12;
// })

// this.on('promotenewrole',async(req)=>{
//     const {empId,newRole}=req.data;
//     const result2=await UPDATE(emp).set(newRole).where({id:empId})
//     return result2
// })
})