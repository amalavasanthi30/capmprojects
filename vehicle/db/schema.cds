namespace vehicles.db;
//one vehicle can have multiple order

entity Vehicle{
    key Vehicleid:String;
    Modelname:String;
    Price:Integer;
    Status:String;
    dealers:Association to Dealer;
    orders:Composition of many Order on  orders.vehicles=$self;
}
entity Dealer{
    key Dealerid:String;
       Dealername:String;
       Location:String;
       State:String;
       vehicles:Association to many Vehicle on vehicles.dealers=$self;
}
entity  Order{
    key Orderid:String;
    Quantity:Integer;
    vehicles:Association to Vehicle;
}