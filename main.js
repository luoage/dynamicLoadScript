webpackJsonp([4,5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

function init() {
	var pathname = (window.location.pathname || '').replace(/\..*/, '').replace(/^\//, '');

	window.console && console.log(['import', pathname].join(' '));
	var path = [(pathname || 'd'), '.js'].join('');

	pathname && __webpack_require__(1)("./" + path);
}

init();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

var map = {
	"./a": [
		2,
		0
	],
	"./a.js": [
		2,
		0
	],
	"./b": [
		3,
		3
	],
	"./b.js": [
		3,
		3
	],
	"./c": [
		4,
		2
	],
	"./c.js": [
		4,
		2
	],
	"./d": [
		5,
		1
	],
	"./d.js": [
		5,
		1
	],
	"./index": [
		0
	],
	"./index.js": [
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 1;


/***/ }
],[0]);