# 	React简介

## 声明式

​		React使创建交互式UI变得轻而易举。为你应用的每个状态设计简洁的视图，当数据改变时React能有效地更新并正确地渲染组件。以声明式编写UI，可以使代码更加可靠，且方便调试。

## 组件化

​		创建拥有各自状态的组件，再由这些组件构成更加复杂的UI。组件逻辑使用JavaScript编写而非模板，因此可以轻松地在应用中传递数据，并使得状态与DOM分离。

## 随处编写

​		无论现在正在使用什么技术栈，都可以随时引入React来开发新特性，而不需要重写现有代码。React还可以使用Node进行服务器渲染，或使用React Native开发原生移动应用。

## 简单组件

​		React组件使用一个render()方法，接收输入的数据并返回需要展示的内容。在示例中这种类似XML的写法被称为JSX。被传入的数据可在组件中通过this.props在render()中访问。

```jsx
class HelloMessage extends React.Component {
    render() {
        return (
        	<div>Hello {this.props.name}</div>
        )
    }
}
ReactDOM.render(
	<HelloMessage name="React"/>,
    document.getElementById('app')
)
```

## 有状态组件

​		除了使用外部数据（通过this.props访问）以外，组件还可以维护其内部的状态数据（通过this.state访问）。当组件的状态数据改变时，组件会再次调用render()方法重新渲染。

```jsx
class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seconds: 0
        }
    }
    tick() {
        this.setState(state => {
            seconds: state.seconds + 1
        })
    }
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 10000)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    render() {
        return (
        	<div>{this.state.seconds}</div>
        )
    }
}
ReactDOM.render(
	<Timer />,
    document.getElementById('app')
)
```

# JSX简介

```js
const ele = <div>Hello React!</div>
```

它被称为JSX，是一个JavaScript的语法扩展。JSX可以很好地描述UI应该呈现出的交互的本质形式。JSX可能会使人联想到模板语言，但它具有JavaScript的全部功能。

## 为什么使用JSX

​		React认为渲染逻辑本质上与其他UI逻辑内在耦合。比如，在UI中需要绑定处理事件，在某些时刻发生状态变化时通知UI，以及需要在UI中展示准备好的数据。React并没有采用将标记与逻辑进行分离到不同文件这种人为地分离方式，而是通过将二者共同存放在称为组件的松散耦合单元中，来实现关注点分离。

## JSX中嵌入表达式

​		在JSX语法中，你可以在大括号内放置任何有效的JavaScript表达式。

```js
const name = 'Johnson'
const ele = <div>Hello {name}</div>
ReactDOM.render(
	ele,
    document.getElementById('app')
)
```

## JSX也是一个表达式

​		在编译之后，JSX表达式会被转为普通JavaScript函数调用，并对其取值后得到JavaScript对象。即，可以在if语句和for循环语句中使用JSX，将JSX赋值给变量，把JSX当做参数传入，以及从函数中返回JSX。

```js
function getGreeting(user) {
    if (user) {
        return <div>Hello {formatName(user)}</div>
    }
    return <div>Hello React</div>
}
```

## JSX特定属性

​		可以使用引号，将属性值指定为字符串字面量。

```js
const ele = <div tabIndex="0"></div>
```

也可以使用大括号，来在属性值中插入一个JavaScript表达式。

```js
const ele = <img src={user.url}/>
```

在属性中嵌入JavaScript表达式时，不要在大括号外面加上引号。应该仅使用引号或大括号中的一个，对于同一属性不能同时使用这两种符号。

因为JSX语法上更接近JavaScript而不是HTML，所以React DOM使用camelCase来定义属性名称，而不使用HTML属性名称的命名约定。

## 使用JSX指定子元素

​		JSX标签里能够包含很多的子元素

```js
const ele = (
	<div>
    	<h1>Hello</h1>
    	<h2>Good to see you here.</h2>
    </div>
)
```

## JSX表示对象

​		Babel会把JSX转译成一个名为React.createElement()函数调用。以下两种代码完全等效：

```jsx
const ele = (
	<h1 className="greeting">
    	Hello React!
    </h1>
)
```

```js
const ele = React.createElement(
	'h1',
    {
        className: 'greeting'
    },
    'Hello React!'
)
```

# 元素渲染

​		元素是构成React应用的最小单元。元素描述了你在屏幕上想看到的内容。

```jsx
const ele = <h1>Hello, world</h1>;
```

