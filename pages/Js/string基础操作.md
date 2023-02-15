

## String 操作

字符串字面量 (通过单引号或双引号定义) 和 直接调用 String 方法(没有通过 new 生成字符串对象实例)的字符串都是**基本字符串**。JavaScript会自动将基本字符串转换为**字符串对象**，只有将**基本字符串**转化为**字符串对象**之后才可以使用**字符串对象**的方法。当**基本字符串**需要调用一个**字符串对象**才有的方法或者查询值的时候(基本字符串是没有这些方法的)，JavaScript 会自动将**基本字符串**转化为**字符串对象**并且调用相应的方法或者执行查询。

```js
var s_prim = "foo";
var s_obj = new String(s_prim);

console.log(typeof s_prim); // Logs "string"
console.log(typeof s_obj);  // Logs "object"
```

### 1、获取字符串中的某个字符

#### 	1、charAt方法

```js
return 'cat'.charAt(1); // returns "a"
```

​	注：str.charAt(index) 一个介于0 和字符串长度减1之间的整数。 (0~length-1) 如果没有提供索引，charAt() 将使用0。

#### 	2、取其数值索引

```js
return 'cat'[1]; // returns "a"
```

### 2、字符串创建

#### 	1、通过一串 Unicode 创建字符串

```js
String.fromCharCode(65, 66, 67);   // 返回 "ABC"
```

#### 	2、通过一串 码点 创建字符串(ES6)

```js
String.fromCodePoint(42);       // "*"
String.fromCodePoint(65, 90);   // "AZ"
```

​	一串 Unicode 编码位置，即“代码点”

#### 	3、通过模板字符串创建字符串

```js
String.raw({ raw: 'test' }, 0, 1, 2); // 't0e1s2t'
String.raw `Hi\u000A!`; // "Hi\u000A!"
String.raw`Hi\n${2+3}!`; // 'Hi\n5!'
let name = "Bob";
String.raw `Hi\n${name}!`; // "Hi\nBob!"
```

### 3、String 实例属性

返回字符串的长度

```js
var x = "Mozilla";
console.log(x.length) // 7
```

### 4、String 实例方法

##### 	1、charAt() 返回特定位置的字符。

```js
let a = 'hello'
a.charAt(2) // "l"
a.charAt() // "h"
```

##### 	2、charCodeAt() 返回表示给定索引的字符的Unicode的值。

```js
"ABC".charCodeAt() // returns 65:"A"
"ABC".charCodeAt(0) // returns 65:"A"
"ABC".charCodeAt(1) // returns 66:"B"
"ABC".charCodeAt(2) // returns 67:"C"
"ABC".charCodeAt(3) // returns NaN
```

##### 	3、codePointAt() 返回使用UTF-16编码的给定位置的值的非负整数。

```js
'ABC'.codePointAt(1);          // 66
'\uD800\uDC00'.codePointAt(0); // 65536
'XYZ'.codePointAt(42); // undefined
```

##### 	4、concat() 连接两个字符串文本，并返回一个新的字符串。

```js
let greetList = ['Hello', ' ', 'Venkat', '!']
"".concat(...greetList)  // "Hello Venkat!"
"".concat({})    // [object Object]
"".concat([])    // ""
"".concat(null)  // "null"
"".concat(true)  // "true"
"".concat(4, 5)  // "45"
```

##### 		强烈建议使用[赋值操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)（`+`, `+=`）代替 `concat` 方法。	

##### 	5、includes() 判断一个字符串里是否包含其他字符串。

```js
'Blue Whale'.includes('blue'); // returns false
'blue Whale'.includes('blue'); // returns true

var str = 'To be, or not to be, that is the question.';

console.log(str.includes('To be'));       // true
console.log(str.includes('question'));    // true
console.log(str.includes('nonexistent')); // false
console.log(str.includes('To be', 1));    // false 第二个参数为 从当前字符串的哪个索引位置开始搜寻子字符串，默认值为 0。
console.log(str.includes('TO BE'));       // false
```

##### 	6、endsWith() 判断一个字符串的是否以给定字符串结尾，结果返回布尔值。

