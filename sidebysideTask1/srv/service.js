const cds=require('@sap/cds');
const { INSERT, SELECT } = require('@sap/cds/lib/ql/cds-ql');
module.exports=cds.service.impl(async function()
{
    const{result1,result2}=this.entities;
    const s4=await cds.connect.to('API_BUS_SOLUTION_ORDER_SRV')
    this.on('READ',result1,async(req)=>
  {
  console.log(req.query);
  const  res1=await s4.run(req.query)
  console.log(result1)
  return res1
  })
     this.on('READ',result2,async(req)=>
  {
  console.log(req.query);
  const  result2=await s4.run(req.query)
  console.log(result2)
  return result2
  })

//  const { result2 } = this.entities;

// // Connect to the external S/4HANA OData service
// const s4 = await cds.connect.to('API_BUS_SOLUTION_ORDER_SRV');

// this.on('READ', result2, async (req) => {
//     try {
//         // Always query the correct entity
//         const data = await s4.run(
//             SELECT.from('A_BSOrdSrvcContrItmBillgReqItm') // remote entity
//         );

//         console.log("Fetched data:", data.length);

//         // Insert only if data exists
//         if (data.length > 0) {
//             await INSERT.into(result2).entries(data);
//             console.log("Data inserted into result2");
//         } else {
//             console.log("No data to insert");
//         }

//         return data;
//     } catch (err) {
//         console.error("Error reading from S/4HANA:", err);
//         throw err;
//     }
// });

 })