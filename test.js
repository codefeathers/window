const Slider = require('.');

const a = [ 0, 1, 2, 3, 4, 5 ];
const b = [ 2, 3, 4 ];

const w = new Slider({ size: 3 });
console.log(w.slide(a, b));