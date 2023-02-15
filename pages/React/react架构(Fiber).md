### React理念

React 是用 JavaScript 构建**快速响应**的大型 Web 应用程序的首选方式。

影响`快速响应`的因素：

1. CPU的瓶颈（需要大计算量的操作，或者设备性能不足）
2. IO的瓶颈（发送网络请求后，需要等待数据返回）

解决影响的方法：

1. 解决`CPU瓶颈`的关键是实现`时间切片`，而`时间切片`的关键是：将**同步的更新**变为**可中断的异步更新**。

2. 解决`IO的瓶颈`减少用户对`网络延迟`的感，同样需要将**同步的更新**变为**可中断的异步更新**。

   

   核心是将**同步的更新**变为**可中断的异步更新**。

   

时间切片：在浏览器每一帧的时间中，预留一些时间给JS线程，`React`利用这部分时间更新组件（预留的初始时间是5ms）。

当预留的时间不够用时，`React`将线程控制权交还给浏览器使其有时间渲染UI，`React`则等待下一帧时间到来继续被中断的工作。

### React15架构

React15架构可以分为两层：

- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

#### Reconciler（协调器）工作

- 调用函数组件、或class组件的`render`方法，将返回的JSX转化为虚拟DOM
- 将虚拟DOM和上次更新时的虚拟DOM对比
- 通过对比找出本次更新中变化的虚拟DOM
- 通知**Renderer**将变化的虚拟DOM渲染到页面上

#### Renderer（渲染器）工作

在每次更新发生时，**Renderer**接到**Reconciler**通知，将变化的组件渲染在当前宿主环境。

类别：

- 负责在浏览器环境渲染的**Renderer** —— ReactDOM
- ReactNative渲染器，渲染App原生组件
- ReactTest渲染器，渲染出纯Js对象用于测试
- ReactArt渲染器，渲染到Canvas, SVG 或 VML (IE8)

#### React15架构缺点

在**Reconciler**中，`mount`的组件会调用`mountComponent`， `update`的组件会调用`updateComponent`。这两个方法都会递归更新子组件。

由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。

`React15`并不会中断进行中的更新。

![v15](../image/v15.png)

![dist](../image/dist.png)

如果中断更新就会发生上图所示的3步之后都不会更新，基于这个原因，`React`决定重写整个架构。

### React16架构

React16架构可以分为三层：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

#### Scheduler（调度器）工作

- 在空闲时触发回调的功能
- 多种调度优先级供任务设置

#### Reconciler（协调器）工作（内部采用了`Fiber`的架构）

- 更新工作从递归变成了可以中断的循环过程。每次循环都会调用`shouldYield`判断当前是否有剩余时间。
- **Reconciler**与**Renderer**不再是交替工作。当**Scheduler**将任务交给**Reconciler**后，**Reconciler**会为变化的虚拟DOM打上代表增/删/更新的标记，整个**Scheduler**与**Reconciler**的工作都在内存中进行。只有当所有组件都完成**Reconciler**的工作，才会统一交给**Renderer**。

#### Renderer（渲染器）工作

**Renderer**根据**Reconciler**为虚拟DOM打的标记，同步执行对应的DOM操作。

![process](../image/process.png)

其中红框中的步骤随时可能由于以下原因被中断：

- 有其他更高优任务需要先更新
- 当前帧没有剩余时间

由于红框中的工作都在内存中进行，不会更新页面上的DOM，所以即使反复中断，用户也不会看见更新不完全的DOM。

### React Fiber(**React16虚拟DOM**)

`React`内部实现的一套状态更新机制。支持任务不同`优先级`，可中断与恢复，并且恢复后可以复用之前的`中间状态`。

其中每个任务更新单元为`React Element`对应的`Fiber节点`。

#### Fiber的含义

`Fiber`包含三层含义：

1. 作为架构来说，之前`React15`的`Reconciler`采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack Reconciler`。`React16`的`Reconciler`基于`Fiber节点`实现，被称为`Fiber Reconciler`。
2. 作为静态的数据结构来说，每个`Fiber节点`对应一个`React element`，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。
3. 作为动态的工作单元来说，每个`Fiber节点`保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

`React`使用“双缓存”来完成`Fiber树`的构建与替换——对应着`DOM树`的创建与更新。