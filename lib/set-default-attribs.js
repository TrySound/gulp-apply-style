var extend = require('extend');

module.exports = function ($, opts) {
	if(opts) {
		$(Object.keys(opts).join(',')).each(function (index, item) {
			var attrs = opts[item.name];
			if(typeof attrs === 'object') {
				$(item).attr(extend({}, attrs, item.attribs));
			}
		});
	}
};
