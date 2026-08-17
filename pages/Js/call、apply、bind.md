在 JavaScript 中，`bind`、`apply` 和 `call` 是函数对象的方法，用于**显式地设置函数执行时的 `this` 上下文**，并控制参数的传递方式。它们解决了 JavaScript 中 `this` 指向动态变化的问题，是面试和实际开发中的高频考点。


### 一、核心概念：`this` 的困惑
JavaScript 中 `this` 的指向是动态的，取决于函数的**调用方式**（而非定义位置）。例如：
- 普通函数调用：`this` 指向全局对象（浏览器中是 `window`，严格模式下是 `undefined`）。
- 对象方法调用：`this` 指向该对象。
- 构造函数调用：`this` 指向新创建的实例。

但实际开发中，我们常需要**强制指定 `this` 的指向**（比如回调函数丢失 `this`），这时就需要 `bind`/`apply`/`call`。


### 二、`call()`：立即调用，参数逐个传递
`call()` 的作用是：**立即调用函数**，并**显式绑定 `this` 到指定对象**，同时**将参数逐个传入函数**。


#### 语法
```javascript
function.call(thisArg, arg1, arg2, ...)
```
- `thisArg`：函数执行时 `this` 要绑定的对象（`null`/`undefined` 会被忽略，`this` 指向全局对象；原始值会转为对象，如 `123` → `Number(123)`）。
- `arg1, arg2...`：函数的参数，**逐个传递**。


#### 示例 1：基础用法（改变 `this` 指向）
```javascript
const person = { name: "小明" };

function sayHi(greeting) {
  console.log(`${greeting}, ${this.name}`); // this 原本指向 window（非严格模式）
}

// 用 call 绑定 this 到 person，并传参 "你好"
sayHi.call(person, "你好"); // 输出："你好, 小明"
```


#### 示例 2：借用其他对象的方法（经典场景）
数组没有 `max` 方法，但 `Math.max` 可以求最大值。用 `call` 让 `Math.max` 的 `this` 指向数组，即可借用其逻辑：
```javascript
const numbers = [3, 5, 1, 9, 2];

// Math.max 原本接收多个数字参数，用 call 将数组元素逐个传入
const max = Math.max.call(null, ...numbers); 
// 等价于 Math.max(3,5,1,9,2)，输出：9

// 更简洁的写法（ES6 展开运算符）：
const max = Math.max.apply(null, numbers); // apply 更适合数组参数（见下文）
```


### 三、`apply()`：立即调用，参数以数组形式传递
`apply()` 与 `call()` 几乎相同，唯一的区别是：**参数通过数组（或类数组对象）传递**，而非逐个列出。


#### 语法
```javascript
function.apply(thisArg, [argsArray])
```
- `thisArg`：同 `call`。
- `[argsArray]`：函数参数的**数组**（或类数组对象，如 `arguments`）。


#### 示例 1：基础用法（数组参数）
```javascript
const person = { name: "小红" };

function introduce(age, city) {
  console.log(`我是${this.name}，今年${age}岁，来自${city}`);
}

// apply 第二个参数是数组，数组元素会作为函数的参数依次传入
introduce.apply(person, [20, "北京"]); // 输出："我是小红，今年20岁，来自北京"
```


#### 示例 2：处理类数组对象（如 `arguments`）
类数组对象（如函数的 `arguments`、DOM 节点列表）没有数组方法（如 `push`），可用 `apply` 借用数组方法：
```javascript
function merge() {
  // arguments 是类数组对象，用 apply 将其转为数组后合并
  const args = Array.prototype.slice.apply(arguments); 
  return args; // 输出：[1, 2, 3]（假设调用 merge(1,2,3)）
}
merge(1, 2, 3);
```


#### 示例 3：求数组最大值（对比 `call`）
```javascript
const numbers = [3, 5, 1, 9, 2];
const max = Math.max.apply(null, numbers); // 直接传数组，更简洁
console.log(max); // 9
```


