const cds=require('@sap/cds')//we have to craete cds.and we should import the sap/cds.it   is the engine.if we need to add,update ,delete,anything .the  engine will be  manage
module.exports=cds.service.impl(async function()
{
    //this.before('READ')
     //----------------------ON-------- we can update in on but we cant update by using before
   // const {students}=this.entities;
    //! we can update in on but we cant update by using before
    // this.on('READ',students,(req)=>{
    //     return "Restrctured the crud"
    // })




//     const {students} = this.entities;
//     this.on('CREATE', students, (req)=>{
//         console.log("on operation has been triggered")
 
//         if(!req.data.id){
//             req.data.id=cds.utils.uuid();
 
//         }
//         console.log(req.data);
 
       
//     })
// })
    //--------------BEFORE----------------------
//      const {students} = this.entities;
//     this.before('CREATE', students, (req)=>{
//         console.log("before operation has been triggered")
 
//         const {age} = req.data;
 
//         console.log(req.data);
 
//         if(age<18){
//             req.error('Student age is below 18');
//         }
//     })
// })

//hooks/events-before,on,after
//-----------sql----------
//select,insert,update,upsert(intert+update)
const {students} = this.entities;
    this.on('CREATE', students, async (req)=>{
        console.log("on operation has been triggered")
 
 
        if(!req.data.id){
            req.data.id=cds.utils.uuid();
            req.data.email="keeri@gmail.com"
 
        }
        console.log(req.data);
        const reqData = req.data;
 
        const insertoperation = await INSERT.into(students).entries(reqData);
        console.log(insertoperation);
    })
})