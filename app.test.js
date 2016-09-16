
/*
import fs from 'fs';
var b = function(cb) {
	cb();
};

var a = function(){
	throw new Error('false');
};

try {
	b(a);
}catch(e){
	// 捕获错误
	console.log(e.stack.split(/\n+/).slice(0, 2).join(' ').replace(/ +/g, ' '));
}
*/

/*
var readFile = function() {
	return new Promise((resolve, reject) => {
		fs.readFile('/etc/passwd', function(err, data){
			if(err) reject(err);

			resolve('I am data .');
		});
	});
};

var readFile1 = function() {
	return 222;
};


var as = function*() {
	var a = 1;
	var data = yield readFile();

	console.log(a, data, 'data');
};
*/

/*
var generator = as();

generator.next().value.then((data) => {
	generator.next(data);
});

// console.dir(generator.next());
// console.dir(generator.next());
*/

/*
var as1 = async function() {

	var a = 1;
	//var data = await readFile();
	var data = await (function(){

		return new Promise((resolve, reject) => {
			reject('222, false');
			//throw new Error(22);
		});

	})();

	console.log(a, data, 'data');

};

as1().then( (data) => {
	console.log(data);
}, (e) => {
	console.log(e);
});
*/

/*
var x = function() {
	console.log(arguments);

	setTimeout(function() {
		console.log('11111111');

		return 111;
	}, 1111);
};

var m = async function() {
	await x()
};

var x = function() {
	var a = m();

	console.log(a);
};

x();

*/
