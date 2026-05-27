const cds=require('@sap/cds');
const { SELECT, DELETE } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function(){
    const {Employees,Courses,Assessments,Enrollments} = this.entities;
    

    //inProgess
 this.on('startTraining', async (req) => {

    const { Enid } = req.params[0];
    const result = await SELECT.one.from(Enrollments).where({ Enid });
    if (!result) {
        return req.error(404, 'Enrollment not found');
    }
    if (result.Status !== 'Enrolled') {
        return req.error(400, 'Only Enrolled status can be changed to InProgress');
    }
    await UPDATE(Enrollments).set({ Status: 'InProgress' }).where({ Enid });
    return req.info('Training Started Successfully');
});
    //findscore
this.on('findscore', async (req) => {
    const { Enid } = req.params[0];
    const assessments = await SELECT.from(Assessments) .where({ enrollmentRef_Enid: Enid });
    let total = 0;
    let obtained = 0;
    for (let a of assessments) {
        total += a.Totalmark || 0;
        obtained += a.MarksObtained || 0;
    }
    let percentage = 0;
    if (total > 0) {
        percentage = (obtained / total) * 100;
    }
    await UPDATE(Enrollments).set({ Score: percentage }).where({ Enid });
    const enrollmentdata = await SELECT.one.from(Enrollments)  .where({ Enid });
    return req.info(`Score is ${enrollmentdata.Score}`);
});
    //complete
this.on('complete', Enrollments, async (req) => {
    const { Enid } = req.params[0];
    const { Score } = req.data;
    const enrollment = await SELECT.one.from(Enrollments).where({ Enid });
    if (!enrollment) {
        return req.error(404, 'Enrollment not found');
    }
    if (Score !== enrollment.Score) {
        return req.error(400, 'Your score is wrong');
    }
    if (Score >= 60) {

        await UPDATE(Enrollments).set({Result :'Pass',Status:'Completed',criticality:3}).where({ Enid });
        return "Candidate Passed";
    }
    await UPDATE(Enrollments).set({Result:'Fail',Status:'ReAttempt',criticality:1}).where({ Enid });
    return "You failed, try next attempt";
});


    //--------------------revoke-------------------------
    this.on('revoke', async (req) => {
    const { Enid, Reason } = req.data;
    if (!Enid) {
        return req.error(400, 'Enrollment ID is required');
    }
    if (!Reason) {
        return req.error(400, 'Reason is required');
    }
    await UPDATE(Enrollments).set({  Status: 'Revoked',Reason }) .where({ Enid });
    const result = await SELECT.from(Enrollments).where({ Enid });
    return result;
});


//getExpiringCertificate
this.on('getExpiringCertificate', async (req) => {

    const { daysAhead } = req.data;
    let today = new Date();
    let futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysAhead);
    let todayStr = today.toISOString().substring(0, 10);
    console.log(todayStr)
    console.log(typeof todayStr)
    let futureStr = futureDate.toISOString().substring(0, 10);
    console.log(futureStr)

const result = await SELECT.from(Enrollments)
    .where`
        ExpiryDate >= ${todayStr}
        and ExpiryDate <= ${futureStr}
        and Status = 'Certified'
    `;
console.log(result)
    
     req.info(JSON.stringify(result));
});



//After Complete
this.after('complete', Enrollments, async (data, req) => {
    const { Enid } = req.params[0];
    const enrollment = await SELECT.one.from(Enrollments).where({ Enid });
    if (enrollment.Result === 'Pass') {
        const course = await SELECT.one.from(Courses).where({Cid: enrollment.courseRef_Cid});
        const year = new Date().getFullYear();
        const randomNo =Math.floor(1000 + Math.random() * 9000);
        const certNo =`CERT-${year}-${randomNo}`;
        let expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth()+ course.Validitymonth);
        await UPDATE(Enrollments).set({CertificateNo:certNo,ExpiryDate:expiryDate,Status:'Certified' }).where({ Enid });
        req.info("You complete the course Successfully.")
    }
});
//Create Assessment
this.on('createAssessment',async(req)=>{
    await INSERT.into(Assessments).entries(req.data)
    return req.info("Assessment created successfully")
    })

 //odata draft
    this.before('CREATE', Enrollments, async (req) => {

    const { employeeRef_Eid, courseRef_Cid } = req.data;
    const employee = await SELECT.one.from(Employees).where({ Eid: employeeRef_Eid });
    console.log(employee)
    const course = await SELECT.one.from(Courses).where({ Cid: courseRef_Cid });
    console.log(course)
    const completionDate = new Date();
    completionDate.setMonth(completionDate.getMonth() + 5);
    req.data.Status = 'Enrolled';
    req.data.Enrollmentdate = new Date();
    req.data.Completiondate = completionDate;
});
//createCourse
this.on('createCourse',async(req)=>{
    await INSERT.into(Courses).entries(req.data)
    return req.info("Courses created successfully")
    })
    //updateCourse
    this.on('updateCourse', async (req) => {
    const { Cid } = req.data;
    await UPDATE(Courses).set(req.data).where({ Cid });
      req.info("data stored uccessfully")
    return SELECT.one.from(Courses).where({ Cid });

})
//deleteCourse
this.on('deleteCourse',async(req)=>{
    const {Cid}=req.data;
    await DELETE.from(Courses).where({Cid})
    req.info("data deleted successfully")
})
//readCourse
this.on('readCourse',async(req)=>{
    const {Cid}=req.data;
    const data=await SELECT.one.from(Courses).where({Cid})
    console.log(data)
    req.info(JSON.stringify(data))
})

//criticality
this.before('CREATE', Enrollments, async (req) => {
    const { Result } = req.data;

    if (Result === 'Pass') {
        req.data.criticality = 3;
    } else if (Result === 'Fail') {
        req.data.criticality = 1;
    } 
    else if (Result==='Pending'){
        req.data.criticality=5;
    }
});

//expiryCriticality
// this.after('READ', Enrollments, async (data, req) => {
//         const rows = Array.isArray(data) ? data : [data];
//         const today = new Date();
 
//         rows.forEach(row => {
//             if (!row?.ExpiryDate) return;
 
//             const expiry = new Date(row.ExpiryDate);
//             const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
 
//             if (days < 0) {
//                 row.expiryCriticality = 1;
//             } else if (days <= 30) {
//                 row.expiryCriticality = 2;
//             } else {
//                 row.expiryCriticality = 3;
//             }
//         })
        
//     })
    // Kpi rating

 this.after('READ', 'Enrollments', async (results) => {

    // convert single object to array
    if (!Array.isArray(results)) {
        results = [results];
    }

    // fetch all enrollments
    const data = await SELECT.from('Enrollments');

    const total = data.length;

    const certified = data.filter(
        e => e.Status === 'Certified'
    ).length;

    const rate =
        total > 0
            ? Math.round((certified / total) * 100)
            : 0;

    // enrich actual response
    results.forEach(e => {
        e.TotalEnrollments = total;
        e.Certifiedcount= certified;
        e.Rate = rate;
    });

});




    
})