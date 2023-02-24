**`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
function myInstanceof (obj1, obj2) {
  let obj1Proto = obj1.__proto__;
  while (true) {
    if (obj1Proto === null) return false;
    if (obj1Proto === obj2.prototype) return true;
    obj1Proto = obj1Proto.__proto__;
  }
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

