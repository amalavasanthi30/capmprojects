sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"vehiclemanagement/test/integration/pages/VehicleList",
	"vehiclemanagement/test/integration/pages/VehicleObjectPage"
], function (JourneyRunner, VehicleList, VehicleObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('vehiclemanagement') + '/test/flp.html#app-preview',
        pages: {
			onTheVehicleList: VehicleList,
			onTheVehicleObjectPage: VehicleObjectPage
        },
        async: true
    });

    return runner;
});

