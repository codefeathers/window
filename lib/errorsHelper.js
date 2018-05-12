const createError = (code, message) => {
	return {
		err: message,
		code
	}
}

const errors = {
	'WIN_TOO_LARGE_HOST': createError('WIN_TOO_LARGE_HOST', 'Window size is larger than host object'),
	'WIN_TOO_LARGE_GUEST': createError('WIN_TOO_LARGE_GUEST', 'Window size is larger than guest object'),
	'COULD_NOT_SLIDE': createError('COULD_NOT_SLIDE', 'Could not slide into position for given window')
};

module.exports = errors;