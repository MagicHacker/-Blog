Vue会递归地遍历data中的所有属性，并用Object.defineProperty把这些属性全部转成getter/setter的方式。
在getter中进行依赖收集，在setter中进行派发更新。
## 检测变化的注意事项
由于JavaScript的限制，Vue不能检测数组和对象的变化。
### 对象
Vue无法检测对象属性的添加和删除。因为Vue是在组件初始化的时候将data选项中的属性转成getter/setter的形式的。所以已经在data选项上存在的属性才会转为响应式的。
对于已经创建的实例，Vue不允许动态地向data选项添加根级别的属性。但是可以使用Vue.set方法向嵌套的对象添加响应式的属性。
### 数组
Vue不能检测以下数组的变动：
+ 使用索引直接设置一个数组项时，vm.items[index] = newValue
+ 直接修改数组的长度时。vm.items.length = newLength
第一种情况可以使用Vue.set方法去解决。第二种情况使用splice方法。vm.items.splice(newLength)
## Vue响应式源码
Vue的源码中有个observer方法，forEach遍历data选项中的属性，然后在这个forEach中循环调用defineReactive方法，在这个方法里面调用Object.defineProperty方法，将data选项的属性转换成getter/setter的形式。在getter方法中进行依赖收集，收集的是正在观察这个属性的所有watcher，收集到一个数组里。然后当属性变化的时候，触发setter，循环调用watcher里面的notify方法派发更新。
