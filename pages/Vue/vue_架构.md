## vue 架构
> React 加 Scheduler 是因为它"不知道谁变了"，只能从根全量重算，计算太重所以需要可中断和切片。
> Vue 靠响应式"精确知道谁变了"，只更新受影响的组件，计算量本来就小，所以不需要 Fiber。
> 这是两条完全不同的技术路线：React 靠"运行时调度"补救，Vue 靠"响应式精确通知 + 编译时优化"从源头减轻负担。

### Vue 的分层架构

> 编译器 Compiler → 响应式 Reactivity → 运行时 Runtime → 渲染器 Renderer
> 
>  template 编译   →   track / trigger  →   组件实例/生命周期  →   vnode → DOM

### Vue 2 → Vue 3 改了什么

#### ① 响应式：Object.defineProperty → Proxy

Vue 2 的三个硬伤：
```js
vm.obj.b = 2;      // 新增属性 → watcher 触发 0 次  ❌
vm.arr[0] = 99;    // 数组索引 → watcher 触发 0 次  ❌
// 必须 Vue.set() / this.$set()，或依赖重写的 7 个数组方法
```

原因：defineProperty 只能劫持已存在的属性，且初始化时就要递归遍历整个对象（深层对象开销大）。
Vue 3 用 Proxy 全部解决：

```js
state.obj.b = 2;      // ✅ 新增属性
state.arr[0] = 99;    // ✅ 数组索引
delete state.obj.a;   // ✅ 删除
state.arr.length = 0; // ✅ length
```

另外 Proxy 是懒代理——只有访问到嵌套属性时才创建子 Proxy，初始化开销大幅下降。

#### ② 编译器优化（Vue 3 的性能大杀器）

三个优化：

| 优化 | 作用 |
| --- | --- |
| 静态提升​ | 静态节点提出 render 函数，只创建一次，之后复用 |
| patchFlag​ | 动态节点打标记（1 TEXT / 2 CLASS / 128 KEYED_FRAGMENT），diff 时只比较这一类，不用全属性比对 |
|Block tree​ | 把动态节点收集进 dynamicChildren 数组，diff 时只遍历这个数组，静态内容整棵跳过 效果：​ diff 的成本从"整棵树"降到"几个动态节点"。 |

#### ③ diff 算法：双端 → 双端 + 最长递增子序列

Vue 2：头头、尾尾、头尾、尾头四种命中，都不中就暴力遍历</br>
Vue 3：先双端对齐，剩下的用 LIS（最长递增子序列）​ 求最少移动次数

#### ④ 其他

Composition API、TypeScript 重写、Fragments / Teleport / Suspense、tree-shaking 友好。

### vue 执行各个阶段

#### 编译期：把模板"翻译+优化"成 render 函数

只跑一次。这一阶段顺手做了三件优化

| 优化 | 作用 |
| --- | --- |
| 静态提升​ | 静态节点提出 render 函数，只创建一次，之后复用 |
| patchFlag​ | 动态节点打标记（1 TEXT / 2 CLASS / 128 KEYED_FRAGMENT），diff 时只比较这一类，不用全属性比对 |
|Block tree​ | 把动态节点收集进 dynamicChildren 数组，diff 时只遍历这个数组，静态内容整棵跳过 效果：​ diff 的成本从"整棵树"降到"几个动态节点"。 |

效果：​ 之后 diff 时，静态内容整棵跳过，只遍历几个动态节点。

#### 挂载期：第一次 render，同时"登记依赖"

```js
function render() {
  return h('div', state.name)   // ← 执行时"读"了 name
}
```
读到 name 的瞬间，Vue 记下："这个组件的 watcher 订阅了 name"。
这就是依赖收集（track）。所以你模板里用了什么，就订阅什么——这也是为什么 Vue 不会过度更新。

#### 更新期：五步走

① trigger —— 通知粉丝

state.name = '李四'   // 走 setter → 找到 name 的 dep → 通知订阅者

② queueJob —— 入队去重

不是立即重渲染，而是塞进队列。按组件 id 去重（同一个组件多次变化只留一个），并按父组件优先排序（保证父先于子更新，避免子组件白算）。

③ flushJobs —— 微任务批量

用 Promise.then 在微任务里统一执行。所以同步改 3 次，只触发 1 次更新。

④ render —— 重新生成 vnode

被通知的组件重新执行 render，生成新 vnode 树。

⑤ patch —— 边 diff 边改 DOM

对比新旧 vnode，用双端比较 + LIS​ 求最少移动次数，边比边直接改 DOM。

### 总结
>Vue 的更新流程核心是精准通知。它靠响应式系统知道哪个组件用了哪个数据，数据变了只更新那一个组件，不需要像 React 那样从根重新算。
>具体流程：编译阶段把模板编译成 render 函数，顺手做静态提升、patchFlag、Block tree 这些优化，只跑一次。首次挂载时执行 render，读到数据就登记依赖，相当于组件订阅了这个数据。
>之后数据变化走五步：改数据触发 setter 通知订阅者；组件 watcher 入队，按 id 去重、按父子排序；微任务批量 flush；被通知的组件
>重新 render 生成新 vnode；最后 patch，用双端比较加最长递增子序列求最少移动次数，边 diff 边改 DOM。
>和 React 对照看：React 的 Scheduler 阶段在 Vue 这里只剩极轻量的"触发+排队"，因为 Vue 已经知道该更新谁了，不需要调度。
>还有一个关键差异：React 严格分 render 和 commit 两个阶段，Vue 直接在 patch 里边 diff 边改 DOM。因为 React 需要可中断，
>中断时改 DOM 会撕裂，所以必须算完再一次性提交；Vue 更新粒度小且不中断，就没这个顾虑。