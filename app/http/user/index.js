'use strict';

var user = {

	list: async (ctx) => {
		await ctx.render('user')
	}

};

module.exports = user;
