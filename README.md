<!--

@license Apache-2.0

Copyright (c) 2025 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

<!-- lint disable maximum-heading-length -->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# UnaryStrided1dDispatchBy

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Constructor for performing a reduction on an input ndarray according to a callback function.



<section class="usage">

## Usage

```javascript
import UnaryStrided1dDispatchBy from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by@deno/mod.js';
```

#### UnaryStrided1dDispatchBy( table, idtypes, odtypes, policies )

Constructor for performing a reduction on an input ndarray according to a callback function.

```javascript
import base from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-ndarray-max-by@deno/mod.js';

var table = {
    'default': base
};

var dtypes = [ 'float64', 'float32', 'generic' ];
var policies = {
    'output': 'same',
    'casting': 'none'
};

var unary = new UnaryStrided1dDispatchBy( table, [ dtypes ], dtypes, policies );
```

The constructor has the following parameters:

-   **table**: strided reduction function dispatch table. Must have the following properties:

    -   **default**: default strided reduction function which should be invoked when provided ndarrays have data types which do not have a corresponding specialized implementation.

    A dispatch table may have the following additional properties:

    -   **types**: one-dimensional list of ndarray data types describing specialized input ndarray argument signatures. Only the input ndarray argument data types should be specified. Output ndarray and additional input ndarray argument data types should be omitted and are not considered during dispatch. The length of `types` must equal the number of strided functions specified by `fcns` (i.e., for every input ndarray data type, there must be a corresponding strided reduction function in `fcns`).
    -   **fcns**: list of strided reduction functions which are specific to specialized input ndarray argument signatures.

-   **idtypes**: list containing lists of supported input data types for each input ndarray argument.

-   **odtypes**: list of supported output data types.

-   **policies**: dispatch policies. Must have the following properties:

    -   **output**: output data type [policy][@stdlib/ndarray/output-dtype-policies].
    -   **casting**: input ndarray casting [policy][@stdlib/ndarray/input-casting-policies].

#### UnaryStrided1dDispatchBy.prototype.apply( x\[, ...args]\[, options], clbk\[, thisArg] )

Performs a reduction on a provided input ndarray according to a callback function.

```javascript
import ndarray from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-ctor@deno/mod.js';
import base from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-ndarray-max-by@deno/mod.js';

var table = {
    'default': base
};

var dtypes = [ 'float64', 'float32', 'generic' ];
var policies = {
    'output': 'same',
    'casting': 'none'
};

var unary = new UnaryStrided1dDispatchBy( table, [ dtypes ], dtypes, policies );

var xbuf = [ -1.0, 2.0, -3.0 ];
var x = new ndarray( 'generic', xbuf, [ xbuf.length ], [ 1 ], 0, 'row-major' );

function clbk( v ) {
    return v * 2.0;
}

var y = unary.apply( x, clbk );
// returns <ndarray>

var v = y.get();
// returns 4.0
```

The method has the following parameters:

-   **x**: input ndarray.
-   **...args**: additional input ndarray arguments (_optional_).
-   **options**: function options (_optional_).
-   **clbk**: callback function.
-   **thisArg**: callback function execution context (_optional_).

The method accepts the following options:

-   **dims**: list of dimensions over which to perform a reduction.
-   **dtype**: output ndarray data type. Setting this option, overrides the output data type policy.
-   **keepdims**: boolean indicating whether the reduced dimensions should be included in the returned ndarray as singleton dimensions. Default: `false`.

By default, the method returns an ndarray having a data type determined by the output data type policy. To override the default behavior, set the `dtype` option.

```javascript
import ndarray from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-ctor@deno/mod.js';
import base from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-ndarray-max-by@deno/mod.js';
import getDType from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-dtype@deno/mod.js';

var table = {
    'default': base
};

var dtypes = [ 'float64', 'float32', 'generic' ];
var policies = {
    'output': 'same',
    'casting': 'none'
};

var unary = new UnaryStrided1dDispatchBy( table, [ dtypes ], dtypes, policies );

var xbuf = [ -1.0, 2.0, -3.0 ];
var x = new ndarray( 'generic', xbuf, [ xbuf.length ], [ 1 ], 0, 'row-major' );

function clbk( v ) {
    return v * 2.0;
}

var opts = {
    'dtype': 'float64'
};
var y = unary.apply( x, opts, clbk );
// returns <ndarray>

var dt = getDType( y );
// returns 'float64'
```

