sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"project1/test/integration/pages/studentList",
	"project1/test/integration/pages/studentObjectPage"
], function (JourneyRunner, studentList, studentObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('project1') + '/test/flp.html#app-preview',
        pages: {
			onThestudentList: studentList,
			onThestudentObjectPage: studentObjectPage
        },
        async: true
    });

    return runner;
});

