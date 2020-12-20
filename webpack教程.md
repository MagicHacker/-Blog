# 概念

​		本质上，webpack是一个现代JavaScript应用程序的静态模块打包器。当webpack处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle。

# context

​		context是webpack编译时的基础目录，是一个绝对路径的字符串，用于从配置中解析入口entry和**loader**。在配置了context字段之后，webpack在寻找相对路径的文件时会以context为根目录。context默认为执行启动webpack时所在的当前工作目录。如果想改变context的默认配置，则可以采用如下配置：

```javascript
module.exports = {
    context: path.resolve(__dirname, 'src')
}
```

​		**注意：**一旦设置了context，那么在配置entry的时候，就需要相对于context配置的路径去设置。

这样的好处是webpack配置可以独立于工程目录。例如在分离开发环境和生产环境的配置文件的时候，一般把webpack.config.js放到build文件夹下，此时entry不用相对于build目录来配置，只需要根据context的设置来配置即可。

# entry入口

​		entry即入口，指示webpack应该使用哪个模块来作为构建起其内部依赖图的开始。进入entry后，webpack会找出有哪些模块和库是entry直接或间接依赖的。可以通过在webpack配置文件中配置entry属性，来指定一个入口（或多个入口）。默认值为./src。

## 单个入口语法

​	用法：`entry: string|Array\<string\>`

webpack.config.js

```js
module.exports = {
	entry: './src/index.js', // 入口文件
    output: { // 输出的文件
        filename: 'bundle.js', // 输出的文件名
        path: path.resolve(__dirname, 'dist') // 输出的文件地址
    }
}
```

entry属性的单个入口语法，是下面的简写:

```js
module.exports = {
	entry: { // 入口文件
		main: './src/index.js'
	},
    output: { // 输出的文件
        filename: 'bundle.js', // 输出的文件名
        path: path.resolve(__dirname, 'dist') // 输出的文件地址
    }
}
```

## 对象语法

当你想要构建多页应用的时候，可以通过对象的语法告诉webpack一次性构建出多个bundle文件。

用法：`entry: {[entryChunkName: string]: string|Array<string>}`

### key为普通字符串

entry中的key值可以是简单的字符串，并且对应着output.filename配置中的[name]变量。

```js
module.exports = {
	entry: {
        main: "./src/index.js",
        print: "./src/print.js"
      },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    }
}
```

上述配置对应的打包结果：