与浏览器的DOM元素不同，React元素是创建开销极小的普通对象。React DOM会负责更新DOM来与React元素保持一致。

## 将一个元素渲染为DOM

```html
<div id="root"></div>
```

我们将其称为根DOM节点，因为该节点内的所有内容都将由React DOM管理。仅使用React构建的应用通常只有单一的根DOM节点。如果你在将React集成进一个已有的应用，那么你可以在应用中包含任意多的独立根DOM节点。想要将一个React元素渲染到根DOM节点中，只需把它们一起传入ReactDOM.render()。

```jsx
const ele = <div>Hello React!</div>
ReactDOM.render(
	ele,
    document.getElementById('root')
)
```

## 更新已渲染的元素

​		React元素是不可变的。一旦被创建，你就无法更改它的子元素或者属性。更新UI的唯一方式就是创建一个全新的元素，并将其传入ReactDOM.render()。

```jsx
function tick() {
    const ele = (
    	<div>
        	<span>{new Date()}</span>
        </div>
    )
    ReactDOM.render(
    	ele,
        document.getElementById('root')
    )
}
setInterval(tick, 1000);
```

## React只更新需要更新的部分

​		React DOM会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使DOM达到预期的状态。

# 组件&props

​		组件允许你将UI拆分为独立可复用的代码片段，并对每个片段进行独立的构思。组件，从概念上类似于JavaScript函数，它接受任意的入参，并返回用于描述页面展示内容的React元素。

## 函数组件&class组件

​		定义组件的最简单的方式就是编写JavaScript函数。

```jsx
function Welcome(props) {
    return <div>Hello {props.name}</div>
}
```

​		该函数是一个有效的React组件，因为它接收唯一带有数据的props对象并返回一个React元素。这类组件被称为函数组件，因为它本质上就是JavaScript函数。

使用ES6 class来定义组件

```jsx
class Welcome extends React.Component {
    render() {
        return <div>{this.props.name}</div>
    }
}
```

## 渲染组件

​		React元素可以是用户自定义的组件：

```jsx
const ele = <Welcome name="Joe" />
```

​		当React元素为用户自定义组件时，它会将JSX所接收的属性以及子组件转换为单个对象传递给组件，这个对象被称为props。

