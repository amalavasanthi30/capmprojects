sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/BusyDialog",
     "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, MessageBox, BusyDialog,JSONModel) {

    "use strict";

    return Controller.extend(
        "ui5.FeedbackManagementSystem.controller.App",
        {

//Json model
    onInit: function () {

         console.log("Submit button clicked");
        var oModel = new JSONModel({
            feedbacks: []
        });

        this.getView().setModel(oModel, "feedback");

    },
    //onSubmit
        onSubmit: function () {
            var name = this.byId("nameInput").getValue();
            var email = this.byId("emailInput").getValue();
            var subject = this.byId("subjectInput").getValue();
            var message = this.byId("messageInput").getValue();
            var missingFields = [];
            if (!name) {
                missingFields.push("Name");
            }
            if (!email) {
                missingFields.push("Email");
            }
            if (!subject) {
                missingFields.push("Subject");
            }
            if (!message) {
                missingFields.push("Message");
            }
            if (missingFields.length > 0) {
                MessageBox.error(
                    "Missing fields: " + missingFields.join(", ")
                );

                return;
            }

            var oBusyDialog = new BusyDialog({
                text: "Submitting feedback..."
            });

            oBusyDialog.open();

            setTimeout(function () {

                oBusyDialog.close();
//for storing

                 var oModel = this.getView().getModel("feedback");
    var aFeedbacks = oModel.getProperty("/feedbacks");
    aFeedbacks.push({
        name: name,
        email: email,
        subject: subject,
        message: message
    });
    oModel.setProperty("/feedbacks", aFeedbacks);
    console.log(oModel.getProperty("/feedbacks"));
    //------


                MessageToast.show(
                    "Feedback submitted successfully"
                );

                this.byId("nameInput").setValue("");
                this.byId("emailInput").setValue("");
                this.byId("subjectInput").setValue("");
                this.byId("messageInput").setValue("");

            }.bind(this), 2000);
        },

        //Cancel
        onCancel: function () {

            MessageBox.confirm(
                "Are you sure you want to clear the form?",
                {
                title: "Confirmation",

                onClose: function (oAction) {

                    if (oAction === MessageBox.Action.OK) {

                        this.byId("nameInput").setValue("");
                        this.byId("emailInput").setValue("");
                        this.byId("subjectInput").setValue("");
                        this.byId("messageInput").setValue("");

                        MessageToast.show("Form cleared");

                    }

                }.bind(this)

                }
            );

        }

        }
    );

});