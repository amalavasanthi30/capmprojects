namespace service.srv;
 using{API_BUSINESS_PARTNER as s4} from './external/API_BUSINESS_PARTNER.csn';
using{externalApi as db } from '../db/external';
service externalServie
{
    entity result1 as projection on  s4.A_AddressEmailAddress;
    entity result2 as projection on  db.A_AddressEmailAddress;

}