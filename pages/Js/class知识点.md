### 1、类的访问类型

 #### public

公用的。定义的属性可以在类的内部、类的外部以及子类中访问修改

#### private

私有的。定义的属性只能在类的内部使用修改，不能在类的外部以及子类中访问修改

#### protected

受保护的。定义的属性不能在外部访问，只能在类的内部和子类中访问修改

### 2、getter、setter、

```typescript
class Person {
  constructor (private _age: number) {}
  get age () {
    return this._age - 10
  }
  set age (age:number) {
    this._age = age + 3
  }
}

const people = new Person(28)
people.age = 22
console.log(people.age)

```

目的可以对数据进行处理后输出。

### 3、静态类static

```typescript
class Person {
  static say () {
    return 'hello'
  }
}

console.log(Person.say())
```

目的可以不需要new一个类

### 4、抽象类abstract

```typescript
abstract class Person {
  abstract skill()
}

class body extends Person {
  skill () {
    console.log('body')
  }
}

class girl extends Person {
  skill () {
    console.log('girl')
  }
}

class child extends Person {
  skill () {
    console.log('child')
  }
}
```

目的抽象类可以限制子类都必须有抽象类中的方法属性

