using fioriApi as service from '../../srv/service';



annotate service.order with @(


    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'id',
                Value: id,
            },
            {
                $Type: 'UI.DataField',
                Label: 'orderdate',
                Value: orderdate,
            },
            {
                $Type: 'UI.DataField',
                Label: 'totalamount',
                Value: totalamount,
            },
            {
                $Type      : 'UI.DataField',
                Label      : 'status',
                Value      : status,
                Criticality: criticality,
            },
            {
                $Type: 'UI.DataField',
                Label: 'paymentmethod',
                Value: paymentmethod,
            },
            {
                $Type: 'UI.DataField',
                Label: 'cRef_id',
                Value: cRef_id,
            },

            {
                $Type : 'UI.DataFieldForAnnotation',
                Label : 'rating',
                Target: '@UI.DataPoint#Ratingprogress',
            },
            {
                $Type: 'UI.DataField',
                Label: 'pRef_id',
                Value: pRef_id,
            },
            {
                $Type: 'UI.DataFieldWithUrl',
                Label: 'Open SAP UI5',
                Value: 'SAP UI5 tutorilas',
                Url  : 'https://help.sap.com/docs/SAPUI5'
            }

        ],
    },
    UI.FieldGroup #GeneratedGroup2: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'id',
                Value: cRef.id,
            },
            {
                $Type: 'UI.DataField',
                Label: 'name',
                Value: cRef.name,
            },
            {
                $Type: 'UI.DataField',
                Label: 'address',
                Value: cRef.address,
            },
            {
                $Type: 'UI.DataField',
                Label: 'email',
                Value: cRef.email,
            },

            {
                $Type: 'UI.DataField',
                Label: 'phone',
                Value: cRef.phone,
            },
            {
                $Type : 'UI.DataFieldForAnnotation',
                Target: 'cRef/@Communication.Contact',
                Label : 'Customer Details',
                Value : cRef.name
            },

        ],

        //----------------communicationContact-------------------
    Communication.Contact: {
        fn   : cref.name,
        email: [{
            type   : #work,
            address: email
        }],

        tel  : [{
            type: #work,
            uri : phone
        }]
    }
    },
    //-------------Rating----------------
    UI.DataPoint #Ratings         : {
        Value        : rating,
        Visualization: #Rating
    },


    UI.DataPoint #Ratingprogress  : {
        Value        : rating,
        Visualization: #Progress,
        TargetValue  : 5,
    },

    UI.FieldGroup #GeneratedGroup3: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'id',
                Value: pRef.id,
            },
            {
                $Type: 'UI.DataField',
                Label: 'name',
                Value: pRef.name,
            },
            {
                $Type: 'UI.DataField',
                Label: 'image',
                Value: pRef.image,
            },
            {
                $Type: 'UI.DataField',
                Label: 'category',
                Value: pRef.category,
            },
            {
                $Type: 'UI.DataField',
                Label: 'description',
                Value: pRef.description,
            },
            {
                $Type               : 'UI.DataField',
                Label               : 'price',
                Value               : pRef.price,
                ![@UI.PartOfPreview]: false,
            },
            {
                $Type               : 'UI.DataField',
                Label               : 'stockquantity',
                Value               : pRef.stockquantity,
                ![@UI.PartOfPreview]: false,
            },

        ],
    },
    //Here


    UI.FieldGroup #GeneratedGroup4: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'id',
                Value: id,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Customer name',
                Value: cRef.name,
            },


        ],
    },

    UI.HeaderInfo                 : {
        TypeName: 'order',
        Title   : {Value: id},
        ImageUrl: pRef.image,
    },

    UI.SelectionFields            : [
        id,
        status,
        cRef_id,
        pRef_id,
    ],
    UI.HeaderFacets               : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet4',
        // Label : 'Details',
        Target: '@UI.FieldGroup#GeneratedGroup4',
    }],
    //------------------File attachement------
     UI.FieldGroup #Attachment    : {

        $Type: 'UI.FieldGroupType',

        Data : [

            {
                $Type: 'UI.DataField',
                Value: filename,
                Label: 'File Name'
            },

            {
                $Type: 'UI.DataField',
                Value: File,
                Label: 'Upload File'
            }

        ]
    },
    UI.Facets                     : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet1',
            Label : 'Order Details',
            Target: '@UI.FieldGroup#GeneratedGroup1',
        },
         {
            $Type : 'UI.ReferenceFacet',
            Label : 'Attachments',
            Target: '@UI.FieldGroup#Attachment'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet2',
            Label : 'Customer Details',
            Target: '@UI.FieldGroup#GeneratedGroup2',
        },

        {
            $Type               : 'UI.ReferenceFacet',
            ID                  : 'GeneratedFacet3',
            Label               : 'Product Details',
            Target              : '@UI.FieldGroup#GeneratedGroup3',
            ![@UI.PartOfPreview]: true
        },
    // {
    //     $Type : 'UI.ReferenceFacet',
    //     ID : 'GeneratedFacet5',
    //     Label : 'Product',
    //     Target : '@UI.LineItem#customer',
    // },
    ],
    //     UI.LineItem #customer: [
    //     {
    //         $Type : 'UI.DataField',
    //         Label : 'id',
    //         Value : cRef.id,
    //         @HTML5.CssDefaults: {width: '50px'}
    //     },
    //     {
    //         $Type : 'UI.DataField',
    //         Label : 'name',
    //         Value : cRef.name,
    //         @HTML5.CssDefaults: {width: '200px'}
    //     },
    //     {
    //         $Type : 'UI.DataField',
    //         Label : 'address',
    //         Value : cRef.address,
    //         @HTML5.CssDefaults: {width: '200px'}
    //     },
    //     {
    //         $Type : 'UI.DataField',
    //         Label : 'phone',
    //         Value : cRef.phone,
    //          @HTML5.CssDefaults: {width: '200px'}
    //     },
    //     {
    //         $Type : 'UI.DataField',
    //         Label : 'email',
    //         Value : cRef.email,
    //         @HTML5.CssDefaults: {width: '200px'}
    //     },

    // ],
    UI.LineItem                   : [
        {
            $Type             : 'UI.DataField',
            Label             : '{i18n>id}',
            Value             : id,
            @HTML5.CssDefaults: {width: '50px'}
        },
        {
            $Type             : 'UI.DataField',
            Label             : 'Product',
            Value             : pRef.image,
            @HTML5.CssDefaults: {width: '100px'}
        },
        {
            $Type             : 'UI.DataField',
            Label             : 'Productname',
            Value             : pRef.name,
            @HTML5.CssDefaults: {width: '100px'}
        },
        {
            $Type             : 'UI.DataField',
            Label             : '{i18n>orderdate}',
            Value             : orderdate,
            @HTML5.CssDefaults: {width: '100px'}
        },
        {
            $Type             : 'UI.DataField',
            Label             : '{i18n>totalamount}',
            Value             : totalamount,
            @HTML5.CssDefaults: {width: '100px'}
        },
        {
            $Type             : 'UI.DataField',
            Label             : '{i18n>status}',
            Value             : status,
            Criticality       : criticality,
            @HTML5.CssDefaults: {width: '100px'}
        },
        {
            $Type             : 'UI.DataFieldForAnnotation',
            Label             : '{i18n>rating}',
            Value             : rating,
            Target            : '@UI.DataPoint#Ratings',
            @HTML5.CssDefaults: {width: '150px'}
        },
        {
            $Type             : 'UI.DataFieldForAction',
            Action            : 'fioriApi.Rating',
            Label             : 'Rating',
            Inline            : true,
            @HTML5.CssDefaults: {width: '100px'},
            Criticality       : #Negative,
        },
        {
            $Type             : 'UI.DataField',
            // Label:'paymentmethod',
            Label             : '{i18n>paymentmethod}',
            Value             : paymentmethod,
            @HTML5.CssDefaults: {width: '150px'}
        },
        // {
        //     $Type             : 'UI.DataField',
        //     Label             : 'cRef_id',
        //     Value             : cRef_id,
        //     @HTML5.CssDefaults: {width: '200px'}
        // },
        // {
        //     $Type             : 'UI.DataField',
        //     Label             : 'pRef_id',
        //     Value             : pRef_id,
        //     @HTML5.CssDefaults: {width: '200px'}
        // },

        {
            $Type             : 'UI.DataFieldForAction',
            Action            : 'fioriApi.modifystatus',
            Label             : 'modifystatus',
            Inline            : true,
            Criticality       : #Negative,
            @HTML5.CssDefaults: {width: '150px'}
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'fioriApi.EntityContainer/calculatetotalamount',
            Label : 'calculatetotalamount',

        },
        // {
        //     $Type : 'UI.DataFieldForAction',
        //     Action: 'fioriApi.EntityContainer/createorder',
        //     Label : 'CREATE',
        // },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'fioriApi.EntityContainer/readdata',
            Label : 'READ',

        },
    ],
);


