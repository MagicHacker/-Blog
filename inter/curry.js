/**
 * 柯里化：将使用多个参数的函数转换成一系列使用一个参数的函数。
 */
function curry(fn) {
    const foo = (...args) => {
        if (args.length === fn.length) {
            return fn(...args);
        }
        return (...arg) => foo(...arg, ...args);
    }
    return foo;
}