![image-20201026231436772](https://tva1.sinaimg.cn/large/0081Kckwly1gk3560plraj30bz05y3z3.jpg)

![image-20201026231511179](https://tva1.sinaimg.cn/large/0081Kckwly1gk356ix1obj308701ujr8.jpg)

**注意：**构建多页面应用而使用对象语法，最终是要构建出多个bundle文件的，所以在output中不能指定某一个文件，否则无法构建成功而报错。

### key为路径字符串

​	entry中的key值可以是路径字符串，此时webpack会自动生成路径目录，并将路径作为[name]。

```javascript
module.exports = {
  entry: {
    main: "./src/index.js",
    'path/entry/print': "./src/print.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
}
```

对应的打包结果为：

![image-20201026232005249](https://tva1.sinaimg.cn/large/0081Kckwly1gk35blt2l9j308202g746.jpg)

![image-20201026232029843](https://tva1.sinaimg.cn/large/0081Kckwly1gk35c2cqqjj30gp061js5.jpg)

### value为普通字符串

​	value为普通字符串就是普通的路径字符串，即开发者自己开发的代码。参考上面的例子即可，此处不再赘述。

### value为npm模块

​	value的值可以为npm模块，将npm模块作为单独的入口去打包。比如lodash。

```javascript
module.exports = {
  entry: {
    main: "./src/index.js",
    'vendor': "lodash"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
}
```

​	对应的打包结果为：

![image-20201026234053964](https://tva1.sinaimg.cn/large/0081Kckwly1gk35xa1bg3j30jb05jdgk.jpg)

![image-20201026234111456](https://tva1.sinaimg.cn/large/0081Kckwly1gk35xkndidj307m01va9x.jpg)

![image-20201026234133043](https://tva1.sinaimg.cn/large/0081Kckwly1gk35xxugcnj30mx094jt6.jpg)



### 分离应用程序和第三方库入口

```javascript
module.exports = {
  entry: {
    main: './src/app.js',
    vendor: './src/vendor.js'
  },
  output: {
    filename: '[name].bundle.js'
  }
};
```

这样可以在vendor.js中存入不经常修改的必要的库或者文件，然后将他们打包成单独的chunk，这样使浏览器可以独立地缓存他们，从而减少了加载时间。

## 数组语法

​		可以使用数组为一个入口指定多个文件。一般情况下，数组中引入的文件是没有相互依赖关系的，但是基于某种原因需要将它们打包在一起，最后webpack会将数组中最后一个模块的module.exports作为入口模块的module.exports导出。

```javascript
module.exports = {
  entry: {
    main: ["./src/index.js", './src/print.js']
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
}
```

![image-20201026235604690](https://tva1.sinaimg.cn/large/0081Kckwly1gk36d1v5saj30d004y3yy.jpg)

![image-20201026235618859](https://tva1.sinaimg.cn/large/0081Kckwly1gk36daw49yj307u01dmwz.jpg)

# output出口

​		output属性告诉webpack在哪里输出它所创建的bundles，以及如何命名这些文件，默认值为./dist。

## 基本配置

```javascript
module.exports = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "dist")
  }
}
```

filename：用于配置输出文件的文件名。

path：用于配置文件的输出路径，是一个绝对路径。

## 多个入口entry

```javascript
module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "dist")
  }
}
```

## 常用API

### chunkFilename（待验证）

​		chunkFilename是指未被放在entry中，但却又需要被打包出来的**chunk**文件的名称。一般来说，这个**chunk**文件指的就是要懒加载的模块。默认使用[id].js或从output.filename中推断出的值([name]会被预先替换为[id]或[id].)。

​		webpack的异步模块默认是没有名字的，同时由于没有在异步模块加载的时候显示的指定chunkFilename，webpack就会把[name]替换为chunk文件的[id]，一个自增的id号。可以通过import(/\*webpackChunkName: "test123"\*/ 'index.js')来为设置webpack的chunkFilename中的[name]占位符。

### filename

​		filename用于设置输出的bundle的名称。bundle将被写入到output.path选项指定的目录下。

#### 普通字符串

​		filname的值是普通的字符串就会输出固定名称的文件，如果filename的值是路径字符串会输出带有路径的文件。

```javascript
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: "./index.js"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
}
```

![image-20201029231700913](https://tva1.sinaimg.cn/large/0081Kckwly1gk6m3d9a1mj307j01gjr6.jpg)

或者是路径字符串：

```javascript
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: "./index.js"
  },
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist")
  }
}
```

![image-20201029231831107](https://tva1.sinaimg.cn/large/0081Kckwly1gk6m4w3l02j307b01cgle.jpg)

#### 占位符字符串

​		在webpack配置中，开发者大多使用占位符的形式，因为其构建灵活，常用的占位符如下：

+ [name]：模块的名称，即entry的key值（main，index，home，app之类的）。
+ [id]：模块的标识符，即webpack打包过程中生成的内部的chunk id。
+ [hash]：模块标识符的hash。
+ [chunkhash]：chunk内容的hash。

​		[hash] 和 [chunkhash] 的长度可以使用[hash:16] (默认为 20) 来指定，或者通过output.hashDigestLength在全局配置长度。

​		[hash]是整个项目的hash值，其根据每次编译的内容计算得到，只要修改文件就会导致整个项目构建的hash值发生改变。在一个项目中会打包很多资源，但是[hash]会让所有资源都使用同一个hash。一旦我只修改某一个文件，打包后就会造成所有文件的hash值都会改变，会导致未曾修改的文件的hash值变化，进一步会导致未修改的文件在浏览器的缓存失效了。因此[hash]无法实现静态资源在浏览器上的长效缓存，[hash]可以用在开发环境，不适用于生产环境。

​		[chunkhash]是根据不同的入口文件（entry）进行依赖文件解析，构建对应的chunk，生成相应的chunkhash。如果在某一入口文件创建的关系依赖图上存在文件内容发生了变化，那么相应的入口文件的chunkhash才会发生变化，否则chunkhash就不会变化，所以一般在项目中会把公共库和其他文件拆开，并把公共库代码拆分到一起进行打包，因为公共库的代码变动较少，这样可以实现公共库的长效缓存。

​		[contenthash]使用chunkhash还存在一个问题，当一个JS文件引入了CSS文件（import 'xxx.css'），打包构建后它们的chunkhash值是相同的，因此如果更改了JS文件的内容，即使CSS文件内容没有更改，那么与其JS关联的CSS文件的chunkhash也会跟着改变，这样就会导致未改变的CSS文件的缓存失效了。针对这种情况，我们可以使用mini-css-extract-plugin（后面讲插件的时候会单独讲解该插件的内容）插件将CSS从JS文件中抽离出来并使用contenthash，来解决上述问题。

### path

​		path用来指定webpack打包构建的最终输出的目录，必须是一个绝对路径。

### publicPath（待补充）

​		webpack提供一个非常有用的配置，该配置能帮你为项目中的所有资源指定一个基础路径，它被称为公共路径publicPath。这里所说的所有资源的基础路径是指项目中应用CSS，JS，图片等资源的时候的一个基础路径，这个基础路径要配合具体资源的指定路径使用，所以其实打包后的资源访问路径可以如下表示：

静态资源最终访问路径 = output.publicPath+资源loader或插件等配置路径。

publicPath一般用来处理将静态资源部署到CDN的情况下的资源访问路径。

# mode

​		mode表示webpack当前的环境以及对不同环境的配置。默认是production（生产环境）。

```javascript
module.exports = {
  mode: 'production'
};
```

​		不同的环境，webpack内部会调用不同的内置插件对文件进行处理。

+ development：开发环境。会将process.env.NODE_ENV设置为development，启用NamedChunksPlugin和NamedModulesPlugin。
+ production：生产环境。会将process.env.NODE_ENV设置为production，启用FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin，OccurrenceOrderPlugin，SideEffectsFlagPlugin，UglifyJsPlugin。在生产环境下，webpack会自动调用UglifyJsPlugin对代码进行混淆压缩，也会优化打包后的文件。

# loader

​		loader是webpack的模块加载器，webpack将一切资源（JS，CSS，图片等）都看成是模块，然而webpack自身只支持加载JS和JSON模块，为了让webpack能够去处理其他类型的文件，就需要引入相应的loader，在import或加载模块的时候**预处理**文件，loader处理的是文件层面的资源。

## loader的使用

​		在webpack中，有三种loader的使用方式：

+ 配置（推荐）：在webpack.config.js文件中配置相应的loader。
+ 内联（不推荐）：在每个import语句中显示的指定相应的loader。
+ CLI（不推荐）：在shell命令中指定相应的loader。

### 配置的方式

​		在webpack中，通过module.rules的方式配置多个loader。示例如下：

```javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
    ]
}
```

### 内联的方式

​		可以在import语句或者其他等效于import的方式中指定loader。使用**!**将loader分开，分开的每部分都会相对于当前目录进行解析。

```javascript
import Styles from 'style-loader!css-loader?modules!./normal.css';
```

### CLI的方式

​		通过CLI的方式使用loader

```javascript
webpack --module-bind 'css=style-loader!css-loader'
```

## loader的特性

+ loader支持链式传递。loader会将前一个loader的处理结果传递给下一个loader进行处理。一组loader将按照定义的相反的顺序去执行，从空间上看就是从下到上执行，或者从右向左执行。
+ loader可以是同步的，也可以是异步的。
+ loader运行在Node.js中，并且能够执行任何可能的操作。
+ loader接收查询参数，用于对loader传递配置。
+ loader也能够使用options对象进行配置。

## 常用的loader

### babel-loader

​		在日常的开发中，很多人会使用ES6，7，8或者更高版本的JS代码，然而浏览器对这些语法的支持并不是特别友好，因此为了让新语法能够在浏览器中顺利运行，需要使用babel对JS语法进行转换，变成ES5等浏览器支持的语法，如果单纯地手动引入babel，既麻烦，又会导致文件体积过大，所以使用webpack通过babel-loader调用babel，从而在打包的时候做这种转换。

#### 安装

```json
npm i @babel-core babel-loader @babel/preset-env --save-dev
```

@babel-core是babel编译库的核心包。@babel/preset-env是babel的编译规则，通过这个包告诉babel是以什么样的转码规范去编译JS代码。

#### 用法

```javascript
module: {
    rules: [
        {
            test: /.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-env']
                }
            }
        }
    ]
}
```

options中的presets是用来配置babel的预设，即babel的编码规则。通过以上配置就可以实现babel对ES6代码的转译。

未使用babel-loader的情况：

![image-20201107183313401](https://tva1.sinaimg.cn/large/0081Kckwly1gkgsgvt539j308u02j745.jpg)

使用babel-loader的情况：

![image-20201107183452056](https://tva1.sinaimg.cn/large/0081Kckwly1gkgsij8wruj30ag02gq2u.jpg)

与上面的对比，可以很明显的看到babel-loader已经将ES6的const和箭头函数转换成ES5的语法了。

#### 其他配置项

cacheDirectory：用于设置babel编译结果的缓存，下一次编译如果文件没有修改，babel会直接读取缓存，提升babel的编译速度，默认值为false。

cacheIdentifier：默认是由 @babel/core 版本号，babel-loader 版本号，.babelrc文件内容（存在的情况下），环境变量 `BABEL_ENV` 的值（没有时降级到 `NODE_ENV`）组成的一个字符串。可以设置为一个自定义的值，在 identifier 改变后，来强制缓存失效。

cacheCompression：默认值为 true。当设置此值时，会使用 Gzip 压缩每个 Babel transform 输出。

#### 进阶

​	babel默认只会对新语法进行转译，例如箭头函数，let，const，class等。但是不会转译新的API，比如promise，map，set等。

为了让我们的代码能够更好的支持ES6，就需要使用@babel/polyfill。polyfill是一个针对ES6环境的shim，实际上@babel/polyfill只是简单的把core-js和regenerator runtime包装了一下。使用@babel/polyfill会把整个ES6环境引入到你的代码中。`在Babel >= 7.4.0之后@babel/polyfill已经被废弃了`。

```
npm install --save @babel/polyfill
```

第一种使用方式是在页面中直接：

```js
import '@babel/polyfill'
```

但是直接使用@babel/polyfill会有两个问题：

1、@babel/polyfill会造成代码非常冗余，导致打包后的体积过大。

引入前：

![image-20201107230213631](https://tva1.sinaimg.cn/large/0081Kckwly1gkh08q5dp6j30hd029glw.jpg)

引入后：

![image-20201107230304470](https://tva1.sinaimg.cn/large/0081Kckwly1gkh09ljconj30gv03a0t6.jpg)

为了解决这个问题，我们可以在配置@babel/preset-env时，添加useBuiltIns参数。

```javascript
module: {
    rules: [
        {
            test: /.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [['@babel/preset-env', {
                        useBuiltIns: 'usage'
                    }]]
                }
            }
        }
    ]
}
```

useBuiltIns的参数支持三个值：

+ entry: 只支持引入一次@babel/polyfill，如果多次引用会抛出错误。
+ usage：只会在用到ES6的API的文件里引用。
+ false：默认值，会将@babel/polyfill整体引入。

2、@babel/polyfill会污染全局环境，因为新的API都是由@babel/polyfill引入到全局环境中的，一般在写工具类库的时候会比较在意这个问题。

为了解决这个问题我们引入@babel/plugin-transform-runtime和@babel/runtime，@babel/runtime-corejs2，@babel/runtime-corejs3。

@babel/runtime：由Babel提供的polyfill套件，由core-js和regenerator组成。提供了一些辅助函数，ES6转码时，babel会需要一些辅助函数，例如_extend。

@babel/plugin-transform-runtime：transform-runtime可以自动化地将@babel/runtime中的polyfill模块注入到对应的文件中。

```javascript
module: {
    rules: [
        {
            test: /.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [['@babel/preset-env', {
                        useBuiltIns: 'usage'
                    }]],
                    "plugins": [
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                "absoluteRuntime": false,
                                "corejs": 2,
                                "helpers": true,
                                "regenerator": true,
                                "useESModules": false
                            }
                        ]
                    ]
                }
            }
        }
    ]
}
```

在@babel/plugin-transform-runtime配置中需要配置corejs选项，它有三个参数：

+ false：需要安装@babel/runtime。
+ 2：需要安装@babel/runtime-corejs2
+ 3：需要安装@babel/runtime-corejs3

配置好@babel/plugin-transform-runtime相应的内容之后，就可以将@babel/polyfill相关的内容全部删掉，因为

@babel/plugin-transform-runtime对ES6代码已经做了处理了。

#### 最后

可以把在babel-loader配置项中关于babel的配置单独写到.babelrc配置文件中进行维护，`注意`cacheDirectory参数是babel-loader的配置项，不是babel的配置项。

.babelrc：

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": 2,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ]
}
```

### css-loader

​		css-loader是webpack用来处理项目中的CSS的loader，它会对`@import`和`url()`（CSS中的图片引入，同时还需要url-loader/file-loader处理图片）进行处理。一般用于处理在一个CSS文件中通过@import引入另一个CSS文件，或者在一个JS文件中通过import/require引入一个CSS文件，css-loader会将样式打包进bundle.js文件中，但是不会将CSS插入到HTML中。

![image-20201109000028740](https://tva1.sinaimg.cn/large/0081Kckwly1gki7jp089yj30ok01zglr.jpg)

#### 安装

```bash
npm install --save-dev css-loader
```

#### 用法

```javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader','css-loader']
        }
    ]
}
```

通常情况下，css-loader与style-loader一起配合使用。

#### 配置项

+ url：默认值为true。启用/禁用url/image-set的解析，控制url（）函数的解析，绝对路径url不会被解析。

+ import：默认值为true。启用/禁用@import的解析，@import中的绝对路径的url会被移到运行时去处理。

+ modules：默认值为false。启用/禁用CSS模块规范，设置为false会提升性能，因为避免了CSS modules特性的解析。
+ importLoaders：用于设置在【css-loader处理@import的资源文件之前】使用多少个loader。比如：

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

```css
// a.less
body {
    font-size: 14px;
}

// b.less
body {
    background-color: #f00;
}
// index.less
@import "./a.less";
@import "./b.less";

body {
    color: #0f0;
}
```

当css-loader处理index.less文件时，执行到@import语句时，importLoaders设置了1，所以a.less和b.less会先交给postcss-loader处理，不会交给less-loader处理，如果设置为2，则a.less和b.less文件会交给postcss-loader和less-loader处理。如果不设置importLoaders或者将其设置为0，则a.less和b.less不会被postcss-loader和less-loader处理。所以importLoaders设置的目的就是让@import进来的文件也能够经过相关loader去处理。

### style-loader

​		style-loader用来通过`<style>`标签将CSS插入到HTML文件中。通常，style-loader与css-loader一起使用。先使用css-loader处理项目中的CSS，然后再使用style-loader将处理过的CSS通过`<style>`标签插入到HTML中。

#### 安装

```bash
npm install --save-dev style-loader
```

#### 用法

```javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader','css-loader']
        }
    ]
}
```

#### 配置项

+ `injectType`：类型为string，默认值为styleTag，用来设置把style插入到DOM中的方式。

+ `attributes`：类型为Object，默认值为{}。用来添加自定义属性到插入的标签中。

+ `insert`：类型为string/function，默认值为head。用于在指定的位置插入标签。默认情况下，style-loader会把`<style>或者<link>`标签添加到`<head>`标签的尾部，这会使style-loader处理的CSS比原本在`<head>`中已经存在的CSS具有更高的优先级。

+ `esModule`：类型为Boolean，默认值为true。一般情况下，style-loader使用ES modules的语法生成JS模块。

+ `modules`：类型为Object。默认值为undefined。此参数用来配置CSS模块。

### less-loader

​		webpack通过less-loader将less编译成CSS。

#### 安装

```bash
npm install less less-loader --save-dev
```

#### 用法

```javascript
module: {
    rules: [
        {
            test: /\.less$/,
            loader: 'less-loader'
        }
    ]
}
```

### file-loader

​		file-loader将文件中的`import/require()`解析成url并且将文件输出到output指定的目录中，并返回文件的public url。默认情况下，生成文件的文件名是根据文件内容生成的哈希值加上原来文件的扩展名。file-loader不会对文件的内容做任何处理。

#### 安装

```bash
npm install file-loader --save-dev
```

#### 用法

```javascript
module: {
    rules: [
        {
            test: /\.(png|jpe?g|gif)$/,
            use: [
              {
                loader: 'file-loader'
              }
            ]
        }
    ]
}
```

#### 配置项

+ name：默认值为[hash].[ext]，用来为文件自定义文件名。
+ context：默认值为webpack.config.js的context，用于配置自定义文件的context。
+ publicPath：用于为文件配置自定义的public发布目录。
+ outputPath：用于为文件配置自定义的output输出目录。
+ useRelativePath：默认值为false，用来为每个文件生成一个相对url的context。
+ emitFile：默认值为true。如果设置为false，则只会返回public url，但不会生成相应的文件。

#### outputPath和publicPath的区别

​		outputPath只是告诉webpack将生成的结果输出到哪里，而publicPath则是被用于内嵌到CSS，HTML文件中的url的值。

### url-loader

​		url-loader用于将文件转换为base64编码 URIs。url-loader功能和file-loader类似，但在文件大小（单位byte）小于指定的限制时，返回一个base64编码的DataURL。

#### 安装

```bash
npm install url-loader --save-dev
```

#### 用法

```javascript
module: {
    rules: [
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            ]
        }
    ]
}
```

#### 配置项

+ limit：文件大小的限制，小于该值文件就会被打包成base64编码的DataURL，如果文件大小大于等于该值，则默认使用file-loader来处理，并且全部查询参数会传递给它。
+ mimetype：用于设置文件的MIME类型。如果未指定，则使用文件扩展名来查找对应的MIME类型。
+ fallback：用于设置当url-loader加载的文件大于限制时，所对应的loader。

### raw-loader

​		允许将文件作为字符串的形式导入。主要用来在项目中导入的JSON，txt，html等文件。

#### 安装

```bash
npm i raw-loader --save-dev
```

#### 用法

```javascript
module: {
    rules: [
        {
            test: /\.json$/,
            use: [
                {
                    loader: 'raw-loader'
                }
            ]
        }
    ]
}
```

# plugins

​		插件是用来扩展webpack的功能的，它们会在构建过程的整个生命周期中生效，执行相关的任务。

## 常用的plugin

### html-webpack-plugin

​		html-webpack-plugin用于生成一个html文件，并将最终生成的静态文件自动插入其中。它默认会在`output.path`的目录下创建一个`index.html`文件，并在文件中插入`script`标签，标签的`src`为`output.filename`。

#### 安装

```bash
npm i --save-dev html-webpack-plugin
```

#### 用法

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html'
    })
  ]
}
```

如果是多入口的项目，就要多配置几个html-webpack-plugin。如下：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: 'index.js',
    print: 'print.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
        template: './print.html',
        filename: 'print.html'
    })
  ]
}
```

#### 配置项

+ title：用于设置document.title，在index.html中使用`<%= htmlWebpackPlugin.options.title %>`自定义网页标题。
+ filename：用于设置html文件生成的名称。默认值是index.html，可以自定义文件名称，也可以写文件路径，生成的文件的根路径为`output.path`的目录，同时自动引入的JS文件也会改成对应的路径，以保证正确的引入。
+ template：要生成的html文件的模板。值为文件的路径，相对于webpack.config.js的路径，同时此路径受webpack的context的影响，路径为context的路径+template的路径。
+ inject：指定webpack打包的静态资源插入到html中的位置，为`true`或`body`时会把JS文件插入到body底部，为`head`时会将JS文件插入到`<head>`标签中。
+ meta：为生成的html文件注入`meta`信息，例如：`{viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}`。
+ minify：压缩html文件。一般情况下是在生成环境下才会启用压缩。值为`{collapseWhitespace:true,removeComments:true,removeRedundantAttributes:true,removeScriptTypeAttributes:true,removeStyleLinkTypeAttributes:true,useShortDoctype:true}`
+ hash：设置为true会在生成的html文件中的静态资源文件末尾添加hash值。

![image-20201114000358861](https://tva1.sinaimg.cn/large/0081Kckwly1gknzqv29aej30gj01e749.jpg)

+ cache：默认值true，用于指定文件要不要缓存。
+ chunks：一般用于在打包多入口项目时，指定每个html文件只引入各自相对应的JS文件，防止html文件多引入不需要的文件。

### clean-webpack-plugin

​		该插件用于在下一次打包时清除之前打包的文件，清除的是`outpu.path`设置的文件夹。

#### 安装

```bash
npm i clean-webpack-plugin --save-dev
```

#### 用法

```javascript
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

### mini-css-extract-plugin

​		该插件会将CSS提取到单独的文件中，减少webpack的打包体积。它会为每个包含CSS的JS文件创建一个CSS文件，并且支持CSS和sourceMaps的按需加载。webpack单入口的配置，会将提取的CSS样式打包进一个CSS文件，而多入口的配置webpack会将提取的CSS样式打包到各自的CSS文件中。

#### 安装

```bash
npm install --save-dev mini-css-extract-plugin
```

#### 用法

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  }
}
```

#### 配置项

+ filename：用于设置每个输出的CSS的文件名，类似于`output.filename`可以使用各种hash。使用`[name]`占位符配置filename的时候，`[name]`的值是引用了该CSS的入口entry的值。
+ chunkFilename：用于设置非入口的chunk的文件名称，类似于`output.chunkFilename`。
+ attributes：用于设置`<link>`标签上的属性。
+ insert：在指定位置插入`<link>`标签。

#### loader配置项

​		mini-css-extract-plugin的loader有自己的配置项。如下：

+ publicPath：默认值为webpack的`output.publicPath`的值。用于为提取的CSS文件内的图片，文件等资源指定一个自定义的公共路径，多为CDN路径。
+ esModule：默认值为true。用于设置是否使用ES modules语法。
+ modules：用于配置CSS modules模块。

### copy-webpack-plugin

​		用于将单个文件或者整个目录复制到构建目录。

#### 安装

```bash
npm i copy-webpack-plugin --save-dev
```

#### 用法

新版的copy-webpack-plugin插件需要使用patterns字段。

```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  plugins: [
      new CopyWebpackPlugin([
          patterns: [
            { from: "source", to: "dest" },
            { from: "other", to: "public" },
          ]
      ])
  ]
}
```

#### 配置项

	+ from：需要复制的文件的资源。可以是路径或者glob模式匹配的文件路径。
	+ to：复制的文件资源要生成的路径。
	+ context：用来配置路径。webpack在寻找相对路径的文件时会以context为根目录。
	+ filter：用来过滤所复制的资源。
	+ toType：用来设置复制的是文件还是目录。
	+ transform：可在文件写入webpack之前修改内容。
	+ cacheTransform：配置缓存。

# webpack-dev-server

​		在构建代码并部署到生产环境之前，需要一个本地环境来运行我们开发的代码，访问webpack打包好的静态文件，我们可以使用它来调用前端代码。webpack-dev-server是webpack官方提供的一个工具，基于当前的webpack配置来快启动一个静态服务，每次修改代码保存后可以自动打包，打包输出的文件只存在于内存当中，支持自动刷新页面。

## 安装

```bash
npm i webpack-dev-server --save-dev
```

## 启动

```bash
# 使用npm scripts
"scripts": {
  "dev": "webpack-dev-server --config webpack.config.js"
}
npm run dev
# 使用CLI方式
node_modules/.bin/webpack-dev-server
```

## 配置

```javascript
module.exports = {
  entry: {
    index: 'index.js',
    print: 'print.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  devServer: {
	contentBase: path.join(__dirname, 'dist'),
    port: 8080
  }
}
```

## 配置项

+ contentBase：提供静态文件的目录地址，建议使用绝对路径。默认情况下，它将使用当前的工作目录来提供内容。
+ compress：为静态文件开启gzip压缩。
+ hot：用于开启webpack的Hot Module Replacement（HMR）功能。要完全启用HMR，需要配置webpack.HotModuleReplacementPlugin，但是如果在npm scripts中启用webpack-dev-server，同时添加了--hot参数，则webpack.HotModuleReplacementPlugin将会被自动添加。
+ inline：用于设置`HMR`的模式。默认值为true。设置为true则使用inline模式。设置为false则使用iframe模式。iframe模式是在网页中嵌入一个iframe，并将我们自己的代码注入到这个iframe中。推荐使用inline模式。
+ open：webpack-dev-server启动后自动打开浏览器。默认值为true。
+ port：webpack-dev-server监听的端口号。
+ public：用于指定静态服务的域名，默认为`http://localhost:8080/`，当你使用Nginx来做反向代理的时候，应该是该配置来指定Nginx配置使用的服务域名。
+ publicPath：用于指定构建好的静态文件在浏览器中用什么路径去访问。默认值为`/`。比如，对于一个构建好的文件bundle.js，完整的访问路径为`http://localhost:8080/bundle.js`，但是如果设置了`publicPath: 'asstes/'`，那么完整的访问路径为`http://localhost:8080/assets/bundle.js`。可以使用整个 URL 来作为 `publicPath` 的值，如 `publicPath: 'http://localhost:8080/assets/'`。如果你使用了 HMR，那么要设置 `publicPath` 就必须使用完整的 URL。建议将 `devServer.publicPath` 和 `output.publicPath` 的值保持一致。
+ proxy：用于设置代理。一般用于解决跨域问题。

