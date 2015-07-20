var cheerio = require('cheerio');
var postcss = require('postcss');

function sizeProc(prop, value) {
	return [{
		type: 'attr',
		prop: prop,
		value: value.replace('px', '')
	}];
}

function attrProc(prop, value) {
	return [{
		type: 'attr',
		prop: prop,
		value: value
	}];
}

var processors = {
	width: sizeProc,
	height: sizeProc,
	align: attrProc,
	valign: attrProc
};

var parse = module.exports = function (html, css, opts) {
	var $ = typeof html === 'string' ? cheerio.load(html) : typeof html === 'object' && html.html ? html : false;

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
			// var items = [];
			rule.eachDecl(function (decl) {
				var proc = processors[decl.prop];
				if(proc) {
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
		return $.html();
	});
};


parse('<h1>Hello, world</h1><p></p>', 'h1 {width: 100px; align: center} p {hello:world}').then(function (result) {
	console.log(result)
});
// parse('<h1>Hello, world</h1><p></p>').then(function (result) {
// 	console.log(result)
// }).catch(function () {
// 	console.log(arguments)
// });
