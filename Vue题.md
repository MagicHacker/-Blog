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