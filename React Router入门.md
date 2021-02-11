# React Router简介

​		React Router是完整的React路由解决方案。React Router可以让你向应用中快速地添加视图和数据流，同时保持UI与URL同步。它拥有简单的API与强大的功能例如代码缓冲加载，动态路由匹配，以及建立正确的位置过渡处理。

# 安装

​		首先通过npm安装

```bash
npm i react-router --save
```

​		然后使用一个支持CommonJS或ES6的模块处理器，比如webpack

```js
import {Router, Route, Link} from 'react-router'
```

​		script标签引入

```html
<script src="https://unpkg.com/react-router/umd/ReactRouter.min.js"></script>
```

​		然后你可以在window.ReactRouter找到这个库。

```jsx
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link} from 'react-router'
const App = React.createClass({
    render() {
        return (
        	<div>
            	<ul>
                	<li><Link to="/about">About</Link></li>
                    <li><Link to="/Inbox">Inbox</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})
React.render((
	<Router>
    	<Route path="/" component={App}>
        	<Route path="about" component={About}></Route>
            <Route path="inbox" component={Inbox}></Route>
        </Route>
    </Router>
), document.body)
```

# 基础

## 路由配置

​		路由配置是一组指令，用来告诉router如何匹配URL以及匹配后如何执行代码。

```jsx
import React from 'react'
import { Router, Route, Link} from 'react-router'
const App = React.createClass({
    render(){
        return (
        	<div>
            	<ul>
                	<li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})
const About = React.createClass({
    render() {
        return <h3>About</h3>
    }
})
const Inbox = React.createClass({
    render() {
        return (
        	<div>
            	{this.props.children || 'welcome'}
            </div>
        )
    }
})
const Message = React.createClass({
    render() {
        return <h3>{this.props.params.id}</h3>
    }
})
React.render((
	<Router>
    	<Route path="/" component={App}>
        	<Route path="about" component={About}></Route>
            <Route path="inbox" component={Inbox}>
            	<Route path="message/:id" component={Message}></Route>
            </Route>
        </Route>
    </Router>
), document.body)
```

## 添加首页

​		当URL为/时，我们想渲染一个在APP中的组件。但是此时，App的render中的this.props.children还是undefined。这时我们使用IndexRoute来设置一个默认页面。

```jsx
import { IndexRoute } from 'react-router'
const DashBoard = React.createClass({
    render() {
        return <div>Welcome to the app!</div>
    }
})
React.render((
	<Router>
    	<Route path="/" component={App}>
        	<IndexRoute component={DashBoard}></IndexRoute>
            <Route path="about">About</Route>
            <Route path="inbox" component={Inbox}>
            	<Route path="message/:id" component={Message}></Route>
            </Route>
        </Route>
    </Router>
), document.body)
```

## 进入和离开的Hook

​		Route可以定义onEnter和onLeave两个hook，这些hook会在页面跳转确认时触发一次。这些hook对于一些情况非常有用，例如权限验证或者在路由跳转前将一些数据持久化保存下来。

在路由跳转过程中，onLeave hook会在所有将离开的路由中触发，从最下层的子路由开始直到最外层父路由结束。然后onEnter hook会从最外层的父路由开始直到最下层子路由结束。

## 替换配置方式

​		使用原生route数组对象进行路由管理。

```jsx
const routeConfig = [
    {
        path: '/',
        component: App,
        indexRoute: {
            component: Dashboard
        },
        childRoutes: [
            {
                path: 'about',
                component: About
            },
            {
                path: 'inbox',
                component: Inbox,
                childRoutes: [
                    {
                        path: '/message/:id',
                        component: Message
                    },
                    {
                        path: 'messages/:id',
                        onEnter: function (nextState, replaceState) {
                            replaceState(null, '/messages/' + nextState.params.id)
                        }
                    }
                ]
            }
        ]
    }
]
React.render(<Router routes={routeConfig} />, document.body)
```

# 路由匹配原理

​		路由有三个属性来决定是否匹配一个URL：

+ 嵌套关系
+ 路径语法
+ 优先级

## 嵌套关系

​		React Router使用路由嵌套的概念来让你定义view的嵌套集合。当一个给定的URL被调用时，整个集合中都会被渲染。嵌套路由被描述成一种属性结构。React Router会深度优先遍历整个路由配置来寻找一个与给定URL相匹配的路由。

## 路径语法

​		路由路径是匹配一个URL的一个字符串模式。大部分的路由路径都可以直接按照字面量理解。除了以下几个特殊符号：

+ **:paramName**：匹配一段位于/，?或#之后的URL。命中的部分被作为一个参数。
+ **（）**：在它内部的内容被认为是可选的。
+ **\***：匹配任意字符（非贪婪的）直到命中下一个字符或者整个URL的末尾，并创建一个splat参数。

```jsx
<Router path="/hello/:name"/>        //匹配/hello/michael和/hello/ryan
<Router path="/hello(/:name)"/>      //匹配/hello，/hello/michael和/hello/ryan
<Router path="/hello/*.*"/>          //匹配/hello，/hello/path
```

如果一个路由使用了相对路径，那么完整的路径将由它的所有祖先节点的路劲和自身指定的相对路劲拼接而成。使用绝对路劲可以使路由匹配忽略嵌套关系。

## 优先级

​		路由算法会根据定义的顺序自顶向下匹配路由。因此，当你拥有两个兄弟路由节点配置时，必须确认前一个路由不会匹配后一个路由中的路径。例如，错误的例子：

```jsx
<Route path="/comments" ... />
<Redirect from="/comments" ... />
```

