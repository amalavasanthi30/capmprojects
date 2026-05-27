const cds=require('@sap/cds');
const { SELECT, UPDATE, UPSERT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function(){
    const {Feedback,Enrollments,Courses,Employees} = this.entities;


//enroll
    this.on('enroll', async (req)=>{
        const {Eid,Cid} = req.data;                                                 
        const employee=await SELECT.one.from(Employees).where({Eid});
        console.log(employee)
        console.log("I am enrollment.......")
        const course=await SELECT.one.from(Courses).where({Cid});
        console.log(course)
       const completionDate = new Date();
       completionDate.setMonth(completionDate.getMonth() + 5);
        console.log(completionDate)
        await INSERT.into(Enrollments).entries({employeeRef_Eid:Eid,courseRef_Cid:Cid,Status:'Enrolled', Enrollmentdate:new Date(),Completiondate:completionDate,Result:'Pending'});
        req.info("Enroll created successfully")
    })

    //before enroll
   this.before('enroll', async (req) => {
    const { Eid, Cid } = req.data;
    const alreadyEnrolled = await SELECT.one.from(Enrollments).where({ employeeRef_Eid: Eid, courseRef_Cid: Cid});
    console.log("hi")
     console.log(alreadyEnrolled)
     console.log("bye")
if (
    alreadyEnrolled &&
    (
        alreadyEnrolled.Status === 'Enrolled' ||
        alreadyEnrolled.Status === 'InProgress' ||
        alreadyEnrolled.Status === 'Certified' ||
        alreadyEnrolled.Status === 'Completed'
    )
)
     {

        return req.error(400,'Employee already enrolled in this course');
    }
    const course = await SELECT.one.from(Courses).where({ Cid });
    if (!course) {
        return req.error('Course not found');
    }
    const currentEnrollments = await SELECT.from(Enrollments).where({ courseRef_Cid: Cid });
   console.log(currentEnrollments)
    if (currentEnrollments.length >= course.Maxenrollment) 
        {
        return req.error( 400, 'Maximum enrollment limit exceeded');
        }

});

//SubmitFeedback

    this.on('submitFeedback', async (req) => {

        const { Enid, Rating, Comments } = req.data;
        const enrollment = await SELECT.one.from('Enrollments').where({Enid });
           console.log(enrollment)
        if (!enrollment) {
            return req.error(404, 'Enrollment not found');
        }
        const data= await INSERT.into(Feedback).entries({  Rating: Rating,Comments: Comments,SubmittedAt: new Date(),enrollmentRef_Enid: Enid});
        console.log(data) 
        req.info('Feedback submitted successfully')
    

    });



    //before submitFeedback

this.before('submitFeedback', async (req) => {

    const { Enid} = req.data;
    console.log(Enid)
    const enrollment = await SELECT.one.from('Enrollments').where({ Enid});
    if (!enrollment) {

        return req.error( 404, 'Enrollment not found');
    }
    if (enrollment.Status !== 'Certified') {

        return req.error(400,'Feedback allowed only for Completed courses');
    }
    const existingFeedback = await SELECT.one.from(Feedback).where({enrollmentRef_Enid:Enid });

    if (existingFeedback) {
  return req.error( 400, 'Feedback already submitted for this enrollment');
    }

});

//expiryCriticality
this.after('READ', Enrollments, async (data, req) => {
        const rows = Array.isArray(data) ? data : [data];
        const today = new Date();
 
        rows.forEach(row => {
            if (!row?.ExpiryDate) return;
 
            const expiry = new Date(row.ExpiryDate);
            const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
 
            if (days < 0) {
                row.expiryCriticality = 1;
            } else if (days <= 30) {
                row.expiryCriticality = 2;
            } else {
                row.expiryCriticality = 3;
            }
        })
    })

    //get location by pincode

this.on('GetLocationbyPincode', async (req) => {
  const pincode = req.data.Pincode;
  if (!pincode) {
    return req.error(400, 'Pincode is required');
  }
  const openstreet = await cds.connect.to('openstreetmap');
  const response = await openstreet.send({
    method: 'GET',
    path: `/search?format=json&postalcode=${pincode}&countrycodes=IN`,
    // headers: { "User-Agent": "cap-app" }
  });
  console.log(response)
  if (!response || response.length === 0) {
    return req.error(404, 'No location found');
  }

const result = response.map(loc => ({
  place: loc.display_name,
  latitude: loc.lat,
  longitude: loc.lon
}));
const place=result[0].place;
console.log(place)
const lat=result[0].latitude;
console.log(lat)
const lan=result[0].longitude;
console.log(lan)
console.log("Mapped Output:", result);
// Google Maps URL (opens map directly)
  const mapUrl = `https://www.google.com/maps?q=${lat},${lan}`;

 await UPDATE(Employees).set({Mapurl:mapUrl}).where({Pincode:pincode})
 const data= await SELECT.one.from(Employees).where({Pincode:pincode})
console.log(data)
console.log(mapUrl)
req.info(`${place},${lat},${lan},${mapUrl}`)
});

// this.on('GetLocationbyPincode', async (req) => {

//   const pincode = req.data.Pincode;

//   if (!pincode) {
//     return req.error(400, 'Pincode is required');
//   }

//   const response = await fetch(
//     `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&countrycodes=IN`,
//     {
//       headers: { "User-Agent": "cap-app" }
//     }
//   );

//   const data = await response.json();

//   if (!data || data.length === 0) {
//     return req.error(404, 'No location found');
//   }

//   return data.map(loc => ({
//     place: loc.display_name,
//     latitude: loc.lat,
//     longitude: loc.lon
//   }));
// });
})