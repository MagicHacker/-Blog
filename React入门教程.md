# React简介

​		React是一个用于构建用户界面的JS库。主要用于构建UI，因此很多人认为React是MVC中的V（即View视图）。React拥有较高的性能，代码逻辑简单。

## React特点

		+ 声明式设计：React采用声明范式，可以轻松的描述应用。
		+ 高效：React通过采用虚拟DOM，最大限度地减少与DOM的交互。
		+ 灵活：React可以与已知的库或框架很好地配合。
		+ JSX：JSX是JS语法的扩展。React中多使用JSX来编写代码。
		+ 组件：通过React构建组件，使得代码更加容易得到复用。
		+ 单向响应数据流：React采用单向的响应的数据流，从而减少了重复代码。

# React安装

## React CDN

```html
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<!-- 生产环境中不建议使用 -->
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
```

**注意**：在浏览器中直接使用Babel来编译JSX的效率是非常低的。

引入的两个库：react.min.js，react-dom.min.js。

+ react.min.js：React的核心库。
+ react-dom.min.js：提供与DOM相关的功能。

## React脚手架

```bash
npm install -g create-react-app
```

# React元素渲染

​		元素是构成React应用的最小单位。它用于描述屏幕上输出的内容。

```html
const ele = '<div>Hello React!</div>'
```

​		与浏览器的DOM元素不同，React当中的元素事实上是普通的对象，React DOM可以确保浏览器的DOM的内容与React元素保持一致。

## 元素渲染到DOM

```html
<div id="app"></div>
```

​		在此div中的所有内容都将由React DOM来管理，所以我们将其称为根DOM节点。一般在开发React应用的时候只会定义一个根节点。但如果是在一个已有的项目中引入React的话，可能会需要在不同的部分单独定义React根节点。要将React元素渲染到根DOM节点中，需要将内容传递给ReactDOM.render()方法来将其渲染到页面上。

```javascript
const ele = <div>Hello React</div>;
ReactDOM.render(ele, document.getElementById('app'))
```

## 更新元素渲染

​		React元素都是不可变的。当元素被创建之后，你无法改变其内容或属性。目前更新页面的唯一办法就是创建一个新的元素，让后将它传入ReactDOM.render()方法。

```javascript
function tick() {
    const ele = (<div>现在是{new Date().toLocaleTimeString()}</div>)
	ReactDOM.render(ele, document.getElementById('app'))
}
serInterval(tick, 1000)
```

封装成函数组件：

```js
function Clock(props){
    return (
    	<div>现在是{props.date.toLocaleTimeString()}</div>
    )
}
function tick(){
    ReactDOM.render(
    	<Clock date={new Date()}/>,
	document.getElementById('app')
    )
}
setInterval(tick, 1000)
```

封装成基于类的组件，需要注意的是在render()方法中，使用this.props替换props

```javascript
class Clock extends React.Component{
    render() {
        return (
        	<div>现在是{this.props.date.toLocaleTimeString()}</div>
        )
    }
}
function tick() {
    ReactDOM.render(
    	<Clock date={new Date()}/>,
		document.getElementById('app')
    )
}
setInterval(tick, 1000)
```

值得注意的是React DOM首先会比较元素内容先后的不同，而在渲染过程中只会更新改变的部分。

# React JSX

​		React使用JSX来代替常规的JavaScript。JSX看起来像XML的JavaScript语法扩展。它有一下优点：

+ JSX执行更快，因为它在编译为JavaScript代码后进行了优化。
+ 它是类型安全的，在编译过程中就能发现错误。
+ 使用JSX编写模板更加简单方便。

```javascript
const ele = <div>Hello React!</div>
```

这种看起来有些奇怪的标签语法既不是字符串也不是HTML。它被成为JSX，一种JavaScript的语法扩展。推荐在React中使用JSX来描述用户界面。JSX是在JavaScript内部实现的。元素是构成React应用的最小单位，JSX就是用来声明React当中的元素。与浏览器DOM元素不同，React当中的元素实际上是普通的JavaScript对象，React DOM可以确保React元素与浏览器DOM的元素内容保持一致。要将React元素渲染到根DOM节点中，通过把这些元素传递给ReactDOM.render()方法来将其渲染到页面上。

```javascript
const divEle = <div className="bar"></div>
ReactDOM.render(divEle, document.getElementById('app'))
```

