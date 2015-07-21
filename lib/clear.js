module.exports = function ($, opts) {
	if(opts.classes || opts.ids) {
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
	}

	if(opts.links) {
		$('link').remove();
	}
};
