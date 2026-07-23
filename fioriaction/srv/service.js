const cds=require('@sap/cds');
module.exports=cds.service.impl(function()
{
 const {order}=this.entities
 this.on('updatestatus',async(req)=>{
    const {id,status}=req.data
    await UPDATE(order).set({status}).where({id})
    return data
    
 })
})