**注意**：由于JSX就是JavaScript，一些标识符像class和for不建议作为XML属性名。作为替代，React DOM使用className和htmlFor来做对应的属性。

## 使用JSX

​		JSX看起来类似HTML，如下实例：

```javascript
ReactDOM.render(
	<div>Hello React!</div>,
	document.getElementById('app')
)
```

## 独立文件

​		React JSX代码可以放在独立文件上。比如helloReact.js。

```javascript
ReactDOM.render(
  <h1>Hello, React!</h1>,
  document.getElementById('app')
);
```

然后在HTML文件中引入该JS文件：

```html
<body>
  <div id="app"></div>
  <script type="text/babel" src="helloReact.js"></script>
</body>
```

## JavaScript表达式

​		可以在JSX中使用JavaScript表达式，表达还是写在花括号{}中。

```javascript
ReactDOM.render(
	<div>
    	{ 1 + 1 }
    </div>,
    document.getElementById('app')
)
```

在JSX中不能使用**if else**语句，但是可以使用三元运算表达式来代替。

```jsx
ReactDOM.render(
	<div>
    	{ i === 1 ? 'true' : 'false'}
    </div>,
    document.getElementById('app')
)
```

## 样式

​		React推荐使用内联样式。可以使用camelCase语法来设置内联样式。React会在指定元素的数字后面自动添加px。

```jsx
const myStyle = {
    fontSize: 40,
    color: '#000'
}
ReactDOM.render(
	<div style={myStyle}>Hello React!</div>,
	document.getElementById('app')
)
```

## 注释

​		注释需要写在花括号中，实例如下：

```jsx
ReactDOM.render(
	<div>
    	Hello React!
    {/*注释*/}
    </div>,
    document.getElementById('app')
)
```

## 数组

​		JSX允许在模板中插入数组，数组会自动展开所有成员。

```jsx
const arr = [<span>菜鸟教程</span>,
             <span>学的不仅是技术，更是梦想！</span>,]
ReactDOM.render(
	<div>{ arr }</div>,
    document.getElementById('app')
)
```

# React组件

​		封装一个名为HelloMessage的组件：

```jsx
function HelloMessage(props){
    return <div>{props.name}</div>
}
ReactDOM.render(
	<HelloMessage name="Joe"/>,
    document.getElementById('app')
)
```

**实例解析**:

1、使用函数定义了一个组件：

```jsx
function HelloMessage(props){
    return <div>{props.name}</div>
}
```

也可以使用ES6 class来定义一个组件：

```jsx
class HelloMessage extends React.Component{
    constructor(props) {
        super(props)
        this.props = props
    }
    render() {
        return <div>{this.props.name}</div>
    }
}
```

**注意：**原生HTML元素以小写字母开头，而自定义的React类名以大写字母开头。此外，组件类只能包含一个顶层标签，否则会报错。

## 复合组件

​		我们可以通过创建多个组件来合成一个组件，即把组件的不同功能点进行分离。

```jsx
function Name(props) {
    return <div>姓名：{props.name}</div>
}
function Url(props) {
    return <div>网址: {props.url}</div>
}
function NickName(props) {
    return <div>昵称: {props.nickName}</div>
}
function App() {
    return (
    	<div>
        	<Name name="Joe"/>
            <Url url="wwww"/>
            <NickName nickName="Johnson"/>
        </div>
    )
}
ReactDOM.render(
	<App />,
    document.getElementById('app')
)
```

# React state

​		React把组件看成是一个状态机。通过与用户的交互，实现不同的状态，然后渲染UI，让用户界面和数据保持一致。React里，只需要更新组件的state，然后根据新的state重新渲染用户界面，不需要操作DOM。

```jsx
class Clock extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            date: new Date()
        }
    }
    render() {
        return (
        	<div>
            	<span>现在是：{this.state.date.toLocaleTimeString()}</span>
            </div>
        )
    }
}
ReactDOM.render(
	<Clock />,
    document.getElementById('app')
)
```

​		添加一个类构造函数来初始化状态this.state，类组件应该使用使用props调用基础构造函数。

## 生命周期钩子

​		在具有许多组件的应用程序中，在销毁时释放组件所占用的资源非常重要。接上面的例子，每当Clock组件第一次加载到DOM中时，都生成定时器，这在React中被成为挂载。同样，每当Clock组件生成的DOM被移除的时候，都会想要清除定时器，这在React中被成为卸载。

