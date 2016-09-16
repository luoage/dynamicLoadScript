'use strict';

var user = {

	list: async (ctx) => {
		await ctx.render('user', {
			partials: {
				layout: 'layout'
			}
		});
	}

};

module.exports = user;
