## typeof

由于由于历史原因，在判断原始类型时，`typeof null`会等于`object`。而且对于对象（Object）、数组（Array）来说，都会转换成`object`。例子如下：

```javascript
    console.log(typeof undefined); // "undefined"
    console.log(typeof true);      // "boolean"
    console.log(typeof 42);        // "number"
    console.log(typeof "hello");   // "string"
    console.log(typeof {});        // "object"
    console.log(typeof []);        // "object"
    console.log(typeof null);      // "object" (特殊情况)
    console.log(typeof function(){}); // "function"
    console.log(typeof Symbol());  // "symbol"
    console.log(typeof 10n);       // "bigint"
```

对于返回值为`object`，有三种情况：

- 值为null
- 值为object
- 值为array

typeof可以判断基本数据类型，但是难以判断除了函数以外的复杂数据类型。

## instanceof

`instanceof`是通过原型链来判断的，但是对于对象来说，`Array`也会被转换成`Object`，而且也不能区分基本类型`string`和`boolean`。可以左边放你要判断的内容，右边放类型来进行JS类型判断，只能用来判断复杂数据类型,因为instanceof 是用于检测构造函数（右边）的 prototype 属性是否出现在某个实例对象（左边）的原型链上。例如：

```javascript
    function Func() {}
    const func = new Func()
    console.log(func instanceof Func) // true
    
    const obj = {}
    const arr = []
    obj instanceof Object // true
    arr instanceof Object // true
    arr instanceof Array // true
    
    const str = "abc"
    const str2 = new String("abc")
    str instanceof String // false
    str2 instanceof String // true
```

单独使用`instanceof`好像也是不行的，但是我们对于typeof已经得出结论，不能区分数组和对象，那么，我们结合下`instanceof`，来写一个完整的判断逻辑

```javascript
    function myTypeof(data) {
        const type = typeof data
        if (data === null) {
            return 'null'
        }
        if (type !== 'object') {
            return type
        }
        if (data instanceof Array) {
            return 'array'
        }
        return 'object'
    }
```

## Object.prototype.toString.call()

上面我们通过`typeof`和`instanceof`实现了一版类型判断，那么是否有其他渠道，使我们的代码更加简洁吗？答案就是使用`Object.prototype.toString.call()`。

每个对象都有一个`toString()`方法，当要将对象表示为文本值或以预期字符串的方式引用对象时，会自动调用该方法。默认情况下，从`Object`派生的每个对象都会继承`toString()`方法。如果此方法未在自定义对象中被覆盖，则`toString()`返回`[Object type]`，其中`type`是对象类型。所以就有以下例子：

```javascript
    Object.prototype.toString.call(new Date()) // [object Date]
    Object.prototype.toString.call("1") // [object String]
    Object.prototype.toString.call(1) // [object Numer]
    Object.prototype.toString.call(undefined) // [object Undefined]
    Object.prototype.toString.call(null) // [object Null]
复制代码
```

所以综合上述知识点，我们可以封装出以下通用类型判断方法：

```javascript
    function myTypeof(data) {
        var toString = Object.prototype.toString;
        var dataType = data instanceof Element ? "element" : toString.call(data).replace(/\[object\s(.+)\]/, "$1").toLowerCase()
        return dataType
    };

    myTypeof("a") // string
    myTypeof(1) // number
    myTypeof(window) // window
    myTypeof(document.querySelector("h1")) // element
```

## constructor

constructor 判断方法跟instanceof相似,但是constructor检测Object与instanceof不一样,constructor还可以处理基本数据类型的检测,不仅仅是对象类型。

```js
var a = 'zuckjet';
console.log(a.constructor)  // ƒ String() { [native code] }

function b() {}
console.log(b.constructor)  // ƒ Function() { [native code] }

var c = {name: 'zuckjet'};
console.log(c.constructor);  //ƒ Object() { [native code] }
```

注意:

- null和undefined没有constructor; 

- 判断数字时使用(),比如  (123).constructor,如果写成123.constructor会报错 
- constructor在类继承时会出错,因为Object被覆盖掉了,检测结果就不对了

```javascript
    function A() {};
    function B() {};
    A.prototype = new B();
    console.log(A.constructor === B)  // false

    var C = new A();
    console.log(C.constructor === B)  // true
    console.log(C.constructor === A)  // false 

    C.constructor = A;
    console.log(C.constructor === A);  // true
    console.log(C.constructor === B);  // false
```

## Array.isArray()

Array.isArray() 用于确定传递的值是否是一个 Array。如果对象是 Array ，则返回true，否则为false。

```javascript
    Array.isArray([1, 2, 3]); // true
    Array.isArray({foo: 123}); // false
    Array.isArray("foobar"); // false
    Array.isArray(undefined); // false
复制代码
```

## 正则判断

我们可以把对象和数组转成一个字符串，这样就可以做格式判断，从而得到最终的类型。

```javascript
    function myTypeof(data) {
        const str = JSON.stringify(data)
        if (/^{.*}$/.test(data)) {
            return 'object'
        }
        if (/^\[.*\]$/.test(data)) {
            return 'array'
        }
    }
```