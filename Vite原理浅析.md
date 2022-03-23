# Vite原理浅析

## 当前工程化的痛点

​		在浏览器支持ES Module之前，JavaScript并没有提供原生机制让开发者以模块化的方式进行开发。这也是打包工具诞生的原因：使用工具抓取，处理并将源码模块串联成可以在浏览器中运行的文件。

​		虽然现在有webpack，Rollup等工具，极大地改善了前端开发者的体验。但是当构建的应用越来越大时，需要处理的JavaScript代码量也呈指数级增长。一个项目包含数千个模块相当普遍。开发者开始遇到性能瓶颈。使用JavaScript开发的工具通常需要很长的时间才能启动开发服务器，即使使用HMR，文件修改后的效果也需要一定的时间才能在浏览器中呈现出来，如此循环往复，极大地影响开发体验。

### 缓慢的服务启动

​		常用的打包构建工具比如webpack，主要是通过抓取-编译-构建整个应用的代码，之后生成一份编译，优化后能良好地兼容各个浏览器的代码。在开发环境的流程也基本相同，需要先将整个应用构建打包后，再把打包后的代码交给dev server，首次启动非常慢。随着前端业务的复杂化，项目的大型化，JavaScript的代码量呈指数级增长，打包构建的时间越来越久，大型项目的dev server启动时间达到几十秒甚至几分钟。

​		常见的打包器dev server的过程：

<img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h0hvm5aig7j21ha0to41g.jpg" alt="bundle" style="zoom:25%;" />

### 缓慢的更新

​		基于打包器启动时，重建整个包的效率很低。虽然现在打包器支持了模块的HMR热更新，但是当项目中的文件变动时，打包器会对相关的依赖（不只是当前文件）重新打包。热更新的速度会随着程序体积的增长而显著下降，已到达性能瓶颈，没有多少优化空间了。

## 为什么选择Vite？

​		Vite利用前端生态中的新进展解决上述的问题。浏览器开始原生支持ES Module，且越来越多的前端工具使用编译型语言编写，如Go（ESBuild）和Rust（SWC)。

### 解决缓慢的启动

​		Vite直接把转换后的ES Module代码，扔给支持ES Module的浏览器，利用浏览器对ES Module的支持（script标签加上属性type="module"即可），让浏览器自己去加载，浏览器直接向dev server逐个请求各个模块，而不需要提前将所有文件进行打包，从而达到项目快速启动的效果。

​		Vite在一开始将应用中的模块分为**依赖**和**源码**，改进了**开发服务器**的启动时间。

+ **依赖**大多为开发时不会变动的纯JavaScript。一些较大的依赖（比如有上百个模块的组件库）处理的代价很高。并且依赖也通常会存在多种模块化格式比如CommonJS，ES Module等等。Vite使用ESBuild预构建依赖。借助ESBuild超快的编译速度对第三方库进行构建，一方面将零散的文件预构建打包到一起，减少网络请求，另一方面全面转换ES Module语法，以适配浏览器内置的ES Module支持。ESBuild使用Go编写，比用纯JavaScript编写的打包工具的预构建依赖快10~100倍。
+ **源码**通常包含一些并非直接是JavaScript的文件，比如CSS等。这些文件需要转换，且时常会被编辑。同时并不是所有的源码模块都需要同时被加载。Vite以原生ES Module的方式提供源码。这实际上是让浏览器接管了打包的部分工作，Vite只需要在浏览器请求源码时进行转换并**按需**提供源码即可。

​		Vite的dev server的过程：

<img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h08ev9bxtyj219q0smjtt.jpg" alt="esm" style="zoom:25%;" />

### 解决缓慢的更新

​		在Vite中，HMR是在原生ES Module上执行的。当编辑一个文件时，Vite只需要精确地使已编辑的模块与其最近的HMR边界之间的连接失活（大多数只是模块本身），不用重新构建整个应用，就可完成模块的热更新，使得无论应用的大小如何，HMR都能始终保持快速更新。同时Vite利用浏览器缓存来加速整个页面的重新加载：**源码模块**的请求会根据304 not Modified进行协商缓存，而**依赖模块**会通过Cache-control进行强制缓存，一旦被缓存它们将不会再次请求。

## Vite简介

​		Vite是一种新型的前端构建工具，基于ESBuild和Rollup。在开发环境依靠浏览器自身的ES Module编译功能去解析**import**，**dev server**对模块进行编译，按需返回，完全去掉了打包的步骤。同时在开发环境拥有高效的模块热更新（HMR），且热更新的速度不会随着模块的增多而变慢，显著提升**开发**体验。

​		主要有两部分组成：

+ 开发构建：基于浏览器原生的ES Module能力来提供源文件，同时内置了高效的HMR。
+ 生产构建：生产环境使用Rollup进行打包，Vite提供指令来优化构建打包过程。

### Vite特点

+ 快速的冷启动：No Bundle + ESBuild预构建。
+ 即时的模块热更新：基于ES Module的HMR，同时利用浏览器缓存策略提升速度。
+ 真正的按需加载：利用浏览器对ES Module的支持，实现真正的按需加载。

