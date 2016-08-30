"use strict";

import "./b.js";
import "./c.js";

require.ensure([], function(){
	console.log('tst');
});

var pathname = (window.location.pathname||'').replace(/\..*/, '').replace(/^\//, '');

window.console && console.log(['import', pathname].join(' '));

var path = [(pathname || 'd'), '.js'].join('');

pathname && System.import('./' + path);
