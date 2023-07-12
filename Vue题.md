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

在对比新老虚拟DOM的时候：

首先，对比节点本身，判断是否为同一节点，如果不是相同节点，则删除该结点并重新创建节点进行替换。如果为相同节点，则进行patchVNode，判断如何对该节点的子节点进行处理，先判断一方有子节点而另一方没有子节点的情况（如果新的节点没有子节点，则将旧的子节点移除）。如果都有子节点，则进行updateChildren，判断如何对这些新旧节点的子节点进行操作。

匹配时，找到相同的子节点，递归比较子节点。在diff中，只对同层的子节点进行比较，放弃跨级的节点比较，使得时间复杂度从O(n3)降低到O(n)，也就是说当新旧children都为多个子节点时才需要用核心的diff算法进行同级比较。

## key的作用

v-for更新已经渲染过的列表时，它默认采用“就地复用”的策略。如果数据项的顺序发生了改变，Vue不会移动DOM元素来匹配数据项的顺序，只是简单复用此处的每个元素。因此可以为每个列表项提供一个key值，以便Vue准确的跟踪每个DOM元素。key的作用就是为了更高效的更新渲染DOM。因为带了key就不是就地复用了，在源码的sameNode函数中a.key === b.key就可以避免就地复用的情况。

## computed和watch的区别









