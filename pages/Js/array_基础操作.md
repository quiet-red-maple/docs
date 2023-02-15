### 一、生成数组

1. 从string生成数组

   ```js
   Array.from('foo');
   // ["f", "o", "o"]
   ```

2. 从set生成数组

   ```js
   const set = new Set(['foo', 'bar', 'baz', 'foo']);
   Array.from(set);
   ```

3. 从map生成数组

   ```js
   const map = new Map([[1, 2], [2, 4], [4, 8]]);
   Array.from(map);
   // [[1, 2], [2, 4], [4, 8]]
   
   const mapper = new Map([['1', 'a'], ['2', 'b']]);
   Array.from(mapper.values());
   // ['a', 'b'];
   
   Array.from(mapper.keys());
   // ['1', '2'];
   ```

4. 从类数组对象（arguments）生成数组

   ```js
   function f() {
     return Array.from(arguments);
   }
   
   f(1, 2, 3);
   
   // [ 1, 2, 3 ]
   ```

5. 使用箭头函数

   ```js
   Array.from([1, 2, 3], x => x + x);
   // [2, 4, 6]
   
   Array.from({length: 5}, (v, i) => i);
   // [0, 1, 2, 3, 4]
   ```

6. Array.of()

   ```js
   Array.of(7);       // [7]
   Array.of(1, 2, 3); // [1, 2, 3]
   
   Array(7);          // [ , , , , , , ]
   Array(1, 2, 3);    // [1, 2, 3]
   ```

二、判断是否为数组

1. isArray方法

   ```js
   Array.isArray([]);
   Array.isArray([1]);
   Array.isArray(new Array());
   Array.isArray(new Array('a', 'b', 'c', 'd'))
   ```

2. Instanceof

   ```js
   const a = [];
   const b = {};
   console.log(a instanceof Array);//true
   console.log(a instanceof Object);//true,在数组的原型链上也能找到Object构造函数
   console.log(b instanceof Array);//false
   ```

3. constructor (constructor属性是可以改写的，如果一不小心修改了constructor属性的话，那么使用这种方法就无法判断出数组)

   ```js
   const b = [];
   console.log(b.constructor == Array);//true
   //定义一个数组
   const a = [];
   //作死将constructor属性改成了别的
   a.contrtuctor = Object;
   console.log(a.constructor == Array);//false (哭脸)
   console.log(a.constructor == Object);//true (哭脸)
   console.log(a instanceof Array);//true (instanceof火眼金睛)
   ```

4. Object的toString方法

   ```js
   const a = ['Hello','Howard'];
   const b = {0:'Hello',1:'Howard'};
   const c = 'Hello Howard';
   Object.prototype.toString.call(a);//"[object Array]"
   Object.prototype.toString.call(b);//"[object Object]"
   Object.prototype.toString.call(c);//"[object String]"
   
   Object.prototype.toString.apply(a);//"[object Array]"
   Object.prototype.toString.apply(b);//"[object Object]"
   Object.prototype.toString.apply(c);//"[object String]"
   ```

   

### 二、数组实例

#### 	1、会改变调用它们的对象自身的值的方法

​	  1.  **copyWithin() **方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

```js
const array1 = ['a', 'b', 'c', 'd', 'e'];

console.log(array1.copyWithin(0, 3, 4));
// ["d", "b", "c", "d", "e"]

console.log(array1)
// ["d", "b", "c", "d", "e"]

[1, 2, 3, 4, 5].copyWithin(-2)
// [1, 2, 3, 1, 2]

[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(-2, -3, -1)
// [1, 2, 3, 3, 4]
```

2. **fill()** 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

```js
const array1 = [1, 2, 3, 4];

console.log(array1.fill(0, 2, 4));
// [1, 2, 0, 0]
console.log(array1);
// [1, 2, 0, 0]
```

3. **pop()**方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度

```js
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.pop());
// tomato
console.log(plants);
// ["broccoli", "cauliflower", "cabbage", "kale"]
```

4. **push()** 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

```js
const animals = ['pigs', 'goats', 'sheep'];

const count = animals.push('cows');
console.log(count);
// 4
console.log(animals);
// ["pigs", "goats", "sheep", "cows"]
```

5. **reverse() **方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

```js
const array1 = ['one', 'two', 'three'];
const reversed = array1.reverse();
console.log(reversed);
// ["three", "two", "one"]
console.log(array1);
// ["three", "two", "one"]
```

6. **shift()** 方法从数组中删除**第一个**元素，并返回该元素的值。此方法更改数组的长度。

```js
const array1 = [1, 2, 3];

const firstElement = array1.shift();
console.log(firstElement);
// 1
console.log(array1);
// [2, 3]
```

