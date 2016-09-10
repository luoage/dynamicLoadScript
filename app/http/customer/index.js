
var customer = {
	list: async (ctx) => {
		await ctx.render('a', {a:'ablt-ii--abc'}).catch((e) => {
			console.log(e.stack);
		})
	}
};

module.exports = customer;
