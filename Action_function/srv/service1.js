const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');
module.exports = cds.service.impl(function () {

    const { student } = this.entities;

    this.before('CREATE', student, async (req) => {
        const {name}=req.data;
         if (!name) {
       return req.error("name not found"); }
    });

    this.on('getdata',async(req)=>{
    const{id}=req.data;
        if(!id)
            return req.error('Id must')
      const result=await SELECT.one.from(student).where({id:id})
    //  return result;
      const age = result.age+300;
    return age
    })

});
