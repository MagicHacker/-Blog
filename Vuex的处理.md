Vuex是一个专为Vue.js应用程序开发的状态管理库。它采用集中式存储管理应用的所有组件状态，并以相应的规则保证状态是以一种可预测的方式发生变化。
当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：
+ 多个视图依赖于同一个状态。
+ 来自不同视图的行为需要变更同一个状态。
通过定义和隔离状态管理中的各种概念，并通过强制规则，维持视图和状态间的独立性，代码将会变的更加结构化，且易维护。
## Store
每个Vuex应用的核心就是store。store基本上就是个容器，它包含着你的应用中大部分的状态。Vuex和单纯的全局对象有两点不同：
+ Vuex的状态存储是响应式的。当Vue组件从store中读取状态的时候，如果store中的状态发生改变，那么组件的相应的状态也会得到更新。
+ 不能直接改变store中的状态。改变状态的唯一途径就是显示地提交mutation。这使得Vuex可以方便地跟踪每一个状态的变化。
可以通过store.state来获取状态，通过store.commit来提交mutation方法触发状态更新。
在Vue组件中，通过this.$store访问store实例。通过this.$store.commit方法提交mutation。
## State
Vue使用单一状态树，用一个对象包含整个应用的全部状态。每个应用将仅仅包含一个store实例。
### Vue组件获取Vuex的状态
由于Vuex的状态存储是响应式的，从store实例中获取状态最简单的方式就是在计算属性中返回某个状态：
```javascript
const Counter = {
	template: '',
	computed: {
		count() {
			return store.state.count
		}
	}
}
```
每当store.state.count更新的时候，都会重新求取计算属性，并且触发更新相关联的DOM。
Vuex通过Vue的插件系统将store实例从根组件中注入到所有的子组件里。且子组件能通过this.$store访问到。
```javascript
const Counter = {
	template: '',
	computed: {
		count() {
			return this.$store.state.count
		}
	}
}
```
### mapState辅助函数
当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，可以使用mapState辅助函数帮助生成计算属性。
```javascript
import { mapState } from 'vuex'
export default {
	computed: mapState(['count', 'sum'])
}
```
### Getter
有时候需要从store的state中派生出一些状态，例如对列表进行过滤并计数：
```javascript
computed: {
 todosCount() {
	 return this.$store.state.todos.filter(() => {})
 }
}
```
如果有多个组件都需要用到此属性，要么复制这个函数，或者抽取到公共函数中，然后多次导入。
Vuex允许在store中定义getter。
Getter接受state作为其第一个参数：
```javascript
const store = createStore({
	state: {
		todos: []
	},
	getters: {
		doneTodos: (state) => {
			return state.todos.filter(() => {})
		}
	}
})
```
### 通过属性访问
Getter会暴露为store.getters对象，可以通过属性的形式访问这些值。
```javascript
this.$store.getters.doneTodos
```
Getter也接受其他getter作为第二个参数：
```javascript
getters: {
	doneTodosCount(state, getters) {
		return getters.doneTodos.length
	}
}
```
### 通过方法访问
你也可以通过让getter返回一个函数，来实现给getter传参。在你对store里的数组进行查询时非常有用。
```javascript
getters: {
	getTodoById: () => {
		return (id) => {
			return state.todos.find(id => id ===1)
		}
	}
}
```
### mapGetters辅助函数
mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性：
```javascript
import {mapGetters} from 'vuex'
export default {
	computed: {
		//使用对象展开运算符将getter混入computed对象中
		...mapGetters(['', ''])
	}
}
```
## mutation
更改Vuex的store中的状态的唯一方法就是提交mutation。Vuex中的mutation类似于事件：每个mutation都有一个字符串的事件类型type和一个回调函数handler。这个回调函数就是修改状态的地方，并且它接受state作为第一个参数：
```javascript
const store = createStore({
	state: {
		count: 1
	},
	mutations: {
		increment(state) {
			state.count++
		}
	}
})
```
要调用一个mutation函数，必须通过store.commit，并不能直接调用mutation函数。
```JavaScript
store.commit('increment')
```
#### 提交载荷
可以向store.commit传入额外的参数，即mutation的载荷。
```JavaScript
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```
#### mutation必须是同步函数
比如你正在debug一个应用并观察devTool的mutation日志。每一条mutation被记录，devTools都需要捕捉到前一状态和后一状态的快照。然而在mutation中调用异步函数，会让mutation被触发的时候，异步的回调函数还没有被调用，没有返回结果，状态不可追踪。
## Action
Action类似于mutation，不同在于：
+ Action提交的是mutation，而不是直接变更状态。
+ Action可以包含任意异步操作。
```javascript
const store = createStore({
	state: {
		count: 0
	},
	mutations: {
		increment(state) {
			state.count++
		}
	},
	actions: {
		add(context) {
			context.commit('increment')
		}
	}
})
```
Action函数接受一个与store实例具有相同方法和属性的context对象，因此你可以调用context.commit提交一个mutation，或者通过context.state和context.getters来获取state和getters。
### 分发Action
Action通过store.dispatch方法触发：
```javascript
store.dispatch('add')
```
在action内部执行异步操作：
```javascript
actions: {
	addAsync({ commit }) {
		setTimeout(() => {
			commit('add')
		}, 1000)
	}
}
```
Actions同样支持载荷的方式和对象的方式分发mutation：
```javascript
store.dispatch('add', {
 amount: 10
})
store.dispatch({
	type: 'add',
	amount: 10
})
```