```js
var str = "To be, or not to be, that is the question.";

alert( str.endsWith("question.") );  // true
alert( str.endsWith("to be") );      // false
alert( str.endsWith("to be", 19) );  // true 第二个参数 作为 str 的长度。默认值为 str.length。
```

##### 	7、startsWith() 判断字符串的起始位置是否匹配其他字符串中的字符。

```js
var str = "To be, or not to be, that is the question.";

alert(str.startsWith("To be"));         // true
alert(str.startsWith("not to be"));     // false
alert(str.startsWith("not to be", 10)); // true 第二个参数为 在 str 中搜索 searchString 的开始位置，默认值为 0。
```

##### 	8、indexOf() 从字符串对象中返回首个被发现的给定值的索引值，如果没有找到则返回-1。

第二个参数表示开始查找的位置。可以是任意整数，默认值为 `0`。

```js
// 如果 第二个参数 值为空，或者 第二个参数 值小于被查找的字符串的长度，返回值和第二个参数相同
'hello world'.indexOf('') // 返回 0
'hello world'.indexOf('', 0) // 返回 0
'hello world'.indexOf('', 3) // 返回 3
'hello world'.indexOf('', 8) // 返回 8
// 如果 第二个参数 值大于等于字符串的长度，将会直接返回字符串的长度
'hello world'.indexOf('', 11) // 返回 11
'hello world'.indexOf('', 13) // 返回 11
'hello world'.indexOf('', 22) // 返回 11

"Blue Whale".indexOf("Blue")       // 返回 0
"Blue Whale".indexOf("Blute")      // 返回 -1
"Blue Whale".indexOf("Whale", 0)   // 返回 5
"Blue Whale".indexOf("Whale", 5)   // 返回 5
"Blue Whale".indexOf("", -1)       // 返回 0
"Blue Whale".indexOf("", 9)        // 返回 9
"Blue Whale".indexOf("", 10)       // 返回 10
"Blue Whale".indexOf("", 11)       // 返回 10
```

##### 	9、lastIndexOf() 从字符串对象中返回最后一个被发现的给定值的索引值，如果没有找到则返回-1。

```js
'canal'.lastIndexOf('a');     // returns 3 （没有指明fromIndex则从末尾l处开始反向检索到的第一个a出现在l的后面，即index为3的位置）
'canal'.lastIndexOf('a', 2);  // returns 1（指明fromIndex为2则从n处反向向回检索到其后面就是a，即index为1的位置）
'canal'.lastIndexOf('a', 0);  // returns -1(指明fromIndex为0则从c处向左回向检索a发现没有，故返回-1)
'canal'.lastIndexOf('x');     // returns -1
'canal'.lastIndexOf('c', -5); // returns 0（指明fromIndex为-5则视同0，从c处向左回向查找发现自己就是，故返回0）
'canal'.lastIndexOf('c', 0);  // returns 0（指明fromIndex为0则从c处向左回向查找c发现自己就是，故返回自己的索引0）
'canal'.lastIndexOf('');      // returns 5
'canal'.lastIndexOf('', 2);   // returns 2
```

##### 	10、localeCompare() 返回一个数字表示是否引用字符串在排序中位于比较字符串的前面，后面，或者二者相同。

```js
// The letter "a" is before "c" yielding a negative value
'a'.localeCompare('c');
// -2 or -1 (or some other negative value)

// Alphabetically the word "check" comes after "against" yielding a positive value
'check'.localeCompare('against');
// 2 or 1 (or some other positive value)

// "a" and "a" are equivalent yielding a neutral value of zero
'a'.localeCompare('a');
// 0
```

##### 	11、match() 使用正则表达式与字符串相比较。

```js
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// expected output: Array ["T", "I"]

var str1 = "NaN means not a number. Infinity contains -Infinity and +Infinity in JavaScript.",
    str2 = "My grandfather is 65 years old and My grandmother is 63 years old.",
    str3 = "The contract was declared null and void.";
str1.match("number");   // "number" 是字符串。返回["number"]
str1.match(NaN);        // NaN的类型是number。返回["NaN"]
str1.match(Infinity);   // Infinity的类型是number。返回["Infinity"]
str1.match(+Infinity);  // 返回["Infinity"]
str1.match(-Infinity);  // 返回["-Infinity"]
str2.match(65);         // 返回["65"]
str2.match(+65);        // 有正号的number。返回["65"]
str3.match(null);       // 返回["null"]
```

