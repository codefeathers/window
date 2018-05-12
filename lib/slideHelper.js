const isEq = require('@codefeathers/iseq');
const Fuse = require('@codefeathers/fuse');

const { wrap } = require('./utils');
const errors = require('./errorsHelper');

const converter = (
	hostPosition,
	guestPosition,
	matchLength
) => ({
	hostPosition,
	guestPosition,
	matchLength
});

const slideNext = (host, window, hostPos, windowPos, len = 1) => {
	const newHostPos = hostPos + 1;
	const newWindowPos = windowPos + 1;
	if (isEq(window[newWindowPos], host[newHostPos]))
		return slideNext(host, window, newHostPos, newWindowPos, len + 1);
	return (len);
};

const startSliding = (k, predicate, host, guest, window, windowPos) => {

	const test = predicate ?  predicate : isEq;

	const firstMatch = host.findIndex(wrap(test, window[0]));

	// If first item returns a match, then continue to slideNext()
	const len = (firstMatch !== -1) ? slideNext(host, guest, firstMatch, windowPos) : undefined;
	if (len && len > 1) return converter(firstMatch, windowPos, len);

	const nextWindowPos = windowPos + 1;
	const newWindow = guest.slice(nextWindowPos, nextWindowPos + k);
	if (newWindow.length === k) return startSliding(k, predicate, host, guest, newWindow, nextWindowPos);

	return errors.COULD_NOT_SLIDE;

};

const slide = (k, predicate, host, guest) => {

	if (k > host.length) return errors.WIN_TOO_LARGE_HOST;
	if (k > guest.length) return errors.WIN_TOO_LARGE_GUEST;

	// Create a new window and start sliding
	const window = guest.slice(0, k);
	return startSliding(k, predicate, host, guest, window, 0);
}

module.exports = slide;