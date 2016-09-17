'use strict';

var customer = {
	list: async function(ctx){
		await ctx.render('b', {
			a: '----abc--ii',
			x: {
				m:'---------'
			}
		});

	},
	ls2: async function(ctx) {
		await ctx.render('a',
			{
				a: 'ablt-i--abc'
			}
		)
		.catch((e) => {
			console.log(e.stack);
		});
	}
};

module.exports = customer;