```jsx
function Welcome(props) {
    return <div>Hello {props.name}</div>
}
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

React组件名称必须以大写字母开头。React会将小写字母开头的组件视为原生DOM标签。

## 组合组件

​		组件可以在其输出中引用其他组件。这就让我们可以用同一组件来抽象出任意层次的细节。按钮，表单，对话框，甚至整个屏幕的内容。在React应用程序中，这些通常都会以组件的形式表示。

```jsx
function Welcome(props) {
    return <div>Hello {props.name}</div>
}
function App() {
    return (
    	<Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
    )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

## props的只读性

​		组件无论是使用函数声明还是通过class声明，都决不能修改自身的props。

```js
function sum(a, b) {
    return a + b
}
```

这样的函数被称为纯函数，因为该函数不会尝试修改入参，且多次调用下相同的入参始终返回相同的结果。相反，下面这个函数不是纯函数，因为它更改了自己的入参：

```js
function withDraw(account, amount) {
    account.total -= amount;
}
```

**所有React组件都必须像纯函数一样保护它们的props不被更改。**

# state&生命周期

​		state与props类似，但是state是私有的，并且完全受控于当前组件。componentDidMount()方法会在组件已经被渲染到DOM中后运行。使用this.setState()方法来时刻更新组件的state。

## 正确使用state

### 不要直接修改state

例如：以下代码不会重新渲染组件

```js
this.state.comment = 'Hello'
```

而是应该使用setState()

```js
this.setState({comment: 'Hello'});
```

**构造函数时唯一可以给this.state赋值的地方。**

### state的更新可能是异步的

​		出于性能考虑，React可能会把多个setState()调用合并成一个调用。因为this.props和this.state可能会异步更新，所以不要依赖它们的值来更新下一个状态。

例如：此代码可能会无法更新计数器。

```js
this.setState({
    counter: this.state.counter + this.props.increment
})
```

要解决这个问题，可以让setState()接收一个**回调函数**而不是一个对象。

```js
this.setState((state, props) => {
    counter: state.counter + props.increment
})
```

### state的更新会被合并

​		当你调用setState()时，React会把你提供的对象合并到当前的state中。

```js
constructor(props) {
    super(props);
    this.state = {
        posts: [],
        comments: []
    };
}
```

### 数据是向下流动

​		不管是父组件或者是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也不关心它是函数组件还是class组件。这就是为什么称state为局部或是封装的原因。除了拥有并设置了它的组件，其他组件都无法访问。

组件可以选择把它的state作为props向下传递到它的子组件中。

```jsx
<FormattedDate date={this.state.date} />
```

这通常会被叫做自上而下或是单向的数据流。任何的state总是属于特定的组件，而且从该state派生的任何数据或UI只能影响树中低于它们的组件。

# React事件处理

​		React元素的事件处理和DOM元素很相似，但是有一点语法上的不同：

+ React事件的命名采用小驼峰式，而不是纯小写。
+ 使用JSX语法时需要传入一个函数作为事件处理函数，而不是字符串。

例如：传统的HTML：

```html
<button onclick="addSum()">
    active
</button>
```

React的不同：

```jsx
<button onClick={addSum}>active</button>
```

在React中的另一个不同是不能通过返回false阻止默认行为。必须显示的调用preventDefault()。

```jsx
function ActionLink() {
    handleClick(e) {
        e.preventDefault()
        console.log('')
    }
    return (
    	<a href="#" onClick={handleClick}>click</a>
    )
}

```

使用React时，一般不需要使用addEventListener为已创建的DOM元素添加监听器。事实上，只需要在该元素初始渲染的时候添加监听器即可。

当使用ES6 class语法定义一个组件时，通常的做法是将事件处理函数声明为class中的方法。

```jsx
class Toggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggleOn: true
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState(state => {
            isToggleOn: !state.isToggleOn
        })
    }
    render() {
        return (
        	<button onClick={this.handleClick}></button>
        )
    }
}
ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

在JavaScript中，class的方法默认不会绑定**this**。

## 向事件处理程序传递参数

​		通常我们会为事件处理函数传递额外的参数。

```jsx
<button onClick={e => this.deleteRow(id, e)}></button>
<button onClick={this.deleteRow.bind(this, id)}></button>
```

这两种情况下，React的事件对象e都会被作为第二个参数传递。如果通过箭头函数的形式，事件对象e必须显式地进行传递，而通过bind的方式，事件对象e以及更多的参数将会被隐式地传递。

# 条件渲染

​		在React中，可以创建不同的组件来封装各种你需要的UI。然后依据应用的不同状态，只渲染对应状态下的部分内容。使用JavaScript的**if**运算符或者**条件运算符**创建元素来表现当前的状态，然后让React根据它们来更新UI。

```jsx
function Greeting(props) {
    const isLogged = props.isLogged
    if (isLogged) {
        return <UserGreeting />
    }
    return <GuestGreeing />
}
ReactDOM.render(
	<Greeting isLogged={false} />,
    document.getElementById('root')
)
```

## 元素变量

​		可以使用变量来储存元素，有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。

```jsx
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

## 与运算符&&

​		通过花括号包裹代码，可以在JSX中嵌入表达式。

```jsx
function MailBox(props) {
    const messages = props.messages
    return (
    	<div>
        	{
                messages.length > 0 &&
                <h2>You have {messages.length} unread messages</h2>
            }
        </div>
    )
}
const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox messages={messages} />,
  document.getElementById('root')
);
```

之所以能这样做，是因为在JavaScript中，true&&expression总是返回expression，而false&&expression总是返回false。因此，如果条件是true，&&右侧的元素就会被渲染，如果是false，React会忽略并跳过它。

## 三目运算符

​		另一种内联条件渲染的方法是使用JavaScript中的三目运算符condition ？true ： false。

```jsx
render(
	const isLogged = this.state.isLogged
    return (
		<div>The user is {isLogged ? 'current' : 'not'}</div>
	)
)
```

## 阻止条件渲染

​		在极少数情况下，可能希望隐藏组件，即使它已经被其他组件渲染。可以让render()方法直接返回null，而不进行任何渲染。

```jsx
function Warning(props) {
    if (!props.warn) {
        return null
    }
    return (
    	<div className="warning">Warning!</div>
    )
}
class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showWarning: true
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState(state => {
            showWarning: !state.showWarning
        })
    }
    render() {
        return (
        	<div>
            	<Warning warn={this.state.showWarning}
            </div>
        )
    }
}
ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

在组件的render方法中返回null并不会影响组件的生命周期。例如，上例中，componentDidUpdate方法依然会被调用。

# 列表Key

## 渲染多个组件

​		可以通过使用**{}**在JSX内构建一个元素集合。下面使用JavaScript的map()方法遍历numbers数组。将数组中的每个元素变成\<li>标签，最后将得到的数组赋值给listItems。

```jsx
const number = [1, 2, 3, 4, 5]
const listItems = numbers.map(number => {
    <li>{number}</li>
})
ReactDOM.render(
	<ul>{listItems}</ul>,
    document.getElementById('root')
)
```

## Key

​		Key帮助React识别哪些元素改变了，比如被添加或者删除，因此你应当给数组中的每一个元素赋予一个确定标识。

一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常我们使用数据中的id来作为元素的key。当元素没有确定id的时候，万不得已可以使用元素索引index作为key。

# 组合VS继承

​		React有十分强大的组合模式。推荐使用组合而非继承来实现组件间的代码重用。

## 包含关系

​		有些组件无法提前知晓它们子组件的具体内容。在Sidebar和Dialog等展现通用容器的组件中特别容易遇到这种情况。建议这些组件使用一个特殊的children prop来将他们的子组件传递到渲染结果中。

```jsx
function Border(props) {
    return (
    	<div className={props.color}>
        	{props.children}
        </div>
    )
}
```

```jsx
function Welcome() {
    return (
    	<Border color="blue">
        	<h1 className="Dialog-title">
              Welcome
            </h1>
            <p className="Dialog-message">
              Thank you for visiting our spacecraft!
            </p>
        </Border>
    )
}
```

**\<Border>**JSX标签里面的所有内容都会作为一个children prop传递给**\<Border>**组件。因为**\<Border>**将{props.children}渲染在一个\<div>中，被传递的这些子组件最终都会出现在输出结果中。

​		少数情况下，可能需要在一个组件中预留出几个“洞”。这种情况下，我们可以不使用children，而是自行约定：将所需内容传入props，并使用相应的prop。

```jsx
function Split(props) {
    return (
    	<div className="SplitPane">
        	<div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    )
}
function App() {
    return (
    	<Split left={Concats} right={Chat}/>
    )
}
```

\<Concats /> 和 \<Chat />之类的React元素本质上就是对象，所以你可以把它们当做props，像其他数据一样传递。在React中，你可以将任何东西作为props进行传递。

# Refs

​		Refs提供了一种方式，允许我们访问DOM节点或在render方法中创建的React元素。在典型的React数据流中，props是父组件与子组件交互的唯一方式。要修改一个子组件，需要使用新的props来重新渲染它。但是某些情况下，需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个React组件的实例，也可能是一个DOM元素。

## 何时使用Refs

 + 管理焦点，文本选择或媒体播放。
 + 触发强制动画。
 + 集成第三方DOM库。

避免使用refs来做任何可以通过声明式实现来完成的事情。

## 创建Refs

​		Refs是使用React.createRef()创建的，并通过ref属性添加到React元素。在构造组件时，通常将Refs分配给实例属性，以便在整个组件中引用它们。

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }
    render() {
        return <div ref={this.ref}></div>
    }
}
```

## 访问Refs

​		当ref被传递给render中的元素时，对该节点的引用可以在ref的current属性中被访问。

```jsx
const node = this.ref.current
```

ref的值根据节点的类型有所不同：

+ 当ref属性用于HTML元素时，构造函数中使用React.createRef()创建的ref接收底层DOM元素作为其current属性。
+ 当ref属性用于自定义class组件时，ref对象接收组件的挂载实例作为其current属性。
+ 不能在函数组件上使用ref属性，因为他们没有实例。

```jsx
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props)
        // 创建ref来存储textInput的DOM
        this.textInput = React.createRef()
        this.focusTextInput = this.focusTextInput.bind(this)
    }
    focusTextInput() {
        // 通过current属性使用原生API使text输入框获得焦点
        this.textInput.current.focus()
    }
    render() {
        return (
        	// 把<input> ref关联到构造器里创建的textInput上
            <div>
            	<input type="text" ref={this.textInput}/>
                <input type="button" value="click" onClick={this.focusTextInput}/>
            </div>
        )
    }
}
```

React会在组件挂载时给current属性传入DOM元素，并在组件卸载时传入null值。ref会在componentDidMount和componentDidUpdate钩子触发前更新。

### class组件添加ref

​		想封装上面的CustomTextInput，来模拟它挂载之后立即被点击的操作。可以使用ref属性来获取自定义的input组件并手动调用它的focusTextInput方法。

```jsx
class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props)
        this.textInput = React.creatRef()
    }
    componentDidMount() {
        this.textInput.current.focusTextInput()
    }
    render() {
        return (
        	<CustomTextInput ref={this.textInput}/>
        )
    }
}
```

**注意：**仅在CustomTextInput声明为class时才有效。

### Refs与函数组件

​		默认情况下，不能在函数组件上使用ref属性，因为他们没有实例。如果要在函数组件中使用ref，可以使用forwardRef（与useImperativeHandle结合使用），或者将该组件转为class组件。

但是可以在函数组件内部使用ref属性，只要它指向一个DOM元素或者class组件。

```jsx
function CustomTextInput(props) {
    const textInput = useRef(null)
    function handleClick() {
        textInput.current.focus()
    }
    return (
    	<div>
        	<input type="text" ref={textInput}/>
            <input type="button" value="click" onClick={handleClick}/>
        </div>
    )
}
```

## 回调Refs

​		React也支持另一种设置refs的方式，称为回调refs。它能帮助你更精细地控制何时refs被设置和解除。不同于传递createRef()创建的ref属性，你会传递一个函数。这个函数中接收React组件实例或者DOM元素作为参数，以使它们能在其他地方被存储和访问。

```jsx
class Custom extends React.Component {
    constructor(props) {
        super(props)
        this.textInput = null
        this.setTextInputRef = ele => {
            this.textInput = ele
        }
        this.focusTextInput = () => {
            if (this.textInput) {
                this.textInput.focus()
           	}
        }
    }
    componentDidMount() {
        this.focusTextInput()
    }
    render() {
        // 使用ref的回调函数将DOM节点的引用存储到React实例上
       	return (
        	<div>
            	<input type="text" ref={this.setTextInputRef}/>
            </div>
        )
    }
}
```

React将在组件挂载时，调用ref回调函数并传入DOM元素，当卸载时调用它并传入null。在componentDidMount或componentDidUpdate触发前，React保证refs一定是最新的。

你可以在组件间传递回调形式的refs，就像你可以传递通过React.createRef()创建的对象refs一样。

```jsx
function Custom(props) {
    return (
    	<div>
        	<input ref={props.inputRef}/>
        </div>
    )
}
class Parent extends React.Component {
    render() {
        return (
        	<Custom inputRef={ele => this.inputElement = ele}></Custom>
        )
    }
}
```

### 回调Refs的说明

​		如果ref回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数null，然后第二次传入参数DOM元素。这是因为在每次渲染时都会创建一个新的函数实例，所以React清空旧的ref并设置新的。通过将ref的回调函数定义成class的绑定函数的方式可以避免。

# React.lazy

​		React.lazy函数能让你像渲染常规组件一样处理动态引入的组件。

使用前：

```jsx
import OtherComponent from './OtherComponent';
```

使用后：

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'))
```

此代码将会在组件首次渲染时，自动导入包含OtherComponent组件的包。

React.lazy接受一个函数，这个函数需要动态调用import()。它必须返回一个promise，该promise需要resolve一个default export的React组件。然后应在**Suspense**组件中渲染lazy组件，使得我们在等待加载lazy组件时做优雅降级。

```jsx
import React, { Suspense } from 'react'
const OtherComponent = React.lazy(() => import('./OtherComponent'))
function MyComponent() {
    return (
    	<div>
        	<Suspnese fallback={<div>Loading……</div>}>
            	<OtherComponent />
            </Suspnese>
        </div>
    )
}
```

fallback属性接受任何在组件加载过程中你想展示的React元素。可以将Suspense组件置于懒加载组件之上的任何位置。可以用一个Suspense组件包裹多个懒加载组件。

```jsx
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

## 异常捕获边界

​		如果模块加载失败（如网络问题），它会触发一个错误。可以通过异常捕获边界来处理这些情况。

```jsx
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

## 基于路由的代码分割

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

# 错误边界

​		组件内的JavaScript错误会导致React的内部状态被破坏，并且在下一次渲染时产生无法追踪的错误。部分UI的JavaScript错误不应该导致整个应用的崩溃。为此React16引入了错误边界。错误边界是一种React组件，这种组件可以捕获并打印发生在其子组件树任何位置的JavaScript错误，并且会渲染出备用UI，而不是渲染崩溃了的子组件树。错误边界在渲染期间，生命周期方法和整个组件树的构造函数中捕获错误。

**注意：**

错误边界无法捕获以下场景中产生的错误：

+ 事件处理
+ 异步代码
+ 服务端渲染
+ 自身抛出的错误

如果一个class组件中定义了**static getDerivedStateFromError()**或**componentDidCatch()**这两个生命周期方法中的任意一个时，那个它就变成一个错误边界。当抛出错误时，使用**static getDerivedStateFromError()**渲染备用UI。

```jsx
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        // 你同样可以将错误日志上报给服务器
        logErrorToMyService(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
          // 你可以自定义降级后的 UI 并渲染
          return <h1>Something went wrong.</h1>;
        }

        return this.props.children; 
    }
}
```

```jsx
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

