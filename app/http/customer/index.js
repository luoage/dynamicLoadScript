'use strict';

const handlebars = require('handlebars');


handlebars.loadPartial = function (name) {
  var partial = handlebars.partials[name];
  if (typeof partial === "string") {
    partial = handlebars.compile(partial);
    handlebars.partials[name] = partial;
  }
  return partial;
};

handlebars.registerHelper("block",
  function (name, options) {
    /* Look for partial by name. */
    var partial
      = handlebars.loadPartial(name) || options.fn;
    return partial(this, { data : options.hash });
});

handlebars.registerHelper("partial",
  function (name, options) {
    handlebars.registerPartial(name, options.fn);
});


var customer = {
	list: async function(ctx){



		await ctx.render('a',
			{
				a: 'ablt-i--abc',
				partials: {
					user: 'user'
				},
				helpers: {
					block: function(name, options){
					} 
				}
			}
		)
		.catch((e) => {
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
