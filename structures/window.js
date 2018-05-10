class Window extends Array {

	constructor (...args) {
		if(args.length === 1) return args;
		return super(...args);
	}

	recurse (fn) {
		let index = 0;
		const call = (arr, acc = []) => {
			if(arr[0]) {
				const res = fn(index++, arr[0]);
				return call(arr.slice(1), [ res, ...acc ]);
			}
			return acc;
		};
		return call(this);
	}

	findIndexAfter(index, predicate) {
		const self = this;
		let i = index + 1;
		while(i < self.length) {
			if(predicate(self[i])) return i;
			i++;
		}
		return -1;
	}

	empty () {
		this.recurse(i => this.splice(i));
		return this;
	}
};

module.exports = Window;