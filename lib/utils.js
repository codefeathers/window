const wrap = (f, ...x) => (...y) => f(...x, ...y);

module.exports = {
	wrap
}