import {HookItem} from "@/classes/HookItem";

export class HookProvider {

    injectedItems = [];


    add(hookItem) {
        if (!(hookItem instanceof HookItem)) {
            throw new TypeError("We don't do that here. Inject again plzzzz");
        }

        this.injectedItems.push(hookItem)
    }

    run(currentVueState, ...specificData) {

        this.injectedItems.forEach(hookItem => {
            /**
             * @var {HookItem} hookItem
             */
            hookItem.runnableMethod.apply(currentVueState, specificData)
        })
    }

    runGetResult() {

    }
}