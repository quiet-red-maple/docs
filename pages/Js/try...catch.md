通常，如果发生错误，脚本就会“死亡”（立即停止），并在控制台将错误打印出来。

但是有一种语法结构 `try...catch`，它使我们可以“捕获（catch）”错误，因此脚本可以执行更合理的操作，而不是死掉。

### 1、语法

```js
try {

  // 代码...

} catch (err) {

  // 错误捕获

} finally {
  
}
```

```js
// 忽略error 的详细信息
try {
  // ...
} catch { // <-- 没有 (err)
  // ...
} finally {
  
}
```

它按照以下步骤执行：

1. 首先，执行 `try {...}` 中的代码。
2. 如果这里没有错误，则忽略 `catch (err)`：执行到 `try` 的末尾并跳过 `catch` 继续执行。
3. 如果这里出现错误，则 `try` 执行停止，控制流转向 `catch (err)` 的开头。变量 `err`（我们可以使用任何名称）将包含一个 error 对象，该对象包含了所发生事件的详细信息。
4. `finally`块包含的语句在`try`块和`catch`之后，`try..catch..finally`块后的语句之前执行。请注意，无论是否抛出异常`finally`子句都会执行。此外，如果抛出异常，即使没有`catch`子句处理异常，`finally`子句中的语句也会执行。

### 2、嵌套 try 块

```js
try {
  try {
    throw new Error("oops");
  }
  finally {
    console.log("finally");
  }
}
catch (ex) {
  console.error("outer", ex.message);
}

// Output:
// "finally"
// "outer" "oops"
```

```js
try {
  try {
    throw new Error("oops");
  }
  catch (ex) {
    console.error("inner", ex.message);
  }
  finally {
    console.log("finally");
  }
}
catch (ex) {
  console.error("outer", ex.message);
}

// Output:
// "inner" "oops"
// "finally"
```

```js
try {
  try {
    throw new Error("oops");
  }
  catch (ex) {
    console.error("inner", ex.message);
    throw ex;
  }
  finally {
    console.log("finally");
  }
}
catch (ex) {
  console.error("outer", ex.message);
}

// Output:
// "inner" "oops"
// "finally"
// "outer" "oops"

```

任何给定的异常只会被离它最近的封闭 catch 块捕获一次。当然，在“inner”块抛出的任何新异常（因为 catch 块里的代码也可以抛出异常），将会被“outer”块所捕获。

```js
function aa () {
  try {
  try {
    throw new Error("oops");
  }
  catch (ex) {
    console.error("inner", ex.message);
    throw ex;
   // return;
  }
  finally {
    console.log("finally");
    return;
  }
}
catch (ex) {
  console.error("outer", ex.message);
}
}
// 注：此 try catch 语句需要在 function 中运行才能作为函数的返回值，否则直接运行会报语法错误
// Output:
// "inner" "oops"
// "finally"
```

### ⚠️注意：

#### 1、`try...catch` **仅对运行时的 error 有效**

要使得 `try...catch` 能工作，代码必须是可执行的。换句话说，它必须是有效的 JavaScript 代码。

如果代码包含语法错误，那么 `try..catch` 将无法正常工作，例如含有不匹配的花括号：

```js
try {
  {{{{{{{{{{{{
} catch (err) {
  alert("引擎无法理解这段代码，它是无效的");
}
```

JavaScript 引擎首先会读取代码，然后运行它。在读取阶段发生的错误被称为“解析时间（parse-time）”错误，并且无法恢复（从该代码内部）。这是因为引擎无法理解该代码。

所以，`try...catch` 只能处理有效代码中出现的错误。这类错误被称为“运行时的错误（runtime errors）”，有时被称为“异常（exceptions）”。

#### 2、`try...catch` **同步执行**

如果在“计划的（scheduled）”代码中发生异常，例如在 `setTimeout` 中，则 `try...catch` 不会捕获到异常：

```js
try {
  setTimeout(function() {
    noSuchVariable; // 脚本将在这里停止运行
  }, 1000);
} catch (err) {
  alert( "不工作" );
}
```

因为 `try...catch` 包裹了计划要执行的函数，该函数本身要稍后才执行，这时引擎已经离开了 `try...catch` 结构。

为了捕获到计划的（scheduled）函数中的异常，那么 `try...catch` 必须在这个函数内：

```js
setTimeout(function() {
  try {
    noSuchVariable; // try...catch 处理 error 了！
  } catch {
    alert( "error 被在这里捕获了！" );
  }
}, 1000);
```