```javascript
module.exports = {
  entry: {
    index: 'index.js',
    print: 'print.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  devServer: {
	proxy: {
        '/api': {
            // 匹配到路径中的api时，代理到3000端口
            // 即http://localhost:8080/api/123代理到http://localhost:3000/api/123
            target: 'http://localhost: 3000',
            // 重写路径
            // 即http://localhost:8080/api/123代理到http://localhost:3000/123
            pathRewrite: {
                '^/api': ''
            }
        }
    }
  }
}
```

+ before：用于在webpack-dev-server中定义额外的中间件，在webpack-dev-server内部所有中间件执行之前调用。可以用于拦截部分请求返回特定的内容，或者实现简单的数据Mock服务。

  ```javascript
  before(app){
    app.get('/some/path', function(req, res) {//当访问/some/path 路径时，返回自定义的json数据
      res.json({ custom: 'response' })
    })
  }
  ```

+ after：用于在webpack-dev-server中定义额外的中间件，在webpack-dev-server内部所有中间件执行之后调用。用到较少，一般用于打印日志或者做一些额外的处理。

# externals

​		externals意为webpack的外部扩展。externals选项提供了从webpack的输出的bundle文件中排除某些依赖的方法，防止将某些import的包打包到bundle中，而是在运行时再去从外部获取这些扩展依赖，减少打包的体积。使用externals配置后，webpack可以不处理这些依赖库，但是依旧可以在代码中通过CMD，AMD，window/global全局的方式访问。

