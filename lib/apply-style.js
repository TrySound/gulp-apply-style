var cheerio = require('cheerio');
var postcss = require('postcss');

module.exports = function ($, css, opts) {

	if(!$ || typeof css !== 'string') {
		return new Promise(function (resolve, reject) {
			if(!$) {
				reject('Undefined html');
			} else {
				reject('Undefined css');
			}
		});
	}

	return postcss().use(function (css) {
		css.eachRule(function (rule) {
			var $el = $(rule.selector);
			rule.eachDecl(function (decl) {
				var proc = opts[decl.prop];
				if(typeof proc === 'function') {
					proc = proc(decl.prop, decl.value);
					if(proc && proc.length) {
						proc.forEach(function (item) {
							if(typeof item === 'object') {
								if(item.type === 'attr') {
									$el.attr(item.prop, item.value);
								} else if(item.type === 'style') {
									$el.css(item.prop, item.value);
								}
							}
						});
					}
				} else {
					$el.css(decl.prop, decl.value);
				}
			});
		});
	}).process(css).then(function () {
		return $;
	});
};
