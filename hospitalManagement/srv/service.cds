

namespace hospialmanagement.srv;
 
using {Hospitaldb as db} from '../db/schema';
 
 
service  HospitalApi{
     entity Hospital as projection on db.Hospital;
    entity Department as projection on db.Department;
    entity Doctor as projection on db.Doctor;
    entity Receptionist as projection on db.Receptionist;
    entity Patient as projection on db.Patient;
    entity Appointment as projection on db.Appointment;
    entity PatientRecord as projection on db.PatientRecord;
    entity Prescription as projection on db.Prescription;
    entity PresLineItem as projection on db.PresLineItem;
    entity Medicine as projection on db.Medicine;
    entity LabTest as projection on db.LabTest;
    entity Billing as projection on db.Billing;
    entity Payment as projection on db.Payment;
    entity Nurse as projection on db.Nurse;
 
 
 
//function
function getDoctorCount(Department_Id : String) returns Integer;
function getPatientCount(Patient_Id:String) returns Integer;
function getAppointmentByDoctor(Doctor_Id:String) returns array of Appointment;
function getAdmittedPatients(Patient_Id:String) returns array of Patient;
function getAppoinmentCount(AppointmentID:String)  returns Integer;
function getDepartmentDoctors(Department_Id: String) returns array of Doctor;
//action
 
action approveAppointment(Appintment_Id : String) returns String;
action cancelAppointment(Appintment_Id : String) returns String;
action admitPatient(Patient_Id : String) returns String;
action dischargePatient(Patient_Id : String) returns String;
action bookAppointment(Appintment_Id:String,Date:Date,Time:Time,Type:String,Consultation_Fee:Integer,docID_ID:String,PatID_ID:String)  returns String;
 action assignDoctorToDepartment(doctorID : String,departmentID : String) returns String;
  action addMedicineToPrescription(prescriptionID : String,medicineID : String) returns String;
 }
 