### 浏览器的支持

+ 开发环境：Vite需要在支持原生ES Module的导入的浏览器上使用。
+ 生产环境：浏览器需要支持**通过script标签引入原生ES Module**。可以通过官方插件**@vitejs/plugin-legacy**支持旧浏览器。

<img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h0gq1szs72j21240fn0vs.jpg" alt="image-20220320223455897" style="zoom: 50%;" />

### Vite主体流程

<img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h0hyb0ilfrj20oo0dtgn4.jpg" alt="image-20220322000610880" style="zoom:50%;" />

## Vite原理

​		当声明一个script标签类型为module时，比如：

```html
<script type="module" src="/src/main.js"></script>
```

​		浏览器解析资源的时候，会往当前域名发起一个HTTP请求，获取main.js文件。然后发现main.js内部含有import引入的模块，所以又会发起HTTP请求获取模块的内容。而Vite在启动项目阶段，会启动一个Koa dev server拦截浏览器对ES Module的请求，dev server对模块进行处理后，将模块加载到浏览器中即可。因此跳过了整体打包的阶段，而且是按需加载的。

### 请求拦截原理

​		当碰到import时，浏览器会发起一个HTTP请求获取模块内容。而dev server在收到请求之后，会拦截该请求，并对模块进行处理之后返回相应的结果。

#### 重写模块路径

​		由于浏览器只能识别**./、../**这样开头的相对路径以及**/**开头的绝对路径，而开发过程中经常会引入node_modules下的模块，浏览器无法识别和加载。因此Vite的dev server在请求拦截时通过es-module-lexer和magic-string这两个库对模块的路径进行重写。

### HMR原理

​		Vite的热更新原理，其实就是在客户端与服务端之间建立了一个websocket链接监听文件的改变，当文件被修改时，dev server发送消息通知客户端修改相应的代码。

​		热更新主体流程：

  + 创建一个websocket服务端和client文件，启动服务。

    项目启动后Vite会在处理html时将client注入。

    <img src="/Users/zhangxuan/Library/Application Support/typora-user-images/image-20220323000909624.png" alt="image-20220323000909624" style="zoom:50%;" />

    

  + 通过chokidar的watch方法创建一个监听对象watcher，监听文件的变更。

    ```javascript
      const watcher = chokidar.watch(path.resolve(root), {
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          ...(Array.isArray(ignored) ? ignored : [ignored])
        ],
        ignoreInitial: true,
        ignorePermissionErrors: true,
        disableGlobbing: true,
        ...watchOptions
      }) as FSWatcher
      ....
      watcher.on('change', async (file) => {
    
      })
      watcher.on('add', (file) => {
      })
      watcher.on('unlink', (file) => {
      })
    ```

  + 当代码变更后，服务端进行判断处理并推送到客户端。

		+ 客户端根据推送消息的类型执行不同的更新操作。

​		client对推送消息类型的处理

<img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h0j42pgzhrj20et0g90vf.jpg" alt="image-20220323001117945" style="zoom:50%;" />

## Vite的优化

### 依赖预构建

​		Vite会对依赖进行预构建有两个原因：

+ CommonJS和UMD兼容性：由于Vite是基于浏览器原生支持ES Module的能力去实现的，但是在开发阶段中，Vite将所有代码视为原生ES Module模块，因此Vite必须提前将CommonJS和UMD发布的依赖项转换为ES Module，并缓存入node_modules/.vite。
+ 减少模块和请求的数量：Vite将有许多内部模块的ESM依赖关系转换为单个模块，以此来提高页面的加载性能。一些包将他们的ES Module构建作为许多独立的文件相互导入。比如**lodash-es**有超过**600**个内置模块。当解析 `import { debounce } from 'lodash-es'` 时，浏览器同时发出 600 多个 HTTP 请求！这些请求会造成网络拥堵，影响页面的加载。因此Vite通过预构建将**lodash-es**构建为一个模块，所以只需要一个HTTP请求即可。

### 缓存

#### 文件系统缓存

​		Vite会将预构建的依赖缓存到node_modules/.vite。它根据几个源来决定是否需要重新运行预构建步骤：

+ package.json中的dependencies列表。
+ 包管理器的 lockfile，例如 `package-lock.json`, `yarn.lock`，或者 `pnpm-lock.yaml`。
+ 可能在 `vite.config.js` 相关字段中配置过的。

只有在上述其中一项发生更改时，才需要重新运行预构建。

如果出于某些原因，你想要强制 Vite 重新构建依赖，你可以用 `--force` 命令行选项启动开发服务器，或者手动删除 `node_modules/.vite` 目录。

#### 浏览器缓存

​		**源码模块**的请求会根据304 not Modified进行协商缓存，而**依赖模块**则会通过Cache-Control：max-age=3253600,immutable进行强制缓存，一旦被缓存它们将不再需要再次请求。

## 当前存在的问题

+ 对React的支持不如Vue全面。
+ 移动端浏览器的兼容性问题。
+ Vite生态不如webpack强大。

