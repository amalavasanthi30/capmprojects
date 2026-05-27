namespace map.srv;

service GeoService {

    function GetDistrictbyState( State: String) returns  many String;

    function GetCitybyDistrict(District: String) returns many String;

     function GetLocationbyPincode(pincode: String) returns many String;

     function GetLocationbyPlace(Place: String) returns many String;

   function GetLatLogbyAddress(
        doorNo   : String,
        street   : String,
        area     : String,
        district : String,
        state    : String,
        pincode  : String,
        country  : String
    ) returns String;

}