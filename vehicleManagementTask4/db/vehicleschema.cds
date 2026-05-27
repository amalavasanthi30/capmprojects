namespace schema;
entity Vehicle
{
    key Vehicleid       : String;
        Modelname       : String;
        Oldprice        : Decimal(10,2);
        Newprice        : Decimal(10,2);
        orderReference  : Composition of many Order on orderReference.vehicleReference = $self;  
}

entity Stock 
{
    key Stockid          : String;
        QuantityAvailable: Integer;
        vehicleReference: Association to Vehicle;
        
}

entity Dealer
{
   key Dealerid        : String;
        Dealername      : String;
        Dealerlocation  : String;
        Dealerphoneno   : String;
        Doorno          : String;
        Street          : String;
        Area            : String;
        Country         : String;
        District        : String;
        Pincode         : String;
        State           : String;
        Latitude        : String;
        Longitude       : String;
        StateReference:Association to State;
        orderReference : Association to many Order on orderReference.dealerReference = $self; 
}
entity State
{
    key Stateid  : String;
        Statename : String;
        Statecode: String;
        Tax       : Decimal(10,2);
       
}

    
entity Order
{
    key Orderid            : String;
        OrderDate          : String;
        Quantity           : Integer;
        vehicleReference   : Association to Vehicle; 
        VehicleorderitemReference : Composition of many  Vehicleorderitem on VehicleorderitemReference.orderReference=$self;
        dealerReference : Association to Dealer;
}

entity Vehicleorderitem
{
    key Vehicleorderitemid  : String;
        orderReference  : Association to Order ; 
        vehicleReference: Association to Vehicle; 
        dealerReference : Association to Dealer ; 
        TotalPrice      : Decimal(10,3);
}
 



























 

