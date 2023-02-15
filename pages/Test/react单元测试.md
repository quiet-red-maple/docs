### jest

Jest 是一个 JavaScript 测试框架，旨在确保任何 JavaScript 代码的正确性。

注：create-react-app 和 umi 已经内部集成了jest可以直接使用。

#### 安装依赖

首先使用下面命令安装jest

```shell
yarn add -D jest
```

如果你项目使用的是Typescript，则还需要安装`ts-jest`作为依赖：

```
yarn add -D ts-jest
```

#### 配置jest

安装完jest后需要在package.json文件里面配置一下:

```json
{ 
  "jest": {
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleDirectories": [
      "node_modules",
      "src"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }
}
```

上面各个配置项的意思分别是：

- transform: 告诉jest，你的ts或者tsx文件需要使用ts-jest来进行转换。
- testRegex: 告诉jest哪些文件是需要被作为测试代码进行执行的，从上面的正则表达式我们可以看出文件名中有test和spec的文件将会被作为测试用例执行。
- moduleDirectories: 告诉jest在执行测试用例代码的时候，代码用到的dependencies应该去哪些目录进行resolve，在这里jest会去`node_modules`和`src`（或者你自己的源代码根目录）里面进行resolve，这个应该要和你项目的webpack.config.js的resolve部分配置保持一致。
- moduleFileExtensions: 告诉jest在找不到对应文件的时候应该尝试哪些文件后缀。

### Enzyme（操纵dom时 ui测试）

Enzyme 的 API 通过**模仿 jQuery 的 API** ，使得 DOM 操作和历遍很灵活、直观。Enzyme 兼容所有的主要测试运行器和判断库。

**~安装~**

```shell
npm install enzyme enzyme-to-json  enzyme-adapter-react-16
```

**~引入依赖项~**

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Basic from '../basic_test';

import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
```

`nzyme`、从`enzyme-to-json`库中引入`toJson`函数。`toJson`函数能够把shallow 渲染的组件转成`json`然后保存到`snapshot file`中 。

最后我们引入`Adapter`，它帮助`enzyme`与`react v16` 协作起来，然后进行初始化。

### React hooks testing library（测试React hook使用）

#### 安装

直接把`react-hooks-testing-library`作为我们的项目`devDependencies`：

```shell
yarn add -D @testing-library/react-hooks
```

注意：要使用`react-hooks-testing-library`我们要确保我们安装了`16.9.0`版本及其以上的`react`和`react-test-renderer`：

```shell
yarn add react@^16.9.0
yarn add -D react-test-renderer@^16.9.0
```

#### 例子

现在就让我们看一个简单的同时使用`Jest`和`react-hooks-testing-library`来测试hook的例子，假如我们在项目里面定义了一个叫做`useCounter`的Hook:

```javascript
// somewhere/useCounter.js
import { useState, useCallback } from 'react'

function useCounter() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => setCount(x => x + 1), [])
  const decrement = useCallback(() => setCount(x => x - 1), [])

  return {count, increment, decrease}
}
```

在上面的代码中我定义了一个叫做`useCounter`的hook，这个hook是用来封装一个叫做count的状态并且对外暴露对count进行操作的一些updater包括`increment`和`decrement`。如果大家对`useState`和`useCallback`不够熟悉的话可以看一下我的上一篇文章[React Hook实战指南](https://blog.csdn.net/weixin_39305620/article/details/107513052)。接着就让我们编写这个hook的测试用例：

```javascript
// somewhere/useCounter.spec.js
import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from 'somewhere/useCounter'

describe('Test useCounter', () => {
  describe('increment', () => {
     it('increase counter by 1', () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        result.current.increment()
      })

      expect(result.current.count).toBe(1)
    })
  })

  describe('decrement', () => {
    it('decrease counter by 1', () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        result.current.decrement()
      })

      expect(result.current.count).toBe(-1)
    })
})
})
```

上面的代码中我们写了一个测试大组（describe）`Test useCounter`并在这个大组里面定义了两个测试小组分别用来测试`useCounter`返回的`increment`和`decrement`方法。我们具体看一下描述为`increase counter by 1`的测试用例的代码，首先我们要用`renderHook`函数来渲染要被测试的hook，这里我们需要将`useCounter`的返回值作为`callback`函数的返回值，这是因为我们需要在外面拿到这个hook的返回结果`{count, increment, decrement}`。接着我们使用`act`函数来调用改变组件状态`count`的`increment`函数，`act`函数完成之后我们的组件也就完成了重渲染，后面就可以判断更新后的`count`是不是我们想要的结果了。

