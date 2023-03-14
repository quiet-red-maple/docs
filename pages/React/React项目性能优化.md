### 一、防止子组件重复渲染

React.PureComponent(class组件)

Pure Components(与pure functions相似)在props与state不改变时(在input不变时)不会重复渲染（会得出相同的结果）， 因此提高了运行速度。因此shouldComponentUpdate周期函数不再被需要，因为本身这个周期函数的原理就是对比现在和之前的props或者state是否发生改变从而判断是否重新渲染，Pure Component本身的特点代替了这个功能。

注意：此时props与state的对比是浅比较（Shallow Compared）。因此Pure Components不能够使用嵌套式数据结构（nested data structure）。

React.memo（function组件）

React.memo 为高阶组件。它与 React.PureComponent 非常相似，但它适用于函数组件，但不适用于 class 组件。如果你的函数组件在给定相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

注意：与 class 组件中 shouldComponentUpdate() 方法不同的是，如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值相反。



扩展：可以使用 immutable.js 或者 immer.js进一步优化比较性能优化(例如两个不同的对象值却相同)

```js
var obj = {
  count: 1,
  list: [1, 2, 3, 4, 5]
}
var map1 = Immutable.fromJS(obj);
var map2 = map1.set('count', 2);

console.log(map1.list === map2.list); // true
```

### 二、骨架屏

`react-content-loader` 是**一个用于在React 中渲染占位符加载动画的npm 包**。 它使用SVG 来渲染占位符加载动画，并提供了多种预定义的占位符样式可供选择。 开发者可以通过配置参数来自定义占位符的样式，如颜色、大小等。

```react
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ContentLoader from 'react-content-loader';

let html = ReactDOMServer.renderToStaticMarkup(<ContentLoader/>);

export default html;
```

