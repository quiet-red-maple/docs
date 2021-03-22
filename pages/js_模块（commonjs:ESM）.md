### 最初（Vanilla JS）

​		JavaScript 被开发出来的时候，是没有模块标准的，因为 JavaScript 的设计初衷就是作为一个 toy script，在浏览器中做一些简单的交互。

解决方式：

1、使用 JS 内置的对象对变量进行控制：

```js
function Person(name) {
  this.name = name;
}

Person.prototype.talk = function () {
  console.log("my name is", this.name);
};

const p = new Person("anson");

p.talk();
```

2、利用函数作用域控制变量，利用全局作用域提供给外部使用，使用 IIFE 实现：

```js
// lib.js
(function() {
  const base = 10;
  this.sumDOM = function(id) {
    // 依赖 jQuery
    return base + +$(id).text();
  }
})();

// index.html
<html>
  <head>
    <script src="/path/to/jquery.js"></script>
    <script src="/path/to/lib.js"></script>
  </head>
  <body>
    <script>
      window.sumDOM(20);
    </script>
  </body>
</html>
```

### CommonJS

​		主要应用在服务端如 [Node.js](https://nodejs.org/)。因为使用效果不错，随后也被用在浏览器的模块开发中，但由于浏览器并不支持 CommonJS，所以代码需要通过 Babel 等 transpiler 转换为 ES5 才能在浏览器上运行。

CommonJS 的特征是使用 `require` 来导入依赖，`exports` 来导出接口。

```javascript
// lib.js
module.exports.add = function add() {};

// main.js
const { add } = require("./lib.js");
add();
```

### AMD

​		因为 CommonJS 设计初衷是应用在服务端的，所以模块的加载执行也都是同步的（因为本地文件的 IO 很快）。但是同步的方式运用到浏览器就不友好了，因为在浏览器中模块文件都是通过网络加载的，单线程阻塞在模块加载上，这是不可接受的。所以在 2011 年有人提出了 AMD，对 CommonJS 兼容的同时支持异步加载。

AMD 的特征是使用 `define(deps, callback)` 来异步加载模块。

```javascript
// Calling define with a dependency array and a factory function
define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});
```

### UMD

​		因为 CommonJS 和 AMD 的流行，随后又有人提出了 UMD 的模块标准，UMD 通过对不同的环境特性进行检测，对 AMD、CommonJS 和 Global Variable 三种格式兼容。

```js
// UMD
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery', 'underscore'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('jquery'), require('underscore'));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.jQuery, root._);
  }
}(this, function ($, _) {
  //    methods
  function a(){};    //    private because it's not returned (see below)
  function b(){};    //    public because it's returned
  function c(){};    //    public because it's returned
  //    exposed public methods
  return {
    b: b,
    c: c
  }
}));
```

### ESM

​		随着 ECMAScript 的逐渐规范化、标准化，终于在 2015 年发布了 ES6（ES 2015），在这次版本更新中，制定了 JS 模块标准即 ES Modules，ES Modules 使用 `import` 声明依赖，`export` 声明接口。

```js
// lib.mjs
const lib = function() {};
export default lib;

// main.js
import lib from './lib.mjs';
```