比如，从CDN加载jQuery，而不是将它打包进最终的bundle文件中。配置如下：

```javascript
module.exports = {
  externals: {
    jquery: 'jQuery'
  }
};
```

```html
<script src="https://code.jquery.com/jquery-3.1.0.js"></script>
```

```javascript
import $ from 'jquery'
```

<font style="color: red">注意</font>：externals配置对象中，属性名为模块名，属性值为变量名。这里jquery代表的是真实的jquery模块名，jQuery代表的是全局变量名，可随意定义，比如定义成$。

## externals支持的模块上下文

​		externals支持以下模块上下文（module context）：

+ root：可以通过一个全局变量访问library，例如通过script标签。
+ CommonJS：可以将library作为一个CommonJS模块访问。
+ CommonJS2：和上面CommonJS类似，但导出的是module.exports.default。
+ amd：类似于CommonJS，但使用的是AMD模块方案。

```javascript
externals : {
  lodash : {
    commonjs: "lodash",
    amd: "lodash",
    root: "_"
  }
}
```

这种配置方式的意思是，lodash这个库在AMD和CommonJS模块方案中通过lodash访问，在浏览器中通过全局变量_访问。

## 不同环境设置externals的方式

1、如果在Node环境中运行，需要在externals中添加前缀CommonJS或者CommonJS2。

