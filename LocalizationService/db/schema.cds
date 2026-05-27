
namespace schema;

@odata.draft.enabled
entity Products{
    key Id:String;
    name: localized String @title:'{i18n>name}';
    description : localized String @title:'{i18n>description}' ;
    category    : localized String @title:'{i18n>category}';
    price       : Decimal(10,2);
}

















