7. **sort()** 方法用[原地算法](https://en.wikipedia.org/wiki/In-place_algorithm)对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

```js
const months = ['March', 'Jan', 'Feb', 'Dec'];
console.log(months.sort());
// ["Dec", "Feb", "Jan", "March"]
console.log(months);
// ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// [1, 100000, 21, 30, 4]
```

8. **splice()** 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

```js
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// ["Jan", "Feb", "March", "April", "June"]
months.splice(4, 1, 'May');
// ["Jan", "Feb", "March", "April", "May"]
```

9. **unshift()** 方法将一个或多个元素添加到数组的**开头**，并返回该数组的**新长度(该**方法修改原有数组**)**。

```js
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// 5

console.log(array1);
// [4, 5, 1, 2, 3]
```

#### 2、不会改变调用它们的对象的值的方法

1. **concat()** 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

   ```js
   const array1 = ['a', 'b', 'c'];
   const array2 = ['d', 'e', 'f'];
   const array3 = array1.concat(array2);
   
   console.log(array3);
   // ["a", "b", "c", "d", "e", "f"]
   ```

2. **includes()** 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

   ```js
   const array1 = [1, 2, 3];
   
   console.log(array1.includes(2));
   // true
   
   const pets = ['cat', 'dog', 'bat'];
   
   console.log(pets.includes('cat'));
   // true
   
   console.log(pets.includes('at'));
   // false
   
   [1, 2, 3].includes(2);     // true
   [1, 2, 3].includes(4);     // false
   [1, 2, 3].includes(3, 3);  // false
   [1, 2, 3].includes(3, -1); // true
   [1, 2, NaN].includes(NaN); // true
   ```

3. **join()** 方法将一个数组（或一个[类数组对象](https://developer.mozilla.org/zh-CN//docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

   ```js
   const elements = ['Fire', 'Air', 'Water'];
   
   console.log(elements.join());
   // "Fire,Air,Water"
   
   console.log(elements.join(''));
   // "FireAirWater"
   
   console.log(elements.join('-'));
   // "Fire-Air-Water"
   ```

   4. **slice()**  方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。

   ```js
   const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
   
   console.log(animals.slice(2));
   // ["camel", "duck", "elephant"]
   
   console.log(animals.slice(2, 4));
   // ["camel", "duck"]
   
   console.log(animals.slice(1, 5));
   // ["bison", "camel", "duck", "elephant"]
   ```

   5. **toString()** 返回一个字符串，表示指定的数组及其元素。

   ```js
   const array1 = [1, 2, 'a', '1a'];
   
   console.log(array1.toString());
   // "1,2,a,1a"
   ```

   6. **toLocaleString()** 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 `toLocaleString` 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

   ```js
   const array1 = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
   const localeString = array1.toLocaleString('en', { timeZone: 'UTC' });
   
   console.log(localeString);
   // "1,a,12/21/1997, 2:12:00 PM",
   ```

   7. **indexOf()** 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

   ```js
   const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
   
   console.log(beasts.indexOf('bison'));
   // 1
   console.log(beasts.indexOf('bison', 2));
   // 4
   console.log(beasts.indexOf('giraffe'));
   // -1
   
   ```

   8. **lastIndexOf()** 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 `fromIndex` 处开始。

   ```js
   const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
   
   console.log(animals.lastIndexOf('Dodo'));
   // 3
   
   console.log(animals.lastIndexOf('Tiger'));
   // 1
   ```

#### 3、迭代方法

​		1. **forEach()** 方法对数组的每个元素执行一次给定的函数。

```js
const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));

// "a"
// "b"
// "c"
```

注： 除了抛出异常以外，没有办法中止或跳出 `forEach()` 循环。如果你需要中止或跳出循环，`forEach()` 方法不是应当使用的工具。

​	2. **entries()** 方法返回一个新的**Array Iterator**对象，该对象包含数组中每个索引的键/值对。

```js
const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
// [0, "a"]

console.log(iterator1.next().value);
// [1, "b"]
```

3. **every()** 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

```js
[12, 5, 8, 130, 44].every(x => x >= 10); // false
[12, 54, 18, 130, 44].every(x => x >= 10); // true
```

**注意**：若收到一个空数组，此方法在一切情况下都会返回 `true`。

4. **some()** 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

```js
const array = [1, 2, 3, 4, 5];

const even = (element) => element % 2 === 0;

console.log(array.some(even));
// true
```

**注意：**如果用一个空数组进行测试，在任何情况下它返回的都是`false`。

5. **filter()** 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 

```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// ["exuberant", "destruction", "present"]
```

6. **find()**  方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

```js
const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found); // 12
```

7. **findIndex()** 方法返回数组中满足提供的测试函数的第一个元素的**索引**。若没有找到对应元素则返回-1。

```js
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// 3
```

8. **keys()**  方法返回一个包含数组中每个索引键的`Array Iterator`对象。

```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key);
}

// 0
// 1
// 2

var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]
```

9. **map()** 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

```js
const array1 = [1, 4, 9, 16];

const map1 = array1.map(x => x * 2);

console.log(map1);
//[2, 8, 18, 32]
```

10. **reduce()** 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

console.log(array1.reduce(reducer));
// 10

console.log(array1.reduce(reducer, 5));
// expected output: 15
```

11. **reduceRight()** 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。

```js
const array1 = [[0, 1], [2, 3], [4, 5]].reduceRight(
  (accumulator, currentValue) => accumulator.concat(currentValue)
);

console.log(array1);
// [4, 5, 2, 3, 0, 1]
```

12. **values()** 方法返回一个新的 **`Array Iterator`** 对象，该对象包含数组每个索引的值

```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.values();

for (const value of iterator) {
  console.log(value);
}

// "a"
// "b"
// "c"
```

13. **@@iterator** 属性和 Array.prototype.values()属性的初始值是同一个函数对象。

```js
var arr = ['a', 'b', 'c', 'd', 'e'];
var eArr = arr[Symbol.iterator]();
for (let letter of eArr) {
  console.log(letter);
}
```

