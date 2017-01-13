'use strict';
use(function () {

    // TODO: store apikey server side

    var search = {};
    var Constants = [];

    function othervar() {
        var thispath = component.path;
		Constants.push(thispath.toString());
        return thispath;
    }

    var avar = othervar();

    function getToken() {
        console.log('getToken()');
		var forecastToken = '615b63848bd6926d';
		return forecastToken;
    }

    search.getToken = getToken();
  
    return {
        search: search,
        somevar: Constants[0]
    };

});