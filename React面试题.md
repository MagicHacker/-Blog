## React事件机制
```html
<div onClick={() => this.handleClick()}></div>
```
React并不是将事件绑定到了节点自身，而是在document元素上监听了所有的事件，当事件被触发并且冒泡到document元素时，React将事件内容封装并交给真正的处理函数执行。这样做的好处是能在组件挂载和销毁时统一订阅和移除事件。
另外冒泡到document的事件也不是浏览器原生的事件，而是React自己实现的合成事件。合成事件的好处是抹平了浏览器之间的兼容性问题。
