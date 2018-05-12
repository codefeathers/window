'use strict';

const slideHelper = require('./slideHelper');

class Slider {
	constructor (options) {
		this.windowSize = options.size;
		this.predicate = options.predicate;
		this.prefer = options.prefer;
		this.accepting = options.accepting;
	}

	slide (host, guest) {
		return slideHelper(this.windowSize, this.predicate, host, guest);
	}
};

module.exports = Slider;
