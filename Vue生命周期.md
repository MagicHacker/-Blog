Vue实例从创建到销毁的全过程就是Vue的生命周期。即指从创建，初始化数据，编译模板，挂载DOM之后进行渲染，更新再渲染，最后再卸载等一系列过程。
## beforeCreate
在beforeCreate阶段，data和el元素都是undefined。
## created
在created阶段，data已经有数据了，但是el元素还是undefined。
## beforeMount
在beforeMount阶段，data和el元素已经有数据了，但是没有挂载到真实DOM上。双括号的模板字符串还没有被替换成真实的值。
## mounted
在mounted阶段，data已经有数据了，同时也已经挂载到真实DOM上了。
## beforeUpdate和updated
当Vue发现data中的数据发生了改变，就会触发对应组件的重新渲染。先后调用beforeUpdate和updated。
在beforeUpdate阶段，data数据已经变化了，但是视图层还没有变化。在updated阶段，data数据变化，视图层也更新了。
## beforeDestroy和destroyed
beforeDestroy在组件实例被销毁之前调用，在这一阶段，组件实例仍然是可用的。
destroyed在组件实例被销毁之后调用，在这一阶段，所有的Vue实例全部被销毁了。
## 父子组件生命周期
父组件的beforeCreate-》created-》beforeMount-》子组件的beforeCreate-》created-》beforeMount-》mounted-》父组件的mounted。
