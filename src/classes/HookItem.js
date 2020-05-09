
export class HookItem {

    constructor(func) {
        if (typeof func !== 'function') {
            throw new TypeError("HookItem only accept FUNCTION/Anonymous Method only");
        }

        this.runnableMethod = func;
    }

}
