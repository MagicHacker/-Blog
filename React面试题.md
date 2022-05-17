## React事件机制
```html
<div onClick={() => this.handleClick()}></div>
```
React并不是将事件绑定到了节点自身，而是在document元素上监听了所有的事件，当事件被触发并且冒泡到document元素时，React将事件内容封装并交给真正的处理函数执行。这样做的好处是能在组件挂载和销毁时统一订阅和移除事件。
另外冒泡到document的事件也不是浏览器原生的事件，而是React自己实现的合成事件。合成事件的好处是抹平了浏览器之间的兼容性问题。
React中的合成事件是对浏览器原生事件的一种封装。
## 受控组件与非受控组件
受控组件和非受控组件一般指的是表单元素，表单元素的数据是由state状态来控制的就是受控组件，不是通过state来控制，一般通过refs来获取表单数据的就是非受控组件。
## 什么是Virtual DOM？
虚拟DOM只是一个JavaScript对象。它是一个节点树，节点元素的属性和内容作为这个对象的属性。
## PureComponent使用指南
PureComponent的原理是继承了component类，自动加载shouldComponentUpdate函数。当组件数据更新时，shouldComponentUpdate会对props和state进行浅比较。返回true触发render重新渲染，返回false不会触发render重新渲染。
## React.memo
React.memo作用于函数组件，作用类似于PureComponent。React.memo接收两个参数：第一个参数是函数组件，第二个参数用于对比props是否一致，功能与shouldComponentUpdate类似，但是判断效果与shouldComponentUpdate相反，返回true不会触发重新渲染，返回false会触发重新渲染。
