const cds = require('@sap/cds');
const fetch = require('node-fetch');
module.exports = cds.service.impl(function () {
//--------------------Get districts for the state----------------------
this.on('GetDistrictbyState', async (req) => {
  const stateName = req.data.State;  
  try {
    const searchUrl = `http://api.geonames.org/searchJSON?q=${stateName}&maxRows=1&featureCode=ADM1&username=amala`; // Get GeoName ID for the state
    const search = await fetch(searchUrl);
    const searchJson = await search.json();
    if (!searchJson.geonames || searchJson.geonames.length === 0) {
      return req.error(404, 'State not found');
    }
    const geoId = searchJson.geonames[0].geonameId;
    const url = `http://api.geonames.org/childrenJSON?geonameId=${geoId}&username=amala`;
    const response = await fetch(url);
    const data = await response.json();
   console.log(data)
    if (!data.geonames || data.geonames.length === 0) {
      return req.error(404, 'No districts found');
    }

    const districts = data.geonames.map(d => ({
      Districtname: d.name,
      latitude: d.lat,
      longitude: d.lng,
      population: d.population
    }));

    return districts;
  } 
  catch (err) {
    console.error('Error fetching districts:', err);
    return req.error(500, 'Failed to fetch districts');
  }
});

  
 //------------------ Get all city by District-----------------------------
this.on('GetCitybyDistrict', async (req) => {
    const districtName = req.data.District;   
    try {
      if(!districtName)
        {
        return [];
      }
        const url = `http://api.geonames.org/searchJSON?q=${districtName }&featureCode=PPL&type=json&username=amala`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        if (!data.geonames || data.geonames.length === 0) {
            return req.error(404, `No places found in district ${districtName}`);
        }

        const city = data.geonames.map(p => ({
            Cityname: p.name,
            latitude: p.lat,
            longitude: p.lng,       
        }));

        return city;

    } 
    catch (err) {
        console.error('Error fetching places:', err);
        return req.error(500, 'Failed to fetch places from GeoNames API');
    }
});

//---------------------get the location by pincode-----------------------------
  this.on('GetLocationbyPincode', async (req) => {
    const pincode = req.data.pincode;
    if (!pincode) {
      return req.error('Pincode is required');
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${pincode}`,
        {
          headers: { 'User-Agent': 'cap-app' }
        }
      );
 
      const data = await response.json();
      console.log(data)
    if (!data || data.length === 0) return req.error(404, 'No location found');
      return data.map(loc => ({
        place: loc.display_name,
        latitude: loc.lat,
        longitude: loc.lon
      }));
 
    } 
    catch (error) {
      console.error(error);
      return req.error('Error fetching pincode data');
    }
  });

 //---------------------get the location by place-----------------------------
    this.on('GetLocationbyPlace', async (req) => {
    const placeName = req.data.Place; 
    if (!placeName) 
        return req.error(400, 'Place name is required');

    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&countrycodes=IN&limit=10`;
        const response = await fetch(url,{ headers: { 'User-Agent': 'cap-app' } });
        const data = await response.json();
        console.log(data)
        if (!data || data.length === 0) 
        return req.error(404, 'No location found');

        const locations = data.map(loc => ({
            Address: loc.display_name,
            latitude: loc.lat,
            longitude:loc.lon
        }));
        return locations;
    } 
    catch (err) {
        console.error(err);
        return req.error(500, 'Failed to fetch location');
    }
});

//------------get Latitude and longitude  by the address-------------

this.on('GetLatLogbyAddress', async (req) => {
    const { doorNo, street, area, district, state, pincode, country } = req.data;

   //validation
    if (!street || !state || !country) {
        return req.error(400, "Street, state, and country are required");
    }

    // Combine all parts into one address string
    const fullAddress = [ doorNo, street, area, district, state, pincode, country ].filter(Boolean).join(', ');
    
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json&addressdetails=1&limit=1`;
        const response = await fetch(url, {
            headers: { 'User-Agent': 'CAP-App' } 
        });

        const data = await response.json();
       console.log(data)
        if (!data || data.length === 0) {
            return req.error(404, "No location found for this address");
        }
        const loc = data[0];
        const addr = loc.address;

        return {
            latitude: loc.lat,
            longitude: loc.lon,
            doorNo: addr?.house_number || doorNo,
            street: addr?.road || street,
            area: addr?.suburb || area,
            district: addr?.county || district,
            state: addr?.state || state,
            country: addr?.country || country,
            pincode: addr?.postcode || pincode
        };

    }
     catch (err) {
        console.error(err);
        return req.error(500, "Failed to fetch location");
    }
});
});




 