### 四、`bind()`：返回新函数，延迟绑定 `this`
`bind()` 与前两者的核心区别是：**不立即调用函数，而是返回一个新函数**，且新函数的 `this` 被永久绑定到指定对象（无法再修改）。此外，`bind` 还支持**预设部分参数**（柯里化）。


#### 语法
```javascript
const boundFn = function.bind(thisArg, arg1, arg2, ...)
```
- `thisArg`：新函数执行时 `this` 绑定的对象。
- `arg1, arg2...`：**预设的参数**（会排在实际调用参数的前面）。
- 返回值：一个新的函数（原函数的一个“绑定版本”）。


#### 示例 1：基础用法（延迟绑定 `this`）
```javascript
const person = { name: "小李" };

function sayHello() {
  console.log(`Hello, ${this.name}`);
}

// bind 返回新函数，不立即执行
const boundSayHello = sayHello.bind(person); 

// 后续调用新函数时，this 始终指向 person
boundSayHello(); // 输出："Hello, 小李"
```


#### 示例 2：预设参数（柯里化）
```javascript
function add(a, b, c) {
  return a + b + c;
}

// 预设第一个参数为 10，新函数只需传剩下的参数
const add10 = add.bind(null, 10); 

console.log(add10(20, 30)); // 10+20+30=60
console.log(add10(5, 5));   // 10+5+5=20
```


#### 示例 3：解决回调函数中 `this` 丢失问题（经典场景）
在事件监听或定时器回调中，函数的 `this` 可能指向全局对象（如 `window`），用 `bind` 可固定 `this`：
```javascript
const button = document.querySelector("button");

const obj = {
  count: 0,
  increment() {
    this.count++;
    console.log(this.count);
  }
};

// 错误：直接传 obj.increment，this 指向 button（事件触发者）
button.addEventListener("click", obj.increment); // 点击输出 NaN（this.count 是 undefined）

// 正确：用 bind 绑定 this 到 obj
button.addEventListener("click", obj.increment.bind(obj)); // 点击输出 1、2、3...
```


### 五、三者对比总结

| 特性                | `call`                          | `apply`                         | `bind`                          |
|---------------------|---------------------------------|---------------------------------|---------------------------------|
| **是否立即调用**     | ✅ 是                           | ✅ 是                           | ❌ 否（返回新函数）             |
| **参数传递方式**     | 逐个列出（`arg1, arg2...`）     | 数组/类数组（`[args]`）         | 逐个列出（可预设参数）          |
| **返回值**           | 原函数返回值                    | 原函数返回值                    | 新函数（绑定 `this` 和预设参数）|
| **典型场景**         | 参数少，需立即调用              | 参数是数组/类数组，需立即调用   | 延迟调用、固定 `this`（如回调） |


### 六、注意事项
1. **严格模式下的 `this`**：若 `thisArg` 为 `null`/`undefined`，严格模式中 `this` 保持原值（不指向全局对象）；非严格模式仍指向全局对象。
2. **箭头函数的 `this`**：箭头函数没有自己的 `this`，`bind`/`apply`/`call` 无法改变其 `this`（它继承自外层作用域）。
   ```javascript
   const arrowFn = () => { console.log(this); };
   arrowFn.call({ name: "test" }); // this 仍是外层作用域的 this（如 window）
   ```
3. **性能考虑**：频繁使用 `bind` 创建新函数可能影响性能，建议缓存绑定后的函数。


### 七、实际应用场景
- **借用方法**：如用 `Array.prototype.slice.call(arguments)` 将类数组转数组。
- **构造函数复用**：用 `new` 结合 `call` 实现继承（如 `Child.prototype = Object.create(Parent.prototype); Child.prototype.constructor = Child;` 的替代方案）。
- **React 事件处理**：类组件中绑定 `this` 到实例（现常用箭头函数或 class fields 简化）。


掌握这三个方法是理解 JavaScript 函数上下文的关键，也是写出灵活、健壮代码的基础！