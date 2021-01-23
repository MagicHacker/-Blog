# Vetur+ESLint+Prettier介绍

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

可以通过`vetur.validation.[template/style/script]`选择性的关闭默认的错误检查。

#### Linting

​	要使用该功能需要在vscode中安装Eslint插件（**<font color="red">注意：不是引入eslint的node包，显著的表现就是有问题代码下出现波浪号</font>**），插件安装完成后此时Vetur对`<template>`支持规则配置。

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

​	对`<template>`的校验，Vetur只在**eslint-plugin-vue**的某些版本起作用。Linting是基于**eslint-plugin-vue**的[基本规则集](https://vuejs.github.io/eslint-plugin-vue/rules/#priority-a-essential-error-prevention)进行配置。

​	此时Linting是不可配置的，并且是基于固定版本的**eslint-plugin-vue**，如果想自定义配置`<template>`的linting需要：

+ 通过**vetur.validation.template:false**关闭**Vetur**的模板Linting。

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

​	**Vetur**支持`html/css/scss/less/postcss/stylus/js/ts`格式化，其内部默认使用Prettier进行格式化。

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

```bash
npm install eslint --save-dev
# or
yarn add eslint --dev
```

​	然后创建一个配置文件：

```bash
$ npx eslint --init
```

​	之后在任何文件或者目录下运行：

```bash
$ npx eslint yourfile.js
```

​	同时你也可以全局安装ESLint（使用**<font color="red">npm install eslint -g</font>**），同时与eslint相关的插件也必须是全局安装的。然而非常不推荐这种方式。目前项目中的所有插件或者其他配置都必须安装在本地项目中。

##### **<font color="red">Notes</font>**

​	在运行eslint --init之后会在控制台生成一个交互提示界面，可根据需求手动选择eslint的配置。此种方式太过繁琐，并不太推荐。

![image-20200621235954351](https://tva1.sinaimg.cn/large/007S8ZIlly1ggnetpvf6uj30cu0250su.jpg)

​	在选择完配置之后，会在项目中生成.eslintrc配置文件：

* JS：使用.eslintrc.js文件并导出一个包含配置的对象。

* Yaml：.eslintrc.yaml。

* JSON：.eslintrc.json，并允许此文件使用JS形式的注释。

* 废弃的用法：.eslintrc。

* package.json：在文件中创建eslintConfig属性，并在此属性中进行配置。

  **<font color="red">PS:</font>**翻阅ESLint[源码](https://github.com/eslint/eslint/blob/v6.0.1/lib/cli-engine/config-array-factory.js#L52)可以看到，其配置文件的优先级如下：
  
  ```javascript
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

```javascript
{
    "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
    }
}
```

+ **semi"和"quotes**是Eslint中规则的名称，第一个值是错误的级别，可以是下面的值之一：

* **off或0**：关闭规则。
* **warn或1**：将规则视为一个警告，程序不会退出运行。
* **error或2**：将规则视为一个错误（退出码为1），同时会退出程序的运行。

同时也可以使用推荐配置：

```javascript
"extends": "eslint:recommended"
```

此时开启的是严格模式，所有在[规则页面](https://cn.eslint.org/docs/rules/)中被标记为**<font color="green">✔</font>**的规则将会默认开启。

##### 配置详解

###### Env环境配置

​	指定脚本的运行环境。每种环境都有一组特定的预定义的全局变量。默认情况下，所有环境的全局变量的配置都是false，且这些环境并不冲突，所以可以同时定义多个，自由选择环境搭配。将环境变量的配置设置为true，开启环境变量，以保证代码检测时不会把这些环境中预定义的全局变量识别成未定义的变量而报错。可用的环境包括：

```javascript
"env": {
    "browser": true, // 浏览器环境中的全局变量
    "node": true, // Node.js全局变量和Node.js作用域。
    "commonjs": true, //CommonJS全局变量和CommonJS作用域（使用Browserify/webpack的浏览器代码）
    "shared-node-browser": true, // Node.js 和 Browser 通用全局变量
    "es6": true,// 启用ES6特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
    "worker": true, // Web Workers 全局变量
    "amd": true, // 将require() 和 define() 定义为像 amd 一样的全局变量
    "mocha": true, // 添加所有的 Mocha 测试全局变量
    "jasmine": true, // 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量
    "jest": true, // jest 全局变量
    "phantomjs": true, // PhantomJS 全局变量
    "jquery": true, // jQuery 全局变量
    "mongo": true, // MongoDB 全局变量
}
```

###### Globals全局配置

​	当访问代码内未定义的全局变量时，**no-undef**规则将发出警告。如果你想在代码内使用**<font color="red">自定义</font>**的全局变量，就需要在globals配置中指定。由于可以配置环境的预定义全局变量，所以此配置一般用不上，配置方式如下：

```javascript
{
    "globals": {
        "var1": "writable", // 允许重写变量
        "var2": "readonly" // 变量为只读，不允许重写
    }
}
```

由于历史原因，**false**和**readable**等价于**readonly**。类似地，**true**和**writeable**等价于**writeable**，但是不建议使用旧值。

###### Parser解析器

​	ESLint默认使用Espree作为解析器，你可以在配置文件中指定不同的解析器，只要该解析器符合下列要求：

​	1.它必须是一个Node模块，可以从它出现的配置文件中加载。通常，这意味着应该使用npm单独安装解析包。

​	2.它必须符合[parser interface](https://cn.eslint.org/docs/developer-guide/working-with-plugins#working-with-custom-parsers)。

​	**<font color="red">注意：</font>**即使满足兼容性要求，也不能保证一个外部解析器可以与ESLint正常配合工作，ESLint也不会修复与其他解析器不兼容的bug。

​	为了使用解析器，你需要在你的.eslintrc文件中指定parser选项。例如：

```javascript
{
    "parser": "esprima",
    "rules": {
        "semi": "error"
    }
}
```

​	以下解析器与ESLint兼容：

* [Esprima](https://www.npmjs.com/package/esprima)
* [Babel-ESLint](https://www.npmjs.com/package/babel-eslint) ：一个对[Babel](https://babeljs.io/)解析器的包装，使其能够与 ESLint 兼容。**<font color="red">注意：</font>**该包允许你使用一些实验特性的时候，依然能够用上ESLint语法检查，如果没有用到ESLint不支持的实验特性时不需要安装此包。
* [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) ：将 TypeScript 转换成与 estree 兼容的形式，以便在ESLint中使用。

**<font color="red">注意：</font>**在使用自定义解析器时，为了让ESLint在处理非 ECMAScript 5 特性时正常工作，仍然需要配置属性parserOptions。

###### ParseOptions解析器选项

​	ESLint允许你指定你想要支持的JS语言选项。默认情况下，ESLint支持ECMAScript 5 语法。你可以覆盖该设置，以启用对ECMAScript 其它版本的支持。

​	**<font color="red">注意：</font>**支持ES6语法并不意味着同时支持新的ES6全局变量或类型（比如 `Set` 等新类型）。对于ES6语法，使用`{ "parserOptions": { "ecmaVersion": 6 } }`；对于新的ES6全局变量，使用`{ "env":{ "es6": true } }`。

​	解析器选项可以在.eslintrc文件中使用parserOptions属性配置。可用的配置有：

* ecmaVersion:3，5（默认），你也可以使用6，7，8，9，10来指定想要使用的ECMAScript版本。同时也可以使用年份命名的版本号，2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (同10)。
* sourceType:默认是"script"，也可以使用"module"(如果你的代码是ECMAScript 模块)。

 * ecmaFeatures：该配置对象指定你想使用的额外的语言特性:
   * globalReturn：允许在全局作用域下使用return语句。
   * impliedStrict：启用全局严格校验模式。
   * jsx：启用jsx。

配置示例:

```javascript
"parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
        "experimentalObjectRestSpread": true,//启用对象的扩展
        "jsx": true, //启用jsx语法
        "globalReturn":true, //允许return在全局使用
        "impliedStrict":true //启用严格校验模式
    }
}

