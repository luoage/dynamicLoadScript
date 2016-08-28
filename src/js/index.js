"use strict";

import "./a.js";
import "./b.js";
import "./c.js";

require.ensure([], function(){
	console.log('tst');
});

var pathname = (window.location.pathname||'').replace(/\..*/, '').replace(/^\//, '');

console.log(pathname);

var path = [(pathname || 'd'), '.js'].join('');

console.log(path)

System.import('./' + path);