```javascript
externals: {
    jquery: 'commonjs jQuery'
}
```

2、如果在浏览器中运行，就不用添加什么前缀，默认就是global。

```javascript
externals: {
    jquery: 'jQuery'
}
```

# module解析

​		resolver是一个寻找模块绝对路径的库。一个模块可以作为另一个模块的依赖模块，被后者引用。比如：

```javascript
import foo from '../foo'
require('bar')
```

resolver帮助webpack从每个import/require语句中，找到需要引入到bundle中的模块代码。webpack使用enhanced-resolve来解析文件路径。

## 解析规则

​		使用enhanced-resolve，webpack能解析三种文件路径：

+ 绝对路径。由于已经获得文件的绝对路径，因此不需要再解析。
+ 相对路径。在import/require中给定的相对路径，webpack会拼接上下文路径，来生成模块的绝对路径。
+ 模块路径。

## resolve选项

​		resolve选项能够设置模块如何被解析，webpack会提供合理的默认配置。

### alias

​		配置模块路径的别名，在使用import/require时，使用模块路径的别名，来使得引入模块更加简单，同时可以使webpack更加快速精准的检索到模块，不用再递归解析依赖，提升构建速度。alias的优先级高于其他模块的解析方式。例如：

```javascript
const path = require('path')
module.exports = {
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src/')
        }
    }
}
```