```

###### Plugins插件配置

​	虽然官方提供了上百种的规则供选择，但还是不够的，因为官方的规则只能检查标准的JavaScript语法，如果你写的是JSX或者Vue单文件组件，ESLint的规则就无法处理了。这时就通过安装ESLint的插件，指定一些特殊的规则进行检查，在.eslintrc配置文件配置插件时，可以使用plugins来存放插件名字的列表，插件的名字可以省略**<font color="blue">eslint-plugin-</font>**前缀。

```bash
npm install --save-dev eslint-plugin-vue
{
  "plugins": [
    "vue"  // eslint-plugin-vue
  ]
}
```

* [eslint-plugin-babel](https://github.com/babel/eslint-plugin-babel)：和babel-eslint一起使用的一款插件。虽然babel-eslint可以将eslint应用于babel，但是它不能更改内置的规则来支持实验特性。eslint-plugin-babel重新实现了这些有问题的规则，因此不会误报一些错误信息。
* [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)：该插件支持对ES6+的import/export语法的校验，并防止一些文件路径拼写错误或者导入名称错误的情况。
* [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)：该插件辅助ESLint与Prettier一些协作，并将prettier的解析作为ESLint的一部分，在最后输出时给出修改意见，这样当使用prettier格式化代码的时候，依然能够遵循ESLint的规则。如果你禁用掉了所有和代码格式化相关的Eslint规则，该插件可以更好得工作。因此你可以用eslint-config-prettier禁用掉所有的格式化相关的规则(如果其他有效的Eslint规则与prettier在代码如何格式化的问题上不一致的时候，报错是在所难免的了)。
* [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)：typescript辅助ESLint的插件。此插件为ESLint校验typescript使用，所以需要使用**@typescript-eslint/parser**作为ESLint的解析器。

###### Extends扩展配置

​	配置ESLint的extends选项可以让我们直接使用别人已经写好的lint规则，方便快捷。一个配置文件可以被基础配置中已启用的规则继承。

​	extend是属性值可以是：

* 指定配置的字符串（配置文件的路径，可共享的配置的名称，**<font color="blue">`eslint:recommended`</font>**或**<font color="blue"> `eslint:all`</font>**）
* 字符串数组：每个配置都继承它前面的配置。

ESLint递归地扩展配置，因此基本配置也可以具有extends属性。extends属性中的相对路径和可共享配置名从配置文件中出现的位置进行解析。

​	扩展一般支持三种类型：

```
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "eslint-config-standard",
  ]
}
```

* eslint:开头的是ESLint官方的扩展，一共有两个：eslint:recommended、eslint:all。

  值为`"eslint:recommended"` 的 `extends` 属性启用一系列核心规则，这些规则显示常见的问题。

  值为`"eslint:all"` 的 `extends` 属性启用**<font color="red">所有的</font>**核心规则（不推荐）。

* eslint-config-：开头的是可共享的配置包，它输出一个配置对象。使用时可以省略eslint-config-前缀。
  * [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)：该包提供了Airbnb的所有ESLint配置，该工具包包含了react相关的ESLint规则配置，所以还需要另外安装`eslint-plugin-import`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-jsx-a11y`这几个包。
  * [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)：此工具包功能与上一个包一样，区别是不包含react的规则，所以不需要安装与react有关的插件。
  * [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)：此工具包将会禁用掉所有非必须或者与prettier冲突的规则，把它放在extends选项的最后。以便它能够覆盖其他配置。

