using vehicles.srv.VehicleApi as service from '../../srv/service';
annotate service.Vehicle with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Vehicleid',
                Value : Vehicleid,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Modelname',
                Value : Modelname,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Price',
                Value : Price,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status',
                Value : Status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'dealers_Dealerid',
                Value : dealers_Dealerid,
            },
        ],
    },
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
            Label : 'Vehicleid',
            Value : Vehicleid,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Modelname',
            Value : Modelname,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Price',
            Value : Price,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : Status,
        },
        {
            $Type : 'UI.DataField',
            Label : 'dealers_Dealerid',
            Value : dealers_Dealerid,
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'vehicles.srv.VehicleApi.EntityContainer/approveVehicle',
            Label : 'approveVehicle',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'vehicles.srv.VehicleApi.EntityContainer/getTotalOrderValue',
            Label : 'getTotalOrderValue',
        },
    ],
);

annotate service.Vehicle with {
    dealers @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Dealer',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : dealers_Dealerid,
                ValueListProperty : 'Dealerid',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Dealername',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Location',
            },
        ],
    }
};

