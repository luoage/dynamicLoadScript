
var customer = {
	list: async (ctx) => {
		await ctx.render('a', {a:'lst-ii--'}).catch((e) => {
			console.log(e.stack);
		})
	}
};

module.exports = customer;
