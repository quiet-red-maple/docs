### 泛型

```typescript
function add<T>(arg1: T, arg2: T): T {
	return arg1 + arg2
}

add<number>(1, 2)
add<string>('1', '2')
```

### 泛型接口

####  1、箭头函数形式

```typescript
let addFunc: <T>(arg1: T, arg2: T) => T

addFunc = add
```

#### 2、大括号形式

```typescript
let addFunc: {<T>(arg1: T, arg2: T): T}

addFunc = add

addFunc<number>(1,2)
```

#### 3、接口形式

```typescript
interface GenAdder {<T>(arg1: T, arg2: T): T}

let addFunc: GenAdder

addFunc = add

addFunc<number>(1,2)
addFunc<string>('1','2')
```

#### 4、提取T

```typescript
interface GenAdder<T> {(arg1: T, arg2: T): T}

let addFunc: GenAdder<string>

addFunc = add

addFunc('1','2')
```

### 泛型类

```typescript
class Adder<T> {
  add: (arg1:T, arg2: T) => T;
}

const adder = new Adder<number>();

adder.add = function add(arg1, arg2) {
  return arg1 + arg2
}
```

提取

```typescript
class Adder<T> {
  add: (arg1:T, arg2: T) => T;
}
function add(arg1, arg2) {
  return arg1 + arg2
}

const adder = new Adder<number>();

adder.add = add;

const adder2 = new Adder<string>();

adder2.add = add;

adder.add(1,2)

adder2.add('1','2')

```

### 泛型约束

#### 简易使用

```typescript
interface ILength {
  length: number
}

function getLength<T extends ILength>(arg: T): T {
  console.log(arg.length)
  return arg
}

getLength<string> ('xodfak')
```

#### 高级用法 **keyof**

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

// keyof
const people = { name: 'sdf', ge: 16 }

let keys: keyof typeof people // keys: "name" | "age"

getProperty(people, 'name')
```

### typescript 内置类型

#### 1、Partial<T> 所有属性标记为可选属性

将类型 T 的所有属性标记为可选属性

```typescript
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

使用场景：

```typescript
// 账号属性
interface AccountInfo {
    name: string 
    email: string 
    age: number 
    vip: 0|1 // 1 是vip ，0 是非vip
}

// 当我们需要渲染一个账号表格时，我们需要定义
const accountList: AccountInfo[] = []

// 但当我们需要查询过滤账号信息，需要通过表单，
// 但明显我们可能并不一定需要用到所有属性进行搜索，此时可以定义
const model: Partial<AccountInfo> = {
  name: '',
  vip: undefind
}
```

#### 2、Required<T> 所有属性标记为必选属性

与 Partial 相反，Required 将类型 T 的所有属性标记为必选属性

```typescript
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

#### 3、Readonly<T> 将所有属性标记为只读

将所有属性标记为 readonly, 即不能修改

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

#### 4、Pick<T, K>  过滤出指定属性 K

从 T 中过滤出属性 K

```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

使用场景:

```typescript
interface AccountInfo {
  name: string 
  email: string 
  age: number 
  vip?: 0|1 // 1 是vip ，0 是非vip
}

type CoreInfo = Pick<AccountInfo, 'name' | 'email'>
/* 
{ 
  name: string
  email: stirng
}
*/
```

#### 5、Record<K, T> 标记对象的 key value类型

标记对象的 key value类型

```typescript
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

使用场景:

```typescript
// 定义 学号(key)-账号信息(value) 的对象
const accountMap: Record<number, AccountInfo> = {
  10001: {
    name: 'xx',
    email: 'xxxxx',
    // ...
  }    
}
const user: Record<'name'|'email', string> = {
    name: '', 
    email: ''
}
// 复杂点的类型推断
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>

const names = { foo: "hello", bar: "world", baz: "bye" };
// 此处推断 K, T 值为 string , U 为 number
const lengths = mapObject(names, s => s.length);  // { foo: number, bar: number, baz: number }
```

#### 6、Exclude<T, U> 移除指定属性U

移除 T 中的 U 属性

```typescript
type Exclude<T, U> = T extends U ? never : T;
```

使用场景：

```typescript
// 'a' | 'd'
type A = Exclude<'a'|'b'|'c'|'d' ,'b'|'c'|'e' >  
```

#### 7、Omit<T, K> 过滤出剔除指定属性 K的属性

```typescript
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type NonCoreInfo = Omit<AccountInfo, 'name' | 'email'>
/*
{
  age: number 
  vip: 0|1,
}
*/
```

#### 8、Extract<T, U> 取 T，U两者的交集属性

`Exclude` 的反操作，取 T，U两者的交集属性

```typescript
type Extract<T, U> = T extends U ? T : never;
```

使用 demo：

```typescript
// 'b'|'c'
type A = Extract<'a'|'b'|'c'|'d' ,'b'|'c'|'e' >  
```

#### 9、NonNullable<T>排除类型 T 的 `null` | `undefined` 属性

排除类型 T 的 `null` | `undefined` 属性

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

使用 demo

```typescript
type A = string | number | undefined 
type B = NonNullable<A> // string | number

