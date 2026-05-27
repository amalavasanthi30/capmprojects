using {schema as db} from '../db/schema';

service fioriAppApi {
  
    entity  order as projection on db.order;
   
    entity  product as projection on db.product;
   
     entity  customer as projection on db.customer;
    
      
}