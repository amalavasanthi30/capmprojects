namespace schema;

using { API_SALESORGANIZATION_SRV as exdb }from '../srv/external/API_SALESORGANIZATION_SRV.csn';

//External entity
@cds.persistence.table
entity SalesOrganizations as projection on exdb.A_SalesOrganization{
    key SalesOrganization,
    SalesOrganizationCurrency,
    CompanyCode
};

//Local entity
entity Company {
    key CompanyID: String;
    Name: String;
    salesReference: Association to SalesOrganizations;
}

//https://port4004-workspaces-ws-74m3b.us10.trial.applicationstudio.cloud.sap/odata/v4/sales/result3?$expand=salesReference


