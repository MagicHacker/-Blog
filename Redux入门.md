# Redux自述

​		Redux是JavaScript状态容易，提供可预测化的状态管理。Redux除了和React一起用外，还支持其他界面库。短小精悍，只有2kb。

# 安装

```bash
npm i redux --save
```

一般人们认为Redux就是一个CommonJS模块的集合。这些模块就是你在使用webpack，Browserify或者Node环境时引入的。如果想要使用Rollup，也是支持的。

你也可以不使用模块打包工具。redux的npm包里dist目录包含了预编译好的生产环境和开发环境下的UMD文件。可以直接使用，而且支持大部分流行的JavaScript包加载器和环境。比如你可以直接在页面上的script标签中引入UMD文件，也可以让Bower安装。UMD文件可以让你使用window.Redux全局变量来访问Redux。

Redux源文件由ES6编写，但是会预编译到CommonJS和UMD规范的ES5，它可以支持任何现代浏览器。不必非得使用Babel或模块打包器来使用Redux。

## 附加包

```bash
npm i react-redux --save
npm i redux-devtools --save-dev
```

注意：和Redux不同，很多Redux生态下的包并不提供UMD文件，建议使用像Webpack和Browserify这样的CommonJS模块打包器。

# 要点

​		应用中所有的state都以一个对象树的形式存储在一个单一的store中。唯一改变state的方法是触发action，一个描述发生了什么的对象。为了描述action如何改变state树，需要编写reducers。

```javascript
import { createStore } from 'redux'
这是一个reducers，形式为(state, action) => state的纯函数
描述了action如何把state转变成下一个state
state的形式可以是基本类型，数组，对象，甚至是Immutable.js生成的数据结构。
唯一的要点是当state变化时需要返回全新的对象，而不是修改传入的参数
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1;
        default:
    		return state;
    }
}
// 创建Redux store来存放应用的状态
// API是{subscirbe, dispatch, getState}
let store = createStore(counter)
store.subscribe(() => {
    console.log(store.getState())
})
// 改变内部state唯一方法是dispatch一个action
// 改变内部state唯一方法是dispatch一个action
// action可以被序列化，用日志记录和存储下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })
```

应该把要做的修改变成一个普通对象，这个对象叫做action，而不是直接修改state。然后编写专门的函数来决定每个action如何改变应用的state，这个函数叫做reducer。

# 动机

​		随着JavaScript单页应用开发日趋复杂，JavaScript需要管理比任何时候都要多的状态state。这些state可能包括服务器响应，缓存数据，本地生成尚未持久化到服务器的数据，也包括UI状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等。管理不断变化的state非常困难。如果一个model的变化会引起另一个model变化，那么当view变化时，就可能引起对应model以及另一个model的变化，依次地，可能会引起另一个view的变化。

# 核心概念

​		为了把action和state串起来，开发一些函数，这就是reducer。reducer只是接收一个state和action，并返回新的state的函数。

```javascript
function visibilityFilter(state = 'SHOW_ALL', action) {
    if (action.type === 'SET_VISIBILITY_FILTER') {
        return action.filter
    }else {
        return state
    }
}
function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([{text: action.text, completed: false}])
        case 'TOGGLE_TODO':
            return state.map((todo, index) => {
                action.index === index ? 
                    {text: todo.text, completed: !todo.completed}: todo
            })
    }
}
```

再开发一个reducer调用这两个reducer，进而来管理整个应用的state

```jsx
function todoApp(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    }
}
```

# 三大原则

## 单一数据源

​		整个应用的state被存储在一个object tree中，并且这个object tree只存在于唯一一个store中。这让同构应用开发变得很容易。来自服务端的state可以在无需编写更多代码的情况下被序列化并注入到客户端中。由于是单一的state tree，调试也变得很容易。在开发中，可以把应用的state保存在本地。

## state是只读的

​		唯一改变state的方法就是触发action，action是一个用于描述已经发生事件的对象。这样确保了视图和网络请求都不能直接修改state，相反他们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行。action就是普通对象，因此它们可以被日志打印，序列化，存储，后期调试等。

```javascript
store.dispatch({
    type: 'TODO',
    index: 1
})
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
})
```

## 使用纯函数来执行修改

​		为了描述action如何改变state tree，需要编写reducers。reducer只是一些纯函数，它接收先前的state和action，并返回新的state。应用变大，可以把它拆成多个小的reducers，分别独立操作state tree的不同部分。

```javascript
function visibilityFilter(state = 'SHOW_ALL', action) {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
          return action.filter
        default:
          return state
  	}
}
import {combineReducers, createStore} from 'redux'
const reducer = combineReducers({visibilityFilter})
const store = createStore(reducer)
```

