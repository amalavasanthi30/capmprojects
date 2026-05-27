const cds=require('@sap/cds');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');
module.exports=cds.service.impl(async function()
{
    const{result1,result2,result3}=this.entities;
    const s4=await cds.connect.to('API_SALESORGANIZATION_SRV')
    this.on('READ',result1,async(req)=>
  {

  const  salesorganisation=await s4.run(req.query)
  return salesorganisation
  })
    this.on('READ',result2,async(req)=>
  {

  const  salesorganisationdata=await s4.run(req.query)
  //console.log(salesorganisationdata)
        await UPSERT.into(result2).entries(salesorganisationdata);
        return salesorganisationdata
  })
 

})