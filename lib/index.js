var path = require('path');
var Transform = require('readable-stream').Transform;
var cheerio = require('cheerio');
var extend = require('extend');
var processors = require('./processors');
var applyStyle = require('./apply-style');
var setDefaultAttribs = require('./set-default-attribs');
var clear = require('./clear');


var defaults = {
	ext: '.html',
	processors: processors,
	defaultAttribs: {
		table: {
			border: 0,
			cellpadding: 0,
			cellspacing: 0
		}
	},
	clear: {
		classes: true,
		ids: true
	}
};

module.exports = function (opts) {
	var htmls = [];
	var files = [];
	var paths = [];
	opts = extend({}, defaults, opts || {});

	return Transform({
		objectMode: true,
		transform: function (file, enc, cb) {
			var $;
			var dir = path.dirname(file.path);
			var links = [];

			if(path.extname(file.path) === opts.ext) {
				$ = file.cheerio || cheerio.load(file.contents);

				$('link').each(function (index, item) {
					links.push(path.resolve(path.join(dir, item.attribs.href)));
				});

				setDefaultAttribs($, opts.defaultAttribs);

				htmls.push({
					file: file,
					$: $,
					links: links
				});
			} else {
				files.push(file);
				paths.push(file.path);
			}

			cb();
		},
		flush: function (cb) {
			var inst = this;

			Promise.all(htmls.map(function (html) {
				var $ = html.$;

				return Promise.all(html.links.map(function (link, index) {
					if(~paths.indexOf(link)) {
						return applyStyle($, files[index].contents.toString(), opts.processors);
					} else {
						return Promise.resolve();
					}
				})).then(function () {
					clear($, opts.clear);
					html.file.contents = new Buffer($.html());
					inst.push(html.file);
				});
			})).then(function () {
				cb();
			}, function (err) {
				cb(err);
			});
		}
	})
};
