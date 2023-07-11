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

