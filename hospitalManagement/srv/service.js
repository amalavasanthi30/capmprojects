const cds = require('@sap/cds');//Main engine of CAP applications
const { SELECT, UPDATE, INSERT }= require('@sap/cds/lib/ql/cds-ql');
 
module.exports = cds.service.impl(function () {
const {
        Hospital, Department, Doctor, Receptionist, Patient,
        Appointment, PatientRecord, Prescription, LabTest,
        Billing, Payment, Ward, Nurse} = this.entities;
 
 //-------------HOOKS--------------
  // ---------Hospital-----------------
    this.before('CREATE',Hospital,(req)=>{
        const {Hospital_Id, Hospital_name,ContactNo} = req.data;
        //ID validation
        if(!Hospital_Id)
        {
           return  req.error("Please give the valid hospital Number");
        }
 
 
       //Hospital name validation
       if(!Hospital_name)
        {
           return  req.error("Please give the valid hospital Name");
        }
        if(!ContactNo)
        {
            return  req.error("Please give the valid Contact No");
        }
    })
     this.before('UPDATE',Hospital,(req)=>{
        const {Hospital_Id} = req.data;
        if(!Hospital_Id)
        {
            return req.error("You cannot update because id is not  present")
        }
     })
 
     this.before('DELETE',Hospital,(req)=>{
         const {Hospital_Id} = req.data;
        if(!Hospital_Id)
        {
            return req.error("You cannot delete because id is not  present")
        }
     })
 
     //----------------Departpartment--------------------------------------
 
      this.before('CREATE',Department,(req)=>{
        const {Department_Id,Department_name ,HospitalID} = req.data;
        //ID validation
        if(!Department_Id||!Department_name||!HospitalID)
        {
           return  req.error("Required field is missing");
        }
 
 
    })
 
    this.before('UPDATE','Department',async(req)=>{
        const {No_Of_Doctors,No_Of_Nurse,ID}=this.entities;
         if(ID)
        {
            return req.error("You cannot update because id is not  present")
        }
        if(No_Of_Doctors<=0)
        {
       req.error("Doctor  cannot be negative")
        }
        if(No_Of_Nurse<=0)
        {
            req.error("Nurse cannot be negative")
        }
    })
      this.before('DELETE',Department,async(req)=>{
             const {Department_Id} = req.data;
        if(!Department_Id)
        {
            return req.error("You cannot delete because id is not  present")
        }
 
        // Department must exist
  const department = await SELECT.one.from(Department).where({ Department_Id });
  if (!department) {
    return req.error( 'Department  is not found');
  }
 
  const hasDoctors = await SELECT.one.from(Doctor).where({ DeptID: Department_Id });
  if (hasDoctors) {
    return req.error( "You  cannot delete department with doctors");
  }
        })
 
//-------------------------Doctor---------------------------------
 
 
this.before('CREATE', Doctor, async (req) => {
    const {Doctor_Id,Doctor_name,Specialisation,Experience} = req.data;
 
    //  ID check
    if (!Doctor_Id||!Doctor_name||!Specialisation)
        return  req.error("Required field is missing");

    
     
 
        if(Experience <= 0){
            req.error("Experience should not be negative");
        }
 
 
});
 
this.before('UPDATE', Doctor, async req => {
 
    const{Experience}=this.entities
    {
           if(Experience <= 0){
            req.error("Experience cannot be negative");
        }
    }
})
 
  this.before('DELETE', Doctor, async (req) => {
   const{Doctor_Id}=req.data;
    if (!Doctor_Id) {
      return req.error('Doctor ID is mandatory for delete');
    }
 
    // 2️.Check Doctor exists
    const doctor = await SELECT.one.from(Doctor).where({ Doctor_Id });
    if (!doctor) {
      return req.error("Doctor is not present");
    }
})
 
//-------------------------Patient----------------------------------
 
  this.before('CREATE', Patient, async (req) => {
 
    const {
      Patient_Id, Name, Gender, Age,
      BloodGroup, ContactNo, EmergencyContact
    } = req.data;
 
   
    if (! Patient_Id || !Name || !Gender || !Age || !ContactNo) {
      return req.error("required fields are missing");
    }
 
    const exists = await SELECT.one.from(Patient).where({ Patient_Id });
    if (exists) {
      return req.error("Patient already exists");
    }
 
   
    if (Age <= 0 || Age > 120) {
      return req.error("Invalid age");
    }
 
    if (!['Male', 'Female', 'Other'].includes(Gender)) {
      return req.error("Invalid gender");
    }
 
   
    if (ContactNo.length !== 10) {
      return req.error('Invalid contact number');
    }
 
  });
 
  this.before('UPDATE', Patient, async (req) => {
 
    const {  Patient_Id, Age, ContactNo } = req.data;
 
    if (! Patient_Id) {
      return req.error('Patient ID required');
    }
    const patient = await SELECT.one.from(Patient).where({  Patient_Id });
    if (!patient) {
      return req.error('Patient not found');
    }
    if (Age !== undefined && (Age <= 0 || Age > 120)) {
      return req.error('Invalid age');
    }
    if (ContactNo !== undefined && ContactNo.length !== 10) {
      return req.error( 'Invalid contact number');
    }
  });
 
  this.before('DELETE', Patient, async (req) => {
 
  const { Patient_Id}=req.data;
 
    if (! Patient_Id) {
      return req.error( "You cannot delete without patirnt id" );
    }
 
    const patient = await SELECT.one.from(Patient).where({  Patient_Id });
    if (!patient) {
      return req.error('Patient not found');
    }
  });
 
  //---------------------lab test-----------------------
 
    this.before('CREATE', LabTest, async req => {
 
        const {LabTest_Id  ,Test_name,Test_Date} = req.data;
        if (!LabTest_Id  )
          return req.error("LabTest ID is required");
 
 
        if (!Test_name)
           return req.error("Test name is required");
        if (!Test_Date)
          return req.error("Test date is required");
    });
 
    this.before('UPDATE', LabTest, async req => {
        const {LabTest_Id  ,Test_name} = req.data;
        if (!LabTest_Id )
          return req.error("LabTest ID is required for update");
 
        const existing = await SELECT.from(LabTest).where({LabTest_Id  });
        if (existing.length === 0)
          return req.error("LabTest ID  does not exist");
 
 
        if (Test_name === "")
          return req.error("Test name cannot be empty");
    });
 
    this.before('DELETE', LabTest, async req => {
        const {LabTest_Id  } = req.data;
        if (!LabTest_Id  )
          return req.error("LabTest ID is required for delete");
 
        const existing = await SELECT.from(LabTest).where({LabTest_Id });
        if (existing.length === 0)
          return req.error("LabTest ID  does not exist");
    });
 
    //------------------BILLING---------------------------
   
    this.before('CREATE', Billing, async req => {
        const {Billing_Id,Date,Amount} = req.data;
        if (!Billing_Id)
          return req.error("Billing ID is required");
 
        const existing = await SELECT.from(Billing).where({Billing_Id });
        if (existing.length > 0)
          return req.error("Billing ID id already exists");
 
        if (!Date)
          return req.error("Billing date is required");
        if (Amount === undefined || Amount === null)
          return req.error("Amount is required");
    });
 
    this.before('UPDATE', Billing, async req => {
        const {Billing_Id}= req.data;
        if (Billing_Id)
          return req.error("Billing ID is required for update");
 
        const existing = await SELECT.from(Billing).where({Billing_Id});
        if (existing.length === 0)
          return req.error(`Billing ID does not exist`);
    });
 
    this.before('DELETE', Billing, async req => {
        const {Billing_Id} = req.data;
        if (Billing_Id)
           return req.error("Billing ID is required for delete");
 
        const existing = await SELECT.from(Billing).where({ Billing_Id   });
        if (existing.length === 0)
         return req.error("Billing ID  does not exist");
    });
 
    //-------------------PAYMENT-------------------------------
    this.before('CREATE', Payment, async req => {
        const {Payment_Id,Payment_Mode,Paid_Amount} = req.data;
        if (Payment_Id)
          return req.error("Payment ID is required");
 
      
 
        if (!Payment_Mode)
           return req.error("Payment mode is required");
        if (Paid_Amount === undefined || Paid_Amount === null)
          return req.error("Paid amount is required");
    });
 
    this.before('UPDATE', Payment, async req => {
        const {Payment_Id} = req.data;
        if (!Payment_Id)
           return req.error("Payment ID is required for update");
 
        const existing = await SELECT.from(Payment).where({ Payment_Id });
        if (existing.length === 0)
           return req.error(`Payment ID does not exist`);
    });
 
    this.before('DELETE', Payment, async req => {
        const {Payment_Id} = req.data;
        if (!Payment_Id)
           return req.error("Payment ID is required for delete");
 
        const existing = await SELECT.from(Payment).where({Payment_Id});
        if (existing.length === 0)
           return req.error(`Payment ID "${ID}" does not exist`);
    });
 
 
 
   
    //----------------------------NURSE-----------------------------
   
    this.before('CREATE', 'Nurse', async (req) => {
        const {Nurse_Id,Name,Contact_No}= req.data;
        if (!Nurse_Id)
           return req.error("Nurse ID is required");
 
 
        if (!Name)
           return req.error("Nurse name is required");
        if (!Contact_No)
           return req.error("Nurse contact is required");
    });
 
    this.before('UPDATE', 'Nurse', async (req) => {
        const {Nurse_Id} = req.data;
        if (!Nurse_Id)
           return req.error("Nurse ID is required for update");
 
        const existing = await SELECT.from(Nurse).where({ Nurse_Id });
        if (existing.length === 0)
           return req.error(`Nurse ID does not exist`);
    });
 
    this.before('DELETE', 'Nurse', async(req) => {
        const {Nurse_Id} = req.data;
        if (!Nurse_Id)
           return req.error("Nurse ID is required for delete");
 
        const existing = await SELECT.from(Nurse).where({Nurse_Id});
        if (existing.length === 0)
           return req.error(`Nurse ID does not exist`);
    });
 
 
//-------------function------------------
// 1.Get Doctor Count
    this.on('getDoctorCount', async (req) => {
        const { Department_Id } = req.data;
 
        const doctors = await SELECT.from(Doctor).where({ Department_Id });
        return doctors.length;
    });
 
//2.Get patient count
 
 
    this.on('getPatientCount', async (req) => {
    const patient = await SELECT.from(Patient);
    return patient.length;
});
 
 //3.Get appointment by doctor
   this.on('getAppointmentByDoctor', async (req) => {
        const { Doctor_Id } = req.data;
        if(!Doctor_Id){
          req.error("Doctor ID is reqired")
        }
     
        const result = await SELECT.from(Appointment).where({docID:Doctor_Id});
        return result;
    });
 
//4.get admitted patients
     this.on('getAdmittedPatients', async (req) => {
 
    const admittedPatients = await SELECT.from(Patient)
        .where({ Status: 'admitted' });
 
    return admittedPatients;
 
});
 
 
//5.get appointment count
this.on('getAppoinmentCount',async()=>{
  const appointments=await SELECT.from(Appointment)
  return appointments.length;
})
 
//6.get department doctors
 this.on('getDepartmentDoctors', async (req) => {
        const { Department_Id } = req.data;
 
        if (!Department_Id) {
            req.error("Department ID is required");
        }
 
        // Fetch all doctors for this department
        const doctors = await SELECT.from(Doctor).where({ Department_Id });
 
        return doctors;
    });
 
  //---------------action------------------------
 
  //1.approveAppointment
  this.on('approveAppointment', async (req) => {
 
        const {Appintment_Id} = req.data;
        const Details = await SELECT.from(Appointment).where({Appintment_Id});
        // console.log(Details);
       
        if(Details.Status === "Booked"){
 
            await UPDATE(Appointment).set({Status: "Approved"}).where({Appintment_Id});
            return "Appointment Approved Successfully";
 
        }else {
           req.error("Not updated")
        }
 
    })
 
 
  //2.cancelAppointment(update the status once it is completed.....)
 
 
    this.on("cancelAppointment", async (req) => {
 
            const {Appoinment_Id} = req.data;
            await UPDATE(Appointment).set({Status: "Cancelled"}).where({Appoinment_Id});
            return "Appointment Approved Successfully";
 })
 
 //3.Admit Patient
 
      this.on('admitPatient', async (req) => {
 
        const { Patient_Id } = req.data;
 
        // Fetch patient
        const patient = await SELECT.one.from(Patient).where({ Patient_Id });
 
        if (!patient) {
            return req.error('Patient not found');
        }
 
        // Check current status
        if (patient.Status === 'admitted') {
            return req.error(`Patient is already admitted`);
        }
 
        if (patient.Status === 'discharge') {
            return req.error(`Cannot admit a discharged patient`);
        }
 
        // Update status to admitted
        await UPDATE(Patient).set({ Status: 'admitted' }).where({ Patient_Id });
 
        return req.error(`Patient admitted successfully`);
    });
 
  //4.Discharge Patient
 
   this.on('dischargePatient', async (req) => {
 
        const { Patient_Id } = req.data;
 
        // 1.Check if patient exists
        const patient = await SELECT.one.from(Patient).where({ Patient_Id });
 
        if (!patient) {
            return req.error('Patient not found');
        }
 
        // 2️.Validate current status
        if (patient.Status === 'discharged') {
            return req.error('Patient is already discharged');
        }
 
        if (patient.Status !== 'admitted' && patient.Status !== 'under treatment') {
            return req.error('Only admitted or under-treatment patients can be discharged');
        }
 
        // 3️.Update status
        await UPDATE(Patient).set({ Status: 'discharged' }).where({ Patient_Id });
 
        return req.error('Patient discharged successfully');
    });
 
   //5.assignDoctorToDepartment
 
    this.on('assignDoctorToDepartment', async (req) => {
    const { Doctor_Id, Department_Id } = req.data;
 
    // Validation
    if (!Doctor_Id)
      req.error("Doctor ID is required");
    if (!Department_Id)
      req.error(400, "Department ID is required");
 
    // Check if doctor exists
    const doctor = await SELECT.from(Doctor).where({ Doctor_Id });
    if (doctor.length === 0)
      req.error(`Doctor "${Doctor_Id}" not found`);
 
    // Check if department exists
    const department = await SELECT.from(Department).where({ Department_Id });
    if (department.length === 0)
      req.error(`Department "${Department_Id}" not found`);
 
    // Update the doctor with new department
    await UPDATE(Doctor).set({ Department_Id }).where({ Doctor_Id });
 
    return `Doctor ${Doctor_Id} has been assigned to Department ${Department_Id}`;
});
 
//6.addMedicineToPrescription
 
 
this.on('addMedicineToPrescription', async (req) => {
    const { Prescription_Id, Medicine_Id } = req.data;
 
    if (!Prescription_Id || !Medicine_Id) {
        req.error("Prescription ID and Medicine ID are required");
    }
 
    // check prescription exists
    const prescription = await SELECT.from(Prescription).where({ Prescription_Id });
    if (!prescription.length)
      req.error("Prescription not found");
 
    // check medicine exists
    const medicine = await SELECT.from(Medicine).where({ Medicine_Id });
    if (!medicine.length)
      req.error("Medicine not found");
 
    // create PresLineItem with only mandatory info
    await INSERT.into(PresLineItem).entries({Prescription_Id,Medicine_Id});
 
    return `Medicine ${Medicine_Id} added to Prescription ${Prescription_Id}`;
});
 
//7.bookAppointment
this.on('bookAppointment',async(req)=>{
    //To set tha status
 req.data.status="Booked";
 await INSERT.into(Appointment).entries(req.data)
 return "Appointment Booked successfully"
 
})
 
  })
 