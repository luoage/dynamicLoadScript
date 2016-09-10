// utilities
import router from './class/router';


// controller
import user from './http/user/';
import customer from './http/customer/';


var rts = new router();


rts.group({ namespace: '/user' }, (rt) => {
	rt.get('/list', user.list);
	rt.get('/abc', user.list);
	rt.get('/abcd', user.list);
});

rts.group({ namespace: '/customer' }, (rt) => {
	rt.get('/', customer.list);
	rt.get('/list', customer.list);
	rt.get('/abc', customer.list);
	rt.get('/abcd', customer.list);
});


module.exports = rts.router;
