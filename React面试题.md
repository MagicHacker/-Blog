## React事件机制
```html
<div onClick={() => this.handleClick()}></div>
```
React并不是将事件绑定到了节点自身，而是在document元素上监听了所有的事件，当事件被触发并且冒泡到document元素时，React将事件内容封装并交给真正的处理函数执行。这样做的好处是能在组件挂载和销毁时统一订阅和移除事件。
另外冒泡到document的事件也不是浏览器原生的事件，而是React自己实现的合成事件。合成事件的好处是抹平了浏览器之间的兼容性问题。
React中的合成事件是对浏览器原生事件的一种封装。
## 受控组件与非受控组件
受控组件就是受state状态控制的组件，组件的数据是由state状态控制，展示和更新都是操作state。
非受控组件就是不受状态state控制的组件，数据的展示和更新都是通过DOM节点去操作。
受控组件和非受控组件一般指的是表单元素，表单元素的数据是由state状态来控制的就是受控组件，不是通过state来控制，一般通过refs来获取表单数据的就是非受控组件。
## 什么是Virtual DOM？
虚拟DOM只是一个JavaScript对象。它是一个节点树，节点元素的属性和内容作为这个对象的属性。
## PureComponent使用指南
PureComponent的原理是继承了component类，自动加载shouldComponentUpdate函数。当组件数据更新时，shouldComponentUpdate会对props和state进行浅比较。返回true触发render重新渲染，返回false不会触发render重新渲染。
## React.memo
React.memo作用于函数组件，作用类似于PureComponent。React.memo接收两个参数：第一个参数是函数组件，第二个参数用于对比props是否一致，功能与shouldComponentUpdate类似，但是判断效果与shouldComponentUpdate相反，返回true不会触发重新渲染，返回false会触发重新渲染。
## React的state更新之后发生了什么？
state更新之后，会依次执行shouldComponentUpdate，componentWillUpdate，render和componentDidUpdate等生命周期钩子函数。shouldComponentUpdate会接收需要更新的nextProps和nextState，可以在shouldComponentUpdate函数中添加判断条件，如果为false，就不再执行下面的生命周期钩子函数，也就不会更新视图。
## React调用setState之后发生了什么?
在代码中调用setState之后，React会将传入的参数对象与组件当前的状态合并，然后触发调和过程。经过调和过程，React会以相对高效的方式根据新的状态构建React元素树并重新渲染整个UI界面。在React得到元素树之后，React会自动计算出新树和老树的差异，然后根据差异对界面进行最小化渲染。
## setState是同步的还是异步的？
setState并不是单纯的同步或者异步的。它会根据使用场景的不同而不同。在源码中，通过isBatchingUpdates来判断state是先存进队列还是直接更新，如果值为true则将state存进队列，执行异步操作，为false则是同步操作，直接更新。
+ 异步：在React生命周期钩子函数中或者合成事件中都是异步操作。
+ 同步：在原生事件比如addEventListener或者setTimeout，setInterval等事件中就是同步操作。
## setState方法的第二个参数
setState方法的第二个参数是一个回调函数，这个回调函数将在组件重新渲染后执行。在回调函数中可以拿到更新后的state的值。
## 虚拟DOM的实现原理？
+ 虚拟DOM的本质是JS对象，是对真实DOM的抽象。
+ 状态变更时，记录新树和旧树的差异。
+ 最后把差异更新到真实的DOM中，其实是按需更新。
## React Hooks是什么？
React Hooks可以让你在不编写Class组件的情况下使用state或者其他React特性。
## 为什么要有React Hooks？
+ 组件之间难以复用状态逻辑。
+ 复杂组件变得难以理解。
+ class组件不友好。
## useState
useState中的state的保存是保存在链表的节点中。保存在链表的顺序就是state声明的顺序。
## React Hooks的规则
### 只在最顶层使用Hook
因为Hook使用到了链表，这样能保证每次渲染的时候调用hook的顺序是一致的。代码中有多个useState的时候，React能够知道哪个state对应哪个useState。
### 只在React函数组件中调用Hooks
## React类组件和函数组件的不同？
+ 类组件有state状态和生命周期钩子函数。
+ 类组件可以获取实例化的this，函数组件不行，打包后的严格模式下函数组件的this是undefined。
+ 函数组件捕获了渲染时所使用的值。
函数组件捕获了渲染时所使用的值，主要还是this造成的。在类组件中，每次渲染this都是指向了该组件的新的实例，所以this.props的值都是最新的值，而函数组件并不是这样的。
