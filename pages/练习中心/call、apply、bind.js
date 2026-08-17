// 实现 call、apply、bind

Function.prototype.myCall = function (contenxt = window, ...args) {
  if (this === Function.prototype) {
    return undefined;
  }

  const fn = Symbol();
  contenxt[fn] = this;
  const result = contenxt[fn](...args);
  delete contenxt[fn];
  return result;
}

Function.prototype.myApply = function (contenxt = window, args) {
  if (this === Function.prototype) {
    return undefined;
  }

  const fn = Symbol();
  contenxt[fn] = this;
  let result;
  if (Array.isArray(args)) {
    result = contenxt[fn](...args);
  } else {
    result = contenxt[fn]();
  }
  delete contenxt[fn];
  return result;
}

Function.prototype.myBind = function (context = window, ...args1) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }

  const self = this;

  const fToBind = function(...args2) {
    const isNew = new.target !== fToBind;
    return self.apply(isNew ? this : context, [...args1, ...args2])
  }

  if (self.prototype) {
    fToBind.prototype = Object.create(self.prototype);
    fToBind.prototype.constructor = fToBind;
  }
}

const Person = {
  color: 'red',
}

const sayName = function (name, age) {
  console.log(name);
  console.log(age);
  console.log(this.color);
}

sayName.myCall(Person, 'Alice', 25); // Alice 25 red
sayName.myApply(Person, ['Alice', 25]); // Alice 25 red
