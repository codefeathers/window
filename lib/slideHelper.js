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

const startSliding = (k, host, guest, window, windowPos) => {

	const firstMatch = host.findIndex(wrap(isEq, window[0]));

	// If first item returns a match, then continue to slideNext()
	const len = firstMatch ? slideNext(host, guest, firstMatch, windowPos) : undefined;
	if (len && len > 1) return converter(firstMatch, windowPos, len);

	const nextWindowPos = windowPos + 1;
	const newWindow = guest.slice(nextWindowPos, nextWindowPos + k);
	if (newWindow.length === k) return startSliding(newWindow, nextWindowPos);

	return errors.COULD_NOT_SLIDE;

};

const slide = (k, host, guest) => {

	if (k > host.length) return errors.WIN_TOO_LARGE_HOST;
	if (k > guest.length) return errors.WIN_TOO_LARGE_GUEST;

	// Create a new window and start sliding
	const window = guest.slice(0, k);
	return startSliding(k, host, guest, window, 0);
}

module.exports = slide;