namespace service.srv;
using { API_SALESORGANIZATION_SRV as exdb }from './external/API_SALESORGANIZATION_SRV.csn';
using { schema as db  } from '../db/schema';


service SalesService {
    entity result1 as projection on exdb.A_SalesOrganization;
    entity result2 as projection on db.SalesOrganizations;
    entity result3 as projection on db.Company;
}



