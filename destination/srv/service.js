const cds = require('@sap/cds');

module.exports = cds.service.impl(async function ()

 {
    const{student}=this.entities;
    this.on('CREATE',student, async (req, next)=>{
 
        const Service = await cds.connect.to('GeoMap');
       
 
        const details = await  GetLocation(Service, req.data);
        console.log("Please don't give any error")
        console.log("details:",details);
        console.log("details.place",details.value[1].latitude)
    //     req.data.Place=details.place;
    //    req.data.Latitude = details.latitude;
    //    req.data.Longitude = details.longitude;



    //const location = Array.isArray(details) ? details[0] : details;

        req.data.Place = details.value[1].place;
        req.data.Latitude = details.value[1].latitude;
        req.data.Longitude = details.value[1].longitude;
       console.log("After fetching the details : ",req.data);
        console.log("details :" ,details);
        console.log("latitude :" ,details.latitude);
       
 
     
        console.log(req.data.latitude);
        console.log("all data : ", req.data);
       

        console.log("after function");
 
        await next();
       
    })
 
    async function  GetLocation(Service, student){
 
        try{
    
            const res = await Service.send({
                method: 'GET',
                path : `/odata/v4/geo/GetLocationbyPincode?pincode='${encodeURIComponent(student.Pincode)}'`
            });
 
            console.log('after fetch the data');
            console.log("Result :", res);
 
 
            return res;
        }catch(err){
            console.log("Error", err.message);
           
            return student;
        }
 
    }




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

