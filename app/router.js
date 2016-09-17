'use strict';

// utilities
import Router from './class/router';


// controller
import user from './http/user/';
import customer from './http/customer/';


var rts = new Router();


rts.group({ namespace: '/user' }, (rt) => {
	rt.get('/list', user.list);
	rt.get('/abc', user.list);
	rt.get('/abcd', user.list);
});

rts.group({ namespace: '/customer' }, (rt) => {
	rt.get('/', customer.list);
	rt.get('/abc', customer.list);
	rt.get('/ls2', customer.ls2);
	rt.get('/abc', customer.list);
	rt.get('/abcd', customer.list);
});


module.exports = rts.router;
