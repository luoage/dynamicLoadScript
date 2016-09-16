
/**
 * handlebars模板继承
 *
 * by luoage@msn.cn
 */

const handlebars = require('handlebars');

handlebars.loadPartial = function (name) {
	var partial = handlebars.partials[name];

	if (typeof partial === 'string') {
		partial = handlebars.compile(partial);
		handlebars.partials[name] = partial;
  }

  return partial;
};

handlebars.registerHelper('block', function (name, options) {
	var partial = handlebars.loadPartial(name) || options.fn;

	return partial(this, { data: options.hash });
});

handlebars.registerHelper('partial', function (name, options) {
	handlebars.registerPartial(name, options.fn);
});
