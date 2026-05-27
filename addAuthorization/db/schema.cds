 namespace book;
 
 entity Book{
   key id:String;
   title:String;
   author:String;
   price:Decimal(10,2);
   stock:Integer;
 }
