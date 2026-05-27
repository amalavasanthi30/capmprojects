namespace service.srv;
 using{API_BUS_SOLUTION_ORDER_SRV as s4} from './external/API_BUS_SOLUTION_ORDER_SRV.csn';
using{schema as db } from '../db/schema';
service externalServie
{
    entity result1 as projection on  s4.A_BSOrdSrvcContrItmBillgReqItm;
    entity result2 as projection on  db.BSOrdSrvcContrItmBillgReqItm_HANA;

}