using fioriApi as service from '../../srv/service';

annotate service.student with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'id',
                Value: id,
            },
            {
                $Type: 'UI.DataField',
                Label: 'name',
                Value: name,
            },
            {
                $Type: 'UI.DataField',
                Label: 'age',
                Value: age,

            },
            {
                $Type: 'UI.DataField',
                Label: 'tRef_id',
                Value: tRef_id,
            },
            {
                $Type: 'UI.DataField',
                Label: 'tRef_id.salary',
                Value: tRef.salary,
            },

            {
            $Type: 'UI.DataFieldWithUrl',
            Label: 'Trigger Url',
            Value: 'SAP Developer',
            Url:'https://developers.sap.com/'
        },
        ],
    },

    UI.@UI.DateTimeStyle                      : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GenerateHeaderFacet',
        Label : 'Student info',
        Target: '@UI.FieldGroup#HeaderGenerateGroup1'
    }],


    UI.FieldGroup #HeaderGenerateGroup1  : {Data: [
        {
            $Type: 'UI.DataField',
            Label: 'name',
            Value: name,
        },
        {
            $Type: 'UI.DataField',
            Label: 'age',
            Value: age,
        },

    ]},

    UI.HeaderFacets                      : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GenerateHeaderFacet',
        Label : 'Student info',
        Target: '@UI.FieldGroup#HeaderGenerateGroup1'
    }],
UI.Facets: [
    {
        $Type: 'UI.ReferenceFacet',
        ID: 'FacetStudentInfo',
        Label: 'Student Info',
        Target: '@UI.FieldGroup#HeaderGenerateGroup1'
    },
    {
        $Type: 'UI.ReferenceFacet',
        ID: 'FacetFullDetails',
        Label: 'Full Description',
        Target: '@UI.FieldGroup#GeneratedGroup'
    },
    
  

],
   
    UI.HeaderInfo                        : {
        TypeName: 'Student',
        Title   : {Value: name},
    },

    UI.LineItem                          : [
        {
            $Type: 'UI.DataField',
            Label: 'id',
            Value: id,
        },
        {
            $Type: 'UI.DataField',
            Label: 'name',
            Value: name,
        },
         
        {
            $Type      : 'UI.DataField',
            Label      : 'age',
            Value      : age,
            Criticality: criticality,

        },
        {
            $Type: 'UI.DataField',
            Label: 'tRef_id',
            Value: tRef_id,
        },
        {
            $Type: 'UI.DataField',
            Value: tRef.salary,
            Label: 'salary',
        },
         {
            $Type: 'UI.DataField',
            Value:  sRef.s_name,
            Label: 'schoolname',

        },

        {
            $Type   : 'UI.DataFieldForAction',
            Action  : 'fioriApi.EntityContainer/modifyAge',
            Label   : 'modifyAge',
            Inline:true,
            Criticality:#Positive,
        },
         {
            $Type   : 'UI.DataFieldForAction',
            Action  : 'fioriApi.EntityContainer/createstudent',
            Label   : 'createstudent',
        },
        
         {
            $Type   : 'UI.DataFieldForAction',
            Action  : 'fioriApi.updatename',
            Label   : 'updatename',
            Inline:true,
        }
    ],
    
  UI.SelectionFields: [
        id,
        name,
        age,
        
    ],
    UI.PresentationVariant #vh_student_id: {
        $Type    : 'UI.PresentationVariantType',
        SortOrder: [{
            $Type     : 'Common.SortOrderType',
            Property  : id,
            Descending: false,
        }, ],
    },
);

annotate service.student with {
    tRef @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'teacher',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: tRef_id,
                ValueListProperty: 'id',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'tname',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'salary',
            },
        ],
    }
};


annotate service.student with {
    id @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'student',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: id,
                ValueListProperty: 'id',
            }, ],
        },
        Common.ValueListWithFixedValues: true,
    )
};

annotate service.student with {
    name @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'student',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: name,
                ValueListProperty: 'name',
            }, ],
        },
        Common.ValueListWithFixedValues: true,
    )
};
// annotate service.student with {
//   myDate @Common.IsCalendarDateTime;
//   myDate @Common.TimeZone: 'TIME_ZONE';
// };
annotate service.student with {
    age @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'student',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: age,
                ValueListProperty: 'age',
            }, ],
        },
        Common.ValueListWithFixedValues: true,
    )
};

annotate service.student with @(
     UI.Identification:[
        {
            $Type:'UI.DataFieldForAction',
            Label:'createstudent',
            Action:'fioriApi.EntityContainer/createstudent',
        }
        ]
   
);

annotate service.student with @(
    UI.PresentationVariant:{
        Visualizations:['@UI.LineItem'],
        MaxItems:2
    }
);



//Value Help for Description
annotate service.student with {
    sRef @Common.ValueList:{
        $Type:'Common.ValueListType',
        CollectionPath:'school',
        Parameters:[
            {
                $Type:'Common.ValueListParameterInOut',
                LocalDataProperty:'sRef',
                ValueListProperty:'s_name'
            },
            {
                $Type:'Common.ValueListParameterDisplayOnly',
                ValueListProperty:'description'
            }
        ]
    }
}
//    annotate service.student with actions {
//     modifyAge @Common.SideEffects: {
//         TargetProperties: ['age'],
//     };
// };