```jsx
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }
    componentDidMount() {
        this.timerId = setInterval(() => {
            this.tick()
        },1000)
    }
    componentWillUnmount() {
        clearInterval(this.timerId)
    }
    tick() {
        this.setState({
            date: new Date()
        })
    }
    render() {
        return (
        	<div>
            	<span>现在是：{this.state.date.toLocaleTimeString()}</span>
            </div>
        )
    }
}
ReactDOM.render(
	<Clock />,
    document.getElementById('app')
)
```

componentDidMount()与componentWillUnmount()方法被成为生命周期钩子。在组件输出到DOM后就会执行componentDidMount()钩子。

以上代码的执行顺序：

1、当\<Clock />组件被传递给ReactDOM.render()时，React调用Clock组件的构造函数。由于Clock组件需要显示当前时间，所以使用包含当前时间的对象来初始化this.state。稍后会更新此状态。

2、React然后调用Clock组件的render()方法。这时React了解应该显示什么内容，然后React更新DOM以匹配Clock组件的渲染输出。

3、当Clock组件的输出插入到DOM中时，React调用componentDidMount()生命周期钩子。在其中，Clock组件设置一个定时器，每1秒钟调用一次tick()。

4、每1秒钟调用tick()方法。在其中，Clock组件通过使用包含当前时间的对象调用setState()来触发UI更新。通过调用setState()，React知道状态已经改变，并再次调用render()方法渲染UI，更新DOM。

5、一旦Clock组件被从DOM中移除，React会调用componentWillUnmount()这个钩子，定时器也被清除。

## 数据自顶向下流动

​		父组件或子组件都不能知道某个组件是有状态还是无状态的，并且它们不应该关心某个组件是被定义为一个函数还是一个类。这就是为什么状态通常被成为局部或封装。除了拥有并设置它的组件外，其他组件皆不可访问。

```jsx
function FormatDate(props) {
    return <div>现在是：{props.date}</div>
}
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        )
    }
    componentWillUnmount() {
        clearInterval(this.timerID)
    }
    tick() {
        this.setState({
            date: new Date()
        })
    }
    render() {
        return (
        	<div>
            	<FormatDate date={this.state.date}/>
            </div>
        )
    }
}
ReactDOM.render(
	<Clock />,
    document.getElementById('app')
)
```

这通常被成为自顶向下或单向数据流。任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或UI只能影响树中下方的组件。

为了表明所有组件都是真正隔离的，可以创建一个App组件，它渲染三个Clock：

```jsx
function FormatDate(props) {
    return <div>现在是：{props.date}</div>
}
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        )
    }
    componentWillUnmount() {
        clearInterval(this.timerID)
    }
    tick() {
        this.setState({
            date: new Date()
        })
    }
    render() {
        return (
        	<div>
            	<FormatDate date={this.state.date}/>
            </div>
        )
    }
}
function App() {
    return (
    	<div>
        	<Clock />
            <Clock />
            <Clock />
        </div>
    )
}
ReactDOM.render(
	<App />,
    document.getElementById('app')
)
```

以上实例中每个Clock组件都建立了自己的定时器并且独立更新。

在React中，组件是有状态还是无状态的被认为是可能随时间而变化的组件的实现细节。可以在有状态组件中使用无状态组件，也可以在无状态组件中使用有状态组件。

# React props

​		state和props的主要区别在于props是不可变的，而state可以根据与用户的交互来改变。这就是为什么有些容器组件需要定义state来更新和修改数据，而子组件只能通过props来传递数据。单向数据流。

## 使用props

```jsx
function HelloMessage(props) {
    return <div>Hello {props.name}</div>
}
ReactDOM.render(
	<HelloMessage name="Joe"/>,
    document.getElementById('app')
)
```

## 默认props

​		可以通过组件类的defaultProps属性为props设置默认值。当父组件没有通过props向子组件传值时，子组件采用默认的props。

```jsx
class HelloMessage extends React.Component {
    render() {
        return (
        	<div>Hello {this.props.name}</div>
        )
    }
}
HelloMessage.defaultProps = {
    name: 'Joe'
}
ReactDOM.render(
	<HelloMessage />,
    document.getElementById('app')
)
```

