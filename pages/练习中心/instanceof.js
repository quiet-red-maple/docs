// instanceof 实现
// 什么是instanceof？
// instanceof 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
// 语法：object instanceof constructor
// 返回值：如果 constructor.prototype 出现在 object 的原型链上，则返回 true，否则返回 false。

function myInstanceof(obj, constructor) {
    if (obj === null || typeof obj !== 'object' && typeof obj !== 'function') {
      return false;
    }

    if (typeof constructor !== 'function') {
      throw new TypeError('Right-hand side of \'instanceof\' is not callable');
    }

    let proto = Object.getPrototypeOf(obj);
    let prototype = constructor.prototype;

    if (prototype === null) {
      return false;
    }

    while (proto !== null) {
      if (proto === prototype) {
        return true;
      } else {
        proto = Object.getPrototypeOf(proto);
      }
    }

    return false;

};

function Person(name) { 
  this.name = name;
}

const person = new Person('Alice');

console.log(myInstanceof(person, Person)); // true
console.log(myInstanceof(person, Object)); // true
console.log(myInstanceof(person, Array));  // false
console.log(myInstanceof(null, Person));   // false
console.log(myInstanceof(42, Number));     // false

