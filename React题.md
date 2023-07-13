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

不要在循环语句，条件语句中调用hook，必须始终在React函数的顶层使用hook。这是因为React需要利用调用顺序来正确更新相应的状态，以及调用相应的钩子函数。一旦在循环或者条件语句中调用hook，容易导致调用顺序错乱。

## React事件机制

React使用合成事件，是对浏览器原生事件的封装，目的是抹平浏览器之间的差异。

React并不是将事件绑定到了真实的DOM上，而是绑定到了document元素上，当事件发生并且冒泡到document时，React将事件内容封装并交给真正的处理函数去执行，这样不仅减少了内存的消耗，还能再组件销毁时统一移除事件。

## JSX和JS的区别

JSX是React的语法糖，它允许你在HTML标签中写JS，它不能被浏览器识别，需要通过webpack，babel之类的编译工具转换为JS才能执行。

区别：

+ JS可以被直接打包编译，不需要额外转换。JSX必须通过babel编译转换。
+ JSX是js的语法扩展，允许在HTML中写JS，而JS是原生写法，需要在HTML中通过script标签引入。

## React生命周期

React只有类组件才有生命周期函数，因为只有类组件才能创建组件实例。

组件的生命周期分为挂载，更新，卸载等阶段。

挂载阶段：

+ constructor进行state和props的初始化。
+ render方法进行渲染。
+ componentDidMount渲染完成。

更新阶段：

当组件的state和props变化时会触发更新。

+ shouldComponentUpdate返回一个布尔值，默认返回true。
+ render方法。
+ componentDidUpdate在组件完成更新后调用。

## fiber架构

在React16.0以前，React的更新是通过树的深度优先遍历完成的，遍历是不能中断的，当树的层级过深，就会导致页面渲染速度变慢的问题。fiber是一个链表结构，随时可中断。fiber实现了增量渲染，把一个渲染任务拆分成多个渲染子任务，而后将其分散到多个帧里。