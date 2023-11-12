## for-in和for-of

for-in循环会遍历所有可枚举属性（包括它原型上的可枚举属性）

+ for-in循环主要用于遍历对象。for-of循环可以用来遍历数组。

+ for-in循环出的是键名key，for-of循环出的是键值value。
+ for-of不能遍历普通的对象，需要通过Object.keys()方法搭配使用。

## 深拷贝和浅拷贝

深拷贝：深拷贝是将一个对象完整的拷贝出来，新旧两个对象不会共享同一块内存，且修改其中一个对象的属性不会影响另一个对象的属性。

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

+ 箭头函数没有自己的this对象。箭头函数内部的this就是定义时上层作用域中的this对象。
+ 不可以用作构造函数，即不可以对箭头函数使用new命令。
+ 不可以使用arguments对象，该对象在箭头函数内不存在。可以使用rest参数代替。
+ 不能使用yield命令，因此箭头函数不能用作generator函数。

## Promise

所谓Promise，简单来说就是一个容器，里面保存着某个未来才会结束的事件的结果，这个事件通常是一个异步操作。

Promise特点：

+ 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending进行中，fulfilled已成功，rejected已失败。只有异步操作的结果可以决定当前是哪一种状态，任何操作都无法改变这个状态。
+ 一旦状态改变，就不会再次变化，任何时候都可以得到这个结果。
+ 缺点：首先无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。

resolve函数的作用是，将Promise对象的状态从未完成变为已成功，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去，由then函数接收。reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

catch方法的作用是用于指定发生错误时的回调函数。如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数，如果then方法指定的回调函数抛出错误，也会被catch方法捕获。

如果Promise的状态已经变成resolved，再抛出错误就是无效的，因为Promise的状态一定确定，就不能再改变了。

```javascript
const promise = new Promise((resolve) => {
  resolve('ok');
  throw new Error('error')
})
promise.then(() => {})
.catch(() => {})
```

Promise对象的错误具有冒泡性质，会一直向后传递，直到被捕获为止。

如果没有使用catch方法捕获错误，那么Promise抛出的错误不会传递到外层代码。

catch方法返回的还是一个Promise对象，因此后面还可以接着调用then方法。

## async/await

async函数的返回值是Promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先等待异步操作完成，再执行函数体内后面的语句。

aysnc函数内部return语句返回的值，会成为then方法回调函数的参数。

async函数内部抛出的错误，会导致返回的Promise对象状态为rejected。

async函数返回的Promise对象，必须等到内部所有await命令后面的Promise对象执行完，状态才会发生改变。

await命令后面是一个Promise对象，返回该对象的结果。如果不是Promise对象，就直接返回对应的值。

await命令后面的Promise对象如果变为rejected状态，则rejected参数会被catch捕获。

任何一个await命令后面的Promise对象变为rejected状态，那么整个async函数都会中断执行。