```javascript
import foo from '@src/foo/index'
```

### enforceExtension

​		用于在import/require时是否让开发者强制加上文件的扩展名。默认为false。如果为true，将不允许import/require无扩展名的文件。

### extensions

​		一个字符串数组，数组的元素是文件的扩展名。webpack会尝试按照数组元素的顺序解析扩展名，使用此项会覆盖默认配置，这意味着webpack将不再尝试使用默认扩展来解析模块。如果有多个同名文件，但是扩展名不同，webpack会解析列在数组首位的扩展名文件，并跳过其余后缀。

```javascript
module.exports = {
  resolve: {
    extensions: ['.css', '.less', '.js', '.json'],
  },
};
```

引入模块时可以不带扩展名：

```javascript
import foo from './foo/index'
```

### modules（待验证）

​		告诉webpack解析模块时应该搜索的目录。

# Optimization

​		webpack的优化项。

## minimize

​		默认值为true。告知webpack使用TerserPlugin或其他在optimization.minimizer定义的插件压缩bundle。

```javascript
module.exports = {
  optimization: {
    minimize: false
  }
};
```

## minimizer

​		开发者配置一个或者多个TerserPlugin实例，覆盖默认的压缩工具。

```javascript
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // 如果在生产环境中使用 source-map，必须设置为 true
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  }
};
```