##### 	12、normalize() 返回调用字符串值的Unicode标准化形式。

```js
const name1 = '\u0041\u006d\u00e9\u006c\u0069\u0065';
const name2 = '\u0041\u006d\u0065\u0301\u006c\u0069\u0065';

console.log(`${name1}, ${name2}`);
// expected output: "Amélie, Amélie"
console.log(name1 === name2);
// expected output: false
console.log(name1.length === name2.length);
// expected output: false

const name1NFC = name1.normalize('NFC');
const name2NFC = name2.normalize('NFC');

console.log(`${name1NFC}, ${name2NFC}`);
// expected output: "Amélie, Amélie"
console.log(name1NFC === name2NFC);
// expected output: true
console.log(name1NFC.length === name2NFC.length);
// expected output: true

```

##### 	13、padEnd() 在当前字符串尾部填充指定的字符串， 直到达到指定的长度。 返回一个新的字符串。

```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

##### 	14、padStart() 在当前字符串头部填充指定的字符串， 直到达到指定的长度。 返回一个新的字符串。

```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

##### 	15、repeat() 返回指定重复次数的由元素组成的字符串对象。

第二个参数为 介于 `0` 和 [`+Infinity`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY) 之间的整数。表示在新构造的字符串中重复了多少遍原字符串。

```js
"abc".repeat(-1)     // RangeError: repeat count must be positive and less than inifinity
"abc".repeat(0)      // ""
"abc".repeat(1)      // "abc"
"abc".repeat(2)      // "abcabc"
"abc".repeat(3.5)    // "abcabcabc" 参数count将会被自动转换成整数.
"abc".repeat(1/0)    // RangeError: repeat count must be positive and less than inifinity
```

##### 	16、replace()  被用来在正则表达式和字符串直接比较，然后用新的子串来替换被匹配的子串。

如果`pattern`是字符串，则仅替换第一个匹配项

```js
const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

console.log(p.replace('dog', 'monkey'));
// The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?

var re = /apples/gi;
var str = "Apples are round, and apples are juicy.";
var newstr = str.replace(re, "oranges");

// oranges are round, and oranges are juicy.
console.log(newstr);
```

##### 	17、search()  对正则表达式和指定字符串进行匹配搜索，返回第一个出现的匹配项的下标。

```js
var str = "hey JudE";
var re = /[A-Z]/g;
var re2 = /[.]/g;
console.log(str.search(re)); // 4
console.log(str.search(re2)); // -1
console.log(str.search('e')); // 1
```

##### 	18、slice() 摘取一个字符串区域，返回一个新的字符串。

```js
const str = 'The quick brown fox jumps over the lazy dog.';

console.log(str.slice(31));
// expected output: "the lazy dog."

console.log(str.slice(4, 19));
// expected output: "quick brown fox"

console.log(str.slice(-4));
// expected output: "dog."

console.log(str.slice(-9, -5));
// expected output: "lazy"
```

##### 	19、split() 通过分离字符串成字串，将字符串对象分割成字符串数组。

```js
const str = 'The quick brown fox jumps over the lazy dog.';

const words = str.split(' ');
console.log(words[3]);
// expected output: "fox"

const chars = str.split('');
console.log(chars[8]);
// expected output: "k"

const strCopy = str.split();
console.log(strCopy);
// expected output: Array ["The quick brown fox jumps over the lazy dog."]
```

##### 	20、substr() 通过指定字符数返回在指定位置开始的字符串中的字符。

尽量使用substring()

参数1为提取字符串位置，参数2为提取的字符数

```js
var str = "abcdefghij";

console.log("(1,2): "    + str.substr(1,2));   // (1,2): bc
console.log("(-3,2): "   + str.substr(-3,2));  // (-3,2): hi
console.log("(-3): "     + str.substr(-3));    // (-3): hij
console.log("(1): "      + str.substr(1));     // (1): bcdefghij
console.log("(-20, 2): " + str.substr(-20,2)); // (-20, 2): ab
console.log("(20, 2): "  + str.substr(20,2));  // (20, 2):
```

