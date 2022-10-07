(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$Model = F2(
	function (preferences, notes) {
		return {notes: notes, preferences: preferences};
	});
var $author$project$Data$Notes$birthNotes = _List_fromArray(
	[' Masajes perineales, compresas tibias y conducta de protección activa del perineo.', 'No fórceps ni succión (ventosa).', 'En caso de cesárea NECESARIA, hacerla HUMANIZADA; No poner cortina divisoria entre Mamá y el procedimiento,\n       Papá o Mamá reciben al bebé cuando la Doctora lo indique,\n       Inmeditamente se coloca al bebé de manera transversal en Mamá o en su defecto, \n       en Papá, y ahí se realizan las pruebas neonatólogas pertinentes.']);
var $author$project$Data$Notes$laborNotes = _List_fromArray(
	['Priorizar un parto natural vaginal humanizado sin medicamentos ni anestesia, muy poca intervención médica.', 'No hacer enemas, lavado vaginal (clorhexidina) ni episiotomía. No rasurar vello púbico.', 'No cardiotocografía: La CTG continua puede restringir otras intervenciones beneficiosas durante el trabajo de parto,\n         como tener una opción de trabajo de parto y posiciones de nacimiento, y poder caminar libremente,\n         y puede ser estresante para las mujeres. \n         Sí auscultación intermitente: ispositivo de ecografía Doppler o estetoscopio de Pinard.', 'Equipo médico, etc. femenino siempre preferible y limitar el número de personas en el parto.', 'No amniotomía, oxitocina ni antiespasmódicos para prevenir el retraso en el trabajo de parto.', 'Si es que requiero alivio de dolor, antes de epidural móvil: usar analgésicos (fenatilo, diamorfina y petidina).']);
var $author$project$Data$Notes$postpartumNotes = _List_fromArray(
	['Evaluación del tono muscular del útero, oxitocina (10 UI, IM/IV) como medicamento uterotónico.', 'Priorizar pecho, preguntar a Mamá siempre permiso para baño y alimentación (fórmula) del Bebé.']);
var $author$project$Data$Notes$myNotes = {birth: $author$project$Data$Notes$birthNotes, labor: $author$project$Data$Notes$laborNotes, postpartum: $author$project$Data$Notes$postpartumNotes};
var $author$project$Icon$Bath = {$: 'Bath'};
var $author$project$Icon$Breastfeeding = {$: 'Breastfeeding'};
var $author$project$Icon$Cord = {$: 'Cord'};
var $author$project$Icon$Cosleep = {$: 'Cosleep'};
var $author$project$Icon$Dad = {$: 'Dad'};
var $author$project$Icon$Drugs = {$: 'Drugs'};
var $author$project$Icon$Food = {$: 'Food'};
var $author$project$Icon$Iv = {$: 'Iv'};
var $author$project$Icon$Kristeller = {$: 'Kristeller'};
var $author$project$Data$Preferences$Labor = {$: 'Labor'};
var $author$project$Icon$Movement = {$: 'Movement'};
var $author$project$Icon$Placentabirth = {$: 'Placentabirth'};
var $author$project$Data$Preferences$Postpartum = {$: 'Postpartum'};
var $author$project$Icon$Skintoskin = {$: 'Skintoskin'};
var $author$project$Icon$Suctioning = {$: 'Suctioning'};
var $author$project$Icon$Vagexam = {$: 'Vagexam'};
var $author$project$Data$Preferences$VaginalBirth = {$: 'VaginalBirth'};
var $author$project$Icon$Waitpush = {$: 'Waitpush'};
var $rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$Node;
var $rtfeldman$elm_css$Html$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$node;
var $rtfeldman$elm_css$Html$Styled$a = $rtfeldman$elm_css$Html$Styled$node('a');
var $rtfeldman$elm_css$Html$Styled$div = $rtfeldman$elm_css$Html$Styled$node('div');
var $rtfeldman$elm_css$Html$Styled$h3 = $rtfeldman$elm_css$Html$Styled$node('h3');
var $rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 'Attribute', a: a, b: b, c: c};
	});
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlJson(value));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$property, key, value),
			false,
			'');
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$href = function (url) {
	return A2($rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'href', url);
};
var $rtfeldman$elm_css$Html$Styled$p = $rtfeldman$elm_css$Html$Styled$node('p');
var $rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		$elm$virtual_dom$VirtualDom$text(str));
};
var $rtfeldman$elm_css$Html$Styled$text = $rtfeldman$elm_css$VirtualDom$Styled$text;
var $author$project$Data$Preferences$myPreferences = _List_fromArray(
	[
		{
		desc: 'No líquidos intravenosos (IV)',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Se debe alentar a las mujeres de bajo riesgo a beber líquidos durante el parto \n      y estar en contra de esta intervención')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('IV aumenta el costo, tiene un impacto considerable en el uso de recursos y reduce la movilidad de las mujeres.')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href('http://apps.who.int/iris/bitstream/handle/10665/112825/9789241507363_eng.pdf')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Consulta manual de las \'Recomendaciones de la OMS para la conducción del trabajo de parto\'')
								]))
						]))
				])),
		icon: $author$project$Icon$Iv,
		id: 'iv',
		stage: $author$project$Data$Preferences$Labor
	},
		{
		desc: 'Limitar tacto vaginal (cada 4 hrs)',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Para disminuir factores de riesgo de infecciones')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Se reconocen a los exámenes vaginales múltiples como contribuyentes a las morbilidades infecciosas \n      (en la madre e infante) asociadas con trabajo de parto prolongado.')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href('http://apps.who.int/iris/bitstream/handle/10665/186171/9789241549363_eng.pdf')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Consulta manual de las \'Recomendaciones de la OMS para la conducción del trabajo de parto\'')
								]))
						]))
				])),
		icon: $author$project$Icon$Vagexam,
		id: 'vag-exam',
		stage: $author$project$Data$Preferences$Labor
	},
		{
		desc: 'Comer y tomar libremente',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('La restricción de la ingesta oral de líquidos y alimentos \n      no tiene efectos beneficiosos sobre los resultados clínicos importantes, incluido el uso de estimulación del trabajo de parto.')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Comer vs. No comer: No hubo diferencias significativas entre grupos para la duración del trabajo de parto, \n      cesárea, parto vaginal operatorio, uso de epidural, trabajo de parto aumento o resultados maternos adversos como náuseas o cetonuria. \n      No hubo datos estimables para Puntaje de Apgar a los cinco minutos.')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href(' http://apps.who.int/iris/bitstream/handle/10665/112825/9789241507363_eng.pdf')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Consulta manual de las \'Recomendaciones de la OMS para la conducción del trabajo de parto\'')
								]))
						]))
				])),
		icon: $author$project$Icon$Food,
		id: 'food-drink',
		stage: $author$project$Data$Preferences$Labor
	},
		{
		desc: 'Contacto inmediato piel-con-piel mínimo 1hr',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Los recién nacidos sin complicaciones deben mantenerse en contacto piel a piel \n      con sus madres durante la primera hora después del nacimiento para prevenir la hipotermia y promover la lactancia materna.')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Realizar las pruebas Apgar mientras el bebé está en el torso de la madre.')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Todos los recién nacidos deben recibir 1 mg de vitamina K por vía intramuscular (IM) después del nacimiento \n      (es decir, después de la primera hora en la que el bebé debe estar en contacto piel con piel con la madre y se debe iniciar la lactancia)')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3206216/')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Consulta artículo de NIH')
								]))
						]))
				])),
		icon: $author$project$Icon$Skintoskin,
		id: 'skin-to-skin',
		stage: $author$project$Data$Preferences$Postpartum
	},
		{
		desc: 'Amamantar dentro de la 1ra hora de vida',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Todos los recién nacidos, incluidos los bebés con bajo peso al nacer (BPN) que pueden amamantar,\n         deben ser amamantados lo antes posible después del nacimiento cuando estén clínicamente estables y la madre y el bebé estén listos.')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Todos los bebés deben ser amamantados exclusivamente desde el nacimiento hasta (al menos) los 6 meses de edad.')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href('http://apps.who.int/iris/bitstream/handle/10665/259269/WHO-MCA-17.07-eng.pdf')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Consulta los lineamientos aprobados por el comité de revisión de las directrices de la OMS sobre la salud del recién nacido')
								]))
						]))
				])),
		icon: $author$project$Icon$Breastfeeding,
		id: 'breast-feeding',
		stage: $author$project$Data$Preferences$Postpartum
	},
		{
		desc: 'Demorar el baño del Bebé por 24 horas',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Para prevenir hipotermia y sus secuelas')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('La hipotermia neonatal es una afección común que afecta entre el 32 % y el 85 % de los recién nacidos hospitalizados. \n                El primer baño del recién nacido tiene como objetivo eliminar la sangre y el meconio de la piel, dejando intacto el vérnix. \n                Sin embargo, bañarse puede ser un procedimiento estresante para un recién nacido, \n                y el baño temprano puede desencadenar hipotermia y sus consecuencias, como hipoglucemia, hipoxia y hemorragia pulmonar. \n                El baño de los recién nacidos se lleva a cabo utilizando varios métodos, incluidos el baño en tina, el baño con esponja, \n                el baño con pañales y el baño con agua corriente.')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2763724/')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Consulta artículo de NIH')
								]))
						]))
				])),
		icon: $author$project$Icon$Bath,
		id: 'bath',
		stage: $author$project$Data$Preferences$Postpartum
	},
		{
		desc: 'Bebé duerme en el cuarto con Mamá y Papá',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Así se alenta el vínculo emocional entre la familia.')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Se monitorea la lactancia y el baño del bebé, y se reduce el riesgo de Síndrome de Muerte Súbita.')
						]))
				])),
		icon: $author$project$Icon$Cosleep,
		id: 'co-sleep',
		stage: $author$project$Data$Preferences$Postpartum
	},
		{
		desc: 'No antibióticos rutinarios',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Dadas las implicaciones potenciales para la salud pública de la alta tasa de uso rutinario de \n                          antibióticos después del parto vaginal sin ningún factor de riesgo específico en algunos entornos')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Los antibióticos solo deben administrarse cuando hay signos clínicos de infección de una herida de \n                      episiotomía o desgarro perineal de segundo grado (que son anatómicamente similares)')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href('http://apps.who.int/iris/bitstream/handle/10665/186171/9789241549363_eng.pdf')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Consulta manual de las \'Recomendaciones de la OMS para la conducción del trabajo de parto\'')
								]))
						]))
				])),
		icon: $author$project$Icon$Drugs,
		id: 'drugs',
		stage: $author$project$Data$Preferences$Postpartum
	},
		{
		desc: 'Esperar la urgencia de pujar',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Los proveedores de atención médica deben evitar imponer pujos dirigidos \n      a las mujeres en la segunda etapa del trabajo de parto, ya que no hay evidencia de ningún beneficio con esta técnica.')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Enseñar a las mujeres, por parte de los profesionales de la salud, \n      a seguir sus propios instintos para empujar cuando sientan la necesidad es más factible que enseñar a las mujeres \n      a realizar la maniobra de Valsalva.')
						]))
				])),
		icon: $author$project$Icon$Waitpush,
		id: 'wait-to-push',
		stage: $author$project$Data$Preferences$VaginalBirth
	},
		{
		desc: 'NO maniobra de Kristeller o presión fúndica',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Puede conducir a resultados adversos en el nacimiento')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Al recibir presión fúndica, la madre puede experimentar más dolor después del parto \n      (evaluado en términos de requisitos analgésicos). Preocupaciones: ruptura uterina y de otros órganos, y muerte materna y perinatal')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href('https://apps.who.int/iris/bitstream/handle/10665/260178/9789241550215-eng.pdf')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Consulta las recomendaciones de la OMS de la atención intraparto para una experiencia de parto positiva')
								]))
						]))
				])),
		icon: $author$project$Icon$Kristeller,
		id: 'kristeller',
		stage: $author$project$Data$Preferences$VaginalBirth
	},
		{
		desc: 'NO succionar nariz o boca del Bebé al nacer',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Puede causar baja saturación de oxígeno')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('La succión oral y nasal de rutina en recién nacidos sanos normales inmediatamente \n      después del nacimiento se asocia con niveles más bajos de saturación de oxígeno (evidencia de alta calidad) \n      y puntuaciones de Apgar más bajas (evidencia de baja calidad)')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href('http://apps.who.int/iris/bitstream/handle/10665/75157/9789241503693_eng.pdf;jsessionid=7B11FDD8E75E4110300259EF8F387708')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Consulta las directrices de la OMS sobre la reanimación básica del recién nacido')
								]))
						]))
				])),
		icon: $author$project$Icon$Suctioning,
		id: 'suctioning',
		stage: $author$project$Data$Preferences$VaginalBirth
	},
		{
		desc: 'Pinzamiento retrasado (por Papá) del cordón umbilical',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Esperar 5 min. a que el cordón umbilical deje de pulsar; \n      para mejorar la salud materna e infantil y los resultados nutricionales')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Previene la hemorragia posparto y puede mejorar el estado de hierro del bebé hasta 6 meses después del nacimiento.')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href('http://apps.who.int/iris/bitstream/handle/10665/148793/9789241508209_eng.pdf')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Consulta la directriz de la OMS: Pinzamiento tardío del cordón umbilical para mejorar los resultados de salud y nutrición de la madre y el bebé')
								]))
						]))
				])),
		icon: $author$project$Icon$Cord,
		id: 'cord',
		stage: $author$project$Data$Preferences$VaginalBirth
	},
		{
		desc: 'Esperar a que la placenta salga sola, sino TCC',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Primero esperar a que la placenta sea expulsada espontáneamente. Si se retiene la placenta\n                    y se produce sangrado, se debe acelerar la extracción manual de la placenta.')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Si la placenta no es expulsada espontáneamente y \n                    la tercera etapa del trabajo de parto dura más de 30 minutos, TCC y oxitocina IV/IM\n                    (10 UI) deben usarse para manejar la placenta retenida. \n                    Siempre que se lleve a cabo la extracción manual de la placenta, \n                    se recomienda una sola dosis de antibióticos profilácticos.'),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$a,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$href('http://apps.who.int/iris/bitstream/handle/10665/75411/9789241548502_eng.pdf?sequence=1')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Consulta las recomendaciones de la OMS para la prevención y tratamiento de hemorragia posparto')
										]))
								]))
						]))
				])),
		icon: $author$project$Icon$Placentabirth,
		id: 'placenta-birth',
		stage: $author$project$Data$Preferences$VaginalBirth
	},
		{
		desc: 'Libertad de movimiento y posiciones',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Facilitar la posición de nacimiento de la elección individual de la mujer, \n      incluida una posición de parto vertical.')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('En la mayoría de los casos una posición no supina se percibió como más fortalecedora y menos dolorosa, \n      y para facilitar un parto más fácil.')
						]))
				])),
		icon: $author$project$Icon$Movement,
		id: 'movement',
		stage: $author$project$Data$Preferences$Labor
	},
		{
		desc: 'Papá presente siempre y recibe al Bebé',
		details: A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Es muy importante que Papá también tenga un rol en el nacimiento del Bebé.')
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$p,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('El mayor apoyo emocional de Mamá es tener a Papá cerca y acompañándola, él también toma decisiones.')
						]))
				])),
		icon: $author$project$Icon$Dad,
		id: 'dad-role',
		stage: $author$project$Data$Preferences$Labor
	}
	]);
var $author$project$Main$initialModel = A2($author$project$Main$Model, $author$project$Data$Preferences$myPreferences, $author$project$Data$Notes$myNotes);
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2($author$project$Main$initialModel, $elm$core$Platform$Cmd$none);
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$core$String$cons = _String_cons;
var $robinheghan$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {charsProcessed: charsProcessed, hash: hash, seed: seed, shift: shift};
	});
var $robinheghan$murmur3$Murmur3$c1 = 3432918353;
var $robinheghan$murmur3$Murmur3$c2 = 461845907;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $robinheghan$murmur3$Murmur3$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Bitwise$or = _Bitwise_or;
var $robinheghan$murmur3$Murmur3$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $robinheghan$murmur3$Murmur3$finalize = function (data) {
	var acc = (!(!data.hash)) ? (data.seed ^ A2(
		$robinheghan$murmur3$Murmur3$multiplyBy,
		$robinheghan$murmur3$Murmur3$c2,
		A2(
			$robinheghan$murmur3$Murmur3$rotlBy,
			15,
			A2($robinheghan$murmur3$Murmur3$multiplyBy, $robinheghan$murmur3$Murmur3$c1, data.hash)))) : data.seed;
	var h0 = acc ^ data.charsProcessed;
	var h1 = A2($robinheghan$murmur3$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2($robinheghan$murmur3$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var $elm$core$String$foldl = _String_foldl;
var $robinheghan$murmur3$Murmur3$mix = F2(
	function (h1, k1) {
		return A2(
			$robinheghan$murmur3$Murmur3$multiplyBy,
			5,
			A2(
				$robinheghan$murmur3$Murmur3$rotlBy,
				13,
				h1 ^ A2(
					$robinheghan$murmur3$Murmur3$multiplyBy,
					$robinheghan$murmur3$Murmur3$c2,
					A2(
						$robinheghan$murmur3$Murmur3$rotlBy,
						15,
						A2($robinheghan$murmur3$Murmur3$multiplyBy, $robinheghan$murmur3$Murmur3$c1, k1))))) + 3864292196;
	});
var $robinheghan$murmur3$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.hash | ((255 & $elm$core$Char$toCode(c)) << data.shift);
		var _v0 = data.shift;
		if (_v0 === 24) {
			return {
				charsProcessed: data.charsProcessed + 1,
				hash: 0,
				seed: A2($robinheghan$murmur3$Murmur3$mix, data.seed, res),
				shift: 0
			};
		} else {
			return {charsProcessed: data.charsProcessed + 1, hash: res, seed: data.seed, shift: data.shift + 8};
		}
	});
var $robinheghan$murmur3$Murmur3$hashString = F2(
	function (seed, str) {
		return $robinheghan$murmur3$Murmur3$finalize(
			A3(
				$elm$core$String$foldl,
				$robinheghan$murmur3$Murmur3$hashFold,
				A4($robinheghan$murmur3$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var $rtfeldman$elm_css$Hash$initialSeed = 15739;
var $elm$core$String$fromList = _String_fromList;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			_Utils_chr('-'),
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2($robinheghan$murmur3$Murmur3$hashString, $rtfeldman$elm_css$Hash$initialSeed, str)));
};
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_v0, styles) {
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				return styles;
			} else {
				return A3(
					$elm$core$Dict$insert,
					cssTemplate,
					$rtfeldman$elm_css$Hash$fromString(cssTemplate),
					styles);
			}
		} else {
			return styles;
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = F2(
	function (styles, _v0) {
		var val = _v0.a;
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				var classname = _v1.a;
				return A2(
					$elm$virtual_dom$VirtualDom$property,
					'className',
					$elm$json$Json$Encode$string(classname));
			} else {
				return A2(
					$elm$virtual_dom$VirtualDom$property,
					'className',
					$elm$json$Json$Encode$string('_unstyled'));
			}
		} else {
			return val;
		}
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS = F2(
	function (styles, _v0) {
		var val = _v0.a;
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				var classname = _v1.a;
				return A2($elm$virtual_dom$VirtualDom$attribute, 'class', classname);
			} else {
				return A2($elm$virtual_dom$VirtualDom$attribute, 'class', '_unstyled');
			}
		} else {
			return val;
		}
	});
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$nodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_nodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_v6, _v7) {
		var key = _v6.a;
		var html = _v6.b;
		var pairs = _v7.a;
		var styles = _v7.b;
		switch (html.$) {
			case 'Unstyled':
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v9 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v9.a;
				var finalStyles = _v9.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v10 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v10.a;
				var finalStyles = _v10.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v11 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v11.a;
				var finalStyles = _v11.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v12 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v12.a;
				var finalStyles = _v12.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _v0) {
		var nodes = _v0.a;
		var styles = _v0.b;
		switch (html.$) {
			case 'Unstyled':
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v2 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v2.a;
				var finalStyles = _v2.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v3 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v3.a;
				var finalStyles = _v3.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v4 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v4.a;
				var finalStyles = _v4.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v5 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v5.a;
				var finalStyles = _v5.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin = '\u0007';
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$styleToDeclaration = F3(
	function (template, classname, declaration) {
		return declaration + ('\n' + A3($elm$core$String$replace, $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin, classname, template));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return A3($elm$core$Dict$foldl, $rtfeldman$elm_css$VirtualDom$Styled$styleToDeclaration, '', dict);
};
var $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = F2(
	function (maybeNonce, styles) {
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			'span',
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'style', 'display: none;'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'class', 'elm-css-style-wrapper')
				]),
			_List_fromArray(
				[
					A3(
					$elm$virtual_dom$VirtualDom$node,
					'style',
					function () {
						if (maybeNonce.$ === 'Just') {
							var nonce = maybeNonce.a.a;
							return _List_fromArray(
								[
									A2($elm$virtual_dom$VirtualDom$attribute, 'nonce', nonce)
								]);
						} else {
							return _List_Nil;
						}
					}(),
					$elm$core$List$singleton(
						$elm$virtual_dom$VirtualDom$text(
							$rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(styles))))
				]));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyle = F4(
	function (maybeNonce, elemType, properties, children) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toStyleNode, maybeNonce, styles);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(styles),
			properties);
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _v1 = pairs.a;
				var str = _v1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _v1 = pairs.a;
				var firstKey = _v1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2($rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F3(
	function (maybeNonce, allStyles, keyedChildNodes) {
		var styleNodeKey = A2($rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toStyleNode, maybeNonce, allStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F4(
	function (maybeNonce, elemType, properties, keyedChildren) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A3($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, maybeNonce, styles, keyedChildNodes);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(styles),
			properties);
		return A3(
			$elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F5(
	function (maybeNonce, ns, elemType, properties, keyedChildren) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A3($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, maybeNonce, styles, keyedChildNodes);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(styles),
			properties);
		return A4(
			$elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F5(
	function (maybeNonce, ns, elemType, properties, children) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toStyleNode, maybeNonce, styles);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(styles),
			properties);
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 'Unstyled':
			var plainNode = vdom.a;
			return plainNode;
		case 'Node':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyle, $elm$core$Maybe$Nothing, elemType, properties, children);
		case 'NodeNS':
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A5($rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, $elm$core$Maybe$Nothing, ns, elemType, properties, children);
		case 'KeyedNode':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, $elm$core$Maybe$Nothing, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A5($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, $elm$core$Maybe$Nothing, ns, elemType, properties, children);
	}
};
var $rtfeldman$elm_css$Html$Styled$toUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var $author$project$Main$toggleDialog = _Platform_outgoingPort('toggleDialog', $elm$json$Json$Encode$string);
var $author$project$Main$update = F2(
	function (msg, model) {
		var id = msg.a;
		return _Utils_Tuple2(
			model,
			$author$project$Main$toggleDialog(id));
	});
var $rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 'AppendProperty', a: a};
};
var $rtfeldman$elm_css$Css$Structure$Property = function (a) {
	return {$: 'Property', a: a};
};
var $rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(
			$rtfeldman$elm_css$Css$Structure$Property(key + (':' + value)));
	});
var $rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'background-color', c.value);
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _v0) {
		var keyframesByName = _v0.a;
		var declarations = _v0.b;
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var _v2 = declaration.a;
				var properties = _v2.c;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'MediaRule':
				var styleBlocks = declaration.b;
				return A2(
					$elm$core$List$all,
					function (_v3) {
						var properties = _v3.c;
						return $elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'SupportsRule':
				var otherDeclarations = declaration.b;
				return $elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'DocumentRule':
				return _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'PageRule':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'FontFace':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'Keyframes':
				var record = declaration.a;
				return $elm$core$String$isEmpty(record.declaration) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3($elm$core$Dict$insert, record.name, record.declaration, keyframesByName),
					declarations);
			case 'Viewport':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'CounterStyle':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					$elm$core$List$all,
					function (_v4) {
						var properties = _v4.b;
						return $elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
		}
	});
var $rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 'Keyframes', a: a};
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var name = _v0.a;
					var decl = _v0.b;
					return $rtfeldman$elm_css$Css$Structure$Keyframes(
						{declaration: decl, name: name});
				},
				$elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var $rtfeldman$elm_css$Css$Structure$compactDeclarations = function (declarations) {
	var _v0 = A3(
		$elm$core$List$foldr,
		$rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _v0.a;
	var compactedDeclarations = _v0.b;
	return A2($rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
};
var $rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return {
		charset: charset,
		declarations: $rtfeldman$elm_css$Css$Structure$compactDeclarations(declarations),
		imports: imports,
		namespaces: namespaces
	};
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var $rtfeldman$elm_css$Css$String$mapJoinHelp = F4(
	function (map, sep, strs, result) {
		mapJoinHelp:
		while (true) {
			if (!strs.b) {
				return result;
			} else {
				if (!strs.b.b) {
					var first = strs.a;
					return result + (map(first) + '');
				} else {
					var first = strs.a;
					var rest = strs.b;
					var $temp$map = map,
						$temp$sep = sep,
						$temp$strs = rest,
						$temp$result = result + (map(first) + (sep + ''));
					map = $temp$map;
					sep = $temp$sep;
					strs = $temp$strs;
					result = $temp$result;
					continue mapJoinHelp;
				}
			}
		}
	});
var $rtfeldman$elm_css$Css$String$mapJoin = F3(
	function (map, sep, strs) {
		return A4($rtfeldman$elm_css$Css$String$mapJoinHelp, map, sep, strs, '');
	});
var $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.feature + (A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$elm$core$Basics$append(': '),
			expression.value)) + ')'));
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'print';
		case 'Screen':
			return 'screen';
		default:
			return 'speech';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				$elm$core$String$join,
				' and ',
				A2(
					$elm$core$List$cons,
					$rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 'AllQuery':
			var expressions = mediaQuery.a;
			return A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, ' and ', expressions);
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + ($rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var $rtfeldman$elm_css$Css$Structure$Output$importToString = function (_v0) {
	var name = _v0.a;
	var mediaQueries = _v0.b;
	return A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		$rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
		'\n',
		mediaQueries);
};
var $rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_v0) {
	var prefix = _v0.a;
	var str = _v0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var $rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		function (_v0) {
			var prop = _v0.a;
			return prop + ';';
		},
		'',
		properties);
};
var $elm$core$String$append = _String_append;
var $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_v0) {
	var str = _v0.a;
	return '::' + str;
};
var $rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator.$) {
		case 'AdjacentSibling':
			return '+';
		case 'GeneralSibling':
			return '~';
		case 'Child':
			return '>';
		default:
			return '';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 'ClassSelector':
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 'IdSelector':
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 'PseudoClassSelector':
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 'TypeSelectorSequence':
			var str = simpleSelectorSequence.a.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return _Utils_ap(
				str,
				A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors));
		case 'UniversalSelectorSequence':
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return $elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors);
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return _Utils_ap(
				str,
				A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors));
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_v0) {
	var combinator = _v0.a;
	var sequence = _v0.b;
	return $rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator) + (' ' + $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence));
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_v0) {
	var simpleSelectorSequence = _v0.a;
	var chain = _v0.b;
	var pseudoElement = _v0.c;
	var segments = A2(
		$elm$core$List$cons,
		$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		$elm$core$Maybe$withDefault,
		'',
		A2($elm$core$Maybe$map, $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement));
	return A2(
		$elm$core$String$append,
		A2($elm$core$String$join, ' ', segments),
		pseudoElementsString);
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = function (_v0) {
	var firstSelector = _v0.a;
	var otherSelectors = _v0.b;
	var properties = _v0.c;
	var selectorStr = A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		$rtfeldman$elm_css$Css$Structure$Output$selectorToString,
		',',
		A2($elm$core$List$cons, firstSelector, otherSelectors));
	return selectorStr + ('{' + ($rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties) + '}'));
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = decl.a;
			return $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, ', ', mediaQueries);
			var blocks = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, '\n', styleBlocks);
			return '@media ' + (query + ('{' + (blocks + '}')));
		case 'SupportsRule':
			return 'TODO';
		case 'DocumentRule':
			return 'TODO';
		case 'PageRule':
			return 'TODO';
		case 'FontFace':
			return 'TODO';
		case 'Keyframes':
			var name = decl.a.name;
			var declaration = decl.a.declaration;
			return '@keyframes ' + (name + ('{' + (declaration + '}')));
		case 'Viewport':
			return 'TODO';
		case 'CounterStyle':
			return 'TODO';
		default:
			return 'TODO';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return $rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$importToString, '\n', imports) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$namespaceToString, '\n', namespaces) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, '\n', declarations) + '')));
};
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 'CounterStyle', a: a};
};
var $rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 'FontFace', a: a};
};
var $rtfeldman$elm_css$Css$Structure$PageRule = function (a) {
	return {$: 'PageRule', a: a};
};
var $rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 'Selector', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 'SupportsRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 'Viewport', a: a};
};
var $rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 'MediaRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		return A3(
			$rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var $rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 'StyleBlockDeclaration':
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2($rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 'MediaRule':
						var _v1 = declarations.a;
						var mediaQueries = _v1.a;
						var styleBlocks = _v1.b;
						return _List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									$rtfeldman$elm_css$Css$Structure$mapLast,
									$rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					$rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2($elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var $rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _v0) {
		var sequence = _v0.a;
		var selectors = _v0.b;
		return A3(
			$rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			$elm$core$Maybe$Just(pseudo));
	});
var $rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 'CustomSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 'TypeSelectorSequence', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 'UniversalSelectorSequence', a: a};
};
var $rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 'TypeSelectorSequence':
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 'UniversalSelectorSequence':
				var list = sequence.a;
				return $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _v1 = list.a;
				var combinator = _v1.a;
				var sequence = _v1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _v1 = declarations.a.a;
				var firstSelector = _v1.a;
				var otherSelectors = _v1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2($elm$core$List$cons, firstSelector, otherSelectors),
					$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
	});
var $rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_v0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 'StyleBlockDeclaration':
							var styleBlock = declarations.a.a;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 'MediaRule':
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _v1 = declarations.a;
									var mediaQueries = _v1.a;
									var _v2 = _v1.b;
									var styleBlock = _v2.a;
									return _List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _v3 = declarations.a;
									var mediaQueries = _v3.a;
									var _v4 = _v3.b;
									var first = _v4.a;
									var rest = _v4.b;
									var _v5 = A2(
										$rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_v5.b && (_v5.a.$ === 'MediaRule')) && (!_v5.b.b)) {
										var _v6 = _v5.a;
										var newMediaQueries = _v6.a;
										var newStyleBlocks = _v6.b;
										return _List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2($elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _v5;
										return newDeclarations;
									}
								}
							} else {
								break _v0$12;
							}
						case 'SupportsRule':
							var _v7 = declarations.a;
							var str = _v7.a;
							var nestedDeclarations = _v7.b;
							return _List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 'DocumentRule':
							var _v8 = declarations.a;
							var str1 = _v8.a;
							var str2 = _v8.b;
							var str3 = _v8.c;
							var str4 = _v8.d;
							var styleBlock = _v8.e;
							return A2(
								$elm$core$List$map,
								A4($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 'PageRule':
							return declarations;
						case 'FontFace':
							return declarations;
						case 'Keyframes':
							return declarations;
						case 'Viewport':
							return declarations;
						case 'CounterStyle':
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _v0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			$elm$core$List$cons,
			first,
			A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return $elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return $elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 'Nothing') {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 'FontFeatureValues', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				$elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var $rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var styleBlock = declaration.a;
			return A2(
				$rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var structureStyleBlock = declaration.a;
			return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var structureStyleBlock = declaration.a;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 'MediaRule':
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 'SupportsRule':
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 'DocumentRule':
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 'PageRule':
				return declaration;
			case 'FontFace':
				return declaration;
			case 'Keyframes':
				return declaration;
			case 'Viewport':
				return declaration;
			case 'CounterStyle':
				return declaration;
			default:
				return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_v0) {
	var declarations = _v0.a;
	return declarations;
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(decls));
		};
		var nextResult = A2(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _v14 = _Utils_Tuple2(
				$elm$core$List$head(nextResult),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((_v14.a.$ === 'Just') && (_v14.b.$ === 'Just')) {
				var nextResultParent = _v14.a.a;
				var originalParent = _v14.b.a;
				return _Utils_ap(
					A2(
						$elm$core$List$take,
						$elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return $elm$core$List$concat(
				A2(
					$rtfeldman$elm_css$Css$Structure$mapLast,
					$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						$elm$core$List$map,
						$elm$core$List$singleton,
						A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				insertStylesToNestedDecl,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 'AppendProperty':
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 'ExtendSelector':
					var _v4 = styles.a;
					var selector = _v4.a;
					var nestedStyles = _v4.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 'NestSnippet':
					var _v5 = styles.a;
					var selectorCombinator = _v5.a;
					var snippets = _v5.b;
					var rest = styles.b;
					var chain = F2(
						function (_v9, _v10) {
							var originalSequence = _v9.a;
							var originalTuples = _v9.b;
							var originalPseudoElement = _v9.c;
							var newSequence = _v10.a;
							var newTuples = _v10.b;
							var newPseudoElement = _v10.c;
							return A3(
								$rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								$rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 'StyleBlockDeclaration':
								var _v7 = declaration.a;
								var firstSelector = _v7.a;
								var otherSelectors = _v7.b;
								var nestedStyles = _v7.c;
								var newSelectors = A2(
									$elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											$elm$core$List$map,
											chain(originalSelector),
											A2($elm$core$List$cons, firstSelector, otherSelectors));
									},
									$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 'MediaRule':
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 'SupportsRule':
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 'DocumentRule':
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									$elm$core$List$map,
									A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 'PageRule':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$PageRule(properties)
									]);
							case 'FontFace':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 'Viewport':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 'CounterStyle':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return $elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								$elm$core$List$map,
								expandDeclaration,
								A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 'WithPseudoElement':
					var _v11 = styles.a;
					var pseudoElement = _v11.a;
					var nestedStyles = _v11.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 'WithKeyframes':
					var str = styles.a.a;
					var rest = styles.b;
					var name = $rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = $rtfeldman$elm_css$Css$Structure$Property('animation-name:' + name);
					var newDeclarations = A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						$elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$Keyframes(
								{declaration: str, name: name})
							]));
				case 'WithMedia':
					var _v12 = styles.a;
					var mediaQueries = _v12.a;
					var nestedStyles = _v12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _v13 = $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_v13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _v13.a;
							var otherSelectors = _v13.b;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									$elm$core$List$singleton(
										$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_v2) {
	var firstSelector = _v2.a;
	var otherSelectors = _v2.b;
	var styles = _v2.c;
	return A2(
		$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			$rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2($elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 'SupportsRule':
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 'DocumentRule':
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				$elm$core$List$map,
				A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 'PageRule':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$PageRule(properties)
				]);
		case 'FontFace':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 'Viewport':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 'CounterStyle':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var snippets = _v0.snippets;
	var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {charset: charset, declarations: declarations, imports: imports, namespaces: namespaces};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (sheet) {
	return $rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		$rtfeldman$elm_css$Css$Structure$compactStylesheet(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var $rtfeldman$elm_css$Css$Preprocess$Snippet = function (a) {
	return {$: 'Snippet', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return $rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
				]));
	});
var $rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {charset: $elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
};
var $rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 'ClassSelector', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$templateSelector = $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$ClassSelector($rtfeldman$elm_css$VirtualDom$Styled$classnameStandin)
		]));
var $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate = function (styles) {
	if (!styles.b) {
		return '';
	} else {
		var otherwise = styles;
		return $rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
			$rtfeldman$elm_css$Css$Preprocess$stylesheet(
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$VirtualDom$Styled$makeSnippet, styles, $rtfeldman$elm_css$VirtualDom$Styled$templateSelector)
					])));
	}
};
var $rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var cssTemplate = $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate(styles);
	var classProperty = A2($elm$virtual_dom$VirtualDom$attribute, '', '');
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, true, cssTemplate);
};
var $rtfeldman$elm_css$Html$Styled$Attributes$css = $rtfeldman$elm_css$Html$Styled$Internal$css;
var $rtfeldman$elm_css$Css$Structure$Compatible = {$: 'Compatible'};
var $rtfeldman$elm_css$Css$withPrecedingHash = function (str) {
	return A2($elm$core$String$startsWith, '#', str) ? str : A2(
		$elm$core$String$cons,
		_Utils_chr('#'),
		str);
};
var $rtfeldman$elm_css$Css$erroneousHex = function (str) {
	return {
		alpha: 1,
		blue: 0,
		color: $rtfeldman$elm_css$Css$Structure$Compatible,
		green: 0,
		red: 0,
		value: $rtfeldman$elm_css$Css$withPrecedingHash(str)
	};
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Basics$pow = _Basics_pow;
var $rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return $elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char.valueOf()) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2($elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return $elm$core$Result$Err(
							$elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $rtfeldman$elm_hex$Hex$fromString = function (str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2($elm$core$String$startsWith, '-', str)) {
				var list = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$tail(
						$elm$core$String$toList(str)));
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$negate,
					A3(
						$rtfeldman$elm_hex$Hex$fromStringHelp,
						$elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					$rtfeldman$elm_hex$Hex$fromStringHelp,
					$elm$core$String$length(str) - 1,
					$elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2($elm$core$Result$mapError, formatError, result);
	}
};
var $elm$core$String$toLower = _String_toLower;
var $rtfeldman$elm_css$Css$validHex = F5(
	function (str, _v0, _v1, _v2, _v3) {
		var r1 = _v0.a;
		var r2 = _v0.b;
		var g1 = _v1.a;
		var g2 = _v1.b;
		var b1 = _v2.a;
		var b2 = _v2.b;
		var a1 = _v3.a;
		var a2 = _v3.b;
		var toResult = A2(
			$elm$core$Basics$composeR,
			$elm$core$String$fromList,
			A2($elm$core$Basics$composeR, $elm$core$String$toLower, $rtfeldman$elm_hex$Hex$fromString));
		var results = _Utils_Tuple2(
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[r1, r2])),
				toResult(
					_List_fromArray(
						[g1, g2]))),
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[b1, b2])),
				toResult(
					_List_fromArray(
						[a1, a2]))));
		if ((((results.a.a.$ === 'Ok') && (results.a.b.$ === 'Ok')) && (results.b.a.$ === 'Ok')) && (results.b.b.$ === 'Ok')) {
			var _v5 = results.a;
			var red = _v5.a.a;
			var green = _v5.b.a;
			var _v6 = results.b;
			var blue = _v6.a.a;
			var alpha = _v6.b.a;
			return {
				alpha: alpha / 255,
				blue: blue,
				color: $rtfeldman$elm_css$Css$Structure$Compatible,
				green: green,
				red: red,
				value: $rtfeldman$elm_css$Css$withPrecedingHash(str)
			};
		} else {
			return $rtfeldman$elm_css$Css$erroneousHex(str);
		}
	});
var $rtfeldman$elm_css$Css$hex = function (str) {
	var withoutHash = A2($elm$core$String$startsWith, '#', str) ? A2($elm$core$String$dropLeft, 1, str) : str;
	var _v0 = $elm$core$String$toList(withoutHash);
	_v0$4:
	while (true) {
		if ((_v0.b && _v0.b.b) && _v0.b.b.b) {
			if (!_v0.b.b.b.b) {
				var r = _v0.a;
				var _v1 = _v0.b;
				var g = _v1.a;
				var _v2 = _v1.b;
				var b = _v2.a;
				return A5(
					$rtfeldman$elm_css$Css$validHex,
					str,
					_Utils_Tuple2(r, r),
					_Utils_Tuple2(g, g),
					_Utils_Tuple2(b, b),
					_Utils_Tuple2(
						_Utils_chr('f'),
						_Utils_chr('f')));
			} else {
				if (!_v0.b.b.b.b.b) {
					var r = _v0.a;
					var _v3 = _v0.b;
					var g = _v3.a;
					var _v4 = _v3.b;
					var b = _v4.a;
					var _v5 = _v4.b;
					var a = _v5.a;
					return A5(
						$rtfeldman$elm_css$Css$validHex,
						str,
						_Utils_Tuple2(r, r),
						_Utils_Tuple2(g, g),
						_Utils_Tuple2(b, b),
						_Utils_Tuple2(a, a));
				} else {
					if (_v0.b.b.b.b.b.b) {
						if (!_v0.b.b.b.b.b.b.b) {
							var r1 = _v0.a;
							var _v6 = _v0.b;
							var r2 = _v6.a;
							var _v7 = _v6.b;
							var g1 = _v7.a;
							var _v8 = _v7.b;
							var g2 = _v8.a;
							var _v9 = _v8.b;
							var b1 = _v9.a;
							var _v10 = _v9.b;
							var b2 = _v10.a;
							return A5(
								$rtfeldman$elm_css$Css$validHex,
								str,
								_Utils_Tuple2(r1, r2),
								_Utils_Tuple2(g1, g2),
								_Utils_Tuple2(b1, b2),
								_Utils_Tuple2(
									_Utils_chr('f'),
									_Utils_chr('f')));
						} else {
							if (_v0.b.b.b.b.b.b.b.b && (!_v0.b.b.b.b.b.b.b.b.b)) {
								var r1 = _v0.a;
								var _v11 = _v0.b;
								var r2 = _v11.a;
								var _v12 = _v11.b;
								var g1 = _v12.a;
								var _v13 = _v12.b;
								var g2 = _v13.a;
								var _v14 = _v13.b;
								var b1 = _v14.a;
								var _v15 = _v14.b;
								var b2 = _v15.a;
								var _v16 = _v15.b;
								var a1 = _v16.a;
								var _v17 = _v16.b;
								var a2 = _v17.a;
								return A5(
									$rtfeldman$elm_css$Css$validHex,
									str,
									_Utils_Tuple2(r1, r2),
									_Utils_Tuple2(g1, g2),
									_Utils_Tuple2(b1, b2),
									_Utils_Tuple2(a1, a2));
							} else {
								break _v0$4;
							}
						}
					} else {
						break _v0$4;
					}
				}
			}
		} else {
			break _v0$4;
		}
	}
	return $rtfeldman$elm_css$Css$erroneousHex(str);
};
var $rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2($rtfeldman$elm_css$Css$property, key, arg.value);
	});
var $rtfeldman$elm_css$Css$maxWidth = $rtfeldman$elm_css$Css$prop1('max-width');
var $author$project$Main$notesView = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Css$property, 'line-height', '1.5')
					]))
			]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Html$Styled$p, _List_Nil, _List_Nil),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				A2(
					$elm$core$List$cons,
					$rtfeldman$elm_css$Html$Styled$text('Notas sobre Labor'),
					A2(
						$elm$core$List$map,
						function (x) {
							return A2(
								$rtfeldman$elm_css$Html$Styled$div,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('- '),
										$rtfeldman$elm_css$Html$Styled$text(x)
									]));
						},
						model.notes.labor))),
				A2($rtfeldman$elm_css$Html$Styled$p, _List_Nil, _List_Nil)
			]));
};
var $rtfeldman$elm_css$Css$Structure$AllQuery = function (a) {
	return {$: 'AllQuery', a: a};
};
var $rtfeldman$elm_css$Css$Media$all = $rtfeldman$elm_css$Css$Structure$AllQuery;
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $rtfeldman$elm_css$Css$Media$feature = F2(
	function (key, _v0) {
		var value = _v0.value;
		return {
			feature: key,
			value: $elm$core$Maybe$Just(value)
		};
	});
var $rtfeldman$elm_css$Css$Media$minWidth = function (value) {
	return A2($rtfeldman$elm_css$Css$Media$feature, 'min-width', value);
};
var $author$project$Main$ToggleDialog = function (a) {
	return {$: 'ToggleDialog', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 'ApplyStyles', a: a};
};
var $rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(
			$rtfeldman$elm_css$Css$Structure$Property(key + (':' + value)));
	});
var $rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 'AppendProperty':
					var str = style.a.a;
					var key = A2(
						$elm$core$Maybe$withDefault,
						'',
						$elm$core$List$head(
							A2($elm$core$String$split, ':', str)));
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 'ExtendSelector':
					var selector = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 'NestSnippet':
					var combinator = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 'WithPseudoElement':
					var pseudoElement = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 'WithMedia':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 'WithKeyframes':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
				default:
					if (!style.a.b) {
						return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
					} else {
						if (!style.a.b.b) {
							var _v1 = style.a;
							var only = _v1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _v2 = style.a;
							var first = _v2.a;
							var rest = _v2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var $rtfeldman$elm_css$Css$Internal$IncompatibleUnits = {$: 'IncompatibleUnits'};
var $elm$core$String$fromFloat = _String_fromNumber;
var $rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			absoluteLength: $rtfeldman$elm_css$Css$Structure$Compatible,
			calc: $rtfeldman$elm_css$Css$Structure$Compatible,
			flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible,
			fontSize: $rtfeldman$elm_css$Css$Structure$Compatible,
			length: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
			numericValue: numericValue,
			textIndent: $rtfeldman$elm_css$Css$Structure$Compatible,
			unitLabel: unitLabel,
			units: units,
			value: _Utils_ap(
				$elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var $rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$Internal$IncompatibleUnits, '', 0);
var $rtfeldman$elm_css$Css$alignItems = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'alignItems',
		'align-items',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Html$Styled$button = $rtfeldman$elm_css$Html$Styled$node('button');
var $rtfeldman$elm_css$Css$center = $rtfeldman$elm_css$Css$prop1('center');
var $rtfeldman$elm_css$Css$color = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'color', c.value);
};
var $rtfeldman$elm_css$Css$row = {flexDirection: $rtfeldman$elm_css$Css$Structure$Compatible, flexDirectionOrWrap: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'row'};
var $rtfeldman$elm_css$Css$column = _Utils_update(
	$rtfeldman$elm_css$Css$row,
	{value: 'column'});
var $rtfeldman$elm_css$Html$Styled$Attributes$id = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('id');
var $author$project$Main$dialog = F2(
	function (dialogId, content) {
		return A3(
			$rtfeldman$elm_css$Html$Styled$node,
			'dialog',
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$id(dialogId)
				]),
			content);
	});
var $rtfeldman$elm_css$Css$displayFlex = A2($rtfeldman$elm_css$Css$property, 'display', 'flex');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $rtfeldman$elm_css$Css$flexDirection = $rtfeldman$elm_css$Css$prop1('flex-direction');
var $rtfeldman$elm_css$Html$Styled$h2 = $rtfeldman$elm_css$Html$Styled$node('h2');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$node = $elm$virtual_dom$VirtualDom$nodeNS('http://www.w3.org/2000/svg');
var $author$project$Assets$Icons$bath = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm18.766-1.125c-0.96875 0.5-1.9805 0.875-3.0312 1.125-1.043 0.25781-2.1367 0.39062-3.2812 0.39062-3.3984 0-6.0898-0.94531-8.0781-2.8438-1.9922-1.9062-2.9844-4.4844-2.9844-7.7344 0-3.2578 0.99219-5.8359 2.9844-7.7344 1.9883-1.9062 4.6797-2.8594 8.0781-2.8594 1.1445 0 2.2383 0.13281 3.2812 0.39062 1.0508 0.25 2.0625 0.625 3.0312 1.125v4.2188c-0.98047-0.65625-1.9453-1.1406-2.8906-1.4531-0.94922-0.3125-1.9492-0.46875-3-0.46875-1.875 0-3.3516 0.60547-4.4219 1.8125-1.0742 1.1992-1.6094 2.8555-1.6094 4.9688 0 2.1055 0.53516 3.7617 1.6094 4.9688 1.0703 1.1992 2.5469 1.7969 4.4219 1.7969 1.0508 0 2.0508-0.14844 3-0.45312 0.94531-0.3125 1.9102-0.80078 2.8906-1.4688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm13.734-11.141c-0.4375-0.19531-0.87109-0.34375-1.2969-0.4375-0.41797-0.10156-0.83984-0.15625-1.2656-0.15625-1.2617 0-2.2305 0.40625-2.9062 1.2188-0.67969 0.80469-1.0156 1.9531-1.0156 3.4531v7.0625h-4.8906v-15.312h4.8906v2.5156c0.625-1 1.3438-1.7266 2.1562-2.1875 0.82031-0.46875 1.8008-0.70312 2.9375-0.70312 0.16406 0 0.34375 0.011719 0.53125 0.03125 0.19531 0.011719 0.47656 0.039062 0.84375 0.078125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.641-7.7031v1.4062h-11.453c0.125 1.1484 0.53906 2.0078 1.25 2.5781 0.70703 0.57422 1.7031 0.85938 2.9844 0.85938 1.0312 0 2.082-0.14844 3.1562-0.45312 1.082-0.3125 2.1914-0.77344 3.3281-1.3906v3.7656c-1.1562 0.4375-2.3125 0.76562-3.4688 0.98438-1.1562 0.22656-2.3125 0.34375-3.4688 0.34375-2.7734 0-4.9297-0.70312-6.4688-2.1094-1.5312-1.4062-2.2969-3.3789-2.2969-5.9219 0-2.5 0.75391-4.4609 2.2656-5.8906 1.5078-1.4375 3.582-2.1562 6.2188-2.1562 2.4062 0 4.332 0.73047 5.7812 2.1875 1.4453 1.4492 2.1719 3.3828 2.1719 5.7969zm-5.0312-1.625c0-0.92578-0.27344-1.6719-0.8125-2.2344-0.54297-0.57031-1.25-0.85938-2.125-0.85938-0.94922 0-1.7188 0.26562-2.3125 0.79688s-0.96484 1.2969-1.1094 2.2969z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.2188-6.8906c-1.0234 0-1.793 0.17188-2.3125 0.51562-0.51172 0.34375-0.76562 0.85547-0.76562 1.5312 0 0.625 0.20703 1.1172 0.625 1.4688 0.41406 0.34375 0.98828 0.51562 1.7188 0.51562 0.92578 0 1.7031-0.32812 2.3281-0.98438 0.63281-0.66406 0.95312-1.4922 0.95312-2.4844v-0.5625zm7.4688-1.8438v8.7344h-4.9219v-2.2656c-0.65625 0.92969-1.3984 1.6055-2.2188 2.0312-0.82422 0.41406-1.8242 0.625-3 0.625-1.5859 0-2.8711-0.45703-3.8594-1.375-0.99219-0.92578-1.4844-2.1289-1.4844-3.6094 0-1.7891 0.61328-3.1016 1.8438-3.9375 1.2383-0.84375 3.1797-1.2656 5.8281-1.2656h2.8906v-0.39062c0-0.76953-0.30859-1.332-0.92188-1.6875-0.61719-0.36328-1.5703-0.54688-2.8594-0.54688-1.0547 0-2.0312 0.10547-2.9375 0.3125-0.89844 0.21094-1.7305 0.52344-2.5 0.9375v-3.7344c1.0391-0.25 2.0859-0.44141 3.1406-0.57812 1.0625-0.13281 2.125-0.20312 3.1875-0.20312 2.7578 0 4.75 0.54688 5.9688 1.6406 1.2266 1.0859 1.8438 2.8555 1.8438 5.3125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm7.7031-19.656v4.3438h5.0469v3.5h-5.0469v6.5c0 0.71094 0.14062 1.1875 0.42188 1.4375s0.83594 0.375 1.6719 0.375h2.5156v3.5h-4.1875c-1.9375 0-3.3125-0.39844-4.125-1.2031-0.80469-0.8125-1.2031-2.1797-1.2031-4.1094v-6.5h-2.4219v-3.5h2.4219v-4.3438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.766-13.078v-8.2031h4.9219v21.281h-4.9219v-2.2188c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2969 1.8125-5.7969 1.207-1.5 2.7539-2.25 4.6406-2.25 1.0625 0 2 0.21484 2.8125 0.64062 0.82031 0.42969 1.5664 1.0859 2.2344 1.9688zm-3.2188 9.9219c1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm10.5-3.1562c1.0508 0 1.8516-0.37891 2.4062-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3555-1.1562-2.4062-1.1562-1.0547 0-1.8594 0.38672-2.4219 1.1562-0.55469 0.77344-0.82812 1.8828-0.82812 3.3281 0 1.4492 0.27344 2.5586 0.82812 3.3281 0.5625 0.77344 1.3672 1.1562 2.4219 1.1562zm-3.25-9.9219c0.67578-0.88281 1.4219-1.5391 2.2344-1.9688 0.82031-0.42578 1.7656-0.64062 2.8281-0.64062 1.8945 0 3.4453 0.75 4.6562 2.25 1.207 1.5 1.8125 3.4336 1.8125 5.7969 0 2.3555-0.60547 4.2812-1.8125 5.7812-1.2109 1.5-2.7617 2.25-4.6562 2.25-1.0625 0-2.0078-0.21094-2.8281-0.625-0.8125-0.42578-1.5586-1.0859-2.2344-1.9844v2.2188h-4.8906v-21.281h4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.34375-15.312h4.8906l4.125 10.391 3.5-10.391h4.8906l-6.4375 16.766c-0.64844 1.6953-1.4023 2.8828-2.2656 3.5625-0.86719 0.6875-2 1.0312-3.4062 1.0312h-2.8438v-3.2188h1.5312c0.83203 0 1.4375-0.13672 1.8125-0.40625 0.38281-0.26172 0.67969-0.73047 0.89062-1.4062l0.14062-0.42188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.953-3.7188h-8.2188l-1.3125 3.7188h-5.2812l7.5625-20.406h6.2656l7.5625 20.406h-5.2812zm-6.9062-3.7812h5.5781l-2.7812-8.125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'u'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.312h-4.8906zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1406c0-1.3203-0.03125-2.2344-0.09375-2.7344s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-15.312h4.8906v2.2344c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.6406-12.188c-1.0859 0-1.9141 0.39062-2.4844 1.1719-0.57422 0.78125-0.85938 1.9062-0.85938 3.375s0.28516 2.5938 0.85938 3.375c0.57031 0.77344 1.3984 1.1562 2.4844 1.1562 1.0625 0 1.875-0.38281 2.4375-1.1562 0.57031-0.78125 0.85938-1.9062 0.85938-3.375s-0.28906-2.5938-0.85938-3.375c-0.5625-0.78125-1.375-1.1719-2.4375-1.1719zm0-3.5c2.6328 0 4.6914 0.71484 6.1719 2.1406 1.4766 1.418 2.2188 3.3867 2.2188 5.9062 0 2.5117-0.74219 4.4805-2.2188 5.9062-1.4805 1.418-3.5391 2.125-6.1719 2.125-2.6484 0-4.7148-0.70703-6.2031-2.125-1.4922-1.4258-2.2344-3.3945-2.2344-5.9062 0-2.5195 0.74219-4.4883 2.2344-5.9062 1.4883-1.4258 3.5547-2.1406 6.2031-2.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 't'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.5469-12.125c-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406 1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562zm3.2188 9.9062c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2891 1.8125-5.7812 1.207-1.4883 2.7539-2.2344 4.6406-2.2344 1.0703 0 2.0156 0.21484 2.8281 0.64062 0.8125 0.41797 1.5508 1.0742 2.2188 1.9688v-2.2656h4.9219v21.141h-4.9219z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.1875-5.9688v-9.3438h4.9219v1.5312c0 0.83594-0.007813 1.875-0.015625 3.125-0.011719 1.25-0.015625 2.0859-0.015625 2.5 0 1.2422 0.03125 2.1328 0.09375 2.6719 0.070313 0.54297 0.17969 0.93359 0.32812 1.1719 0.20703 0.32422 0.47266 0.57422 0.79688 0.75 0.32031 0.16797 0.69141 0.25 1.1094 0.25 1.0195 0 1.8203-0.39062 2.4062-1.1719 0.58203-0.78125 0.875-1.8672 0.875-3.2656v-7.5625h4.8906v15.312h-4.8906v-2.2188c-0.74219 0.89844-1.5234 1.5586-2.3438 1.9844-0.82422 0.41406-1.7344 0.625-2.7344 0.625-1.7617 0-3.1055-0.53906-4.0312-1.625-0.92969-1.082-1.3906-2.6602-1.3906-4.7344z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.422-21.281v3.2188h-2.7031c-0.6875 0-1.1719 0.125-1.4531 0.375-0.27344 0.25-0.40625 0.6875-0.40625 1.3125v1.0625h4.1875v3.5h-4.1875v11.812h-4.8906v-11.812h-2.4375v-3.5h2.4375v-1.0625c0-1.6641 0.46094-2.8984 1.3906-3.7031 0.92578-0.80078 2.3672-1.2031 4.3281-1.2031z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm16.547-12.766c0.61328-0.94531 1.3477-1.6719 2.2031-2.1719 0.85156-0.5 1.7891-0.75 2.8125-0.75 1.7578 0 3.0977 0.54688 4.0156 1.6406 0.92578 1.0859 1.3906 2.6562 1.3906 4.7188v9.3281h-4.9219v-7.9844-0.35938c0.007813-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.082-0.16406-1.8633-0.48438-2.3438-0.3125-0.48828-0.82422-0.73438-1.5312-0.73438-0.92969 0-1.6484 0.38672-2.1562 1.1562-0.51172 0.76172-0.77344 1.8672-0.78125 3.3125v7.5156h-4.9219v-7.9844c0-1.6953-0.14844-2.7852-0.4375-3.2656-0.29297-0.48828-0.8125-0.73438-1.5625-0.73438-0.9375 0-1.6641 0.38672-2.1719 1.1562-0.51172 0.76172-0.76562 1.8594-0.76562 3.2969v7.5312h-4.9219v-15.312h4.9219v2.2344c0.60156-0.86328 1.2891-1.5156 2.0625-1.9531 0.78125-0.4375 1.6406-0.65625 2.5781-0.65625 1.0625 0 2 0.25781 2.8125 0.76562 0.8125 0.51172 1.4258 1.2305 1.8438 2.1562z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1094c0-1.3438-0.03125-2.2656-0.09375-2.7656s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-21.281h4.8906v8.2031c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h5.875l7.4219 14v-14h4.9844v20.406h-5.875l-7.4219-14v14h-4.9844z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h8.7344c2.5938 0 4.582 0.57812 5.9688 1.7344 1.3945 1.1484 2.0938 2.7891 2.0938 4.9219 0 2.1367-0.69922 3.7812-2.0938 4.9375-1.3867 1.1562-3.375 1.7344-5.9688 1.7344h-3.4844v7.0781h-5.25zm5.25 3.8125v5.7031h2.9219c1.0195 0 1.8047-0.25 2.3594-0.75 0.5625-0.5 0.84375-1.2031 0.84375-2.1094 0-0.91406-0.28125-1.6172-0.84375-2.1094-0.55469-0.48828-1.3398-0.73438-2.3594-0.73438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.031c0 2.0508-0.49609 3.6172-1.4844 4.7031-0.98047 1.082-2.4062 1.625-4.2812 1.625h-2.4219v-3.2188h0.85938c0.92578 0 1.5625-0.21094 1.9062-0.625 0.35156-0.41797 0.53125-1.2461 0.53125-2.4844zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.719-14.828v3.9844c-0.65625-0.45703-1.3242-0.79688-2-1.0156-0.66797-0.21875-1.3594-0.32812-2.0781-0.32812-1.3672 0-2.4336 0.40234-3.2031 1.2031-0.76172 0.79297-1.1406 1.9062-1.1406 3.3438 0 1.4297 0.37891 2.543 1.1406 3.3438 0.76953 0.79297 1.8359 1.1875 3.2031 1.1875 0.75781 0 1.4844-0.10938 2.1719-0.32812 0.6875-0.22656 1.3203-0.56641 1.9062-1.0156v4c-0.76172 0.28125-1.5391 0.48828-2.3281 0.625-0.78125 0.14453-1.5742 0.21875-2.375 0.21875-2.7617 0-4.9219-0.70703-6.4844-2.125-1.5547-1.4141-2.3281-3.3828-2.3281-5.9062 0-2.5312 0.77344-4.5039 2.3281-5.9219 1.5625-1.4141 3.7227-2.125 6.4844-2.125 0.80078 0 1.5938 0.074219 2.375 0.21875 0.78125 0.13672 1.5547 0.35156 2.3281 0.64062z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm316.96 207.2c3.9219-3.9219 3.9219-10.641 0-15.121-3.3594-3.3594-14.559-6.1602-20.719-7.8398-1.6797-0.55859-2.8008 1.1211-2.2383 2.2383 1.6797 5.6016 4.4805 17.359 7.8398 20.719 4.4766 3.9258 10.637 3.9258 15.117 0.003907z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm341.6 182.56c3.9219-3.9219 3.9219-10.641 0-15.121-3.3594-3.3594-14.559-6.1602-20.719-7.8398-1.6797-0.55859-2.8008 1.1211-2.2383 2.2383 1.6797 5.6016 4.4805 17.359 7.8398 20.719 4.4766 3.9258 11.195 3.9258 15.117 0.003906z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm343.84 137.2c1.6797 5.6016 4.4805 17.359 7.8398 20.719 3.9219 3.9219 10.641 3.9219 15.121 0 3.9219-3.9219 3.9219-10.641 0-15.121-3.3594-3.3594-14.559-6.1602-20.719-7.8398-1.6836-0.55859-2.8008 0.5625-2.2422 2.2422z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm391.44 132.72c3.9219-3.9219 3.9219-10.641 0-15.121-3.3594-3.3594-14.559-6.1602-20.719-7.8398-1.6797-0.55859-2.8008 1.1211-2.2383 2.2383 1.6797 5.6016 4.4805 17.359 7.8398 20.719 3.9141 4.4844 10.637 4.4844 15.117 0.003906z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm283.36 146.72c-1.6797-0.55859-2.8008 1.1211-2.2383 2.2383 1.6797 5.6016 4.4805 17.359 7.8398 20.719 3.9219 3.9219 10.641 3.9219 15.121 0 3.9219-3.9219 3.9219-10.641 0-15.121-3.3633-3.3555-15.121-6.1562-20.723-7.8359z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm328.72 144.48c3.9219-3.9219 3.9219-10.641 0-15.121-3.3594-3.3594-14.559-6.1602-20.719-7.8398-1.6797-0.55859-2.8008 1.1211-2.2383 2.2383 1.6797 5.6016 4.4805 17.359 7.8398 20.719 4.4766 4.4844 11.199 4.4844 15.117 0.003907z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm330.96 99.68c1.6797 5.6016 4.4805 17.359 7.8398 20.719 3.9219 3.9219 10.641 3.9219 15.121 0 3.9219-3.9219 3.9219-10.641 0-15.121-3.3594-3.3594-14.559-6.1602-20.719-7.8398-1.6836-0.55859-2.8047 0.5625-2.2422 2.2422z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm616 296.8c0-24.641-20.16-44.238-44.238-44.238l-382.48-0.003906v-174.16c0-11.762 9.5195-21.281 21.281-21.281 5.6016 0 11.199 2.2383 15.121 6.1602l20.16 20.16c-12.879 22.398-11.199 50.961 5.6016 71.121 1.6797 2.2383 5.0391 2.2383 6.7188 0l80.637-79.52c1.6797-1.6797 1.6797-5.0391 0-6.7188-20.16-17.359-48.719-19.039-71.121-5.6016l-20.16-20.16c-9.5195-9.5195-22.961-15.121-36.398-15.121-28.559 0-52.078 23.52-52.078 52.078v174.16h-30.238c-24.641 0-44.238 19.602-44.238 44.238 0 22.961 17.359 41.441 39.762 43.68l38.078 100.24c10.078 26.32 35.84 44.238 63.84 44.238h2.8008l-10.641 28c-2.8008 7.8398 1.1211 16.801 8.9609 19.602 1.6797 0.55859 3.9219 1.1211 5.6016 1.1211 6.1602 0 11.762-3.9219 14-9.5195l14.559-38.641h178.08l14.559 38.641c2.2383 6.1602 7.8398 9.5195 14 9.5195 1.6797 0 3.9219 0 5.6016-1.1211 7.8398-2.8008 11.762-11.762 8.9609-19.602l-10.641-28h2.8008c28 0 53.762-17.359 63.84-44.238l38.078-100.24c21.836-3.3555 39.195-21.832 39.195-44.793zm-106.4 133.28c-5.6016 14.559-19.602 24.641-35.281 24.641h-248.64c-15.68 0-29.68-9.5195-35.281-24.641l-33.602-89.039h386.96zm62.16-119.28h-443.52c-7.8398 0-14-6.1602-14-14 0-7.8398 6.1602-14 14-14h443.52c7.8398 0 14 6.1602 14 14 0.003907 7.8398-6.1562 14-13.996 14z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '90.550781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '104.359375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.347656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '142.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '155.628906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '174.617188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '204.410156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '224.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '252.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '274.121094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '294.164062'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '307.972656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#u')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '317.570312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '336.5625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '366.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '386.789062'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '406.027344'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#t')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '426.070312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '446.003906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '464.992187'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '82.183594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '95.992188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '115.226562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '154.152344'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '167.535156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '187.46875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '216.207031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '239.640625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '258.878906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '278.8125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '308.492188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '329.015625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '342.820312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '362.058594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '371.65625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '390.648438'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '407.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$breastfeeding = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'v'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.6562-0.21875c-0.1875 0.09375-0.38672 0.16797-0.59375 0.21875-0.19922 0.050781-0.40625 0.078125-0.625 0.078125-0.66797 0-1.1992-0.17969-1.5938-0.54688-0.38672-0.375-0.57812-0.87891-0.57812-1.5156 0-0.64453 0.19141-1.1484 0.57812-1.5156 0.39453-0.375 0.92578-0.5625 1.5938-0.5625 0.21875 0 0.42578 0.027344 0.625 0.078125 0.20703 0.054687 0.40625 0.125 0.59375 0.21875v0.82812c-0.1875-0.125-0.375-0.21875-0.5625-0.28125-0.17969-0.0625-0.37109-0.09375-0.57812-0.09375-0.36719 0-0.65625 0.12109-0.875 0.35938-0.21094 0.23047-0.3125 0.55469-0.3125 0.96875 0 0.40625 0.10156 0.73047 0.3125 0.96875 0.21875 0.23047 0.50781 0.34375 0.875 0.34375 0.20703 0 0.39844-0.023437 0.57812-0.078125 0.1875-0.0625 0.375-0.16016 0.5625-0.29688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.6875-2.1719c-0.085938-0.039063-0.16797-0.070313-0.25-0.09375-0.085938-0.019531-0.16797-0.03125-0.25-0.03125-0.25 0-0.44531 0.085937-0.57812 0.25-0.125 0.15625-0.1875 0.38281-0.1875 0.67188v1.375h-0.96875v-2.9844h0.96875v0.48438c0.11328-0.19531 0.25-0.33594 0.40625-0.42188 0.16406-0.09375 0.35938-0.14062 0.57812-0.14062h0.10938c0.039063 0 0.09375 0.007812 0.15625 0.015625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4375-1.5v0.26562h-2.2344c0.03125 0.23047 0.11328 0.40234 0.25 0.51562 0.13281 0.10547 0.32812 0.15625 0.57812 0.15625 0.20703 0 0.41406-0.023438 0.625-0.078125 0.20703-0.0625 0.42188-0.15625 0.64062-0.28125v0.73438c-0.21875 0.09375-0.44531 0.16406-0.67188 0.20312-0.23047 0.039062-0.45312 0.0625-0.67188 0.0625-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.47656 0.14453-0.85938 0.4375-1.1406 0.30078-0.28125 0.70703-0.42188 1.2188-0.42188 0.46875 0 0.84375 0.14062 1.125 0.42188s0.42188 0.66406 0.42188 1.1406zm-0.96875-0.32812c0-0.17578-0.058594-0.31641-0.17188-0.42188-0.10547-0.11328-0.24219-0.17188-0.40625-0.17188-0.1875 0-0.33984 0.054687-0.45312 0.15625-0.11719 0.10547-0.1875 0.25-0.21875 0.4375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.7969-1.3438c-0.19922 0-0.35156 0.039062-0.45312 0.10938-0.09375 0.0625-0.14062 0.16406-0.14062 0.29688 0 0.11719 0.035156 0.21094 0.10938 0.28125 0.082031 0.0625 0.19531 0.09375 0.34375 0.09375 0.17578 0 0.32812-0.0625 0.45312-0.1875s0.1875-0.28516 0.1875-0.48438v-0.10938zm1.4688-0.35938v1.7031h-0.96875v-0.4375c-0.125 0.17969-0.27344 0.30859-0.4375 0.39062-0.15625 0.082031-0.35156 0.125-0.57812 0.125-0.3125 0-0.57031-0.085938-0.76562-0.26562-0.1875-0.1875-0.28125-0.42188-0.28125-0.70312 0-0.35156 0.11719-0.61328 0.35938-0.78125 0.23828-0.16406 0.61719-0.25 1.1406-0.25h0.5625v-0.0625c0-0.15625-0.0625-0.26562-0.1875-0.32812-0.11719-0.070312-0.29688-0.10938-0.54688-0.10938-0.21094 0-0.40234 0.023437-0.57812 0.0625-0.17969 0.042969-0.33984 0.10156-0.48438 0.17188v-0.71875c0.19531-0.050781 0.39844-0.085938 0.60938-0.10938 0.20703-0.03125 0.41406-0.046875 0.625-0.046875 0.53906 0 0.92969 0.10938 1.1719 0.32812 0.23828 0.21094 0.35938 0.55469 0.35938 1.0312z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.5-3.8438v0.85938h0.98438v0.67188h-0.98438v1.2812c0 0.13672 0.023438 0.23047 0.078125 0.28125 0.0625 0.042969 0.17578 0.0625 0.34375 0.0625h0.48438v0.6875h-0.8125c-0.38672 0-0.65625-0.078125-0.8125-0.23438s-0.23438-0.42188-0.23438-0.79688v-1.2812h-0.46875v-0.67188h0.46875v-0.85938z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5-2.5469v-1.6094h0.95312v4.1562h-0.95312v-0.4375c-0.13672 0.17969-0.28125 0.30859-0.4375 0.39062-0.15625 0.082031-0.33984 0.125-0.54688 0.125-0.375 0-0.68359-0.14453-0.92188-0.4375-0.23047-0.28906-0.34375-0.67188-0.34375-1.1406 0-0.45703 0.11328-0.83203 0.34375-1.125 0.23828-0.28906 0.54688-0.4375 0.92188-0.4375 0.19531 0 0.375 0.042969 0.53125 0.125 0.16406 0.085938 0.31641 0.21484 0.45312 0.39062zm-0.64062 1.9375c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.0469-0.60938c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875zm-0.625-1.9375c0.125-0.17578 0.26562-0.30469 0.42188-0.39062 0.16406-0.082031 0.35156-0.125 0.5625-0.125 0.36328 0 0.66406 0.14844 0.90625 0.4375 0.23828 0.29297 0.35938 0.66797 0.35938 1.125 0 0.46875-0.12109 0.85156-0.35938 1.1406-0.24219 0.29297-0.54297 0.4375-0.90625 0.4375-0.21094 0-0.39844-0.042969-0.5625-0.125-0.15625-0.082031-0.29688-0.21094-0.42188-0.39062v0.4375h-0.96875v-4.1562h0.96875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.0625-2.9844h0.95312l0.8125 2.0156 0.6875-2.0156h0.95312l-1.2656 3.2656c-0.125 0.33203-0.27344 0.56641-0.4375 0.70312-0.16797 0.13281-0.39062 0.20312-0.67188 0.20312h-0.54688v-0.64062h0.29688c0.16406 0 0.28516-0.027344 0.35938-0.078125 0.070313-0.054688 0.12891-0.14062 0.17188-0.26562l0.03125-0.09375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.5-3.9844h2.7812v0.78125h-1.75v0.73438h1.6406v0.78125h-1.6406v0.90625h1.7969v0.78125h-2.8281z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.875-2.8906v0.76562c-0.125-0.082031-0.25781-0.14453-0.39062-0.1875-0.13672-0.039062-0.27344-0.0625-0.40625-0.0625-0.27344 0-0.48047 0.078125-0.625 0.23438-0.14844 0.15625-0.21875 0.37109-0.21875 0.64062 0 0.28125 0.070313 0.5 0.21875 0.65625 0.14453 0.15625 0.35156 0.23438 0.625 0.23438 0.14453 0 0.28516-0.019531 0.42188-0.0625 0.13281-0.039063 0.25781-0.10938 0.375-0.20312v0.78125c-0.14844 0.0625-0.29688 0.10156-0.45312 0.125-0.15625 0.03125-0.3125 0.046875-0.46875 0.046875-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.48828 0.14844-0.86719 0.45312-1.1406 0.30078-0.28125 0.72266-0.42188 1.2656-0.42188 0.15625 0 0.3125 0.015625 0.46875 0.046875 0.15625 0.023437 0.30469 0.0625 0.45312 0.125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.875-2.375c-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.27344 0.21875 0.48438 0.21875 0.20703 0 0.36719-0.070313 0.48438-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.11719-0.15625-0.27734-0.23438-0.48438-0.23438zm0-0.6875c0.51953 0 0.92188 0.14062 1.2031 0.42188 0.28906 0.27344 0.4375 0.65234 0.4375 1.1406 0 0.5-0.14844 0.89062-0.4375 1.1719-0.28125 0.27344-0.68359 0.40625-1.2031 0.40625-0.51172 0-0.91406-0.13281-1.2031-0.40625-0.29297-0.28125-0.4375-0.67188-0.4375-1.1719 0-0.48828 0.14453-0.86719 0.4375-1.1406 0.28906-0.28125 0.69141-0.42188 1.2031-0.42188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'u'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.4219-0.4375v1.5781h-0.96875v-4.125h0.96875v0.4375c0.125-0.17578 0.26562-0.30469 0.42188-0.39062 0.16406-0.082031 0.35156-0.125 0.5625-0.125 0.36328 0 0.66406 0.14844 0.90625 0.4375 0.23828 0.29297 0.35938 0.66797 0.35938 1.125 0 0.46875-0.12109 0.85156-0.35938 1.1406-0.24219 0.29297-0.54297 0.4375-0.90625 0.4375-0.21094 0-0.39844-0.042969-0.5625-0.125-0.15625-0.082031-0.29688-0.21094-0.42188-0.39062zm0.625-1.9375c-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875 0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 't'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.45312-2.9844h0.96875v2.9844h-0.96875zm0-1.1719h0.96875v0.78125h-0.96875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.078125-2.9844h0.95312l0.75 2.0625 0.75-2.0625h0.95312l-1.1719 2.9844h-1.0625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.4219-4.1562v0.625h-0.51562c-0.13672 0-0.23438 0.027344-0.29688 0.078125-0.054687 0.054687-0.078125 0.13672-0.078125 0.25v0.21875h0.82812v0.67188h-0.82812v2.3125h-0.95312v-2.3125h-0.46875v-0.67188h0.46875v-0.21875c0-0.32031 0.085937-0.5625 0.26562-0.71875 0.1875-0.15625 0.47266-0.23438 0.85938-0.23438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.2344-2.5c0.11328-0.17578 0.25391-0.3125 0.42188-0.40625 0.16406-0.10156 0.35156-0.15625 0.5625-0.15625 0.33203 0 0.58594 0.10938 0.76562 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625v1.8281h-0.96875v-1.5625c0.007813-0.019531 0.015625-0.039062 0.015625-0.0625v-0.10938c0-0.21875-0.03125-0.375-0.09375-0.46875s-0.16406-0.14062-0.29688-0.14062c-0.1875 0-0.33594 0.078125-0.4375 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-1.5625c0-0.33203-0.03125-0.54688-0.09375-0.64062-0.054688-0.09375-0.15234-0.14062-0.29688-0.14062-0.17969 0-0.32031 0.078125-0.42188 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.11328-0.17578 0.24219-0.30469 0.39062-0.39062 0.15625-0.082031 0.32812-0.125 0.51562-0.125 0.20703 0 0.39062 0.054688 0.54688 0.15625 0.15625 0.09375 0.27344 0.23047 0.35938 0.40625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-4.1562h0.96875v1.6094c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.5-3.9844h1.1562l1.4375 2.7344v-2.7344h0.98438v3.9844h-1.1562l-1.4375-2.7344v2.7344h-0.98438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.42188-1.1719v-1.8125h0.96875v0.29688 0.60938 0.48438c0 0.24219 0.003906 0.41797 0.015625 0.53125 0.007812 0.10547 0.03125 0.17969 0.0625 0.21875 0.039062 0.0625 0.09375 0.11719 0.15625 0.15625 0.0625 0.03125 0.13281 0.046875 0.21875 0.046875 0.19531 0 0.35156-0.078125 0.46875-0.23438 0.11328-0.15625 0.17188-0.36719 0.17188-0.64062v-1.4688h0.95312v2.9844h-0.95312v-0.4375c-0.14844 0.17969-0.30469 0.30859-0.46875 0.39062-0.15625 0.082031-0.33594 0.125-0.53125 0.125-0.34375 0-0.60938-0.10156-0.79688-0.3125-0.17969-0.21875-0.26562-0.53125-0.26562-0.9375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.5-3.9844h1.7031c0.50781 0 0.89844 0.11719 1.1719 0.34375 0.26953 0.21875 0.40625 0.53906 0.40625 0.95312 0 0.41797-0.13672 0.74219-0.40625 0.96875-0.27344 0.21875-0.66406 0.32812-1.1719 0.32812h-0.67188v1.3906h-1.0312zm1.0312 0.75v1.1094h0.5625c0.19531 0 0.34766-0.046875 0.45312-0.14062 0.11328-0.10156 0.17188-0.24219 0.17188-0.42188 0-0.17578-0.058594-0.3125-0.17188-0.40625-0.10547-0.09375-0.25781-0.14062-0.45312-0.14062z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.45312-2.9844h0.96875v2.9375c0 0.39453-0.10156 0.69531-0.29688 0.90625-0.1875 0.21875-0.46484 0.32812-0.82812 0.32812h-0.48438v-0.64062h0.17188c0.17578 0 0.29688-0.042969 0.35938-0.125 0.070312-0.074219 0.10938-0.23047 0.10938-0.46875zm0-1.1719h0.96875v0.78125h-0.96875z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm545.61 82.988c-32.789-28.117-76.613-39.578-120.4-31.449-71.836 13.375-90.125 68.941-94.52 102.47l-4.2461 5.8281c-3.7773 5.1836-5.0469 11.73-3.4766 17.945 1.0938 4.3203 3.457 8.1211 6.7461 10.973v14.496c-9.4609-15.398-27.188-32.25-60.488-45.047-41.242-15.844-64.727-35.434-69.816-58.254-6.0078-26.887 16.293-50.488 16.508-50.727 3.2578-3.3945 3.1641-8.7852-0.21875-12.055-3.375-3.2578-8.7539-3.1836-12.035 0.1875-1.1758 1.2188-28.844 30.238-20.945 66.141 6.3516 28.812 33.395 52.57 80.383 70.629 42.605 16.367 55.145 39.168 58.691 53.559-32.688-14.012-76.172-7.0703-108.43 1.9688-2.3945-8.9844-7.6523-21.449-19.145-27.383-10.512-5.4336-23.16-3.9336-37.535 4.3906-35.695 20.684-44.668 64-46.875 81.664-1.2383 9.9609 1.4766 19.984 7.4648 27.48 4.5078 5.6641 12.918 12.555 27.148 12.555 9.1719 0 20.766-2.875 35.289-10.762 6.9414-3.7812 13.457-4.1016 20.043-1.125-20.094 23.977-39.57 57.656-46.109 102.12-6.9844 47.57 17.238 82.715 68.215 98.934 16.02 5.1211 33.133 7.6836 50.664 7.6836 11.48 0 23.152-1.1055 34.789-3.332 123.06-23.547 191.1-79.426 226.49-122.17 23.691-28.562 34.02-65.977 28.375-102.59l-3.1641-20.684 19.715-45.355c6.6016-15.188 10.449-30.562 11.449-45.73 2.625-39.711-12.801-75.117-44.574-102.37zm27.547 101.25c-0.875 13.199-4.2461 26.68-10.078 40.047l-20.695 47.613c-0.625 1.4766-0.85156 3.1016-0.60547 4.6953l3.5391 23.129c4.9141 31.812-4.0586 64.289-24.629 89.125-33.621 40.578-98.496 93.688-216.58 116.3-26.629 5.0586-53.254 3.7266-77.07-3.8516-43.293-13.781-62.301-40.766-56.516-80.195 13.625-92.688 90.969-135.71 91.75-136.14 4.1328-2.25 5.6719-7.4219 3.4336-11.555-2.25-4.1328-7.4336-5.6836-11.543-3.4453-1.6602 0.89844-21.188 11.805-42.77 33.793-12.797-7.7266-26.398-8.4375-39.82-1.1367-13.68 7.4531-31.895 13.949-40.961 2.582-3.1328-3.9453-4.5508-9.3281-3.8711-14.762 1.8828-15.137 9.4219-52.16 38.504-69.004 9.0039-5.2148 16.137-6.5586 21.133-4.0078 5.7422 2.9414 8.9336 10.969 10.562 17.246-15.523 5.1719-26.148 9.8438-27.508 10.453-4.2891 1.9258-6.2031 6.9766-4.2773 11.262 1.4141 3.1641 4.5273 5.0391 7.7852 5.0391 1.1641 0 2.3516-0.23828 3.4883-0.75 0.94922-0.4375 89.414-39.484 139.36-17.172-27.414 22.352-31.215 46.539-28.812 64.129 2.5703 18.758 13.719 36.246 30.574 47.988 58.68 40.891 134.59 16.258 137.79 15.219 4.4531-1.5 6.8711-6.3281 5.3906-10.805-1.5195-4.4531-6.3711-6.8906-10.805-5.3906-0.66797 0.25-70.91 23.047-122.64-13.012-12.949-9.0352-21.484-22.277-23.41-36.309-2.8359-20.719 7.6758-39.059 31-54.652 7.0742 12.578 22.754 34.504 49.297 40.891 4.8711 1.1758 9.8672 1.7578 14.926 1.7578 21.242 0 44.188-10.523 68.344-30.938 9.3477-1.0391 24.66-7.1055 36.836-33.363 6.9336-14.98 3.8516-25.16 0.042969-31.062-11.449-17.727-42.555-17.945-45.824-17.914-4.707 0.042969-8.4922 3.9023-8.4531 8.6094 0.0625 4.6836 3.8711 8.4414 8.5352 8.4414h0.082031c7.3906 0.50781 26.273 2.2812 31.332 10.117 2.1445 3.3398 1.75 8.2656-1.207 14.625-6.8125 14.707-15.598 23.301-24.129 23.695-0.078125-0.003906-0.15625 0.03125-0.23438 0.03125-6.1523 0.70703-14.117-5.2344-19.508-15.031-2.2891-4.1445-7.4727-5.6328-11.598-3.3633-4.1211 2.2812-5.6211 7.4648-3.3516 11.586 4.543 8.2539 10.312 14.367 16.703 18.426-21.625 15.852-41.27 21.922-58.402 17.832-25.211-6.0039-38.691-32.277-41.512-38.387v-52.387c0-3.2891-1.8828-6.2773-4.8516-7.6914-1.6445-0.78906-2.2188-2.1875-2.4062-2.9375-0.19922-0.76172-0.35547-2.25 0.71875-3.7266l5.5469-7.6211c0.86328-1.1875 1.4062-2.5703 1.582-4.0273 4.0586-34.902 21.402-78.844 80.977-89.938 37.973-7.0977 77.719 3.2383 106.16 27.637 27.949 23.953 40.961 53.66 38.672 88.305z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#v')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '74.011719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '76.710938'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '80.417969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '84.109375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '86.722656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '90.433594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '96.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '100.167969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '105.636719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '109.371094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '112.613281'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '116.371094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '120.261719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.503906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '127.214844'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#u')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '131.128906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '133.742188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#t')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '135.617188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '139.183594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '72.378906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '75.078125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '78.832031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '86.4375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '89.050781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '92.941406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '98.554688'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '103.132812'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '106.890625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '110.785156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '116.582031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '120.589844'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.285156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '127.042969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '128.917969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '132.625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '135.867188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$cord = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 't'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm18.766-1.125c-0.96875 0.5-1.9805 0.875-3.0312 1.125-1.043 0.25781-2.1367 0.39062-3.2812 0.39062-3.3984 0-6.0898-0.94531-8.0781-2.8438-1.9922-1.9062-2.9844-4.4844-2.9844-7.7344 0-3.2578 0.99219-5.8359 2.9844-7.7344 1.9883-1.9062 4.6797-2.8594 8.0781-2.8594 1.1445 0 2.2383 0.13281 3.2812 0.39062 1.0508 0.25 2.0625 0.625 3.0312 1.125v4.2188c-0.98047-0.65625-1.9453-1.1406-2.8906-1.4531-0.94922-0.3125-1.9492-0.46875-3-0.46875-1.875 0-3.3516 0.60547-4.4219 1.8125-1.0742 1.1992-1.6094 2.8555-1.6094 4.9688 0 2.1055 0.53516 3.7617 1.6094 4.9688 1.0703 1.1992 2.5469 1.7969 4.4219 1.7969 1.0508 0 2.0508-0.14844 3-0.45312 0.94531-0.3125 1.9102-0.80078 2.8906-1.4688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm13.734-11.141c-0.4375-0.19531-0.87109-0.34375-1.2969-0.4375-0.41797-0.10156-0.83984-0.15625-1.2656-0.15625-1.2617 0-2.2305 0.40625-2.9062 1.2188-0.67969 0.80469-1.0156 1.9531-1.0156 3.4531v7.0625h-4.8906v-15.312h4.8906v2.5156c0.625-1 1.3438-1.7266 2.1562-2.1875 0.82031-0.46875 1.8008-0.70312 2.9375-0.70312 0.16406 0 0.34375 0.011719 0.53125 0.03125 0.19531 0.011719 0.47656 0.039062 0.84375 0.078125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.641-7.7031v1.4062h-11.453c0.125 1.1484 0.53906 2.0078 1.25 2.5781 0.70703 0.57422 1.7031 0.85938 2.9844 0.85938 1.0312 0 2.082-0.14844 3.1562-0.45312 1.082-0.3125 2.1914-0.77344 3.3281-1.3906v3.7656c-1.1562 0.4375-2.3125 0.76562-3.4688 0.98438-1.1562 0.22656-2.3125 0.34375-3.4688 0.34375-2.7734 0-4.9297-0.70312-6.4688-2.1094-1.5312-1.4062-2.2969-3.3789-2.2969-5.9219 0-2.5 0.75391-4.4609 2.2656-5.8906 1.5078-1.4375 3.582-2.1562 6.2188-2.1562 2.4062 0 4.332 0.73047 5.7812 2.1875 1.4453 1.4492 2.1719 3.3828 2.1719 5.7969zm-5.0312-1.625c0-0.92578-0.27344-1.6719-0.8125-2.2344-0.54297-0.57031-1.25-0.85938-2.125-0.85938-0.94922 0-1.7188 0.26562-2.3125 0.79688s-0.96484 1.2969-1.1094 2.2969z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.2188-6.8906c-1.0234 0-1.793 0.17188-2.3125 0.51562-0.51172 0.34375-0.76562 0.85547-0.76562 1.5312 0 0.625 0.20703 1.1172 0.625 1.4688 0.41406 0.34375 0.98828 0.51562 1.7188 0.51562 0.92578 0 1.7031-0.32812 2.3281-0.98438 0.63281-0.66406 0.95312-1.4922 0.95312-2.4844v-0.5625zm7.4688-1.8438v8.7344h-4.9219v-2.2656c-0.65625 0.92969-1.3984 1.6055-2.2188 2.0312-0.82422 0.41406-1.8242 0.625-3 0.625-1.5859 0-2.8711-0.45703-3.8594-1.375-0.99219-0.92578-1.4844-2.1289-1.4844-3.6094 0-1.7891 0.61328-3.1016 1.8438-3.9375 1.2383-0.84375 3.1797-1.2656 5.8281-1.2656h2.8906v-0.39062c0-0.76953-0.30859-1.332-0.92188-1.6875-0.61719-0.36328-1.5703-0.54688-2.8594-0.54688-1.0547 0-2.0312 0.10547-2.9375 0.3125-0.89844 0.21094-1.7305 0.52344-2.5 0.9375v-3.7344c1.0391-0.25 2.0859-0.44141 3.1406-0.57812 1.0625-0.13281 2.125-0.20312 3.1875-0.20312 2.7578 0 4.75 0.54688 5.9688 1.6406 1.2266 1.0859 1.8438 2.8555 1.8438 5.3125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm7.7031-19.656v4.3438h5.0469v3.5h-5.0469v6.5c0 0.71094 0.14062 1.1875 0.42188 1.4375s0.83594 0.375 1.6719 0.375h2.5156v3.5h-4.1875c-1.9375 0-3.3125-0.39844-4.125-1.2031-0.80469-0.8125-1.2031-2.1797-1.2031-4.1094v-6.5h-2.4219v-3.5h2.4219v-4.3438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.766-13.078v-8.2031h4.9219v21.281h-4.9219v-2.2188c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2969 1.8125-5.7969 1.207-1.5 2.7539-2.25 4.6406-2.25 1.0625 0 2 0.21484 2.8125 0.64062 0.82031 0.42969 1.5664 1.0859 2.2344 1.9688zm-3.2188 9.9219c1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm10.5-3.1562c1.0508 0 1.8516-0.37891 2.4062-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3555-1.1562-2.4062-1.1562-1.0547 0-1.8594 0.38672-2.4219 1.1562-0.55469 0.77344-0.82812 1.8828-0.82812 3.3281 0 1.4492 0.27344 2.5586 0.82812 3.3281 0.5625 0.77344 1.3672 1.1562 2.4219 1.1562zm-3.25-9.9219c0.67578-0.88281 1.4219-1.5391 2.2344-1.9688 0.82031-0.42578 1.7656-0.64062 2.8281-0.64062 1.8945 0 3.4453 0.75 4.6562 2.25 1.207 1.5 1.8125 3.4336 1.8125 5.7969 0 2.3555-0.60547 4.2812-1.8125 5.7812-1.2109 1.5-2.7617 2.25-4.6562 2.25-1.0625 0-2.0078-0.21094-2.8281-0.625-0.8125-0.42578-1.5586-1.0859-2.2344-1.9844v2.2188h-4.8906v-21.281h4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.34375-15.312h4.8906l4.125 10.391 3.5-10.391h4.8906l-6.4375 16.766c-0.64844 1.6953-1.4023 2.8828-2.2656 3.5625-0.86719 0.6875-2 1.0312-3.4062 1.0312h-2.8438v-3.2188h1.5312c0.83203 0 1.4375-0.13672 1.8125-0.40625 0.38281-0.26172 0.67969-0.73047 0.89062-1.4062l0.14062-0.42188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h8.7344c2.5938 0 4.582 0.57812 5.9688 1.7344 1.3945 1.1484 2.0938 2.7891 2.0938 4.9219 0 2.1367-0.69922 3.7812-2.0938 4.9375-1.3867 1.1562-3.375 1.7344-5.9688 1.7344h-3.4844v7.0781h-5.25zm5.25 3.8125v5.7031h2.9219c1.0195 0 1.8047-0.25 2.3594-0.75 0.5625-0.5 0.84375-1.2031 0.84375-2.1094 0-0.91406-0.28125-1.6172-0.84375-2.1094-0.55469-0.48828-1.3398-0.73438-2.3594-0.73438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.312h-4.8906zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-21.281h4.8906v11.594l5.625-5.625h5.6875l-7.4688 7.0312 8.0625 8.2812h-5.9375l-5.9688-6.3906v6.3906h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.719-14.828v3.9844c-0.65625-0.45703-1.3242-0.79688-2-1.0156-0.66797-0.21875-1.3594-0.32812-2.0781-0.32812-1.3672 0-2.4336 0.40234-3.2031 1.2031-0.76172 0.79297-1.1406 1.9062-1.1406 3.3438 0 1.4297 0.37891 2.543 1.1406 3.3438 0.76953 0.79297 1.8359 1.1875 3.2031 1.1875 0.75781 0 1.4844-0.10938 2.1719-0.32812 0.6875-0.22656 1.3203-0.56641 1.9062-1.0156v4c-0.76172 0.28125-1.5391 0.48828-2.3281 0.625-0.78125 0.14453-1.5742 0.21875-2.375 0.21875-2.7617 0-4.9219-0.70703-6.4844-2.125-1.5547-1.4141-2.3281-3.3828-2.3281-5.9062 0-2.5312 0.77344-4.5039 2.3281-5.9219 1.5625-1.4141 3.7227-2.125 6.4844-2.125 0.80078 0 1.5938 0.074219 2.375 0.21875 0.78125 0.13672 1.5547 0.35156 2.3281 0.64062z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.1875-5.9688v-9.3438h4.9219v1.5312c0 0.83594-0.007813 1.875-0.015625 3.125-0.011719 1.25-0.015625 2.0859-0.015625 2.5 0 1.2422 0.03125 2.1328 0.09375 2.6719 0.070313 0.54297 0.17969 0.93359 0.32812 1.1719 0.20703 0.32422 0.47266 0.57422 0.79688 0.75 0.32031 0.16797 0.69141 0.25 1.1094 0.25 1.0195 0 1.8203-0.39062 2.4062-1.1719 0.58203-0.78125 0.875-1.8672 0.875-3.2656v-7.5625h4.8906v15.312h-4.8906v-2.2188c-0.74219 0.89844-1.5234 1.5586-2.3438 1.9844-0.82422 0.41406-1.7344 0.625-2.7344 0.625-1.7617 0-3.1055-0.53906-4.0312-1.625-0.92969-1.082-1.3906-2.6602-1.3906-4.7344z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.422-21.281v3.2188h-2.7031c-0.6875 0-1.1719 0.125-1.4531 0.375-0.27344 0.25-0.40625 0.6875-0.40625 1.3125v1.0625h4.1875v3.5h-4.1875v11.812h-4.8906v-11.812h-2.4375v-3.5h2.4375v-1.0625c0-1.6641 0.46094-2.8984 1.3906-3.7031 0.92578-0.80078 2.3672-1.2031 4.3281-1.2031z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.6406-12.188c-1.0859 0-1.9141 0.39062-2.4844 1.1719-0.57422 0.78125-0.85938 1.9062-0.85938 3.375s0.28516 2.5938 0.85938 3.375c0.57031 0.77344 1.3984 1.1562 2.4844 1.1562 1.0625 0 1.875-0.38281 2.4375-1.1562 0.57031-0.78125 0.85938-1.9062 0.85938-3.375s-0.28906-2.5938-0.85938-3.375c-0.5625-0.78125-1.375-1.1719-2.4375-1.1719zm0-3.5c2.6328 0 4.6914 0.71484 6.1719 2.1406 1.4766 1.418 2.2188 3.3867 2.2188 5.9062 0 2.5117-0.74219 4.4805-2.2188 5.9062-1.4805 1.418-3.5391 2.125-6.1719 2.125-2.6484 0-4.7148-0.70703-6.2031-2.125-1.4922-1.4258-2.2344-3.3945-2.2344-5.9062 0-2.5195 0.74219-4.4883 2.2344-5.9062 1.4883-1.4258 3.5547-2.1406 6.2031-2.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm16.547-12.766c0.61328-0.94531 1.3477-1.6719 2.2031-2.1719 0.85156-0.5 1.7891-0.75 2.8125-0.75 1.7578 0 3.0977 0.54688 4.0156 1.6406 0.92578 1.0859 1.3906 2.6562 1.3906 4.7188v9.3281h-4.9219v-7.9844-0.35938c0.007813-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.082-0.16406-1.8633-0.48438-2.3438-0.3125-0.48828-0.82422-0.73438-1.5312-0.73438-0.92969 0-1.6484 0.38672-2.1562 1.1562-0.51172 0.76172-0.77344 1.8672-0.78125 3.3125v7.5156h-4.9219v-7.9844c0-1.6953-0.14844-2.7852-0.4375-3.2656-0.29297-0.48828-0.8125-0.73438-1.5625-0.73438-0.9375 0-1.6641 0.38672-2.1719 1.1562-0.51172 0.76172-0.76562 1.8594-0.76562 3.2969v7.5312h-4.9219v-15.312h4.9219v2.2344c0.60156-0.86328 1.2891-1.5156 2.0625-1.9531 0.78125-0.4375 1.6406-0.65625 2.5781-0.65625 1.0625 0 2 0.25781 2.8125 0.76562 0.8125 0.51172 1.4258 1.2305 1.8438 2.1562z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1094c0-1.3438-0.03125-2.2656-0.09375-2.7656s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-21.281h4.8906v8.2031c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h5.875l7.4219 14v-14h4.9844v20.406h-5.875l-7.4219-14v14h-4.9844z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1406c0-1.3203-0.03125-2.2344-0.09375-2.7344s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-15.312h4.8906v2.2344c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.031c0 2.0508-0.49609 3.6172-1.4844 4.7031-0.98047 1.082-2.4062 1.625-4.2812 1.625h-2.4219v-3.2188h0.85938c0.92578 0 1.5625-0.21094 1.9062-0.625 0.35156-0.41797 0.53125-1.2461 0.53125-2.4844zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm566.46 270.62c-0.69531 0-1.3984 0.0625-2.1094 0.22266-10.941 2.5039-24.238 1.3594-36.41-3.1367-10.781-4.043-20.922-9.9922-30.973-18.168-18.715-15.328-32.363-32.828-43.34-46.906-6.3281-8.0938-12.699-15.965-19.57-23.07 1.668-8.3203 3.1211-16.867 4.3555-25.672 12.488 7.168 24.992 15.746 37.84 25.973 12.902 10.207 23.906 21.102 34.539 31.625 3.5273 3.4883 6.9453 6.875 10.77 10.539 6.6797 6.2812 12.992 12.227 19.27 16.613 6.5 4.9844 13.082 8.6953 22.004 12.422 1.1875 0.49219 2.418 0.72266 3.6289 0.72266 3.6797-0.003906 7.1719-2.1797 8.6797-5.7891 2.0039-4.793-0.26172-10.305-5.0586-12.305-7.4414-3.1094-12.602-6.0039-18.129-10.227-5.4883-3.8398-11.324-9.3281-17.848-15.477-3.2695-3.1367-6.6133-6.4531-10.074-9.8711-10.488-10.387-22.383-22.16-36.086-32.996-15.914-12.68-31.438-23.031-47.09-31.406 2.1914-21.59 3.2539-44.781 3.2539-70.152 0-4.418-3.0117-8.1875-7.3398-9.2305-4.2344-0.93359-8.7539 1.3281-10.539 5.1758l-27.027 57.23c-16.598-4.6016-33.215-6.7266-49.004-6.1641-14.855 0.39062-30.105 3.1211-44.773 7.7852l-26.863-58.703c-1.8438-4.0273-6.2539-6.1836-10.562-5.2852-4.3242 0.94531-7.4102 4.7695-7.4102 9.1992 0 24.625 0.60547 49.672 2.8281 74.664-17.023 10.832-31.289 23.633-44.477 36.031-3.8398 3.5859-7.6055 7.168-11.316 10.695-11.473 10.91-22.309 21.223-33.129 29.578-10.543 7.9844-20.273 13.25-29.727 16.082-12.344 3.7109-20.629 14.492-20.629 26.836v3.4102c0 8.1094 3.5391 15.793 9.6992 21.055 6.2383 5.3359 14.527 7.6836 22.625 6.3828 6.1602-0.96484 12.426-2.4688 18.613-4.4688 14.449-4.6602 26.609-11.93 35.648-17.773 18.375-12.086 33.125-25.602 47.398-38.68l9.1797-8.3203c2.8516-2.5469 5.6562-5.0508 8.4453-7.5078 6.6367 25.137 16.09 49.695 29.484 73.141 0.24219 0.42188 0.51562 0.82422 0.82422 1.2148l8.3398 10.426-46.43 98.324c-22.5 6.4336-45.012 30.543-45.012 59.473 0 31.438 18.469 51.762 47.059 51.762 25.945 0 47.051-27.441 47.051-61.176 0-3.3867-0.003906-8.125-0.51953-13.371l33.98-81.16 33.156 79.207c-0.72656 6.0156-0.73828 11.512-0.73828 15.32 0 33.73 21.113 61.176 47.059 61.176 28.59 0 47.059-20.316 47.059-51.762 0-28.422-21.727-52.191-43.824-59.121l-20.66-42.527-25.789-56.359 8.2109-10.266 0.84375-1.1328c0.37891-0.75781 0.75781-1.418 1.1328-2.0703 2.543-4.5195 0.94141-10.266-3.5742-12.891-0.050782-0.027344-0.11328-0.039063-0.16406-0.066407-4.4062-2.2344-10.219-0.63672-12.641 3.7344-0.19141 0.28516-0.375 0.66016-0.56641 0.93359l-2.0391 2.5469-6.5781 8.2305-6.5781 8.2383-14.332 17.93-6.0273 7.5391-1.9023 2.3867-2.8438 6.7383-32.457 76.867c-4.1055-5.1445-9.9062-9.1914-18.172-10.941l38.387-81.234 4.4727-9.4688 4.4727-9.4766 14.508-30.699 10.516-22.258 32.016-67.754 4.0312-8.5273 4.0156-8.4961 7.668-16.223 4.0312-8.5352 4.0195-8.5195 6.832-14.453c-0.35156 5.707-0.80469 11.262-1.3008 16.75-0.29688 3.2891-0.59375 6.5742-0.94531 9.793-0.35938 3.3281-0.77344 6.5781-1.1875 9.832-0.90234 7.0156-1.9375 13.848-3.0977 20.539-0.60547 3.4883-1.2383 6.9375-1.9141 10.336-0.69531 3.5117-1.4297 6.9961-2.1992 10.422-1.5469 6.8438-3.2188 13.551-5.0742 20.098-1.3984 4.957 1.3789 10.078 6.3008 11.543 0.035156 0.011719 0.066406 0.035156 0.10156 0.039063 4.8945 1.4062 10.254-1.5977 11.664-6.4062 0.86719-3.0391 1.6914-6.1211 2.4922-9.2188 3.332 3.9414 6.6094 8.043 9.8789 12.219 11.535 14.797 25.898 33.227 46.266 49.895 11.688 9.5078 23.555 16.453 36.309 21.23 10.121 3.7461 20.637 5.6523 30.738 5.6523 5.6602 0 11.195-0.60547 16.453-1.8086 5.0664-1.1641 8.2266-6.2109 7.0664-11.277-0.99219-4.3438-4.8594-7.2695-9.1641-7.2695zm-183.05-120.43c-9.8828-1.9922-20.484-2.4766-31.516-1.3555-10.355 0.97266-19.98 3.5938-29.141 7.375-2.8945 1.1914-5.7461 2.5039-8.5508 3.9258-2.793 1.418-5.5625 2.9102-8.2773 4.5312-6.2891 3.7344-12.387 7.9727-18.395 12.555-2.8164 2.1445-5.6094 4.3672-8.3945 6.6484-2.75 2.2578-5.4922 4.5547-8.2266 6.9102-5.3711 4.625-10.73 9.4062-16.145 14.246l-9.3516 8.4727c-13.719 12.57-27.914 25.574-44.961 36.793-8.0117 5.1875-18.793 11.641-31.141 15.625-5.2656 1.7031-10.566 2.9727-15.758 3.7852-2.6992 0.44922-5.4219-0.33984-7.4648-2.082-2.0117-1.7188-3.1133-4.1172-3.1133-6.7578v-3.4102c0-3.9688 2.9023-7.5039 7.2188-8.8047 11.641-3.4961 23.32-9.7422 35.758-19.164 11.652-9 22.832-19.633 34.664-30.891 3.6719-3.4961 7.3984-7.0352 11.211-10.605 10.387-9.7539 21.438-19.75 33.914-28.621 2.8398-2.0234 5.75-3.9766 8.7539-5.8594 2.8906-1.8086 5.8398-3.5664 8.8984-5.2266 0.34766-0.18359 0.67188-0.39062 1.0195-0.57812 3.6445-2.0156 7.4219-3.8125 11.246-5.5234 2.8711-1.2773 5.7734-2.457 8.7266-3.5547 2.9609-1.0977 5.9531-2.1055 8.9727-3.0117 12.324-3.7188 25.043-5.8984 37.48-6.2266 12.945-0.48828 26.562 1.1211 40.242 4.6328zm-62.188 124.53c-13.855-24.406-23.168-50.289-29.438-76.887 7.3242-5.9805 14.598-11.395 22.023-15.949l26.891 58.773-17.348 36.73zm9.3516-101.42c7.3867-2.9727 15.035-4.9727 23.141-5.7383 7.4531-0.75 14.582-0.59766 21.332 0.33984l-23.84 50.484zm-49.078-45.266c-0.48047-6.4336-0.875-12.867-1.1602-19.305l7.4766 16.336c-2.1328 0.95312-4.2383 1.9414-6.3164 2.9688zm-11.484 359.03c-17.949 0-28.234-12-28.234-32.938 0-19.992 15.629-35.863 29.41-40.758 2.8711-1.0195 5.6797-1.5977 8.2305-1.5977 0.80469 0 1.5898 0.023437 2.3672 0.066406 7.75 0.42188 14.094 3.5898 15.91 21.32 0.33984 3.332 0.54297 7.1133 0.54297 11.555 0 1.1211-0.054688 2.2227-0.11328 3.3203-1.1719 21.477-13.559 39.031-28.113 39.031zm125.59-126.46 16.105 33.164c-8.1992 1.5742-14.066 5.3203-18.258 10.207l-31.926-76.266 12.098-15.125 21.887 47.828c0.027344 0.0625 0.058594 0.13281 0.09375 0.19141zm34.402 126.46c-14.438 0-26.75-17.266-28.102-38.488-0.078125-1.2773-0.13281-2.5586-0.13281-3.8594 0-3.7109 0.13281-7 0.375-9.9297 1.6523-20.07 8.6914-22.773 17.16-22.988 0.42578-0.011719 0.85547-0.023438 1.2891-0.023438 2.8047 0 5.9023 0.65625 9.0703 1.875 13.57 5.2344 28.578 20.887 28.578 40.473-0.003907 20.938-10.293 32.941-28.238 32.941zm-21.359-251.66c4.793 1.9766 7.1523 7.5273 5.1758 12.324-1.4102 3.4844-4.8945 5.8359-8.6562 5.8359-1.3164 0-2.4453-0.27344-3.5781-0.75781-0.0625-0.023438-0.11328-0.0625-0.17188-0.089844-2.2617-0.95703-3.9922-2.6992-5.0078-4.9961-0.94141-2.25-0.94141-4.793 0-7.1523 1.8633-4.6602 7.4102-7.0859 12.086-5.2188 0.046875 0.03125 0.10156 0.039063 0.15234 0.054688z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#t')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '90.550781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '104.359375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.347656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '142.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '155.628906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '174.617188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '204.410156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '224.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '252.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '272.972656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '282.570312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '301.191406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '329.929688'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '350.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '360.046875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '376.648438'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '390.03125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '409.964844'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '423.773438'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '82.183594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '95.992188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '115.226562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '154.152344'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '167.535156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '187.46875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '216.207031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '239.640625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '258.878906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '278.8125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '308.492188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '329.015625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '342.820312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '362.058594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '371.65625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '390.648438'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '407.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$cosleep = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm18.766-1.125c-0.96875 0.5-1.9805 0.875-3.0312 1.125-1.043 0.25781-2.1367 0.39062-3.2812 0.39062-3.3984 0-6.0898-0.94531-8.0781-2.8438-1.9922-1.9062-2.9844-4.4844-2.9844-7.7344 0-3.2578 0.99219-5.8359 2.9844-7.7344 1.9883-1.9062 4.6797-2.8594 8.0781-2.8594 1.1445 0 2.2383 0.13281 3.2812 0.39062 1.0508 0.25 2.0625 0.625 3.0312 1.125v4.2188c-0.98047-0.65625-1.9453-1.1406-2.8906-1.4531-0.94922-0.3125-1.9492-0.46875-3-0.46875-1.875 0-3.3516 0.60547-4.4219 1.8125-1.0742 1.1992-1.6094 2.8555-1.6094 4.9688 0 2.1055 0.53516 3.7617 1.6094 4.9688 1.0703 1.1992 2.5469 1.7969 4.4219 1.7969 1.0508 0 2.0508-0.14844 3-0.45312 0.94531-0.3125 1.9102-0.80078 2.8906-1.4688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm13.734-11.141c-0.4375-0.19531-0.87109-0.34375-1.2969-0.4375-0.41797-0.10156-0.83984-0.15625-1.2656-0.15625-1.2617 0-2.2305 0.40625-2.9062 1.2188-0.67969 0.80469-1.0156 1.9531-1.0156 3.4531v7.0625h-4.8906v-15.312h4.8906v2.5156c0.625-1 1.3438-1.7266 2.1562-2.1875 0.82031-0.46875 1.8008-0.70312 2.9375-0.70312 0.16406 0 0.34375 0.011719 0.53125 0.03125 0.19531 0.011719 0.47656 0.039062 0.84375 0.078125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.641-7.7031v1.4062h-11.453c0.125 1.1484 0.53906 2.0078 1.25 2.5781 0.70703 0.57422 1.7031 0.85938 2.9844 0.85938 1.0312 0 2.082-0.14844 3.1562-0.45312 1.082-0.3125 2.1914-0.77344 3.3281-1.3906v3.7656c-1.1562 0.4375-2.3125 0.76562-3.4688 0.98438-1.1562 0.22656-2.3125 0.34375-3.4688 0.34375-2.7734 0-4.9297-0.70312-6.4688-2.1094-1.5312-1.4062-2.2969-3.3789-2.2969-5.9219 0-2.5 0.75391-4.4609 2.2656-5.8906 1.5078-1.4375 3.582-2.1562 6.2188-2.1562 2.4062 0 4.332 0.73047 5.7812 2.1875 1.4453 1.4492 2.1719 3.3828 2.1719 5.7969zm-5.0312-1.625c0-0.92578-0.27344-1.6719-0.8125-2.2344-0.54297-0.57031-1.25-0.85938-2.125-0.85938-0.94922 0-1.7188 0.26562-2.3125 0.79688s-0.96484 1.2969-1.1094 2.2969z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.2188-6.8906c-1.0234 0-1.793 0.17188-2.3125 0.51562-0.51172 0.34375-0.76562 0.85547-0.76562 1.5312 0 0.625 0.20703 1.1172 0.625 1.4688 0.41406 0.34375 0.98828 0.51562 1.7188 0.51562 0.92578 0 1.7031-0.32812 2.3281-0.98438 0.63281-0.66406 0.95312-1.4922 0.95312-2.4844v-0.5625zm7.4688-1.8438v8.7344h-4.9219v-2.2656c-0.65625 0.92969-1.3984 1.6055-2.2188 2.0312-0.82422 0.41406-1.8242 0.625-3 0.625-1.5859 0-2.8711-0.45703-3.8594-1.375-0.99219-0.92578-1.4844-2.1289-1.4844-3.6094 0-1.7891 0.61328-3.1016 1.8438-3.9375 1.2383-0.84375 3.1797-1.2656 5.8281-1.2656h2.8906v-0.39062c0-0.76953-0.30859-1.332-0.92188-1.6875-0.61719-0.36328-1.5703-0.54688-2.8594-0.54688-1.0547 0-2.0312 0.10547-2.9375 0.3125-0.89844 0.21094-1.7305 0.52344-2.5 0.9375v-3.7344c1.0391-0.25 2.0859-0.44141 3.1406-0.57812 1.0625-0.13281 2.125-0.20312 3.1875-0.20312 2.7578 0 4.75 0.54688 5.9688 1.6406 1.2266 1.0859 1.8438 2.8555 1.8438 5.3125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm7.7031-19.656v4.3438h5.0469v3.5h-5.0469v6.5c0 0.71094 0.14062 1.1875 0.42188 1.4375s0.83594 0.375 1.6719 0.375h2.5156v3.5h-4.1875c-1.9375 0-3.3125-0.39844-4.125-1.2031-0.80469-0.8125-1.2031-2.1797-1.2031-4.1094v-6.5h-2.4219v-3.5h2.4219v-4.3438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.766-13.078v-8.2031h4.9219v21.281h-4.9219v-2.2188c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2969 1.8125-5.7969 1.207-1.5 2.7539-2.25 4.6406-2.25 1.0625 0 2 0.21484 2.8125 0.64062 0.82031 0.42969 1.5664 1.0859 2.2344 1.9688zm-3.2188 9.9219c1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm10.5-3.1562c1.0508 0 1.8516-0.37891 2.4062-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3555-1.1562-2.4062-1.1562-1.0547 0-1.8594 0.38672-2.4219 1.1562-0.55469 0.77344-0.82812 1.8828-0.82812 3.3281 0 1.4492 0.27344 2.5586 0.82812 3.3281 0.5625 0.77344 1.3672 1.1562 2.4219 1.1562zm-3.25-9.9219c0.67578-0.88281 1.4219-1.5391 2.2344-1.9688 0.82031-0.42578 1.7656-0.64062 2.8281-0.64062 1.8945 0 3.4453 0.75 4.6562 2.25 1.207 1.5 1.8125 3.4336 1.8125 5.7969 0 2.3555-0.60547 4.2812-1.8125 5.7812-1.2109 1.5-2.7617 2.25-4.6562 2.25-1.0625 0-2.0078-0.21094-2.8281-0.625-0.8125-0.42578-1.5586-1.0859-2.2344-1.9844v2.2188h-4.8906v-21.281h4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.34375-15.312h4.8906l4.125 10.391 3.5-10.391h4.8906l-6.4375 16.766c-0.64844 1.6953-1.4023 2.8828-2.2656 3.5625-0.86719 0.6875-2 1.0312-3.4062 1.0312h-2.8438v-3.2188h1.5312c0.83203 0 1.4375-0.13672 1.8125-0.40625 0.38281-0.26172 0.67969-0.73047 0.89062-1.4062l0.14062-0.42188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.953-3.7188h-8.2188l-1.3125 3.7188h-5.2812l7.5625-20.406h6.2656l7.5625 20.406h-5.2812zm-6.9062-3.7812h5.5781l-2.7812-8.125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'u'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.312h-4.8906zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1406c0-1.3203-0.03125-2.2344-0.09375-2.7344s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-15.312h4.8906v2.2344c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.6406-12.188c-1.0859 0-1.9141 0.39062-2.4844 1.1719-0.57422 0.78125-0.85938 1.9062-0.85938 3.375s0.28516 2.5938 0.85938 3.375c0.57031 0.77344 1.3984 1.1562 2.4844 1.1562 1.0625 0 1.875-0.38281 2.4375-1.1562 0.57031-0.78125 0.85938-1.9062 0.85938-3.375s-0.28906-2.5938-0.85938-3.375c-0.5625-0.78125-1.375-1.1719-2.4375-1.1719zm0-3.5c2.6328 0 4.6914 0.71484 6.1719 2.1406 1.4766 1.418 2.2188 3.3867 2.2188 5.9062 0 2.5117-0.74219 4.4805-2.2188 5.9062-1.4805 1.418-3.5391 2.125-6.1719 2.125-2.6484 0-4.7148-0.70703-6.2031-2.125-1.4922-1.4258-2.2344-3.3945-2.2344-5.9062 0-2.5195 0.74219-4.4883 2.2344-5.9062 1.4883-1.4258 3.5547-2.1406 6.2031-2.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 't'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.5469-12.125c-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406 1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562zm3.2188 9.9062c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2891 1.8125-5.7812 1.207-1.4883 2.7539-2.2344 4.6406-2.2344 1.0703 0 2.0156 0.21484 2.8281 0.64062 0.8125 0.41797 1.5508 1.0742 2.2188 1.9688v-2.2656h4.9219v21.141h-4.9219z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.1875-5.9688v-9.3438h4.9219v1.5312c0 0.83594-0.007813 1.875-0.015625 3.125-0.011719 1.25-0.015625 2.0859-0.015625 2.5 0 1.2422 0.03125 2.1328 0.09375 2.6719 0.070313 0.54297 0.17969 0.93359 0.32812 1.1719 0.20703 0.32422 0.47266 0.57422 0.79688 0.75 0.32031 0.16797 0.69141 0.25 1.1094 0.25 1.0195 0 1.8203-0.39062 2.4062-1.1719 0.58203-0.78125 0.875-1.8672 0.875-3.2656v-7.5625h4.8906v15.312h-4.8906v-2.2188c-0.74219 0.89844-1.5234 1.5586-2.3438 1.9844-0.82422 0.41406-1.7344 0.625-2.7344 0.625-1.7617 0-3.1055-0.53906-4.0312-1.625-0.92969-1.082-1.3906-2.6602-1.3906-4.7344z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.422-21.281v3.2188h-2.7031c-0.6875 0-1.1719 0.125-1.4531 0.375-0.27344 0.25-0.40625 0.6875-0.40625 1.3125v1.0625h4.1875v3.5h-4.1875v11.812h-4.8906v-11.812h-2.4375v-3.5h2.4375v-1.0625c0-1.6641 0.46094-2.8984 1.3906-3.7031 0.92578-0.80078 2.3672-1.2031 4.3281-1.2031z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm16.547-12.766c0.61328-0.94531 1.3477-1.6719 2.2031-2.1719 0.85156-0.5 1.7891-0.75 2.8125-0.75 1.7578 0 3.0977 0.54688 4.0156 1.6406 0.92578 1.0859 1.3906 2.6562 1.3906 4.7188v9.3281h-4.9219v-7.9844-0.35938c0.007813-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.082-0.16406-1.8633-0.48438-2.3438-0.3125-0.48828-0.82422-0.73438-1.5312-0.73438-0.92969 0-1.6484 0.38672-2.1562 1.1562-0.51172 0.76172-0.77344 1.8672-0.78125 3.3125v7.5156h-4.9219v-7.9844c0-1.6953-0.14844-2.7852-0.4375-3.2656-0.29297-0.48828-0.8125-0.73438-1.5625-0.73438-0.9375 0-1.6641 0.38672-2.1719 1.1562-0.51172 0.76172-0.76562 1.8594-0.76562 3.2969v7.5312h-4.9219v-15.312h4.9219v2.2344c0.60156-0.86328 1.2891-1.5156 2.0625-1.9531 0.78125-0.4375 1.6406-0.65625 2.5781-0.65625 1.0625 0 2 0.25781 2.8125 0.76562 0.8125 0.51172 1.4258 1.2305 1.8438 2.1562z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1094c0-1.3438-0.03125-2.2656-0.09375-2.7656s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-21.281h4.8906v8.2031c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h5.875l7.4219 14v-14h4.9844v20.406h-5.875l-7.4219-14v14h-4.9844z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h8.7344c2.5938 0 4.582 0.57812 5.9688 1.7344 1.3945 1.1484 2.0938 2.7891 2.0938 4.9219 0 2.1367-0.69922 3.7812-2.0938 4.9375-1.3867 1.1562-3.375 1.7344-5.9688 1.7344h-3.4844v7.0781h-5.25zm5.25 3.8125v5.7031h2.9219c1.0195 0 1.8047-0.25 2.3594-0.75 0.5625-0.5 0.84375-1.2031 0.84375-2.1094 0-0.91406-0.28125-1.6172-0.84375-2.1094-0.55469-0.48828-1.3398-0.73438-2.3594-0.73438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.031c0 2.0508-0.49609 3.6172-1.4844 4.7031-0.98047 1.082-2.4062 1.625-4.2812 1.625h-2.4219v-3.2188h0.85938c0.92578 0 1.5625-0.21094 1.9062-0.625 0.35156-0.41797 0.53125-1.2461 0.53125-2.4844zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.719-14.828v3.9844c-0.65625-0.45703-1.3242-0.79688-2-1.0156-0.66797-0.21875-1.3594-0.32812-2.0781-0.32812-1.3672 0-2.4336 0.40234-3.2031 1.2031-0.76172 0.79297-1.1406 1.9062-1.1406 3.3438 0 1.4297 0.37891 2.543 1.1406 3.3438 0.76953 0.79297 1.8359 1.1875 3.2031 1.1875 0.75781 0 1.4844-0.10938 2.1719-0.32812 0.6875-0.22656 1.3203-0.56641 1.9062-1.0156v4c-0.76172 0.28125-1.5391 0.48828-2.3281 0.625-0.78125 0.14453-1.5742 0.21875-2.375 0.21875-2.7617 0-4.9219-0.70703-6.4844-2.125-1.5547-1.4141-2.3281-3.3828-2.3281-5.9062 0-2.5312 0.77344-4.5039 2.3281-5.9219 1.5625-1.4141 3.7227-2.125 6.4844-2.125 0.80078 0 1.5938 0.074219 2.375 0.21875 0.78125 0.13672 1.5547 0.35156 2.3281 0.64062z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm580.72 269.92c-14.559 0-26.32 11.762-26.32 26.32 0 8.9609 4.4805 16.801 11.762 21.84v29.117h-299.04v-29.121c6.7188-4.4805 11.762-12.879 11.762-21.84 0-14.559-11.762-26.32-26.32-26.32s-26.32 11.762-26.32 26.32c0 8.9609 4.4805 16.801 11.762 21.84v213.36c0 8.3984 6.7188 14.559 14.559 14.559 8.3984 0 14.559-6.7188 14.559-14.559v-24.078h299.04v24.078c0 8.3984 6.7188 14.559 14.559 14.559 8.3984 0 14.559-6.7188 14.559-14.559l0.003906-213.36c6.7188-4.4805 11.762-12.879 11.762-21.84-0.003907-14.559-11.762-26.316-26.324-26.316zm-277.2 199.36h-36.398v-92.961h36.398zm65.52 0h-35.84v-92.961h36.398l0.003906 92.961zm65.52 0h-36.398v-92.961h36.398zm66.082 0h-36.398l-0.003907-92.961h36.398zm65.52 0h-36.398v-92.961h36.398z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm418.32 245.84c-4.4805-2.8008-10.641-3.3594-15.68-1.6797-5.0391 2.2383-8.9609 6.1602-10.078 11.762l-13.441 53.762c-2.2383 8.9609 3.3594 18.48 12.32 20.719 8.9609 2.2383 18.48-3.3594 20.719-12.32l7.8398-30.801 34.719 21.84c0.55859 0.55859 1.6797 1.1211 2.8008 1.1211 8.3984 3.3594 17.359 3.3594 25.199-1.1211 7.8398-3.9219 14-11.199 15.68-19.602l19.039-76.16c2.2383-8.9609-3.3594-18.48-12.32-20.719l-88.48-22.398c-8.9609-2.2383-18.48 3.3594-20.719 12.32s3.3594 18.48 12.32 20.719l38.078 9.5195-10.641 43.121z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm482.16 176.4c21.84 5.6016 44.238-7.8398 49.84-29.68s-7.8398-44.238-29.68-49.84c-21.84-5.6016-44.238 7.8398-49.84 29.68-5.6016 21.84 7.8398 44.242 29.68 49.84z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm246.96 208.32 16.238 21.84c4.4805 6.1602 11.762 10.078 19.039 11.199l72.238 8.3984h3.3594c14 0 26.32-10.641 28-24.641 1.6797-15.121-8.9609-29.121-24.641-30.801l-59.922-6.7188s-35.281-47.602-36.398-49.84c-1.6797-2.2383-7.2812-10.078-10.078-12.879-10.641-10.641-25.199-16.238-39.762-15.121-14.559 1.1211-28.559 7.8398-37.52 19.602-0.55859 0.55859-0.55859 1.1211-1.1211 1.6797l-77.273 109.2c-3.9219 5.6016-6.1602 12.32-6.1602 19.602v43.121 0.55859 208.88c0 18.48 15.121 33.602 33.602 33.602s33.602-15.121 33.602-33.602v-197.68z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm302.4 124.88c30.801 0 55.441-24.641 55.441-55.441s-24.641-55.441-55.441-55.441c-30.801 0-55.441 24.641-55.441 55.441 0.003907 30.801 24.645 55.441 55.441 55.441z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '90.550781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '104.359375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.347656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '142.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '155.628906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '174.617188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '204.410156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '224.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '252.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '274.121094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '294.164062'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '307.972656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#u')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '317.570312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '336.5625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '366.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '386.789062'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '406.027344'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#t')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '426.070312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '446.003906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '464.992187'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '82.183594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '95.992188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '115.226562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '154.152344'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '167.535156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '187.46875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '216.207031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '239.640625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '258.878906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '278.8125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '308.492188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '329.015625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '342.820312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '362.058594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '371.65625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '390.648438'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '407.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$dad = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 't'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.6562-0.21875c-0.1875 0.09375-0.38672 0.16797-0.59375 0.21875-0.19922 0.050781-0.40625 0.078125-0.625 0.078125-0.66797 0-1.1992-0.17969-1.5938-0.54688-0.38672-0.375-0.57812-0.87891-0.57812-1.5156 0-0.64453 0.19141-1.1484 0.57812-1.5156 0.39453-0.375 0.92578-0.5625 1.5938-0.5625 0.21875 0 0.42578 0.027344 0.625 0.078125 0.20703 0.054687 0.40625 0.125 0.59375 0.21875v0.82812c-0.1875-0.125-0.375-0.21875-0.5625-0.28125-0.17969-0.0625-0.37109-0.09375-0.57812-0.09375-0.36719 0-0.65625 0.12109-0.875 0.35938-0.21094 0.23047-0.3125 0.55469-0.3125 0.96875 0 0.40625 0.10156 0.73047 0.3125 0.96875 0.21875 0.23047 0.50781 0.34375 0.875 0.34375 0.20703 0 0.39844-0.023437 0.57812-0.078125 0.1875-0.0625 0.375-0.16016 0.5625-0.29688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.6875-2.1719c-0.085938-0.039063-0.16797-0.070313-0.25-0.09375-0.085938-0.019531-0.16797-0.03125-0.25-0.03125-0.25 0-0.44531 0.085937-0.57812 0.25-0.125 0.15625-0.1875 0.38281-0.1875 0.67188v1.375h-0.96875v-2.9844h0.96875v0.48438c0.11328-0.19531 0.25-0.33594 0.40625-0.42188 0.16406-0.09375 0.35938-0.14062 0.57812-0.14062h0.10938c0.039063 0 0.09375 0.007812 0.15625 0.015625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4375-1.5v0.26562h-2.2344c0.03125 0.23047 0.11328 0.40234 0.25 0.51562 0.13281 0.10547 0.32812 0.15625 0.57812 0.15625 0.20703 0 0.41406-0.023438 0.625-0.078125 0.20703-0.0625 0.42188-0.15625 0.64062-0.28125v0.73438c-0.21875 0.09375-0.44531 0.16406-0.67188 0.20312-0.23047 0.039062-0.45312 0.0625-0.67188 0.0625-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.47656 0.14453-0.85938 0.4375-1.1406 0.30078-0.28125 0.70703-0.42188 1.2188-0.42188 0.46875 0 0.84375 0.14062 1.125 0.42188s0.42188 0.66406 0.42188 1.1406zm-0.96875-0.32812c0-0.17578-0.058594-0.31641-0.17188-0.42188-0.10547-0.11328-0.24219-0.17188-0.40625-0.17188-0.1875 0-0.33984 0.054687-0.45312 0.15625-0.11719 0.10547-0.1875 0.25-0.21875 0.4375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.7969-1.3438c-0.19922 0-0.35156 0.039062-0.45312 0.10938-0.09375 0.0625-0.14062 0.16406-0.14062 0.29688 0 0.11719 0.035156 0.21094 0.10938 0.28125 0.082031 0.0625 0.19531 0.09375 0.34375 0.09375 0.17578 0 0.32812-0.0625 0.45312-0.1875s0.1875-0.28516 0.1875-0.48438v-0.10938zm1.4688-0.35938v1.7031h-0.96875v-0.4375c-0.125 0.17969-0.27344 0.30859-0.4375 0.39062-0.15625 0.082031-0.35156 0.125-0.57812 0.125-0.3125 0-0.57031-0.085938-0.76562-0.26562-0.1875-0.1875-0.28125-0.42188-0.28125-0.70312 0-0.35156 0.11719-0.61328 0.35938-0.78125 0.23828-0.16406 0.61719-0.25 1.1406-0.25h0.5625v-0.0625c0-0.15625-0.0625-0.26562-0.1875-0.32812-0.11719-0.070312-0.29688-0.10938-0.54688-0.10938-0.21094 0-0.40234 0.023437-0.57812 0.0625-0.17969 0.042969-0.33984 0.10156-0.48438 0.17188v-0.71875c0.19531-0.050781 0.39844-0.085938 0.60938-0.10938 0.20703-0.03125 0.41406-0.046875 0.625-0.046875 0.53906 0 0.92969 0.10938 1.1719 0.32812 0.23828 0.21094 0.35938 0.55469 0.35938 1.0312z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.5-3.8438v0.85938h0.98438v0.67188h-0.98438v1.2812c0 0.13672 0.023438 0.23047 0.078125 0.28125 0.0625 0.042969 0.17578 0.0625 0.34375 0.0625h0.48438v0.6875h-0.8125c-0.38672 0-0.65625-0.078125-0.8125-0.23438s-0.23438-0.42188-0.23438-0.79688v-1.2812h-0.46875v-0.67188h0.46875v-0.85938z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5-2.5469v-1.6094h0.95312v4.1562h-0.95312v-0.4375c-0.13672 0.17969-0.28125 0.30859-0.4375 0.39062-0.15625 0.082031-0.33984 0.125-0.54688 0.125-0.375 0-0.68359-0.14453-0.92188-0.4375-0.23047-0.28906-0.34375-0.67188-0.34375-1.1406 0-0.45703 0.11328-0.83203 0.34375-1.125 0.23828-0.28906 0.54688-0.4375 0.92188-0.4375 0.19531 0 0.375 0.042969 0.53125 0.125 0.16406 0.085938 0.31641 0.21484 0.45312 0.39062zm-0.64062 1.9375c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.0469-0.60938c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875zm-0.625-1.9375c0.125-0.17578 0.26562-0.30469 0.42188-0.39062 0.16406-0.082031 0.35156-0.125 0.5625-0.125 0.36328 0 0.66406 0.14844 0.90625 0.4375 0.23828 0.29297 0.35938 0.66797 0.35938 1.125 0 0.46875-0.12109 0.85156-0.35938 1.1406-0.24219 0.29297-0.54297 0.4375-0.90625 0.4375-0.21094 0-0.39844-0.042969-0.5625-0.125-0.15625-0.082031-0.29688-0.21094-0.42188-0.39062v0.4375h-0.96875v-4.1562h0.96875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.0625-2.9844h0.95312l0.8125 2.0156 0.6875-2.0156h0.95312l-1.2656 3.2656c-0.125 0.33203-0.27344 0.56641-0.4375 0.70312-0.16797 0.13281-0.39062 0.20312-0.67188 0.20312h-0.54688v-0.64062h0.29688c0.16406 0 0.28516-0.027344 0.35938-0.078125 0.070313-0.054688 0.12891-0.14062 0.17188-0.26562l0.03125-0.09375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.5-3.9844h2.7812v0.78125h-1.75v0.73438h1.6406v0.78125h-1.6406v1.6875h-1.0312z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.45312-4.1562h0.96875v4.1562h-0.96875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.4219-4.1562v0.625h-0.51562c-0.13672 0-0.23438 0.027344-0.29688 0.078125-0.054687 0.054687-0.078125 0.13672-0.078125 0.25v0.21875h0.82812v0.67188h-0.82812v2.3125h-0.95312v-2.3125h-0.46875v-0.67188h0.46875v-0.21875c0-0.32031 0.085937-0.5625 0.26562-0.71875 0.1875-0.15625 0.47266-0.23438 0.85938-0.23438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.875-2.375c-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.27344 0.21875 0.48438 0.21875 0.20703 0 0.36719-0.070313 0.48438-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.11719-0.15625-0.27734-0.23438-0.48438-0.23438zm0-0.6875c0.51953 0 0.92188 0.14062 1.2031 0.42188 0.28906 0.27344 0.4375 0.65234 0.4375 1.1406 0 0.5-0.14844 0.89062-0.4375 1.1719-0.28125 0.27344-0.68359 0.40625-1.2031 0.40625-0.51172 0-0.91406-0.13281-1.2031-0.40625-0.29297-0.28125-0.4375-0.67188-0.4375-1.1719 0-0.48828 0.14453-0.86719 0.4375-1.1406 0.28906-0.28125 0.69141-0.42188 1.2031-0.42188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.2344-2.5c0.11328-0.17578 0.25391-0.3125 0.42188-0.40625 0.16406-0.10156 0.35156-0.15625 0.5625-0.15625 0.33203 0 0.58594 0.10938 0.76562 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625v1.8281h-0.96875v-1.5625c0.007813-0.019531 0.015625-0.039062 0.015625-0.0625v-0.10938c0-0.21875-0.03125-0.375-0.09375-0.46875s-0.16406-0.14062-0.29688-0.14062c-0.1875 0-0.33594 0.078125-0.4375 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-1.5625c0-0.33203-0.03125-0.54688-0.09375-0.64062-0.054688-0.09375-0.15234-0.14062-0.29688-0.14062-0.17969 0-0.32031 0.078125-0.42188 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.11328-0.17578 0.24219-0.30469 0.39062-0.39062 0.15625-0.082031 0.32812-0.125 0.51562-0.125 0.20703 0 0.39062 0.054688 0.54688 0.15625 0.15625 0.09375 0.27344 0.23047 0.35938 0.40625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-4.1562h0.96875v1.6094c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.5-3.9844h1.1562l1.4375 2.7344v-2.7344h0.98438v3.9844h-1.1562l-1.4375-2.7344v2.7344h-0.98438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.42188-1.1719v-1.8125h0.96875v0.29688 0.60938 0.48438c0 0.24219 0.003906 0.41797 0.015625 0.53125 0.007812 0.10547 0.03125 0.17969 0.0625 0.21875 0.039062 0.0625 0.09375 0.11719 0.15625 0.15625 0.0625 0.03125 0.13281 0.046875 0.21875 0.046875 0.19531 0 0.35156-0.078125 0.46875-0.23438 0.11328-0.15625 0.17188-0.36719 0.17188-0.64062v-1.4688h0.95312v2.9844h-0.95312v-0.4375c-0.14844 0.17969-0.30469 0.30859-0.46875 0.39062-0.15625 0.082031-0.33594 0.125-0.53125 0.125-0.34375 0-0.60938-0.10156-0.79688-0.3125-0.17969-0.21875-0.26562-0.53125-0.26562-0.9375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.5-3.9844h1.7031c0.50781 0 0.89844 0.11719 1.1719 0.34375 0.26953 0.21875 0.40625 0.53906 0.40625 0.95312 0 0.41797-0.13672 0.74219-0.40625 0.96875-0.27344 0.21875-0.66406 0.32812-1.1719 0.32812h-0.67188v1.3906h-1.0312zm1.0312 0.75v1.1094h0.5625c0.19531 0 0.34766-0.046875 0.45312-0.14062 0.11328-0.10156 0.17188-0.24219 0.17188-0.42188 0-0.17578-0.058594-0.3125-0.17188-0.40625-0.10547-0.09375-0.25781-0.14062-0.45312-0.14062z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.45312-2.9844h0.96875v2.9375c0 0.39453-0.10156 0.69531-0.29688 0.90625-0.1875 0.21875-0.46484 0.32812-0.82812 0.32812h-0.48438v-0.64062h0.17188c0.17578 0 0.29688-0.042969 0.35938-0.125 0.070312-0.074219 0.10938-0.23047 0.10938-0.46875zm0-1.1719h0.96875v0.78125h-0.96875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.875-2.8906v0.76562c-0.125-0.082031-0.25781-0.14453-0.39062-0.1875-0.13672-0.039062-0.27344-0.0625-0.40625-0.0625-0.27344 0-0.48047 0.078125-0.625 0.23438-0.14844 0.15625-0.21875 0.37109-0.21875 0.64062 0 0.28125 0.070313 0.5 0.21875 0.65625 0.14453 0.15625 0.35156 0.23438 0.625 0.23438 0.14453 0 0.28516-0.019531 0.42188-0.0625 0.13281-0.039063 0.25781-0.10938 0.375-0.20312v0.78125c-0.14844 0.0625-0.29688 0.10156-0.45312 0.125-0.15625 0.03125-0.3125 0.046875-0.46875 0.046875-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.48828 0.14844-0.86719 0.45312-1.1406 0.30078-0.28125 0.72266-0.42188 1.2656-0.42188 0.15625 0 0.3125 0.015625 0.46875 0.046875 0.15625 0.023437 0.30469 0.0625 0.45312 0.125z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm345.61 350.98c-25.871 0-50.602-9.6484-69.637-27.176-19.035-17.523-30.691-41.375-32.824-67.156l-9.8672-119.21c-0.011718-0.12109-0.015625-0.24219-0.015625-0.35938 0-62.172 50.582-112.75 112.75-112.75 62.172 0 112.75 50.582 112.75 112.75 0 0.12891-0.003906 0.26172-0.015625 0.39062l-10.75 119.89c-2.3008 25.637-14.027 49.324-33.023 66.695-18.996 17.367-43.637 26.934-69.375 26.934zm-103.59-214.09 9.8516 119.04c4.0039 48.395 45.184 86.305 93.742 86.305 49.031 0 89.309-36.828 93.688-85.664l10.73-119.69c-0.10156-57.262-46.719-103.81-104-103.81-57.293 0-103.91 46.559-104.01 103.83z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm345.3 220.93c-44.246 0-80.242-35.996-80.242-80.242s35.996-80.242 80.242-80.242c44.246 0 80.242 35.996 80.242 80.242s-35.996 80.242-80.242 80.242zm0-151.73c-39.422 0-71.492 32.07-71.492 71.492 0 39.418 32.07 71.492 71.492 71.492 39.418 0 71.492-32.07 71.492-71.492 0-39.418-32.07-71.492-71.492-71.492z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm370.59 98.098c-0.46094 0-0.92578-0.070312-1.3828-0.22656-2.293-0.76562-3.5312-3.2422-2.7656-5.5352l7.2227-21.676c0.76562-2.293 3.2461-3.5273 5.5352-2.7656 2.293 0.76562 3.5312 3.2422 2.7656 5.5352l-7.2227 21.676c-0.61328 1.832-2.3242 2.9922-4.1523 2.9922z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm385.04 141.45h-7.2266c-2.418 0-4.375-1.957-4.375-4.375s1.957-4.375 4.375-4.375h7.2266c2.418 0 4.375 1.957 4.375 4.375s-1.9609 4.375-4.375 4.375z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm312.79 141.45h-7.2266c-2.418 0-4.375-1.957-4.375-4.375s1.957-4.375 4.375-4.375h7.2266c2.418 0 4.375 1.957 4.375 4.375s-1.9609 4.375-4.375 4.375z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm406.71 329.31c-0.85156 0-1.7109-0.25-2.4688-0.76562-69.559-47.672-103.66-95.906-120.01-127.97-17.898-35.094-19.125-58.699-19.168-59.688-0.10547-2.4141 1.7656-4.457 4.1797-4.5625 2.4102-0.097656 4.4531 1.7617 4.5625 4.1719 0.015625 0.29687 1.3125 23.172 18.508 56.664 15.926 31.02 49.133 77.746 116.88 124.17 1.9922 1.3672 2.5 4.0898 1.1367 6.082-0.84766 1.2344-2.2188 1.8984-3.6133 1.8984z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm348.92 278.73c-1.5273 0-3.0117-0.80078-3.8164-2.2266-1.1875-2.1055-0.44141-4.7734 1.6602-5.9609 34.656-19.547 51.832-53.68 60.145-78.875 9.1055-27.613 9.8789-50.875 9.8867-51.109 0.070312-2.4141 2.0312-4.293 4.4961-4.2461 2.4141 0.070312 4.3164 2.082 4.25 4.4961-0.027343 0.98828-0.78906 24.57-10.242 53.355-12.598 38.359-34.809 67.406-64.234 84.004-0.67578 0.38281-1.4141 0.5625-2.1445 0.5625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm320.88 101.89c-0.35156 0-0.70703-0.042969-1.0625-0.13281-2.3438-0.58594-3.7695-2.9609-3.1836-5.3047l6.3672-25.461c0.58594-2.3438 2.9648-3.7695 5.3047-3.1836 2.3438 0.58594 3.7695 2.9609 3.1836 5.3047l-6.3672 25.461c-0.49609 1.9883-2.2812 3.3164-4.2422 3.3164z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm345.3 184.8c-12.371 0-22.438-10.066-22.438-22.438 0-2.418 1.957-4.375 4.375-4.375s4.375 1.957 4.375 4.375c0 7.5469 6.1406 13.688 13.688 13.688s13.688-6.1406 13.688-13.688c0-2.418 1.957-4.375 4.375-4.375s4.375 1.957 4.375 4.375c0.003907 12.375-10.062 22.438-22.438 22.438z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm427.12 535.68c-1.8828 0-3.6211-1.2266-4.1875-3.1172l-27.852-92.609c-0.37891-1.2656-0.16797-2.6328 0.57422-3.7227l92.262-135.39c7.4922-10.992 21.77-15.238 34.035-10.152l-28.098-100.45c-4.4883-16.043 4.9141-32.746 20.957-37.23 7.7695-2.1758 15.926-1.1914 22.957 2.7656 7.0312 3.957 12.102 10.418 14.277 18.188l29.496 105.45c10.609 37.938 4.332 78.605-17.234 111.57l-33.27 50.867c-11.836 18.098-14.695 40.242-7.8398 60.754l0.48828 1.457c0.37891 1.1367 0.27734 2.3789-0.28516 3.4375s-1.5312 1.8398-2.6875 2.1641l-92.41 25.848c-0.39453 0.11328-0.79297 0.16406-1.1836 0.16406zm-23.059-96.242 26.016 86.5 83.906-23.469c-6.5039-22.23-3.0195-45.898 9.7305-65.395l33.27-50.871c20.184-30.855 26.062-68.918 16.129-104.43l-29.496-105.45c-1.543-5.5195-5.1445-10.109-10.141-12.922s-10.789-3.5117-16.309-1.9648c-5.5195 1.543-10.109 5.1445-12.922 10.141-2.8125 4.9961-3.5117 10.785-1.9648 16.309l31.242 111.69c1.9648 2.5664 3.4922 5.4766 4.4883 8.6328 2.4844 7.8477 1.4141 16.355-2.9297 23.348l-48.781 78.488c-1.2734 2.0508-3.9727 2.6836-6.0273 1.4062-2.0508-1.2734-2.6836-3.9727-1.4062-6.0273l48.781-78.488c2.9961-4.8164 3.7305-10.684 2.0195-16.09-0.51562-1.6211-1.2305-3.1523-2.1211-4.5547-0.91797-0.55469-1.6367-1.4492-1.9531-2.5664v-0.003906c-1.8711-2.0781-4.1914-3.75-6.8281-4.8711-8.4922-3.6094-18.426-0.69531-23.621 6.9297z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm279.1 534.01c-0.35156 0-0.70703-0.042969-1.0625-0.13281l-93.102-23.25c-1.1602-0.28906-2.1484-1.0391-2.7383-2.0781-0.58984-1.0391-0.73437-2.2734-0.39453-3.418l0.48828-1.6328c6.1367-20.594 2.6211-42.527-9.6406-60.176l-34.812-50.098c-22.48-32.352-29.898-72.824-20.355-111.05l26.531-106.24c1.9531-7.8281 6.8398-14.426 13.762-18.582 6.918-4.1523 15.039-5.3633 22.871-3.4102 7.8281 1.9531 14.426 6.8398 18.582 13.762 4.1523 6.918 5.3633 15.039 3.4102 22.871l-25.273 101.19c12.121-5.4258 26.512-1.582 34.309 9.1953l96.02 132.75c0.77344 1.0703 1.0234 2.4258 0.67969 3.6992l-25.051 93.352c-0.52344 1.9531-2.2891 3.2422-4.2227 3.2422zm-87.652-30.773 84.539 21.113 23.395-87.188-94.801-131.06c-5.4062-7.4766-15.418-10.113-23.805-6.2656-2.6055 1.1953-4.8789 2.9336-6.6914 5.0625v0.003906c-0.28125 1.125-0.97266 2.0391-1.8789 2.6211-0.85156 1.4297-1.5273 2.9805-1.9961 4.6172-1.5586 5.4531-0.66016 11.293 2.4688 16.027l50.965 77.086c1.332 2.0156 0.77734 4.7305-1.2383 6.0625-2.0156 1.3359-4.7305 0.77734-6.0625-1.2383l-50.965-77.086c-4.5391-6.8672-5.8438-15.344-3.582-23.258 0.91016-3.1836 2.3555-6.1367 4.2461-8.7539l28.098-112.52c1.3906-5.5625 0.52734-11.332-2.4219-16.246-2.9492-4.9141-7.6367-8.3867-13.199-9.7734-5.5625-1.3906-11.332-0.53125-16.246 2.4219-4.9141 2.9492-8.3867 7.6367-9.7734 13.199l-26.523 106.23c-8.9336 35.773-1.9883 73.656 19.051 103.93l34.812 50.105c13.242 19.055 17.41 42.559 11.609 64.902z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#t')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '74.011719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '76.710938'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '80.417969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '84.109375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '86.722656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '90.433594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '96.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '100.167969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '105.636719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '109.371094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '111.246094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '114.9375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '117.550781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '121.238281'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.9375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '72.378906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '75.078125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '78.832031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '86.4375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '89.050781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '92.941406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '98.554688'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '103.132812'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '106.890625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '110.785156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '116.582031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '120.589844'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.285156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '127.042969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '128.917969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '132.625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '135.867188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$drugs = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.6562-0.21875c-0.1875 0.09375-0.38672 0.16797-0.59375 0.21875-0.19922 0.050781-0.40625 0.078125-0.625 0.078125-0.66797 0-1.1992-0.17969-1.5938-0.54688-0.38672-0.375-0.57812-0.87891-0.57812-1.5156 0-0.64453 0.19141-1.1484 0.57812-1.5156 0.39453-0.375 0.92578-0.5625 1.5938-0.5625 0.21875 0 0.42578 0.027344 0.625 0.078125 0.20703 0.054687 0.40625 0.125 0.59375 0.21875v0.82812c-0.1875-0.125-0.375-0.21875-0.5625-0.28125-0.17969-0.0625-0.37109-0.09375-0.57812-0.09375-0.36719 0-0.65625 0.12109-0.875 0.35938-0.21094 0.23047-0.3125 0.55469-0.3125 0.96875 0 0.40625 0.10156 0.73047 0.3125 0.96875 0.21875 0.23047 0.50781 0.34375 0.875 0.34375 0.20703 0 0.39844-0.023437 0.57812-0.078125 0.1875-0.0625 0.375-0.16016 0.5625-0.29688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.6875-2.1719c-0.085938-0.039063-0.16797-0.070313-0.25-0.09375-0.085938-0.019531-0.16797-0.03125-0.25-0.03125-0.25 0-0.44531 0.085937-0.57812 0.25-0.125 0.15625-0.1875 0.38281-0.1875 0.67188v1.375h-0.96875v-2.9844h0.96875v0.48438c0.11328-0.19531 0.25-0.33594 0.40625-0.42188 0.16406-0.09375 0.35938-0.14062 0.57812-0.14062h0.10938c0.039063 0 0.09375 0.007812 0.15625 0.015625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4375-1.5v0.26562h-2.2344c0.03125 0.23047 0.11328 0.40234 0.25 0.51562 0.13281 0.10547 0.32812 0.15625 0.57812 0.15625 0.20703 0 0.41406-0.023438 0.625-0.078125 0.20703-0.0625 0.42188-0.15625 0.64062-0.28125v0.73438c-0.21875 0.09375-0.44531 0.16406-0.67188 0.20312-0.23047 0.039062-0.45312 0.0625-0.67188 0.0625-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.47656 0.14453-0.85938 0.4375-1.1406 0.30078-0.28125 0.70703-0.42188 1.2188-0.42188 0.46875 0 0.84375 0.14062 1.125 0.42188s0.42188 0.66406 0.42188 1.1406zm-0.96875-0.32812c0-0.17578-0.058594-0.31641-0.17188-0.42188-0.10547-0.11328-0.24219-0.17188-0.40625-0.17188-0.1875 0-0.33984 0.054687-0.45312 0.15625-0.11719 0.10547-0.1875 0.25-0.21875 0.4375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.7969-1.3438c-0.19922 0-0.35156 0.039062-0.45312 0.10938-0.09375 0.0625-0.14062 0.16406-0.14062 0.29688 0 0.11719 0.035156 0.21094 0.10938 0.28125 0.082031 0.0625 0.19531 0.09375 0.34375 0.09375 0.17578 0 0.32812-0.0625 0.45312-0.1875s0.1875-0.28516 0.1875-0.48438v-0.10938zm1.4688-0.35938v1.7031h-0.96875v-0.4375c-0.125 0.17969-0.27344 0.30859-0.4375 0.39062-0.15625 0.082031-0.35156 0.125-0.57812 0.125-0.3125 0-0.57031-0.085938-0.76562-0.26562-0.1875-0.1875-0.28125-0.42188-0.28125-0.70312 0-0.35156 0.11719-0.61328 0.35938-0.78125 0.23828-0.16406 0.61719-0.25 1.1406-0.25h0.5625v-0.0625c0-0.15625-0.0625-0.26562-0.1875-0.32812-0.11719-0.070312-0.29688-0.10938-0.54688-0.10938-0.21094 0-0.40234 0.023437-0.57812 0.0625-0.17969 0.042969-0.33984 0.10156-0.48438 0.17188v-0.71875c0.19531-0.050781 0.39844-0.085938 0.60938-0.10938 0.20703-0.03125 0.41406-0.046875 0.625-0.046875 0.53906 0 0.92969 0.10938 1.1719 0.32812 0.23828 0.21094 0.35938 0.55469 0.35938 1.0312z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.5-3.8438v0.85938h0.98438v0.67188h-0.98438v1.2812c0 0.13672 0.023438 0.23047 0.078125 0.28125 0.0625 0.042969 0.17578 0.0625 0.34375 0.0625h0.48438v0.6875h-0.8125c-0.38672 0-0.65625-0.078125-0.8125-0.23438s-0.23438-0.42188-0.23438-0.79688v-1.2812h-0.46875v-0.67188h0.46875v-0.85938z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5-2.5469v-1.6094h0.95312v4.1562h-0.95312v-0.4375c-0.13672 0.17969-0.28125 0.30859-0.4375 0.39062-0.15625 0.082031-0.33984 0.125-0.54688 0.125-0.375 0-0.68359-0.14453-0.92188-0.4375-0.23047-0.28906-0.34375-0.67188-0.34375-1.1406 0-0.45703 0.11328-0.83203 0.34375-1.125 0.23828-0.28906 0.54688-0.4375 0.92188-0.4375 0.19531 0 0.375 0.042969 0.53125 0.125 0.16406 0.085938 0.31641 0.21484 0.45312 0.39062zm-0.64062 1.9375c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.0469-0.60938c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875zm-0.625-1.9375c0.125-0.17578 0.26562-0.30469 0.42188-0.39062 0.16406-0.082031 0.35156-0.125 0.5625-0.125 0.36328 0 0.66406 0.14844 0.90625 0.4375 0.23828 0.29297 0.35938 0.66797 0.35938 1.125 0 0.46875-0.12109 0.85156-0.35938 1.1406-0.24219 0.29297-0.54297 0.4375-0.90625 0.4375-0.21094 0-0.39844-0.042969-0.5625-0.125-0.15625-0.082031-0.29688-0.21094-0.42188-0.39062v0.4375h-0.96875v-4.1562h0.96875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.0625-2.9844h0.95312l0.8125 2.0156 0.6875-2.0156h0.95312l-1.2656 3.2656c-0.125 0.33203-0.27344 0.56641-0.4375 0.70312-0.16797 0.13281-0.39062 0.20312-0.67188 0.20312h-0.54688v-0.64062h0.29688c0.16406 0 0.28516-0.027344 0.35938-0.078125 0.070313-0.054688 0.12891-0.14062 0.17188-0.26562l0.03125-0.09375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.45312-2.9844h0.96875v2.9844h-0.96875zm0-1.1719h0.96875v0.78125h-0.96875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.4219-4.1562v0.625h-0.51562c-0.13672 0-0.23438 0.027344-0.29688 0.078125-0.054687 0.054687-0.078125 0.13672-0.078125 0.25v0.21875h0.82812v0.67188h-0.82812v2.3125h-0.95312v-2.3125h-0.46875v-0.67188h0.46875v-0.21875c0-0.32031 0.085937-0.5625 0.26562-0.71875 0.1875-0.15625 0.47266-0.23438 0.85938-0.23438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.875-2.375c-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.27344 0.21875 0.48438 0.21875 0.20703 0 0.36719-0.070313 0.48438-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.11719-0.15625-0.27734-0.23438-0.48438-0.23438zm0-0.6875c0.51953 0 0.92188 0.14062 1.2031 0.42188 0.28906 0.27344 0.4375 0.65234 0.4375 1.1406 0 0.5-0.14844 0.89062-0.4375 1.1719-0.28125 0.27344-0.68359 0.40625-1.2031 0.40625-0.51172 0-0.91406-0.13281-1.2031-0.40625-0.29297-0.28125-0.4375-0.67188-0.4375-1.1719 0-0.48828 0.14453-0.86719 0.4375-1.1406 0.28906-0.28125 0.69141-0.42188 1.2031-0.42188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.2344-2.5c0.11328-0.17578 0.25391-0.3125 0.42188-0.40625 0.16406-0.10156 0.35156-0.15625 0.5625-0.15625 0.33203 0 0.58594 0.10938 0.76562 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625v1.8281h-0.96875v-1.5625c0.007813-0.019531 0.015625-0.039062 0.015625-0.0625v-0.10938c0-0.21875-0.03125-0.375-0.09375-0.46875s-0.16406-0.14062-0.29688-0.14062c-0.1875 0-0.33594 0.078125-0.4375 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-1.5625c0-0.33203-0.03125-0.54688-0.09375-0.64062-0.054688-0.09375-0.15234-0.14062-0.29688-0.14062-0.17969 0-0.32031 0.078125-0.42188 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.11328-0.17578 0.24219-0.30469 0.39062-0.39062 0.15625-0.082031 0.32812-0.125 0.51562-0.125 0.20703 0 0.39062 0.054688 0.54688 0.15625 0.15625 0.09375 0.27344 0.23047 0.35938 0.40625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-4.1562h0.96875v1.6094c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.5-3.9844h1.1562l1.4375 2.7344v-2.7344h0.98438v3.9844h-1.1562l-1.4375-2.7344v2.7344h-0.98438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.42188-1.1719v-1.8125h0.96875v0.29688 0.60938 0.48438c0 0.24219 0.003906 0.41797 0.015625 0.53125 0.007812 0.10547 0.03125 0.17969 0.0625 0.21875 0.039062 0.0625 0.09375 0.11719 0.15625 0.15625 0.0625 0.03125 0.13281 0.046875 0.21875 0.046875 0.19531 0 0.35156-0.078125 0.46875-0.23438 0.11328-0.15625 0.17188-0.36719 0.17188-0.64062v-1.4688h0.95312v2.9844h-0.95312v-0.4375c-0.14844 0.17969-0.30469 0.30859-0.46875 0.39062-0.15625 0.082031-0.33594 0.125-0.53125 0.125-0.34375 0-0.60938-0.10156-0.79688-0.3125-0.17969-0.21875-0.26562-0.53125-0.26562-0.9375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.5-3.9844h1.7031c0.50781 0 0.89844 0.11719 1.1719 0.34375 0.26953 0.21875 0.40625 0.53906 0.40625 0.95312 0 0.41797-0.13672 0.74219-0.40625 0.96875-0.27344 0.21875-0.66406 0.32812-1.1719 0.32812h-0.67188v1.3906h-1.0312zm1.0312 0.75v1.1094h0.5625c0.19531 0 0.34766-0.046875 0.45312-0.14062 0.11328-0.10156 0.17188-0.24219 0.17188-0.42188 0-0.17578-0.058594-0.3125-0.17188-0.40625-0.10547-0.09375-0.25781-0.14062-0.45312-0.14062z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.45312-2.9844h0.96875v2.9375c0 0.39453-0.10156 0.69531-0.29688 0.90625-0.1875 0.21875-0.46484 0.32812-0.82812 0.32812h-0.48438v-0.64062h0.17188c0.17578 0 0.29688-0.042969 0.35938-0.125 0.070312-0.074219 0.10938-0.23047 0.10938-0.46875zm0-1.1719h0.96875v0.78125h-0.96875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.875-2.8906v0.76562c-0.125-0.082031-0.25781-0.14453-0.39062-0.1875-0.13672-0.039062-0.27344-0.0625-0.40625-0.0625-0.27344 0-0.48047 0.078125-0.625 0.23438-0.14844 0.15625-0.21875 0.37109-0.21875 0.64062 0 0.28125 0.070313 0.5 0.21875 0.65625 0.14453 0.15625 0.35156 0.23438 0.625 0.23438 0.14453 0 0.28516-0.019531 0.42188-0.0625 0.13281-0.039063 0.25781-0.10938 0.375-0.20312v0.78125c-0.14844 0.0625-0.29688 0.10156-0.45312 0.125-0.15625 0.03125-0.3125 0.046875-0.46875 0.046875-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.48828 0.14844-0.86719 0.45312-1.1406 0.30078-0.28125 0.72266-0.42188 1.2656-0.42188 0.15625 0 0.3125 0.015625 0.46875 0.046875 0.15625 0.023437 0.30469 0.0625 0.45312 0.125z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm477.31 453.58c-1.2031 0-2.4062-0.32812-3.5-0.98438l-91-58.078c-1.4219-0.98438-2.5156-2.4062-2.8438-4.1562s-0.10938-3.5 0.875-4.9219l45.062-70.547c0.875-1.3125 1.8594-2.7344 2.9531-4.2656 0.10938-0.10938 0.21875-0.21875 0.21875-0.32812l0.32812-0.4375c0.875-0.98438 1.75-2.0781 2.7344-3.1719 0.98438-1.2031 2.1875-2.2969 3.5-3.6094 0.98438-0.875 1.9688-1.8594 3.1719-2.7344 0.32812-0.32812 0.65625-0.54688 0.875-0.65625 0.76562-0.65625 1.5312-1.3125 2.5156-1.8594 0.98438-0.65625 1.9688-1.3125 2.9531-1.8594 1.0938-0.65625 2.1875-1.3125 3.1719-1.8594s2.0781-1.0938 3.2812-1.6406c0.98438-0.4375 1.8594-0.875 2.7344-1.2031 0.54688-0.21875 0.98438-0.32812 1.3125-0.4375 6.8906-2.625 14.109-3.9375 21.438-3.9375 11.484 0 22.75 3.2812 32.375 9.5156 13.562 8.6406 22.969 22.203 26.469 37.953 3.5 15.859 0.65625 32.047-8.0938 45.609l-44.953 70.656c-1.3125 1.9688-3.3906 2.9531-5.5781 2.9531zm-81.922-66.609 79.953 50.969 41.453-64.969c6.7812-10.609 9.0781-23.297 6.2344-35.766-2.7344-12.359-10.062-22.969-20.781-29.75-7.5469-4.8125-16.297-7.4375-25.375-7.4375-5.7969 0-11.594 1.0938-17.062 3.1719-0.21875 0.10938-0.4375 0.10938-0.65625 0.21875h-0.10938c-0.65625 0.21875-1.3125 0.54688-1.9688 0.875-0.10938 0-0.21875 0.10938-0.32812 0.10938-1.0938 0.4375-1.8594 0.875-2.625 1.2031-0.76562 0.4375-1.5312 0.875-2.4062 1.4219-0.10938 0.10938-0.21875 0.10938-0.21875 0.21875-0.65625 0.4375-1.4219 0.875-2.1875 1.4219-0.65625 0.4375-1.0938 0.875-1.75 1.3125-0.10938 0.10938-0.32812 0.21875-0.4375 0.32812s-0.32812 0.21875-0.4375 0.32812c-0.65625 0.54688-1.4219 1.2031-2.2969 1.9688-1.0938 0.98438-1.9688 1.8594-2.7344 2.7344l-0.10938 0.10938c-0.76562 0.76562-1.5312 1.6406-2.2969 2.625l-0.21875 0.21875c-0.875 1.2031-1.6406 2.4062-2.4062 3.3906z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm386.64 549.06c-11.484 0-22.75-3.2812-32.484-9.4062-17.5-11.266-28-30.406-28-51.188 0-4.375 0.4375-8.75 1.4219-12.906 0.76562-3.3906 1.5312-6.125 2.625-8.6406 0.21875-0.65625 0.4375-1.2031 0.65625-1.75 0.10938-0.10938 0.10938-0.32812 0.21875-0.4375 0-0.10938 0-0.10938 0.10938-0.21875 0.54688-1.2031 0.98438-2.2969 1.5312-3.5 0.10938-0.32812 0.32812-0.54688 0.4375-0.875 0.76562-1.4219 1.5312-2.8438 2.4062-4.2656l45.062-70.547c1.9688-3.0625 6.0156-3.9375 9.0781-1.9688l91 58.078c1.4219 0.98438 2.5156 2.4062 2.8438 4.1562s0.10938 3.5-0.875 4.9219l-45.062 70.547c-10.938 17.5-30.078 28-50.969 28zm-42.328-81.594c-0.32812 0.76562-0.65625 1.5312-0.98438 2.2969l-0.32812 0.65625c-0.10938 0.21875-0.21875 0.4375-0.21875 0.65625-0.10938 0.21875-0.10938 0.4375-0.21875 0.54688-0.76562 1.8594-1.4219 4.0469-2.0781 6.7812-0.76562 3.1719-1.0938 6.5625-1.0938 9.9531 0 16.406 8.2031 31.391 21.875 40.141 7.5469 4.8125 16.297 7.3281 25.375 7.3281 16.406 0 31.391-8.2031 40.141-21.875l41.562-64.969-80.062-50.969-41.453 64.969c-0.65625 1.0938-1.4219 2.4062-2.0781 3.6094l-0.4375 0.875z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm379.09 406.88h-208.91c-3.6094 0-6.5625-2.9531-6.5625-6.5625v-193.59c0-3.6094 2.9531-6.5625 6.5625-6.5625h288.53c3.6094 0 6.5625 2.9531 6.5625 6.5625v90.016c0 2.7344-1.6406 5.1406-4.1562 6.125l-0.32812 0.10938c-0.4375 0.21875-0.875 0.4375-1.4219 0.54688h-0.10938-0.10938c-0.54688 0.21875-1.2031 0.4375-1.5312 0.65625l-0.65625 0.32812c-1.0938 0.4375-1.8594 0.875-2.625 1.2031-0.10938 0.10938-0.21875 0.10938-0.32812 0.21875-0.54688 0.21875-1.2031 0.65625-1.8594 1.0938-0.21875 0.10938-0.32812 0.21875-0.54688 0.32812-0.65625 0.4375-1.4219 0.875-2.1875 1.4219-0.65625 0.4375-1.0938 0.875-1.75 1.3125-0.10938 0.10938-0.32812 0.21875-0.4375 0.32812s-0.32812 0.21875-0.4375 0.32812c-0.65625 0.54688-1.4219 1.2031-2.2969 1.9688l-0.10938 0.10938c-0.76562 0.65625-1.5312 1.5312-2.625 2.625-0.10938 0.10938-0.21875 0.21875-0.21875 0.32812-0.875 0.875-1.6406 1.8594-2.2969 2.625-0.98438 1.3125-1.75 2.4062-2.4062 3.5l-44.953 70.547c-0.10938 0.21875-0.32812 0.4375-0.54688 0.65625l-6.6719 10.609c-1.2031 1.9688-3.2812 3.1719-5.5781 3.1719zm-202.34-13.125h198.73l5.25-8.2031c0.10938-0.21875 0.32812-0.4375 0.54688-0.76562l44.625-69.891c0.875-1.3125 1.8594-2.7344 2.9531-4.2656l0.10938-0.10938c0.875-1.0938 1.9688-2.5156 3.2812-3.8281 1.3125-1.4219 2.4062-2.625 3.5-3.6094 0.875-0.875 1.8594-1.75 3.0625-2.625 0.32812-0.32812 0.65625-0.54688 0.875-0.65625 0.76562-0.65625 1.5312-1.3125 2.5156-1.8594 0.875-0.65625 1.8594-1.2031 2.8438-1.75 1.2031-0.76562 2.2969-1.5312 3.5-2.0781 0.875-0.4375 1.8594-0.98438 3.0625-1.4219l0.65625-0.32812v-79.078h-275.52z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm458.72 213.28h-288.53c-3.6094 0-6.5625-2.9531-6.5625-6.5625v-40.469c0-1.4219 0.4375-2.7344 1.3125-3.9375l41.234-55.781c1.2031-1.6406 3.1719-2.625 5.25-2.625h206.06c2.0781 0 4.0469 0.98438 5.25 2.625l41.234 55.781c0.875 1.0938 1.3125 2.5156 1.3125 3.9375v40.469c0 3.6094-2.9531 6.5625-6.5625 6.5625zm-281.97-13.125h275.41v-31.719l-37.953-51.406h-199.5l-37.953 51.406v31.719z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm436.95 317.73c-1.5312 0-3.0625-0.54688-4.375-1.6406-1.4219-1.3125-2.1875-3.0625-2.1875-4.9219 0-1.5312 0.54688-3.0625 1.6406-4.375 1.4219-1.5312 2.5156-2.7344 3.7188-3.8281 2.7344-2.4062 6.7812-2.1875 9.1875 0.4375s2.2969 6.7812-0.32812 9.1875c-1.0938 0.98438-1.9688 1.9688-2.7344 2.8438-1.3125 1.6406-3.1719 2.2969-4.9219 2.2969z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm421.09 117.03h-213.17c-12.906 0-23.297-10.391-23.297-23.297v-58.406c0-12.906 10.5-23.297 23.297-23.297h213.17c12.906 0 23.297 10.5 23.297 23.297v58.516c0 12.797-10.391 23.188-23.297 23.188zm-213.17-91.984c-5.5781 0-10.172 4.5938-10.172 10.172v58.516c0 5.4688 4.7031 10.172 10.172 10.172h213.17c5.5781 0 10.172-4.5938 10.172-10.172v-58.406c0-5.5781-4.5938-10.172-10.172-10.172h-213.17z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm434 321.12c-1.4219 0-2.9531-0.4375-4.1562-1.4219-2.7344-2.2969-3.2812-6.3438-1.0938-9.1875 0.875-1.2031 2.0781-2.5156 3.3906-3.9375 2.5156-2.5156 6.6719-2.625 9.1875-0.10938 2.625 2.5156 2.7344 6.5625 0.21875 9.1875-0.76562 0.76562-1.5312 1.6406-2.2969 2.625l-0.32812 0.4375c-1.0938 1.6406-2.9531 2.4062-4.9219 2.4062z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm379.09 406.88c-1.2031 0-2.4062-0.32812-3.5-0.98438-3.0625-1.9688-3.9375-6.0156-1.9688-9.0781l7.2188-11.266c1.2031-1.8594 3.2812-3.0625 5.5781-3.0625 2.4062 0 4.5938 1.3125 5.7969 3.3906s1.0938 4.7031-0.21875 6.6719l-7.2188 11.266c-1.4219 1.9688-3.5 3.0625-5.6875 3.0625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm334.03 483.55h-96.688c-40.688 0-73.719-33.031-73.719-73.719v-9.5156c0-3.6094 2.9531-6.5625 6.5625-6.5625h208.8c2.4062 0 4.5938 1.3125 5.7969 3.3906s1.0938 4.7031-0.21875 6.6719l-37.844 59.172c-0.76562 1.2031-1.4219 2.4062-2.0781 3.5-0.10938 0.21875-0.21875 0.4375-0.54688 0.875-0.32812 0.76562-0.65625 1.5312-0.98438 2.2969 0 0.10938-0.10938 0.32812-0.21875 0.4375-0.10938 0.32812-0.32812 0.65625-0.32812 0.875-0.10938 0.21875-0.10938 0.4375-0.21875 0.65625-0.76562 1.8594-1.4219 4.0469-2.0781 6.7812-0.4375 2.9531-3.1719 5.1406-6.2344 5.1406zm-157.28-76.672v2.9531c0 33.359 27.234 60.594 60.594 60.594h91.547c0.32812-1.2031 0.76562-2.4062 1.2031-3.5 0.32812-0.875 0.65625-1.75 0.98438-2.5156 0.54688-1.0938 0.98438-2.1875 1.5312-3.2812 0.10938-0.32812 0.32812-0.54688 0.4375-0.76562 0.76562-1.4219 1.5312-2.7344 2.4062-4.2656l31.391-49.109z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm338.95 470.2c-0.98438 0-2.0781-0.21875-2.9531-0.76562-3.1719-1.6406-4.4844-5.5781-2.8438-8.75 0.76562-1.6406 1.6406-3.0625 2.625-4.7031 1.8594-3.0625 5.9062-4.0469 9.0781-2.0781 1.9688 1.2031 3.0625 3.3906 3.0625 5.5781 0 1.2031-0.32812 2.4062-0.98438 3.5-0.76562 1.2031-1.5312 2.5156-2.0781 3.7188-1.3125 2.1875-3.6094 3.5-5.9062 3.5z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm343.22 469.66-6.0156-2.5156-6.0156-2.7344c0.4375-1.0938 0.98438-2.1875 1.5312-3.3906 1.6406-3.2812 5.5781-4.5938 8.75-2.9531 2.2969 1.2031 3.6094 3.5 3.6094 5.9062 0 0.98438-0.21875 1.9688-0.65625 2.9531-0.32812 0.875-0.76562 1.8594-1.2031 2.7344z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm334.03 483.55h-96.688c-40.688 0-73.719-33.031-73.719-73.719v-243.58c0-1.4219 0.4375-2.7344 1.3125-3.9375l41.234-55.781c2.1875-2.9531 6.2344-3.5 9.1875-1.4219 2.9531 2.1875 3.5 6.2344 1.4219 9.1875l-40.031 54.141v241.39c0 33.359 27.234 60.594 60.594 60.594h96.688c3.6094 0 6.5625 2.9531 6.5625 6.5625s-2.9531 6.5625-6.5625 6.5625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm336.44 475.67c-0.65625 0-1.2031-0.10938-1.8594-0.32812-3.5-1.0938-5.4688-4.7031-4.375-8.2031 0.32812-0.98438 0.76562-2.0781 1.2031-3.0625 1.6406-3.2812 5.5781-4.5938 8.8594-2.9531s4.5938 5.5781 2.9531 8.8594c-0.10938 0.32812-0.32812 0.65625-0.32812 0.875-0.98438 2.9531-3.6094 4.8125-6.4531 4.8125z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm442.97 312.16c-1.6406 0-3.3906-0.65625-4.5938-1.8594-2.625-2.5156-2.625-6.6719 0-9.2969 0.65625-0.65625 1.2031-0.98438 1.5312-1.2031 2.9531-2.0781 7.1094-1.3125 9.1875 1.75 2.0781 2.9531 1.3125 7-1.6406 9.0781-1.4219 0.98438-2.9531 1.5312-4.4844 1.5312z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm445.81 309.97c-2.0781 0-4.1562-0.98438-5.3594-2.8438-2.0781-2.9531-1.3125-7.1094 1.6406-9.0781 0.98438-0.65625 1.9688-1.3125 2.8438-1.8594 1.2031-0.875 2.5156-1.5312 3.7188-2.0781 3.2812-1.5312 7.2188-0.10938 8.75 3.1719s0.10938 7.2188-3.1719 8.75c-0.54688 0.21875-1.2031 0.65625-1.8594 1.0938-0.21875 0.10938-0.32812 0.21875-0.54688 0.32812-0.65625 0.4375-1.4219 0.875-2.1875 1.4219-1.3125 0.65625-2.625 1.0938-3.8281 1.0938z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm454.34 305.05c-2.2969 0-4.4844-1.2031-5.6875-3.2812-1.8594-3.1719-0.76562-7.1094 2.4062-8.9688 1.2031-0.65625 2.2969-1.0938 3.2812-1.5312h0.10938c3.3906-1.3125 7.2188 0.32812 8.5312 3.7188s-0.32812 7.2188-3.7188 8.5312h-0.10938c-0.54688 0.21875-1.2031 0.4375-1.5312 0.65625-0.98438 0.65625-2.1875 0.875-3.2812 0.875z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm457.62 303.73c-2.2969 0-4.4844-1.2031-5.6875-3.2812-1.3125-2.1875-1.2031-4.9219 0.10938-6.8906v-125.12l-39.922-54.031c-2.1875-2.9531-1.5312-7 1.4219-9.1875s7-1.5312 9.1875 1.4219l41.234 55.781c0.875 1.0938 1.3125 2.5156 1.3125 3.9375v130.48c0 2.7344-1.6406 5.1406-4.1562 6.125l-0.32812 0.10938c-0.98438 0.4375-2.0781 0.65625-3.1719 0.65625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm421.09 117.03h-213.17c-12.906 0-23.297-10.391-23.297-23.297v-58.406c0-12.906 10.5-23.297 23.297-23.297h213.17c12.906 0 23.297 10.5 23.297 23.297v58.516c0 12.797-10.391 23.188-23.297 23.188zm-213.17-91.984c-5.5781 0-10.172 4.5938-10.172 10.172v58.516c0 5.4688 4.7031 10.172 10.172 10.172h213.17c5.5781 0 10.172-4.5938 10.172-10.172v-58.406c0-5.5781-4.5938-10.172-10.172-10.172h-213.17z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm458.72 213.28h-288.53c-3.6094 0-6.5625-2.9531-6.5625-6.5625s2.9531-6.5625 6.5625-6.5625h288.53c3.6094 0 6.5625 2.9531 6.5625 6.5625s-2.9531 6.5625-6.5625 6.5625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm378.98 406.88h-208.8c-3.6094 0-6.5625-2.9531-6.5625-6.5625s2.9531-6.5625 6.5625-6.5625h208.8c3.6094 0 6.5625 2.9531 6.5625 6.5625s-2.8438 6.5625-6.5625 6.5625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm386.53 549.06c-11.375 0-22.531-3.1719-32.375-9.4062-17.5-11.266-28-30.406-28-51.188 0-4.375 0.4375-8.75 1.4219-12.906 0.76562-3.3906 1.5312-6.125 2.625-8.6406 0.21875-0.65625 0.4375-1.2031 0.65625-1.75 0.10938-0.10938 0.10938-0.32812 0.21875-0.4375 0-0.10938 0-0.10938 0.10938-0.21875 0.54688-1.2031 0.98438-2.2969 1.5312-3.5 0.10938-0.32812 0.32812-0.54688 0.4375-0.76562 0.76562-1.4219 1.5312-2.7344 2.4062-4.2656l37.844-59.281 7.1094-11.266c0.10938-0.21875 0.32812-0.54688 0.54688-0.76562l44.625-69.891c0.875-1.3125 1.8594-2.7344 2.9531-4.2656l0.10938-0.10938c0.875-1.0938 1.9688-2.5156 3.2812-3.8281 1.3125-1.4219 2.4062-2.625 3.5-3.6094 0.875-0.875 1.8594-1.75 3.0625-2.625 0.32812-0.32812 0.65625-0.54688 0.875-0.65625 0.76562-0.65625 1.5312-1.3125 2.5156-1.8594 0.98438-0.65625 1.9688-1.3125 2.9531-1.8594 1.0938-0.65625 2.1875-1.3125 3.1719-1.8594s2.0781-1.0938 3.2812-1.6406c0.98438-0.4375 1.8594-0.875 2.7344-1.2031 0.54688-0.21875 0.98438-0.32812 1.3125-0.4375 17.828-6.6719 37.953-4.5938 53.812 5.5781 13.562 8.6406 22.969 22.203 26.469 37.953 3.5 15.859 0.65625 32.047-8.0938 45.609l-44.734 70.656-45.062 70.547c-8.6406 13.562-22.203 22.969-38.062 26.469-4.375 0.98438-8.8594 1.4219-13.234 1.4219zm-42.219-81.594c-0.32812 0.76562-0.65625 1.5312-0.98438 2.2969l-0.32812 0.65625c-0.10938 0.21875-0.21875 0.4375-0.21875 0.65625-0.10938 0.21875-0.10938 0.4375-0.21875 0.54688-0.76562 1.8594-1.4219 4.0469-2.0781 6.7812-0.76562 3.1719-1.0938 6.5625-1.0938 9.9531 0 16.406 8.2031 31.391 21.875 40.141 10.609 6.7812 23.297 8.9688 35.656 6.2344 12.469-2.7344 22.969-10.062 29.75-20.781l45.062-70.547 45.062-70.438c6.7812-10.609 9.0781-23.297 6.2344-35.766-2.7344-12.359-10.062-22.969-20.781-29.75-12.578-7.9844-28.328-9.625-42.328-4.2656-0.21875 0.10938-0.4375 0.10938-0.65625 0.21875h-0.10938c-0.65625 0.21875-1.3125 0.54688-1.9688 0.875-0.10938 0-0.21875 0.10938-0.32812 0.10938-1.0938 0.4375-1.8594 0.875-2.625 1.2031-0.76562 0.4375-1.5312 0.875-2.4062 1.4219-0.10938 0.10938-0.21875 0.10938-0.21875 0.21875-0.65625 0.4375-1.4219 0.875-2.1875 1.4219-0.65625 0.4375-1.0938 0.875-1.75 1.3125-0.10938 0.10938-0.32812 0.21875-0.4375 0.32812s-0.32812 0.21875-0.4375 0.32812c-0.65625 0.54688-1.4219 1.2031-2.2969 1.9688l-0.10938 0.10938c-0.76562 0.65625-1.5312 1.5312-2.625 2.625-0.10938 0.10938-0.21875 0.21875-0.21875 0.32812-0.875 0.875-1.6406 1.8594-2.2969 2.625-0.98438 1.3125-1.75 2.4062-2.4062 3.5l-44.953 70.547c-0.10938 0.21875-0.32812 0.4375-0.54688 0.65625l-6.6719 10.609-37.844 59.172c-0.76562 1.2031-1.4219 2.4062-2.0781 3.5 0 0.4375-0.21875 0.76562-0.4375 1.2031z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm477.31 453.58c-1.2031 0-2.4062-0.32812-3.5-0.98438l-90.781-57.859c-1.9688-1.0938-3.2812-3.2812-3.2812-5.6875 0-3.6094 2.9531-6.5625 6.5625-6.5625h0.10938c1.2031 0 2.5156 0.32812 3.5 0.98438l91 58.078c3.0625 1.9688 3.9375 6.0156 1.9688 9.0781-1.3125 1.8594-3.3906 2.9531-5.5781 2.9531z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm502.03 377.67c-1.2031 0-2.4062-0.32812-3.5-0.98438-3.0625-1.9688-3.9375-6.0156-1.9688-9.0781 9.625-15.094 5.25-35.219-9.8438-44.953-3.0625-1.9688-3.9375-6.0156-1.9688-9.0781s6.0156-3.9375 9.0781-1.9688c21.109 13.562 27.344 41.781 13.781 63-1.3125 1.9688-3.3906 3.0625-5.5781 3.0625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm228.7 82.906c-3.6094 0-6.5625-2.9531-6.5625-6.5625v-26.906c0-3.6094 2.9531-6.5625 6.5625-6.5625s6.5625 2.9531 6.5625 6.5625v26.906c0 3.6094-2.9531 6.5625-6.5625 6.5625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm274.64 82.906c-3.6094 0-6.5625-2.9531-6.5625-6.5625v-26.906c0-3.6094 2.9531-6.5625 6.5625-6.5625s6.5625 2.9531 6.5625 6.5625v26.906c0 3.6094-2.8438 6.5625-6.5625 6.5625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm320.8 82.906c-3.6094 0-6.5625-2.9531-6.5625-6.5625v-26.906c0-3.6094 2.9531-6.5625 6.5625-6.5625s6.5625 2.9531 6.5625 6.5625v26.906c0 3.6094-2.9531 6.5625-6.5625 6.5625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm366.84 82.906c-3.6094 0-6.5625-2.9531-6.5625-6.5625v-26.906c0-3.6094 2.9531-6.5625 6.5625-6.5625s6.5625 2.9531 6.5625 6.5625v26.906c0 3.6094-2.9531 6.5625-6.5625 6.5625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm412.89 82.906c-3.6094 0-6.5625-2.9531-6.5625-6.5625v-26.906c0-3.6094 2.9531-6.5625 6.5625-6.5625s6.5625 2.9531 6.5625 6.5625v26.906c0 3.6094-2.9531 6.5625-6.5625 6.5625z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '74.011719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '76.710938'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '80.417969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '84.109375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '86.722656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '90.433594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '96.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '100.167969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '105.636719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '107.507812'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '111.425781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '114.121094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '117.8125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '121.703125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '125.621094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '127.492188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '129.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '72.378906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '75.078125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '78.832031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '86.4375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '89.050781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '92.941406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '98.554688'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '103.132812'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '106.890625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '110.785156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '116.582031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '120.589844'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.285156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '127.042969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '128.917969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '132.625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '135.867188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$food = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm557.61 190.23c-23.93-23.566-56.949-35.52-90.418-32.727-16.055 1.375-31.695 5.8086-46.082 13.066-4.6758 2.2969-9.6719 3.8711-14.816 4.668 0.24219-0.59766 0.39844-1.2266 0.46484-1.8672 0.48438-8.3711 0.17188-16.77-0.93359-25.082 8.1953 3.5977 17.07 5.3906 26.016 5.25 25.781-1.0898 50.555-10.32 70.762-26.367 36.168-27.242 54.891-67.609 44.625-95.957v-0.003907c-0.39453-1.0977-1.1055-2.0508-2.043-2.7422-24.441-17.906-68.426-10.965-104.54 16.336-9.9609 7.4141-18.871 16.145-26.48 25.957l3.1484-42.293c0.12891-1.5664-0.38281-3.1172-1.4141-4.3047-1.0312-1.1836-2.5-1.9062-4.0703-1.9922-105.87-6.6445-212.05-6.6445-317.91 0-1.5586 0.089843-3.0195 0.80078-4.0469 1.9727-1.0312 1.1719-1.5508 2.7109-1.4375 4.2695l35.816 479.5c0.066406 0.81641 0.30469 1.6133 0.69922 2.332l2.9766 25.898c0.32812 2.9688 2.8438 5.2109 5.832 5.1914h189.58c5.0234 1.0625 10.109 1.8008 15.227 2.2188 11.172 0.94141 22.418 0.19531 33.367-2.2188 0.84766-0.011719 1.6836-0.21094 2.4492-0.58203 8.2344-2 16.219-4.9141 23.801-8.6914 15.578 7.7656 32.762 11.762 50.168 11.668 3.1484 0 6.3008 0 9.5078-0.41016 81.898-6.6484 150.79-98.176 153.65-204.4 1.6914-60.434-17.965-114.62-53.898-148.69zm-109.96-136.09c31.387-23.684 68.484-30.801 89.02-17.5 7.1758 23.332-9.918 57.285-41.301 80.965-31.383 23.684-68.426 30.859-89.133 17.5-7-23.562 10.031-57.281 41.414-80.965zm-42.23-20.648-4.3164 57.285v0.99219-0.003907c-2.8086 5.8672-4.9414 12.031-6.3594 18.375-9-19.582-23.859-35.891-42.527-46.668-2.8164-1.6094-6.4062-0.62891-8.0195 2.1875-1.6094 2.8203-0.63281 6.4102 2.1875 8.0234 24.207 13.535 51.391 47.602 48.477 99.168v-0.003906c-0.015625 1.1133 0.28906 2.207 0.875 3.1523-7.1211-0.27734-14.102-2.0664-20.477-5.25-14.324-7.2852-29.902-11.777-45.906-13.242-33.395-2.7461-66.324 9.2031-90.184 32.727-11.906 11.453-21.941 24.699-29.75 39.258-3.7695 1.0586-7.4727 2.3438-11.086 3.8477-8.0078 3.5898-16.715 5.3438-25.492 5.1328-8.7344 0.19922-17.402-1.5547-25.375-5.1328-9.3828-4.1172-19.562-6.1094-29.805-5.832-0.91797 0.023438-1.8203 0.26172-2.625 0.69922l-14.527-194.71c101.54-6.125 203.36-6.125 304.91 0zm-220.38 305.43c1.6328 62.941 26.598 120.87 63.641 158.96-37.625 0-75.543 1.168-112.99 3.4414l-0.46484-3.9648-19.367-258.77c0.58203 0.20703 1.1914 0.32422 1.8086 0.35156 8.7734-0.21094 17.48 1.543 25.488 5.1328 9.3633 4.1211 19.527 6.1133 29.75 5.832 10.031 0.16797 19.977-1.8203 29.168-5.832-12.484 30.008-18.293 62.371-17.031 94.852zm-46.145 190.75-1.8672-16.684c40.832-2.5078 82.832-3.6758 124.07-3.5h0.003906c9.1641 7.8828 19.227 14.656 29.98 20.184zm460.83-191.04c-2.6836 100.39-66.793 187.13-142.8 193.32h0.003906c-19.406 1.6406-38.867-2.4141-56-11.668-1.7148-0.91016-3.7695-0.91016-5.4844 0-17.145 9.2227-36.598 13.273-56 11.668-26.938-2.7656-52.273-14.117-72.273-32.375-40.543-35-68.66-95.199-70.465-160.94h-0.003906c-1.4844-34.879 5.8594-69.57 21.352-100.86 0.03125-0.15234 0.03125-0.3125 0-0.46484 7.3828-14.344 17.078-27.371 28.699-38.559 21.535-21.438 51.379-32.375 81.668-29.926 14.57 1.2148 28.781 5.1758 41.883 11.668 17.59 8.8711 38.348 8.8711 55.941 0 13.121-6.5 27.352-10.457 41.941-11.668 30.195-2.3945 59.926 8.5391 81.375 29.926 33.773 31.734 51.859 82.715 50.281 139.88z')
							]),
						_List_Nil)
					]))
			]));
};
var $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode = $rtfeldman$elm_css$VirtualDom$Styled$Unstyled;
var $rtfeldman$elm_css$Svg$Styled$fromUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode;
var $author$project$Assets$Icons$iv = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 't'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm19.547-1.1719c-1.0117 0.52344-2.0625 0.91406-3.1562 1.1719-1.0938 0.26953-2.2344 0.40625-3.4219 0.40625-3.543 0-6.3516-0.98828-8.4219-2.9688-2.0625-1.9766-3.0938-4.6602-3.0938-8.0469 0-3.4062 1.0312-6.0977 3.0938-8.0781 2.0703-1.9766 4.8789-2.9688 8.4219-2.9688 1.1875 0 2.3281 0.13672 3.4219 0.40625 1.0938 0.26172 2.1445 0.65625 3.1562 1.1875v4.3906c-1.0234-0.6875-2.0273-1.1914-3.0156-1.5156-0.98047-0.32031-2.0156-0.48438-3.1094-0.48438-1.9609 0-3.5 0.625-4.625 1.875-1.1172 1.25-1.6719 2.9805-1.6719 5.1875 0 2.1875 0.55469 3.9141 1.6719 5.1719 1.125 1.25 2.6641 1.875 4.625 1.875 1.0938 0 2.1289-0.16016 3.1094-0.48438 0.98828-0.32031 1.9922-0.82812 3.0156-1.5156z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.297-11.609c-0.44922-0.20703-0.89062-0.35938-1.3281-0.45312-0.4375-0.10156-0.88281-0.15625-1.3281-0.15625-1.3125 0-2.3242 0.42188-3.0312 1.2656-0.71094 0.83594-1.0625 2.0391-1.0625 3.6094v7.3438h-5.0938v-15.953h5.0938v2.625c0.65625-1.0508 1.4062-1.8164 2.25-2.2969 0.85156-0.47656 1.875-0.71875 3.0625-0.71875 0.17578 0 0.36328 0.011719 0.5625 0.03125 0.19531 0.011719 0.48438 0.042969 0.85938 0.09375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm18.375-8.0156v1.4531h-11.922c0.125 1.1992 0.55469 2.0938 1.2969 2.6875 0.73828 0.59375 1.7734 0.89062 3.1094 0.89062 1.0703 0 2.1719-0.15625 3.2969-0.46875 1.125-0.32031 2.2812-0.80469 3.4688-1.4531v3.9375c-1.2109 0.46094-2.418 0.80469-3.625 1.0312-1.2109 0.22656-2.4141 0.34375-3.6094 0.34375-2.8984 0-5.1484-0.72656-6.75-2.1875-1.5938-1.4688-2.3906-3.5312-2.3906-6.1875 0-2.5938 0.78516-4.6328 2.3594-6.125 1.5703-1.5 3.7344-2.25 6.4844-2.25 2.5078 0 4.5156 0.75781 6.0156 2.2656 1.5078 1.5117 2.2656 3.5312 2.2656 6.0625zm-5.2344-1.7031c0-0.96875-0.28906-1.75-0.85938-2.3438-0.5625-0.59375-1.2969-0.89062-2.2031-0.89062-0.99219 0-1.7969 0.28125-2.4219 0.84375-0.61719 0.55469-0.99609 1.3516-1.1406 2.3906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.5938-7.1719c-1.0625 0-1.8672 0.18359-2.4062 0.54688-0.53125 0.35547-0.79688 0.88281-0.79688 1.5781 0 0.64844 0.21094 1.1523 0.64062 1.5156 0.4375 0.36719 1.0391 0.54688 1.8125 0.54688 0.95703 0 1.7656-0.34375 2.4219-1.0312s0.98438-1.5469 0.98438-2.5781v-0.57812zm7.7969-1.9375v9.1094h-5.1406v-2.3594c-0.6875 0.96875-1.4609 1.6719-2.3125 2.1094-0.85547 0.4375-1.8906 0.65625-3.1094 0.65625-1.6562 0-3-0.47656-4.0312-1.4375-1.0312-0.96875-1.5469-2.2188-1.5469-3.75 0-1.875 0.64062-3.25 1.9219-4.125 1.2891-0.875 3.3164-1.3125 6.0781-1.3125h3v-0.39062c0-0.8125-0.32031-1.4062-0.95312-1.7812-0.63672-0.375-1.6328-0.5625-2.9844-0.5625-1.0859 0-2.1016 0.10938-3.0469 0.32812-0.9375 0.21875-1.8086 0.54688-2.6094 0.98438v-3.8906c1.082-0.25781 2.1758-0.45703 3.2812-0.59375 1.1016-0.14453 2.207-0.21875 3.3125-0.21875 2.875 0 4.9453 0.57031 6.2188 1.7031 1.2812 1.1367 1.9219 2.9805 1.9219 5.5312z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm8.0156-20.484v4.5312h5.2656v3.6406h-5.2656v6.7656c0 0.74219 0.14453 1.2461 0.4375 1.5156 0.30078 0.26172 0.89062 0.39062 1.7656 0.39062h2.6094v3.6406h-4.3594c-2.0234 0-3.4531-0.41406-4.2969-1.25-0.83594-0.84375-1.25-2.2734-1.25-4.2969v-6.7656h-2.5312v-3.6406h2.5312v-4.5312z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm13.297-13.625v-8.5312h5.1406v22.156h-5.1406v-2.3125c-0.69922 0.94922-1.4688 1.6406-2.3125 2.0781-0.84375 0.42578-1.8242 0.64062-2.9375 0.64062-1.9688 0-3.5859-0.77344-4.8438-2.3281-1.2617-1.5625-1.8906-3.5781-1.8906-6.0469 0-2.457 0.62891-4.4688 1.8906-6.0312 1.2578-1.5625 2.875-2.3438 4.8438-2.3438 1.1016 0 2.0781 0.22656 2.9219 0.67188 0.85156 0.4375 1.6289 1.1211 2.3281 2.0469zm-3.3594 10.328c1.0938 0 1.9258-0.39453 2.5-1.1875 0.57031-0.80078 0.85938-1.9609 0.85938-3.4844 0-1.5078-0.28906-2.6641-0.85938-3.4688-0.57422-0.80078-1.4062-1.2031-2.5-1.2031-1.0859 0-1.9141 0.40234-2.4844 1.2031-0.57422 0.80469-0.85938 1.9609-0.85938 3.4688 0 1.5234 0.28516 2.6836 0.85938 3.4844 0.57031 0.79297 1.3984 1.1875 2.4844 1.1875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm10.938-3.2969c1.0938 0 1.9258-0.39453 2.5-1.1875 0.57031-0.80078 0.85938-1.9609 0.85938-3.4844 0-1.5078-0.28906-2.6641-0.85938-3.4688-0.57422-0.80078-1.4062-1.2031-2.5-1.2031s-1.9336 0.40234-2.5156 1.2031c-0.58594 0.80469-0.875 1.9609-0.875 3.4688 0 1.5117 0.28906 2.668 0.875 3.4688 0.58203 0.80469 1.4219 1.2031 2.5156 1.2031zm-3.3906-10.328c0.70703-0.92578 1.4883-1.6094 2.3438-2.0469 0.85156-0.44531 1.832-0.67188 2.9375-0.67188 1.9688 0 3.582 0.78125 4.8438 2.3438 1.2695 1.5625 1.9062 3.5742 1.9062 6.0312 0 2.4688-0.63672 4.4844-1.9062 6.0469-1.2617 1.5547-2.875 2.3281-4.8438 2.3281-1.1055 0-2.0859-0.21875-2.9375-0.65625-0.85547-0.4375-1.6367-1.125-2.3438-2.0625v2.3125h-5.0938v-22.156h5.0938z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.35938-15.953h5.0938l4.2969 10.828 3.6406-10.828h5.0938l-6.7031 17.469c-0.67969 1.7695-1.4648 3.0078-2.3594 3.7188-0.89844 0.70703-2.0781 1.0625-3.5469 1.0625h-2.9531v-3.3438h1.5938c0.86328 0 1.4922-0.14062 1.8906-0.42188 0.39453-0.27344 0.70312-0.76562 0.92188-1.4844l0.14062-0.4375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.6719-21.266h14.812v4.1406h-9.3281v3.9688h8.7656v4.1406h-8.7656v4.875h9.6406v4.1406h-15.125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.4531-22.156h5.0938v12.062l5.875-5.8594h5.9219l-7.7969 7.3281 8.4062 8.625h-6.1719l-6.2344-6.6562v6.6562h-5.0938z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm10.047-12.688c-1.1367 0-2 0.40625-2.5938 1.2188s-0.89062 1.9805-0.89062 3.5c0 1.5312 0.29688 2.7031 0.89062 3.5156s1.457 1.2188 2.5938 1.2188c1.1016 0 1.9453-0.40625 2.5312-1.2188 0.59375-0.8125 0.89062-1.9844 0.89062-3.5156 0-1.5195-0.29688-2.6875-0.89062-3.5-0.58594-0.8125-1.4297-1.2188-2.5312-1.2188zm0-3.6562c2.7383 0 4.8789 0.74609 6.4219 2.2344 1.5391 1.4805 2.3125 3.5273 2.3125 6.1406 0 2.625-0.77344 4.6797-2.3125 6.1562-1.543 1.4805-3.6836 2.2188-6.4219 2.2188-2.7617 0-4.918-0.73828-6.4688-2.2188-1.5547-1.4766-2.3281-3.5312-2.3281-6.1562 0-2.6133 0.77344-4.6602 2.3281-6.1406 1.5508-1.4883 3.707-2.2344 6.4688-2.2344z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.6719-21.266h9.1094c2.707 0 4.7852 0.60547 6.2344 1.8125 1.4453 1.1992 2.1719 2.9062 2.1719 5.125 0 2.2305-0.72656 3.9492-2.1719 5.1562-1.4492 1.1992-3.5273 1.7969-6.2344 1.7969h-3.625v7.375h-5.4844zm5.4844 3.9688v5.9375h3.0469c1.0625 0 1.8789-0.25391 2.4531-0.76562 0.58203-0.51953 0.875-1.2539 0.875-2.2031 0-0.94531-0.29297-1.6758-0.875-2.1875-0.57422-0.51953-1.3906-0.78125-2.4531-0.78125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.2812-6.2031v-9.75h5.125v1.5938c0 0.86719-0.007812 1.9531-0.015625 3.2656-0.011719 1.3047-0.015625 2.1719-0.015625 2.6094 0 1.2812 0.03125 2.2031 0.09375 2.7656 0.070312 0.5625 0.1875 0.97656 0.34375 1.2344 0.21875 0.33594 0.49219 0.58984 0.82812 0.76562 0.33203 0.17969 0.71875 0.26562 1.1562 0.26562 1.0625 0 1.8945-0.40625 2.5-1.2188 0.61328-0.8125 0.92188-1.9453 0.92188-3.4062v-7.875h5.0938v15.953h-5.0938v-2.3125c-0.77344 0.9375-1.5898 1.625-2.4531 2.0625-0.85547 0.4375-1.7969 0.65625-2.8281 0.65625-1.8438 0-3.25-0.5625-4.2188-1.6875-0.96094-1.1328-1.4375-2.7734-1.4375-4.9219z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm18.484-9.7188v9.7188h-5.125v-7.4375c0-1.375-0.03125-2.3203-0.09375-2.8438-0.0625-0.51953-0.16797-0.90625-0.3125-1.1562-0.19922-0.33203-0.46875-0.58594-0.8125-0.76562-0.34375-0.1875-0.73438-0.28125-1.1719-0.28125-1.0625 0-1.9023 0.41406-2.5156 1.2344-0.60547 0.8125-0.90625 1.9492-0.90625 3.4062v7.8438h-5.0938v-15.953h5.0938v2.3281c0.76953-0.92578 1.5859-1.6094 2.4531-2.0469 0.86328-0.44531 1.8164-0.67188 2.8594-0.67188 1.8438 0 3.2383 0.57031 4.1875 1.7031 0.95703 1.125 1.4375 2.7656 1.4375 4.9219z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.234-13.297c0.64453-0.98828 1.4102-1.7422 2.2969-2.2656 0.89453-0.51953 1.875-0.78125 2.9375-0.78125 1.832 0 3.2266 0.57031 4.1875 1.7031 0.95703 1.125 1.4375 2.7656 1.4375 4.9219v9.7188h-5.125v-8.3125-0.39062c0.007812-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.1328-0.16797-1.9531-0.5-2.4531-0.32422-0.50781-0.85938-0.76562-1.6094-0.76562-0.96875 0-1.7188 0.40234-2.25 1.2031-0.52344 0.79297-0.79297 1.9453-0.8125 3.4531v7.8281h-5.125v-8.3125c0-1.7695-0.15234-2.9062-0.45312-3.4062-0.30469-0.50781-0.84375-0.76562-1.625-0.76562-0.98047 0-1.7344 0.40234-2.2656 1.2031-0.53125 0.80469-0.79688 1.9492-0.79688 3.4375v7.8438h-5.125v-15.953h5.125v2.3281c0.625-0.89453 1.3438-1.5703 2.1562-2.0312 0.8125-0.45703 1.707-0.6875 2.6875-0.6875 1.1016 0 2.0781 0.26562 2.9219 0.79688s1.4844 1.2812 1.9219 2.25z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.953-22.156v3.3438h-2.8281c-0.71875 0-1.2266 0.13281-1.5156 0.39062-0.28125 0.26172-0.42188 0.71484-0.42188 1.3594v1.1094h4.3594v3.6406h-4.3594v12.312h-5.0938v-12.312h-2.5312v-3.6406h2.5312v-1.1094c0-1.7383 0.48438-3.0195 1.4531-3.8438 0.96875-0.83203 2.4688-1.25 4.5-1.25z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm18.484-9.7188v9.7188h-5.125v-7.4062c0-1.3945-0.03125-2.3516-0.09375-2.875-0.0625-0.51953-0.16797-0.90625-0.3125-1.1562-0.19922-0.33203-0.46875-0.58594-0.8125-0.76562-0.34375-0.1875-0.73438-0.28125-1.1719-0.28125-1.0625 0-1.9023 0.41406-2.5156 1.2344-0.60547 0.8125-0.90625 1.9492-0.90625 3.4062v7.8438h-5.0938v-22.156h5.0938v8.5312c0.76953-0.92578 1.5859-1.6094 2.4531-2.0469 0.86328-0.44531 1.8164-0.67188 2.8594-0.67188 1.8438 0 3.2383 0.57031 4.1875 1.7031 0.95703 1.125 1.4375 2.7656 1.4375 4.9219z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.6719-21.266h6.125l7.7344 14.578v-14.578h5.2031v21.266h-6.125l-7.7344-14.594v14.594h-5.2031z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.4531-15.953h5.0938v15.672c0 2.1328-0.51562 3.7656-1.5469 4.8906-1.0234 1.125-2.5078 1.6875-4.4531 1.6875h-2.5156v-3.3438h0.89062c0.96875 0 1.6289-0.21875 1.9844-0.65625 0.36328-0.4375 0.54688-1.2969 0.54688-2.5781zm0-6.2031h5.0938v4.1562h-5.0938z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm15.344-15.453v4.1562c-0.69922-0.46875-1.3984-0.81641-2.0938-1.0469-0.69922-0.22656-1.4219-0.34375-2.1719-0.34375-1.4297 0-2.5391 0.41797-3.3281 1.25-0.79297 0.82422-1.1875 1.9805-1.1875 3.4688 0 1.5 0.39453 2.668 1.1875 3.5 0.78906 0.82422 1.8984 1.2344 3.3281 1.2344 0.80078 0 1.5547-0.11719 2.2656-0.35938 0.71875-0.23828 1.3828-0.58594 2-1.0469v4.1719c-0.80469 0.29297-1.6172 0.50781-2.4375 0.65625-0.8125 0.14453-1.6367 0.21875-2.4688 0.21875-2.875 0-5.125-0.73438-6.75-2.2031-1.625-1.4766-2.4375-3.5352-2.4375-6.1719 0-2.625 0.8125-4.6758 2.4375-6.1562 1.625-1.4766 3.875-2.2188 6.75-2.2188 0.83203 0 1.6562 0.078125 2.4688 0.23438 0.8125 0.14844 1.625 0.36719 2.4375 0.65625z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm486.06 377.67c-46.188 0-83.762 37.574-83.762 83.762 0 38.285-31.145 69.43-69.422 69.43s-69.422-31.145-69.422-69.43v-18.789h2.6758c11.969 0 21.707-9.7344 21.707-21.707v-7.375h21.949c35.238 0 63.91-28.672 63.91-63.91v-225.96c0-35.238-28.672-63.914-63.91-63.914h-8.6211v-15.32c0-16.352-13.305-29.656-29.656-29.656h-30.457c-16.352 0-29.656 13.305-29.656 29.656v15.316h-17.324c-35.238 0-63.91 28.672-63.91 63.914v225.96c0 35.238 28.672 63.91 63.91 63.91h30.652v7.375c0 11.969 9.7344 21.707 21.707 21.707h2.6836v18.789c0 46.188 37.574 83.762 83.762 83.762s83.762-37.574 83.762-83.762c0-38.285 31.145-69.422 69.422-69.422 38.285 0 69.43 31.145 69.43 69.422v25.957c0 3.9609 3.207 7.168 7.168 7.168 3.9609 0 7.168-3.207 7.168-7.168v-25.957c0-46.188-37.578-83.762-83.766-83.762zm-260.32-333.21c0-8.4453 6.8711-15.316 15.316-15.316h30.457c8.4453 0 15.316 6.8711 15.316 15.316v15.316l-61.09 0.003906zm-31.656 29.656h115.71c25.305 0 46.199 19.07 49.176 43.586h-49.484c-3.9531 0-7.168 3.207-7.168 7.168 0 3.9609 3.207 7.168 7.168 7.168h49.879v31.559h-49.879c-3.9531 0-7.168 3.207-7.168 7.168s3.207 7.168 7.168 7.168h49.879v31.559h-49.879c-3.9531 0-7.168 3.207-7.168 7.168 0 3.9609 3.207 7.168 7.168 7.168h49.879v31.184c-52.289 18.023-72.93 9.0312-96.59-1.4414-24.727-10.941-52.703-23.203-118.27-3.207v-126.67c-0.003906-27.34 22.238-49.578 49.574-49.578zm-49.578 275.54v-84.273c63.473-20.246 88.434-9.3438 112.47 1.3008 14.473 6.3984 29.219 12.934 51.043 12.934 13.742 0 30.297-2.5977 51.344-9.4375v79.484c0 27.336-22.238 49.57-49.57 49.57h-115.71c-27.336-0.007813-49.578-22.25-49.578-49.578zm94.562 71.281v-7.375h34.441v7.375c0 4.0664-3.3086 7.3672-7.375 7.3672h-19.691c-4.0664 0.003906-7.375-3.3047-7.375-7.3672z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#t')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '91.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '105.789062'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '125.570312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '145.253906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '159.195312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '178.976562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '210.007812'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '230.886719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '260.054688'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '279.976562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '299.375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '329.566406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '350.941406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '371.707031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '386.089844'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '406.855469'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '426.894531'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '457.285156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '647.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '82.6875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '97.074219'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '117.109375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '157.65625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '171.597656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '192.363281'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '222.300781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '246.710938'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '266.746094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '287.511719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '318.429688'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '339.804688'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '354.191406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '374.226562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '384.226562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '404.007812'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '421.296875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '676.667969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$kristeller = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm18.766-1.125c-0.96875 0.5-1.9805 0.875-3.0312 1.125-1.043 0.25781-2.1367 0.39062-3.2812 0.39062-3.3984 0-6.0898-0.94531-8.0781-2.8438-1.9922-1.9062-2.9844-4.4844-2.9844-7.7344 0-3.2578 0.99219-5.8359 2.9844-7.7344 1.9883-1.9062 4.6797-2.8594 8.0781-2.8594 1.1445 0 2.2383 0.13281 3.2812 0.39062 1.0508 0.25 2.0625 0.625 3.0312 1.125v4.2188c-0.98047-0.65625-1.9453-1.1406-2.8906-1.4531-0.94922-0.3125-1.9492-0.46875-3-0.46875-1.875 0-3.3516 0.60547-4.4219 1.8125-1.0742 1.1992-1.6094 2.8555-1.6094 4.9688 0 2.1055 0.53516 3.7617 1.6094 4.9688 1.0703 1.1992 2.5469 1.7969 4.4219 1.7969 1.0508 0 2.0508-0.14844 3-0.45312 0.94531-0.3125 1.9102-0.80078 2.8906-1.4688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm13.734-11.141c-0.4375-0.19531-0.87109-0.34375-1.2969-0.4375-0.41797-0.10156-0.83984-0.15625-1.2656-0.15625-1.2617 0-2.2305 0.40625-2.9062 1.2188-0.67969 0.80469-1.0156 1.9531-1.0156 3.4531v7.0625h-4.8906v-15.312h4.8906v2.5156c0.625-1 1.3438-1.7266 2.1562-2.1875 0.82031-0.46875 1.8008-0.70312 2.9375-0.70312 0.16406 0 0.34375 0.011719 0.53125 0.03125 0.19531 0.011719 0.47656 0.039062 0.84375 0.078125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.641-7.7031v1.4062h-11.453c0.125 1.1484 0.53906 2.0078 1.25 2.5781 0.70703 0.57422 1.7031 0.85938 2.9844 0.85938 1.0312 0 2.082-0.14844 3.1562-0.45312 1.082-0.3125 2.1914-0.77344 3.3281-1.3906v3.7656c-1.1562 0.4375-2.3125 0.76562-3.4688 0.98438-1.1562 0.22656-2.3125 0.34375-3.4688 0.34375-2.7734 0-4.9297-0.70312-6.4688-2.1094-1.5312-1.4062-2.2969-3.3789-2.2969-5.9219 0-2.5 0.75391-4.4609 2.2656-5.8906 1.5078-1.4375 3.582-2.1562 6.2188-2.1562 2.4062 0 4.332 0.73047 5.7812 2.1875 1.4453 1.4492 2.1719 3.3828 2.1719 5.7969zm-5.0312-1.625c0-0.92578-0.27344-1.6719-0.8125-2.2344-0.54297-0.57031-1.25-0.85938-2.125-0.85938-0.94922 0-1.7188 0.26562-2.3125 0.79688s-0.96484 1.2969-1.1094 2.2969z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.2188-6.8906c-1.0234 0-1.793 0.17188-2.3125 0.51562-0.51172 0.34375-0.76562 0.85547-0.76562 1.5312 0 0.625 0.20703 1.1172 0.625 1.4688 0.41406 0.34375 0.98828 0.51562 1.7188 0.51562 0.92578 0 1.7031-0.32812 2.3281-0.98438 0.63281-0.66406 0.95312-1.4922 0.95312-2.4844v-0.5625zm7.4688-1.8438v8.7344h-4.9219v-2.2656c-0.65625 0.92969-1.3984 1.6055-2.2188 2.0312-0.82422 0.41406-1.8242 0.625-3 0.625-1.5859 0-2.8711-0.45703-3.8594-1.375-0.99219-0.92578-1.4844-2.1289-1.4844-3.6094 0-1.7891 0.61328-3.1016 1.8438-3.9375 1.2383-0.84375 3.1797-1.2656 5.8281-1.2656h2.8906v-0.39062c0-0.76953-0.30859-1.332-0.92188-1.6875-0.61719-0.36328-1.5703-0.54688-2.8594-0.54688-1.0547 0-2.0312 0.10547-2.9375 0.3125-0.89844 0.21094-1.7305 0.52344-2.5 0.9375v-3.7344c1.0391-0.25 2.0859-0.44141 3.1406-0.57812 1.0625-0.13281 2.125-0.20312 3.1875-0.20312 2.7578 0 4.75 0.54688 5.9688 1.6406 1.2266 1.0859 1.8438 2.8555 1.8438 5.3125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm7.7031-19.656v4.3438h5.0469v3.5h-5.0469v6.5c0 0.71094 0.14062 1.1875 0.42188 1.4375s0.83594 0.375 1.6719 0.375h2.5156v3.5h-4.1875c-1.9375 0-3.3125-0.39844-4.125-1.2031-0.80469-0.8125-1.2031-2.1797-1.2031-4.1094v-6.5h-2.4219v-3.5h2.4219v-4.3438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.766-13.078v-8.2031h4.9219v21.281h-4.9219v-2.2188c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2969 1.8125-5.7969 1.207-1.5 2.7539-2.25 4.6406-2.25 1.0625 0 2 0.21484 2.8125 0.64062 0.82031 0.42969 1.5664 1.0859 2.2344 1.9688zm-3.2188 9.9219c1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm10.5-3.1562c1.0508 0 1.8516-0.37891 2.4062-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3555-1.1562-2.4062-1.1562-1.0547 0-1.8594 0.38672-2.4219 1.1562-0.55469 0.77344-0.82812 1.8828-0.82812 3.3281 0 1.4492 0.27344 2.5586 0.82812 3.3281 0.5625 0.77344 1.3672 1.1562 2.4219 1.1562zm-3.25-9.9219c0.67578-0.88281 1.4219-1.5391 2.2344-1.9688 0.82031-0.42578 1.7656-0.64062 2.8281-0.64062 1.8945 0 3.4453 0.75 4.6562 2.25 1.207 1.5 1.8125 3.4336 1.8125 5.7969 0 2.3555-0.60547 4.2812-1.8125 5.7812-1.2109 1.5-2.7617 2.25-4.6562 2.25-1.0625 0-2.0078-0.21094-2.8281-0.625-0.8125-0.42578-1.5586-1.0859-2.2344-1.9844v2.2188h-4.8906v-21.281h4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.34375-15.312h4.8906l4.125 10.391 3.5-10.391h4.8906l-6.4375 16.766c-0.64844 1.6953-1.4023 2.8828-2.2656 3.5625-0.86719 0.6875-2 1.0312-3.4062 1.0312h-2.8438v-3.2188h1.5312c0.83203 0 1.4375-0.13672 1.8125-0.40625 0.38281-0.26172 0.67969-0.73047 0.89062-1.4062l0.14062-0.42188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.953-3.7188h-8.2188l-1.3125 3.7188h-5.2812l7.5625-20.406h6.2656l7.5625 20.406h-5.2812zm-6.9062-3.7812h5.5781l-2.7812-8.125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'u'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.312h-4.8906zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1406c0-1.3203-0.03125-2.2344-0.09375-2.7344s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-15.312h4.8906v2.2344c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.6406-12.188c-1.0859 0-1.9141 0.39062-2.4844 1.1719-0.57422 0.78125-0.85938 1.9062-0.85938 3.375s0.28516 2.5938 0.85938 3.375c0.57031 0.77344 1.3984 1.1562 2.4844 1.1562 1.0625 0 1.875-0.38281 2.4375-1.1562 0.57031-0.78125 0.85938-1.9062 0.85938-3.375s-0.28906-2.5938-0.85938-3.375c-0.5625-0.78125-1.375-1.1719-2.4375-1.1719zm0-3.5c2.6328 0 4.6914 0.71484 6.1719 2.1406 1.4766 1.418 2.2188 3.3867 2.2188 5.9062 0 2.5117-0.74219 4.4805-2.2188 5.9062-1.4805 1.418-3.5391 2.125-6.1719 2.125-2.6484 0-4.7148-0.70703-6.2031-2.125-1.4922-1.4258-2.2344-3.3945-2.2344-5.9062 0-2.5195 0.74219-4.4883 2.2344-5.9062 1.4883-1.4258 3.5547-2.1406 6.2031-2.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 't'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.5469-12.125c-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406 1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562zm3.2188 9.9062c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2891 1.8125-5.7812 1.207-1.4883 2.7539-2.2344 4.6406-2.2344 1.0703 0 2.0156 0.21484 2.8281 0.64062 0.8125 0.41797 1.5508 1.0742 2.2188 1.9688v-2.2656h4.9219v21.141h-4.9219z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.1875-5.9688v-9.3438h4.9219v1.5312c0 0.83594-0.007813 1.875-0.015625 3.125-0.011719 1.25-0.015625 2.0859-0.015625 2.5 0 1.2422 0.03125 2.1328 0.09375 2.6719 0.070313 0.54297 0.17969 0.93359 0.32812 1.1719 0.20703 0.32422 0.47266 0.57422 0.79688 0.75 0.32031 0.16797 0.69141 0.25 1.1094 0.25 1.0195 0 1.8203-0.39062 2.4062-1.1719 0.58203-0.78125 0.875-1.8672 0.875-3.2656v-7.5625h4.8906v15.312h-4.8906v-2.2188c-0.74219 0.89844-1.5234 1.5586-2.3438 1.9844-0.82422 0.41406-1.7344 0.625-2.7344 0.625-1.7617 0-3.1055-0.53906-4.0312-1.625-0.92969-1.082-1.3906-2.6602-1.3906-4.7344z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.422-21.281v3.2188h-2.7031c-0.6875 0-1.1719 0.125-1.4531 0.375-0.27344 0.25-0.40625 0.6875-0.40625 1.3125v1.0625h4.1875v3.5h-4.1875v11.812h-4.8906v-11.812h-2.4375v-3.5h2.4375v-1.0625c0-1.6641 0.46094-2.8984 1.3906-3.7031 0.92578-0.80078 2.3672-1.2031 4.3281-1.2031z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm16.547-12.766c0.61328-0.94531 1.3477-1.6719 2.2031-2.1719 0.85156-0.5 1.7891-0.75 2.8125-0.75 1.7578 0 3.0977 0.54688 4.0156 1.6406 0.92578 1.0859 1.3906 2.6562 1.3906 4.7188v9.3281h-4.9219v-7.9844-0.35938c0.007813-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.082-0.16406-1.8633-0.48438-2.3438-0.3125-0.48828-0.82422-0.73438-1.5312-0.73438-0.92969 0-1.6484 0.38672-2.1562 1.1562-0.51172 0.76172-0.77344 1.8672-0.78125 3.3125v7.5156h-4.9219v-7.9844c0-1.6953-0.14844-2.7852-0.4375-3.2656-0.29297-0.48828-0.8125-0.73438-1.5625-0.73438-0.9375 0-1.6641 0.38672-2.1719 1.1562-0.51172 0.76172-0.76562 1.8594-0.76562 3.2969v7.5312h-4.9219v-15.312h4.9219v2.2344c0.60156-0.86328 1.2891-1.5156 2.0625-1.9531 0.78125-0.4375 1.6406-0.65625 2.5781-0.65625 1.0625 0 2 0.25781 2.8125 0.76562 0.8125 0.51172 1.4258 1.2305 1.8438 2.1562z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1094c0-1.3438-0.03125-2.2656-0.09375-2.7656s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-21.281h4.8906v8.2031c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h5.875l7.4219 14v-14h4.9844v20.406h-5.875l-7.4219-14v14h-4.9844z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h8.7344c2.5938 0 4.582 0.57812 5.9688 1.7344 1.3945 1.1484 2.0938 2.7891 2.0938 4.9219 0 2.1367-0.69922 3.7812-2.0938 4.9375-1.3867 1.1562-3.375 1.7344-5.9688 1.7344h-3.4844v7.0781h-5.25zm5.25 3.8125v5.7031h2.9219c1.0195 0 1.8047-0.25 2.3594-0.75 0.5625-0.5 0.84375-1.2031 0.84375-2.1094 0-0.91406-0.28125-1.6172-0.84375-2.1094-0.55469-0.48828-1.3398-0.73438-2.3594-0.73438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.031c0 2.0508-0.49609 3.6172-1.4844 4.7031-0.98047 1.082-2.4062 1.625-4.2812 1.625h-2.4219v-3.2188h0.85938c0.92578 0 1.5625-0.21094 1.9062-0.625 0.35156-0.41797 0.53125-1.2461 0.53125-2.4844zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.719-14.828v3.9844c-0.65625-0.45703-1.3242-0.79688-2-1.0156-0.66797-0.21875-1.3594-0.32812-2.0781-0.32812-1.3672 0-2.4336 0.40234-3.2031 1.2031-0.76172 0.79297-1.1406 1.9062-1.1406 3.3438 0 1.4297 0.37891 2.543 1.1406 3.3438 0.76953 0.79297 1.8359 1.1875 3.2031 1.1875 0.75781 0 1.4844-0.10938 2.1719-0.32812 0.6875-0.22656 1.3203-0.56641 1.9062-1.0156v4c-0.76172 0.28125-1.5391 0.48828-2.3281 0.625-0.78125 0.14453-1.5742 0.21875-2.375 0.21875-2.7617 0-4.9219-0.70703-6.4844-2.125-1.5547-1.4141-2.3281-3.3828-2.3281-5.9062 0-2.5312 0.77344-4.5039 2.3281-5.9219 1.5625-1.4141 3.7227-2.125 6.4844-2.125 0.80078 0 1.5938 0.074219 2.375 0.21875 0.78125 0.13672 1.5547 0.35156 2.3281 0.64062z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm607.6 269.92c-9.5195-22.398-44.238-19.602-57.68-15.121-3.3594 1.1211-7.8398 3.9219-12.32 6.7188-3.9219 2.8008-44.801 30.238-44.801 30.238l-38.078-19.602c-10.078-5.0391-22.398-1.1211-27.441 8.9609-5.0391 10.078-1.1211 22.398 8.9609 27.441l48.719 24.641c2.8008 1.6797 6.1602 2.2383 8.9609 2.2383 3.9219 0 7.8398-1.1211 11.199-3.3594l19.602-12.879v7.8398c0 21.84 3.9219 72.238 4.4805 74.48 0.55859 3.3594 2.2383 6.1602 6.7188 6.1602h73.359c3.9219 0 6.1602-2.8008 6.1602-6.7188 0.55859-44.801 2.2383-106.96-7.8398-131.04z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm609.28 197.12c0 24.434-19.809 44.238-44.242 44.238-24.434 0-44.238-19.805-44.238-44.238s19.805-44.242 44.238-44.242c24.434 0 44.242 19.809 44.242 44.242')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm471.32 168.12c9.1836 9.1875 9.1836 24.078 0 33.262-9.1875 9.1875-24.078 9.1875-33.262 0-9.1875-9.1836-9.1875-24.074 0-33.262 9.1836-9.1836 24.074-9.1836 33.262 0')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm352.8 256.48 14-14 11.762 23.52c0 0.55859 0.55859 1.1211 1.1211 1.6797 3.3594 4.4805 8.3984 7.2812 14 7.8398 5.6016 0.55859 11.199-1.6797 15.121-5.6016l35.281-35.281c4.4805-4.4805 4.4805-11.199 0-15.68l-41.441-41.441c-4.4805-4.4805-11.199-4.4805-15.68 0-4.4805 4.4805-4.4805 11.199 0 15.68l17.359 17.359-20.16 20.16-5.6016-11.762c-1.6797-3.3594-4.4805-5.0391-7.8398-5.6016-3.3594-0.55859-6.7188 0.55859-9.5195 2.8008l-24.641 24.641c-4.4805 4.4805-4.4805 11.199 0 15.68 5.0391 4.4883 11.758 4.4883 16.238 0.007813z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm144.7 171.54c22.73 8.957 33.898 34.645 24.945 57.375-8.9531 22.734-34.641 33.902-57.375 24.949-22.73-8.957-33.902-34.645-24.945-57.375 8.9531-22.734 34.641-33.902 57.375-24.949')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm386.4 296.24c-4.4805-5.6016-11.762-8.9609-19.039-9.5195-7.2812-0.55859-14.559 2.8008-19.602 7.8398-10.641 11.199-22.398 21.84-33.602 31.922-7.8398-17.922-24.078-31.359-45.359-34.16l-31.918-6.7188c1.6797-12.32-2.2383-25.199-8.3984-26.32-7.2812-1.6797-20.719-1.1211-33.039 1.6797-4.4805 1.1211-9.5195 0.55859-14.559-0.55859-6.7188-1.6797-11.762-1.6797-12.32-1.6797-37.52-1.6797-53.762 25.762-56 45.359l-14.004 73.359c-1.1211 6.1602 0.55859 12.879 4.4805 17.359 3.9219 5.0391 10.078 7.8398 16.238 7.8398h52.078c10.641 0 20.16-7.2812 21.84-17.922 2.2383-13.441-7.8398-24.641-20.719-24.641h-27.441l3.3594-16.801c10.641 0 25.199 1.1211 36.398 5.6016 12.879 5.0391 21.281 19.602 37.52 35.84l3.3594 3.3594c1.1211 0.55859 1.6797 1.6797 2.8008 2.2383 3.9219 3.3594 8.3984 6.1602 12.879 8.3984 8.3984 5.0391 18.48 7.8398 29.121 7.8398 2.2383 0 4.4805 0 6.1602-0.55859 26.32-2.8008 62.719-32.48 87.922-56.559l38.078 45.922c8.3984 10.641 24.078 13.441 34.719 6.1602 12.879-8.3984 15.121-26.32 5.6016-37.52z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '90.550781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '104.359375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.347656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '142.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '155.628906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '174.617188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '204.410156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '224.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '252.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '274.121094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '294.164062'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '307.972656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#u')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '317.570312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '336.5625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '366.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '386.789062'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '406.027344'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#t')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '426.070312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '446.003906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '464.992187'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '82.183594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '95.992188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '115.226562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '154.152344'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '167.535156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '187.46875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '216.207031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '239.640625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '258.878906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '278.8125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '308.492188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '329.015625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '342.820312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '362.058594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '371.65625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '390.648438'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '407.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$movement = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm521.77 80.191c-5.2305-2.9453-8.0391-7.8906-12.699-11.398-3.7266-2.5625-7.875-4.4492-12.254-5.5742-12.277-3.7227-25.5-4.1328-37.93-7.4492-12.555-3.2227-25.492-4.7344-38.453-4.4961-5.7539-0.0625-11.484 0.75-16.996 2.4062-2.0859 0.74219-3.9414 2.0156-5.3867 3.6953l-1.0078 0.55859c-16.312 15.324-30.762 32.516-43.055 51.219-12.082 19.648-22.281 40.395-30.461 61.965-4.3359 10.137-8.7539 20.121-12.48 30.5-4.7617 13.281-8.5352 26.789-14.094 39.789-9.3555 19.777-24.27 36.402-42.918 47.84-27.758 19.164-69.238 36.062-76.566 72.867v0.003907c-2.2969 18.703-1.375 37.664 2.7227 56.062 2.4375 15.93 9.6992 30.715 11.402 46.797 1.0586 10.016-3.6797 13.859-11.871 18.668-8.1406 4.7812-17.434 7.0273-25.605 11.742-2.4727 1.4258-1.4688 6.0703 1.6289 5.6602 14.668-2.5742 28.438-8.8438 40.012-18.215 12.004-9.9219 6.4961-26.398 2.6875-39.367-9.5664-32.609-25.133-76.219 1.6328-104.48v-0.003907c14.109-12.887 29.742-24 46.551-33.09 16.266-9.3828 30.824-21.449 43.059-35.691 0.19922 3.2344 0.86719 6.4219 1.9766 9.4648 0.20703 0.63281 0.80078 1.0547 1.4688 1.0469 0.66406-0.011719 1.2461-0.45312 1.4336-1.0938 1.1719-4.2734 1.75-8.6875 1.7188-13.117 0.30859-3.6641 1.1523-7.2148 1.5469-10.824l0.76953-2.1914h0.003906c7.3242-4.0938 15.109-7.2969 23.195-9.5391 9.8633-1.9023 20.004-1.793 29.824 0.31641 1.1523 0.26563 2.3438-0.26172 2.9258-1.293 0.58203-1.0312 0.41406-2.3242-0.41016-3.1719-9.4219-6.5664-21.547-7.8594-32.145-3.4297-7.5508 1.7891-14.676 5.0469-20.969 9.5859l1.6602-5.5273c3.8594-12.656 7.4375-25.387 11.656-37.941 8.2695-23.168 19.699-45.082 33.965-65.125 16.82-24.773 33.852-49.367 51.102-73.781l1.1914-0.20703c1.7266-0.63281 3.3906-1.4219 4.9727-2.3594 3.0625-1.0039 6.2422-1.6016 9.457-1.7812 12.406-0.73437 24.855-0.41016 37.207 0.97656 12.945 1.2656 25.801 3.3672 38.477 6.293 10.652 3.8086 20.812 8.8711 30.27 15.078 0.92578 0.40234 1.6953-0.87109 0.78516-1.3828z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm449.7 389.57c-19.012-10.438-37.789-21.281-56.738-31.859-9.1328-5.0977-17.375-11.594-26.719-16.371-9.1133-4.3359-19.148-6.3789-29.23-5.9492-23.328 1.4258-46.238 6.8477-67.73 16.023-9.3516 3.5781-18.641 7.543-28.203 10.551-7.7695 2.4648-20.07 6.6641-26.648-0.24609-1.0391-1.0859-2.4922 0.33594-1.9219 1.5273l0.003906-0.003907c2.9961 6.0742 8.8555 10.227 15.582 11.043l0.011718 0.066406c1.4805 14.141-0.36719 28.434-5.3984 41.73-1.5273 6.8789-2.5742 13.848-3.1445 20.867-0.63672 8.2266 3.3242 12.32 6.4258 19.137 0.51562 1.1406 2.4727 0.28125 2.0039-0.87891-1.2461-3.1094 0.64453-7.2422 1.1133-10.344l0.40234-2.6875-0.003906 0.003906c0.54688 8.9336 2.8398 17.676 6.7461 25.73 5.3867 11.512 15.047 20.473 26.93 24.977 31.004 9.6055 64.07 10.367 95.484 2.2031 23.617-4.5352 45.031-16.852 60.824-34.988 7.5977-9.8164 12.34-21.539 13.715-33.879 1.3711-12.336-0.68359-24.812-5.9375-36.062-1.1016-2.2266-4.2383-0.50781-3.7773 1.668 3.1406 14.887 0.76172 30.406-6.6914 43.668-19.527 3.375-39.574-1.5977-55.258-13.711-10.633-7.125-20.414-15.449-29.145-24.805-8.1094-7.4766-14.777-16.371-19.68-26.246-0.26172-0.61719-1.2383-0.375-1.0195 0.29297 8.6406 23.832 24.441 44.41 45.234 58.91 10.738 8.207 23.156 13.941 36.367 16.789 5.2188 1.0664 10.582 1.2344 15.859 0.49609-1.207 1.582-2.4531 3.1406-3.7773 4.668h-0.003906c-2.0977 2.4141-4.3672 4.668-6.7969 6.7461-10.824 2.875-21.902 4.6914-33.078 5.4258-13.273-0.5-26.18-4.4805-37.426-11.543-11.902-6.5508-22.172-15.707-30.039-26.785-7.625-10.547-13.34-22.32-20.672-33.059-0.67188-0.98438-2.2305-0.054687-1.5898 0.96484 8.0195 12.566 12.465 26.746 19.711 39.684 7.7812 12.512 17.922 23.391 29.855 32.031 10.117 7.8867 22.551 12.227 35.375 12.344l-4.543 1.2148c-25.469 6.2539-51.992 6.9023-77.738 1.9062-11.078-1.6953-21.387-6.6992-29.566-14.355-9.2578-8.3984-15.449-19.645-17.598-31.961l-0.45703-0.85156 0.33594-2.1523c1.0977-6.6523 2.5039-13.277 4.0977-19.824v0.003906c4.332-11.883 5.8164-24.613 4.3359-37.176 3.3789-0.39453 6.7148-1.0938 9.9688-2.0977 11.555-3.5234 22.703-8.8477 33.98-13.164 12.07-4.4648 24.441-8.0625 37.023-10.77 12.496-3.3906 25.73-2.8984 37.941 1.4062 10.07 5.1562 19.734 11.066 28.91 17.68 18.055 13.473 38.914 22.695 61.027 26.98 2.7109 0.25 3.4414-3.7773 1.2656-4.9688z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm364.5 216.36c-10.07 4.6484-21.562 5.1602-32.004 1.4219-1.1133-0.62109-2.3984 0.97656-1.3594 1.8203 8.1445 6.6328 29.422 11.039 35.504-0.54688 0.35547-0.66016 0.28125-1.4688-0.18359-2.0547-0.46484-0.58594-1.2344-0.83594-1.957-0.64062z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm389.5 142.86c-12.684 15.715-30.695 26.234-50.613 29.562-3.0312 0.99219-4.7266 4.2109-3.8359 7.2734 0.89453 3.0625 4.0547 4.8633 7.1445 4.0742 10.996-1.7305 21.434-6.0039 30.484-12.488 8.2891-7.6094 14.355-17.332 17.543-28.129 0.16797-0.44141-0.49219-0.66016-0.72266-0.29297z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm473.03 256.98c-2.3633-5.4531-6.1484-10.168-10.957-13.664-6.0703-5.2109-15.141-8.4258-19.699-14.953-0.34375-0.51172-1.0312-0.66797-1.5586-0.34766-0.53125 0.32031-0.71094 1-0.41406 1.543 1.9844 4.375 4.4375 8.5234 7.3086 12.371 3.5508 3.8789 7.6914 7.0938 11.441 10.766 4.5859 4.5156 8.0664 10.031 10.176 16.109 1.1289 8.0859 0.72656 16.312-1.1875 24.25-0.53125 4.2422-1.3633 8.4414-2.4844 12.566-0.99219 3.5898-2.4727 11.836-6.2578 13.441-3.1875 1.3594-7.1602-0.51562-10.305-1.1992-2.3242-0.18359-4.6602 0.085937-6.8828 0.78906-2.0352 0.45703-4.0352 1.0586-5.9844 1.793-8.4727-4.3203-15.711-10.715-21.039-18.594-4.5312-6.5312-10.109-12.27-16.504-16.988 0.76562-9.3789-1.2969-18.773-5.9219-26.969 5.5547-0.10156 10.922-2.0195 15.281-5.4648 4.3594-3.4453 7.4688-8.2227 8.8516-13.605 2.1875-3.3633 4.1914-6.8477 6.0039-10.43 3.8203-6.3281 9.4805-11.34 16.227-14.367 1.0078-0.38672 0.92578-2.0977-0.30078-1.9883-6.7539 0.21875-13.109 3.2266-17.559 8.3125 1.332-13.305 1.9922-26.672 1.9805-40.043l0.16016-0.69141-0.10156-0.82422 0.007812-0.12109c0.054688-1.1602-1.7266-1.3242-2.0039-0.24219l-0.16016 0.69531c-4.2578 10.863-14.395 21.176-27.121 15.875-9.4453-3.9219-11.547-17.633-11.574-26.508 0-1.1602-1.6797-1.0938-1.7695 0.027344-1.1406 14.316-3.0234 30.434 13.402 36.254l0.003906 0.003906c4.3359 1.8828 9.2422 1.9766 13.648 0.25391 4.4023-1.7188 7.9453-5.1133 9.8555-9.4375-2.2695 12.039-4.0469 24.121-6.4766 36.188v-0.003906c-0.21875 1.0625-0.50391 2.1094-0.85547 3.1367l-1.1914 2.9336h-0.003906c-4.5469 7.3438-11.98 12.426-20.469 14-5.8516-7.1094-13.898-12.078-22.879-14.125-1.3359-0.30078-2.6953 0.41016-3.2109 1.6836-0.51172 1.2695-0.027343 2.7266 1.1445 3.4375 11.043 6.2188 19.504 16.18 23.855 28.082 3.0859 12.867-0.71094 26.418-10.043 35.805-10.68 10.121-25.754 14.156-40.062 10.719-11.336-2.3398-29.793-7.3477-34.312-19.426-0.50391-1.3242-2.625-0.72266-2.1289 0.61719v-0.003906c7.332 14.637 20.961 25.113 36.988 28.438 16.031 3.3242 32.699-0.86719 45.246-11.379 5.543-4.7695 9.8281-10.832 12.473-17.645l2.2773 2.0781c4.5938 4.6016 8.875 9.5586 13.828 13.777v-0.003906c4.9141 4.5391 10.895 7.7617 17.391 9.3711l-3.6953 1.4414c-0.98828 0.31641-1.6523 1.2422-1.6367 2.2812 0.015625 1.0352 0.70703 1.9414 1.7031 2.2305 5.6602 2.0547 10.801-1.6406 15.992-3.832 6.5898-2.7852 13.918-1.207 20.363-3.9453 4.043-1.0156 7.4492-3.7383 9.3281-7.4609 1.7812-4.8047 2.7148-9.8828 2.7656-15.008 2.3828-13.93 2.0586-28.191-0.95312-42z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm508.56 447.93c-3.1133-17.516-5.9414-35.281-10.746-52.438h0.003906c-2.8203-13.281-7.2891-26.152-13.309-38.316-6.1016-8.6992-15.031-15.016-25.266-17.875 3.8828 0.82031 7.918 0.54297 11.656-0.79297 3.7383-1.3359 7.0312-3.6797 9.5156-6.7734 3.8438-6.3086 6.7734-13.129 8.7109-20.258 3.0898-8.9844 5.6094-18.152 7.5352-27.457 3.8125-15.633 1.1367-32.145-7.4141-45.773-10.109-16.129-24-29.344-35.121-44.672-0.55859-0.77734-1.8008-0.058594-1.2852 0.77734 15.098 24.609 39.055 46.953 37.559 77.926-1.5156 15.566-5.0586 30.871-10.531 45.523-2.3516 7.207-5.2266 14.77-13.727 15.77-5.9883 0.70312-11.73-1.3672-17.785-0.50391-2.2383 0.32031-3.1016 3.7031-0.50781 4.2656l3.1289 0.65625c8.4883 8.207 20.07 13.305 26.051 23.707l0.003906 0.003906c5.6289 11.516 9.7852 23.695 12.363 36.25 3.9141 14.289 6.7266 29.031 9.3594 43.609 0.91406 6.1328 2.1953 12.207 3.832 18.188 1.5273 4.9922 7.4375 15.254 5.4453 20.203-0.69141 1.707 1.8555 2.3789 2.7578 1.1211 7.2344-10.074-0.36719-22.652-2.2305-33.141z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm479.26 177.69c-2.8008-6.6172-15.367-17.359-11.562-24.863v-0.003907c4.2344-5.9531 7.0977-12.773 8.3828-19.969 0.44141-8.1016-1.832-16.121-6.4648-22.781-4.5391-4.8555-10.324-8.3711-16.723-10.156-6.4023-1.7852-13.172-1.7773-19.566 0.027344-16.828 2.9023-23.832 15.73-32.145 29.047l0.21484 0.16016c8.8086-11.223 21.273-18.996 35.227-21.965 5.8555-0.70703 11.793-0.25391 17.473 1.332 3.6289 1.4727 6.7812 3.918 9.1172 7.0625 2.332 3.1445 3.7539 6.8711 4.1133 10.77 1.2969 7.4219-0.80078 15.031-5.7109 20.738-2.6953 4.4492-2.9922 9.9492-0.79688 14.664 2.6523 5.1641 5.8672 10.023 9.5781 14.488 4.0547 7.4023 6.6758 15.504 7.7266 23.875 0.20312 0.63672 0.79688 1.0664 1.4609 1.0586 0.66797-0.011719 1.25-0.45703 1.4336-1.0977 1.8984-7.4531 1.2812-15.324-1.7578-22.387z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm453.75 150.83c-5.3008-10.375-7.3477-22.113-5.8672-33.668 0.11328-0.42578-0.14453-0.86328-0.56641-0.97266-0.42578-0.10938-0.86328 0.14453-0.97266 0.57031-4 8.2578-5.8555 17.391-5.4023 26.555 1.0703 4.2461 2.8359 8.2812 5.2305 11.949-3.4648 1.2656-7.5156 4.0039-9.7812 4.8711-10.703 4.1055-31.551 10.055-37.633-3.4727-0.34766-0.76953-1.6602-0.19531-1.3594 0.60156 1.6641 4.1914 4.582 7.7656 8.3555 10.234 3.7773 2.4688 8.2188 3.7109 12.727 3.5586 10.914 0.14844 21.617-2.9961 30.715-9.0312 0.63281 1.9883 0.78906 4.0938 0.45312 6.1523-0.14453 0.63672 0.19531 1.2852 0.80078 1.5273 0.60547 0.24609 1.3008 0.015625 1.6406-0.54297 2.2305-2.4609 3.5977-5.582 3.8984-8.8906 0.29687-3.3047-0.48828-6.6211-2.2383-9.4414z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm232.72 477.35-0.57031-1.4336c-0.35547-1.1016-1.5117-1.7344-2.6328-1.4414-3.457 1.4609-6.7812 3.2188-9.9336 5.2539-4.4688 2.1055-8.582 4.8828-12.207 8.2383-9.7305 9.7773-22.242 16.312-35.824 18.703-0.5625 0.011719-1.0078 0.47266-1 1.0352 0.007813 0.55859 0.47266 1.0078 1.0352 0.99609 10.945-0.042969 21.645-3.2617 30.797-9.2656 5.5664-3.1875 10.336-7.5547 15.77-10.961 4.582-2.8594 9.793-3.4961 13.652-7.457v0.003907c0.94922-0.96484 1.3008-2.3711 0.91406-3.6719z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm495.63 489.77c-14.824-8.4336-25.922-22.145-31.082-38.398-6.332-15.367-12.012-31.043-18.066-46.504v0.003907c-0.23047-0.67578-0.94922-1.0508-1.6328-0.85156-0.67969 0.19922-1.0859 0.90234-0.91406 1.5938 3.1367 18.668 7.9648 37.012 14.422 54.809 7.0273 15.566 17.703 31.738 36.512 32.328 1.5234 0.039062 2.2227-2.3398 0.76172-2.9805z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm546.46 497.33c-7.0195-9.8789-14.691-23.133-28.73-23.133-0.82422 0.039063-1.5039 0.66797-1.6016 1.4883-0.097656 0.82031 0.41406 1.5938 1.207 1.8242 5.082 1.0664 9.8516 3.2734 13.953 6.457 2.3164 1.8086 7.9062 7.2695 7.4961 10.898-5.2266 0.40625-10.473 0.42969-15.699 0.074219-6.2344-1.5352-12.727-1.6953-19.027-0.47656-0.39844 0.12891-0.70313 0.45312-0.80469 0.86328-0.10156 0.40625 0.015625 0.83984 0.3125 1.1406 5.1953 5.3984 11.926 9.0703 19.277 10.523 7.3516 1.4492 14.973 0.61328 21.832-2.4062 2.4648-1.5312 3.2578-4.75 1.7852-7.2539z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm439.61 151.12c-0.87109-1.6484-1.8828-3.2188-3.0234-4.6914-1.7148-1.8594-3.1289-3.9766-4.1914-6.2734-0.19141-0.65234-0.875-1.0312-1.5312-0.83984s-1.0312 0.875-0.83984 1.5312c0.48438 2.4141 1.3125 4.7422 2.4609 6.918 1.2305 2.0273 2.7773 3.8359 4.582 5.3672 0.59375 0.55078 1.5 0.58594 2.1367 0.082032 0.63281-0.5 0.80859-1.3906 0.40625-2.0938z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm423.92 125.49c-2.0117-1.6875-3.3555-4.0391-3.7852-6.6289-0.03125-0.54688-0.48828-0.96875-1.0312-0.96094-0.54688 0.007812-0.98828 0.44141-1.0078 0.98437-0.054687 1.6523 0.17188 3.2969 0.67188 4.8711 0.54688 1.7578 1.8086 3.2031 3.4727 3.9883 0.62109 0.32422 1.3867 0.15234 1.8047-0.41016 0.41797-0.55859 0.36328-1.3438-0.125-1.8438z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm414.96 149.59c-0.30859-1.8438-2.668-3.1602-3.9805-4.3555v0.003906c-1.8086-1.4922-2.9062-3.6758-3.0234-6.0156-0.023437-0.5-0.44141-0.89453-0.94141-0.88672-0.5 0.007812-0.90625 0.41016-0.91406 0.91406-0.19531 2.7539 0.30859 5.5156 1.457 8.0312 1.1211 2.1562 3.6484 4.918 6.2891 4.3398 0.85547-0.26562 1.3477-1.1641 1.1133-2.0312z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm364.22 277.58c-0.41016-1.3906-1.5195-2.4648-2.918-2.8359l-1.0703-0.13281h-0.003906c-0.73828 0.015625-1.4609 0.22266-2.0977 0.60547l-0.81641 0.65625c-0.76562 1.0078-0.84375 1.1211-0.25391 0.32031-1 0.97656-1.5469 2.332-1.5 3.7305 0.058594 1.5195 0.88281 2.9062 2.1914 3.6836 1.3594 0.73828 3.0078 0.71484 4.3477-0.066407 2.0352-1.2305 2.9219-3.7227 2.1211-5.9609z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm476.15 72.758c-11.598-1.6641-23.414-0.85156-34.672 2.3789-13.551 2.4258-27.246 3.9766-40.992 4.6406-1.0312 0.078125-1.5781 1.5469-0.53125 2.0625 1.3438 0.66016 2.7266 1.2305 4.1445 1.7109-3.6914 8.168-6.625 16.66-8.7617 25.367-3.2461 11.875-7.7461 23.371-13.426 34.289-0.71875 1.1992 1.0781 2.1289 1.8555 1.0469 6.0859-9.0352 10.887-18.871 14.254-29.23 3.6836-10.234 8.9883-19.625 12.801-29.824l0.015626-0.050781c8.1367 0.8125 16.348 0.29687 24.316-1.5273 13.727-2.5312 27.539-5.5781 41.023-9.0703 0.39844-0.12109 0.66797-0.49219 0.66016-0.90625-0.003907-0.41797-0.28516-0.77734-0.6875-0.88672z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm530.07 87.629c-7.8633-2.8555-15.555-6.1484-23.051-9.8594-7.2344-1.9805-14.719-2.9102-22.219-2.7617l-0.24609 0.44922h-0.003906c2.1992 1.8359 4.7891 3.1445 7.5742 3.8242 5.9258 1.2266 11.652 3.2617 17.023 6.0508 6.1992 4.0664 13.574 5.9531 20.965 5.3633 1.6602-0.35547 1.3281-2.6055-0.042969-3.0664z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm499.68 84.043c-4.7969-1.8359-14.027-1.9258-17.281-6.2617-0.25-0.39453-0.6875-0.62891-1.1562-0.62109-0.46875 0.007813-0.89844 0.25781-1.1367 0.66016-2.9922 4.5938 4.6016 7.6172 7.6836 8.8281 2.9688 1.1641 6.1172 1.7695 9.1562 2.7266l0.003907 0.003906c4.125 1.3008 7.5547 4.207 9.5156 8.0625 0.32031 0.5 0.90625 0.76562 1.4961 0.67969 0.59375-0.089844 1.0742-0.51562 1.2383-1.0859 2.2383-6.9141-3.8711-10.828-9.5195-12.992z')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$noun = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm462.44 372.98c9.4922 0 19.496-1.5586 29.672-5.4258 48.582-18.461 79.922-83.262 81.234-86.012 1.6445-3.4492 1.8086-7.4219 0.44922-10.992-1.3555-3.5781-4.1172-6.4375-7.6367-7.9258-2.8047-1.1875-69.27-28.82-117.85-10.367h-0.003906c-40.23 15.285-54.34 55.641-58.688 73.293l-6.0859 2.3125-7.2461-105.11c4.1211-3.6445 6.7773-8.9141 6.7773-14.836v-10.309c5.4375-3.5508 9.0547-9.668 9.0547-16.637v-11.141c27.109-16.598 42.898-47.605 39.863-79.844-3.7148-39.48-35.012-71.227-74.418-75.484-23.902-2.6094-47.781 5.0703-65.535 21.004-17.75 15.93-27.934 38.734-27.934 62.562 0 29.363 15.535 56.625 40.246 71.762v11.141c0 6.9648 3.6133 13.082 9.0508 16.633l-0.003906 10.312c0 5.9336 2.6641 11.211 6.8008 14.855l-3.6914 53.574-6.1133-2.3242c-4.3516-17.652-18.461-58.008-58.688-73.293h-0.003906c-48.574-18.473-115.05 9.1836-117.85 10.367-3.5234 1.4883-6.2812 4.3477-7.6367 7.9258-1.3594 3.5703-1.1953 7.543 0.44922 10.992 1.3086 2.75 32.652 67.551 81.234 86.012 10.18 3.8672 20.176 5.4258 29.672 5.4258 28.051 0 51.695-13.559 62.875-21.258l14.051 5.3438-7.1445 103.7c-11.707 6.4922-22.258 15.098-30.961 25.535-10.191-3.3477-20.855-5.0352-31.785-5.0352-46.828 0-87.586 31.676-99.109 77.027-2.3945 9.4062-0.32422 19.227 5.6758 26.938 6.0742 7.8086 15.219 12.289 25.098 12.289h343.91c12.555 0 23.609-7.1094 28.859-18.562 5.1914-11.324 3.3867-24.199-4.707-33.594-20.387-23.656-51.941-35.438-83.059-30.691-13.016-31.934-40.223-55.305-72.816-63.973l-2.9023-42.125 14.027-5.332c11.176 7.6992 34.816 21.258 62.871 21.258zm-4.1875-94.551h-0.003906c26.336-10.008 62.426-1.4805 82.332 4.7852-11.895 19.77-33.598 48.73-58.41 58.164-26.348 10.012-52.797-3.6484-64.746-11.418 3.7812-13.77 14.484-41.516 40.828-51.531zm-240.42 11.43c-26.332-10.008-47.664-40.336-58.383-58.246 22.023-6.8789 57.48-14.141 82.301-4.7031h-0.003906c26.383 10.023 37.078 37.848 40.848 51.574-11.898 7.8008-38.191 21.461-64.762 11.375zm74.258-191.78c0-15.887 6.793-31.094 18.633-41.727 12.02-10.789 27.59-15.75 43.816-14.004 25.816 2.793 47.121 24.406 49.559 50.273 2.2188 23.594-10.621 46.184-31.949 56.219-4.9062 2.3086-8.0391 7.2422-8.0391 12.664v11.359h-31.777v-11.359c0-5.4258-3.1328-10.363-8.043-12.672-19.559-9.1992-32.199-29.121-32.199-50.754zm68.031 297.37c-8.1211 0.015625-16.152 0.95312-23.953 2.7344l11.723-170.15h0.6875zm77.016 83.148c3.3125 9.8828 13.332 15.562 23.305 13.211 23.043-5.3984 47.422 2.6289 62.668 20.316 0.92578 1.0781 1.082 2.3008 0.46484 3.6523-0.37891 0.83203-1.332 2.2266-3.4062 2.2266h-343.92c-1.6055 0-2.5664-0.92578-2.9961-1.4766-0.46875-0.60547-0.96094-1.5898-0.64062-2.8555 8.3711-32.926 37.965-55.922 71.973-55.922 9.418 0 18.543 1.7188 27.098 5.0977 8.418 3.3633 18.059 0.60156 23.453-6.6484 15.484-20.812 39.242-32.754 65.184-32.754 34.895 0 65.762 22.164 76.816 55.152z')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$placentabirth = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 't'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm18.766-1.125c-0.96875 0.5-1.9805 0.875-3.0312 1.125-1.043 0.25781-2.1367 0.39062-3.2812 0.39062-3.3984 0-6.0898-0.94531-8.0781-2.8438-1.9922-1.9062-2.9844-4.4844-2.9844-7.7344 0-3.2578 0.99219-5.8359 2.9844-7.7344 1.9883-1.9062 4.6797-2.8594 8.0781-2.8594 1.1445 0 2.2383 0.13281 3.2812 0.39062 1.0508 0.25 2.0625 0.625 3.0312 1.125v4.2188c-0.98047-0.65625-1.9453-1.1406-2.8906-1.4531-0.94922-0.3125-1.9492-0.46875-3-0.46875-1.875 0-3.3516 0.60547-4.4219 1.8125-1.0742 1.1992-1.6094 2.8555-1.6094 4.9688 0 2.1055 0.53516 3.7617 1.6094 4.9688 1.0703 1.1992 2.5469 1.7969 4.4219 1.7969 1.0508 0 2.0508-0.14844 3-0.45312 0.94531-0.3125 1.9102-0.80078 2.8906-1.4688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm13.734-11.141c-0.4375-0.19531-0.87109-0.34375-1.2969-0.4375-0.41797-0.10156-0.83984-0.15625-1.2656-0.15625-1.2617 0-2.2305 0.40625-2.9062 1.2188-0.67969 0.80469-1.0156 1.9531-1.0156 3.4531v7.0625h-4.8906v-15.312h4.8906v2.5156c0.625-1 1.3438-1.7266 2.1562-2.1875 0.82031-0.46875 1.8008-0.70312 2.9375-0.70312 0.16406 0 0.34375 0.011719 0.53125 0.03125 0.19531 0.011719 0.47656 0.039062 0.84375 0.078125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.641-7.7031v1.4062h-11.453c0.125 1.1484 0.53906 2.0078 1.25 2.5781 0.70703 0.57422 1.7031 0.85938 2.9844 0.85938 1.0312 0 2.082-0.14844 3.1562-0.45312 1.082-0.3125 2.1914-0.77344 3.3281-1.3906v3.7656c-1.1562 0.4375-2.3125 0.76562-3.4688 0.98438-1.1562 0.22656-2.3125 0.34375-3.4688 0.34375-2.7734 0-4.9297-0.70312-6.4688-2.1094-1.5312-1.4062-2.2969-3.3789-2.2969-5.9219 0-2.5 0.75391-4.4609 2.2656-5.8906 1.5078-1.4375 3.582-2.1562 6.2188-2.1562 2.4062 0 4.332 0.73047 5.7812 2.1875 1.4453 1.4492 2.1719 3.3828 2.1719 5.7969zm-5.0312-1.625c0-0.92578-0.27344-1.6719-0.8125-2.2344-0.54297-0.57031-1.25-0.85938-2.125-0.85938-0.94922 0-1.7188 0.26562-2.3125 0.79688s-0.96484 1.2969-1.1094 2.2969z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.2188-6.8906c-1.0234 0-1.793 0.17188-2.3125 0.51562-0.51172 0.34375-0.76562 0.85547-0.76562 1.5312 0 0.625 0.20703 1.1172 0.625 1.4688 0.41406 0.34375 0.98828 0.51562 1.7188 0.51562 0.92578 0 1.7031-0.32812 2.3281-0.98438 0.63281-0.66406 0.95312-1.4922 0.95312-2.4844v-0.5625zm7.4688-1.8438v8.7344h-4.9219v-2.2656c-0.65625 0.92969-1.3984 1.6055-2.2188 2.0312-0.82422 0.41406-1.8242 0.625-3 0.625-1.5859 0-2.8711-0.45703-3.8594-1.375-0.99219-0.92578-1.4844-2.1289-1.4844-3.6094 0-1.7891 0.61328-3.1016 1.8438-3.9375 1.2383-0.84375 3.1797-1.2656 5.8281-1.2656h2.8906v-0.39062c0-0.76953-0.30859-1.332-0.92188-1.6875-0.61719-0.36328-1.5703-0.54688-2.8594-0.54688-1.0547 0-2.0312 0.10547-2.9375 0.3125-0.89844 0.21094-1.7305 0.52344-2.5 0.9375v-3.7344c1.0391-0.25 2.0859-0.44141 3.1406-0.57812 1.0625-0.13281 2.125-0.20312 3.1875-0.20312 2.7578 0 4.75 0.54688 5.9688 1.6406 1.2266 1.0859 1.8438 2.8555 1.8438 5.3125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm7.7031-19.656v4.3438h5.0469v3.5h-5.0469v6.5c0 0.71094 0.14062 1.1875 0.42188 1.4375s0.83594 0.375 1.6719 0.375h2.5156v3.5h-4.1875c-1.9375 0-3.3125-0.39844-4.125-1.2031-0.80469-0.8125-1.2031-2.1797-1.2031-4.1094v-6.5h-2.4219v-3.5h2.4219v-4.3438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.766-13.078v-8.2031h4.9219v21.281h-4.9219v-2.2188c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2969 1.8125-5.7969 1.207-1.5 2.7539-2.25 4.6406-2.25 1.0625 0 2 0.21484 2.8125 0.64062 0.82031 0.42969 1.5664 1.0859 2.2344 1.9688zm-3.2188 9.9219c1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm10.5-3.1562c1.0508 0 1.8516-0.37891 2.4062-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3555-1.1562-2.4062-1.1562-1.0547 0-1.8594 0.38672-2.4219 1.1562-0.55469 0.77344-0.82812 1.8828-0.82812 3.3281 0 1.4492 0.27344 2.5586 0.82812 3.3281 0.5625 0.77344 1.3672 1.1562 2.4219 1.1562zm-3.25-9.9219c0.67578-0.88281 1.4219-1.5391 2.2344-1.9688 0.82031-0.42578 1.7656-0.64062 2.8281-0.64062 1.8945 0 3.4453 0.75 4.6562 2.25 1.207 1.5 1.8125 3.4336 1.8125 5.7969 0 2.3555-0.60547 4.2812-1.8125 5.7812-1.2109 1.5-2.7617 2.25-4.6562 2.25-1.0625 0-2.0078-0.21094-2.8281-0.625-0.8125-0.42578-1.5586-1.0859-2.2344-1.9844v2.2188h-4.8906v-21.281h4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.34375-15.312h4.8906l4.125 10.391 3.5-10.391h4.8906l-6.4375 16.766c-0.64844 1.6953-1.4023 2.8828-2.2656 3.5625-0.86719 0.6875-2 1.0312-3.4062 1.0312h-2.8438v-3.2188h1.5312c0.83203 0 1.4375-0.13672 1.8125-0.40625 0.38281-0.26172 0.67969-0.73047 0.89062-1.4062l0.14062-0.42188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h8.7344c2.5938 0 4.582 0.57812 5.9688 1.7344 1.3945 1.1484 2.0938 2.7891 2.0938 4.9219 0 2.1367-0.69922 3.7812-2.0938 4.9375-1.3867 1.1562-3.375 1.7344-5.9688 1.7344h-3.4844v7.0781h-5.25zm5.25 3.8125v5.7031h2.9219c1.0195 0 1.8047-0.25 2.3594-0.75 0.5625-0.5 0.84375-1.2031 0.84375-2.1094 0-0.91406-0.28125-1.6172-0.84375-2.1094-0.55469-0.48828-1.3398-0.73438-2.3594-0.73438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.312h-4.8906zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-21.281h4.8906v11.594l5.625-5.625h5.6875l-7.4688 7.0312 8.0625 8.2812h-5.9375l-5.9688-6.3906v6.3906h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.719-14.828v3.9844c-0.65625-0.45703-1.3242-0.79688-2-1.0156-0.66797-0.21875-1.3594-0.32812-2.0781-0.32812-1.3672 0-2.4336 0.40234-3.2031 1.2031-0.76172 0.79297-1.1406 1.9062-1.1406 3.3438 0 1.4297 0.37891 2.543 1.1406 3.3438 0.76953 0.79297 1.8359 1.1875 3.2031 1.1875 0.75781 0 1.4844-0.10938 2.1719-0.32812 0.6875-0.22656 1.3203-0.56641 1.9062-1.0156v4c-0.76172 0.28125-1.5391 0.48828-2.3281 0.625-0.78125 0.14453-1.5742 0.21875-2.375 0.21875-2.7617 0-4.9219-0.70703-6.4844-2.125-1.5547-1.4141-2.3281-3.3828-2.3281-5.9062 0-2.5312 0.77344-4.5039 2.3281-5.9219 1.5625-1.4141 3.7227-2.125 6.4844-2.125 0.80078 0 1.5938 0.074219 2.375 0.21875 0.78125 0.13672 1.5547 0.35156 2.3281 0.64062z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.1875-5.9688v-9.3438h4.9219v1.5312c0 0.83594-0.007813 1.875-0.015625 3.125-0.011719 1.25-0.015625 2.0859-0.015625 2.5 0 1.2422 0.03125 2.1328 0.09375 2.6719 0.070313 0.54297 0.17969 0.93359 0.32812 1.1719 0.20703 0.32422 0.47266 0.57422 0.79688 0.75 0.32031 0.16797 0.69141 0.25 1.1094 0.25 1.0195 0 1.8203-0.39062 2.4062-1.1719 0.58203-0.78125 0.875-1.8672 0.875-3.2656v-7.5625h4.8906v15.312h-4.8906v-2.2188c-0.74219 0.89844-1.5234 1.5586-2.3438 1.9844-0.82422 0.41406-1.7344 0.625-2.7344 0.625-1.7617 0-3.1055-0.53906-4.0312-1.625-0.92969-1.082-1.3906-2.6602-1.3906-4.7344z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.422-21.281v3.2188h-2.7031c-0.6875 0-1.1719 0.125-1.4531 0.375-0.27344 0.25-0.40625 0.6875-0.40625 1.3125v1.0625h4.1875v3.5h-4.1875v11.812h-4.8906v-11.812h-2.4375v-3.5h2.4375v-1.0625c0-1.6641 0.46094-2.8984 1.3906-3.7031 0.92578-0.80078 2.3672-1.2031 4.3281-1.2031z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.6406-12.188c-1.0859 0-1.9141 0.39062-2.4844 1.1719-0.57422 0.78125-0.85938 1.9062-0.85938 3.375s0.28516 2.5938 0.85938 3.375c0.57031 0.77344 1.3984 1.1562 2.4844 1.1562 1.0625 0 1.875-0.38281 2.4375-1.1562 0.57031-0.78125 0.85938-1.9062 0.85938-3.375s-0.28906-2.5938-0.85938-3.375c-0.5625-0.78125-1.375-1.1719-2.4375-1.1719zm0-3.5c2.6328 0 4.6914 0.71484 6.1719 2.1406 1.4766 1.418 2.2188 3.3867 2.2188 5.9062 0 2.5117-0.74219 4.4805-2.2188 5.9062-1.4805 1.418-3.5391 2.125-6.1719 2.125-2.6484 0-4.7148-0.70703-6.2031-2.125-1.4922-1.4258-2.2344-3.3945-2.2344-5.9062 0-2.5195 0.74219-4.4883 2.2344-5.9062 1.4883-1.4258 3.5547-2.1406 6.2031-2.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm16.547-12.766c0.61328-0.94531 1.3477-1.6719 2.2031-2.1719 0.85156-0.5 1.7891-0.75 2.8125-0.75 1.7578 0 3.0977 0.54688 4.0156 1.6406 0.92578 1.0859 1.3906 2.6562 1.3906 4.7188v9.3281h-4.9219v-7.9844-0.35938c0.007813-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.082-0.16406-1.8633-0.48438-2.3438-0.3125-0.48828-0.82422-0.73438-1.5312-0.73438-0.92969 0-1.6484 0.38672-2.1562 1.1562-0.51172 0.76172-0.77344 1.8672-0.78125 3.3125v7.5156h-4.9219v-7.9844c0-1.6953-0.14844-2.7852-0.4375-3.2656-0.29297-0.48828-0.8125-0.73438-1.5625-0.73438-0.9375 0-1.6641 0.38672-2.1719 1.1562-0.51172 0.76172-0.76562 1.8594-0.76562 3.2969v7.5312h-4.9219v-15.312h4.9219v2.2344c0.60156-0.86328 1.2891-1.5156 2.0625-1.9531 0.78125-0.4375 1.6406-0.65625 2.5781-0.65625 1.0625 0 2 0.25781 2.8125 0.76562 0.8125 0.51172 1.4258 1.2305 1.8438 2.1562z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1094c0-1.3438-0.03125-2.2656-0.09375-2.7656s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-21.281h4.8906v8.2031c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h5.875l7.4219 14v-14h4.9844v20.406h-5.875l-7.4219-14v14h-4.9844z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1406c0-1.3203-0.03125-2.2344-0.09375-2.7344s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-15.312h4.8906v2.2344c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.031c0 2.0508-0.49609 3.6172-1.4844 4.7031-0.98047 1.082-2.4062 1.625-4.2812 1.625h-2.4219v-3.2188h0.85938c0.92578 0 1.5625-0.21094 1.9062-0.625 0.35156-0.41797 0.53125-1.2461 0.53125-2.4844zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm493.99 128.1c-16.648-22.961-39.523-38.672-64.461-44.223-23.34-26.359-57.418-29.742-84.516-29.742h-0.55859c-35.391 0-67.957 16.379-89.512 44.793-36.605 9.7891-73.781 42.066-74.34 84.895 0.18359 22.203 8.7539 56.09 32.184 78.578 2.0664 10.633 6.0195 20.609 11.855 29.742 2.6367 4.2344 8.6562 5.6445 12.898 2.9102 0.17188-0.10547 0.30859-0.25391 0.47656-0.37109 4.0078-2.8516 5.1641-8.3711 2.5352-12.621-4.9883-7.9023-8.2773-16.656-9.7891-25.883-0.375-2.2578-1.5078-4.2344-3.1016-5.6445-19.578-16.57-28.426-49.598-28.234-66.723-0.28516-14.594 6.6797-29.742 19.578-42.828 12.039-12.234 27.949-21.172 43.574-24.555 2.2617-0.47656 4.2344-1.793 5.6445-3.7695 17.691-24.84 46.211-39.711 76.328-39.711 36.512 0.089843 58.25 7.6172 72.648 25.414 1.3203 1.6914 3.3945 2.9102 5.6523 3.293 20.512 3.3945 40.09 16.375 55.055 36.422 14.492 19.578 22.773 43.855 22.68 66.629 0.18359 51.945-39.906 100.61-85.922 104.08-2.9219 0.28516-5.5508 1.8867-7.1562 4.5234-5.8086 9.4531-14.211 15.707-26.344 19.309 1.0117-4.8945 1.7812-9.7617 1.7812-14.98 0-13.688-1.875-24.664-3.9688-34.344 6.457 4.4727 14.129 7.6992 22.887 7.6953 3.8906 0 7.9961-0.63281 12.297-2.0703 4.9297-1.6367 7.5938-6.9609 5.9453-11.898-1.6445-4.9219-6.9336-7.5977-11.906-5.9453-10.496 3.4727-19.691-2.9805-26.113-10 9.0312-2.1562 19.027-7.5273 27.906-18.355 3.8594 1.5781 10.691 3.8516 17.961 3.8516 6.2617 0 12.84-1.6914 18.117-6.9648 3.6797-3.6719 3.6797-9.6328 0-13.305-3.6719-3.6797-9.6328-3.6797-13.305 0-2.2344 2.2461-7.8633 1.4688-12.5 0.074218 9.7617-20.137 9.7148-33.988 5.1133-44.781 7.1562-3.293 13.926-7.3789 18.34-12.266 6.6641 4.625 12.879 14.902 15.332 20.395 1.5742 3.5 5.0117 5.5781 8.6133 5.5781 1.2773 0 2.5742-0.25781 3.8125-0.8125 4.7383-2.1094 6.8828-7.6562 4.7773-12.402-1.2109-2.7422-11.059-23.941-27.422-31.367v-11.879c0-5.1953-4.207-9.4062-9.4062-9.4062-5.2031 0-9.4141 4.2109-9.4141 9.4062v17.695c-1.8984 2.3203-8.4336 6.1211-15.664 9.2695-2.6641-2.793-5.5156-5.4648-8.3438-8.1094-2.2695-2.1211-4.6328-4.3281-6.9844-6.6875-17.504-17.504-35.695-53.664-35.879-54.02-2.3359-4.6484-7.9727-6.5234-12.629-4.2109-4.6523 2.3242-6.5352 7.9805-4.207 12.629 0.11719 0.23438 0.63672 1.2695 1.4961 2.9062-9.6367-2.4766-17-6.0742-17.109-6.1367-4.6758-2.2969-10.305-0.41406-12.617 4.2383-2.3203 4.6484-0.42969 10.289 4.207 12.609 0.79688 0.39062 18.246 9.0039 37.375 10.242 7.2031 11.809 16.535 25.531 26.059 35.043 2.5078 2.5078 5.0195 4.8477 7.4375 7.125 15.227 14.246 22.875 21.398 9.6211 47.891-9.5742 19.152-21.23 23.52-28.594 24.098 0.80469-5.6719 2.2695-11.523 3.7852-17.605 2.4531-9.8047 4.9883-19.945 4.9883-30.516 0-29.586-55.344-50.328-72.309-55.977-30.891-10.305-61.145-0.42969-62.422 0-4.9297 1.6367-7.5938 6.9648-5.9453 11.898 1.6445 4.9219 6.9375 7.6094 11.898 5.9453 0.10547-0.039063 4.9375-1.6133 12.41-2.6992 6.0352 7.4492 6.3789 19.965 5.3477 29.301-1.5664-1.4336-3.0898-2.9531-4.6719-4.5312-13.805-13.805-36.551-3.0391-39.098-1.7656-4.6523 2.3242-6.5352 7.9727-4.2109 12.629 2.3242 4.6484 7.9805 6.5234 12.629 4.2109 4.5703-2.2891 14.293-4.8281 17.371-1.7656 10.109 10.121 21.578 21.578 53.711 21.578 17.188 0 18.75 14.461 18.82 18.82 0 6.4688 3.4961 16.715 14.465 22.926-6.4727 2.9219-14.578 5.3086-23.871 5.3086-22.73 0-39.078-23.824-39.227-24.039-1.7461-2.6211-4.6875-4.1953-7.8281-4.1953l-8.9883 0.042969c-2.3516-0.72656-7.7227-7.5-10.84-13.676-2.3398-4.6406-7.9961-6.5156-12.645-4.1797-4.6367 2.3242-6.5234 7.9688-4.1992 12.609 2.8242 5.6328 13.113 24.023 27.238 24.023h4.7266c3.0977 3.8359 8.3906 9.6953 15.535 15.086l-7.2812 5.7695c-4.0703 3.2305-4.7617 9.1562-1.5352 13.227 1.8633 2.3398 4.6133 3.5625 7.3867 3.5625 2.043 0 4.1094-0.66016 5.8359-2.0273l13.461-10.668c5.5977 2.0156 11.727 3.2812 18.344 3.2812 4.8164 0 9.3789-0.48047 13.668-1.293-4.168 10.965-4.2617 19.434-4.2617 20.113 0 5.2031 4.2109 9.4062 9.4141 9.4062 5.2031 0 9.4062-4.207 9.4062-9.4062 0-0.17969 0.22266-14.324 11.598-28.055 0.62891 3.0703 1.3281 6.1445 2.0508 9.2734 2.5469 11.027 5.1758 22.422 5.1758 37.605 0 5.4219-1.2812 10.992-2.7773 17.434-0.074219 0.30859-0.14453 0.63281-0.21875 0.94531-3.5898 0.26172-7.375 0.41406-11.406 0.4375h-9.4141c-20.984-0.09375-36.332-1.3203-44.984-9.6953-3.3672-3.1992-8.8477-3.1875-12.348-0.33203-0.3125 0.25781-0.63672 0.5-0.91406 0.80078-3.5859 3.7695-3.2969 9.6953 0.36328 13.184l0.10156 0.089843c15.898 14.402 36.887 14.59 57.223 14.777h9.8789 0.93359c2.418 0 4.7656-0.054687 7.0742-0.14453-0.47656 4.1211-0.78516 8.5625-0.78516 13.41 0 13.215 2.7539 26.461 5.4336 39.25 2.2617 10.863 4.4023 21.125 4.4023 29.625 0 34.086-25.727 49.617-49.621 49.617-23.871 0-49.621-15.211-49.621-39.789 0-26.762 13.016-39.777 39.777-39.777 12.273 0 20.109 19.66 20.109 29.941 0 8.3438-1.9219 10.266-10.266 10.266-5.6406 0-9-0.29688-9.6719-0.55859-0.011718-0.015625-0.59375-1.0859-0.59375-4.7891 0-5.2031-4.2109-9.4062-9.4141-9.4062s-9.4141 4.207-9.4141 9.4062c0 24.168 18.211 24.168 29.094 24.168 18.754 0 29.086-10.332 29.086-29.086 0-16.469-11.754-48.766-38.93-48.766-37.238 0-58.598 21.359-58.598 58.598 0 36.203 35.531 58.609 68.441 58.609 34.016 0 68.441-23.508 68.441-68.438 0-10.449-2.3359-21.629-4.8008-33.465-2.4805-11.867-5.0352-24.137-5.0352-35.41 0-5.7852 0.48828-10.836 1.2148-15.5 19.785-3.7305 34.086-12.203 43.98-25.996 26.906-3.8594 51.855-18.918 70.391-42.543 18.07-22.961 28.051-51.387 28.141-79.801-0.082031-26.914-9.1133-54.105-25.398-76.605zm-186.34 67.199c-7.5273 0-13.402-0.68359-18.188-1.8828 1.4883-7.8281 3.6406-24.871-1.9375-39.66 5.5273 0.45313 11.34 1.4727 17.152 3.4062 36.715 12.242 59.445 29.328 59.445 38.137 0 8.2539-2.1523 16.844-4.418 25.957-1.6445 6.5781-3.3086 13.312-4.2383 20.223-9.1445-2.1211-10.078-7.4609-10.16-8.5273-0.011719-15.137-10.043-37.652-37.656-37.652zm-57.418 120.09c-0.64844-2.3516-0.27344-4.8906 0.94531-7.0625 0.11328-0.19531 0.26953-0.35156 0.39844-0.53906 2.7148-3.8906 8.3594-5.2734 12.492-2.8516h0.089844c2.1602 1.3203 3.668 3.2969 4.3281 5.6523 0.51562 2.25 0.28516 4.5625-0.77734 6.6016-0.089844 0.17969-0.15234 0.375-0.25781 0.54688-1.6914 2.9102-4.793 4.7031-8.0859 4.7031-1.7031 0-3.2969-0.46875-4.7031-1.2227l-0.10156-0.09375c-2.1523-1.2148-3.6641-3.293-4.3281-5.7344z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#t')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '90.550781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '104.359375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.347656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '142.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '155.628906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '174.617188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '204.410156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '224.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '252.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '272.972656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '282.570312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '301.191406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '329.929688'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '350.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '360.046875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '376.648438'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '390.03125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '409.964844'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '423.773438'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '82.183594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '95.992188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '115.226562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '154.152344'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '167.535156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '187.46875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '216.207031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '239.640625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '258.878906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '278.8125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '308.492188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '329.015625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '342.820312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '362.058594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '371.65625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '390.648438'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '407.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$skintoskin = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'u'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.6562-0.21875c-0.1875 0.09375-0.38672 0.16797-0.59375 0.21875-0.19922 0.050781-0.40625 0.078125-0.625 0.078125-0.66797 0-1.1992-0.17969-1.5938-0.54688-0.38672-0.375-0.57812-0.87891-0.57812-1.5156 0-0.64453 0.19141-1.1484 0.57812-1.5156 0.39453-0.375 0.92578-0.5625 1.5938-0.5625 0.21875 0 0.42578 0.027344 0.625 0.078125 0.20703 0.054687 0.40625 0.125 0.59375 0.21875v0.82812c-0.1875-0.125-0.375-0.21875-0.5625-0.28125-0.17969-0.0625-0.37109-0.09375-0.57812-0.09375-0.36719 0-0.65625 0.12109-0.875 0.35938-0.21094 0.23047-0.3125 0.55469-0.3125 0.96875 0 0.40625 0.10156 0.73047 0.3125 0.96875 0.21875 0.23047 0.50781 0.34375 0.875 0.34375 0.20703 0 0.39844-0.023437 0.57812-0.078125 0.1875-0.0625 0.375-0.16016 0.5625-0.29688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.6875-2.1719c-0.085938-0.039063-0.16797-0.070313-0.25-0.09375-0.085938-0.019531-0.16797-0.03125-0.25-0.03125-0.25 0-0.44531 0.085937-0.57812 0.25-0.125 0.15625-0.1875 0.38281-0.1875 0.67188v1.375h-0.96875v-2.9844h0.96875v0.48438c0.11328-0.19531 0.25-0.33594 0.40625-0.42188 0.16406-0.09375 0.35938-0.14062 0.57812-0.14062h0.10938c0.039063 0 0.09375 0.007812 0.15625 0.015625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4375-1.5v0.26562h-2.2344c0.03125 0.23047 0.11328 0.40234 0.25 0.51562 0.13281 0.10547 0.32812 0.15625 0.57812 0.15625 0.20703 0 0.41406-0.023438 0.625-0.078125 0.20703-0.0625 0.42188-0.15625 0.64062-0.28125v0.73438c-0.21875 0.09375-0.44531 0.16406-0.67188 0.20312-0.23047 0.039062-0.45312 0.0625-0.67188 0.0625-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.47656 0.14453-0.85938 0.4375-1.1406 0.30078-0.28125 0.70703-0.42188 1.2188-0.42188 0.46875 0 0.84375 0.14062 1.125 0.42188s0.42188 0.66406 0.42188 1.1406zm-0.96875-0.32812c0-0.17578-0.058594-0.31641-0.17188-0.42188-0.10547-0.11328-0.24219-0.17188-0.40625-0.17188-0.1875 0-0.33984 0.054687-0.45312 0.15625-0.11719 0.10547-0.1875 0.25-0.21875 0.4375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.7969-1.3438c-0.19922 0-0.35156 0.039062-0.45312 0.10938-0.09375 0.0625-0.14062 0.16406-0.14062 0.29688 0 0.11719 0.035156 0.21094 0.10938 0.28125 0.082031 0.0625 0.19531 0.09375 0.34375 0.09375 0.17578 0 0.32812-0.0625 0.45312-0.1875s0.1875-0.28516 0.1875-0.48438v-0.10938zm1.4688-0.35938v1.7031h-0.96875v-0.4375c-0.125 0.17969-0.27344 0.30859-0.4375 0.39062-0.15625 0.082031-0.35156 0.125-0.57812 0.125-0.3125 0-0.57031-0.085938-0.76562-0.26562-0.1875-0.1875-0.28125-0.42188-0.28125-0.70312 0-0.35156 0.11719-0.61328 0.35938-0.78125 0.23828-0.16406 0.61719-0.25 1.1406-0.25h0.5625v-0.0625c0-0.15625-0.0625-0.26562-0.1875-0.32812-0.11719-0.070312-0.29688-0.10938-0.54688-0.10938-0.21094 0-0.40234 0.023437-0.57812 0.0625-0.17969 0.042969-0.33984 0.10156-0.48438 0.17188v-0.71875c0.19531-0.050781 0.39844-0.085938 0.60938-0.10938 0.20703-0.03125 0.41406-0.046875 0.625-0.046875 0.53906 0 0.92969 0.10938 1.1719 0.32812 0.23828 0.21094 0.35938 0.55469 0.35938 1.0312z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.5-3.8438v0.85938h0.98438v0.67188h-0.98438v1.2812c0 0.13672 0.023438 0.23047 0.078125 0.28125 0.0625 0.042969 0.17578 0.0625 0.34375 0.0625h0.48438v0.6875h-0.8125c-0.38672 0-0.65625-0.078125-0.8125-0.23438s-0.23438-0.42188-0.23438-0.79688v-1.2812h-0.46875v-0.67188h0.46875v-0.85938z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5-2.5469v-1.6094h0.95312v4.1562h-0.95312v-0.4375c-0.13672 0.17969-0.28125 0.30859-0.4375 0.39062-0.15625 0.082031-0.33984 0.125-0.54688 0.125-0.375 0-0.68359-0.14453-0.92188-0.4375-0.23047-0.28906-0.34375-0.67188-0.34375-1.1406 0-0.45703 0.11328-0.83203 0.34375-1.125 0.23828-0.28906 0.54688-0.4375 0.92188-0.4375 0.19531 0 0.375 0.042969 0.53125 0.125 0.16406 0.085938 0.31641 0.21484 0.45312 0.39062zm-0.64062 1.9375c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.0469-0.60938c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875zm-0.625-1.9375c0.125-0.17578 0.26562-0.30469 0.42188-0.39062 0.16406-0.082031 0.35156-0.125 0.5625-0.125 0.36328 0 0.66406 0.14844 0.90625 0.4375 0.23828 0.29297 0.35938 0.66797 0.35938 1.125 0 0.46875-0.12109 0.85156-0.35938 1.1406-0.24219 0.29297-0.54297 0.4375-0.90625 0.4375-0.21094 0-0.39844-0.042969-0.5625-0.125-0.15625-0.082031-0.29688-0.21094-0.42188-0.39062v0.4375h-0.96875v-4.1562h0.96875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.0625-2.9844h0.95312l0.8125 2.0156 0.6875-2.0156h0.95312l-1.2656 3.2656c-0.125 0.33203-0.27344 0.56641-0.4375 0.70312-0.16797 0.13281-0.39062 0.20312-0.67188 0.20312h-0.54688v-0.64062h0.29688c0.16406 0 0.28516-0.027344 0.35938-0.078125 0.070313-0.054688 0.12891-0.14062 0.17188-0.26562l0.03125-0.09375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.03125-3.9844h3.6719v0.78125h-1.3281v3.2031h-1.0312v-3.2031h-1.3125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 't'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.1875-2.9844h0.9375l0.5 2.0625 0.5-2.0625h0.79688l0.5 2.0312 0.51562-2.0312h0.92188l-0.78125 2.9844h-1.0469l-0.5-2.0625-0.5 2.0625h-1.0469z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.7969-2.8906v0.71875c-0.21094-0.082031-0.40625-0.14453-0.59375-0.1875-0.1875-0.039063-0.37109-0.0625-0.54688-0.0625-0.17969 0-0.3125 0.023437-0.40625 0.0625-0.085938 0.042969-0.125 0.10938-0.125 0.20312 0 0.085938 0.03125 0.14844 0.09375 0.1875 0.070312 0.042969 0.19531 0.074219 0.375 0.09375l0.15625 0.015625c0.48828 0.0625 0.81641 0.16797 0.98438 0.3125 0.17578 0.13672 0.26562 0.35938 0.26562 0.67188s-0.12109 0.55469-0.35938 0.71875c-0.23047 0.15625-0.57812 0.23438-1.0469 0.23438-0.19922 0-0.40625-0.015625-0.625-0.046875-0.21094-0.03125-0.42188-0.078125-0.64062-0.14062v-0.71875c0.1875 0.085937 0.37891 0.15234 0.57812 0.20312 0.20703 0.042969 0.41406 0.0625 0.625 0.0625 0.1875 0 0.32812-0.023438 0.42188-0.078125 0.09375-0.050781 0.14062-0.125 0.14062-0.21875s-0.039062-0.16016-0.10938-0.20312c-0.0625-0.039062-0.1875-0.070312-0.375-0.09375l-0.17188-0.015625c-0.42969-0.050781-0.73047-0.14844-0.90625-0.29688-0.16797-0.14453-0.25-0.36328-0.25-0.65625 0-0.32031 0.10938-0.55469 0.32812-0.70312 0.21875-0.15625 0.55078-0.23438 1-0.23438 0.17578 0 0.35938 0.015625 0.54688 0.046875 0.19531 0.023437 0.41016 0.0625 0.64062 0.125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm1.875-2.375c-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.27344 0.21875 0.48438 0.21875 0.20703 0 0.36719-0.070313 0.48438-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.11719-0.15625-0.27734-0.23438-0.48438-0.23438zm0-0.6875c0.51953 0 0.92188 0.14062 1.2031 0.42188 0.28906 0.27344 0.4375 0.65234 0.4375 1.1406 0 0.5-0.14844 0.89062-0.4375 1.1719-0.28125 0.27344-0.68359 0.40625-1.2031 0.40625-0.51172 0-0.91406-0.13281-1.2031-0.40625-0.29297-0.28125-0.4375-0.67188-0.4375-1.1719 0-0.48828 0.14453-0.86719 0.4375-1.1406 0.28906-0.28125 0.69141-0.42188 1.2031-0.42188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.4219-4.1562v0.625h-0.51562c-0.13672 0-0.23438 0.027344-0.29688 0.078125-0.054687 0.054687-0.078125 0.13672-0.078125 0.25v0.21875h0.82812v0.67188h-0.82812v2.3125h-0.95312v-2.3125h-0.46875v-0.67188h0.46875v-0.21875c0-0.32031 0.085937-0.5625 0.26562-0.71875 0.1875-0.15625 0.47266-0.23438 0.85938-0.23438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.2344-2.5c0.11328-0.17578 0.25391-0.3125 0.42188-0.40625 0.16406-0.10156 0.35156-0.15625 0.5625-0.15625 0.33203 0 0.58594 0.10938 0.76562 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625v1.8281h-0.96875v-1.5625c0.007813-0.019531 0.015625-0.039062 0.015625-0.0625v-0.10938c0-0.21875-0.03125-0.375-0.09375-0.46875s-0.16406-0.14062-0.29688-0.14062c-0.1875 0-0.33594 0.078125-0.4375 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-1.5625c0-0.33203-0.03125-0.54688-0.09375-0.64062-0.054688-0.09375-0.15234-0.14062-0.29688-0.14062-0.17969 0-0.32031 0.078125-0.42188 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.11328-0.17578 0.24219-0.30469 0.39062-0.39062 0.15625-0.082031 0.32812-0.125 0.51562-0.125 0.20703 0 0.39062 0.054688 0.54688 0.15625 0.15625 0.09375 0.27344 0.23047 0.35938 0.40625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-4.1562h0.96875v1.6094c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.5-3.9844h1.1562l1.4375 2.7344v-2.7344h0.98438v3.9844h-1.1562l-1.4375-2.7344v2.7344h-0.98438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.42188-1.1719v-1.8125h0.96875v0.29688 0.60938 0.48438c0 0.24219 0.003906 0.41797 0.015625 0.53125 0.007812 0.10547 0.03125 0.17969 0.0625 0.21875 0.039062 0.0625 0.09375 0.11719 0.15625 0.15625 0.0625 0.03125 0.13281 0.046875 0.21875 0.046875 0.19531 0 0.35156-0.078125 0.46875-0.23438 0.11328-0.15625 0.17188-0.36719 0.17188-0.64062v-1.4688h0.95312v2.9844h-0.95312v-0.4375c-0.14844 0.17969-0.30469 0.30859-0.46875 0.39062-0.15625 0.082031-0.33594 0.125-0.53125 0.125-0.34375 0-0.60938-0.10156-0.79688-0.3125-0.17969-0.21875-0.26562-0.53125-0.26562-0.9375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.5-3.9844h1.7031c0.50781 0 0.89844 0.11719 1.1719 0.34375 0.26953 0.21875 0.40625 0.53906 0.40625 0.95312 0 0.41797-0.13672 0.74219-0.40625 0.96875-0.27344 0.21875-0.66406 0.32812-1.1719 0.32812h-0.67188v1.3906h-1.0312zm1.0312 0.75v1.1094h0.5625c0.19531 0 0.34766-0.046875 0.45312-0.14062 0.11328-0.10156 0.17188-0.24219 0.17188-0.42188 0-0.17578-0.058594-0.3125-0.17188-0.40625-0.10547-0.09375-0.25781-0.14062-0.45312-0.14062z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.45312-2.9844h0.96875v2.9375c0 0.39453-0.10156 0.69531-0.29688 0.90625-0.1875 0.21875-0.46484 0.32812-0.82812 0.32812h-0.48438v-0.64062h0.17188c0.17578 0 0.29688-0.042969 0.35938-0.125 0.070312-0.074219 0.10938-0.23047 0.10938-0.46875zm0-1.1719h0.96875v0.78125h-0.96875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.875-2.8906v0.76562c-0.125-0.082031-0.25781-0.14453-0.39062-0.1875-0.13672-0.039062-0.27344-0.0625-0.40625-0.0625-0.27344 0-0.48047 0.078125-0.625 0.23438-0.14844 0.15625-0.21875 0.37109-0.21875 0.64062 0 0.28125 0.070313 0.5 0.21875 0.65625 0.14453 0.15625 0.35156 0.23438 0.625 0.23438 0.14453 0 0.28516-0.019531 0.42188-0.0625 0.13281-0.039063 0.25781-0.10938 0.375-0.20312v0.78125c-0.14844 0.0625-0.29688 0.10156-0.45312 0.125-0.15625 0.03125-0.3125 0.046875-0.46875 0.046875-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.48828 0.14844-0.86719 0.45312-1.1406 0.30078-0.28125 0.72266-0.42188 1.2656-0.42188 0.15625 0 0.3125 0.015625 0.46875 0.046875 0.15625 0.023437 0.30469 0.0625 0.45312 0.125z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm424.55 232.23-1.7266-1.0156-0.003907-0.003907c16.156-12.352 26.191-31.082 27.527-51.375 1.332-20.297-6.1602-40.18-20.559-54.543-14.398-14.363-34.297-21.809-54.59-20.426-20.289 1.3828-38.996 11.461-51.312 27.645-12.312 16.188-17.039 36.902-12.965 56.828 4.0781 19.926 16.562 37.117 34.242 47.164-11.836 4.375-28.438 13.539-36.445 31.719h0.003906c-5.8828-12.52-17.383-21.484-30.957-24.145-13.578-2.6562-27.605 1.3125-37.777 10.691-10.168 9.3789-15.262 23.039-13.715 36.785 1.5508 13.746 9.5586 25.934 21.559 32.812-3.3594 11.223-7.8516 41.695 28.438 71.094-3.1641 1.5273-6.0547 3.5703-8.5508 6.0469-5.9258 5.9062-9.2539 13.926-9.2617 22.289-0.007812 8.3672 3.3125 16.391 9.2266 22.305 5.9141 5.9141 13.938 9.2344 22.301 9.2305h133.5c13.387-0.015625 26.223-5.3398 35.688-14.805 9.4688-9.4609 14.793-22.297 14.812-35.684v-85.914c-0.089843-35.582-18.863-68.504-49.438-86.699zm-105.39-56.953c-0.003906-16.145 6.4062-31.629 17.82-43.043 11.414-11.418 26.895-17.832 43.039-17.836 16.145 0 31.629 6.4102 43.043 17.824 11.418 11.414 17.832 26.898 17.832 43.039 0 16.145-6.4102 31.629-17.828 43.043-11.414 11.414-26.895 17.828-43.039 17.828-16.137-0.015625-31.605-6.4336-43.016-17.844-11.41-11.406-17.832-26.875-17.852-43.012zm-83.465 111.43c-0.003906-8.9609 3.5508-17.559 9.8867-23.898 6.332-6.3398 14.926-9.9062 23.891-9.9062 8.9609-0.003907 17.559 3.5547 23.895 9.8906 6.3398 6.3359 9.9023 14.93 9.9023 23.895 0 8.9609-3.5625 17.559-9.9023 23.895-6.3359 6.3359-14.934 9.8945-23.895 9.8906-8.9531-0.011719-17.535-3.5703-23.867-9.9023-6.332-6.3281-9.8945-14.91-9.9102-23.863zm20.969 41.562c10.414 3.2227 21.664 2.4023 31.5-2.293 9.8398-4.6953 17.551-12.926 21.602-23.047 14.875 2.5039 93.801 19.109 98.086 89.555l-117.84-0.20703h-0.054687c-0.61328 0-1.2031 0.054687-1.8047 0.085937-37.504-26.84-34.398-54.008-31.488-64.137zm207.65 76.562c-0.011719 10.824-4.3164 21.199-11.969 28.852-7.6523 7.6523-18.027 11.957-28.852 11.969h-133.54c-7.5469-0.37891-14.363-4.6211-18.031-11.227s-3.668-14.637 0-21.242c3.668-6.6055 10.484-10.848 18.031-11.227l122.93 0.20703h0.054688c0.30469-0.027344 0.60547-0.089844 0.89844-0.18359 0.32812-0.035156 0.64844-0.10547 0.96094-0.21094 0.26953-0.14062 0.52344-0.30859 0.75391-0.5 0.27734-0.15234 0.53125-0.33203 0.76562-0.53906 0.20312-0.23828 0.37891-0.5 0.52734-0.77344 0.19141-0.23438 0.35938-0.48828 0.50391-0.75781 0.09375-0.3125 0.16016-0.63672 0.19531-0.96094 0.089844-0.29297 0.15234-0.59375 0.1875-0.89844l0.23047-94.852-0.003906 0.003906c0.007813-1.2852-0.5-2.5156-1.4023-3.4258-0.90625-0.91016-2.1367-1.4219-3.418-1.4219-2.6641 0.007813-4.8242 2.1602-4.8359 4.8242l-0.13281 53.789c-22.883-45.75-80.062-59.621-95.516-62.574v0.003906c0.58594-0.76562 0.91797-1.6953 0.95312-2.6602 0.63281-38.488 38.281-47.152 45.25-48.422l-0.003906 0.003907c18.301 5.7734 38.164 3.8203 54.984-5.4141l5.7656 3.4141-0.003906-0.003907c27.648 16.449 44.617 46.211 44.691 78.379z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#u')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '74.011719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '76.710938'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '80.417969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '84.109375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '86.722656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '90.433594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '96.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '100.167969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '105.636719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '109.367187'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '113.074219'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '116.785156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#t')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '121.835938'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '125.527344'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '128.222656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '133.816406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '137.074219'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '140.828125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '144.585938'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '148.480469'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '151.09375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '154.851562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '157.546875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '576.40625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '72.378906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '75.078125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '78.832031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '86.4375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '89.050781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '92.941406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '98.554688'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '103.132812'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '106.890625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '110.785156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '116.582031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '120.589844'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.285156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '127.042969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '128.917969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '132.625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '135.867188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '581.875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$suctioning = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm29.312-1.75c-1.5117 0.78125-3.0898 1.3711-4.7344 1.7656-1.6367 0.40625-3.3398 0.60938-5.1094 0.60938-5.3125 0-9.5273-1.4844-12.641-4.4531-3.1055-2.9688-4.6562-7-4.6562-12.094s1.5508-9.125 4.6562-12.094c3.1133-2.9688 7.3281-4.4531 12.641-4.4531 1.7695 0 3.4727 0.19922 5.1094 0.59375 1.6445 0.39844 3.2227 0.99219 4.7344 1.7812v6.5938c-1.5312-1.0391-3.0391-1.8008-4.5156-2.2812-1.4805-0.48828-3.0391-0.73438-4.6719-0.73438-2.9375 0-5.2461 0.94531-6.9219 2.8281-1.6797 1.875-2.5156 4.4648-2.5156 7.7656 0 3.293 0.83594 5.8828 2.5156 7.7656 1.6758 1.875 3.9844 2.8125 6.9219 2.8125 1.6328 0 3.1914-0.23828 4.6719-0.71875 1.4766-0.48828 2.9844-1.2539 4.5156-2.2969z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm21.453-17.406c-0.67969-0.3125-1.3516-0.53906-2.0156-0.6875-0.65625-0.15625-1.3203-0.23438-1.9844-0.23438-1.9688 0-3.4844 0.63281-4.5469 1.8906-1.0547 1.2617-1.5781 3.0703-1.5781 5.4219v11.016h-7.6562v-23.922h7.6562v3.9219c0.97656-1.5625 2.1016-2.7031 3.375-3.4219 1.2812-0.71875 2.8125-1.0781 4.5938-1.0781 0.25 0 0.52344 0.011719 0.82812 0.03125 0.30078 0.023438 0.73438 0.070312 1.2969 0.14062z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm27.562-12.031v2.1875h-17.891c0.1875 1.793 0.83203 3.1367 1.9375 4.0312 1.1133 0.89844 2.6719 1.3438 4.6719 1.3438 1.6016 0 3.25-0.23438 4.9375-0.70312 1.6875-0.47656 3.4219-1.2031 5.2031-2.1719v5.8906c-1.8047 0.6875-3.6094 1.2031-5.4219 1.5469-1.8125 0.35156-3.6211 0.53125-5.4219 0.53125-4.3359 0-7.7031-1.0977-10.109-3.2969-2.3984-2.207-3.5938-5.2969-3.5938-9.2656 0-3.9062 1.1758-6.9727 3.5312-9.2031 2.3633-2.2383 5.6094-3.3594 9.7344-3.3594 3.7578 0 6.7695 1.1367 9.0312 3.4062 2.2578 2.2617 3.3906 5.2812 3.3906 9.0625zm-7.8594-2.5312c0-1.457-0.42969-2.6289-1.2812-3.5156-0.84375-0.89453-1.9492-1.3438-3.3125-1.3438-1.4922 0-2.6992 0.41797-3.625 1.25-0.91797 0.83594-1.4922 2.0391-1.7188 3.6094z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.391-10.766c-1.5938 0-2.793 0.27344-3.5938 0.8125-0.80469 0.54297-1.2031 1.3398-1.2031 2.3906 0 0.96875 0.32031 1.7305 0.96875 2.2812 0.64453 0.54297 1.5469 0.8125 2.7031 0.8125 1.4375 0 2.6445-0.51562 3.625-1.5469 0.98828-1.0312 1.4844-2.3203 1.4844-3.875v-0.875zm11.688-2.8906v13.656h-7.7031v-3.5469c-1.0312 1.4492-2.1875 2.5078-3.4688 3.1719s-2.8398 1-4.6719 1c-2.4805 0-4.4961-0.72266-6.0469-2.1719-1.543-1.4453-2.3125-3.3203-2.3125-5.625 0-2.8125 0.96094-4.8672 2.8906-6.1719 1.9375-1.3125 4.9688-1.9688 9.0938-1.9688h4.5156v-0.60938c0-1.207-0.48047-2.0938-1.4375-2.6562-0.94922-0.5625-2.4375-0.84375-4.4688-0.84375-1.6367 0-3.1562 0.16797-4.5625 0.5-1.4062 0.32422-2.7188 0.8125-3.9375 1.4688v-5.8281c1.6445-0.40625 3.2891-0.70703 4.9375-0.90625 1.6562-0.20703 3.3047-0.3125 4.9531-0.3125 4.3203 0 7.4375 0.85547 9.3438 2.5625 1.9141 1.6992 2.875 4.4609 2.875 8.2812z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.031-30.719v6.7969h7.875v5.4688h-7.875v10.141c0 1.1172 0.21875 1.8711 0.65625 2.2656 0.4375 0.38672 1.3125 0.57812 2.625 0.57812h3.9375v5.4688h-6.5625c-3.0234 0-5.1641-0.62891-6.4219-1.8906-1.2617-1.2578-1.8906-3.3984-1.8906-6.4219v-10.141h-3.7969v-5.4688h3.7969v-6.7969z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm19.953-20.422v-12.812h7.6875v33.234h-7.6875v-3.4531c-1.0547 1.4062-2.2148 2.4375-3.4844 3.0938-1.2734 0.65625-2.7422 0.98438-4.4062 0.98438-2.9492 0-5.3711-1.1719-7.2656-3.5156-1.8867-2.3438-2.8281-5.3594-2.8281-9.0469s0.94141-6.7031 2.8281-9.0469c1.8945-2.3438 4.3164-3.5156 7.2656-3.5156 1.6562 0 3.1172 0.33594 4.3906 1 1.2812 0.65625 2.4453 1.6836 3.5 3.0781zm-5.0469 15.484c1.6445 0 2.8945-0.59766 3.75-1.7969 0.86328-1.1953 1.2969-2.9297 1.2969-5.2031 0-2.2812-0.43359-4.0195-1.2969-5.2188-0.85547-1.1953-2.1055-1.7969-3.75-1.7969-1.625 0-2.8711 0.60156-3.7344 1.7969-0.85547 1.1992-1.2812 2.9375-1.2812 5.2188 0 2.2734 0.42578 4.0078 1.2812 5.2031 0.86328 1.1992 2.1094 1.7969 3.7344 1.7969z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm16.406-4.9375c1.6328 0 2.8828-0.59766 3.75-1.7969 0.86328-1.1953 1.2969-2.9297 1.2969-5.2031 0-2.2812-0.43359-4.0195-1.2969-5.2188-0.86719-1.1953-2.1172-1.7969-3.75-1.7969-1.6367 0-2.8906 0.60547-3.7656 1.8125-0.875 1.1992-1.3125 2.9336-1.3125 5.2031 0 2.2617 0.4375 3.9961 1.3125 5.2031 0.875 1.1992 2.1289 1.7969 3.7656 1.7969zm-5.0781-15.484c1.0508-1.3945 2.2188-2.4219 3.5-3.0781 1.2812-0.66406 2.7539-1 4.4219-1 2.9453 0 5.3672 1.1719 7.2656 3.5156 1.8945 2.3438 2.8438 5.3594 2.8438 9.0469s-0.94922 6.7031-2.8438 9.0469c-1.8984 2.3438-4.3203 3.5156-7.2656 3.5156-1.668 0-3.1406-0.33594-4.4219-1s-2.4492-1.6914-3.5-3.0781v3.4531h-7.6562v-33.234h7.6562z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.53125-23.922h7.6562l6.4219 16.234 5.4688-16.234h7.6562l-10.062 26.188c-1.0117 2.6641-2.1953 4.5234-3.5469 5.5781-1.3438 1.0625-3.1211 1.5938-5.3281 1.5938h-4.4219v-5.0156h2.3906c1.3008 0 2.2422-0.21094 2.8281-0.625 0.59375-0.40625 1.0547-1.1484 1.3906-2.2188l0.20312-0.65625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm16.797-19.547c1.2891 0 2.2695-0.28125 2.9375-0.84375 0.67578-0.57031 1.0156-1.4141 1.0156-2.5312 0-1.0938-0.33984-1.9258-1.0156-2.5-0.66797-0.58203-1.6484-0.875-2.9375-0.875h-4.5625v6.75zm0.26562 13.953c1.6562 0 2.8984-0.34766 3.7344-1.0469 0.83203-0.69531 1.25-1.7539 1.25-3.1719 0-1.375-0.41797-2.4062-1.25-3.0938-0.82422-0.69531-2.0703-1.0469-3.7344-1.0469h-4.8281v8.3594zm7.6562-11.469c1.7578 0.51172 3.125 1.4609 4.0938 2.8438 0.96875 1.375 1.4531 3.0703 1.4531 5.0781 0 3.0742-1.043 5.3672-3.125 6.875-2.0742 1.5117-5.2305 2.2656-9.4688 2.2656h-13.656v-31.891h12.344c4.4258 0 7.6328 0.67188 9.625 2.0156 1.9883 1.3359 2.9844 3.4766 2.9844 6.4219 0 1.5547-0.36719 2.875-1.0938 3.9688-0.73047 1.0859-1.7812 1.8906-3.1562 2.4219z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm23-23.172v6.2344c-1.0312-0.71875-2.0742-1.2422-3.125-1.5781-1.043-0.34375-2.125-0.51562-3.25-0.51562-2.1367 0-3.8047 0.625-5 1.875-1.1875 1.2422-1.7812 2.9805-1.7812 5.2188 0 2.2305 0.59375 3.9688 1.7812 5.2188 1.1953 1.25 2.8633 1.875 5 1.875 1.1953 0 2.332-0.17578 3.4062-0.53125 1.0703-0.36328 2.0625-0.89453 2.9688-1.5938v6.2656c-1.1875 0.4375-2.4023 0.76562-3.6406 0.98438-1.2305 0.22656-2.4648 0.34375-3.7031 0.34375-4.3125 0-7.6875-1.1094-10.125-3.3281s-3.6562-5.2969-3.6562-9.2344c0-3.9453 1.2188-7.0234 3.6562-9.2344 2.4375-2.2188 5.8125-3.3281 10.125-3.3281 1.25 0 2.4844 0.10938 3.7031 0.32812s2.4297 0.55469 3.6406 1z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.6719-23.922h7.6562v23.922h-7.6562zm0-9.3125h7.6562v6.2344h-7.6562z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm22.359-23.172v5.7969c-1.6367-0.67578-3.2148-1.1875-4.7344-1.5312-1.5234-0.34375-2.9609-0.51562-4.3125-0.51562-1.4609 0-2.543 0.18359-3.25 0.54688-0.69922 0.36719-1.0469 0.92188-1.0469 1.6719 0 0.61719 0.26562 1.0898 0.79688 1.4219 0.53125 0.32422 1.4883 0.5625 2.875 0.71875l1.3438 0.1875c3.9141 0.5 6.5508 1.3242 7.9062 2.4688 1.3516 1.1367 2.0312 2.9219 2.0312 5.3594 0 2.5547-0.94531 4.4688-2.8281 5.75-1.875 1.2812-4.6797 1.9219-8.4062 1.9219-1.5859 0-3.2188-0.125-4.9062-0.375s-3.4219-0.625-5.2031-1.125v-5.8125c1.5195 0.74219 3.082 1.2969 4.6875 1.6719 1.6016 0.36719 3.2344 0.54688 4.8906 0.54688 1.4883 0 2.6094-0.20312 3.3594-0.60938 0.75781-0.41406 1.1406-1.0312 1.1406-1.8438 0-0.6875-0.26172-1.1953-0.78125-1.5312-0.52344-0.33203-1.5586-0.59375-3.1094-0.78125l-1.3438-0.17188c-3.4062-0.42578-5.793-1.2109-7.1562-2.3594-1.3672-1.1562-2.0469-2.9102-2.0469-5.2656 0-2.5312 0.86719-4.4062 2.6094-5.625 1.7383-1.2266 4.3984-1.8438 7.9844-1.8438 1.4062 0 2.8828 0.10938 4.4375 0.32812 1.5508 0.21094 3.2383 0.54297 5.0625 1z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm262.7 542.49c5.2344 0 10.492-0.22656 15.758-0.69922 28.996-2.5742 57.016-12.758 81.559-29.41l1.3047 1.3047c6.5273 6.5352 15.109 9.8008 23.688 9.8008 8.5742 0 17.16-3.2656 23.688-9.8008 13.062-13.062 13.062-34.309 0-47.371l-1.2266-1.2266c14.988-22.164 24.805-47.434 28.395-73.613l0.26953-2.0742c10.359-82.773 40.695-158.66 87.734-219.42l86.801-112.12c2.7031-3.4844 2.3789-8.4258-0.72656-11.543l-26.25-26.25c-3.1055-3.1055-8.0586-3.4297-11.543-0.72656l-112.12 86.801c-60.77 47.039-136.64 77.375-219.41 87.727l-2.0898 0.28125c-26.18 3.5859-51.449 13.395-73.613 28.395l-1.2266-1.2266c-13.055-13.062-34.316-13.062-47.371 0-13.062 13.062-13.062 34.309 0 47.371l1.3047 1.3047c-16.641 24.543-26.828 52.551-29.41 81.559-4.6094 52.047 13.809 102.96 50.547 139.7 33.016 33.012 77.48 51.238 123.94 51.238zm-153.88-141.3 119.98 119.98c-29.137-6.3711-56.141-20.773-77.672-42.305-21.535-21.543-35.93-48.539-42.309-77.676zm168.09 123.16c-6.625 0.58594-13.203 0.65625-19.75 0.42969l-151.94-151.94c-0.22656-6.5469-0.15625-13.133 0.42969-19.758 0.64844-7.2617 1.8711-14.438 3.5508-21.516l189.23 189.23c-7.0781 1.6797-14.254 2.9141-21.516 3.5586zm-35.961-312.89 1.8203-0.23438c85.891-10.746 164.72-42.297 227.96-91.262l106.03-82.086 15.348 15.348-82.082 106.02c-48.965 63.246-80.527 142.07-91.27 227.98l-0.24609 1.8555c-0.65625 4.8047-1.6641 9.5469-2.7734 14.27l-189.12-189.11c4.7422-1.1133 9.5039-2.1172 14.324-2.7852zm-33.355 8.4961 202.44 202.44c-3.9453 10.492-9.0117 20.605-15.145 30.109l-217.41-217.4c9.5039-6.1328 19.609-11.199 30.109-15.148zm-78.906 13.723c3.1133-3.1172 7.2188-4.6836 11.312-4.6836s8.1992 1.5586 11.312 4.6797l244.99 244.99c6.2383 6.2383 6.2383 16.391 0 22.629s-16.391 6.2383-22.629 0l-6.457-6.457-238.53-238.53c-6.2383-6.2383-6.2383-16.387 0-22.625zm218.77 266.15c-9.5273 6.1758-19.637 11.207-30.09 15.164l-202.36-202.37c3.9531-10.457 8.9844-20.562 15.164-30.09z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '102.109375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.683594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '153.355469'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '182.878906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '203.792969'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '233.464844'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '280.011719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '311.328125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '355.078125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '388.425781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '418.097656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '444.03125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '465.609375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '480.605469'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '691.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$vagexam = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'v'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm18.766-1.125c-0.96875 0.5-1.9805 0.875-3.0312 1.125-1.043 0.25781-2.1367 0.39062-3.2812 0.39062-3.3984 0-6.0898-0.94531-8.0781-2.8438-1.9922-1.9062-2.9844-4.4844-2.9844-7.7344 0-3.2578 0.99219-5.8359 2.9844-7.7344 1.9883-1.9062 4.6797-2.8594 8.0781-2.8594 1.1445 0 2.2383 0.13281 3.2812 0.39062 1.0508 0.25 2.0625 0.625 3.0312 1.125v4.2188c-0.98047-0.65625-1.9453-1.1406-2.8906-1.4531-0.94922-0.3125-1.9492-0.46875-3-0.46875-1.875 0-3.3516 0.60547-4.4219 1.8125-1.0742 1.1992-1.6094 2.8555-1.6094 4.9688 0 2.1055 0.53516 3.7617 1.6094 4.9688 1.0703 1.1992 2.5469 1.7969 4.4219 1.7969 1.0508 0 2.0508-0.14844 3-0.45312 0.94531-0.3125 1.9102-0.80078 2.8906-1.4688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm13.734-11.141c-0.4375-0.19531-0.87109-0.34375-1.2969-0.4375-0.41797-0.10156-0.83984-0.15625-1.2656-0.15625-1.2617 0-2.2305 0.40625-2.9062 1.2188-0.67969 0.80469-1.0156 1.9531-1.0156 3.4531v7.0625h-4.8906v-15.312h4.8906v2.5156c0.625-1 1.3438-1.7266 2.1562-2.1875 0.82031-0.46875 1.8008-0.70312 2.9375-0.70312 0.16406 0 0.34375 0.011719 0.53125 0.03125 0.19531 0.011719 0.47656 0.039062 0.84375 0.078125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.641-7.7031v1.4062h-11.453c0.125 1.1484 0.53906 2.0078 1.25 2.5781 0.70703 0.57422 1.7031 0.85938 2.9844 0.85938 1.0312 0 2.082-0.14844 3.1562-0.45312 1.082-0.3125 2.1914-0.77344 3.3281-1.3906v3.7656c-1.1562 0.4375-2.3125 0.76562-3.4688 0.98438-1.1562 0.22656-2.3125 0.34375-3.4688 0.34375-2.7734 0-4.9297-0.70312-6.4688-2.1094-1.5312-1.4062-2.2969-3.3789-2.2969-5.9219 0-2.5 0.75391-4.4609 2.2656-5.8906 1.5078-1.4375 3.582-2.1562 6.2188-2.1562 2.4062 0 4.332 0.73047 5.7812 2.1875 1.4453 1.4492 2.1719 3.3828 2.1719 5.7969zm-5.0312-1.625c0-0.92578-0.27344-1.6719-0.8125-2.2344-0.54297-0.57031-1.25-0.85938-2.125-0.85938-0.94922 0-1.7188 0.26562-2.3125 0.79688s-0.96484 1.2969-1.1094 2.2969z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.2188-6.8906c-1.0234 0-1.793 0.17188-2.3125 0.51562-0.51172 0.34375-0.76562 0.85547-0.76562 1.5312 0 0.625 0.20703 1.1172 0.625 1.4688 0.41406 0.34375 0.98828 0.51562 1.7188 0.51562 0.92578 0 1.7031-0.32812 2.3281-0.98438 0.63281-0.66406 0.95312-1.4922 0.95312-2.4844v-0.5625zm7.4688-1.8438v8.7344h-4.9219v-2.2656c-0.65625 0.92969-1.3984 1.6055-2.2188 2.0312-0.82422 0.41406-1.8242 0.625-3 0.625-1.5859 0-2.8711-0.45703-3.8594-1.375-0.99219-0.92578-1.4844-2.1289-1.4844-3.6094 0-1.7891 0.61328-3.1016 1.8438-3.9375 1.2383-0.84375 3.1797-1.2656 5.8281-1.2656h2.8906v-0.39062c0-0.76953-0.30859-1.332-0.92188-1.6875-0.61719-0.36328-1.5703-0.54688-2.8594-0.54688-1.0547 0-2.0312 0.10547-2.9375 0.3125-0.89844 0.21094-1.7305 0.52344-2.5 0.9375v-3.7344c1.0391-0.25 2.0859-0.44141 3.1406-0.57812 1.0625-0.13281 2.125-0.20312 3.1875-0.20312 2.7578 0 4.75 0.54688 5.9688 1.6406 1.2266 1.0859 1.8438 2.8555 1.8438 5.3125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm7.7031-19.656v4.3438h5.0469v3.5h-5.0469v6.5c0 0.71094 0.14062 1.1875 0.42188 1.4375s0.83594 0.375 1.6719 0.375h2.5156v3.5h-4.1875c-1.9375 0-3.3125-0.39844-4.125-1.2031-0.80469-0.8125-1.2031-2.1797-1.2031-4.1094v-6.5h-2.4219v-3.5h2.4219v-4.3438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.766-13.078v-8.2031h4.9219v21.281h-4.9219v-2.2188c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2969 1.8125-5.7969 1.207-1.5 2.7539-2.25 4.6406-2.25 1.0625 0 2 0.21484 2.8125 0.64062 0.82031 0.42969 1.5664 1.0859 2.2344 1.9688zm-3.2188 9.9219c1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm10.5-3.1562c1.0508 0 1.8516-0.37891 2.4062-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3555-1.1562-2.4062-1.1562-1.0547 0-1.8594 0.38672-2.4219 1.1562-0.55469 0.77344-0.82812 1.8828-0.82812 3.3281 0 1.4492 0.27344 2.5586 0.82812 3.3281 0.5625 0.77344 1.3672 1.1562 2.4219 1.1562zm-3.25-9.9219c0.67578-0.88281 1.4219-1.5391 2.2344-1.9688 0.82031-0.42578 1.7656-0.64062 2.8281-0.64062 1.8945 0 3.4453 0.75 4.6562 2.25 1.207 1.5 1.8125 3.4336 1.8125 5.7969 0 2.3555-0.60547 4.2812-1.8125 5.7812-1.2109 1.5-2.7617 2.25-4.6562 2.25-1.0625 0-2.0078-0.21094-2.8281-0.625-0.8125-0.42578-1.5586-1.0859-2.2344-1.9844v2.2188h-4.8906v-21.281h4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.34375-15.312h4.8906l4.125 10.391 3.5-10.391h4.8906l-6.4375 16.766c-0.64844 1.6953-1.4023 2.8828-2.2656 3.5625-0.86719 0.6875-2 1.0312-3.4062 1.0312h-2.8438v-3.2188h1.5312c0.83203 0 1.4375-0.13672 1.8125-0.40625 0.38281-0.26172 0.67969-0.73047 0.89062-1.4062l0.14062-0.42188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.312h-4.8906zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'u'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.42188-15.312h4.8906l3.8281 10.578 3.7969-10.578h4.9062l-6.0312 15.312h-5.375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 't'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.312-14.828v3.7188c-1.043-0.4375-2.0547-0.76562-3.0312-0.98438-0.98047-0.21875-1.9023-0.32812-2.7656-0.32812-0.92969 0-1.6211 0.11719-2.0781 0.34375-0.44922 0.23047-0.67188 0.58984-0.67188 1.0781 0 0.38672 0.17188 0.68359 0.51562 0.89062 0.34375 0.21094 0.95703 0.36719 1.8438 0.46875l0.85938 0.125c2.5078 0.32422 4.1953 0.85156 5.0625 1.5781 0.86328 0.73047 1.2969 1.8711 1.2969 3.4219 0 1.6367-0.60547 2.8672-1.8125 3.6875-1.1992 0.8125-2.9922 1.2188-5.375 1.2188-1.0234 0-2.0742-0.078125-3.1562-0.23438-1.0742-0.15625-2.1797-0.39453-3.3125-0.71875v-3.7188c0.96875 0.48047 1.9609 0.83984 2.9844 1.0781 1.0312 0.23047 2.0781 0.34375 3.1406 0.34375 0.95703 0 1.6758-0.12891 2.1562-0.39062 0.47656-0.26953 0.71875-0.66406 0.71875-1.1875 0-0.4375-0.16797-0.75781-0.5-0.96875-0.33594-0.21875-0.99609-0.38281-1.9844-0.5l-0.85938-0.10938c-2.1797-0.26953-3.7031-0.77344-4.5781-1.5156-0.875-0.73828-1.3125-1.8594-1.3125-3.3594 0-1.625 0.55078-2.8281 1.6562-3.6094 1.1133-0.78906 2.8203-1.1875 5.125-1.1875 0.89453 0 1.8359 0.074219 2.8281 0.21875 1 0.13672 2.082 0.35156 3.25 0.64062z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.1875-5.9688v-9.3438h4.9219v1.5312c0 0.83594-0.007813 1.875-0.015625 3.125-0.011719 1.25-0.015625 2.0859-0.015625 2.5 0 1.2422 0.03125 2.1328 0.09375 2.6719 0.070313 0.54297 0.17969 0.93359 0.32812 1.1719 0.20703 0.32422 0.47266 0.57422 0.79688 0.75 0.32031 0.16797 0.69141 0.25 1.1094 0.25 1.0195 0 1.8203-0.39062 2.4062-1.1719 0.58203-0.78125 0.875-1.8672 0.875-3.2656v-7.5625h4.8906v15.312h-4.8906v-2.2188c-0.74219 0.89844-1.5234 1.5586-2.3438 1.9844-0.82422 0.41406-1.7344 0.625-2.7344 0.625-1.7617 0-3.1055-0.53906-4.0312-1.625-0.92969-1.082-1.3906-2.6602-1.3906-4.7344z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-21.281h4.8906v21.281h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm12.422-21.281v3.2188h-2.7031c-0.6875 0-1.1719 0.125-1.4531 0.375-0.27344 0.25-0.40625 0.6875-0.40625 1.3125v1.0625h4.1875v3.5h-4.1875v11.812h-4.8906v-11.812h-2.4375v-3.5h2.4375v-1.0625c0-1.6641 0.46094-2.8984 1.3906-3.7031 0.92578-0.80078 2.3672-1.2031 4.3281-1.2031z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm9.6406-12.188c-1.0859 0-1.9141 0.39062-2.4844 1.1719-0.57422 0.78125-0.85938 1.9062-0.85938 3.375s0.28516 2.5938 0.85938 3.375c0.57031 0.77344 1.3984 1.1562 2.4844 1.1562 1.0625 0 1.875-0.38281 2.4375-1.1562 0.57031-0.78125 0.85938-1.9062 0.85938-3.375s-0.28906-2.5938-0.85938-3.375c-0.5625-0.78125-1.375-1.1719-2.4375-1.1719zm0-3.5c2.6328 0 4.6914 0.71484 6.1719 2.1406 1.4766 1.418 2.2188 3.3867 2.2188 5.9062 0 2.5117-0.74219 4.4805-2.2188 5.9062-1.4805 1.418-3.5391 2.125-6.1719 2.125-2.6484 0-4.7148-0.70703-6.2031-2.125-1.4922-1.4258-2.2344-3.3945-2.2344-5.9062 0-2.5195 0.74219-4.4883 2.2344-5.9062 1.4883-1.4258 3.5547-2.1406 6.2031-2.1406z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm16.547-12.766c0.61328-0.94531 1.3477-1.6719 2.2031-2.1719 0.85156-0.5 1.7891-0.75 2.8125-0.75 1.7578 0 3.0977 0.54688 4.0156 1.6406 0.92578 1.0859 1.3906 2.6562 1.3906 4.7188v9.3281h-4.9219v-7.9844-0.35938c0.007813-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.082-0.16406-1.8633-0.48438-2.3438-0.3125-0.48828-0.82422-0.73438-1.5312-0.73438-0.92969 0-1.6484 0.38672-2.1562 1.1562-0.51172 0.76172-0.77344 1.8672-0.78125 3.3125v7.5156h-4.9219v-7.9844c0-1.6953-0.14844-2.7852-0.4375-3.2656-0.29297-0.48828-0.8125-0.73438-1.5625-0.73438-0.9375 0-1.6641 0.38672-2.1719 1.1562-0.51172 0.76172-0.76562 1.8594-0.76562 3.2969v7.5312h-4.9219v-15.312h4.9219v2.2344c0.60156-0.86328 1.2891-1.5156 2.0625-1.9531 0.78125-0.4375 1.6406-0.65625 2.5781-0.65625 1.0625 0 2 0.25781 2.8125 0.76562 0.8125 0.51172 1.4258 1.2305 1.8438 2.1562z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1094c0-1.3438-0.03125-2.2656-0.09375-2.7656s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-21.281h4.8906v8.2031c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h5.875l7.4219 14v-14h4.9844v20.406h-5.875l-7.4219-14v14h-4.9844z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm17.75-9.3281v9.3281h-4.9219v-7.1406c0-1.3203-0.03125-2.2344-0.09375-2.7344s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-15.312h4.8906v2.2344c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.5781-20.406h8.7344c2.5938 0 4.582 0.57812 5.9688 1.7344 1.3945 1.1484 2.0938 2.7891 2.0938 4.9219 0 2.1367-0.69922 3.7812-2.0938 4.9375-1.3867 1.1562-3.375 1.7344-5.9688 1.7344h-3.4844v7.0781h-5.25zm5.25 3.8125v5.7031h2.9219c1.0195 0 1.8047-0.25 2.3594-0.75 0.5625-0.5 0.84375-1.2031 0.84375-2.1094 0-0.91406-0.28125-1.6172-0.84375-2.1094-0.55469-0.48828-1.3398-0.73438-2.3594-0.73438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm2.3594-15.312h4.8906v15.031c0 2.0508-0.49609 3.6172-1.4844 4.7031-0.98047 1.082-2.4062 1.625-4.2812 1.625h-2.4219v-3.2188h0.85938c0.92578 0 1.5625-0.21094 1.9062-0.625 0.35156-0.41797 0.53125-1.2461 0.53125-2.4844zm0-5.9688h4.8906v4h-4.8906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm14.719-14.828v3.9844c-0.65625-0.45703-1.3242-0.79688-2-1.0156-0.66797-0.21875-1.3594-0.32812-2.0781-0.32812-1.3672 0-2.4336 0.40234-3.2031 1.2031-0.76172 0.79297-1.1406 1.9062-1.1406 3.3438 0 1.4297 0.37891 2.543 1.1406 3.3438 0.76953 0.79297 1.8359 1.1875 3.2031 1.1875 0.75781 0 1.4844-0.10938 2.1719-0.32812 0.6875-0.22656 1.3203-0.56641 1.9062-1.0156v4c-0.76172 0.28125-1.5391 0.48828-2.3281 0.625-0.78125 0.14453-1.5742 0.21875-2.375 0.21875-2.7617 0-4.9219-0.70703-6.4844-2.125-1.5547-1.4141-2.3281-3.3828-2.3281-5.9062 0-2.5312 0.77344-4.5039 2.3281-5.9219 1.5625-1.4141 3.7227-2.125 6.4844-2.125 0.80078 0 1.5938 0.074219 2.375 0.21875 0.78125 0.13672 1.5547 0.35156 2.3281 0.64062z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm487.55 252.2c-0.57031-18.277-10.102-29.188-25.504-29.188-8.8242 0-14.766 4.1562-18.562 9.2969v-5.5703c0-4.4062-4.6719-26.773-26.863-26.773-9.8516 0-16.43 4.8828-20.551 10.719v-110.39c0-7.7578-5.5039-29.898-29.98-29.898-19.562 0-27.004 17.746-28.23 27.492v5.7617c-5.2148-8.0859-13.234-10.289-20.418-10.289-7.7578 0-14.125 2.4648-18.922 7.3203-9.2305 9.3359-9.1602 24.121-9.1562 24.711v182.62c0 0.64453-0.33203 1.1758-0.90625 1.457-1.0078 0.5-2.4883 0.10156-4.2188-1.2539-4.6875-3.5625-10.504-8.793-16.391-14.734l-3.9102-3.9883c-9.6875-9.918-20.668-21.152-31.711-26.801-24.82-12.699-43.793-2.8945-49.918 6.2656-3.2461 4.8477-4.3672 9.8164-3.332 14.762 1.3594 6.4844 6.4297 12.562 15.055 18.047 24.445 15.539 52.602 52.555 64.656 77.934 9.3242 19.629 26.879 36.289 42.371 50.992 10.227 9.7109 19.062 18.094 23.336 25.316 0.86328 1.4453 1.8438 4.1367 2.2852 5.4727v48.383c0 1.5469 1.2539 2.8008 2.8008 2.8008 1.5469 0 2.8008-1.2539 2.8008-2.8008v-48.832c0-0.29297-0.042969-0.57812-0.12891-0.84375-0.14453-0.46484-1.4766-4.582-2.9336-7.0352-4.6719-7.8867-13.766-16.52-24.297-26.516-15.137-14.371-32.297-30.66-41.172-49.348-12.668-26.656-41.086-63.969-66.711-80.254-7.3086-4.6484-11.543-9.5156-12.578-14.469-0.71875-3.4141 0.125-6.9453 2.5039-10.5 5.0625-7.5586 21.129-15.434 42.719-4.3945 10.227 5.2305 21.332 16.594 30.25 25.727l3.9375 4.0078c6.1484 6.2109 12.023 11.484 17.176 15.398 3.1797 2.5078 6.8711 3.1406 9.8633 1.6875 2.5039-1.2227 4.0586-3.7031 4.0586-6.4922l-0.011719-182.64c0-0.12891-0.023437-13.121 7.5586-20.77 3.707-3.7422 8.7266-5.6328 14.918-5.6328 13.547 0 20.418 9.7617 20.418 29.012v136.7c0 1.5469 1.2539 2.8008 2.8008 2.8008 1.5469 0 2.8008-1.2539 2.8008-2.8008v-136.7c0-0.60547-0.003907-1.2031-0.015625-1.7852v-27.945c0.11719-0.90625 3.0742-22.25 22.652-22.25 23.328 0 24.383 24.059 24.383 24.297v160.26c0 1.5469 1.2539 2.8008 2.8008 2.8008s2.8008-1.2539 2.8008-2.8008v-35.875c0.39063-2.1602 4.0312-19.113 20.551-19.113 18.984 0 21.258 20.996 21.262 21.172v35.18c0 1.5469 1.2539 2.8008 2.8008 2.8008s2.8008-1.2539 2.8008-2.8008v-15.449c0.28516-1.9141 3.1289-17.852 18.562-17.852 17.297 0 19.684 16.613 19.902 23.762 0.28125 9.3516-1.082 146.2-1.082 147.31l-0.28125 2.3789c-1.2031 10.348-3.9414 18.883-5.75 24.527l-0.83984 2.6602c-1.9805 6.5352-1.8828 13.109-1.875 13.328l0.054687 67.402c0 1.5469 1.2539 2.8008 2.8008 2.8008 1.5469 0 2.8008-1.2617 2.8008-2.8008l-0.054688-67.402v-0.054688c0-0.10156-0.085937-6.0039 1.6367-11.637l0.81641-2.582c1.7656-5.4922 4.7227-14.699 5.9805-25.547l0.30078-2.7383c0.046875-5.6523 1.3711-138.36 1.0898-147.82z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm275.7 168.66c0.51563 0.42188 1.1406 0.62109 1.7539 0.62109 0.81641 0 1.6289-0.35156 2.1836-1.043 0.96875-1.2031 0.78516-2.9688-0.42187-3.9375-13.742-11.09-21.629-27.562-21.629-45.203 0-32.02 26.051-58.07 58.078-58.07 4.6992 0 9.5352 0.62891 14.375 1.8711 0.87891 0.21094 1.793 0.011718 2.4883-0.55859 10.387-8.6406 23.566-13.402 37.09-13.402 32.027 0 58.078 26.051 58.078 58.07 0 17.863-8.0469 34.473-22.07 45.566-1.2109 0.95703-1.418 2.7227-0.46094 3.9297 0.96484 1.2148 2.7266 1.418 3.9375 0.46094 15.371-12.156 24.191-30.367 24.191-49.957v-0.003906c0-35.113-28.566-63.672-63.676-63.672-14.348 0-28.34 4.8945-39.562 13.797-4.8398-1.1367-9.6719-1.707-14.391-1.707-35.113 0-63.676 28.566-63.676 63.672v0.003906c0 19.34 8.6406 37.406 23.711 49.562z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#v')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '90.550781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '104.359375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '123.347656'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '142.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '155.628906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '174.617188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '204.410156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '224.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '252.453125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '262.046875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#u')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '280.300781'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '289.898438'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#t')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '306.5625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '326.5'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '345.390625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '644'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '70'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '82.183594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '95.992188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '115.226562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '154.152344'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '167.535156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '187.46875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '216.207031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '239.640625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '258.878906'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '278.8125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '308.492188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '329.015625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '342.820312'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '362.058594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '371.65625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '390.648438'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '407.242188'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '672'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Assets$Icons$waitpush = function (attrs) {
	return A3(
		$elm$svg$Svg$node,
		'svg',
		_Utils_ap(
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'width', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'height', '700pt'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'version', '1.1'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 700 700'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
				]),
			attrs),
		_List_fromArray(
			[
				A3(
				$elm$svg$Svg$node,
				'defs',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 's'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm27.578-1.6562c-1.418 0.74219-2.8984 1.2969-4.4375 1.6719-1.543 0.375-3.1523 0.5625-4.8281 0.5625-5 0-8.9648-1.3945-11.891-4.1875-2.918-2.7891-4.375-6.582-4.375-11.375 0-4.7891 1.457-8.582 4.375-11.375 2.9258-2.8008 6.8906-4.2031 11.891-4.2031 1.6758 0 3.2852 0.1875 4.8281 0.5625 1.5391 0.375 3.0195 0.93359 4.4375 1.6719v6.2188c-1.4297-0.97656-2.8398-1.6953-4.2344-2.1562-1.3984-0.45703-2.8672-0.6875-4.4062-0.6875-2.7617 0-4.9336 0.88672-6.5156 2.6562-1.5859 1.7734-2.375 4.2109-2.375 7.3125 0 3.1055 0.78906 5.543 2.375 7.3125 1.582 1.7617 3.7539 2.6406 6.5156 2.6406 1.5391 0 3.0078-0.22266 4.4062-0.67188 1.3945-0.45703 2.8047-1.1758 4.2344-2.1562z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'c'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm20.188-16.391c-0.63672-0.28906-1.2656-0.50391-1.8906-0.64062-0.61719-0.14453-1.2422-0.21875-1.875-0.21875-1.8438 0-3.2656 0.59375-4.2656 1.7812s-1.5 2.8867-1.5 5.0938v10.375h-7.2031v-22.516h7.2031v3.7031c0.92578-1.4766 1.9883-2.5547 3.1875-3.2344 1.1953-0.67578 2.6328-1.0156 4.3125-1.0156 0.23828 0 0.5 0.011719 0.78125 0.03125 0.28125 0.023438 0.6875 0.070312 1.2188 0.14062z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'b'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm25.938-11.312v2.0469h-16.828c0.17578 1.6875 0.78516 2.9531 1.8281 3.7969 1.0391 0.84375 2.5 1.2656 4.375 1.2656 1.5195 0 3.0703-0.22266 4.6562-0.67188 1.5938-0.44531 3.2266-1.1289 4.9062-2.0469v5.5625c-1.7109 0.63672-3.418 1.1172-5.125 1.4375-1.6992 0.33203-3.3984 0.5-5.0938 0.5-4.0742 0-7.2422-1.0312-9.5-3.0938-2.2617-2.0703-3.3906-4.9766-3.3906-8.7188 0-3.6758 1.1094-6.5664 3.3281-8.6719 2.2188-2.1016 5.2695-3.1562 9.1562-3.1562 3.5391 0 6.375 1.0703 8.5 3.2031 2.125 2.125 3.1875 4.9766 3.1875 8.5469zm-7.4062-2.3906c0-1.375-0.40234-2.4766-1.2031-3.3125-0.79297-0.84375-1.8281-1.2656-3.1094-1.2656-1.3984 0-2.5312 0.39844-3.4062 1.1875-0.86719 0.78125-1.4062 1.9141-1.625 3.3906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'e'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm13.547-10.125c-1.5 0-2.6328 0.25781-3.3906 0.76562-0.75 0.5-1.125 1.25-1.125 2.25 0 0.90625 0.30078 1.6211 0.90625 2.1406 0.61328 0.51172 1.4609 0.76562 2.5469 0.76562 1.3516 0 2.4883-0.48438 3.4062-1.4531 0.92578-0.96875 1.3906-2.1875 1.3906-3.6562v-0.8125zm11-2.7188v12.844h-7.2656v-3.3438c-0.96094 1.375-2.043 2.375-3.25 3-1.2109 0.61328-2.6797 0.92188-4.4062 0.92188-2.3359 0-4.2305-0.67578-5.6875-2.0312-1.4492-1.3633-2.1719-3.1289-2.1719-5.2969 0-2.6445 0.90625-4.582 2.7188-5.8125 1.8203-1.2383 4.6758-1.8594 8.5625-1.8594h4.2344v-0.5625c0-1.1328-0.44922-1.9688-1.3438-2.5-0.89844-0.53125-2.2969-0.79688-4.2031-0.79688-1.543 0-2.9766 0.15625-4.2969 0.46875-1.3242 0.3125-2.5586 0.77734-3.7031 1.3906v-5.4844c1.5391-0.375 3.0859-0.66016 4.6406-0.85938 1.5625-0.19531 3.1172-0.29688 4.6719-0.29688 4.0625 0 6.9922 0.80469 8.7969 2.4062 1.8008 1.6055 2.7031 4.2109 2.7031 7.8125z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'a'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm11.312-28.906v6.3906h7.4219v5.1406h-7.4219v9.5625c0 1.043 0.20703 1.75 0.625 2.125 0.41406 0.36719 1.2422 0.54688 2.4844 0.54688h3.6875v5.1406h-6.1719c-2.8438 0-4.8594-0.59375-6.0469-1.7812-1.1797-1.1875-1.7656-3.1953-1.7656-6.0312v-9.5625h-3.5781v-5.1406h3.5781v-6.3906z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'd'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm18.781-19.219v-12.062h7.2344v31.281h-7.2344v-3.25c-1 1.3242-2.1016 2.293-3.2969 2.9062-1.1875 0.61328-2.5625 0.92188-4.125 0.92188-2.7734 0-5.0547-1.0977-6.8438-3.2969-1.7812-2.207-2.6719-5.0469-2.6719-8.5156s0.89062-6.3047 2.6719-8.5156c1.7891-2.207 4.0703-3.3125 6.8438-3.3125 1.5508 0 2.9258 0.3125 4.125 0.9375 1.1953 0.625 2.2969 1.5938 3.2969 2.9062zm-4.75 14.578c1.5391 0 2.7188-0.5625 3.5312-1.6875s1.2188-2.7578 1.2188-4.9062c0-2.1445-0.40625-3.7812-1.2188-4.9062s-1.9922-1.6875-3.5312-1.6875c-1.5312 0-2.7031 0.5625-3.5156 1.6875-0.80469 1.125-1.2031 2.7617-1.2031 4.9062 0 2.1484 0.39844 3.7812 1.2031 4.9062 0.8125 1.125 1.9844 1.6875 3.5156 1.6875z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'i'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm15.438-4.6406c1.5391 0 2.7188-0.5625 3.5312-1.6875s1.2188-2.7578 1.2188-4.9062c0-2.1445-0.40625-3.7812-1.2188-4.9062s-1.9922-1.6875-3.5312-1.6875c-1.543 0-2.7266 0.57031-3.5469 1.7031-0.82422 1.125-1.2344 2.7578-1.2344 4.8906 0 2.125 0.41016 3.7578 1.2344 4.8906 0.82031 1.1367 2.0039 1.7031 3.5469 1.7031zm-4.7812-14.578c0.98828-1.3125 2.0859-2.2812 3.2969-2.9062 1.207-0.625 2.5938-0.9375 4.1562-0.9375 2.7812 0 5.0625 1.1055 6.8438 3.3125 1.7812 2.2109 2.6719 5.0469 2.6719 8.5156s-0.89062 6.3086-2.6719 8.5156c-1.7812 2.1992-4.0625 3.2969-6.8438 3.2969-1.5625 0-2.9492-0.30859-4.1562-0.92188-1.2109-0.625-2.3086-1.5938-3.2969-2.9062v3.25h-7.2031v-31.281h7.2031z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'h'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm0.5-22.516h7.2031l6.0469 15.281 5.1406-15.281h7.2031l-9.4688 24.641c-0.94922 2.5078-2.0586 4.2656-3.3281 5.2656-1.2617 1-2.9336 1.5-5.0156 1.5h-4.1562v-4.7344h2.25c1.2188 0 2.1016-0.19531 2.6562-0.57812 0.5625-0.38672 0.99219-1.0859 1.2969-2.0938l0.20312-0.625z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'g'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm22-5.4688h-12.109l-1.9062 5.4688h-7.7812l11.109-30.016h9.2344l11.109 30.016h-7.7656zm-10.172-5.5625h8.2188l-4.1094-11.953z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'r'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm26.094-13.703v13.703h-7.2344v-10.5c0-1.9375-0.046875-3.2734-0.14062-4.0156-0.085938-0.73828-0.23047-1.2812-0.4375-1.625-0.28125-0.46875-0.66797-0.83203-1.1562-1.0938-0.48047-0.25781-1.0273-0.39062-1.6406-0.39062-1.5 0-2.6836 0.57812-3.5469 1.7344-0.85547 1.1562-1.2812 2.7617-1.2812 4.8125v11.078h-7.2031v-22.516h7.2031v3.2969c1.082-1.3125 2.2344-2.2812 3.4531-2.9062s2.5664-0.9375 4.0469-0.9375c2.5938 0 4.5625 0.79688 5.9062 2.3906 1.3516 1.5938 2.0312 3.918 2.0312 6.9688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'f'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4531-22.516h7.2031v22.109c0 3.0195-0.72656 5.3203-2.1719 6.9062-1.4492 1.5938-3.5469 2.3906-6.2969 2.3906h-3.5469v-4.7344h1.2344c1.375 0 2.3125-0.30859 2.8125-0.92188 0.50781-0.61719 0.76562-1.8281 0.76562-3.6406zm0-8.7656h7.2031v5.875h-7.2031z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'q'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm21.047-21.812v5.4688c-1.543-0.64453-3.0312-1.1289-4.4688-1.4531-1.4297-0.32031-2.7773-0.48438-4.0469-0.48438-1.375 0-2.3984 0.17188-3.0625 0.51562-0.65625 0.34375-0.98438 0.87109-0.98438 1.5781 0 0.58594 0.25 1.0312 0.75 1.3438 0.5 0.30469 1.3984 0.52734 2.7031 0.67188l1.2656 0.1875c3.6875 0.46875 6.1641 1.2422 7.4375 2.3125 1.2812 1.0625 1.9219 2.7422 1.9219 5.0312 0 2.4062-0.88672 4.2148-2.6562 5.4219-1.7734 1.1992-4.4141 1.7969-7.9219 1.7969-1.4922 0-3.0312-0.12109-4.625-0.35938-1.5859-0.22656-3.2148-0.57812-4.8906-1.0469v-5.4688c1.4375 0.69922 2.9062 1.2266 4.4062 1.5781 1.5078 0.34375 3.0469 0.51562 4.6094 0.51562 1.4062 0 2.4609-0.19141 3.1719-0.57812 0.70703-0.39453 1.0625-0.97266 1.0625-1.7344 0-0.64453-0.24609-1.125-0.73438-1.4375-0.49219-0.3125-1.4648-0.55469-2.9219-0.73438l-1.2656-0.15625c-3.2109-0.40625-5.4609-1.1484-6.75-2.2344-1.2812-1.082-1.9219-2.7266-1.9219-4.9375 0-2.3828 0.81641-4.1562 2.4531-5.3125 1.6328-1.1562 4.1445-1.7344 7.5312-1.7344 1.3203 0 2.7109 0.10547 4.1719 0.3125 1.457 0.19922 3.0469 0.51172 4.7656 0.9375z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'p'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.7812-30.016h7.7344v10.953l11.156-10.953h8.9844l-14.453 14.219 15.953 15.797h-9.7031l-11.938-11.828v11.828h-7.7344z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'o'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.4531-22.516h7.2031v22.516h-7.2031zm0-8.7656h7.2031v5.875h-7.2031z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'n'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm24.328-18.781c0.90625-1.3945 1.9844-2.457 3.2344-3.1875 1.2578-0.72656 2.6406-1.0938 4.1406-1.0938 2.582 0 4.5508 0.79688 5.9062 2.3906 1.3516 1.5938 2.0312 3.918 2.0312 6.9688v13.703h-7.2344v-11.734c0.007812-0.17578 0.019531-0.35938 0.03125-0.54688 0.007812-0.1875 0.015625-0.45703 0.015625-0.8125 0-1.5938-0.23438-2.7422-0.70312-3.4531-0.46875-0.71875-1.2305-1.0781-2.2812-1.0781-1.3672 0-2.4219 0.5625-3.1719 1.6875-0.74219 1.125-1.1211 2.75-1.1406 4.875v11.062h-7.25v-11.734c0-2.5-0.21484-4.1016-0.64062-4.8125-0.42969-0.71875-1.1875-1.0781-2.2812-1.0781-1.3867 0-2.4531 0.57031-3.2031 1.7031-0.75 1.125-1.125 2.7422-1.125 4.8438v11.078h-7.2344v-22.516h7.2344v3.2969c0.88281-1.2695 1.8984-2.2266 3.0469-2.875 1.1445-0.64453 2.4062-0.96875 3.7812-0.96875 1.5625 0 2.9375 0.375 4.125 1.125 1.1953 0.75 2.1016 1.8047 2.7188 3.1562z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'm'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm18.281-31.281v4.7188h-3.9844c-1.0234 0-1.7344 0.1875-2.1406 0.5625-0.39844 0.36719-0.59375 1.0078-0.59375 1.9219v1.5625h6.1562v5.1406h-6.1562v17.375h-7.2031v-17.375h-3.5781v-5.1406h3.5781v-1.5625c0-2.457 0.67969-4.2695 2.0469-5.4375 1.375-1.1758 3.4922-1.7656 6.3594-1.7656z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'l'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm26.094-13.703v13.703h-7.2344v-10.453c0-1.9688-0.046875-3.3203-0.14062-4.0625-0.085938-0.73828-0.23047-1.2812-0.4375-1.625-0.28125-0.46875-0.66797-0.83203-1.1562-1.0938-0.48047-0.25781-1.0273-0.39062-1.6406-0.39062-1.5 0-2.6836 0.57812-3.5469 1.7344-0.85547 1.1562-1.2812 2.7617-1.2812 4.8125v11.078h-7.2031v-31.281h7.2031v12.062c1.082-1.3125 2.2344-2.2812 3.4531-2.9062s2.5664-0.9375 4.0469-0.9375c2.5938 0 4.5625 0.79688 5.9062 2.3906 1.3516 1.5938 2.0312 3.918 2.0312 6.9688z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'k'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.7812-30.016h8.6406l10.922 20.594v-20.594h7.3281v30.016h-8.6406l-10.906-20.594v20.594h-7.3438z')
									]),
								_List_Nil)
							])),
						A3(
						$elm$svg$Svg$node,
						'symbol',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'id', 'j'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'overflow', 'visible')
							]),
						_List_fromArray(
							[
								A3(
								$elm$svg$Svg$node,
								'path',
								_List_fromArray(
									[
										A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm3.7812-30.016h12.844c3.8203 0 6.7539 0.85156 8.7969 2.5469 2.0391 1.6992 3.0625 4.1172 3.0625 7.25 0 3.1484-1.0234 5.5703-3.0625 7.2656-2.043 1.6992-4.9766 2.5469-8.7969 2.5469h-5.1094v10.406h-7.7344zm7.7344 5.6094v8.3906h4.2812c1.5 0 2.6562-0.36328 3.4688-1.0938 0.82031-0.73828 1.2344-1.7734 1.2344-3.1094 0-1.3438-0.41406-2.375-1.2344-3.0938-0.8125-0.72656-1.9688-1.0938-3.4688-1.0938z')
									]),
								_List_Nil)
							]))
					])),
				A3(
				$elm$svg$Svg$node,
				'g',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$svg$Svg$node,
						'path',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'd', 'm188.63 467.08c-52.477-45.305-85.691-112.31-85.691-187.08 0-37.836 8.5039-73.688 23.707-105.74-15.176-18.797-23.707-42.336-23.707-67.199 0-59.125 47.93-107.06 107.06-107.06 32.777 0 63.027 14.855 83.082 39.531 18.273-4.3086 37.328-6.5898 56.918-6.5898s38.645 2.2812 56.918 6.5898c20.055-24.676 50.305-39.531 83.082-39.531 59.129 0 107.06 47.934 107.06 107.06 0 24.863-8.5312 48.402-23.707 67.199 15.203 32.055 23.707 67.906 23.707 105.74 0 74.77-33.215 141.78-85.691 187.08l34.543 69.082c4.0664 8.1367 0.76953 18.027-7.3672 22.098-8.1367 4.0664-18.031 0.76953-22.098-7.3672l-31.844-63.688c-39.629 25.801-86.062 39.852-134.6 39.852s-94.973-14.051-134.6-39.852l-31.844 63.688c-4.0664 8.1367-13.961 11.434-22.098 7.3672-8.1367-4.0703-11.434-13.961-7.3672-22.098zm69.426-416.46c-13.152-11.211-30.047-17.68-48.059-17.68-40.934 0-74.117 33.184-74.117 74.117 0 12.578 3.1367 24.641 8.9219 35.301 27.652-41.156 67.164-73.246 113.25-91.738zm297.14 91.738c5.7852-10.66 8.9219-22.723 8.9219-35.301 0-40.934-33.184-74.117-74.117-74.117-18.012 0-34.906 6.4688-48.059 17.68 46.09 18.492 85.602 50.582 113.25 91.738zm-205.2 351.76c118.25 0 214.12-95.863 214.12-214.12s-95.863-214.12-214.12-214.12-214.12 95.863-214.12 214.12 95.863 214.12 214.12 214.12zm16.469-362.35v141.41l69.297 69.297c6.4297 6.4297 6.4297 16.859 0 23.293-6.4336 6.4297-16.863 6.4297-23.293 0l-74.117-74.121c-3.0898-3.0859-4.8242-7.2773-4.8242-11.645v-148.23c0-9.0977 7.3711-16.473 16.469-16.473s16.469 7.375 16.469 16.473z')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '102.941406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#s')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '133.160156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '153.46875'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '181.394531'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '209.179688'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '228.863281'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '256.789062'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '300.601562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#i')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '330.074219'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#h')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '371.25'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#g')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '403.121094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#r')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '432.433594'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#d')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '461.910156'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '482.214844'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#b')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '510.140625'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '524.257812'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#q')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '563.101562'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#p')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '595.007812'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#o')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '609.121094'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#c')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '629.429688'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#n')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '672.335938'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '683.53125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#e')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '102.941406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '724.707031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#m')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '226.691406'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '724.707031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '246.375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '724.707031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#l')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '317.953125'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '724.707031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#k')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '453.664063'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '724.707031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#j')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '532.4375'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '724.707031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#f')
							]),
						_List_Nil),
						A3(
						$elm$svg$Svg$node,
						'use',
						_List_fromArray(
							[
								A2($elm$virtual_dom$VirtualDom$attribute, 'x', '598.886719'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'y', '724.707031'),
								A2($elm$virtual_dom$VirtualDom$attribute, 'xlink:href', '#a')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Icon$icon = F2(
	function (iconName, attrs) {
		switch (iconName.$) {
			case 'Noun':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$noun(attrs));
			case 'Food':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$food(attrs));
			case 'Vagexam':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$vagexam(attrs));
			case 'Iv':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$iv(attrs));
			case 'Waitpush':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$waitpush(attrs));
			case 'Movement':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$movement(attrs));
			case 'Dad':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$dad(attrs));
			case 'Placentabirth':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$placentabirth(attrs));
			case 'Suctioning':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$suctioning(attrs));
			case 'Cord':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$cord(attrs));
			case 'Kristeller':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$kristeller(attrs));
			case 'Skintoskin':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$skintoskin(attrs));
			case 'Breastfeeding':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$breastfeeding(attrs));
			case 'Bath':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$bath(attrs));
			case 'Drugs':
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$drugs(attrs));
			default:
				return $rtfeldman$elm_css$Svg$Styled$fromUnstyled(
					$author$project$Assets$Icons$cosleep(attrs));
		}
	});
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$on, eventName, handler),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Events$on = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $rtfeldman$elm_css$Css$padding = $rtfeldman$elm_css$Css$prop1('padding');
var $rtfeldman$elm_css$Css$PxUnits = {$: 'PxUnits'};
var $rtfeldman$elm_css$Css$px = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PxUnits, 'px');
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $author$project$Main$preferenceView = F2(
	function (index, preference) {
		var isEven = !A2($elm$core$Basics$modBy, 2, index);
		var _v0 = function () {
			var _v1 = _Utils_Tuple2(preference.stage, isEven);
			if (_v1.b) {
				switch (_v1.a.$) {
					case 'Labor':
						var _v2 = _v1.a;
						return _Utils_Tuple2('#ffeaee', '#2e5266');
					case 'VaginalBirth':
						var _v4 = _v1.a;
						return _Utils_Tuple2('#fffae3', '#998DA0');
					default:
						var _v6 = _v1.a;
						return _Utils_Tuple2('#f1ffe7', '#463F1A');
				}
			} else {
				switch (_v1.a.$) {
					case 'Labor':
						var _v3 = _v1.a;
						return _Utils_Tuple2('#2e5266', '#ffeaee');
					case 'VaginalBirth':
						var _v5 = _v1.a;
						return _Utils_Tuple2('#998DA0', '#fffae3');
					default:
						var _v7 = _v1.a;
						return _Utils_Tuple2('#463F1A', '#f1ffe7');
				}
			}
		}();
		var bgColor = _v0.a;
		var textColor = _v0.b;
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$backgroundColor(
							$rtfeldman$elm_css$Css$hex(bgColor)),
							$rtfeldman$elm_css$Css$color(
							$rtfeldman$elm_css$Css$hex(textColor)),
							$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$padding(
							$rtfeldman$elm_css$Css$px(12)),
							$rtfeldman$elm_css$Css$displayFlex,
							$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
							$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
							A2($rtfeldman$elm_css$Css$property, 'justifySelf', 'stretch')
						])),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					$author$project$Main$ToggleDialog(preference.id))
				]),
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$author$project$Icon$icon,
							preference.icon,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$fill('blue'),
									$elm$svg$Svg$Attributes$width('150px'),
									$elm$svg$Svg$Attributes$height('150px'),
									$elm$svg$Svg$Attributes$fill(textColor)
								]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(preference.desc)
						])),
					A2(
					$author$project$Main$dialog,
					preference.id,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h2,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(preference.desc)
								])),
							preference.details,
							A2(
							$rtfeldman$elm_css$Html$Styled$button,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
									'click',
									$elm$json$Json$Decode$succeed(
										_Utils_Tuple2(
											$author$project$Main$ToggleDialog(preference.id),
											true)))
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Close dialog')
								]))
						]))
				]));
	});
var $rtfeldman$elm_css$Css$Preprocess$WithMedia = F2(
	function (a, b) {
		return {$: 'WithMedia', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Media$withMedia = $rtfeldman$elm_css$Css$Preprocess$WithMedia;
var $author$project$Main$preferencesView = function (_v0) {
	var preferences = _v0.preferences;
	var vaginalBirthPrefs = A2(
		$elm$core$List$filter,
		function (y) {
			return _Utils_eq(y.stage, $author$project$Data$Preferences$VaginalBirth);
		},
		preferences);
	var postpartumPrefs = A2(
		$elm$core$List$filter,
		function (z) {
			return _Utils_eq(z.stage, $author$project$Data$Preferences$Postpartum);
		},
		preferences);
	var laborPrefs = A2(
		$elm$core$List$filter,
		function (_v1) {
			var stage = _v1.stage;
			return _Utils_eq(stage, $author$project$Data$Preferences$Labor);
		},
		preferences);
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Css$property, 'display', 'grid'),
						A2($rtfeldman$elm_css$Css$property, 'grid-template-columns', 'minmax(min(100%, 300px), 300px)'),
						A2($rtfeldman$elm_css$Css$property, 'grid-row-gap', '25px'),
						A2($rtfeldman$elm_css$Css$property, 'grid-column-gap', '15px'),
						A2($rtfeldman$elm_css$Css$property, 'justify-content', 'center'),
						A2(
						$rtfeldman$elm_css$Css$Media$withMedia,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$Media$all(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$Media$minWidth(
										$rtfeldman$elm_css$Css$px(100))
									]))
							]),
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Css$property, 'grid-template-columns', 'repeat(6,1fr)')
							]))
					]))
			]),
		A2(
			$elm$core$List$cons,
			A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Css$property, 'align-self', 'center'),
								A2($rtfeldman$elm_css$Css$property, 'justify-items', 'end'),
								A2($rtfeldman$elm_css$Css$property, 'display', 'grid')
							]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$h3,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text('Labor')
							]))
					])),
			_Utils_ap(
				A2($elm$core$List$indexedMap, $author$project$Main$preferenceView, laborPrefs),
				A2(
					$elm$core$List$cons,
					A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$property, 'align-self', 'center'),
										A2($rtfeldman$elm_css$Css$property, 'justify-items', 'end'),
										A2($rtfeldman$elm_css$Css$property, 'display', 'grid')
									]))
							]),
						_List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Html$Styled$h3,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Parto')
									]))
							])),
					_Utils_ap(
						A2($elm$core$List$indexedMap, $author$project$Main$preferenceView, vaginalBirthPrefs),
						A2(
							$elm$core$List$cons,
							A2(
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$property, 'align-self', 'center'),
												A2($rtfeldman$elm_css$Css$property, 'justify-items', 'end'),
												A2($rtfeldman$elm_css$Css$property, 'display', 'grid')
											]))
									]),
								_List_fromArray(
									[
										A2(
										$rtfeldman$elm_css$Html$Styled$h3,
										_List_Nil,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Html$Styled$text('Posparto')
											]))
									])),
							A2($elm$core$List$indexedMap, $author$project$Main$preferenceView, postpartumPrefs)))))));
};
var $rtfeldman$elm_css$Html$Styled$h1 = $rtfeldman$elm_css$Html$Styled$node('h1');
var $author$project$Main$titleView = function (string) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
						A2($rtfeldman$elm_css$Css$property, 'line-height', '1.5')
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$h1,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text('Parto vaginal natural humanizado')
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text('Mamá Lyann & Papá Emilio')
							]))
					]))
			]));
};
var $author$project$Main$view = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$backgroundColor(
						$rtfeldman$elm_css$Css$hex('white')),
						$rtfeldman$elm_css$Css$maxWidth(
						$rtfeldman$elm_css$Css$px(1000)),
						A2($rtfeldman$elm_css$Css$property, 'margin', 'auto')
					]))
			]),
		_List_fromArray(
			[
				$author$project$Main$titleView(model),
				$author$project$Main$preferencesView(model),
				$author$project$Main$notesView(model)
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		init: $author$project$Main$init,
		subscriptions: function (_v0) {
			return $elm$core$Platform$Sub$none;
		},
		update: $author$project$Main$update,
		view: A2($elm$core$Basics$composeR, $author$project$Main$view, $rtfeldman$elm_css$Html$Styled$toUnstyled)
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));