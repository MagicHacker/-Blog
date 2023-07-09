# new操作符

+ 创建一个新的空对象。
+ 设置新对象的\__proto\__属性指向构造函数的prototype。
+ 改变this指向，将构造函数的this指向这个对象。
+ 返回这个新对象。

```javascript
function myNew(...args) {
  const obj = {};
  obj.__proto__ = myNew.prototype;
  myNew.apply(obj, args);
  return obj;
}
```