参考使用：[react-skeleton-webpack-plugin](https://www.npmjs.com/package/react-skeleton-webpack-plugin)

### 三、长列表渲染

#### 使用react-tiny-virtual-list构造虚拟列表

react-tiny-virtual-list是一个较为轻量的实现虚拟列表的组件，不同于react-virtualized支持网格以及表格等渲染优化。
react-tiny-virtual-list只支持列表，使用方便，其源码也只有700多行。

但是react-tiny-virtual-list有一个致命的缺点：

***完全不支持子元素的动态高度或者宽度\***

#### 使用react-window构造虚拟列表（性能优化）

1、不用全部加载出所有的DOM节点。默认只渲染可视区域及可视区域外的一个节点，此属性可自定义设置。

 2、可用于处理大型数据列表。当使用在大型数据列表中，可避免因为数据的更新而导致大量的重新渲染。

#### FixedSizeList（固定尺寸的列表）

```react
import { FixedSizeList } from 'react-window';
/** 
    * 每个列表项的组件
    * @param index：列表项的下标；style：列表项的样式（此参数必须传入列表项的组件中，否则会出现滚动到下方出现空白的情况）
    **/ 
const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);
 
const Example = () => (
  <FixedSizeList
    height={150} // 列表可视区域的高度
    itemCount={1000} // 列表数据长度
    itemSize={35} // 列表行高
    width={300} //列表可视区域的宽度
  >
    {Row}
  </FixedSizeList>
);
```

#### VariableSizeList （可变尺寸列表）

```react
import { VariableSizeList } from 'react-window';
 
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));
 
const getItemSize = index => rowHeights[index]; // 此处采用随机数作为每个列表项的高度
 /** 
    * 每个列表项的组件
    * @param index：列表项的下标；style：列表项的样式（此参数必须传入列表项的组件中，否则会出现滚动到下方出现空白的情况）
    **/ 
const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);
 
const Example = () => (
  <VariableSizeList
    height={150} // 列表可视区域的高度
    itemCount={1000} // 列表数据长度
    itemSize={getItemSize} // 设置列表项的高度
    layout= "vertical" // （vertical/horizontal） 默认为vertical，此为设置列表的方向
    width={300}
  >
    {Row}
  <VariableSizeList>
);

复制代码
```

#### 结合react-virtualized-auto-sizer使列表自适应当前页面的宽高

使用AutoSizer可是列表宽高为当前父组件的100%

```react
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
const Example = () => (
  <AutoSizer>
    {({ height, width }) => (
      <FixedSizeList
        className="List"
        height={height}
        itemCount={1000}
        itemSize={35}
        width={width}
      >
        {Row}
      </FixedSizeList>
    )}
  </AutoSizer>
);
```

常见问题

在使用VariableSizeList 会遇到列表项样式缓存没有被清除导致行高一直和第一次可视区域里展示的一样。可使用组件的属性resetAfterIndex(index: number, shouldForceUpdate: boolean = true): void来清除样式。

```react
class Example extends Component {
constructor(props) {
		super(props)
		this.myRef = React.createRef()
	}
......

render() {
......
  <VariableSizeList
	className='friends-list'
	height={66}
	itemCount={100}
	itemSize={64}
	itemSize={getItemSize}
	ref={this.myRef}
	width={260}>
  	{Row}
  </VariableSizeList>
......
<button onClick={()=>{this.myRef.current.resetAfterIndex(0, false)}}>
    清除样式
</button>
......
}
}
```

### 四、图片懒加载

使用`react-lazy-load`实现图片懒加载

### 五、组件懒加载

使用`React.lazy`将组件或者路由拆分实现懒加载

```react
import OtherComponent from './OtherComponent';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

const OtherComponent = React.lazy(() => import(/*webpackPrefetch: true*/ './OtherComponent')); // 可以使用prefetch: true 在浏览器空闲时预先加载资源
```

### 六、redux性能优化

[reselect](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Freduxjs%2Freselect)是配合`redux`使用的一款轻量型的状态选择库，目的在于当`store`中的`state`重新改变之后，使得局部未改变的状态不会因为整体的`state`变化而全部重新渲染，功能有点类似于组件中的生命周期函数`shouldComponentDidUpdate`，但是它们并不是一个东西。

1. useSelector

- 从 React Redux v7 开始，由于使用了 batch behavior ，在同一个组件中一个 action 导致的多个 useSelector 只会导致一次重绘。
- useSelector 应执行快，避免耗时操作
- 具有缓存机制，比较机制是   ===
- 可以手动传入比较机制

```jsx
import { shallowEqual, useSelector } from 'react-redux'

// later
const selectedData = useSelector(selectorReturningObject, shallowEqual)
```

- 配合 reselect 使用时，当一个 selector 只在一个组件中使用时，确保 selector 是同一个实例；当 selector 要在多个组件或者同个组件的多个实例中使用时，确保 selector 是多个实例。因为 reselect 的 selector 是根据参数的变化来缓存计算结果的。

```jsx
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const makeSelectCompletedTodosCount = () =>
    createSelector(
      state => state.todos,
      (_, completed) => completed,
      (todos, completed) =>
      todos.filter(todo => todo.completed === completed).length
    )

export const CompletedTodosCount = ({ completed }) => {
const selectCompletedTodosCount = useMemo(makeSelectCompletedTodosCount, [])

  const matchingCount = useSelector(state =>
      selectCompletedTodosCount(state, completed)
  )

  return <div>{matchingCount}</div>
}

export const App = () => {
    return (
      <>
      <span>Number of done todos:</span>
      <CompletedTodosCount completed={true} />
      <span>Number of unfinished todos:</span>
      <CompletedTodosCount completed={false} />
    </>
  )
}
```

### 七、大数据渲染

使用`requestAnimationFrame`会在浏览器渲染前执行

使用`requestIdleCallback`会在浏览器空闲时, 不会阻塞优先级比较高的工作

```react
class App extends React.Component {
  state = {list: []}
  handleClick = () => {
    this.timeSlice(531);
  };
  timeSlice = (times) => {
    // requestIdleCallback(() => {
    requestAnimationFrame(() => {
      let minus = times > 100 ? 100: times;
      this.setState({
        list: [...this.state.list, ...new Array(minus).fill(Date.now())]
      }, () => {
        times-=minus;
        if (times > 0) {
          this.timeSlice(times);
        }
      });
    })
  };
  render () {
    return (
      <div>
				<button onClick={this.handleClick}>加载</button>
        <ul>
        	{
            this.state.list.map((item, index) => {
              	return <li key={index}>{item}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
```



参考：

[使用react-window构造虚拟列表（性能优化）](https://juejin.cn/post/7101685182507253768)

[react-redux](https://www.jianshu.com/p/ef49b981296a)

