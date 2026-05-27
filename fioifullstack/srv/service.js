const cds=require('@sap/cds');
const { json } = require('@sap/cds/lib/compile/parse');
const { SELECT, UPDATE, INSERT } = require('@sap/cds/lib/ql/cds-ql');
module.exports=cds.service.impl(function()
{
     
    const{order,product,customer}=this.entities;

    //update the status and criticality
this.on('modifystatus', async (req) => {
    const { id} = req.params[0];
    const{status}=req.data;
    if (!status)
        req.error(400, 'status is required');
    await UPDATE(order).set({ status }).where({ id });
    let criticality;
    if (status === 'delivered')
        criticality = 3;
    else if (status === 'cancelled')
        criticality = 1;
    else
        criticality = 2;
    await UPDATE(order).set({ criticality }).where({ id });
    // return await SELECT.one.from(order).where({ id });
     req.info(`The data modified successfully`)
});

//create  the order
this.on('createorder',async(req)=>{
    //   const{id,orderdate,status,criticality,totalamount,paymentmethod,cRef,pRef,}=req.data

    //   const pdata=SELECT.from(order).where({id});
    //   console.log(pdata)
    //   if(!id)
    //   req.warn("id is required")
    // if(!orderdate)
    //     req.warn("orderdate  is required")
    // if(!status)
    //     req.warn("status is required")
    // if(!criticality)
    //     req.warn("criticality is required")
    // if(!totalamount)
    //     req.warn("Total amount is required")
    //  if(!paymentmethod)
    //     req.warn("paymentmethod is required")
    // if(!cRef)
    //     req.warn("cRef is required")
    // if(!pRef)
    //     req.warn("pRef  is required")
    //   const payload = {id,orderdate,status,criticality,totalamount,paymentmethod,cRef,pRef};
    //   const data=await INSERT.into(order).entries(req.data);
    //   console.log(data)
    //   return data;

    const data=await INSERT.into(order).entries(req.data)
    return data;
    })
this.on('deleteorder',async(req)=>{
     const{id}=req.data;
     console.log(id)
     await DELETE.from(order).where({id})
    
      return "data deleted successfully"
})
    
//criticality
this.before('CREATE', order, async (req) => {
    const { status } = req.data;

    if (status === 'pending') {
        req.data.criticality = 2;
    } else if (status === 'shipped') {
        req.data.criticality = 3;
    } else if (status === 'delivered') {
        req.data.criticality = 3;
    } else if (status === 'cancelled') {
        req.data.criticality = 1;
    }
});

//calculatetotalamount

this.on('calculatetotalamount',async(req)=>{
    const{id}=req.data;
    if(!id)
    {
          req.error("Id is not present");
          return;
    }
       
    const res1= await SELECT.from(order).where({id})
    
    console.log(res1)
    const amount=res1[0].totalamount
    console.log(amount)
    const pid=res1[0].pRef_id
    console.log(pid)
    const products=await SELECT.from(product).where({id:pid})
    const quantity=products[0].stockquantity;
    console.log(quantity)
    const totalprice=quantity*amount
    // return totalprice
    req.notify(`The Total amount is ${totalprice}`)

})

//readdata


this.on('readdata',async(req)=>{
    const{id}=req.data;
    const orderdata=await SELECT.from(order).where({id});
    console.log(orderdata)
    console.log(orderdata[0].pRef_id)
    const  pid=orderdata[0].pRef_id
    console.log(pid)
    const productdata=await SELECT.from(product).where({id:pid})
    console.log(productdata)
    const cid=orderdata[0].cRef_id;
    console.log(cid)
     const customerdata=await SELECT.from(customer).where({id:cid})
    console.log(customerdata)

req.info(`orderdetails:${JSON.stringify(orderdata)}`)
req.info(`productdetails:${JSON.stringify(productdata)}`)
req.info(`customerdetails:${JSON.stringify(customerdata)}`)
})

//rating
this.on('Rating',async(req)=>{

    const{id}=req.params[0]
    console.log(id)
    const{rating}=req.data;
    await UPDATE(order).set({rating}).where({id});
    const data= await SELECT.from(order).where({id})
    console.log(data)
    //     return await SELECT.from(customer).where({id})
    
})
    
})
