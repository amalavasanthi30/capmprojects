
namespace schema;

entity customer {
    key id  : String;
        name         : String;
        email        : String;
        phone        : String;
        address      : String;
        oRef:Association  to many order on oRef.cRef=$self;
       
}

entity order {
    key id      : String;
        orderdate    : DateTime;//@UI.DateTimeStyle:'short';
        totalamount  : Decimal(10,2);
        status        : String;   // pending / shipped / delivered / cancelled
        criticality:Integer;
        paymentmethod: String;
        cRef:Association to customer;
        pRef:Association to many product on pRef.oRef=$self;

}

entity product {
    key id     : String;
        name           : String;
        description    : String;
        price          : Decimal(10,2);
        stockquantity : Integer;
        category       : String;
        oRef:Association to order;

}



















