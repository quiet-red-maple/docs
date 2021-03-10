### 1、什么是声明式编程

声明式编程是一种编程范式，它关注的是你**要做什么**，而不是**如何做**。它表达逻辑而不显式地定义步骤。这意味着我们需要根据逻辑的计算来声明要显示的组件。例如

**HTML file**

```
// HTML
<div>
  <p>Declarative Programming</p>
</div>
```

**SQL file**

```sql
select * from studens where firstName = 'declarative';
```

### 2、 声明式编程 vs 命令式编程

声明式编程的编写方式描述了应该做什么，而命令式编程描述了如何做。在声明式编程中，让编译器决定如何做事情。声明性程序很容易推理，因为代码本身描述了它在做什么。

下面是一个例子，数组中的每个元素都乘以 `2`，我们使用声明式`map`函数，让编译器来完成其余的工作，而使用命令式，需要编写所有的流程步骤。

```javascript
const numbers = [1,2,3,4,5];

// 声明式
const doubleWithDec = numbers.map(number => number * 2);

console.log(doubleWithDec)

// 命令式
const doubleWithImp = [];
for(let i=0; i<numbers.length; i++) {
    const numberdouble = numbers[i] * 2;
    doubleWithImp.push(numberdouble)
}

console.log(doubleWithImp)
```

### 3、什么是函数式编程

函数式编程是声明式编程的一部分。javascript中的函数是第一类公民，这意味着函数是数据，你可以像保存变量一样在应用程序中保存、检索和传递这些函数。

函数式编程有些核心的概念，如下：

- 不可变性(Immutability)
- 纯函数(Pure Functions)
- 数据转换(Data Transformations)
- 高阶函数 (Higher-Order Functions)
- 递归
- 组合

#### 不可变性(Immutability)

不可变性意味着不可改变。 在函数式编程中，你无法更改数据，也不能更改。 如果要改变或更改数据，则必须复制数据副本来更改。

例如，这是一个**student**对象和`changeName`函数，如果要更改学生的名称，则需要先复制　student　对象，然后返回新对象。

在javascript中，函数参数是对实际数据的引用，你不应该使用　**student.firstName =“testing11”**，这会改变实际的`student` 对象，应该使用**Object.assign**复制对象并返回新对象。

```javascript
let student = {
    firstName: "testing",
    lastName: "testing",
    marks: 500
}

function changeName(student) {
    // student.firstName = "testing11" //should not do it
    let copiedStudent = Object.assign({}, student);
    copiedStudent.firstName = "testing11";
    return copiedStudent;
}

console.log(changeName(student));

console.log(student);
```

#### 纯函数

纯函数是始终接受一个或多个参数并计算参数并返回数据或函数的函数。 它没有副作用，例如设置全局状态，更改应用程序状态，它总是将参数视为不可变数据。

我想使用 **appendAddress** 的函数向`student`对象添加一个地址。 如果使用非纯函数，它没有参数，直接更改 `student` 对象来更改全局状态。

使用纯函数，它接受参数，基于参数计算，返回一个新对象而不修改参数。

```javascript
let student = {
    firstName: "testing",
    lastName: "testing",
    marks: 500
}

// 非纯函数
function appendAddress() {
    student.address = {streetNumber:"0000", streetName: "first", city:"somecity"};
}

console.log(appendAddress());

// 纯函数
function appendAddress(student) {
    let copystudent = Object.assign({}, student);
    copystudent.address = {streetNumber:"0000", streetName: "first", city:"somecity"};
    return copystudent;
}

console.log(appendAddress(student));

console.log(student);
```

#### 数据转换

我们讲了很多关于不可变性的内容，如果数据是不可变的，我们如何改变数据。如上所述，我们总是生成原始数据的转换副本，而不是直接更改原始数据。

再介绍一些 javascript内置函数，当然还有很多其他的函数，这里有一些例子。所有这些函数都不改变现有的数据，而是返回新的数组或对象。

```javascript
let cities = ["irving", "lowell", "houston"];

// we can get the comma separated list
console.log(cities.join(','))
// irving,lowell,houston

// if we want to get cities start with i
const citiesI = cities.filter(city => city[0] === "i");
console.log(citiesI)
// [ 'irving' ]

// if we want to capitalize all the cities
const citiesC = cities.map(city => city.toUpperCase());
console.log(citiesC)
// [ 'IRVING', 'LOWELL', 'HOUSTON' ]
```

