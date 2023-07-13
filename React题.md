## 什么是PureComponent？

React.PureComponent和React.Component完全相同，它只是为你处理了shouldComponentUpdate方法。当属性或者状态发生变化时，PureComponent将对属性和状态进行浅比较。

## 为什么不能直接更新状态？

如果你尝试直接修改状态，那么组件将不会重新渲染。正确的方法是调用setState方法。它调度组件状态对象的更新。当状态更改时，组件将重新渲染。

## 调用setState之后发生了什么？

+ React会将传入的参数对象与组件当前的状态对象合并产生新的state。
+ 生成新的虚拟DOM树。
+ 计算新旧树的差异，然后差异化更新。

setState的调用会引起4个生命周期钩子的执行：

+ shouldComponentUpdate
+ componentWillUpdate
+ render
+ componentDidUpdate

## React Hooks注意事项

+ 不要在循环语句，条件语句中调用hook，必须始终在React函数的顶层使用hook。这是因为React需要利用调用顺序来正确更新相应的状态，以及调用相应的钩子函数。一旦在循环或者条件语句中调用hook，容易导致调用顺序错乱。

## React事件机制

React并不是将事件绑定到了真实的DOM上，而是绑定到了document元素上，当事件发生并且冒泡到document时，React将事件内容封装并交给真正的处理函数去执行，这样不仅减少了内存的消耗，还能再组件销毁时统一移除事件。

