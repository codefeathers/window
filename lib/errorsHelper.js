const returnError = (code, message) => {
	return {
		err: message,
		code
	}
}

const errors = {
	'WIN_TOO_LARGE_HOST': returnError('WIN_TOO_LARGE_HOST', 'Window size is larger than host object'),
	'WIN_TOO_LARGE_GUEST': returnError('WIN_TOO_LARGE_GUEST', 'Window size is larger than guest object'),
	'COULD_NOT_SLIDE': returnError('COULD_NOT_SLIDE', 'Could not slide into position for given window')
};

module.exports = errors;