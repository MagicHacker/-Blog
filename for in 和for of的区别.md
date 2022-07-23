## for in
+ 遍历出的是key值，且key值是字符串。
+ 遍历的顺序是随机顺序。
+ for in会遍历出原型链上的属性。
所以for in更适合遍历对象，不适合遍历数组。
## for of
正因为for in不是个遍历数组，所以才引入了for of。
+ 遍历出的是value值。
+ 不能遍历普通的对象，好像是会typeError报错。
+ 只能遍历可迭代对象，比如Array，Map，Set。
