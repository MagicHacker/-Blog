## for-in和for-of

for-in循环会遍历所有可枚举属性（包括它原型上的可枚举属性）

+ for-in循环主要用于遍历对象。for-of循环可以用来遍历数组。

+ for-in循环出的是键名key，for-of循环出的是键值value。
+ for-of不能遍历普通的对象，需要通过Object.keys()方法搭配使用。

## 深拷贝和浅拷贝

深拷贝：深拷贝是将一个对象完整的拷贝出来，新旧对象不共享同一块内存，且修改新对象不会影响原来的对象。

JSON.parse(JSON.stringfy())利用JSON.stringfy()方法将对象序列化成json字符串，然后再用JSON.parse()放反序列化成对象，缺点无法处理函数和正则，undefined，拷贝后会造成属性丢失。

浅拷贝：浅拷贝是创建一个新的对象，这个对象有着原始对象属性的一份精确拷贝。如果是基本属性类型，拷贝出来的就是基本数据类型。如果是引用类型，拷贝的是一个引用，即内存地址，新旧两个对象共享一块内存，改变其中一个对象的数据，会影响另一个对象的数据。

Object.assign()，ES6的展开运算符。

## forEach如何跳出循环

forEach是不能通过break或者return跳出循环的。可以使用try-catch来跳出循环。

```javascript
function foo() {
  try {
    arr.forEach(() => {
      throw Error()
    })
  }catch (err) {}
}
```

## 箭头函数和普通函数的区别

+ 箭头函数自身没有this，它的this来源于父层函数的this，箭头函数的this在函数定义的时候就已经确定了。
+ 箭头函数无法作为构造函数使用，没有自身的prototype，也没有arguments。

