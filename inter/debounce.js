/**
 * 防抖：高频事件触发后，N秒内函数只会执行一次，如果N秒内事件再次触发，则会重新计时
 * 使用场景：
 * 按钮提交事件
 * 页面滚动事件
 */
function debounce(fn, wait) {
    let timer = 0;
    return function () {
        const context = this;
        const args = [...arguments];
        // N秒内又触发了，所以重新计时
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait)
    }
}
/**
 * 节流：高频事件触发后，N秒内只执行一次
 * 使用场景：
 * DOM元素拖拽
 * 滚动事件
 */
function throttle(fn, wait) {
    const args = [...arguments];
    let prevTime = 0;
    return function () {
        const context = this;
        const nowTime = Date.now();
        if (nowTime - prevTime >= wait) {
            fn.apply(context, args);
            prevTime = nowTime;
        }
    }
}