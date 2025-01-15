let currentCb;

export const signal = (value) => {
    const callbacks = new Set();

    const notify = () => callbacks.forEach(cb => cb());

    const get = () => {
        if (currentCb) {
            callbacks.add(currentCb);
        }

        return value;
    };
    const set = (v) => {
        value = v;

        notify();
    };

    const update = (cb) => {
        value = cb(value);

        notify();
    }

    get.set = set;
    get.update = update;

    return get;
}


export const effect = (cb) => {
    currentCb = cb;

    cb();

    currentCb = null;
};

export const computed = (cb) => {
    return cb;
};

// const num = signal(10);
// const doubleNum = computed(() => num() * 2);
// console.log(doubleNum());
// console.log(num()) //10

// effect(() => console.log(num(), doubleNum()));

// num.set(15);
// console.log(num()) //15