 const cds=require('@sap/cds');

module.exports=cds.service.impl(function()
 {

    const {teach}=this.entities
    // this.on('READ',teach,async(req)=>{
    //     console.log(cds.context)
    //     const data=await SELECT.from(teach);
    //     console.log(data)
    //     return data;
    // })
 })