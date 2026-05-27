sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"project1/test/integration/pages/orderList",
	"project1/test/integration/pages/orderObjectPage"
], function (JourneyRunner, orderList, orderObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('project1') + '/test/flp.html#app-preview',
        pages: {
			onTheorderList: orderList,
			onTheorderObjectPage: orderObjectPage
        },
        async: true
    });

    return runner;
});

