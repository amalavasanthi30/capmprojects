const cds=require('@sap/cds')
module.exports=cds.service.impl(function()
{

    const {teach}=this.entities;
    this.on('updatedesignation',async(req)=>{
        const {id,salary,designation}=req.data;
        console.log(id)
        console.log(salary)
await UPDATE(teach).set({designation:designation}).where({id:id})
const data = await SELECT.from(teach).where({id:id})
console.log(data)
const senddata=await this.send({event:'updatesalary',data:{id:id,salary:salary}})
console.log(senddata)

return senddata
    })

    this.on('updatesalary',async(req)=>{
const{id,salary}=req.data
console.log("second action....................")
console.log(salary)
console.log(id)
await UPDATE(teach).set({salary:salary}).where({id:id})
const data = await SELECT.from(teach).where({id:id})
console.log(data)
console.log("successfully updated")
return data
})

})
