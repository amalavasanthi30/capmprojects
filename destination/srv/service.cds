namespace map.srv;

using{schema as db} from '../db/schema';

service Geoservice{
    
  entity student as projection on db.Student;

    type Location {
        place     : String;
        latitude  : String;
        longitude : String;
    };

    function GetLocation(Pincode: String) returns Location;
    
    function GetDistrict(State: String) returns  State;
    type State{
         districtname:String;
         latitude:String;
         longitude:String;
         population: String;
    }
    
}