sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"project1/test/integration/pages/bookList",
	"project1/test/integration/pages/bookObjectPage"
], function (JourneyRunner, bookList, bookObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('project1') + '/test/flp.html#app-preview',
        pages: {
			onThebookList: bookList,
			onThebookObjectPage: bookObjectPage
        },
        async: true
    });

    return runner;
});

