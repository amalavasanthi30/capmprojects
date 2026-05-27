const cds = require('@sap/cds');

module.exports = cds.service.impl(async function ()

 {

  
   this.on("GetDistrict", async function (req) {

    const destination = await cds.connect.to('Country');

    const {State} = req.data;

    console.log("State:", State);

    const result = await destination.send({
        method: 'GET',
        path: `odata/v4/country-api/GetDistrictbyState(State='${State}')`
    });
    console.log("hiiiii")
    console.log(result)

    return result
   
});

})

