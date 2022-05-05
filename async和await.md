async函数的改进：
+ 内置执行器。async函数自带执行器。
+ 更好的语义。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
+ 更广的适用性。await命令后面可以是Promise对象或者原始数据类型的值（这个值会立即转成状态为resolved的Promise对象）。
+ 返回值是Promise。
## 基本用法
async函数返回一个Promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await命令就会先返回，等到异步操作完成，再接着执行函数体后面的语句。
```JavaScript
async function getPriceByName(name) {
	const symbol = await getBYSmbol(name);
	const stockPrice = await getStockPrice(symbol);
	return stockPrice;
}
getPriceByName('1').then((value) => {})
```
async函数返回一个Promise对象，async函数内部return语句返回的值，会成为then方法回调函数的参数。
async函数内部抛出的错误，会导致其返回的Promise对象的状态为rejected。抛出的错误对象会被catch方法捕获到。
## Promise对象的状态变化
async函数返回的Promise对象，必须等到内部所有await命令后面的Promise对象执行完，才会发生状态改变。除非遇到return语句或者抛出错误。即只有async函数内部的异步操作全部执行完，才会执行then方法指定的回调函数。
## await命令
正常情况下，await命令后面是一个Promise对象，返回该对象的结果。如果不是Promise对象，就直接返回对应的值。
另一种情况是，await命令后面是一个thenable对象（即定义了then方法的对象），那么await命令会将其等同于Promise对象。
任何一个await命令后面的Promise对象变为rejected状态，那么整个async函数都会中断执行。所以一般将await语句放到try/catch当中执行。
