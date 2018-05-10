'use strict';

const isEq = require('@codefeathers/iseq/isEq');

const Deck = require('./deck');

const wrap = (f, ...x) => (...y) => f(...x, ...y);

class Slider {
	constructor (options) {
		this.windowSize = options.size;
		this.prefer = options.prefer;
		this.accepting = options.accepting;
	}

	slide (master, compare) {

		const k = this.windowSize;

		const host = Deck.from(master);
		const guest = Deck.from(compare);

		const startSliding = (window, i) => {

			const firstMatch = host.findIndex(wrap(isEq, window[0]));
			if(firstMatch !== -1
				&& window.every((item, j) => host.findIndexAfter(
														firstMatch,
														wrap(isEq, window[j])
													)) !== -1
			) return [ firstMatch, i ];

			const newWindow = Deck.from(guest.slice(++i, k));
			if(newWindow.length !== 0 && newWindow.length === k) return startSliding(newWindow, i);

			return [ -1, -1 ];

		};
		const window = Deck.from(guest.slice(0, k));
		const index = startSliding(window, 0);
		return index;
	}
};

module.exports = Slider;