##### 	21、substring() 返回在字符串中指定两个下标之间的字符。

```js
var anyString = "Mozilla";

// 输出 "Moz"
console.log(anyString.substring(0,3));
console.log(anyString.substring(3,0)); // 参数调换
console.log(anyString.substring(3,-3));
console.log(anyString.substring(3,NaN));
console.log(anyString.substring(-2,3));
console.log(anyString.substring(NaN,3));

// 输出 "lla"
console.log(anyString.substring(4,7));
console.log(anyString.substring(7,4));

// 输出 ""
console.log(anyString.substring(4,4));

// 输出 "Mozill"
console.log(anyString.substring(0,6));

// 输出 "Mozilla"
console.log(anyString.substring(0,7));
console.log(anyString.substring(0,10));
```

##### 	22、toLocaleLowerCase() 根据当前区域设置，将符串中的字符转换成小写。

```js
'ALPHABET'.toLocaleLowerCase(); // 'alphabet'
```

##### 	23、toLocaleUpperCase() 根据当前区域设置，将字符串中的字符转换成大写。

```js
'alphabet'.toLocaleUpperCase(); // 'ALPHABET'
```

##### 	24、toLowerCase() 将字符串转换成小写并返回。

```js
console.log( "ALPHABET".toLowerCase() ); // "alphabet"
```

##### 	25、toUpperCase() 将字符串转换成大写并返回。

```js
console.log('alphabet'.toUpperCase()); // 'ALPHABET'
```

##### 	26、toSource() 返回一个对象文字代表着特定的对象。你可以使用这个返回值来创建新的对象。(非标准)

##### 	27、toString() 返回用字符串表示的特定对象。

​	toString() 方法返回指定对象的字符串形式。

```js
var x = new String("Hello world");
console.log(x.toString()) // Hello world
```

##### 	28、trim() 从字符串的开始和结尾去除空格。

```js
var orig = '   foo  ';
console.log(orig.trim()); // 'foo'
```

##### 	29、trimStart(), trimLeft() 从字符串的左侧去除空格。

```js
const greeting = '   Hello world!   ';

console.log(greeting.trimStart()); // "Hello world!   "
console.log(greeting.trimLeft()); // "Hello world!   "
```

##### 	30、trimEnd(), trimRight() 从字符串的右侧去除空格。

```js
const greeting = '   Hello world!   ';

console.log(greeting.trimEnd()); // "   Hello world!"
console.log(greeting.trimRight()); // "   Hello world!"
```

##### 	31、valueOf() 返回特定对象的原始值。

```js
const stringObj = new String('foo');

console.log(stringObj);
// expected output: String { "foo" }

console.log(stringObj.valueOf());
// expected output: "foo"
```

##### 	32、**`[@@iterator]()`** 返回一个新的迭代器对象，该对象遍历字符串值的索引位置，将每个索引值作为字符串值返回。

```js
var string = 'A\uD835\uDC68';

var strIter = string[Symbol.iterator]();

console.log(strIter.next().value); // "A"
console.log(strIter.next().value); // "\uD835\uDC68" "𝑨"
```

##### 	33、将字符串拆分为字符数组

```js
const a = 'apple'
const b = [...a]
console.log(b) // ["a", "p", "p", "l", "e"]
let e = a.split('')
console.log(e) // ["a", "p", "p", "l", "e"]
```

##### 	34、反转字符串中的字符

```js
const word = "apple"
const reversedWord = [...word].reverse().join("")
console.log(reversedWord) // "elppa"
```

##### 	35、 replaceAll() 用来在正则表达式和字符串直接比较，然后用新的子串来替换所有被匹配的子串。

当使用一个 `regex`时，您必须设置全局（“ g”）标志

```js
const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

console.log(p.replaceAll('dog', 'monkey'));
// The quick brown fox jumps over the lazy monkey. If the monkey reacted, was it really lazy?


// global flag required when calling replaceAll with regex
const regex = /Dog/ig;
console.log(p.replaceAll(regex, 'ferret'));
// The quick brown fox jumps over the lazy ferret. If the ferret reacted, was it really lazy?

```

