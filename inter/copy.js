// 浅拷贝
function shallowCopy(obj) {
    if (typeof obj !== 'object') return;
    const newObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
// 深拷贝
function deepCopy(obj) {
    if (typeof obj !== 'object') return;
    const newObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' ) {
                newObj[key] = deepCopy(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}