## state和props

​		我们可以在父组件中设置state，并通过在子组件上使用props将其传递到子组件上。

```jsx
class WebSite extends React.Component {
    constructor() {
        super()
        this.state = {
            name: 'Joe',
            site: 'wwww'
        }
    }
    render() {
        return (
        	<div>
            	<Name name={this.state.name}/>
                <Site site={this.state.site}/>
            </div>
        )
    }
}
class Name extends React.Component {
    render() {
        return (
        	<div>{this.props.name}</div>
        )
    }
}
class Site extends React.Component {
    render() {
        return (
        	<div>{this.props.site}</div>
        )
    }
}
ReactDOM.render(
	<WebSite />,
    document.getElementById('app')
)
```

## props验证

​		React.PropTypes在React v15.5版本后已经移到了prop-types库。

props验证使用propTypes，它可以保证我们的应用组件被正确使用。React.PropTypes提供了很多验证器来验证传入数据是否有效。当向props传入无效数据时，JavaScript控制台会抛出警告。

```jsx
const title = 'Joe'
class MyTitle extends React.Component {
    render() {
        return (
        	<div>Hello {this.props.title}</div>
        )
    }
}
MyTitle.propTypes = {
    title: PropTypes.string
}
ReactDOM.render(
	<MyTitle title={title}/>,
    document.getElementById('app')
)
```

```jsx
const title = 'Joe'
const MyTitle = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    }
    render() {
    	return <div>{this.props.title}</div>
	}
})
ReactDOM.render(
	<MyTitle title={title} />,
    document.getElementById('app')
)
```

# React事件处理

​		React元素的事件处理和DOM元素的类似。但是语法上有一点不同：

+ React事件绑定属性的命名采用驼峰式写法，而不是小写。
+ 如果采用JSX的语法需要传入一个函数作为事件处理函数，而不是一个字符串。

HTML通常写法：

```html
<button onclick="activeBtn()">按钮</button>
```

React写法：

```jsx
<button onClick={activeBtn}>按钮</button>
```

在React中另一个不同是你不能使用**return false**的方式阻止默认行为，必须明确使用**preventDefault**。

使用React的时候不需要使用addEventListener为一个已创建的DOM元素添加监听器。仅需要在这个元素初始渲染的时候提供一个监听器。当你使用ES6 class语法来定义一个组件的时候，事件处理器会成为类的一个方法。

```jsx
class Toggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggleOn: true
        }
    }
    this.handleClick = this.handleClick.bind(this)
	handleClick() {
        this.setState(prevState => {
            isToggleOn: !prevState.isToggleOn
        })
    }
	render() {
        return (
        	<button onClick={this.handleClick}>
            	{this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        )
    }
}
ReactDOM.render(
  <Toggle />,
  document.getElementById('app')
)
```

**注意：**类的方法默认是不会绑定this的。如果忘记绑定this.handleClick并把它传入onClick，当你调用这个函数的时候this的值为undefined。

如果使用bind很厌烦，有两种方式可以解决。

1、可以使用属性初始化器来正确的绑定回调函数。

```jsx
class LoggingBtn extends React.Component {
    handleClick = () => {
        console.log('this is:', this);
    }
    render() {
        return (
          <button onClick={this.handleClick}>
            Click me
          </button>
        );
     }
}
```

2、如果没有使用属性初始化器语法，可以在回调函数中使用箭头函数。

```jsx
class LoggingBtn extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }
    render() {
        return (
        	<button onClick={() => this.handleClick()}></button>
        )
    }
}
```

使用这个语法有个问题就是每次LogginBtn渲染的时候都会创建一个不同的回调函数。如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。

## 事件处理函数传递参数

​		通常我们会为事件处理程序传递额外的参数。以下两种方式都可以向事件处理函数传递参数：

```jsx
<button onClick={() => this.deleteRow(id, e)}></button>
<button onClick={this.deleteRow.bind(this, id)}></button>
```

# React条件渲染

​		React中的条件渲染和JavaScript中的一致，使用JavaScript操作符**if**或条件运算符来创建表示当前状态的元素，然后让React根据它们的结果更新UI。

```jsx
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn
    if (isLoggedIn) {
        return <UserGreeting />
    }
    return <GuestGreeting />
}
ReactDOM.render(
	<Greeting isLoggedIn={false} />,
    document.getElementById('app')
)
```