* eslint-plugin-:开头的是插件包。在extends中以plugin:开头。使用的是ESLint的plugins配置中的某些规则，有点相当于plugins配置中某个eslint-plugin插件的子集。**在plugins选项中配置的eslint-plugin-xx插件是该插件下的所有规则包，而extends选项中配置plugin:xxx则是引入该插件下的某一个规则包**。

  * [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)：此包是Vue的官方ESLint插件，它使你能够使用ESLint检查vue文件的`<template>`和`<script>`。目前支持的规则配置如下：

    ```javascript
    {
      "extends": "plugin:vue/base"
    }
    {
      "extends": "plugin:vue/essential"
    }
    {
      "extends": "plugin:vue/strongly-recommended"
    }
    {
      "extends": "plugin:vue/recommended"
    }
    ```

###### Rules规则配置

**rules**属性可以做下面的任何事情以扩展(或覆盖)**<font color="red">默认的</font>**规则：

* 启用额外的规则。
* 改变继承的规则级别而不改变它的选项：
  * 基础配置："eqeqeq": ["error", "allow-null"]
  * 派生的配置："eqeqeq": "warn"
  * 最后生成的配置："eqeqeq": ["warn", "allow-null"]

* 覆盖基础配置中的规则的选项：
  * 基础配置："quotes": ["error", "single", "avoid-escape"]
  * 派生配置："quotes": ["error", "single"]
  * 最后生成的配置："quotes": ["error", "single"]

