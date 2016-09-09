
export default {
	list: async (ctx) => {
		console.log('22222');
		await ctx.render('a', {a:'xxxxxyxxxxx'});
	}
};
