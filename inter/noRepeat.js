// 数组去重
function unique(arr) {
    return Array.from(new Set(arr))
}

function unique(arr) {
    const brr = [];
    for (let i = 0; i < arr.length; i++) {
        if (brr.indexOf(arr[i]) === -1) {
            brr.push(arr[i]);
        }
    }
    return brr;
}

function unique(arr) {
    const result = arr.filter((item, index, brr) => {
        return brr.indexOf(item) === index;
    })
    return result;
}