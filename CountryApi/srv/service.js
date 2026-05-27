
const cds = require('@sap/cds');
const fetch = require('node-fetch');

module.exports = cds.service.impl(function () {

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
      districtname: d.name,
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
   

});