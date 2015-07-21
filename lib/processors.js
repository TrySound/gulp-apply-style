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

module.exports = {
	width: sizeProc,
	height: sizeProc,
	align: attrProc,
	valign: attrProc
};
