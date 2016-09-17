'use strict';

var customer = {
	list: async function(ctx){
		await ctx.render('a', {
			a: '----',
			x: {
				m:'-------iii-------'
			}
		}) .catch((e) => {
			console.log(e.stack);
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
