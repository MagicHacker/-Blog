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

### output.chunkFilename（待验证）

​		chunkFilename是指未被放在entry中，但却又需要被打包出来的**chunk**文件的名称。一般来说，这个**chunk**文件指的就是要懒加载的模块。默认使用[id].js或从output.filename中推断出的值([name]会被预先替换为[id]或[id].)。

​		webpack的异步模块默认是没有名字的，同时由于没有在异步模块加载的时候显示的指定chunkFilename，webpack就会把[name]替换为chunk文件的[id]，一个自增的id号。可以通过import(/\*webpackChunkName: "test123"\*/ 'index.js')来为设置webpack的chunkFilename中的[name]占位符。