## splitChunks

​		webpack4版本之后使用optimization.splitChunks代替commonsChunkPlugin来对模块进行分割打包，将代码分离到不同的bundle中，然后可以按需加载或并行加载这些文件，合理的控制资源的加载，减少打包的体积和速度。

默认情况下，它只会影响到那些按需加载的chunks。webpack在以下场景会自动分割chunks：

+ 新的chunk被多个chunk共享，或者它来自于node_modules文件夹。
+ 新的chunk体积大于20kb（在进行min+gz）之前的体积。
+ 在按需加载chunk时，其最大并发请求的数量小于等于30。
+ 初始页面加载时并行请求的最大数量小于等于30。

### 基本使用

```javascript
module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }
    }
}
```

### 配置项

#### chunks

​		其值为`all`，`initial`，`async`，默认值为async。

+ initial：原始的拆分模块。原则就是有共用的情况下发生拆分。在这个模式下，动态引入的代码，无论如何都会走拆分逻辑（只有拆分成单独的文件才能动态引入）。对于同步引入的模块，如果有多处在共用，则抽离出来。

+ async：异步加载的模块，即动态按需加载的模块会被split。比如：

  ```javascript
  import(/* webpackChunkName: "a" */ './a.js').then(a => {
    console.log(a)
  })
  ```

+ all：包含上述两种情况。

#### minSize（待验证）

​		被抽离的模块在压缩前的体积的最小值，单位为字节，默认是20000。只有体积超过20000字节才会被抽离。

#### maxSize

​		被抽离的模块打包生成的文件大小不能超过maxSize值，如果超过了，要再对其进行分割抽取并打包成新的文件。单位为字节，默认为0，表示不限制大小。

#### minChunks

​		表示模块抽离之前被引用的次数，默认为1。超过minChunks次数的代码才会被抽离。

#### maxAsyncRequests

​		表示按需加载的最大并行请求数，默认值为6。如果拆分后导致bundle需要同时异步加载的chunk数量大于等于6个，则不会进行拆分，因为增加了请求数，得不偿失。

#### maxInitialRequests

​		表示初始化的时候最多可以有多少个并行的请求数，默认值为4。拆分后的入口文件的chunk请求数大于等于4，则不会进行拆分，因为这样增加了请求数。

#### automaticNameDelimiter

​		指定生成的模块名称的连接符。

#### name

​		指定抽离的模块的名称。默认值为true，表示自动生成文件名。

#### cacheGroups

​		用于定义chunks所属的缓存组。配置抽离模块的方案。里面的每一项都代表一个抽离模块的方案。cacheGroups可以继承/覆盖splitChunks.*中的任何选项，同时它自己独有test，priority，reuseExistingChunk，enforce等选项。cacheGroups有两个默认的组，一个是vendors，打包所有来自node_modules的模块。另一个是default，打包两个以上的chunk所共享的模块。

+ test：用来匹配要抽离的模块的资源路径或者名称，符合条件的模块就会被分配到该组。值是一个函数或者正则表达式。省略它的话会选择所有模块。
+ priority：所采用的cacheGroups的方案的优先级，数字越大优先级越高，默认值为0，一般自定义设置为负数。
+ reuseExistingChunk：表示是否复用已有的chunk。值为false/true。设置为true时，如果当前要抽取的模块，已经存在于打包生成的js文件中，则会复用该模块，而不会打包成新的chunk。
+ enforce：是否忽略外层splitChunks中配置的选项。值为false/true。设置为true时，会忽略minSize，minChunks，maxSize等配置项。



# devtool

​		控制webpack如何生成source-map。可以使用SourceMapDevToolPlugin对source-map进行更细粒度的控制。devtool的取值可以由source-map，eval，inline，cheap，module，hidden这6个关键字任意组合而成。这6个关键字每一项都代表了一种特性。

+ eval：用eval()语句包裹模块代码，使得打包后的bundle文件中的每个模块都使用eval去执行。会在文件末尾追加//@ sourceURL。
+ source-map：打包后会生成独立的.map文件，同时会在bundle文件末尾追加sourceURI指定map文件路径。
+ inline：不会产生独立的.map文件，而是把sourcemap的内容以DataURI的方式追加到bundle文件末尾。
+ hidden：不在bundle文件结尾处指出source map的信息，但是仍然会生成sourcemap，这样浏览器不会自动加载source map，避免生产环境发布sourcemap信息。
+ cheap：生成的sourcemap中不包含列信息，也不包含loader的sourcemap信息。即生成的sourcemap映射的是loader处理后的源代码。
+ module：生成的sourcemap中会包含loader的sourcemap信息，即生成的sourcemap映射的是loader处理前的源代码。

## 开发环境

​		在开发环境中我们将devtool设置为cheap-module-eval-source-map，cheap关键字会生成带有行信息的比较详细的sourcemap，module会包含babel等库生成的sourcemap信息，同时生成的bundle文件体积小，eval关键字使得打包构建的速度很快，source-map保证了会单独生成.map文件。

## 生产环境

​		在生产环境中将devtool设置为hidden-source-map，这样会生成详细的sourcemap，但不会把sourcemap暴露出去。

# DllPlugin和DllRefrencePlugin

​		DllPlugin和DllRefrencePlugin用来拆分模块，同时大幅度提升构建速度。DllPlugin将不常变动的模块单独打包成一个bundle，同时生成一个manifest.json文件，DllRefrencePlugin通过manifest.json文件把依赖的模块的名称映射到模块id上，在需要的时候通过内置的\__webpack\__require\__函数来require相应的模块。

## 为什么使用DllPlugin和DllRefrencePlugin