## 元素变量

​		可以使用变量来存储元素。它可以帮你有条件的渲染组件的一部分，而输出的其他部分不会更改。

```jsx
class LoginControl extends React.Component {
    constructor(props) {
        super(props)
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleLogOutClick = this.handleLogOutClick.bind(this)
        this.state = {
            isLoggedIn: false
        }
    }
    handleLoginClick() {
        this.setState({
            isLoggedIn: true
        })
    }
    handleLogoutClick() {
        this.setState({
            isLoggedIn: false
        })
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn
        let button = null
        if (isLoggedIn) {
            button = <LogOutButton onClick={this.handleLogoutClick}/>
        }else {
            button = <LoginButton onClick={this.handleLoginClick} />
        }
        return (
        	<div>
            	<Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )
    }
}
ReactDOM.render(
	<LoginControl />,
    document.getElementById('app')
)
```

## 与运算符 &&

​		可以通过花括号包裹代码在JSX中嵌入任何表达式，也包括JavaScript的逻辑与**&&**，它可以很方便地条件渲染一个元素。

```jsx
function MailBox(props){
    const unRead = props.unRead
    return (
    	<div>
        	{
                unRead.length > 0 && <span>未读消息{unRead.length}条</span>
            }
        </div>
    )
}
const messages = ['React', 'Re: React', 'Re:Re: React']
ReactDOM.render(
	<MailBox unRead={messages} />,
    document.getElementById('app')
)
```

在JavaScript中，true && expression总是返回expression，而false && expression总是返回false。因此如果条件是true，&&右侧的元素就会被渲染，如果是false，React会忽略并跳过它。

## 三目运算符

​		条件渲染的另一种方法是使用JavaScript的三目运算符。

```jsx
condition ? true : false
```

```jsx
render() {
    const isLoggedIn = this.state.isLoggedIn
    return (
    	<div>
        	{
                isLoggedIn ? (<LogoutBtn onClick={this.handleOutClick}/> ) : 
                (<LogInBtn onClick={this.handleInClick}/>)
            }
        </div>
    )
}
```

## 阻止组件渲染

​		在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让render方法返回null而不是它的渲染结果即可实现。

```jsx
function WarningBanner(props) {
    if (!props.warn) {
        return null
    }
    return (
    	<div className="warning">警告</div>
    )
}
class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showWarning: true
        }
        this.handleToggleClick = this.handleToggleClick.bind(this)
    }
    handleToggleClick() {
        this.setState(prevState => {
            showWarning: !prevState.showWarning
        })
    }
    render() {
        return (
        	<div>
                <warningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}></button>
            </div>
        )
    }
}
ReactDOM.render(
	<Page />,
    document.getElementById('app')
)
```

**注意：**组件的render方法返回null并不会影响该组件生命周期钩子的回调。componentWillUpdate和componentDidUpdate依然可以被调用。

# React列表 & Keys

​		React使用map()方法渲染列表，组件接收数组参数，每个列表元素分配一个key，不然会出现警告 **a key should be provided for list items**，意思是需要包含key。

```jsx
function NumberList(props) {
    const numbers = props.numbers
    const listItems = numbers.map(number => {
        <li key={number.toString()}>
        	{number}
        </li>
    })
    return (
    	<ul>{listItems}</ul>
    )
}
const numbers = [1,2,3,4,5]
ReactDOM.render(
	<NumberList numbers={numbers} />,
    document.getElementById('app')
)
```

## Keys

​		Keys可以在DOM中某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此应当给数组中的每一个元素赋予一个确定的标识。一个元素的key最好是这个元素在列表中拥有独一无二的字符串。通常使用来自数据的id作为元素的key。当元素确定没有id时，可以使用索引index作为key。如果列表可以重新排序，则不建议使用索引来进行排序，因为这会导致渲染变得很慢。

## 用Keys提取组件

​		元素的key只有在它和它的兄弟节点对比时才有意义。比如，如果提取出一个ListItem组件，应该把key保存在数组中的这个**\<ListItem/>**元素上，而不是放在ListItem组件中的**\<li>**元素上。

