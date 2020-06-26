# Vetur+Eslint+Prettier统一代码规范

## Vetur的使用

### Vetur介绍

​	Vetur是vscode的Vue工具，由[vue-language-server](https://github.com/vuejs/vetur/tree/master/server)支持。

### 特征

 + 语法高亮
 + Snippet
 + Emmet
 + Linting/Error Checking
 + Formatting
 + IntelliSense
 + Debugging
 + Framework Support
 + Interpolation Support
 + VTI

这次主要内容只涉及到校验和格式化，其余内容可以去[官方文档](https://vuejs.github.io/vetur/)了解。

### Linting/Error Checking（校验/错误检查）

​	Vetur提供错误检查和校验。

#### Error Checking

​	Vetur对以下语言进行错误检查：

+ `<template>:html`
+ `<style>:css,scss,less`
+ `<script>:js,ts`

可以通过`vetur.validation.[template/style/script]`选择性的关闭错误检查。

#### Linting

​	要使用该功能需要在vscode中安装Eslint插件（**<font color="red">注意：不是引入eslint的node包，显著的表现就是有问题代码下出现波浪号</font>**），插件安装完成后此时Vetur对`<template>`不支持规则配置。

​	安装Eslint插件后，添加**`vue`**到vscode的**`eslint.validate`**的配置中：

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue"
  ]
}
```

​	正确配置后：Eslint可以校验`<template>`和`<script>`的内容。

##### Linting for `<template>`

​	对`<template>`的校验，Vetur只在**eslint-plugin-vue**的一些版本起作用。Linting是基于**eslint-plugin-vue**的[基本规则集](https://vuejs.github.io/eslint-plugin-vue/rules/#priority-a-essential-error-prevention)进行配置。

​	此时Linting是不可配置的，并且是基于固定版本的**eslint-plugin-vue**，如果想自定义配置`<template>`的linting

需要：

+ 通过**vetur.valition.template:false**关闭**Vetur**的模板Linting。
+ 确保vscode安装了**Eslint**插件。此时错误检查就来自**Eslint**插件，不是来自**Vetur**。
+ 在项目执行中`yarn add -D eslint eslint-plugin-vue`。
+ 在项目根目录中配置**.eslintrc**。比如：

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  "rules": {
    "vue/html-self-closing": "off"
  }
}
```

### Formatting（格式化）

​	**Vetur**支持`html/css/scss/less/postcss/stylus/js/ts`格式化。

​	**Vetur**仅能格式化整个文档，不能格式化任意区域。

#### 格式化程序

​	这些格式化程序都是可用的：

+ **`prettier`：css/scss/less/js/ts**

+ **`prettier-eslint`：js**，运行**prettier**和**eslint --fix**

+ **`prettyhtml`：html**

+ **`stylus-supermacy`：stylus**

+ **`vscode-typescript`：js/ts**

+ **`sass-formatter`：sass**

  **Vetur**集成了以上所有格式化程序，当**Vetur**遇到本地项目安装的格式化程序时，优先使用本地安装的版本（**<font color="red">注意：本地配置优先级最高</font>**）。你也能选择vscode配置中每种语言的默认格式，通过**`vetur.format.defaultFormatter`**，将对应的语言格式化配置设置为**none**可以禁用该语言的格式化程序。

  当前默认值为：

  ```json
  {
    "vetur.format.defaultFormatter.html": "prettyhtml",
    "vetur.format.defaultFormatter.css": "prettier",
    "vetur.format.defaultFormatter.postcss": "prettier",
    "vetur.format.defaultFormatter.scss": "prettier",
    "vetur.format.defaultFormatter.less": "prettier",
    "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
    "vetur.format.defaultFormatter.js": "prettier",
    "vetur.format.defaultFormatter.ts": "prettier",
    "vetur.format.defaultFormatter.sass": "sass-formatter"
  }
  ```


## ESLint的使用

### ESLint的介绍

​	ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。在许多方面，它和JSLint，JSHint相似，除了少数例外：

* ESLint使用Espree解析JavaScript。
* ESLint使用AST去分析代码中的模式。
* ESLint是完全插件化的。每个规则都是一个插件且你可以在运行时添加更多的规则。

### 安装和使用

​	前提条件：Node.js（^10.12.0，or >=12.0.0）。

​	你可以使用npm或者yarn安装ESLint：

```
npm install eslint --save-dev
# or
yarn add eslint --dev
```

​	然后创建一个配置文件：

```
$ npx eslint --init
```

​	之后在任何文件或者目录下运行：

```
$ npx eslint yourfile.js
```

​	同时你也可以全局安装ESLint（使用**<font color="red">npm install eslint -g</font>**），同时与eslint相关的插件也必须是全局安装的。然而不推荐这种方式，在项目中所有插件或者其他配置都必须再次安装在本地项目中。

##### **<font color="red">Notes</font>**

​	在运行eslint --init之后会在控制台生成一个交互提示界面，可根据需求手动选择eslint的配置。

![image-20200621235954351](/Users/zhangxuan/Library/Application Support/typora-user-images/image-20200621235954351.png)

​	在选择完配置之后，会在项目中生成.eslintrc配置文件：

* JS：使用.eslintrc.js文件并导出一个包含配置的对象。

* Yaml：.eslintrc.yaml。

* JSON：.eslintrc.json，并允许此文件使用JS形式的注释。

* 废弃的用法：.eslintrc。

* package.json：在文件中创建eslintConfig属性，并在此属性中进行配置。

  **<font color="red">PS:</font>**翻阅ESLint[源码](https://github.com/eslint/eslint/blob/v6.0.1/lib/cli-engine/config-array-factory.js#L52)可以看到，其配置文件的优先级如下：
  
  ```
  const configFilenames = [
    ".eslintrc.js",
    ".eslintrc.yaml",
    ".eslintrc.yml",
    ".eslintrc.json",
    ".eslintrc",
    "package.json"
  ];
  ```

eslint不仅支持文件配置，还支持代码注释的配置方式，不推荐后者，方式繁琐，且不利于维护。

##### 配置

​	在.eslintrc文件中可以看到许多这样的规则:

```
{
    "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
    }
}
```

**<font color="blue">"semi"和"quotes"</font>**是Eslint中规则的名称，第一个值是错误的级别，可以是下面的值之一：

	* **<font color="blue">"off"或0</font>**--关闭规则
	* **<font color="blue">"warn"或1</font>**---将规则视为一个警告（不会影响退出码），程序不会退出运行
	* **<font color="blue">"error"或2</font>**----将规则视为一个错误（退出码为1），同时会退出程序的运行。

同时也可以使用推荐配置：

```
"extends": "eslint:recommended"
```

此时开启的是严格模式，所有在[规则页面](https://cn.eslint.org/docs/rules/)中被标记为**<font color="green">✔</font>**的规则将会默认开启。

##### 配置详解

