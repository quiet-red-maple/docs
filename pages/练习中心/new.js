// new 是什么
// new 是用来创建一个用户定义的对象数据类型的实例或者具有构造函数内置对象的实例

function myNew(constructor, ...args) {
  const obj = {};
  Object.setPrototypeOf(obj, constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}