//----------file------------
annotate service.order with{
 
    File
    @Core.ContentDisposition.Filename:filename;

      filetype @Core.IsMediaType;
 
} ;
//-------------communication contact-------------
annotate service.customer with @(Communication.Contact: {
    fn   : name,
    email: [{
        type   : #work,
        address: email
    }],

    tel  : [{
        type: #work,
        uri : phone
    }]
}, );

//---------for image----------------
annotate service.product with {
    image @UI.IsImageURL;
};
//----------------Hide the field---@UI.Hidden
// annotate service.order with {
//     cRef @UI.Hidden;

// }

//-----------Disable the delete button--------------
// annotate service.order with @Capabilities.DeleteRestrictions: {Deletable: false};


annotate service.order with {
    cRef @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'customer',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: cRef_id,
                ValueListProperty: 'id',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'name',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'email',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'phone',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'address',
            },
        ],
    }
};

annotate service.order with {
    pRef @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'product',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: pRef_id,
                ValueListProperty: 'id',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'name',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'price',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'stockquantity',
            },
        ],
    }
};
// annotate service.order with {
//     id @(
//         Common.ValueList               : {
//             $Type         : 'Common.ValueListType',
//             CollectionPath: 'order',
//             Parameters    : [{
//                 $Type            : 'Common.ValueListParameterInOut',
//                 LocalDataProperty: id,
//                 ValueListProperty: 'id',
//             }, ],
//         },
//         Common.ValueListWithFixedValues: true,
//     )
// };


