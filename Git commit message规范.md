# Git commit message规范

## 规范化的初衷

​	在日常开发中，一个项目通常都由好几个人进行开发，然而每个人都有自己的开发习惯，无法统一。而commit message作为开发的日常操作，如果不统一规范，大家随意写，造成message千奇百怪，导致后续代码的维护成本加大，有时自己都不清楚具体修改了什么内容。所以统一commit message就显得格外重要，这样有便于后续代码的review，也便于快速定位项目的bug，从而进行快速的修复、上线。

## 规范的准则

​	目前比较流行的方案是约定式提交规范，它是一种基于提交消息的轻量级约定。提供了一组用于创建清晰的提交历史的简单规则。使用git commit可以提交多行commit message。

​	commit message包含三个部分：Header，Body和Footer。格式如下：

```
<type>(<scope>): <subject> 
<BLANK LINE> 
<body> 
<BLANK LINE> 
<footer>
```

### Header

​	Header为必填，描述修改的类型和主要内容。一般仅有一行，包含三个字段：

+ type：必填项，用于说明commit的类型。
+ scope：可选项，用于说明commit影响的范围。
+ subject：可选项，用于对本次commit目的的简短说明，不超过50个字符。

其中type只允许使用下面7个标识：

+ feat：新增功能（feature）。
+ fix：修复bug。
+ docs：修改与文档有关的内容，比如README, CHANGELOG, CONTRIBUTE等等。
+ style：代码格式的修改（不影响代码的运行），注意不是css等样式的修改。
+ refactor：重构，既不是新增功能，也不是修复bug。
+ test：测试相关，比如单元测试，集成测试，端到端测试等。
+ chore：构建或辅助工具的变动。比如构建流程，依赖管理，增加依赖库或者工具等。

### Body

​	Body部分是对本次commit的详细描述，可以分成多行。应该说明本次代码变动的动机以及具体的修改内容。

### Footer

​	Footer部分一般用于两种情况：

+ 不兼容变动：与上一个版本不兼容，则Footer以BREAKING CHANGE开头，后面的内容是对变动的描述，以及变动的理由和迁移方法。
+ 关闭Issues：commit针对某个issue，在Footer中可以写上Closes #123，也可以关闭多个issues，Closes #123, #456。

### 特殊情况Revert

​	有一种特殊的情况，如果当前commit用于撤销以前的commit：

+ 必须以revert：开头，后面跟着被撤销的commit的Header。
+ Body部分写上被撤销的commit的SHA标识符。

比如：

```
revert: feat(pencil): add xxx
This reverts commit 667ecc1654
```

## commitizen工具

​	commitizen是一个撰写合格的commit message的工具，用于代替git commit命令。

### 安装和使用

```
$ npm install -g commitizen
```

除了安装commitizen，还需要安装适配器cz-conventional-changelog，它提供了conventional-changelog标准（约定式提交标准）。基于不同的需求可以使用不同的适配器，具体内容可以去[commitizen](https://github.com/commitizen/cz-cli)查阅。

在项目中运行如下的命令安装cz-conventional-changelog。

```
$ commitizen init cz-conventional-changelog --save --save-exact
```

它在安装cz-conventional-changelog的同时，会自动在项目的package.json中添加如下配置：

```
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

这时你就可以在使用git add之后使用git cz根据提示，生成自动化的commit message了。

![Commitizen](https://tva1.sinaimg.cn/large/007S8ZIlly1gi13z08rjsg30hs0b41ky.gif)

## commintlint工具

​	[commitlint](https://github.com/conventional-changelog/commitlint)可以帮助我们校验commit message的格式，不符合提交的规范，直接拒绝。

### 安装和使用

```
npm i -D @commitlint/cli
```

同时commitlint也需要一份校验的配置，这里推荐@commitlint/config-conventional。

```
npm i -D @commitlint/config-conventional
```

安装好之后需要在项目的根目录下添加配置文件commitlint.config.js

```
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {}
}
```

## husky工具

​	[husky](https://github.com/typicode/husky)负责提供更易用的git hooks，方便你在执行git commit的时候触发commitlint的校验。

### 安装和使用

```
npm i -D husky
```

​	同时在package.json中添加如下配置：

```
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
```

这样在你每次执行git commit之后，就会自动检查commit message是否合格，如果不合格就会报错，同时拒绝提交。

```
husky > commit-msg (node v9.2.1)
INVALID COMMIT MSG: does not match "<type>(<scope>): <subject>" !
change
husky > commit-msg hook failed (add --no-verify to bypass)
```

## 最后

​	通过安装以上的包以及使用以上的配置，就可以实现git commit message规范的一整套流程。

