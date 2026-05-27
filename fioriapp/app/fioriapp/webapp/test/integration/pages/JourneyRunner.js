sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"fioriapp/test/integration/pages/orderList",
	"fioriapp/test/integration/pages/orderObjectPage",
	"fioriapp/test/integration/pages/productObjectPage"
], function (JourneyRunner, orderList, orderObjectPage, productObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('fioriapp') + '/test/flp.html#app-preview',
        pages: {
			onTheorderList: orderList,
			onTheorderObjectPage: orderObjectPage,
			onTheproductObjectPage: productObjectPage
        },
        async: true
    });

    return runner;
});

