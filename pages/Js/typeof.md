在 JavaScript 中，typeof是一个一元运算符，用于返回一个字符串，表示操作数（即你要检查的值）的数据类型。它常用于基础类型判断。

```js
// 基础类型
console.log(typeof undefined);     // "undefined"
console.log(typeof null);          // "object" （JS 早期 bug）
console.log(typeof true);          // "boolean"
console.log(typeof 42);            // "number"
console.log(typeof 3n);            // "bigint"
console.log(typeof "hello");       // "string"
console.log(typeof Symbol('id'));   // "symbol"

// 对象和函数
console.log(typeof {});             // "object"
console.log(typeof []);             // "object" （数组也是对象）
console.log(typeof function(){});   // "function"
console.log(typeof Math);           // "object"

// 变量示例
let x;
console.log(typeof x);              // "undefined"

x = "hello";
console.log(typeof x);              // "string"
```

### 注意事项与常见坑

- null的问题

```js
typeof null === "object"; // true —— 这是 JavaScript 已知的历史 bug
```

- 正确判断 null的方式：

```js
const isNull = (value) => value === null;
console.log(isNull(null)); // true
```

- 数组也是对象

```js
typeof []; // "object" ，不是 "array"
// 判断数组要用：
Array.isArray([]); // true
```

- 函数是特殊的对象

```js
typeof function() {}; // "function"
```

- NaN的类型

```js
console.log(typeof NaN);        // "number"
// NaN 表示“非数字”，但类型仍是 number
```

- 未声明变量也能用 typeof

```js
console.log(typeof undeclaredVar); // "undefined"
// 不会报错，这对检测未声明变量很有用
```