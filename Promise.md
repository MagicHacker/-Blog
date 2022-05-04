Promise是一个对象，里面保存着未来才会结束的某个事件的结果（一般是异步操作）。通过promise对象可以获取异步操作的消息和结果。
## 两个特点
+ Promise对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中），fulfilled（已成功），rejected（已失败）。只有异步操作的结果，才能决定当前是哪一种状态。其余任何操作都无法改变这个状态。
+ 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变只有两种可能：从pending到fulfilled或者从pending到rejected。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调地狱。
## 缺点
+ 无法取消Promise，一旦新建，它就会立即执行，无法中途取消。
+ 如果不设置回调函数，Promise内部抛出的错误，不会反馈到外部。
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