# History

​		React Router是建立在history之上的。一个history知道如何去监听浏览器地址栏的变化，并解析这个URL转为location对象，然后router使用它匹配到的路径，正确地渲染对应的组件。

​		常用的history有三种形式，但是你可以使用React Router实现自定义的history。

+ browserHistory
+ hashHistory
+ createMemoryHistory

```jsx
import { browserHistory } from 'react-router'
render(
	<Router history={browserHistory} routes={routes} />,
    document.getElementById('app')
)
```

## browserHistory

​		Browser history是使用React Router的应用推荐的history。它使用浏览器中的history API处理URL，创建一个像example.com/some/path这样真实的URL。

## hashHistory

​		Hash History使用URL中的hash(#)部分去创建形如example.com/#/some/path的路由。

## createMemoryHistory

​		Memory History不会在地址栏被操作或读取。这就解释了我们是如何实现服务器渲染。同时它也非常适合测试和其他的渲染环境（像React Native）。和另外两种History的一点不同是你必须创建它，这种方式便于测试。

```jsx
const history = cteateMemoryHistory(location)
```

```jsx
import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute} from 'react-router'
import App from '../components/App'
import Home from '../components/Home'
import About from '../components/About'
import Features from '../components/Features'
render(
	<Router history={browserHistory}>
    	<Route path="/" component={App}>
        	<IndexRoute component={Home}/>
            <Route path="about" component={About}></Route>
            <Route path="features" component={Features}></Route>
        </Route>
    </Router>,
    document.getElementById('app')
)
```

# IndexRoute和IndexLink

## 默认路由IndexRoute

```jsx
<Router>
	<Route path="/" component={App}>
    	<IndexRoute component={Home} />
        <Route path="accounts" component={Accounts}></Route>
        <Route path="statements" component={Statements}></Route>
    </Route>
</Router>
```

## Index Links

如果你在这个 app 中使用 `<Link to="/">Home</Link>` , 它会一直处于激活状态，因为所有的 URL 的开头都是 `/` 。 这确实是个问题，因为我们仅仅希望在 `Home` 被渲染后，激活并链接到它。

如果需要在 `Home` 路由被渲染后才激活的指向 `/` 的链接，请使用 `<IndexLink to="/">Home</IndexLink>`

# 动态路由

​		路由是个非常适合做代码拆分 的地方：它的责任就是配置好每个view。

React Router里的路径匹配以及组件加载都是异步完成的，不仅允许你延迟加载组件，并且可以延迟加载路由配置。在首次加载的包中你只需要有一个路径定义，路由会自动解析剩下的路径。

Route可以定义getChildRoutes，getIndexRoute和getComponents这几个函数。它们都是异步执行，并且只有在需要时才被调用。我们将这种方式称为逐渐匹配。React Router会逐渐的匹配URL并只加载该URL对应页面所需的路径配置和组件。

```jsx
const CourseRoute = {
    path: 'course/:courseId',
    getChildRoutes(location, callback) {
        require.ensuer([], function (require) {
            callback(null, [
                require('./routes/Announcements'),
                require('./routes/Assignments'),
                require('./routes/Grades'),
            ])
        })
    },
    getIndexRoute(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./components/Index'))
        })
    },
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./components/Course'))
        })
    }
}
```

# 跳转前确认

​		React Router提供一个routerWillLeave生命周期钩子，这使得React组件可以拦截正在发生的跳转或者在离开route前提示用户。routerWillLeave返回值有以下两种：

+ return false取消此次跳转。
+ return返回提示信息，在离开route前提示用户进行确认。

你可以在route组件中引入Lifecycle mixin来安装这个钩子。

```jsx
import { Lifecycle } from 'react-router'
const Home = React.createClass({
	mixins: [Lifecycle],
	routerWillLeave(nextLocation) {
		if (!this.state.isSaved) {
			return 'Your work is not saved! Are you sure you want to leave?'
		}
	}
})
```

如果你在组件中使用了ES6类，可以借助react-mixin包将Lifecycle mixin添加到组件中，不过我们推荐使用React.createClass来创建组件，初始化路由的生命周期钩子函数。

如果你想在一个深层嵌套的组件中使用routerWillLeave钩子，只需在route组件中引入RouteContext mixin，这样就会把route放到context中。

```jsx
import { Lifecycle, RouteContext } from 'react-router'
const Home = React.createClass({
    // route会被放到Home和它子组件以及孙子组件的context中
    // 这样在层级树中Home以及所有子组件都可以拿到route
    mixins: [RouteContext],
    render() {
        return <NestForm />
    }
})
const NestForm = React.createClass({
    mixins: [Lifecycle],
    routerWillLeave(nextLocation) {
    if (!this.state.isSaved) {
      return 'Your work is not saved! Are you sure you want to leave?'
  	}
})
```

# 组件生命周期

​		路由组件的生命周期和React的组件生命周期没有什么不同。

```jsx
<Route path="/" component={App}>
	<IndexRoute component={Home} />
    <Route path="invoices/:invoiceId" component={Invoice}/>
  	<Route path="accounts/:accountId" component={Account}/>
</Route>
```

# 组件外部导航

​		在组件内部可以使用this.context.router来实现导航。但是许多应用想要在组件外部使用导航。使用Router组件上被赋予的History可以在组件外部实现导航。

```jsx
import { Router, browserHistory } from 'react-router'
import routes from './app/routes'
render(
	<Router history={browserHistory} route={routes}></Router>,
    el
)
```

```jsx
import { browserHistory } from 'react-router'
browserHistory.push('/some/path')
```

