错误边界的工作方式类似于JavaScript的catch，不同的地方在于错误边界只针对React组件。只有class组件才可以成为错误边界组件。只需要声明一次错误边界组件，就可以在整个应用中使用它。但是错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，类似于JavaScript中的catch工作机制。

# Refs转发

​		Ref转发是一项将ref自动地通过组件传递到其一子组件的技巧。

## 转发refs到DOM组件

```jsx
function FancyButton(props) {
    return (
    	<button className="FancyButton">
          {props.children}
        </button>
    )
}
```

Ref转发是一个可选特性，其允许某些组件接收ref，并将其向下传递给子组件。

```jsx
const FancyButton = React.forwardRef((props, ref) => (
	<button ref={ref}>xx</button>
))
// 可以直接获取DOM button的ref
const ref = React.createRef()
<FancyButton ref={ref}></FancyButton>
```

使用FancyButton的组件可以获取底层DOM节点button的ref。

+ 调用React.createRef创建了一个React ref并将其赋值给ref变量。
+ 通过指定ref为JSX属性，将其向下传递给<FancyButton ref={ref}>。
+ React 传递 `ref` 给 `forwardRef` 内函数 `(props, ref) => ...`，作为其第二个参数。
+ 我们向下转发该 `ref` 参数到 `<button ref={ref}>`，将其指定为 JSX 属性。
+ 当 ref 挂载完成，`ref.current` 将指向 `<button>` DOM 节点。

