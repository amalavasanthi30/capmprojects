namespace vehicles.srv;
using{vehicles.db as db}  from '../db/schema';

service VehicleApi
{
  @odata.draft.enabled
  
    entity Vehicle as projection on db.Vehicle;
    entity Dealer as projection on db.Dealer;
    entity Order as projection on db.Order;

action  approveVehicle(Vehicleid:String) returns String;

  function getTotalOrderValue(Vehicleid : String) returns Integer;


}