function f2<T extends string | undefined>(x: T, y: NonNullable<T>) {
    let s1: string = x;  // Error, x 可能为 undefined
    let s2: string = y;  // Ok
}
```

#### 10、Parameters<T>获取一个函数的所有参数类型

获取一个函数的所有参数类型

```typescript
// 此处使用 infer P 将参数定为待推断类型
// T 符合函数特征时，返回参数类型，否则返回 never
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

使用demo:

```typescript
interface IFunc {
  (person: IPerson, count: number): boolean
}

type P = Parameters<IFunc> // [IPerson, number]

const person01: P[0] = {
  // ...
}
```

另一种使用场景是，快速获取未知函数的参数类型

```typescript
import {somefun} from 'somelib'
// 从其他库导入的一个函数，获取其参数类型
type SomeFuncParams = Parameters<typeof somefun>

// 内置函数
// [any, number?, number?]
type FillParams = Parameters<typeof Array.prototype.fill>
```

#### 11、ConstructorParameters<T>获取一个类的构造函数参数

类似于 `Parameters<T>`, ConstructorParameters 获取一个类的构造函数参数

```typescript
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
```

使用 demo:

```typescript
// string | number | Date 
type DateConstrParams = ConstructorParameters<typeof Date>
```

#### 12、ReturnType<T>获取函数类型 T 的返回类型

获取函数类型 T 的返回类型

```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

使用方式和 `Parameters<T>` 类似，不再赘述

#### 13、InstanceType<T>获取一个类的返回类型

获取一个类的返回类型

```typescript
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
```

使用方式和 `ConstructorParameters<T>` 类似，不再赘述

#### 14、数组 转换 成 union

有时候需要

```typescript
const ALL_SUITS = ['hearts', 'diamonds', 'spades', 'clubs'] as const; // TS 3.4
type SuitTuple = typeof ALL_SUITS; // readonly ['hearts', 'diamonds', 'spades', 'clubs']
type Suit = SuitTuple[number];  // union type : 'hearts' | 'diamonds' | 'spades' | 'clubs'
```

#### 15、根据 enum 生成 union

- enum 的 key 值 union

  ```typescript
  enum Weekday {
    Mon = 1
    Tue = 2
    Wed = 3
  }
  type WeekdayName = keyof typeof Weekday // 'Mon' | 'Tue' | 'Wed'
  ```

- enum 无法实现value-union , 但可以 object 的 value 值 union

  ```typescript
  const lit = <V extends keyof any>(v: V) => v;
  const Weekday = {
    MONDAY: lit(1),
    TUESDAY: lit(2),
    WEDNESDAY: lit(3)
  }
  type Weekday = (typeof Weekday)[keyof typeof Weekday] // 1|2|3
  ```

#### 16、PartialRecord

前面我们讲到了 Record 类型，我们会常用到

```typescript
interface Model {
    name: string
    email: string
    id: number
    age: number
}

// 定义表单的校验规则
const validateRules: Record<keyof Model, Validator> = {
    name: {required: true, trigger: `blur`},
    id: {required: true, trigger: `blur`},
    email: {required: true, message: `...`},
    // error: Property age is missing in type...
}
```

这里出现了一个问题，`validateRules` 的 key 值必须和 `Model` 全部匹配，缺一不可，但实际上我们的表单可能只有其中的一两项，这时候我们就需要：

```typescript
type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

const validateRules: PartialRecord<keyof Model, Validator> = {
   name: {required: true, trigger: `blur`} 
}
```

这个例子组合使用了 `typescript` 内置的 类型别名 `Partial` 和 `Partial`。

#### 17、Unpacked

解压抽离关键类型

```typescript
type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T;

type T0 = Unpacked<string>;  // string
type T1 = Unpacked<string[]>;  // string
type T2 = Unpacked<() => string>;  // string
type T3 = Unpacked<Promise<string>>;  // string
type T4 = Unpacked<Promise<string>[]>;  // Promise<string>
type T5 = Unpacked<Unpacked<Promise<string>[]>>;  // string
```

#### 18、Weaken

使用 `typescript` 有时候需要重写一个库提供的 interface 的某个属性，但是重写 `interface` 有可能会导致冲突：

```typescript
interface Test {
  name: string
  say(word: string): string
}

interface Test2  extends Test{
  name: Test['name'] | number
}
// error: Type 'string | number' is not assignable to type 'string'.
```

那么可以通过一些 type 来曲线救国实现我们的需求：

```typescript
// 原理是，将 类型 T 的所有 K 属性置为 any，
// 然后自定义 K 属性的类型，
// 由于任何类型都可以赋予 any，所以不会产生冲突
type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};


interface Test2  extends Weaken<Test, 'name'>{
  name: Test['name'] | number
}
// ok
```