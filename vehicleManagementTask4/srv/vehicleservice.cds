namespace vehicles.srv;

using{schema as db}  from '../db/vehicleschema';
 
service VehicleApi{

    entity vehicle as projection on db.Vehicle;
    entity dealer as projection on db.Dealer;
    entity order as projection on db.Order;
    entity  vehicleorderitem as projection on db.Vehicleorderitem;
    entity stock as projection on db.Stock;
    entity state as projection on db.State;

  
//View
   view VIEWvehicle as select from vehicle {
    Vehicleid
  };

  view VIEWstate as select from state {
   Stateid
  };

 function getAddress(
        doorNo   : String,
        street   : String,
        area     : String,
        district : String,
        state    : String,
        country  : String,
        pincode  : String
    ) returns  array of String;
 
 

}