#### 高阶函数

高阶函数是将函数作为参数或返回函数的函数，或者有时它们都有。 这些高阶函数可以操纵其他函数。

`Array.map，Array.filter和Array.reduce`是高阶函数，因为它们将函数作为参数。

```javascript
const numbers = [10,20,40,50,60,70,80]

const out1 = numbers.map(num => num * 100);
console.log(out1);
// [ 1000, 2000, 4000, 5000, 6000, 7000, 8000 ]

const out2 = numbers.filter(num => num > 50);
console.log(out2);
// [ 60, 70, 80 ]

const out3 = numbers.reduce((out,num) => out + num);
console.log(out3);
// 330
```

下面是另一个名为`isPersonOld`的高阶函数示例，该函数接受另外两个函数，分别是 `message`和`isYoung` 。

```javascript
const isYoung = age => age < 25;

const message = msg => "He is "+ msg;

function isPersonOld(age, isYoung, message) {
    const returnMessage = isYoung(age)?message("young"):message("old");
    return returnMessage;
}

// passing functions as an arguments
console.log(isPersonOld(13,isYoung,message))
// He is young
```

#### 递归

递归是一种函数在满足一定条件之前调用自身的技术。只要可能，最好使用递归而不是循环。你必须注意这一点，浏览器不能处理太多递归和抛出错误。

下面是一个演示递归的例子，在这个递归中，打印一个类似于楼梯的名称。我们也可以使用`for`循环，但只要可能，我们更喜欢递归。

```javascript
function printMyName(name, count) {
    if(count <= name.length) {
        console.log(name.substring(0,count));
        printMyName(name, ++count);
    }
}

console.log(printMyName("Bhargav", 1));

/*
B
Bh
Bha
Bhar
Bharg
Bharga
Bhargav
*/

// withotu recursion
var name = "Bhargav"
var output = "";
for(let i=0; i<name.length; i++) {
    output = output + name[i];
    console.log(output);
}
```

#### 组合

在React中，我们将功能划分为小型可重用的纯函数，我们必须将所有这些可重用的函数放在一起，最终使其成为产品。 将所有较小的函数组合成更大的函数，最终，得到一个应用程序，这称为**组合**。

实现组合有许多不同方法。 我们从Javascript中了解到的一种常见方法是链接。 链接是一种使用**点**表示法调用前一个函数的返回值的函数的方法。

这是一个例子。 我们有一个`name`，如果`firstName`和`lastName`大于5个单词的大写字母，刚返回，并且打印名称的名称和长度。

```javascript
const name = "Bhargav Bachina";

const output = name.split(" ")
    .filter(name => name.length > 5)
    .map(val => {
    val = val.toUpperCase();
    console.log("Name:::::"+val);
    console.log("Count::::"+val.length);
    return val;
});

console.log(output)
/*
Name:::::BHARGAV
Count::::7
Name:::::BACHINA
Count::::7
[ 'BHARGAV', 'BACHINA' ]
*/
```

在React中，我们使用了不同于链接的方法，因为如果有30个这样的函数，就很难进行链接。这里的目的是将所有更简单的函数组合起来生成一个更高阶的函数。

```javascript
const name = compose(
    splitmyName,
    countEachName,
    comvertUpperCase,
    returnName
)

console.log(name);
```

### 4、组件生命周期方法

组件在进入和离开DOM时要经历一系列生命周期方法，下面是这些生命周期方法。

#### componentWillMount()

在渲染前调用,在客户端也在服务端，它只发生一次。

#### componentDidMount()

在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过`this.getDOMNode()`来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用`setTimeout`, `setInterval`或者发送AJAX请求等操作(防止异部操作阻塞UI)。

#### componentWillReceiveProps()

在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

#### shouldComponentUpdate()

返回一个布尔值。在组件接收到新的`props`或者`state`时被调用。在初始化时或者使用`forceUpdate`时不被调用。 可以在你确认不需要更新组件时使用。

#### componentWillUpdate()

在组件接收到新的`props`或者`state`但还没有`render`时被调用。在初始化时不会被调用。

#### componentDidUpdate()