​		通常来说，我们的代码可以简单的区分为业务代码和第三方库。如果不做处理，每次构建时都需要把所有的代码重新构建一次，耗费大量的时间。然后大部分情况下，很多第三方库的代码并不会发生变更（除非是版本升级），这时就可以用到dll：把复用性较高的第三方模块打包到动态链接库中，在不升级这些库的情况下，动态库不需要重新打包，每次构建只重新打包业务代码。

## DllPlugin配置项

+ context：manifest.json文件生成的基础路径，默认为webpack.context的值。
+ format：格式化manifest.json，默认值为false。如果设置为true，将格式化manifest.json文件。
+ name：暴露出来的动态链接库全局变量名名称，需要与output.library保持一致。
+ path：manifest.json文件生成的绝对路径。
+ entryOnly（不常使用）：默认值为true，如果为true，则仅暴露入口。*建议 DllPlugin 只在* `entryOnly: true` 时使用，否则 DLL 中的 tree shaking 将无法工作，因为所有 exports 均可使用。
+ type：dll打包出来的bundle的类型。

## DllRefrencePlugin配置项

+ context：引入manifest.json文件的基础路径，默认为webpack.context的值。
+ extensions：用于解析dll bundle中模块的扩展名。
+ manifest：用于引入dll生成的manifest.json文件。

## 用法

​		使用Dll时，构建过程分为两个：dll的构建和webpack主构建。因此需要使用两个配置文件：webpack.config.js和webpack.dll.config.js。先通过webpack.dll.config.js构建出dll bundle，然后再使用webpack主构建进行打包。

### webpack.dll.config.js

```javascript
const path = require('path')
module.exports = {
    entry: {
        jquery: ['jquery']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './dist/dll'),
        // 存放相关的dll文件的全局变量名
        library: '[name]_dll'
    },
    plugins: [
        new webpack.DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      		// 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
            name: '[name]_dll',
            path: path.resolve(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}
```

### webpack.config.js

```javascript
const path = require('path')
module.exports = {
    plugins: [
        new webpack.DllRefrencePlugin({
            manifest: require('./dist/jquery.manifest.json')
        })
    ]
}
```

### 在入口html文件中引入

​		由于生成的dll暴露出的是全局函数，因此需要在入口的html中引入。

```html
<body>
    <!--引如dll文件-->
    <script src="../../dist/dll/jquery.dll.js" ></script>
</body>
```

# webpack-chain

​		通过一个链式的API来修改2~4版本的webpack的配置。webpack-chain通过提供链式或顺流式的API创建和修改webpack配置，不用再像以前一样写死一个webpack配置对象。API的key部分可以由用户指定的名称引用。目前vue-cli内部的webpack配置就是通过webpack-chain来维护的。

## 安装

```bash
## npm
npm install --save-dev webpack-chain
## yarn
yarn add --dev webpack-chain
```

## 用法

```javascript
const path = require('path')
// 导入webpack-chain模块，该模块导出了一个用于创建webpack配置API的单一构造函数
const Config = require('webpack-chain')
// 对单一构造函数创建一个新的配置实例
const config = new Config()
// 使用链式API改变配置
config
	// 修改entry配置
	.entry('app')
	.add('src/index.js')
	// 返回上层的实例对象
	.end()
	// 修改output配置
	.output
	.path('dist')
	.filename('[name].bundle.js')

// 设置别名
config.resolve.alias
	.set('@src', path.resolve(__dirname, 'src'))

// 使用loader
config.module
	.rule('lint')
	.include
	.add('src')
	.end()
	// 创建具名规则
	.use('eslint')
	.loader('eslint-loader')
	.options({
    	rules: {
            semi: 'off'
        }
	})

// 修改loader选项
config.module
	.rule('compile')
	.use('babel')
	.tap(options => {
    plugins: ['@babel/plugin-proposal-class-properties']
})

// 使用plugin
config
	.plugin('clean')
	.use(CleanPlugin, [['dist'], {root: '/dir'}])

// 使用when做条件配置
config
	.when(process.env.NODE_ENV === 'production',
      config => config.plugin('minify').use(BabiliWebpackPlugin))
// 合并配置
config.merge({devtool: 'source-map'})

// 导出配置对象
module.exports = config.toConfig()
```

使用toString()方法查看webpack-chain生成的对应的webpack配置

```javascript
config
    .module
    .rule('compile')
    .test(/\.js$/)
    .use('babel')
    .loader('babel-loader')
config.toString();
/**
{module:
	{rules:
		[
		/* config.module.rule('compile') */
            {
                test: /\.js$/,
                use: [
                /* config.module.rule('compile').use('babel') */
                    {loader: 'babel-loader'}
                ]
            }
        ]
}}
*/
```

# webpack原理简述

​		webpack大致的处理流程：初始化参数——>开始编译——>确定入口——>编译模块——>完成模块的编译——>输出资源——>输出完成

+ 初始化参数：从配置文件（默认为webpack.config.js）和shell语句中读取与合并参数，得出最终的参数。这个过程中还会执行配置文件中的插件实例化语句new Plugin()。
+ 开始编译：用上一步得到的参数初始化compiler对象，加载所有配置的插件plugin，通过对象的run方法开始执行编译。compiler负责文件监听和启动编译。
+ 确定入口：根据配置中的entry找出所有的入口文件。
+ 编译模块：从入口文件出发，调用配置的loader对模块进行编译，再找出该模块所依赖的模块，再递归本步骤直到所有入口依赖的文件都经过处理。
+ 完成编译：经过前四步之后，得到了每个模块被编译之后的最终结果以及他们之间的依赖关系图。
+ 输出资源：根据入口和模块之间的依赖关系图，组装成一个个包含多个模块的chunk，再将每个chunk转换成成单独的文件加入到输出列表中，这是可以修改输出内容的最后机会。
+ 输出完成：在确定好输出内容之后，根据配置确定输出的路径和文件名，将最终文件输出。





![image-20201213221549306](https://tva1.sinaimg.cn/large/0081Kckwly1glmlnwekolj30so0iiq61.jpg)

