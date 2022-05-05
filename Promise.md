Promise是一个对象，里面保存着未来才会结束的某个事件的结果（一般是异步操作）。通过promise对象可以获取异步操作的消息和结果。
## 两个特点
+ Promise对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中），fulfilled（已成功），rejected（已失败）。只有异步操作的结果，才能决定当前是哪一种状态。其余任何操作都无法改变这个状态。
+ 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变只有两种可能：从pending到fulfilled或者从pending到rejected。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调地狱。
## 缺点
+ 无法取消Promise，一旦新建，它就会立即执行，无法中途取消。
+ 如果不设置回调函数，Promise内部抛出的错误，不会传递到外部。
## 基本用法
Promise对象是一个构造函数，用来生成promise实例。
```javascript
const promise = new Promise((resolve, reject) => {
	if (异步操作成功) {
		resolve(value);
	} else {
		reject(error);
	}
})
```
Promise构造函数接收一个函数作为参数，该函数的两个参数分别为resolve和reject。resolve函数的作用是：在异步操作执行成功时调用，将Promise对象的状态变为resolved，并将异步操作的结果作为参数传递出去。reject函数的作用：在异步操作失败时调用，将Promise对象的状态变为rejected，并将错误信息作为参数传递出去。
Promise实例生成之后，可以用then方法分别指定resolved和rejected的回调函数。
```
promise.then((value) => {}, (error) => {})
```
then方法接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时被调用，第二个回调函数是Promise对象的状态变为rejected时调用。
```javascript
const timeout = (ms) => {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms, 'done');
	})
}
timeout(100).then((value) => {
	console.log(value);
})
```
Promise新建后就会立即执行。
```javascript
const promise = new Promise((resolve, reject) => {
	console.log('promise');
	resolve();
})
promise.then(() => {
	console.log('resolved');
})
console.log('Hi!');
// promise ,Hi, resolved
```
## Promise.prototype.then()
Promise实例具有then方法，也就是说then方法是定义在Promise.prototype上的。它的作用是为Promise实例对象添加状态改变时的回调函数。
then方法返回的是一个新的Promise实例，因此then可以采用链式写法。采用链式的then方法，可以指定一组按照次序调用的回调函数。
## Promise.prototype.catch()
catch方法用于指定错误发生时的回调函数。如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数，处理这个错误。另外，then方法指定的回调函数，运行时抛出错误，也会被catch方法捕获，所以一般catch方法放在最后面。
**catch方法返回的是一个新的Promise实例，这个新的Promise实例的状态为fulfilled。**
如果Promise状态已经变成resolved，再抛出错误就是无效的。因为Promise的状态一旦确定就不会再改变。
```
const promise = new Promise((resolve, reject) => {
	resolve();
	throw new Error('test');
})
promise.then(() => {}).catch((error) => {});
```
Promise对象的错误具有冒泡性质，会一直向后传递，直到被捕获为止。
如果没有使用catch方法指定错误处理的回调函数，那么Promise对象抛出的错误不会传递到外层代码，即不会有任何反应。
Promise对象内部的错误不会影响到Promise外部的代码，即Promise会吃掉错误。
## Promise.call()
Promise.call()方法用于将多个Promise实例，包装成一个新的Promise实例。
```javascript
const p = Promise.call([p1,p2,p3]);
```
Promise.call方法接受一个数组作为参数，p1, p2, p3都是Promise的实例。如果不是，Promise.call方法就会先调用Promise.resolve方法，将参数转为Promise的实例。只有p1, p2, p3的状态都确定了，才会调用p的回调函数。
p的状态由p1, p2, p3决定，分为两种情况：
+ 只有p1, p2, p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1, p2, p3的返回值组成一个数组，传递给p的回调函数。
+ 只要p1, p2, p3中有一个状态变为rejected，p的状态就变成rejected，此时第一个被rejected的实例的返回值，会传递给p的回调函数。
## Promise.race()
Promise.race()方法将多个Promise实例，包装成一个新的Promise实例。
```javascript
const p = Promise.race([p1, p2, p3]);
```
只要p1, p2, p3中有一个实例的状态改变了，p的状态就跟着改变了。那个率先改变状态的Promise实例的返回值，就会传递给p的回调函数。
本质上Promise对象是一个函数返回的对象，可以在它上面绑定回调函数，这样就不需要在一开始就把回调函数作为参数传入这个函数了。比如setTimeout就是将回调函数作为参数传递。
## 回调地狱的问题
+ 代码臃肿。
+ 可读性差。
+ 代码耦合度高，可维护性差。
+ 代码复用性差。
+ 容易产生bug。
+ 只能在回调里处理异常。








