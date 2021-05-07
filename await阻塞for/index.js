(async () => {
    const ids = [34112, 98325, 681251];

    const request = (item) => {
        console.log(`start -${item}`);

        return new Promise((res, rej) => {
            setTimeout(() => {
                res(item);
            }, 2000);
        });

    }

    for (let item of ids) {
        await request(item);
        console.log(`end - ${item}`);
    };
})()