# Fragments

​		React一个常见的模式是一个组件返回多个元素。Fragments允许将子列表分组，而无需向DOM添加额外节点。

```jsx
render() {
    return (
    	<React.Fragment>
        	<ChildA />
            <ChildB />
            <ChildC />
        </React.Fragment>
    )
}
```

# React Hook

## Hook简介

​		Hook是React16.8的新增特性。它可以让你在不编写class的情况下使用state以及其他React特性。

```jsx
import React, { useState } from 'react'
function Example() {
    // 声明一个新的count的state变量
    const [count, setCount] = useState(0)
    return (
    	<div>
        	<span>{count}</span>
            <button onClick={() => setCount(count + 1)}></button>
        </div>
    )
}
```

Hook使你在无需修改组件结构的情况下复用状态逻辑。

## Hook概览

​		Hook是一些可以让你在函数组件里“钩入”React state以及生命周期等特性的函数。Hook不能在class组件里使用。

## State Hook

```jsx
import React, { useState } from 'react'
function Example() {
    // 声明一个叫 “count” 的 state 变量。
    const [count, setCount] = useState(0)
    return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
    )
}
```

**useState**就是一个Hook。通过在函数组件里调用它来给组件添加一些内部state。React会在重复渲染时保留这个state。useState会返回一对值：当前状态和一个让你更新状态的函数。它类似class组件的this.setState，但是它不会把新的state和旧的state进行合并。

