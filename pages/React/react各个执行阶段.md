`react 从 16版本开始从 协调器 ==> 渲染器 架构改为了 调度器 ==> 协调器 ==> 渲染器 架构`

### 三层架构


> Scheduler（调度器） → Reconciler（协调器） → Renderer（渲染器）<br/>
>决定先做谁、何时做    →  算出要改什么        →   执行改动


### 为什么修改架构 
react 15 版本
致命问题：递归不可中断。​ 调用栈在 JS 引擎手里，React 没法中途暂停、保存、让出主线程。于是：

组件树一大，一次更新占满主线程几百毫秒
期间用户输入、点击、动画全部卡住
浏览器画不出帧，用户看到的就是"卡死"

本质矛盾：​ React 需要在"计算量大"和"主线程不能长时间被占"之间找平衡。要么算得快（不现实），要么能暂停。

### 三层各自干什么

#### ① Scheduler（调度器）

职责：优先级 + 时间切片

lane 模型：每个更新分配优先级。用户输入、动画是高优先级；网络响应、普通更新是低优先级
高优先级可插队：低优先级 render 到一半，高优先级来了立刻打断，先做紧急的
时间切片：每帧只占约 5ms，到点 shouldYield() 返回 true 就主动让出主线程
让出机制：用 MessageChannel 宏任务，在浏览器绘制的间隙继续干活
为什么用 MessageChannel 不用 setTimeout？setTimeout 有最小 4ms 延迟，且嵌套超过 5 层会被强制拉长到 4ms；MessageChannel 是真正的宏任务，无延迟。

#### ② Reconciler（协调器）

职责：在内存里算差异

Fiber 数据结构：child / sibling / return 三指针，把树拆成链表
可中断的循环：workLoop 里 while (workInProgress && !shouldYield())，随时能 break
双缓冲：current 树（屏上）+ workInProgress 树（离屏草稿），靠 alternate 互指
打标记：diff 完给节点打 Placement / Update / Deletion，产出 effectList
关键：这个阶段完全不碰 DOM。​ 所以在内存里怎么被打断、丢弃、重来，用户都看不到半成品。

#### ③ Renderer（渲染器）

职责：把变更落到宿主环境

react-dom → 浏览器 DOM
react-native → 原生视图
react-art → Canvas/SVG
commit 阶段全程同步不可中断（中断会导致 UI 撕裂），分三个子阶段：

| 子阶段 |干什么 | current 指向 |
| --- | --- | --- |
| before mutation | getSnapshotBeforeUpdate，读 DOM 快照 | 旧树 |
| mutation | 增删改 DOM、解绑旧 ref | 旧 → 新 |
| 双缓冲切换 | root.current = finishedWork（O(1)） | - |
| layout | useLayoutEffect、重绑 ref | 新树 |

### 一次 setState 的完整链路（把三层串起来）

```txt
   │
   ├─ ① Scheduler：分配 lane 优先级，任务入队，等待调度
   │       ↓ 时间切片到点 / 被高优先级打断 → 让出主线程，下帧继续
   │
   ├─ ② Reconciler：workLoop 遍历 fiber 链表
   │       beginWork（向下）→ 打 effect 标记
   │       completeWork（向上）→ 收集 effectList
   │       产出 workInProgress 树（离屏，不碰 DOM）
   │       ↓ 可中断：workInProgress 指针保存现场
   │
   └─ ③ Renderer：commit 同步执行
           before mutation → mutation → 【切换 root.current】→ layout
           ↓
         真实 DOM 更新，useEffect 异步在绘制后执行
```

### 渲染顺序

```react
function Parent() {
  console.log('1. Parent render');
  useEffect(() => console.log('4. Parent effect'), []);
  return <Child />;
}
function Child() {
  console.log('2. Child render');
  useEffect(() => console.log('3. Child effect'), []);
  return <div>child</div>;
}
```

控制台：
1. Parent render
2. Child render
--- DOM 已挂载 ---
3. Child effect
4. Parent effect

| React 渲染阶段父到子（DFS 自上而下），Commit 后 effect 子到父（completeWork 自底向上）；useLayoutEffect 在 paint 前同步执行，useEffect 在 paint 后异步执行，两者父子维度都是子先父后；cleanup 同样子先父后，同组件内先清理旧 effect 再执行新 effect。