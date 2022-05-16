React的生命周期可以分为初始化阶段，挂载阶段，更新阶段，卸载阶段。
## 初始化阶段
调用Class组件的constructor方法。初始化state和props，绑定事件处理函数。不能调用this.setState方法，因为此时render函数还未执行，意味着DOM节点还没有挂载。
## 挂载阶段
componentWillMount -> render-> componentDidMount。
componentWillMount发生在render函数之前，还没真正的挂载DOM。
componentDidMount发生在render函数之后，已经挂载了真实的DOM。
## 更新阶段
更新阶段分别由state和props的更新引起：
由props引起：
componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
由state更新引起：
shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
shouldComponentUpdate在组件更新之前调用，可以控制组件是否更新，返回true时组件更新，返回false时组件不更新。
## 卸载阶段
componentWillUnmount
## 父子组件生命周期
父组件constructor -> 父组件componentWillMount -> 父组件render -> 子组件constructor -> 子组件componentWillMount -> 子组件render -> 子组件componentDidMount -> 父组件componentDidMount