```jsx
function ListItem(props) {
    return <li>{props.value}</li>
}
function NumberList(props) {
    const numbers = props.numbers
    const listItems = numbers.map(number => {
        <ListItem key={numbers.toString()} value={number}/>
    })
    return (
    	<ul>{listItems}</ul>
    )
}
const numbers = [1,2,3,4,5]
ReactDOM.render(
	<NumberList numbers={numbers}/>,
    document.getElementById('app')
)
```

key会作为给React的提示，但是不会传递给组件。如果组件中需要使用和key相同的值，则应该将其作为属性传递。

```jsx
const content = posts.map(post => {
    <Post key={post.id} id={post.id} value={post.value}/>
})
```

## JSX中嵌入map()

​		JSX允许在大括号中嵌入任何表达式。

```jsx
function NumberList(props) {
    const numbers = props.numbers
    return (
    	<ul>
        	{numbers.map(number => {
                <ListItem key={number.toString()} value={number} />
            })}
        </ul>
    )
}
```

# React组件API

​		React组件API。7个方法：

+ 设置状态：setState。
+ 替换状态： replaceState。
+ 设置属性：setProps。
+ 替换属性：replaceProps。
+ 强制更新：forceUpdate。
+ 获取DOM节点：findDOMNode。
+ 判断组件挂载状态：isMounted。

## 设置状态：setState

```jsx
setState(object, nextState[, function callback])
```

### 参数说明

+ nextState：将要设置的新状态，该状态会和当前的state合并。
+ callback：可选参数，回调函数。该函数会在setState设置成功，且组件重新渲染后调用。

合并nextState和当前state，并重新渲染组件。setState是React事件处理函数中和请求回调函数中触发UI更新的主要方法。

不能在组件内部通过this.state直接修改状态，因为该状态会在调用setState()后被替换。setState()并不会立即改变this.state，而是创建一个即将处理的state。setState()并不一定是同步的，为了提升性能React会批量执行state和DOM渲染。setState()总是会触发一次组件重绘，除非在shouldComponentUpdate()中实现了一些条件渲染逻辑。

```jsx
class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clickCount: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState(state => {
            return {
                clickCount: state.clickCount + 1
            }
        })
    }
    render() {
        return (
        	<div onClick={this.handleClick}>点击次数：{this.state.clickCount}</div>
        )
    }
}
ReactDOM.render(
	<Counter />,
    document.getElementById('app')
)
```

## 替换状态：replaceState

```jsx
replaceState(object nextState[, function callback])
```

### 参数说明

+ nextState：将要设置的新状态，该状态会替换当前的state。
+ callback：可选参数，回调函数。该函数会在replaceState设置成功，且组件重新渲染后调用。

**replaceState()**与**setState()**类似，但是**replaceState()**方法只会保留nextState中的状态，原state不再nextState中的状态都会被删除。

## 设置属性：setProps

```jsx
setProps(object nextProps[, function callback])
```

### 参数说明

+ nextProps：将要设置的新属性，该状态会和当前的props合并。
+ callback：可选参数，回调函数。该函数会在setProps设置成功，且组件重新渲染后调用。

设置组件属性，并重新渲染组件。props相当于组件的数据流，它总是会从父组件向下传递至所有的子组件中。当和一个外部的JavaScript应用集成时，可能需要向组件传递数据或通知React.render()组件重新渲染，可以使用setProps()。

更新组件，可以在节点上再次调用React.render()，也可以通过setProps()方法改变组件属性，触发组件重新渲染。

## 替换属性：replaceProps

```jsx
replaceProps(object nextProps[, function callback])
```

### 参数说明

+ nextProps：将要设置的新属性，该属性会替换当前的**props**。
+ callback：可选参数，回调函数。该函数会在**replaceProps**设置成功，且组件重新渲染后调用。

**replaceProps()**方法与**setProps**类似，但它会删除原有 props。

## 强制更新：forceUpdate

```jsx
forceUpdate([function callback])
```

### 参数说明

+ callback: 可选参数，回调函数。该函数会在组件**render()**方法调用后调用。

forceUpdate()方法会使组件调用自身的render()方法重新渲染组件，组件的子组件也会调用自己的render()。但是，组件重新渲染时，依然会读取this.props和this.state，如果状态没有改变，那么React只会更新DOM。

forceUpdate()方法适用于this.props和this.state之外的组件重绘（如：修改了this.state后），通过该方法通知React需要调用render()。一般来说，应该尽量避免使用forceUpdate()，而仅从this.props和this.state中读取状态并由React触发render()调用。

