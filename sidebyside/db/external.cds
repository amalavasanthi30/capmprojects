namespace externalApi;

using {API_BUSINESS_PARTNER as s4} from '../srv/external/API_BUSINESS_PARTNER.csn';

entity  A_AddressEmailAddress as projection on s4.A_AddressEmailAddress
{
     AddressID,
     Person,
     EmailAddress
}


