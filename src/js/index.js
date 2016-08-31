'use strict';

function init() {
	var pathname = (window.location.pathname || '').replace(/\..*/, '').replace(/^\//, '');

	window.console && console.log(['import', pathname].join(' '));
	var path = [(pathname || 'd'), '.js'].join('');

	pathname && System.import('./' + path);
}

init();
