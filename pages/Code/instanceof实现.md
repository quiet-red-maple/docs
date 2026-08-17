**`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
function myInstanceof(obj, constructor) {
    // 基本类型直接返回 false（注意：函数也是对象的一种，但这里我们按 instanceof 语义来）
    if (obj === null || typeof obj !== 'object' && typeof obj !== 'function') {
        return false;
    }
    
    // 校验 constructor 必须是函数
    if (typeof constructor !== 'function') {
        throw new TypeError('Right-hand side of instanceof is not callable');
    }

    let proto = Object.getPrototypeOf(obj);
    const prototype = constructor.prototype;

    // 处理 prototype 为 null 的情况（比如 Object.create(null) 创建的对象）
    if (prototype === null) {
        return false;
    }

    while (proto !== null) {
        if (proto === prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}
```

验证

```js
class Person {
  constructor (name) {
    this.name = name;
  }
}

class Student extends Person {
  constructor (name, age) {
    super(name);
    this.age = age;
  }
}

const zhangsan = new Student('张三', 21);
console.log(zhangsan instanceof Student); // true
console.log(zhangsan instanceof Person); // true
console.log(zhangsan instanceof Array); // false

console.log(myInstanceof(zhangsan, Student)); // true
console.log(myInstanceof(zhangsan, Person)); // true
console.log(myInstanceof(zhangsan, Array)); // false

```

