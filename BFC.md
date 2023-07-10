# BFC

BFC即块级格式化上下文，是web页面中盒模型布局的CSS渲染模式，是指一个独立的渲染区域或者说是一个隔离的独立容器，它规定了内部元素如何布局，并且与外部元素互相隔离。在一个BFC中，所有的子元素会根据一定的规则进行布局，这些规则包括：浮动，清楚浮动，尺寸计算等。

## 创建BFC的方式

+ 元素设置浮动，float属性设置除了none以外的值。
+ position属性为absolute和fixed。
+ display属性设置为inline-block，flex等。
+ overflow设置为hidden，auto，scroll。

## BFC的特点

+ 垂直方向上，自上而下排列，和文档流的排列方式一致。
+ 在BFC中上下相邻的两个容器margin会重叠。
+ BFC区域不会与浮动的容器发生重叠。

## BFC的作用

+ 解决margin重叠的问题。
+ 解决容器高度塌陷的问题。对子元素设置浮动后，父元素会发生高度塌陷，即height变为0。只需将父元素变成一个BFC即可，常用的办法就是给父元素设置overflow:hidden。