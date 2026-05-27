const cds=require('@sap/cds');
const { SELECT, INSERT, UPDATE, DELETE } = require('@sap/cds/lib/ql/cds-ql');
module.exports=cds.service.impl(async function ()
{
   const{order,vehicle,state,dealer,vehicleorderitem,stock}=this.entities;
//----------------------VEHICLE----------------------------
//----------------------before------------------------------
this.before('CREATE', vehicle,async(req) => {
    const { Vehicleid, Modelname, Oldprice, Newprice } = req.data;
    if (!Vehicleid) 
        req.error('Vehicle ID must be required.you cant create record without id');
    if (!Modelname) 
        req.error('Model name is required');
    if (Oldprice < 0||(Newprice < 0))
         req.error('Old price and new price cannot be negative');
})

this.before('UPDATE', vehicle,async (req) => {
    const { Modelname, Oldprice, Newprice} = req.data;
    if ( Oldprice < 0)
        req.error('Old price cannot be negative');
    if (Newprice < 0)
        req.error('New price cannot be negative');
    if (Modelname === '')
        req.error('Model name cannot be empty');
});

    this.before('DELETE', vehicle,async(req) => {
       const {Vehicleid}=req.data
        if (!Vehicleid) {
            req.error('Vehicle ID is required for delete');
            console.log(Vehicleid)
        }
    });

//---------------------------------on--------------------------

  this.on('CREATE',vehicle,async(req)=>{
    return await INSERT.into(vehicle).entries(req.data);
 })
 

   this.on('UPDATE', vehicle, async(req) => {
    const { Vehicleid, Newprice} = req.data;
    //Fetch the vehicle data
    const existingVehicle = await SELECT.one.from(vehicle).where({ Vehicleid });
    //get the existingnewprice
    const  existingnewprice=existingVehicle.Newprice
    console.log(existingnewprice)
    //Update the newprice
    await UPDATE(vehicle).set({ Oldprice: existingnewprice, Newprice: Newprice}).where({ Vehicleid });
    const updatedVehicle = await SELECT.one.from(vehicle).where({ Vehicleid });
    console.log(updatedVehicle);
    return updatedVehicle;
});

this.on('DELETE',vehicle,async(req)=>{
    const {Vehicleid}=req.data;
    await  DELETE.from(vehicle).where({Vehicleid});
    
})

//----------------------after---------------------------

this.after('CREATE', 'vehicle', async (req) => {
    console.log("Vehicle data stored successfully");
});

this.after('UPDATE', 'vehicle', async (req) => {
  console.log("Vehicle data updated successfully")
});

this.after('DELETE', 'vehicle', async (req) => {
   console.log("Vehicle data deleted successfully")
});

//--------------------DEALER--------------------
//---------------------before------------------
this.before('CREATE', dealer, (req) => {
    const { Dealerid, Dealername, Dealerphoneno } = req.data;
    if (!Dealerid) 
        req.error('Dealer ID is required');
    if (!Dealername) 
        req.error('Dealer name is required');
    if (Dealerphoneno.length != 10)
        req.error('Phone number must be 10 digits');

});

this.before('UPDATE', dealer, (req) => {
    const { Dealerphoneno } = req.data;
    if (Dealerphoneno && Dealerphoneno.length !== 10)
        req.error('Dealer phone number must be 10 digits');

});

    this.before('DELETE', dealer, (req) => {
          const {Dealerid}=req.data
        if ( !Dealerid) {
            req.error('Order ID is required for delete');
        }
    }); 

    //-----------------------on-------------------

this.on('CREATE', dealer, async (req, next)=>{
 
        const Service = await cds.connect.to('Geoservice');
        //console.log("Inside the Dealer");
       
 
        const details = await getAddress(Service, req.data);
        console.log("Please don't give any error")
        console.log("details:",details);
        console.log("details.latitude",details.latitude)
       req.data.Latitude = details.latitude;
       req.data.Longitude = details.longitude;
       console.log("After fetching the details : ",req.data);
        console.log("details :" ,details);
        console.log("latitude :" ,details.latitude);
       
 
     
        console.log(req.data.latitude);
        console.log("all data : ", req.data);
       

        console.log("after function");
 
        await next();
       
    })
 
    async function getAddress(Service, dealer){
 
        try{
            console.log('inside try');
            console.log("OData Path :" , `/odata/v4/geo/GetLatLogbyAddress?doorNo=${encodeURIComponent(dealer.Doorno)}&street=${encodeURIComponent(dealer.Street)}&area=${encodeURIComponent(dealer.Area)}&district=${encodeURIComponent(dealer.District)}state=${encodeURIComponent(dealer.State)}&country=${encodeURIComponent(dealer.Country)}&pincode=${encodeURIComponent(dealer.Pincode)}`);
           
//    doorNo: addr?.house_number || doorNo,
//             street: addr?.road || street,
//             area: addr?.suburb || area,
//             district: addr?.county || district,
//             state: addr?.state || state,
//             country: addr?.country || country,
//             pincode: addr?.postcode || pincode
            const res = await Service.send({
                method: 'GET',
                path : `/odata/v4/geo/GetLatLogbyAddress?doorNo=${encodeURIComponent(dealer.Doorno)}&street=${encodeURIComponent(dealer.Street)}&area=${encodeURIComponent(dealer.Area)}&district=${encodeURIComponent(dealer.District)}&state=${encodeURIComponent(dealer.State)}&country=${encodeURIComponent(dealer.Country)}&pincode='${encodeURIComponent(dealer.Pincode)}'`
            });
 
            console.log('after fetch the data');
            console.log("Result :", res);
 
 
            return res;
        }catch(err){
            console.log("Error", err.message);
           
            return dealer;
        }
 
    }

  
   
//---------------------------------------------------------------------------
  
this.on('UPDATE',dealer,async(req)=>{
     const { Dealerid } = req.data;
     await UPDATE(dealer).set(req.data).where({Dealerid})
    return await SELECT.one.from(dealer).where({ Dealerid });
})

this.on('DELETE',dealer,async(req)=>{
     const { Dealerid } = req.param[0];
    await DELETE.from(dealer).where(Dealerid)
})
//----------after-----------------------------

// this.after('CREATE', 'dealer', async (req) => {
//    console.log("Dealer data stored successfully")
// });
this.after('UPDATE', 'dealer', async (req) => {
 console.log("Dealer data updated successfully")
});
this.after('DELETE', 'dealer', async (req) => {
    console.log("Dealer data deleted successfully")
});


//---------------------STATE------------------------------
//----------------------before---------------------------
this.before('CREATE', state, (req) => {

    const { Stateid, Statecode, Tax } = req.data;

    if (!Stateid)
        req.error('State ID is required');
    if (!Statecode)
        req.error('State code is required');
    if (Tax < 0)
        req.error('Tax cannot be negative');
});

this.before('UPDATE', state, (req) => {
    const { Tax } = req.data;
    if (Tax <= 0)
        req.error('Tax cannot be negative');
});

 this.before('DELETE', state, (req) => {
     const { Stateid } = req.data
        if (!Stateid) {
            req.error('StateID is required for delete');
        }
    });


  //-----------------------on-------------------

this.on('CREATE',state,async(req)=>{ 
    return await INSERT.into(state).entries(req.data);
})

this.on('UPDATE',state,async(req)=>{
     const { Stateid } = req.data;
     await UPDATE(state).set(req.data).where({ Stateid})
    return await SELECT.one.from(state).where({  Stateid});
})

this.on('DELETE',state,async(req)=>{
     const {Stateid} = req.data;
    await DELETE.from(state).where({Stateid})
})

//------------------------after----------------------
this.after('CREATE', state, async (req) => {
    console.log("State data stored successfully")
});

this.after('UPDATE', state, async (req) => {
    console.log("State data updated successfully")
});

this.after('DELETE', state, async (req) => {
    console.log("State data deleted successfully")
});
//-----------ORDER----------------------
//------------before-----------------
this.before('CREATE', order, (req) => {
    const { Orderid, Quantity } = req.data;
    if (!Orderid)
        req.error('Order ID is required');
    if (Quantity <= 0)
        req.error('Quantity must be greater than zero');
});

this.before('UPDATE', order, (req) => {
    const { Quantity } = req.data;
    if ( Quantity <= 0)
        req.error('Quantity must be greater than zero');
});

 this.before('DELETE', order, (req) => {
        if (!req.data.Orderid) {
            req.error('Order ID is required for delete');
        }
    });


    //--------------------------on-----------------

this.on('CREATE', order, async (req) => { 
    return await INSERT.into(order).entries(req.data);
});

this.on('UPDATE', order, async (req) => {
    const { Orderid } = req.data;
    await UPDATE(order).set(req.data).where({ Orderid });
    return await SELECT.one.from(order).where({ Orderid });
});

this.on('DELETE', order, async (req) => {
    const { Orderid } = req.data;
    await DELETE.from(order).where({ Orderid });
});

//---------------------after---------------------
this.after('CREATE', 'order', async (req) => {
    console.log( "Order data stored successfully")
});

this.after('UPDATE', 'order', async (req) => {
    console.log("Order data updated successfully")
});

this.after('DELETE', 'order', async (req) => {
    console.log("Order data deleted successfully")
});


//-----------------------vehicleorderitem-----------------
//--------------------------before-------------------

this.before('CREATE', vehicleorderitem, (req) => {
    const { orderReference_Orderid, vehicleReference_Vehicleid, dealerReference_Dealerid, TotalPrice } = req.data;
    if (!orderReference_Orderid)
        req.error('Order ID is required');
    if (!vehicleReference_Vehicleid)
        req.error('Vehicle ID is required');
    if (!dealerReference_Dealerid)
        req.error('Dealer ID is required');
    if (TotalPrice <= 0)
        req.error('Total price must be greater than zero');

});

this.before('UPDATE', vehicleorderitem, (req) => {
    const { TotalPrice } = req.data;
    if (TotalPrice && TotalPrice <= 0)
        req.error('Total price must be greater than zero');

});

this.before('DELETE', vehicleorderitem, (req) => {
    if (!req.data.Vehicleorderitemid) {
        req.error('Orderlineitem ID is required for delete');
    }
});

//----------------------------on--------------------------

  this.on('CREATE', vehicleorderitem, async (req) => {
    const { orderReference_Orderid, vehicleReference_Vehicleid, dealerReference_Dealerid, Vehicleorderitemid } = req.data;
    //-----------Fetch the dealer details
    const dealerdata = await SELECT.one.from(dealer).columns('Dealerid', 'stateReference_Stateid').where({ Dealerid: dealerReference_Dealerid});
   // console.log(dealerdata)
    const stateID = dealerdata.stateReference_Stateid;
   // console.log(stateID);
   //-------Fetch the state details
    const statedata = await SELECT.one.from(state).columns('Stateid', 'Statecode', 'Tax').where({ Stateid: stateID });
   //console.log(statedata)
    const statecode = statedata.Statecode;
    const tax = Number(statedata.Tax);
 //Fetch the order details
    const orderdata = await SELECT.one.from(order) .columns('Orderid', 'Quantity') .where({ Orderid: orderReference_Orderid });
    const quantity = orderdata.Quantity;
 //console.log(quantity)
 //--------------Fetch the vehicle details
    const vehicledata = await SELECT.one.from(vehicle).columns('Vehicleid', 'Newprice').where({ Vehicleid: vehicleReference_Vehicleid });
    const newprice = Number(vehicledata.Newprice);
    const startingNumber = Math.floor(Math.random() * 10000);
    const vehicleorderitemtoinsert = [];
    for (let i = 0; i < quantity; i++) {
        const voiID = `${statecode}-${startingNumber + i}`;
        const totalprice = newprice + tax;
        vehicleorderitemtoinsert.push({Vehicleorderitemid: voiID,orderReference_Orderid,vehicleReference_Vehicleid,dealerReference_Dealerid,TotalPrice: totalprice
        });
    }
 
    await INSERT.into(vehicleorderitem).entries(vehicleorderitemtoinsert);
    return vehicleorderitemtoinsert;
});

this.on('UPDATE', vehicleorderitem, async (req) => {
    const { Vehicleorderitemid } = req.data;
    await UPDATE(vehicleorderitem).set(req.data).where({ Vehicleorderitemid });
    return await SELECT.one.from(vehicleorderitem).where({ Vehicleorderitemid });
});

this.on('DELETE', vehicleorderitem, async (req) => {
    const { Vehicleorderitemid } = req.data;
    await DELETE.from(vehicleorderitem).where({ Vehicleorderitemid });
});

//------------------------after---------------------------
this.after('CREATE', vehicleorderitem, async (req) => {
  console.log("Vehicle order item stored successfully")
});

this.after('UPDATE', vehicleorderitem, async (req) => {
   console.log("Vehicle order item updated successfully")
});

this.after('DELETE', vehicleorderitem, async (req) => {
   console.log("Vehicle order item deleted successfully")
});
//--------------------STOCK---------------------
//---------------------before hooks---------------------
this.before('CREATE', stock, (req) => {
    const { Stockid, QuantityAvailable, vehicleReference_Vehicleid } = req.data;
    if (!Stockid)
        req.error('Stock ID is required');
    if (QuantityAvailable < 0)
        req.error('QuantityAvailable must be zero or greater');
    if (!vehicleReference_Vehicleid)
        req.error('Vehicle reference is required');
});

this.before('UPDATE', stock, (req) => {
    const { QuantityAvailable } = req.data;
    if (QuantityAvailable < 0)
        req.error('QuantityAvailable must be zero or greater');
});

this.before('DELETE', stock, (req) => {
    if (!req.data.Stockid) {
        req.error('Stock ID is required for delete');
    }
});

//---------------------on hooks---------------------
this.on('CREATE', stock, async (req) => { 
    return await INSERT.into('Stock').entries(req.data);
});

this.on('UPDATE', stock, async (req) => {
    const { Stockid } = req.data;
    await UPDATE('stock').set(req.data).where({ Stockid });
    return await SELECT.one.from('stock').where({ Stockid });
});

this.on('DELETE',stock, async (req) => {
    const { Stockid } = req.data;
    await DELETE.from(stock).where({ Stockid });
});

//---------------------after hooks---------------------
this.after('CREATE', stock, async (req) => {
    console.log("Stock data stored successfully")
});

this.after('UPDATE', stock, async (req) => {
   console.log("Stock data updated successfully")
});

this.after('DELETE', stock, async (req) => {
   console.log("Stock data deleted successfully")
});
 })