###### Overrides覆盖配置

​	可以通过overrides覆盖指定文件的配置，为某些特殊文件单独指定配置规则。比如：

```
overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
```

##### Ignore Files

​	可以在项目根目录创建一个**.eslintignore**文件去告诉ESLint忽略特定的文件和目录。**.eslintignore**文件是一个纯文本文件，其中每一行都是一个glob模式的，表明哪些路径应该忽略检测。当ESLint运行时，在确定哪些文件要检测之前，它会在当前工作目录中查找一个**.eslintignore**文件，如果找到，当遍历目录时，将会应用这些设置。可用的特性如下：

* 以**#**开头的行会被当做注释。
* 路径是相当于**.eslintignore**的位置或当前目录。
* 忽略模式同**.gitignore**。

除了**.eslintignore**文件中的模式，ESLint总是忽略**/node_modules/***中的文件。

##### ESLint常见规则

```
"no-alert": 0,//禁止使用alert confirm prompt
"no-array-constructor": 2,//禁止使用数组构造器
"no-bitwise": 0,//禁止使用按位运算符
"no-caller": 1,//禁止使用arguments.caller或arguments.callee
"no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名
"no-class-assign": 2,//禁止给类赋值
"no-cond-assign": 2,//禁止在条件表达式中使用赋值语句
"no-console": 2,//禁止使用console
"no-const-assign": 2,//禁止修改const声明的变量
"no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
"no-continue": 0,//禁止使用continue
"no-control-regex": 2,//禁止在正则表达式中使用控制字符
"no-debugger": 2,//禁止使用debugger
"no-delete-var": 2,//不能对var声明的变量使用delete操作符
"no-div-regex": 1,//不能使用看起来像除法的正则表达式/=foo/
"no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
"no-dupe-args": 2,//函数参数不能重复
"no-duplicate-case": 2,//switch中的case标签不能重复
"no-else-return": 2,//如果if语句里面有return,后面不能跟else语句
"no-empty": 2,//块语句中的内容不能为空
"no-empty-character-class": 2,//正则表达式中的[]内容不能为空
"no-empty-label": 2,//禁止使用空label
"no-eq-null": 2,//禁止对null使用==或!=运算符
"no-eval": 1,//禁止使用eval
"no-ex-assign": 2,//禁止给catch语句中的异常参数赋值
"no-extend-native": 2,//禁止扩展native对象
"no-extra-bind": 2,//禁止不必要的函数绑定
"no-extra-boolean-cast": 2,//禁止不必要的bool转换
"no-extra-parens": 2,//禁止非必要的括号
"no-extra-semi": 2,//禁止多余的冒号
"no-fallthrough": 1,//禁止switch穿透
"no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.
"no-func-assign": 2,//禁止重复的函数声明
"no-implicit-coercion": 1,//禁止隐式转换
"no-implied-eval": 2,//禁止使用隐式eval
"no-inline-comments": 0,//禁止行内备注
"no-inner-declarations": [2, "functions"],//禁止在块语句中使用声明（变量或函数）
"no-invalid-regexp": 2,//禁止无效的正则表达式
"no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量
"no-irregular-whitespace": 2,//不能有不规则的空格
"no-iterator": 2,//禁止使用__iterator__ 属性
"no-label-var": 2,//label名不能与var声明的变量名相同
"no-labels": 2,//禁止标签声明
"no-lone-blocks": 2,//禁止不必要的嵌套块
"no-lonely-if": 2,//禁止else语句内只有if语句
"no-loop-func": 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
"no-mixed-requires": [0, false],//声明时不能混用声明类型
"no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格
"linebreak-style": [0, "windows"],//换行风格
"no-multi-spaces": 1,//不能用多余的空格
"no-multi-str": 2,//字符串不能用\换行
"no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
"no-native-reassign": 2,//不能重写native对象
"no-negated-in-lhs": 2,//in 操作符的左边不能有!
"no-nested-ternary": 0,//禁止使用嵌套的三目运算
"no-new": 1,//禁止在使用new构造一个实例后不赋值
"no-new-func": 1,//禁止使用new Function
"no-new-object": 2,//禁止使用new Object()
"no-new-require": 2,//禁止使用new require
"no-new-wrappers": 2,//禁止使用new创建包装实例，new String new Boolean new Number
"no-obj-calls": 2,//不能调用内置的全局对象，比如Math() JSON()
"no-octal": 2,//禁止使用八进制数字
"no-octal-escape": 2,//禁止使用八进制转义序列
"no-param-reassign": 2,//禁止给参数重新赋值
"no-path-concat": 0,//node中不能使用__dirname或__filename做路径拼接
"no-plusplus": 0,//禁止使用++，--
"no-process-env": 0,//禁止使用process.env
"no-process-exit": 0,//禁止使用process.exit()
"no-proto": 2,//禁止使用__proto__属性
"no-redeclare": 2,//禁止重复声明变量
"no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
"no-restricted-modules": 0,//如果禁用了指定模块，使用就会报错
"no-return-assign": 1,//return 语句中不能有赋值表达式
"no-script-url": 0,//禁止使用javascript:void(0)
"no-self-compare": 2,//不能比较自身
"no-sequences": 0,//禁止使用逗号运算符
"no-shadow": 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
"no-shadow-restricted-names": 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用
"no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
"no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]
"no-sync": 0,//nodejs 禁止同步方法
"no-ternary": 0,//禁止使用三目运算符
"no-trailing-spaces": 1,//一行结束后面不要有空格
"no-this-before-super": 0,//在调用super()之前不能使用this或super
"no-throw-literal": 2,//禁止抛出字面量错误 throw "error";
"no-undef": 1,//不能有未定义的变量
"no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined
"no-undefined": 2,//不能使用undefined
"no-unexpected-multiline": 2,//避免多行表达式
"no-underscore-dangle": 1,//标识符不能以_开头或结尾
"no-unneeded-ternary": 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
"no-unreachable": 2,//不能有无法执行的代码
"no-unused-expressions": 2,//禁止无用的表达式
"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
"no-use-before-define": 2,//未定义前不能使用
"no-useless-call": 2,//禁止不必要的call和apply
"no-void": 2,//禁用void操作符
"no-var": 0,//禁用var，用let和const代替
"no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],//不能有警告备注
"no-with": 2,//禁用with
"array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
"arrow-parens": 0,//箭头函数用小括号括起来
"arrow-spacing": 0,//=>的前/后括号
"accessor-pairs": 0,//在对象中使用getter/setter
"block-scoped-var": 0,//块语句中使用var
"brace-style": [1, "1tbs"],//大括号风格
"callback-return": 1,//避免多次调用回调什么的
"camelcase": 2,//强制驼峰法命名
"comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
"comma-spacing": 0,//逗号前后的空格
"comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
"complexity": [0, 11],//循环复杂度
"computed-property-spacing": [0, "never"],//是否允许计算后的键名什么的
"consistent-return": 0,//return 后面是否允许省略
"consistent-this": [2, "that"],//this别名
"constructor-super": 0,//非派生类不能调用super，派生类必须调用super
"curly": [2, "all"],//必须使用 if(){} 中的{}
"default-case": 2,//switch语句最后必须有default
"dot-location": 0,//对象访问符的位置，换行的时候在行首还是行尾
"dot-notation": [0, { "allowKeywords": true }],//避免不必要的方括号
"eol-last": 0,//文件以单一的换行符结束
"eqeqeq": 2,//必须使用全等
"func-names": 0,//函数表达式必须有名字
"func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式
"generator-star-spacing": 0,//生成器函数*的前后空格
"guard-for-in": 0,//for in循环要用if语句过滤
"handle-callback-err": 0,//nodejs 处理错误
"id-length": 0,//变量名长度
"indent": [2, 4],//缩进风格
"init-declarations": 0,//声明时必须赋初值
"key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
"lines-around-comment": 0,//行前/行后备注
"max-depth": [0, 4],//嵌套块深度
"max-len": [0, 80, 4],//字符串最大长度
"max-nested-callbacks": [0, 2],//回调嵌套深度
"max-params": [0, 3],//函数最多只能有3个参数
"max-statements": [0, 10],//函数内最多有几个声明
"new-cap": 2,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
"new-parens": 2,//new时必须加小括号
"newline-after-var": 2,//变量声明后是否需要空一行
"object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
"object-shorthand": 0,//强制对象字面量缩写语法
"one-var": 1,//连续声明
"operator-assignment": [0, "always"],//赋值运算符 += -=什么的
"operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首
"padded-blocks": 0,//块语句内行首行尾是否要空行
"prefer-const": 0,//首选const
"prefer-spread": 0,//首选展开运算
"prefer-reflect": 0,//首选Reflect的方法
"quotes": [1, "single"],//引号类型 `` "" ''
"quote-props":[2, "always"],//对象字面量中的属性名是否强制双引号
"radix": 2,//parseInt必须指定第二个参数
"id-match": 0,//命名检测
"require-yield": 0,//生成器函数必须有yield
"semi": [2, "always"],//语句强制分号结尾
"semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
"sort-vars": 0,//变量声明时排序
"space-after-keywords": [0, "always"],//关键字后面是否要空一格
"space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
"space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
"space-in-parens": [0, "never"],//小括号里面要不要有空格
"space-infix-ops": 0,//中缀操作符周围要不要有空格
"space-return-throw-case": 2,//return throw case后面要不要加空格
"space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格
"spaced-comment": 0,//注释风格要不要有空格什么的
"strict": 2,//使用严格模式
"use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()
"valid-jsdoc": 0,//jsdoc规则
"valid-typeof": 2,//必须使用合法的typeof的值
"vars-on-top": 2,//var必须放在作用域顶部
"wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格
"wrap-regex": 0,//正则表达式字面量用小括号包起来
```

### 另外

​	如果需要在运行webpack时运行ESLint，需要在webpack中配置eslint-loader。

```javascript
{
    test: /\.js$/,
    loader: 'eslint-loader',
    enforce: "pre",
    include: [path.resolve(__dirname, 'src')], // 指定检查的目录
    options: {
        formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范 需要npm安装
    }
}
```

## Prettier的使用

### Prettier的介绍

​	Prettier是一个固定的代码格式化程序，支持以下类型：

* JavaScript, including ES2017
* JSX
* Angular
* Vue
* Flow
* TypeScript
* CSS，Less，SCSS
* HTML
* JSON
* GraphQL
* Markdown，including GFM andMDX
* YAML

​    它会移除原有代码的样式，并输出统一样式的代码。Prettier会重新计算每行代码的长度并重新打印它。Prettier 通过解析你的代码库，强制使用统一的风格的代码，因为它会移除掉原有代码样式（这并不会影响 AST 的代码样式）。它会采用自己的规则来重新输出解析后的 AST，该规则将考虑每行最大长度，当必要的时候，会进行换行。

### 安装和使用

​	通过yarn：

```bash
yarn add prettier --dev --exact
# or globally
yarn global add prettier
```

​	通过npm：

```bash
npm install --save-dev --save-exact prettier
# or globally
npm install --global prettier
```

​	然后创建一个空的配置文件来让编辑器和其他工具知道你正在使用Prettier：

```bash
echo {}> .prettierrc.json
```

​	**注意：**我目前碰到的情况是.prettierrc.json是不生效的，只有.prettierrc.js是生效的。

#### 配置文件格式优先级

+ package.json
+ .prettierrc.json
+ .prettierrc.yaml
+ .prettierrc.yml
+ .prettierrc.js
+ prettier.config.js
+ .prettierrc.toml

​	接着创建一个[.prettierignore](https://prettier.io/docs/en/ignore.html)文件让编辑器知道哪些文件不需要格式化。以#开头的行会被当做注释。比如：

```javascript
# Ignore artifacts:
build
coverage
# Ignore all HTML files:
*.html
```

​	最后使用Prettier格式化所有文件:

```bash
npx prettier --write .
# or
yarn prettier --write .
```

### 配置项参数

+ printWidth：设置prettier单行输出的最大长度，默认为80。
+ tabWidth：设置每个水平缩进的空格数，默认为2。
+ useTabs：使用tab（制表位）进行缩进而非空格，默认为false。
+ semi：是否在语句末尾添加分号，默认为true。
+ singleQuote：是否使用单引号包裹字符串，默认为false。

 + quoteProps：是否使用引号包裹对象的键名，默认为"as-needed"。
   + "as-needed"：当且仅当对象中特定键名需要被引号包裹时，使用引号包裹特定键名。
   + "consistent"：如果对象中至少存在一个键名必须被引号包裹时，使用引号包裹所有键名
   + "preserve"：不做任何特殊处理。

+ trailingCommas：多行时使用尾后逗号，默认为"es5"。
  + "none"：不使用。
  + "es5"：添加es5中被支持的尾逗号。
  + "all"：所有可能的地方都被添加尾逗号。

+ bracketSpacing：在对象字面量声明所使用的的花括号后{和前}输出空格，默认为true。
+ jsxBracketSameLinte：在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素），默认为false。
+ arrowParens：为单行箭头函数的参数添加圆括号，默认为"always"。
  + "avoid " - 尽可能不添加圆括号，示例：x => x。
  + "always " - 总是添加圆括号，示例： (x) => x。

### 与其他Linters的集成

​	一些Linters通常不止包含代码质量检验的规则，也包含一些格式化规则。当使用了Prettier时，一些Linters的格式化规则是不必要的，甚至还会与Prettier产生冲突。

​	幸运的是通过第三方配置可以很容易的关闭与Prettier冲突且没需要的规则。

+ [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)：关闭一些不必须，且ESLint可能与Prettier冲突的规则。
+ [tslint-config-prettier](https://github.com/alexjoverm/tslint-config-prettier)：关闭一些不必须，且TSLint可能与Prettier冲突的规则。
+ [stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier)：关闭一些不必须，且stylelint可能与Prettier冲突的规则。

#### Notes：

​	当在网上同时搜索Prettier和ESLint时，经常会搜到其他相关的内容。虽然在某些情况下会很有用，但是已经不推荐使用这些包了。

+ [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)：Prettier作为ESLint的规则去运行，将prettier集成到ESLint工作流中，不需要再单独使用prettier命令。
+ [tslint-plugin-prettier](https://github.com/ikatyang/tslint-plugin-prettier)：Prettier作为TSLint的规则去运行，将prettier集成到TSLint工作流中，不需要再单独使用prettier命令。
+ [stylelint-prettier](https://github.com/prettier/stylelint-prettier)：Prettier作为stylelint的规则去运行，将prettier集成到stylelint工作流中，不需要再单独使用prettier命令。

这些插件在Prettier刚推出的时候特别有用。但是这些插件有缺点：

+ 在编辑器中会出现很多红色的波浪线，非常烦人。
+ 它们比直接运行Prettier慢。

现在有一些新工具在运行prettier的时候立即运行eslint --fix去修复文件，但是这些工具比单独运行prettier要慢。

+ [prettier-eslint](https://github.com/prettier/prettier-eslint)：先通过prettier格式化代码，然后运行eslint --fix修复文件。
+ [prettier-tslint](https://github.com/azz/prettier-tslint)：先通过prettier格式化代码，然后运行tslint --fix修复文件。
+ [prettier-stylelint](https://github.com/hugomrdias/prettier-stylelint)：先通过prettier格式化代码，然后运行stylelint --fix修复文件。

### Pre-commit Hook

​	你可以通过pre-commit工具来使用Prettier。执行了git add的文件在提交之前，可以重新格式化这些已经被保存在暂存区的文件。

```bash
npx mrm lint-staged
```

​	执行之后会安装[husky](https://github.com/typicode/husky)和[lint-staged](https://github.com/okonet/lint-staged)，同时自动在你的package.json文件中添加配置。如下：

```json
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,css,json,vue}":[
      "eslint --fix",
      "prettier --write",
      "git add ." // lint-staged 10.0以上版本可以省略此行
    ]
  }
```

​	husky和lint-staged工作流程如下：

```bash
1. git add .将所有改动的文件提交到暂存区
```
 	2. git commit -m ""此操作会被husky拦截，之后调用lint-staged对文件进行检查。
 	3. lint-staged会先进行git stash操作，之后会将与规则相匹配的暂存区的文件进行检查，只有已经提交到暂存区的文件才会被检查。
 	4. 等到lint-staged执行完成后，只要有一个文件没有通过检查，husky会阻止本次git commit，然后手动修改对应的有问题的文件，重新执行git add和git commit操作，会重复2，3步骤进行检查。

### prettier常用配置

```javascript
module.exports = { 
  "printWidth": 80, // 每行代码长度（默认80）
  "tabWidth": 2, // 每个tab相当于多少个空格（默认2）
  "useTabs": false, // 是否使用tab进行缩进（默认false）
  "singleQuote": true, // 使用单引号（默认false）
  "semi": true, // 声明结尾使用分号(默认true)
  "trailingComma": "none", // 多行使用拖尾逗号（默认none）
  "bracketSpacing": true, // 对象字面量的大括号间使用空格（默认true）
  "jsxBracketSameLine": false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  "arrowParens": "avoid" // 只有一个参数的箭头函数的参数是否带圆括号（默认为always）
}; 
```

## 项目推荐配置

### package.json

```json
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,css,json,vue}":[
      "eslint --fix",
      "prettier --write"
    ]
  }
```

### .eslintrc.js

```javascript
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      globalReturn: false,
      impliedStrict: true
    }
  },
  // 启用node环境
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: ['attack', 'attack/vue', 'prettier'],
  plugins: ['prettier', 'vue'],
  rules: {
    'prettier/prettier': 'error'
  }
}

```

### .prettierrc.js

```javascript
module.exports = {
  singleQuote: true,
  printWidth: 80,
  semi: false,
  tabWidth: 2,
  trailingComma: 'none',
  overrides: [
    {
      files: [
        '*.json',
        '.eslintrc',
        '.tslintrc',
        '.prettierrc',
        '.tern-project'
      ],
      options: {
        parser: 'json',
        tabWidth: 2
      }
    }
  ]
}

```

###  安装相应的包

```bash
#npm
npm i eslint babel-eslint eslint-config-attack eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue husky lint-staged prettier --save-dev
# yarn 
yarn add eslint babel-eslint eslint-config-attack eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue husky lint-staged prettier --dev
```

