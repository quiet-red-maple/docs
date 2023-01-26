### `new` 做了哪些事情？

**`new` 运算符创建一个用户定义的对象数据类型的实例或者具有构造函数内置对象的实例**。

它进行的操作：

- 首先创建一个新的空对象
- 然后将空对象的 __proto__指向构造函数的原型
  - 它将新生成的对象的 `__proto__` 属性赋值为构造函数的 `prototype` 属性，使得通过构造函数创建的所有对象可以共享相同的原型。
  - 这意味着同一个构造函数创建的所有对象都继承自一个相同的对象，因此它们都是同一个类的对象。
- 改变 `this` 的指向，指向空对象
- 对构造函数的返回值做判断，然后返回对应的值
  - 一般是返回第一步创建的空对象；
  - 但是当 **构造函数有返回值时** 则需要做判断再返回对应的值，是 **对象类型则返回该对象**，是 **原始类型则返回第一步创建的空对象**。

### `new` 的实现

```js
function myNew (Con, ...args) {
	let obj = {};
  // obj.__proto__ = Con.prototype;
  Object.setPrototypeOf(obj, Con.prototype);
  let res = Con.apply(obj, args);
  return res instanceof Object ? res : obj;
}

function Person (name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayName = function () {
	return this.name;
}

const a = myNew(Person, 'xi', 16);

console.log(a.name);  // xi
console.log(a.age); // 16
console.log(a.sayName()); // xi

```

