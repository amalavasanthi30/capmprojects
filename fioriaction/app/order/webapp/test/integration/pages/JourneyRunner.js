sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"order/test/integration/pages/orderList",
	"order/test/integration/pages/orderObjectPage"
], function (JourneyRunner, orderList, orderObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('order') + '/test/flp.html#app-preview',
        pages: {
			onTheorderList: orderList,
			onTheorderObjectPage: orderObjectPage
        },
        async: true
    });

    return runner;
});

