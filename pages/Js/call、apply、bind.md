### 1. 语法

```js
func.call(thisArg, param1, param2, ...) //func是个函数

func.apply(thisArg, [param1,param2,...])

func.bind(thisArg, param1, param2, ...)
```

#### 返回值：

call / apply：返回`func` 执行的结果 ； bind：返回`func`的拷贝，并拥有指定的`this`值和初始参数。

#### 参数：

`thisArg`(可选):

1. **`func`**的`this`指向`thisArg`对象;
2. 非严格模式下：若`thisArg`指定为null，undefined，则`func`的`this`指向window对象；
3. 严格模式下：`func`的`this`为`undefined`；
4. 值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象，如 String、Number、Boolean。

`param1`，`param2`(可选): 传给`func`的参数。

1. 如果param不传或为 null/undefined，则表示不需要传入任何参数.
2. apply第二个参数为类数组对象，数组内各项的值为传给`func`的参数。

### 2. 作用

改变函数执行时的`this`指向，目前所有关于它们的运用，都是基于这一点来进行的。

### 3.区别

**call与apply的唯一区别**

传给`func`的参数写法不同：

- apply是第2个参数，这个参数是一个类数组对象：传给`func`参数都写在数组中。
- call从第2~n的参数都是传给`func`的。

**call/apply与bind的区别**

**执行：**

- call/apply改变了函数的`this`的指向并马上**执行该函数**；
- bind则是返回改变了`this`指向后的函数，**不执行该函数**。

**返回值：**

- call/apply 返回`func`的执行结果；
- bind返回`func`的拷贝，并指定了`func`的`this`指向，保存了`func`的参数。

### 4.骚操作

#### 1. 类数组对象借用数组的方法

因为类数组对象不是真正的数组，所以没有数组类型上自带的一些方法，所以我们需要去借用数组的方法。

比如借用数组的push方法：

```js
//类数组对象
var arrayLike = {
  0: "OB",
  1: "Koro1",
  length: 2
};

Array.prototype.push.call(arrayLike, "添加数组项1", "添加数组项2");

console.log(arrayLike);
//>> {"0":"OB","1":"Koro1","2":"添加数组项1","3":"添加数组项2","length":4}
```

#### 2. apply获取数组最大值最小值

apply直接传递数组当作要调用方法的参数，也省去了展开数组这一步，比如使用Math.max、Math.min来获取数组的最大值/最小值。

```js
const arr = [15, 6, 12, 13, 16];

const max = Math.max.apply(Math, arr); // 16

const min = Math.min.apply(Math, arr); // 6
```

#### 3. 继承

ES5的继承也都是通过借用父类的构造方法来实现父类方法/属性的继承：

```js
// 父类
function supFather(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']; // 复杂类型
}

supFather.prototype.sayName = function (age) {
    console.log(this.name, 'age');
};

// 子类
function sub(name, age) {
    // 借用父类的方法：修改它的this指向,赋值父类的构造函数里面方法、属性到子类上
    supFather.call(this, name);
    this.age = age;
}

// 重写子类的prototype，修正constructor指向
function inheritPrototype(sonFn, fatherFn) {
    sonFn.prototype = Object.create(fatherFn.prototype); // 继承父类的属性以及方法
    sonFn.prototype.constructor = sonFn; // 修正constructor指向到继承的那个函数上
}

inheritPrototype(sub, supFather);
sub.prototype.sayAge = function () {
    console.log(this.age, 'foo');
};

// 实例化子类，可以在实例上找到属性、方法
const instance1 = new sub("OBKoro1", 24);
const instance2 = new sub("小明", 18);
instance1.colors.push('black')

console.log(instance1);
//>> {"name":"OBKoro1","colors":["red","blue","green","black"],"age":24}
console.log(instance2);
//>> {"name":"小明","colors":["red","blue","green"],"age":18}
```

### 5.实现call

```js
 // 实现call
    Function.prototype.mycall = function (thisArg, ...arr) {
        if (thisArg === null || thisArg === undefined) {
            thisArg = window
        } else {
            thisArg = Object(thisArg);
        }

        const specialMethod = Symbol('anything');
        thisArg[specialMethod] = this;
        let result = thisArg[specialMethod](...arr);

        delete thisArg[specialMethod];
        return result
    }

    let obj = {
        name: "coffe1891"
    };

    function func() {
        console.log(this.name);
    }

    func.mycall(obj);//>> coffe1891
```

### 6.实现apply

```js
// 实现apply
    Function.prototype.myApply = function (thisArg) {
        if (thisArg === undefined || thisArg === null) {
            thisArg = window;
        } else {
            thisArg = Object(thisArg)
        }

        // 判断是否为类数组
        function isArrayLike(o) {
            if (o && typeof o === 'object' && isFinite(o.length) && o.length > 0 && o.length === Math.floor(o.length) && o.length < 2 ^ 32) {
                return true
            } else return false;
        }

        const specialMethod = Symbol('anything');
        thisArg[specialMethod] = this;

        let args = arguments[1];
        let result;

        if (args) {
            if (!Array.isArray(args) && !isArrayLike(args)) {
                throw new TypeError(
                    "第二个参数既不为数组，也不为类数组对象。抛出错误"
                )
            } else {
                args = Array.from(args);
                result = thisArg[specialMethod](...args);
            }
        } else {
            result = thisArg[specialMethod]();
        }
        delete thisArg[specialMethod]
        return result
    }

    let obj = {
        name: "coffe1891"
    };

    function func(a, b, c) {
        console.log(this.name);
        console.log(a, b, c);
    }

    func.myApply(obj, [1, 2, 3]);//>> coffe1891 1 2 3
```

### 7.实现bind

```js
Function.prototype.myBind = function (objThis, ...params) {
        const thisFn = this; // 即 func
        let funcForBind = function (...secondParams) {
            const isNew = this instanceof funcForBind;
            const thisArg = isNew ? this : Object(objThis);

            return thisFn.call(thisArg, ...params, ...secondParams)
        }

        funcForBind.prototype = Object(thisFn.prototype)
        return funcForBind
    }

    let func = function (p, secondParams) {//其实测试用的func其参数可以是任意多个
        console.log(p.name);
        console.log(this.name);
        console.log(secondParams);
    }
    let obj = {
        name: "1891"
    }
    func.myBind(obj, { name: "coffe" })("二次传参");
```

