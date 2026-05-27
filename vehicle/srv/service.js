const cds=require('@sap/cds');
const { data } = require('@sap/cds/lib/dbs/cds-deploy');
const { SELECT, UPDATE } = require('@sap/cds/lib/ql/cds-ql');
module.exports=cds.service.impl(function(){

const { Vehicle, Dealer,Order} = this.entities;

//Vehicle

this.before('CREATE', 'Vehicle', async (req) => {

  const { Vehicleid, dealers_Dealerid } = req.data;

  const dealer = await SELECT.one.from(Dealer).where({ Dealerid: dealers_Dealerid });

  if (!dealer) {
    return req.error("Dealer not found");
  }
  // Use state directly as prefix
  const stateCode = dealer.State.toUpperCase();
  req.data.Vehicleid = `${stateCode}-${Vehicleid}`;


});


   //Dealer

this.before('CREATE','Dealer',async(req)=>{
    const{Dealerid,Dealername,Location}=req.data

    if(!Dealerid)
    req.error("Dealerid is required.you cannot create without id")
if(!Dealername)
    req.error("Dealername is required")
if(!Location)
    req.error("Location is must")
})
// //Order
this.before('CREATE','Order',async(req)=>{
    const{Orderid,Quantity}=req.data;
    if(!Orderid)
    req.error("Orderid is must.you cannot create dealer without Orderid")
if(Quantity<=0)
  req.error("You cannot give the price as negative")
})

  //Action -approveVehicle
    this.on('approveVehicle',async(req)=>{   
        const {Vehicleid}=req.data;
        const result=await SELECT.one.from(Vehicle).where({Vehicleid:Vehicleid});
        if(result.Status=="NA")
        {
            await UPDATE(Vehicle).set({Status:"Approved"}).where({Vehicleid:Vehicleid})
             return "Approved Successfully"
        }
    })
   //Function-getTotalOrderValue
  this.on('getTotalOrderValue', async (req) => {

    const { Vehicleid } = req.data;

    // Get vehicle data
    const vehicleData = await SELECT.one.from(Vehicle).where({ Vehicleid });

    // Get order data
    const orderData = await SELECT.one.from(Order).where({ vehicles_Vehicleid: Vehicleid });

    // Tax table based on state
    const StateOfDealer = {
        "TN": 100,
        "KA": 200,
        "KL": 300,
        "AP": 150,
        "DL": 50
    };

    // Extract state from VehicleID
    const FilterState = StateOfDealer[vehicleData.Vehicleid.substring(0,2)];

    // Calculate total order value
    const TotalOrderValue = (vehicleData.Price * orderData.Quantity)+(FilterState * orderData.Quantity);
    return TotalOrderValue;
});

//after

this.after('CREATE','Vehicle',async(req)=>{
  console.log("Vehicle data stored Successfully")
})
this.after('CREATE','Dealer',async(req)=>{
  console.log("Vehicle data stored Successfully")
})
this.after('CREATE','Order',async(req)=>{
  console.log("Vehicle data stored Successfully")
})
})