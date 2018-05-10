'use strict';

const isEq = require('@codefeathers/iseq/isEq');

const Window = require('./window');

const wrap = (f, ...x) => (...y) => f(...x, ...y);

class Slider {
	constructor (options) {
		this.windowSize = options.window;
		this.prefer = options.prefer;
		this.accepting = options.accepting;
	}

	slide (to, from) {
		const k = this.windowSize;
		const host = new Window(...to);
		const guest = new Window(...from);
		const recurse = (window, i) => {
			let x, y, z;
			x = host.findIndex(wrap(isEq, window[0]));
			let switcher = true;
			if(x !== -1)
				for (let j = 1; j < window.length; j++)
					if(host.findIndexAfter(x, wrap(isEq, window[j])) === -1) {
						switcher = false;
						break;
					}
			if(switcher) return [ x, i ];
			const newWindow = new Window(...guest.slice(++i, k));
			if(newWindow.length !== 0 && newWindow.length === k) return recurse(newWindow, i);
			return [ -1, -1 ];
		};
		const window = new Window(...guest.slice(0, k));
		const index = recurse(window, 0);
		return index;
	}
};

module.exports = Slider;