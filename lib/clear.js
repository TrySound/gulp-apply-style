module.exports = function ($, opts) {
	$('*').each(function (index, item) {
		var attribs = item.attribs;

		if(opts.classes) {
			if(attribs.class) {
				delete attribs.class;
			}
		}

		if(opts.ids) {
			if(attribs.id) {
				delete attribs.id;
			}
		}
	});
};