在组件完成更新后立即调用。在初始化时不会被调用。

#### componentWillUnMount()

件从 DOM 中移除的时候立刻被调用。

#### getDerivedStateFromError()

这个生命周期方法在**ErrorBoundary**类中使用。实际上，如果使用这个生命周期方法，任何类都会变成`ErrorBoundary`。这用于在组件树中出现错误时呈现回退UI，而不是在屏幕上显示一些奇怪的错误。

#### componentDidCatch()

这个生命周期方法在ErrorBoundary类中使用。实际上，如果使用这个生命周期方法，任何类都会变成ErrorBoundary。这用于在组件树中出现错误时记录错误。

### 5、什么是 Fragments

在React中，我们需要有一个父元素，同时从组件返回React元素。有时在DOM中添加额外的节点会很烦人。使用 **Fragments**，我们不需要在DOM中添加额外的节点。我们只需要用 `React.Fragment` 或才简写 `<>` 来包裹内容就行了。如下 所示：

```javascript
 // Without Fragments   
return (
    <div>
       <CompoentA />
       <CompoentB />
       <CompoentC />
    </div>
)

// With Fragments   
  return (
    <React.Fragment>
       <CompoentA />
       <CompoentB />
       <CompoentC />
    </React.Fragment>
  )

  // shorthand notation Fragments   
  return (
    <>
       <CompoentA />
       <CompoentB />
       <CompoentC />
    </>
  )
```

### 6、如何提高性能

我们可以通过多种方式提高应用性能，以下这些比较重要：

- 适当地使用`shouldComponentUpdate`生命周期方法。 它避免了子组件的不必要的渲染。 如果树中有100个组件，则不重新渲染整个组件树来提高应用程序性能。
- 使用`create-react-app`来构建项目，这会创建整个项目结构，并进行大量优化。
- 不可变性是提高性能的关键。不要对数据进行修改，而是始终在现有集合的基础上创建新的集合，以保持尽可能少的复制，从而提高性能。
- 在显示列表或表格时始终使用 `Keys`，这会让 React 的更新速度更快
- 代码分离是将代码插入到单独的文件中，只加载模块或部分所需的文件的技术。

### 7、如何在重新加载页面时保留数据

单页应用程序首先在DOM中加载`index.html`，然后在用户浏览页面时加载内容，或者从同一`index.html`中的后端API获取任何数据。

如果通过点击浏览器中的重新加载按钮重新加载页面`index.html`，整个React应用程序将重新加载，我们将丢失应用程序的状态。 如何保留应用状态？

每当重新加载应用程序时，我们使用浏览器`localstorage`来保存应用程序的状态。我们将整个存储数据保存在`localstorage`中，每当有页面刷新或重新加载时，我们从`localstorage`加载状态。

[![img](https://image.fundebug.com/2019-05-31-10.png)](https://image.fundebug.com/2019-05-31-10.png)

### 8、如何在React进行API调用

我们使用`redux-thunk`在React中调用API。因为`reduce`是纯函数，所以没有副作用，比如调用API。

因此，我们必须使用`redux-thunk`从 action creators 那里进行 API 调用。Action creator 派发一个action，将来自API的数据放入action 的 `payload` 中。Reducers 接收我们在上面的`redux`循环中讨论的数据，其余的过程也是相同的。

[![img](https://image.fundebug.com/2019-05-31-11.png)](https://image.fundebug.com/2019-05-31-11.png)

redux-thunk是一个中间件。一旦它被引入到项目中，每次派发一个`action`时，都会通过`thunk`传递。如果它是一个函数，它只是等待函数处理并返回响应。如果它不是一个函数，它只是正常处理。

这里有一个例子。`sendEmailAPI`是从组件中调用的函数，它接受一个数据并返回一个函数，其中`dispatch`作为参数。我们使用`redux-thunk`调用API `apiservice`，并等待收到响应。一旦接收到响应，我们就使用`payload` 派发一个`action` 。

```
import apiservice from '../services/apiservice';

export function sendEmail(data) {
    return { type:"SEND_EMAIL", payload: data };
}

export function sendEmailAPI(email) {
    return function(dispatch) {
        return apiservice.callAPI(email).then(data => {
            dispatch(sendEmail(data));
        });
    }
}
```