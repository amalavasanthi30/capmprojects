namespace schema;
  using{ API_BUS_SOLUTION_ORDER_SRV as s4} from '../srv/external/API_BUS_SOLUTION_ORDER_SRV.csn';

entity BSOrdSrvcContrItmBillgReqItm  as projection on  s4.A_BSOrdSrvcContrItmBillgReqItm
{
BusinessSolutionOrder,
BusinessSolutionOrderItem
}
// entity BSOrdSrvcContrItmBillgReqItm_HANA {
//     key BusinessSolutionOrder     : String;
//      BusinessSolutionOrderItem    : String;
//              BillingRequestItem   :String;
// }