# 基础

## Action

​		Action是把数据从应用传到store的有效载荷。它是store数据的唯一来源。一般通过store.dispatch将action传到store。Action本质上是JavaScript普通对象。我们约定，action内必须使用一个字符串类型的type字段来表示将要执行的动作。多数情况下，type会被定义为字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放action。

```javascript
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
```

同时还需要添加一个action index来表示用户完成任务的动作序列号。因为数据是存放在数组中的，所以通过下表来引用特定的任务。而实际项目中一般会在新建数据的时候生成唯一的ID作为数据的引用标识。

```js
{
    type: TOGGLE_TODO,
    index: 5
}
```

我们应该尽量减少在action中传递的数据。

### Action创建函数

​		Action创建函数就是用来生成action的方法。在Redux中action创建函数只是简单地返回一个action。

```js
function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}
```

Redux中只需把action创建函数的结果传给dispatch()方法即可发起一次dispatch过程。

```js
store.dispatch(addTodo(text))
store.dispatch(completeTodo(index))
```

或者创建一个被绑定的action创建函数来自动dispatch：

```js
const boundAddTodo = text => dispatch(addTodo(text))
```

store里能直接通过store.dispatch()调用dispatch()方法，但是多数情况下你会使用react-redux提供的connect()辅助器来调用。bindActionCreators()方法可以自动把多个action创建函数绑定到dispatch()方法上。

## Reducer

​		Reducers指定了应用状态的变化如何响应actions并发送到store。记住actions只是描述了有事情发生这一事实，并没有描述应用如何更新state。

### 设计state结构

​		在Redux应用中，所有的state都被保存在一个单一的对象中。

处理Reducer关系时的注意事项：开发复杂应用时，不免会有一些数据相互引用。建议尽可能地把state范式化，不存在嵌套。把所有数据都放到一个对象里，每个数据以ID为主键，不同实体或列表间通过ID互相引用数据。

### Action处理

​		reducer就是一个纯函数，接收旧的state和action，返回新的state。

```js
(prevState, action) => newState
```

之所以将这样的函数称为reducer，因为这种函数与被传入Array.prototype.reduce(reducer, ?initValue)里的回调函数属于相同的类型。保持reducer纯净非常重要。永远不要在reducer里做如下操作：

+ 修改传入参数。
+ 执行有副作用的操作，如API请求或路由跳转。
+ 调用非纯函数，如Date.now()。

只要传入参数相同，返回计算得到的下一个state就一定相同。没有特殊情况，没有副作用，没有API请求，没有变量修改，单纯执行计算。

```js
import { vislibilityFilters } from './actions'
const initState = {
    vislibilityFilter: vislibilityFilters.SHOW_ALL,
    todos: []
}
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```

## Store

​		Store有一下职责：

+ 维持应用的state。
+ 提供getState()方法获取state。
+ 提供dispatch(action)方法更新state。
+ 通过subscribe(listener)注册监听器。
+ 通过subscribe(listener)返回的函数注销监听器。

Redux应用只有一个单一的store。当需要拆分数据处理逻辑时，应该使用reducer组件而不是创建多个store。

## 数据流

​		严格的单向数据流是Redux的核心。这意味着应用中的所有数据都遵循相同的生命周期，这样也可以让应用变得更加可预测和理解。同时也鼓励做数据范式化，这样可以避免使用多个且独立的无法互相应用的重复数据。

Redux应用中的数据的生命周期遵循以下4个步骤：

1、调用store.dispatch(action)。

2、Redux store调用传入的reducer函数。

Store会把两个参数传入reducer：当前state和action。reducer是纯函数。它仅仅用于计算下一个state。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出，不应该做有副作用的操作。

3、根reducer应该把多个子reducer输出合并成一个单一的state树。

Redux原生提供combineReducers()辅助函数，来把根reducer拆分成多个函数，用于分别处理state树的一个分支。

4、Redux store保存了根reducer返回的完整的树。

这个新的树就是应用的下一个state。所有订阅store.subscribe(listener)的监听器都会被调用，监听里可以调用store.getState()获得当前的state。

# 高级

## 异步Action

​		当调用异步API时，有个时刻：发起请求的时刻和接收到相应的时刻。这两个时刻都可能会更改应用的state。为此你需要dispatch普通的同步action。一般情况下，每个API请求都毒药dispatch至少三种action：

+ 一种通知reducer请求开始的action。
+ 一种通知reducer请求成功的action。
+ 一种通知reducer请求失败的action。















