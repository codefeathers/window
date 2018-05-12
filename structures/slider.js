'use strict';

const isEq = require('@codefeathers/iseq');

const wrap = (f, ...x) => (...y) => f(...x, ...y);

class Slider {
	constructor (options) {
		this.windowSize = options.size;
		this.prefer = options.prefer;
		this.accepting = options.accepting;
	}

	slide (host, guest) {

		const k = this.windowSize;

		const get = {
			val: 0,
			next: () => ++get.val,
		}

		const startSliding = (window, i) => {

			const firstMatch = host.findIndex(wrap(isEq, window[0]));
			if(firstMatch !== -1) {
				get.val = firstMatch;
				if(window.every((item, j) => {
					if(j === 0) return true;
					return isEq(item, host[get.next()]);
				})) return [ firstMatch, i ];
			}

			const nextI = i + 1;
			const newWindow = guest.slice(nextI, nextI + k);
			if(newWindow.length === k) return startSliding(newWindow, nextI);

			return [ -1, -1 ];

		};
		const window = guest.slice(0, k);
		return startSliding(window, 0);
	}
};

module.exports = Slider;
