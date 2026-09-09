//alert("Hii,i am amala")

//--------------------------form--------------------------------
// sap.ui.define([
//     "sap/m/VBox",
//     "sap/m/Title",
//     "sap/m/Label",
//     "sap/m/Input",
//      "sap/m/RadioButton",
//      "sap/m/CheckBox",
//       "sap/m/TextArea",
//       "sap/m/Button",
// ], function (VBox, Title, Label, Input,RadioButton,CheckBox,TextArea,Button) {
//     "use strict";

//     new VBox({
//         width: "300px",
//         items: [

//             // Title
//             new Title({
//                 text: "Employee Registration",
//                 level: "H2"
//             }),

//             // Name
//             new Label({
//                 text: "Name",
//                 labelFor: "nameInput"
//             }),
//             new Input("nameInput", {
//                 placeholder: "Enter your name"
//             }),

//             // Email
//             new Label({
//                 text: "Email",
//                 labelFor: "emailInput"
//             }),
//             new Input("emailInput", {
//                 placeholder: "Enter your email"
//             }),

//             // Phone Number
//             new Label({
//                 text: "Phone Number",
//                 labelFor: "phoneInput"
//             }),
//             new Input("phoneInput", {
//                 placeholder: "Enter your phone number"
//             }),
//                new Label({
//                 text: "Gender"
//             }),
//          //Radio Button
//             new RadioButton({
//                 text: "Male",
//                 groupName: "gender"
//             }),

//             new RadioButton({
//                 text: "Female",
//                 groupName: "gender"
//             }),
//             new Label({
//                 text: "Hobbies"
//             }),

//             new CheckBox({
//                 text: "Reading"
//             }),

//             new CheckBox({
//                 text: "Music"
//             }),

//             new CheckBox({
//                 text: "Sports"
//             }),
//             new Label({
//     text: "Address",
//     labelFor: "addressInput"
// }),

// new TextArea("addressInput", {
//     placeholder: "Enter your address",
//     rows: 4,
//     cols: 30,
//     width: "100%"
// }),
// new Button({
//     text: "Submit",
//     type: "Accept",
//     press: function () {
//         sap.m.MessageToast.show("Form Submitted Successfully!");
//     }
// })
//         ]   
//     }).placeAt("content");
// });


//--------------------------image------------------------------
// sap.ui.define([
//     "sap/m/Image"
// ], function (Image) {
//     "use strict";

//     new Image({
//         src: "https://static.vecteezy.com/system/resources/previews/022/257/312/large_2x/rose-flower-pictures-beautiful-roses-love-rose-flower-beautiful-flowers-wallpapers-ai-generated-free-photo.jpg",
//         width: "150px",
//         height: "150px",
//         decorative: false
//     }).placeAt("content");

// });
//----------------------flexbox------------------------------
// sap.ui.define([
//     "sap/m/FlexBox",
//     "sap/m/Image"
// ], function (FlexBox, Image) {
//     "use strict";

//     new FlexBox({
//         width: "100%",
//         height: "100vh",
//         justifyContent: "Center",
//         alignItems: "Center",
//         items: [
//             new Image({
//                 src: "https://static.vecteezy.com/system/resources/previews/022/257/312/large_2x/rose-flower-pictures-beautiful-roses-love-rose-flower-beautiful-flowers-wallpapers-ai-generated-free-photo.jpg",
//                 width: "150px",
//                 height: "150px"
//             })
//         ]
//     }).placeAt("content");
// });

//----------------------table------------------------------
sap.ui.define([
"sap/m/Table",
"sap/m/Column",
"sap/m/ColumnListItem",
"sap/m/Text"
], function (Table, Column, ColumnListItem, Text) {
    "use strict";
    //create the table
    var oTable=new Table({
        headerText:"Employee Details",
        columns:[
            new Column({
                header:new Text({text:"Id"})
            }),
            new Column({
                header:new Text({text:"Name"})
            }),
            new Column({
                header:new Text({text:"Age"})
            }),
            new Column({
                header:new Text({text:"Salary"})
            })
        ],
        items:[
            new ColumnListItem({
                cells:[
                    new Text({text:"101"}),
                      new Text({text:"Amala"}),
                        new Text({text:"25"}),
                          new Text({text:"50000"}),
                ]  
            }),
             new ColumnListItem({
                cells:[
                    new Text({text:"102"}),
                      new Text({text:"Vasanthi"}),
                        new Text({text:"26"}),
                          new Text({text:"55000"}),
                ]  
            }),

        ]
    })

})
oTable.placeAt("content")
