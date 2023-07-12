# Vue题

## v-for和v-if哪个优先级更高？如果同时出现，如何优化？

v-for的优先级高于v-if，如果同时出现，每次渲染都会先执行for循环再进行if的条件判断。这种情况下，无论如何循环都会执行，浪费了性能。

要避免这种情况，可以在外层嵌套template标签，在这一层上绑定v-if，然后在内部进行v-for循环。

## 为什么data是一个函数？

组件的data写成一个函数，数据是通过函数return一个对象，这样每次复用组件，都会生成一个新的data，让各个组件自己维护各自的数据，不会造成数据污染。如果单纯的写成对象的形式，那么所有组件就会共享这一个data数据，一个组件里的数据变化，其他组件也会跟着变，造成了数据的污染。

## 父子组件生命周期的执行顺序

+ 渲染过程：父组件beforeCreate，父组件created，父组件beforeMount，子组件beforeCreate，子组件created，子组件beforeMount，子组件mounted，父组件mounted。
+ 更新过程：父组件beforeUpdate，子组件beforeUpdate，子组件updated，父组件updated。
+ 销毁过程：父组件beforeDestory，子组件beforeDestory，子组件destoryed，父组件destoryed。

## Vue基本原理

当一个Vue实例被创建时，Vue会遍历data中的属性，用Object.defineProperty将这些属性转换为getter/setter，并且在内部追踪相关依赖，在属性被访问和修改时通知变化。每个组件实例都有相应的watcher，它会在组件渲染的过程中，将属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher，从而使得与属性关联的组件更新。

## Vue的生命周期

Vue实例有一个完成的生命周期，即开始创建，初始化数据，模板编译，挂载DOM，渲染，更新，卸载等一系列过程。

+ beforeCreate：数据观测和初始化事件还未开始，data的响应式追踪还没开始。此时不能访问到data中的属性，computed，watch和methods上的数据。
+ created：实例创建完成，此时data中的属性，computed，watch等数据可以访问，但是此时还未挂载DOM，不能访问$el属性。
+ beforeMount：在挂载前调用，data的数据和template模板的内容渲染成HTML，但是此时还没挂载到真实的DOM上。
+ mounted：挂载完成。
+ beforeUpdate：发生在更新之前，可以在这个阶段更新数据，但是不会触发重新渲染。
+ updated：发生在更新完成之后，此时DOM也已经更新完毕。
+ beforeDestory：发生在组件实例销毁之前，此时组件实例仍然可用。
+ destoryed：组件实例销毁后调用，组件实例被彻底销毁。一般在这里移除事件绑定，clearTimeout之类的。

## hash和history模式

hash模式是开发中默认的模式，URL带着一个#，hash值会出现在URL里面，但访问静态资源不会发起HTTP请求。主要原理就是监听onhashchange事件。在页面的hash值变化时，无需向后端发起请求，就可以触发事件。

history模式的URL中没有#，使用的是传统的路由分发模式，即用户在访问一个URL时，会发送一个HTTP请求。

## diff算法原理

diff算法采用同级比较：

+ 首先元素不一致直接新节点替换旧节点。
+ 元素如果一样，先替换属性。然后对比子节点，如果新老都有子节点，就采用双指针的方式进行对比，头节点和头节点对比，尾节点和尾节点对比，头节点和尾节点对比。
+ 如果新元素有子节点而旧元素没有子节点，直接将子节点的虚拟DOM转化成真实DOM插入即可。
+ 如果新元素没有子节点而旧元素有子节点，直接替换。

## key的作用

v-for更新已经渲染过的列表时，它默认采用“就地复用”的策略。如果数据项的顺序发生了改变，Vue不会移动DOM元素来匹配数据项的顺序，只是简单复用此处的每个元素。因此可以为每个列表项提供一个key值，以便Vue准确的跟踪每个DOM元素。key的作用就是为了更高效的更新渲染DOM。因为带了key就不是就地复用了，在源码的sameNode函数中a.key === b.key就可以避免就地复用的情况。

## computed和watch的区别

computed是计算属性，依赖其他属性值，可以从原有的组件数据中派生出新的数据。computed具有缓存性，如果依赖的数据不改变，则不会重新计算，必须return一个值，通常是用来派生数据的。

watch是监听器，监听某个响应式数据变化了并执行一段逻辑，通常是执行一些复杂的业务逻辑。

## 直接给一个数组项赋值，Vue能检测到变化吗？

由于JS的限制，Vue不能检测到以下数组的变动：

+ 当你用索引直接设置一个数组项时，例如：vm.items[index] = newValue。
+ 当你直接修改数组长度的时候，例如：vm.items.length = newLength。

解决第一个问题可以使用Vue.set方法或者使用数组的splice方法。

解决第二个问题可以使用数组的splice方法。

## Vue的性能优化

+ 对象层级不要太深，因为属性转换响应式是递归的过程，层级太深，性能会变差。
+ 非响应式数据就不要放在data中了，可以使用Object.freeze()冻结数据。
+ v-if和v-show要区分使用场景。
+ v-for加key。
+ 长列表可以使用虚拟列表。
+ 监听事件和setTimeout，setInterval及时销毁。
+ 路由懒加载。
+ 三方插件按需加载。

## Vue和React的区别

+ 监听数据变化的实现不同：Vue是通过getter/setter进行数据劫持，能精确的知道数据的变化。React默认是通过引用比较的方式。
+ 模板编写：Vue通常都是template这种类似于常规的HTML的模板，而React则是JSX。
+ 虚拟DOM的处理方式不同：Vue中的虚拟DOM控制了颗粒度，更细化，组件层面走watcher通知，组件内部通过vdom做diff。React走类似CPU调度的逻辑，把vdom树，变成了链表。
+ 数据流不同：Vue支持双向绑定。React不支持双向绑定。
+ 渲染过程不同：Vue能更快的计算是虚拟DOM的差异，会跟踪每个组件的依赖关系，不需要重新渲染整个组件树，而React在状态改变时，全部子组件都会重新渲染。
