# 概念

​	本质上，webpack是一个现代JavaScript应用程序的静态模块打包器。当webpack处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle。

# entry入口

​	entry即入口，指示webpack应该使用哪个模块来作为构建起其内部依赖图的开始。进入entry后，webpack会找出有哪些模块和库是entry直接或间接依赖的。可以通过在webpack配置文件中配置entry属性，来指定一个入口（或多个入口）。默认值为./src。

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

​	当你想要构建多页应用的时候，可以通过对象的语法告诉webpack一次性构建出多个bundle文件。

用法：`entry: {[entryChunkName: string]: string|Array<string>}`

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

