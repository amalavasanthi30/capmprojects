sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"vehicle/test/integration/pages/VehicleList",
	"vehicle/test/integration/pages/VehicleObjectPage"
], function (JourneyRunner, VehicleList, VehicleObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('vehicle') + '/test/flp.html#app-preview',
        pages: {
			onTheVehicleList: VehicleList,
			onTheVehicleObjectPage: VehicleObjectPage
        },
        async: true
    });

    return runner;
});

