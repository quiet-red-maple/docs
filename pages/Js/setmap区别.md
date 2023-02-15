- Set 和 Map 主要的应用场景在于 数据重组 和 数据储存。
- Set 是一种叫做集合的数据结构，Map 是一种叫做字典的数据结构。

集合 与 字典 的区别：

- 共同点：集合、字典 可以储存不重复的值
- 不同点：集合 是以 [value, value]的形式储存元素，字典 是以 [key, value] 的形式储存

## **集合（Set）**：

ES6 新增的一种新的数据结构，类似于数组，成员唯一（内部元素没有重复的值）。且使用键对数据排序即顺序存储（经评论区大佬提醒）。

Set 本身是一种构造函数，用来生成 Set 数据结构。

Set 对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用。

```js
 ：
const s = new Set()
[1, 2, 3, 4, 3, 2, 1].forEach(x => s.add(x))
for (let i of s) {
    console.log(i)	// 1 2 3 4
}
// 去重数组的重复对象
let arr = [1, 2, 3, 2, 1, 1]
[... new Set(arr)]	// [1, 2, 3]
```

注意：向 Set 加入值的时候，不会发生类型转换，所以`5`和`"5"`是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于**精确相等**运算符（`===`），主要的区别是**`NaN`等于自身，而精确相等运算符认为`NaN`不等于自身。**

```js
 ：
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}

let set1 = new Set()
set1.add(5)
set1.add('5')
console.log([...set1])	// [5, "5"]
```

操作方法：

- add(value)：新增，相当于 array里的push。
- delete(value)：存在即删除集合中value。
- has(value)：判断集合中是否存在 value。
- clear()：清空集合。

便利方法：遍历方法（遍历顺序为插入顺序）

- keys()：返回一个包含集合中所有键的迭代器。
- values()：返回一个包含集合中所有值得迭代器。
- entries()：返回一个包含Set对象中所有元素得键值对迭代器。
- forEach(callbackFn, thisArg)：用于对集合成员执行callbackFn操作，如果提供了 thisArg 参数，回调中的this会是这个参数，**没有返回值。**

## **WeakSet：**

WeakSet 对象允许你将**弱引用对象**储存在一个集合中。

WeakSet 与 Set 的区别：

- WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以。
- WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉（不考虑该对象还存在于 WeakSet 中），所以，WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了（被垃圾回收了），WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），也没有办法拿到它包含的所有元素。

方法：

- add(value)：在WeakSet 对象中添加一个元素value。
- has(value)：判断 WeakSet 对象中是否包含value。
- delete(value)：删除元素 value。

## 字典（Map）：

是一组键值对的结构，具有极快的查找速度。

```js
 ：
const m = new Map()
const o = {p: 'haha'}
m.set(o, 'content')
m.get(o)	// content

m.has(o)	// true
m.delete(o)	// true
m.has(o)	// false
```

操作方法：

- set(key, value)：向字典中添加新元素。
- get(key)：通过键查找特定的数值并返回。
- has(key)：判断字典中是否存在键key。
- delete(key)：通过键 key 从字典中移除对应的数据。
- clear()：将这个字典中的所有元素删除。

遍历方法：

- Keys()：将字典中包含的所有键名以迭代器形式返回。
- values()：将字典中包含的所有数值以迭代器形式返回。
- entries()：返回所有成员的迭代器。
- forEach()：遍历字典的所有成员。

## WeakMap：

WeakMap 对象是一组键值对的集合，其中的**键是弱引用对象，而值可以是任意**。

**注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。**

WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的key则变成无效的），所以，WeakMap 的 key 是不可枚举的。

方法：

- has(key)：判断是否有 key 关联对象。
- get(key)：返回key关联对象（没有则则返回 undefined）。
- set(key)：设置一组key关联对象。
- delete(key)：移除 key 的关联对象。

## 总结**：**

Set：

- 成员唯一、无序且不重复。
- [value, value]，键值与键名是一致的（或者说只有键值，没有键名）。
- 可以遍历，方法有：add、delete、has。

WeakSet：

- 成员都是对象。
- 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏。
- 不能遍历，方法有add、delete、has。

Map：

- 本质上是键值对的集合，类似集合。
- 可以遍历，方法很多可以跟各种数据格式转换。

WeakMap：

- 只接受对象作为键名（null除外），不接受其他类型的值作为键名。
- 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的。
- 不能遍历，方法有get、set、has、delete。

## 扩展：

#### 理解强引用

在讲弱引用之前，我们先来说下强引用。强引用就是将对象保留在内存中的引用。例如：

```js
let cat = { name: "Kitty" };
const pets = [cat];

cat = null;
console.log(pets); // [{ name: "Kitty" }]
```

通过将变量 `cat` 创建为对象，并把这个对象放入一个数组 `pets` 中，然后通过将它的值设置为 `null` 来删除其对原始对象的引用。

尽管我们再也无法访问 `cat` 变量，但由于在 `pets` 数组和这个对象之间存在**强引用**关系，因此这个对象其实仍保留在内存中，并且可以通过 `pets[0]` 访问到它。 换句话说，**强引用**可以防止垃圾回收从内存中删除对象。

#### 理解弱引用

简单地说，**弱引用**是对对象的引用，如果它还是对内存中对象的唯一引用，就能顺利地进行垃圾回收。相反，一般强引用都会防止垃圾回收。可能还有些不太理解，让我们先来看个例子，我们将试着把刚才的代码中的强引用转换为弱引用。我们暂时先不展开讲 `WeakMap` ，这将在后面详细讨论，先就这个例子我们来观察下弱引用的行为。

```js
let pets = new WeakMap();
let cat = { name: "Kitty" };
pets.set(cat, "Kitty");
console.log(pets); // WeakMap {{…} => 'Kitty'}
cat = null;

// 等待垃圾回收后
console.log(pets); // WeakMap{}
```

通过利用 `WeakMap` 及其附带的弱引用，我们可以看到两种类型的引用之间的差异。虽然对原始 `cat` 对象的强引用仍然存在，但 `cat` 对象仍然存在于 `WeakMap` 中，我们可以毫无问题地访问它。

但是，当我们通过将 `cat` 变量重新赋值 null 来覆盖对原始 `cat` 对象的引用时，由于内存中对原始对象的唯一引用是来自我们创建的 `WeakMap` 的弱引用，所以它不会阻止垃圾回收的发生。这意味着当 JavaScript 引擎再次运行垃圾回收过程时，`cat` 对象将从内存和我们分配给它的 `WeakMap` 中删除。

**因此这里的关键区就别在于**，强引用可以防止对象进行垃圾回收，而弱引用则不会。

**默认情况下**，JavaScript 对其所有引用使用**强引用**，使用弱引用的唯一方法是使用 **WeakMap** 或 **WeakSet**。



## 注意：

javaScript 的 WeakMap 并**不是真正意义上的弱引用**：实际上，只要键仍然存活，它就强引用其内容。WeakMap 仅在键被垃圾回收之后，才弱引用它的内容。这种关系更准确地称为[ephemeron](https://en.wikipedia.org/wiki/Ephemeron)。

WeakRef 是一个更高级的 API，它提供了**真正的弱引用**

