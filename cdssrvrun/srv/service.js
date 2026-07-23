const cds = require('@sap/cds')
const { SELECT } = require('@sap/cds/lib/ql/cds-ql')
//-----------------------cds.run------------
//module.exports = cds.service.impl(function () {
    //const{Books}=this.entities
    // this.on('READ','Books',async(req)=>{
    //     const cd= await cds.run(SELECT.from('Books'))
    //     return cd;
    // })
    //---------------------srv.run-----------------
     module.exports = cds.service.impl(async function () {
     this.on('READ','Books',async (req) => {
     const srv = await cds.connect.to('CourseService')
     console.log("SRV SERVICES : ",srv)
     const course = await srv.run(SELECT.from('course'))
     return course;
  })
})

// module.exports=(srv)=>{
//     srv.on('READ','Books',async(req)=>{
//         return await SELECT.from('Books')
//     })
//}



