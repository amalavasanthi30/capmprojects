sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"project1/test/integration/pages/empList",
	"project1/test/integration/pages/empObjectPage"
], function (JourneyRunner, empList, empObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('project1') + '/test/flp.html#app-preview',
        pages: {
			onTheempList: empList,
			onTheempObjectPage: empObjectPage
        },
        async: true
    });

    return runner;
});

