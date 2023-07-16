// 手写call
Function.prototype.myCall = function (context) {
    // 获取参数
    const args = [...arguments].slice(1);
    let result = null;
    // 判断context是否传入，未传入设为window
    context = context || window;
    context.fn = this;
    result = context.fn(...args);
    delete context.fn;
    return result;
}
// 手写apply
Function.prototype.myApply = function (context) {
    const args = [...arguments].slice(1);
    let result = null;
    context = context || window;
    context.fn = this;
    result = context.fn(...args);
    delete context.fn;
    return result;
}
// 手写bind
Function.prototype.myBind = function(context) {
    const fn = this;
    const args = [...arguments].slice(1);
    return function Fn(...newArgs) {
        return fn.apply(context, [...args, ...newArgs]);
    }
}