
namespace schema;

entity customer {
    key id  : String;
        name         : String;
        email        : String  @Communication.IsEmailAddress;
        phone        : String @Communication.IsPhoneNumber;
        address      : String;
       
}

@odata.draft.enabled
entity order {
    key id      : String;
        orderdate    : DateTime @UI.DateTimeStyle:'short';
         @Measures.ISOCurrency : currency
        totalamount  : Decimal(10,2);
        status        : String; 
        currency:String;
        criticality:Integer;
          rating:Decimal(10,2);
        paymentmethod: String @UI.Hidden;
        cRef   : Association to customer;
        pRef:Association to  product;

       @title: 'Notes File'
        File        : LargeBinary 
     @Core.MediaType:filetype;
        filetype   : String;
        filename    : String;
}


entity product {
    key id     : String;
        name           : String;
        description    : String;    
        image:String;
        price          : Decimal(10,2);
        stockquantity : Integer;
        category       : String;
}


 

// namespace schema;

// entity customer {
//     key id  : String;
//         name         : String;
//         email        : String;
//         phone        : String;
//      address      : String;
       
// }

// entity order {
//     key id      : String;
//         orderdate    : DateTime;//@UI.DateTimeStyle:'short';
//         totalamount  : Decimal(10,2);
//         status        : String;   // pending / shipped / delivered / cancelled
//         criticality:Integer;
//         paymentmethod: String;
//         cRef   : Association to customer;
//         pRef:Association to  product;
// }

// entity product {
//     key id     : String;
//         name           : String;
//         description    : String;
//         price          : Decimal(10,2);
//         stockquantity : Integer;
//         category       : String;
// }