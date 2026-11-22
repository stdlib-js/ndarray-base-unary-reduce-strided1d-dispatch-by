/** @license Apache-2.0 */

'use strict';

/**
* Constructor for performing a reduction on an input ndarray according to a callback function.
*
* @module @stdlib/ndarray-base-unary-reduce-strided1d-dispatch-by
*
* @example
* var base = require( '@stdlib/stats-base-ndarray-max-by' );
* var dtypes = require( '@stdlib/ndarray-dtypes' );
* var ndarray = require( '@stdlib/ndarray-base-ctor' );
* var UnaryStrided1dDispatchBy = require( '@stdlib/ndarray-base-unary-reduce-strided1d-dispatch-by' );
*
* var idt = dtypes( 'real_and_generic' );
* var odt = idt;
* var policies = {
*     'output': 'same',
*     'casting': 'none'
* };
*
* var table = {
*     'default': base
* };
* var maxBy = new UnaryStrided1dDispatchBy( table, [ idt ], odt, policies );
*
* var xbuf = [ -1.0, 2.0, -3.0 ];
* var x = new ndarray( 'generic', xbuf, [ xbuf.length ], [ 1 ], 0, 'row-major' );
*
* function clbk( v ) {
*     return v * 2.0;
* }
*
* var y = maxBy.apply( x, clbk );
* // returns <ndarray>
*
* var v = y.get();
* // returns 4.0
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;