## 获取DOM节点：findDOMNode

```js
DOMElement findDOMNode()
```

### 参数说明

+ 返回值：DOM元素DOMElement。

如果组件已经挂载到DOM中，该方法返回对应的DOM元素。当render返回null或者false时，this.findDOMNode()也会返回null。从DOM中读取值的时候，该方法很有用。如：获取表单字段的值和做一些DOM操作。

## 判断组件挂载状态：isMounted

```jsx
bool isMounted()
```

### 参数说明

+ 返回值：true或false，表示组件是否已挂载到DOM中。

isMounted()方法用于判断组件是已经挂载到DOM中。使用该方法保证了setState()和forceUpdate()在异步场景下的调用不会出错。

# React组件生命周期

​		React的组件生命周期可分为三个状态：

+ mounting：已插入真实DOM。
+ updating：正在被重新渲染。
+ unmounting：已移出真实DOM。

生命周期的方法有：

+ componentWillMount：在渲染前调用，在客户端也在服务端。
+ componentDidMount：在第一次渲染后调用，只在客户端。之后的组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。如果想和JavaScript其他框架一起使用，可以在这个方法中调用setTimeout，setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。
+ componentWillReceiveProps：在组件接收到一个新的prop（更新后）时被调用。这个方法在初始化render时不会被调用。
+ shouldComponentUpdate：返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。可以在你确认不需要更新组件时调用。
+ componentWillUpdate：在组件接收到新的props或者state，但是还没有render时被调用。在初始化时不会被调用。
+ componentDidUpdate：在组件完成更新后立即调用。在初始化时不会被调用。
+ componentWillUnmount：在组件从DOM中移除之前立刻被调用。

```jsx
class Hello extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            opacity: 1
        }
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            let opacity = this.state.opacity
            opacity -= 0.5
            if (opacity < 0.1) {
            	opacity = 1    
            }
            this.setState({
                opacity
            })
        }, 100)
    }
    render() {
        return (
        	<div style={{opacity: this.state.opacity}}>{this.props.name}</div>
        )
    }
}
ReactDOM.render(
	<Hello name="React" />,
    document.getElementById('app')
)
```

# React表单与事件

​		HTML表单元素与React中的其他DOM元素有所不同，因为表单元素生来就会保留一些内部状态。在HTML中，像\<input/>，\<textarea>，\<select>这类表单元素会维持自身的状态，并根据用户输入进行更新。但在React中可变的状态通常保存在组件的状态属性中，且只能使用setState()方法进行更新。

## React表单

```jsx
class HelloMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'Hello React!'
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        const value = this.state.value
        return <div>
        	<input type="text" value={value} onChange={this.handleChange}/>
			<span>{value}</span>
        </div>
    }
}
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('app')
)
```

```jsx
class Content extends React.Component {
    render() {
        return <div>
        	<input type="text" value={this.props.myData} onChange=			  {this.props.updateProps}/>
        </div>
    }
}
class HelloMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'Hello React!'
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        const value = this.state.value
        return <div>
        	<Content myData={value} updateProps={this.handleChange}/>
        </div>
    }
}
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('app')
)
```

## React事件

​		当需要从子组件中更新父组件的state时，需要在父组件通过创建事件函数，并作为prop传递给你的子组件。

```jsx
class Content extends React.Component {
    render() {
        return <div>
        	<input type="text" value={this.props.myData} onChange=			  {this.props.updateProps}/>
        </div>
    }
}
class HelloMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'Hello React!'
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        const value = this.state.value
        return <div>
        	<Content myData={value} updateProps={this.handleChange}/>
        </div>
    }
}
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('app')
)
```

# React Refs

​		React支持一种特殊的属性Ref，可以用来绑定到render()输出的任何组件上。该属性允许你引用render()返回相应的实例。

```jsx
class MyComponent extends React.Componet {
	handleClick() {
        this.refs.myInput.focus()
    }
    render() {
        return (
        	<div>
            	<input type="text" ref="myInput"/>
                <input type="button" value="点我输入框获取焦点" onClick={this.handleClick.bind(this)}
        />
            </div>
        )
    }
}
ReactDOM.render(
  <MyComponent />,
  document.getElementById('app')
)
```















