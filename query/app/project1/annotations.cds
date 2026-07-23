using StuApi as service from '../../srv/service';
annotate service.emp with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'eid',
                Value : eid,
            },
            {
                $Type : 'UI.DataField',
                Label : 'name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'salary',
                Value : salary,
            },
            {
                $Type : 'UI.DataField',
                Label : 'departmentRef_did',
                Value : departmentRef_did,
            },
        ],
    },
    UI.SelectionFields:[
name
    ],
    
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'eid',
            Value : eid,
        },
        {
            $Type : 'UI.DataField',
            Label : 'name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'salary',
            Value : salary,
        },
        {
            $Type : 'UI.DataField',
            Label : 'departmentRef_did',
            Value : departmentRef_did,
        },
    ],
);

// annotate service.emp with {
//     departmentRef @Common.ValueList : {
//         $Type : 'Common.ValueListType',
//         CollectionPath : 'dept',
//         Parameters : [
//             {
//                 $Type : 'Common.ValueListParameterInOut',
//                 LocalDataProperty : departmentRef_did,
//                 ValueListProperty : 'did',
//             },
//             {
//                 $Type : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty : 'name',
//             },
//         ],
//     }
// };

annotate  service.emp with 
{
    name @Common.ValueList:{
$Type:'Common.ValueListType',
CollectionPath:'emp',
Parameters:[
    {
        $Type:Common.ValueListParameterInOut,
        ValueListProperty:'name'
    },
    //  {
    //     $Type:Common.ValueListParameterInOut,
    //     ValueListProperty:'salary'
    // },
]
    }
    @Common.ValueListWithFixedValues:true
}