**useState**唯一的参数就是初始state。这个初始state参数只有在第一次渲染时会被用到。

## Effect Hook

​		在React组件中执行过数据获取，订阅或者手动修改过DOM，这些操作统称为副作用。**useEffect**就是一个Effect Hook，给函数组件增加了操作副作用的能力。它跟class组件中的componentDidMount，componentDidUpdate和componentWillUnmount具有相同的用途，只是被合并成了一个API。

```jsx
import React, { useState, useEffect } from 'react'
function Example() {
    const [count, setCount] = useState(0)
    // 相当于componentDidMount和componentDidUpdate
    useEffect(() => {
        document.title = ''
    })
    return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```

当你调用useEffect时，就是告诉React在完成对DOM的更改后运行“副作用”函数。由于“副作用”函数是在组件内声明的，所以可以访问到组件的props和state。默认情况下，React会在每次渲染后调用“副作用”函数，包括第一次渲染的时候。

"副作用"函数还可以通过返回一个函数来指定如何清除副作用。

```jsx
import React, { useState, useEffect } from 'react'
function Fstatus(props) {
    const [isOnline, setIsOnline] = useState(null)
    function handleStatusChange(status) {
        setIsOnlint(status.isOnline)
    }
    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    })
    if (isOnline === null) {
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
}
```

