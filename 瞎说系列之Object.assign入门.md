## 瞎说系列之Object.assign入门

### 前言

  过去的一个多月新接手了一个公司的老项目，在实现新需求的同时还需要对有些地方进行重构，故而导致了没时间更新文章。最近趁着周末更新一篇关于Object.assign使用的文章。

### 简介

  Object.assign()方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象，它将返回目标对象。这里有两点需要注意：1、该方法复制的是可枚举的属性的值，不可枚举的属性不会处理。2、它返回的是一个对象。

### 语法

```javascript
Object.assign(target,...sources)
```

### 基本用法

#### 合并对象

```javascript
const target = { a: 1 }
const source1 = { b: 2 }
const source2 = { c: 3 }
Object.assign(target, source1, source2)
console.log(target)
// {a: 1, b: 2, c: 3}
```

<span style="color:red;">注意：</span>如果目标对象与源对象的属性具有相同的键，或者多个源对象的属性具有相同的键，则后面对象的属性会覆盖前面对象的属性。

```javascript
const target = { a: 1, b: 1 }
const source1 = { b: 2, c: 2 }
const source2 = { c: 3 }
Object.assign(target, source1, source2)
console.log(target)
// {a: 1, b: 2, c: 3}
```

如果只传入了一个参数，则该方法会直接返回该参数。

```javascript
const target = { a: 1 }
Object.assign(target)
console.log(target)
// {a: 1}
console.log(Object.assign(target) === target)
// true
```

如果传入的参数不是对象，原始类型会被包装为对象。

```javascript
const target = Object.assign(1)
console.log(target)
// Number {1}
typeof target
// "object"
```

null和undefined无法被转为对象，所以如果把它们两个作为目标对象则会报错。

```javascript
const target = Object.assign(null)
const tar = Object.assign(undefined)
// Cannot convert undefined or null to object
```

如果null和undefined作为源对象，则不会报错，因为基本数据类型被包装，null和undefined会被忽略。

```javascript
const target = Object.assign({a:1}, null)
const tar = Object.assign({a:1}, undefined)
// {a:1}
const target1 = Object.assign(1, null)
// Number {1}
```

如果null和undefined作为源对象中的属性值，则它们不会被忽略

```javascript
const target = Object.assign({ a: 1 }, { b: null }, { c: undefined })
console.log(target)
// {a: 1, b: null, c: undefined}
```

#### 拷贝

复制一个对象

```javascript
const target = Object.assign({}, { a: 1 })
console.log(target)
// {a: 1}
```

拷贝symbol类型的属性

```javascript
const target = Object.assign({}, { a: 1 }, { [Symbol('foo')]: 2 })
console.log(target)
// {a: 1, Symbol(foo): 2}
```

拷贝的属性是有限制的，继承属性和不可枚举属性无法被拷贝。

```javascript
const obj = Object.defineProperty({}, 'a', {
  enumerable: false,
  value: 1
})
console.log(obj)
// {a: 1}
const target = Object.assign({b: 2}, obj)
console.log(target)
// {b: 2}
```

现在把a属性变成可枚举的属性。

```javascript
const obj = Object.defineProperty({}, 'a', {
  enumerable: true,
  value: 1
})
console.log(obj)
// {a: 1}
const target = Object.assign({b: 2}, obj)
console.log(target)
// {b: 2, a: 1}
```

接下来再看看基本数据类型的可枚举性。

<span style="color:red;">注意：</span>首先基本数据类型会被包装成对象，null和undefined会被忽略。其次只有字符串的包装对象才可能有自身可枚举属性。

```javascript
const v1 = "abc"
const v2 = true
const v3 = 10
const v4 = Symbol("foo")
const target = Object.assign({}, v1, null, v2, undefined, v3, v4)
console.log(target)
// {0: "a", 1: "b", 2: "c"}
```

拷贝一个数组。该方法会把数组视为对象，同时在拷贝的时候通过位置来进行覆盖。

```javascript
const target = Object.assign([1,2,3],[4,5])
console.log(target)
// [4, 5, 3]
```

#### 深浅拷贝

Object.assgin()实现的是浅拷贝。如果源对象中的某个属性的值也是对象，那么目标对象拷贝得到的是这个对象的引用，一旦这个对象发生改变，那么拷贝后的目标对象也做相应的改变。

```javascript
let obj1 = { a: 0 , b: { c: 0}}
let obj2 = Object.assign({}, obj1)
console.log(JSON.stringify(obj2))
// {"a":0,"b":{"c":0}}
obj1.a = 1
console.log(JSON.stringify(obj1))
// {"a":1,"b":{"c":0}}
console.log(JSON.stringify(obj2))
// {"a":0,"b":{"c":0}}
obj2.a = 2
console.log(JSON.stringify(obj1))
// {"a":1,"b":{"c":0}}
console.log(JSON.stringify(obj2))
// {"a":2,"b":{"c":0}}
obj1.b.c = 3
console.log(JSON.stringify(obj1))
// {"a":1,"b":{"c":3}}
console.log(JSON.stringify(obj2))
// {"a":0,"b":{"c":3}}
```

至于深浅拷贝的区别以及如何实现的问题，会在之后的文章中详细说明。

### 常见用途

#### 为对象添加属性

```javascript
class Person {
  constructor(x, y) {
    Object.assign(this, {x, y})
  }
}
```

#### 为对象添加方法

```javascript
Object.assign(someClass.prototype, {
  foo(x, y){
    ....
  }
})
```

#### 合并多个对象

```javascript
Object.assign(target, ...sources)
```

#### 复制一个对象

```
const target = Object.assign({}, { a: 1 })
console.log(target)
// {a: 1}
```

#### 为属性指定默认值

```javascript
const DEFAULT_VALUE = {
  name: 'Joe',
  age: '27'
}
function foo(options) {
  return Object.assign({}, DEFAULT_VALUE, options)
}
```

### 浏览器兼容性

![image-20190324113944044](../../Library/Application Support/typora-user-images/image-20190324113944044.png)

### 最后

感谢各位能够耐心的读完，如有错误欢迎指正，让我们一起进步。后续的内容，敬请期待。

