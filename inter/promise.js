// 手写Promise
const Pending = 'pending';
const Fullfilled = 'fulfilled';
const Rejected = 'rejected';

class Promise {
    constructor(exector) {
        // 状态默认为pending
        this.status = Pending;
        // 存放成功状态的值
        this.value = undefined;
        // 存放失败的原因
        this.reason = undefined;
        const resolve = (value) => {
            if (this.status === Pending) {
                this.status = Fullfilled;
                this.value = value;
            }
        }
        const reject = (reason) => {
            if (this.status = Pending) {
                this.status = Rejected;
                this.reason = reason;
            }
        }
        try {
            exector(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        if (this.status === Fullfilled) {
            onFulfilled(this.value)
        }
        if (this.status === Rejected) {
            onRejected(this.reason)
        }
    }
}