跟useState一样，可以在组件中多次使用useEffect：

```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
}
```

通过使用Hook，可以把组件内相关的副作用组织在一起，而不是把它们拆分到不同的生命周期钩子函数里。

## Hook使用规则

​		Hook就是JavaScript函数，有两个额外的规则：

+ 只能在函数最外层调用Hook，不要在循环，条件判断或者子函数中调用。
+ 只能在React的函数组件中调用Hook，不要在其他JavaScript函数中调用。

## 自定义Hook

```jsx
import React, { useState, useEffect } from 'react'
function useFriendStatus(id) {
    const [isOnLine, setIsOnLine] = useState(null)
    function handleStatusChange(status) {
        setIsOnLine(status.isOnLine)
    }
    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(id, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(id, handleStatusChange);
        }
     })
     return isOnline;
}
```

```jsx
function FriendStatus(props) {
    const isOnLine = useFriendStatus(props.friend.id)
    if (isOnline === null) {
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
}
```

每个组件间的state是完全独立的。Hook是一种复用状态逻辑的方式，它不复用state本身。事实上Hook的每次调用都有一个完全独立的state，因此可以在单个组件中多次调用同一个自定义Hook。自定义Hook更像是一种约定而不是功能，如果函数的名字以“use”开头并调用其他Hook，我们就说这是一个自定义Hook。

## 其他Hook

​		除此之外，还有一些使用频率较低但是很有用的Hook。比如“useContext”让你不使用组件嵌套就可以订阅React的context。

# State Hook

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

等价的class示例：

```jsx
class Example extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    render() {
        return (
        	<div>
            	<span>{this.state.count}</span>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}></button>
            </div>
        )
    }
}
```

## 声明State变量

​		在函数组件中，没有this，所以不能读取this.state。但是可以直接在组件中调用useState Hook：

```jsx
import React, { useState } from 'react'
function Example() {
    // 声明一个叫 “count” 的 state 变量
  	const [count, setCount] = useState(0);
}
```

**调用useState方法时做了什么？**它定义一个“state变量”。

**useState需要哪些参数？**useState方法里面唯一的参数就是初始state。不同于class的是，可以按照需要使用的数字或字符串对其进行赋值，而不一定是对象。

**useState方法的返回值是什么？**返回值为：当前state以及更新state的函数。需要成对获取它们。

## 读取State

​		当想在class组件中显示当前的count时，读取this.state.count：

```jsx
<p>You clicked {this.state.count} times</p>
```

​		在函数组件中可以直接用count：

```jsx
<p>You clicked {count} times</p>
```

## 更新State

​		在class组件中，需要调用this.setState()来更新count值：

```jsx
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
  </button>
```

​		在函数组件中，因为使用Hook，所以有了setCount和count变量，所以不需要this:

```jsx
<button onClick={() => setCount(count + 1)}>
    Click me
</button>
```

# Effect Hook

​		Effect Hook可以让你在函数组件中执行副作用操作。

```jsx
import React, { useState, useEffect } from 'react'
function Example() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        document.title = count
    })
    return (
    	<div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
    )
}
```

数据获取，设置订阅以及手动更改React组件中的DOM都属于副作用。可以把useEffect Hook看做是componentDidMount，componentDidUpdate和componentWillUnmount这三个生命周期函数的组合。

在React组件中有两种常见的副作用操作：需要清除的和不需要清除的。

## 无需清除的effect

​		有时候，只想在React更新DOM之后运行一些额外的代码。比如发送网络请求，手动变更DOM，记录日志等。

使用Class组件的示例：

```jsx
class Example extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    componentDidMount() {
        document.title = this.state.count
    }
    componentDidUpdate() {
        document.title = this.state.count
    }
    render() {
        return (
          <div>
            <p>You clicked {this.state.count} times</p>
            <button onClick={() => this.setState({ count: this.state.count + 1 })}>
              Click me
            </button>
          </div>
        );
    }
}
```

使用Hook的示例

```jsx
import React, { useState, useEffect } from 'react'
function Example() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        document.title = count
    })
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}
```

