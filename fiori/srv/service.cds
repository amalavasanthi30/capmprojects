using {schema as db} from '../db/schema';

service fioriApi {
  
    entity  order as projection on db.order  actions
    {
  action  modifystatus(id:String,status:String) returns many String;
  action Rating(rating:Decimal(10,2)) returns many String;
    }
    
     entity  product as projection on db.product;
     function readdata(id:String) returns many String;
     
   
    

     entity  customer as projection on db.customer;
   
      action  deleteorder(id:String);
     action createorder(id : String,orderdate : DateTime,totalamount: Decimal(10,2),status:String,criticality:Integer,paymentmethod:String,cRef_id:String,pRef_id:String) returns many String;
     action calculatetotalamount(id:String) returns Integer;
    
      
}