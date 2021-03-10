​		**Enzyme**是用于React的JavaScript测试实用程序，可以更轻松地测试React组件的输出。您还可以根据给定的输出进行操作，遍历并以某种方式模拟运行时。

通过模仿jQuery的DOM操作和遍历的API，更方便的操纵dom。

### 一、安装

```shell
npm i --save-dev enzyme enzyme-adapter-react-16
```

### 二、使用示例

```react
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

### 三、Enzyme语法

#### shallow（单元测试使用）

**shallow**浅渲染，只会测试当前需要测试的组件，不会测试该组件下的其他子组件。所以 该方法渲染速度会很快。

适用场景：

只测试当前组件，不测试其他包括其子组件。

#### mount（集成测试使用）

**mount**深渲染，会测试所有组件，当前组件及其子组件。

适用场景：

集成测试。

#### simulate（事件模拟）

```js
it("Header 组件 input 框内容，当用户输入时，会跟随变化", () => {
  const wrapper = shallow(<Header />);
  const inputElement = wrapper.find("[data-test='input']");
  const userInput = "惊天";
  inputElement.simulate("change", {
    target: {
      value: userInput,
    },
  });
  expect(wrapper.state("value")).toEqual(userInput); // 单元测试时使用 测试数据方便
  const newInputElement = wrapper.find("[data-test='input']");
  expect(newInputElement.prop("value")).toBe(userInput); // 集成测试时使用 测试dom元素方便
});
```



### 四、jest-enzyme

​		**jest-enzyme**有更简洁的语法。

1. 安装

```shell
npm install jest-enzyme --save-dev
```

2. 使用

   需要先在jest.config.js添加配置

   ```json
    setupFilesAfterEnv: [
       "./node_modules/jest-enzyme/lib/index.js",
     ],
   ```

3. 具体语法可见[jest-enzyme](https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme)

### 五、快照测试

```react
 expect(wrapper).toMatchSnapshot();
```

会在src目录下生成快照`__snapshots__`文件夹下，用来确认页面显示是否改变。

如果要更新snapshots可以按W之后按U更新snapshots

### 六、代码示例

```react
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Enzyme, { shallow, mount } from "enzyme"; // shallow 浅渲染  mount 深渲染
// import Adapter from "enzyme-adapter-react-16";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"; // 兼容 react 17 这个只是私人写的，官方如果兼容请使用官方的

Enzyme.configure({ adapter: new Adapter() });

test("renders hello react link", () => {
  // render(<App />);
  // const linkElement = screen.getByText(/hello/i);
  // const container = document.getElementsByClassName("App");
  // expect(container.length).toBe(1);
  // expect(linkElement).toBeInTheDocument();

  const wrapper = mount(<App />);
  // expect(wrapper.find(".App").length).toBe(1);
  // expect(wrapper.find(".App").prop("title")).toBe("hellos");
  // console.log(wrapper.debug()); // 用来调试
  // expect(wrapper.find(".App").prop("name")).toBe("hellos");

  // expect(wrapper.find('[data-test="container"]').length).toBe(1); // 使用自定义的data-test="container" 属性可以和代码解耦
  // expect(wrapper.find('[data-test="container"]').prop("title")).toBe("hellos");

  const container = wrapper.find('[data-test="container"]');

  expect(container).toExist(); // jest-enzyme 语法更便捷  判断是否有
  expect(container).toHaveProp("title", "hellos");

  expect(wrapper).toMatchSnapshot();
});

```

### 七、简化封装

在src目录下新建utils 文件夹新建testSetup.js 文件写入如下代码：

```react
import Enzyme, { shallow, mount } from "enzyme"; // shallow 浅渲染（）
// import Adapter from "enzyme-adapter-react-16";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"; // 兼容 react 17 这个只是私人写的官方如果兼容请使用官方的

Enzyme.configure({ adapter: new Adapter() });
```

在jest.config.js 文件下setupFilesAfterEnv添加如下配置

```js
setupFilesAfterEnv: [
  	...
    "<rootDir>/src/utils/testSetup.js",
  ],
```

这样每个文件夹不需要重复引用上述代码了



