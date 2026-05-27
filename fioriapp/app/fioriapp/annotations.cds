using fioriAppApi as service from '../../srv/service';
annotate service.order with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'id',
                Value : id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'orderdate',
                Value : orderdate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalamount',
                Value : totalamount,
            },
            
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'criticality',
                Value : criticality,
            },
            {
                $Type : 'UI.DataField',
                Label : 'paymentmethod',
                Value : paymentmethod,
            },
            {
                $Type : 'UI.DataField',
                Label : 'cRef_id',
                Value : cRef_id,
            },
        ],
    },



     UI.FieldGroup #GeneratedGroup2 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'pRef.id',
                Value : pRef.id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Productname',
                Value : pRef.name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Category',
                Value : pRef.category,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Description',
                Value : pRef.description,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Price',
                Value : pRef.price,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Stockquantity',
                Value : pRef.stockquantity,
            },
           
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Order details',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
         {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet2',
            Label : 'Product Details',
            Target : '@UI.FieldGroup#GeneratedGroup2',
        },
        //   {
        //     $Type : 'UI.ReferenceFacet',
        //     ID : 'GeneratedFacet3',
        //     Label : 'Product',
        //     Target : 'pRef/@UI.LineItem#product',
        // },
          {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet3',
            Label : 'Product',
            Target : 'pRef/@UI.LineItem#product',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'id',
            Value : id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'orderdate',
            Value : orderdate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'totalamount',
            Value : totalamount,
        },
        {
            $Type : 'UI.DataField',
            Label : 'status',
            Value : status,
        },
        // {
        //     $Type : 'UI.DataField',
        //     Label : 'criticality',
        //     Value : criticality,
        // },
    ],
);

annotate service.order with {
    cRef @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'customer',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : cRef_id,
                ValueListProperty : 'id',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'email',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'phone',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'address',
            },
        ],
    }
};

//Multiple flexible layout column
annotate service.product with @(

    UI.FieldGroup #GeneratedGroupc1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'id',
                Value : id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'name',
                Value : name,
            },
             {
                $Type : 'UI.DataField',
                Label : 'price',
                Value : price,
            },
             {
                $Type : 'UI.DataField',
                Label : 'category',
                Value : category,
            },
          
           
        ],
    },
     
UI.SelectionFields:[
    id,
    name,
],
    
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacetc1',
            Label : 'Product Details',
            Target : '@UI.FieldGroup#GeneratedGroupc1',
        },
         
    ],
    UI.LineItem #product: [
        {
            $Type : 'UI.DataField',
            Label : 'id',
            Value : id,
            @HTML5.CssDefaults: {width: '50px'}
        },
        {
            $Type : 'UI.DataField',
            Label : 'name',
            Value : name,
            @HTML5.CssDefaults: {width: '200px'}
        },
        {
            $Type : 'UI.DataField',
            Label : 'Category',
            Value : category,
            @HTML5.CssDefaults: {width: '200px'}
        },
        {
            $Type : 'UI.DataField',
            Label : 'price',
            Value : price,
             @HTML5.CssDefaults: {width: '200px'}
        },
    ],
);



