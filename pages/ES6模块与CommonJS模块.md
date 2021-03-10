### 1、Js 导入导出关键字

#### 导出关键字

- module.exports
- exports
- export
- export default

#### 导入关键字

- require
  - const xxx = require("模块名")
- import
  - import { xxx } from "模块名"
  - import xxx from "模块名"
  - import xxx1, {xxx2, xxx3,...} from "模块名"
  - import \* from "模块名"

### 2、模块规范

JS 模块化编程分了两种规范：**_CommonJS 模块规范_**和**_ES6 模块规范_**。

- **_CommonJS 模块规范_** —— CommonJS 规范中，以**_module.exports_**导出接口，以**_require_**引入模块
- **_ES6 模块规范_** —— ES6 标准规范中，以**_export_**指令导出接口，以**_import_**引入模块

在 Node.js 编程中，Node 模块系统遵循的是 CommonJS 规范。

### 3、CommonJS 模块规范

CommonJS 规范规定: 每个 js 文件就是一个模块，有自己的作用域。
在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。
如果要暴露给其他程序，需要以 module.exports 导出接口，以 require 引入模块。

### 4、ES6 模块规范

ES6 模块规范是，在创建 JS 模块时，export 语句用于从模块中导出函数、对象或原始值，以便其他程序可以通过 import 语句使用它们。

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
