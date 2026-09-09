sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("studentmanagement.controller.student", {

        // Step 1 validation
        onStep1Complete: function () {

            var oName = this.byId("studentName");
            var oEmail = this.byId("studentEmail");
            var oPhone = this.byId("studentPhone");

            var sName = oName.getValue().trim();
            var sEmail = oEmail.getValue().trim();
            var sPhone = oPhone.getValue().trim();

            // Clear previous value states
            oName.setValueState("None");
            oEmail.setValueState("None");
            oPhone.setValueState("None");

            // Validate Student Name
            if (!sName) {
                oName.setValueState("Error");
                oName.setValueStateText("Please enter student name");

                MessageToast.show("Please enter student name");
                return;
            }

            // Validate Email
            if (!sEmail) {
                oEmail.setValueState("Error");
                oEmail.setValueStateText("Please enter email");

                MessageToast.show("Please enter email");
                return;
            }

            // Simple email validation
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(sEmail)) {
                oEmail.setValueState("Error");
                oEmail.setValueStateText("Please enter a valid email");

                MessageToast.show("Please enter a valid email");
                return;
            }

            // Validate Phone
            if (!sPhone) {
                oPhone.setValueState("Error");
                oPhone.setValueStateText("Please enter phone number");

                MessageToast.show("Please enter phone number");
                return;
            }

            // Phone should contain 10 digits
            var phonePattern = /^[0-9]{10}$/;

            if (!phonePattern.test(sPhone)) {
                oPhone.setValueState("Error");
                oPhone.setValueStateText("Phone number must contain 10 digits");

                MessageToast.show("Enter a valid 10-digit phone number");
                return;
            }

            // If everything is correct
            MessageToast.show("Personal details completed");

            var oWizard = this.byId("studentWizard");
            var oStep = this.byId("personalStep");

            oWizard.validateStep(oStep);
        },


        // Step 2 validation
        onStep2Complete: function () {

            var oCourse = this.byId("course");
            var oCollege = this.byId("college");
            var oYear = this.byId("year");

            var sCourse = oCourse.getValue().trim();
            var sCollege = oCollege.getValue().trim();
            var sYear = oYear.getValue().trim();

            oCourse.setValueState("None");
            oCollege.setValueState("None");
            oYear.setValueState("None");

            if (!sCourse) {
                oCourse.setValueState("Error");
                oCourse.setValueStateText("Please enter course");

                MessageToast.show("Please enter course");
                return;
            }

            if (!sCollege) {
                oCollege.setValueState("Error");
                oCollege.setValueStateText("Please enter college");

                MessageToast.show("Please enter college");
                return;
            }

            if (!sYear) {
                oYear.setValueState("Error");
                oYear.setValueStateText("Please enter passing year");

                MessageToast.show("Please enter passing year");
                return;
            }

            MessageToast.show("Education details completed");

            var oWizard = this.byId("studentWizard");
            var oStep = this.byId("educationStep");

            oWizard.validateStep(oStep);
        },


        // Submit button
        onSubmit: function () {

            MessageToast.show(
                "Student Registration Submitted Successfully!"
            );

        }

    });

});