annotate service.order with {
    status @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'order',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: status,
                ValueListProperty: 'status',
            }, ],
        },
        Common.ValueListWithFixedValues: true,
    )
};


//Add the action inside the object page

annotate service.order with @(UI.Identification: [{
    $Type      : 'UI.DataFieldForAction',
    Label      : 'orderproduct',
    Action     : 'fioriApi.EntityContainer/createorder',
    Criticality: #Positive,
},
// {
//     $Type:'UI.DataFieldForAction',
//     Label:'modifystatus',
//     Action:'fioriApi.EntityContainer/modifystatus ',
// }
]);

//-----------------pagination------------------
annotate service.order with @(UI.PresentationVariant: {
    Visualizations: ['@UI.LineItem'],
    MaxItems      : 2
});

//----------------------ToolTip------------------
annotate service.order with {
    rating @Common.QuickInfo: 'This is preview rating';
}


//---------------------autorefresh--(bounded)
annotate fioriApi.order with actions {
    modifystatus @Common.SideEffects: {TargetProperties: ['status'], };
    Rating       @Common.SideEffects: {TargetProperties: ['rating'], };
};
//--------------------------popup--------------------
// annotate service.order with actions{
//  calculatetotalamount @Common.IsActionCritical: true;
// modifystatus @Common.IsActionCritical: true
// }

//-------------------Mulitiple flexible----------------------

// annotate service.order with @(
//     UI.FieldGroup #GeneratedGroupc1 : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'id',
//                 Value : id,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'customername',
//                 Value : name,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'Email',
//                 Value : email,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'address',
//                 Value : address,

//             },
//              {
//                 $Type : 'UI.DataField',
//                 Label : 'phone',
//                 Value : phone,

//             },

//         ],
//     },

// // // UI.SelectionFields:[
// // //     id,
// // //     name,
// // // ],

// //     UI.Facets : [
// //         {
// //             $Type : 'UI.ReferenceFacet',
// //             ID : 'GeneratedFacetc1',
// //             Label : 'Order Details',
// //             Target : '@UI.FieldGroup#GeneratedGroupc1',
// //         },

// //     ],
//     UI.LineItem #customer: [
//         {
//             $Type : 'UI.DataField',
//             Label : 'id',
//             Value : cRef.id,
//             @HTML5.CssDefaults: {width: '50px'}
//         },
//         {
//             $Type : 'UI.DataField',
//             Label : 'name',
//             Value : cRef.name,
//             @HTML5.CssDefaults: {width: '200px'}
//         },
//         {
//             $Type : 'UI.DataField',
//             Label : 'address',
//             Value : cRef.address,
//             @HTML5.CssDefaults: {width: '200px'}
//         },
//         {
//             $Type : 'UI.DataField',
//             Label : 'phone',
//             Value : cRef.phone,
//              @HTML5.CssDefaults: {width: '200px'}
//         },
//         {
//             $Type : 'UI.DataField',
//             Label : 'email',
//             Value : cRef.email,
//             @HTML5.CssDefaults: {width: '200px'}
//         },

//     ],


// );
//translation
// annotate service.order with {
//     id    @Common.Label: '{@i18n>id}';
//     orderdate      @Common.Label: '{@i18n>orderdate}';
//     totalamount       @Common.Label:'{@i18n>totalamount}';
//     status       @Common.Label:'{@i18n>status}';
//     criticality    @Common.Label:'{@i18n>criticality}';
//     paymentmethod    @Common.Label: '{@i18n>paymentmenthod}';
// }


//----------------QuickViewFacet--------------
// annotate service.order with @(
//      UI.QuickViewFacet: [{
//         $Type : 'UI.ReferenceFacet',
//         Label : 'Order details',
//         Target: '@UI.FiledGroup#orderdetails5'
//     }],
//     UI.FieldGroup#orderdetails5: {
//         Data: [

//         // {
//         //     $Type: 'UI.DataField',
//         //     Value: id
//         // },
//         {
//             $Type: 'UI.DataField',
//             Value: orderdate
//         },
//         {
//             $Type: 'UI.DataField',
//             Value: rating
//         },
//         {
//             $Type: 'UI.DataField',
//             Value: paymentmethod
//         },
//     ]
//     }
// )