#### UnaryStrided1dDispatchBy.prototype.assign( x\[, ...args], out\[, options], clbk\[, thisArg] )

Performs a reduction on a provided input ndarray according to a callback function and assigns results to a provided output ndarray.

```javascript
import base from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-ndarray-max-by@deno/mod.js';
import dtypes from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-dtypes@deno/mod.js';
import ndarray from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-ctor@deno/mod.js';

var idt = dtypes( 'real_and_generic' );
var odt = idt;
var policies = {
    'output': 'same',
    'casting': 'none'
};

var table = {
    'default': base
};
var unary = new UnaryStrided1dDispatchBy( table, [ idt ], odt, policies );

var xbuf = [ -1.0, 2.0, -3.0 ];
var x = new ndarray( 'generic', xbuf, [ xbuf.length ], [ 1 ], 0, 'row-major' );

var ybuf = [ 0.0 ];
var y = new ndarray( 'generic', ybuf, [], [ 0 ], 0, 'row-major' );

function clbk( v ) {
    return v * 2.0;
}

var out = unary.assign( x, y, clbk );
// returns <ndarray>

var v = out.get();
// returns 4.0

var bool = ( out === y );
// returns true
```

The method has the following parameters:

-   **x**: input ndarray.
-   **args**: additional input ndarray arguments (_optional_).
-   **out**: output ndarray.
-   **options**: function options (_optional_).
-   **clbk**: callback function.
-   **thisArg**: callback function execution context (_optional_).

The method accepts the following options:

-   **dims**: list of dimensions over which to perform a reduction.

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   A strided reduction function should have the following signature:

    ```text
    f( arrays, clbk, thisArg )
    ```

    where

    -   **arrays**: array containing an input ndarray, followed by any additional ndarray arguments.
    -   **clbk**: callback function.
    -   **thisArg**: callback function execution context.

-   The output data type policy only applies to the `apply` method. For the `assign` method, the output ndarray is allowed to have any supported output data type.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
import base from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-ndarray-max-by@deno/mod.js';
import filledarrayBy from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-filled-by@deno/mod.js';
import uniform from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-base-uniform@deno/mod.js';
import dtypes from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-dtypes@deno/mod.js';
import dtype from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-dtype@deno/mod.js';
import ndarray2array from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-to-array@deno/mod.js';
import ndarray from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-ctor@deno/mod.js';
import UnaryStrided1dDispatchBy from 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by@deno/mod.js';

// Define the supported input and output data types:
var idt = dtypes( 'real_and_generic' );
var odt = idt;

// Define dispatch policies:
var policies = {
    'output': 'same',
    'casting': 'none'
};

// Define a dispatch table:
var table = {
    'default': base
};

// Create an interface for performing a reduction:
var maxBy = new UnaryStrided1dDispatchBy( table, [ idt ], odt, policies );

// Define a function for creating an object with a random value:
function random() {
    return {
        'value': uniform( -1.0, 1.0 )
    };
}

// Generate an array of random numbers:
var xbuf = filledarrayBy( 100, 'generic', random );

// Wrap in an ndarray:
var x = new ndarray( 'generic', xbuf, [ 10, 10 ], [ 10, 1 ], 0, 'row-major' );

// Define an accessor function:
function accessor( v ) {
    return v.value * 100.0;
}

// Perform a reduction:
var opts = {
    'dims': [ 0 ]
};
var y = maxBy.apply( x, opts, accessor );

// Resolve the output array data type:
var dt = dtype( y );
console.log( dt );

// Print the results:
console.log( ndarray2array( y ) );
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2025. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/ndarray-base-unary-reduce-strided1d-dispatch-by.svg
[npm-url]: https://npmjs.org/package/@stdlib/ndarray-base-unary-reduce-strided1d-dispatch-by

[test-image]: https://github.com/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by.svg
[dependencies-url]: https://david-dm.org/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/tree/deno
[deno-readme]: https://github.com/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/tree/umd
[umd-readme]: https://github.com/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/tree/esm
[esm-readme]: https://github.com/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/ndarray-base-unary-reduce-strided1d-dispatch-by/main/LICENSE

[@stdlib/ndarray/output-dtype-policies]: https://github.com/stdlib-js/ndarray-output-dtype-policies/tree/deno

[@stdlib/ndarray/input-casting-policies]: https://github.com/stdlib-js/ndarray-input-casting-policies/tree/deno

</section>

<!-- /.links -->