**useEffect做了什么？**通过使用这个Hook，告诉React组件需要在渲染后执行某些操作。React会保存你传递的函数（被称为effect），并且在执行DOM更新之后调用它。

**为何在组件内部调用useEffect？**将useEffect放在组件内部让我们可以在effect中直接访问count state变量。

**useEffect会在每次渲染后都执行吗？**默认情况下，它在第一次渲染之后和每次更新之后都会执行。

每次重新渲染，都会生成新的effect，替换掉之前的。与componentDidMount和componentDidUpdate不同，使用useEffect调度的effect不会阻塞浏览器更新屏幕，这让应用看起来响应更快。大多数情况下，effect不需要同步地执行。

## 需要清除的effect

​		有一些副作用是需要清除的。例如订阅外部数据源。

使用Class组件的示例：

```jsx
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

使用Hook的示例：

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

**为何要在effect中返回一个函数？**这是effect可选的清除机制。每个effect都可以返回一个清除函数。

**React何时清除effect？**React会在组件卸载的时候执行清除操作。

# Hook规则

+ 只在最顶层使用Hook。

不要在循环，条件判断或嵌套函数中调用Hook，确保总是在你的React函数的最顶层调用它们。

+ 只在React函数中调用Hook。
  + 在React的函数组件中调用Hook。
  + 在自定义Hook中调用其他Hook。

# 自定义Hook

​		通过自定义Hook，可以将组件逻辑提取到可重用的函数中。

## 提取自定义Hook

​		自定义Hook是一个函数，其名称以“use”开头，函数内部可以调用其他Hook。

```jsx
import { useState, useEffect } from 'react'
function useStatus(id) {
    const [isOnLine, setIsOnLine] = useState(null)
    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline)
        }
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        }
    })
    return isOnLine
}
```

## 使用自定义Hook

```jsx
function FriendStatus(props) {
    const isOnLine = useFriendStatus(props.id)
    if (isOnline === null) {
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
}
```

```jsx
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.id)
  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  )
}
```

# React高阶组件

​		高阶组件HOC是React中用于复用组件逻辑的一种高级技巧。高阶组件是参数为组件，返回值为新组件的函数。

```jsx
const EnhancedComponent = higherOrderComponent(wrappedComponent)
```

组件是将props转换为UI，而高阶组件是将组件转换为另一个组件。

```jsx
function withSub(WrappedComponent, selectData) {
    return class extends React.Component {
        constructor(props)
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            data: selectData(DataSource, props)
        }
        componentDidMount() {
          // ...负责订阅相关的操作...
          DataSource.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
          DataSource.removeChangeListener(this.handleChange);
        }
        handleChange() {
          this.setState({
            data: selectData(DataSource, this.props)
          });
        }
    	render() {
            return <WrappedComponent data={this.state.data} {...this.props}/>
        }
    }
}
```

HOC不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC通过将组件包装在容器组件来组成新组件。HOC是纯函数，没有副作用。

被包装组件接收来自容器组件的所有prop，同时也接受你一个新的用于render的data prop。

## 不改变原始组件，使用组合

不要试图在HOC中修改组件原型。HOC不应该修改传入的组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能：

```jsx
function logProps(WrappedComponent) {
    return class extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('Current props: ', this.props);
      		console.log('Previous props: ', prevProps);
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
}
```

## 约定：将不相关的props传递给被包裹组件

​		HOC为组件添加特性，自身不应该大幅改变约定。HOC返回的组件与原组件应该保持类似的接口。HOC应该透传与自身无关的props，大多数HOC都应该包含一个类似于下面的render方法：

```jsx
render() {
    // 过滤掉非此HOC额外的props，且不进行透传
    const { extraProp, ...passProps } = this.props
    // 将props注入到被包装的组件中
    // 通常为state的值或者实例方法
    const injectedProp = someStateOrMethod
    return (
    	<WrappedComponent injectedProp={injectedProp} {...passThroughProps}/>
    )
}
```

## 约定：最大化可组合性

## 约定：包装显示名称以便轻松调试

## 注意事项

### 不要在render中使用HOC

### 务必复制静态方法

### Refs不会被传递

​		虽然高阶组件的约定式将所有props传递给被包装组件，但对于ref并不适用。因为ref实际上并不是一个prop，就像**key**一样，它由React专门处理。如果将ref添加到HOC的返回组件中，则ref引用指向容器组件，而不是被包装组件。



























