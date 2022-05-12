React的生命周期可以分为初始化阶段，挂载阶段，更新阶段，卸载阶段。
## 初始化阶段
调用Class组件的constructor方法，进行state和props的初始化。
## 挂载阶段
componentWillUnmount -> render-> componentDidMount。
componentWillUnmount发生在render函数之前，还没真正的挂载DOM。
componentDidMount发生在render函数之后，已经挂载了真实的DOM。
## 更新阶段
更新阶段分别由state和props的更新引起：
由props引起：
componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
由state更新引起：
shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
## 卸载阶段
componentWillUnmount
