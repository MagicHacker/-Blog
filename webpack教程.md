# 概念

​		本质上，webpack是一个现代JavaScript应用程序的静态模块打包器。当webpack处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle。

# context

​		context是webpack编译时的基础目录，是一个绝对路径的字符串，用于从配置中解析入口entry和**loader**在配置了context字段之后，webpack在寻找相对路径的文件时会以context为根目录。context默认为执行启动webpack时所在的当前工作目录。如果想改变context的默认配置，则可以采用如下配置：

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

​		path用来指定webpack打包构建的最终输出的目录，是一个绝对路径。

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

