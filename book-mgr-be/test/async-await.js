// arg参数，isReject拒绝
// Promise 实例，承诺做完后，既等待（await）再赋值
// async 函数 返回的是一个 promise
const request = (arg,isReject) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if (isReject) {
                reject('出错了');
                return;
            }
            console.log(arg);
            resolve(arg + 1);
        }, 1000);
    });
};
//res1 = await request(1) 等待request(1)做完才赋值res1，await只在async函数内有用
const fn = async () => {
    const res1 = await request(1);   //输出1，res1 = 2
    const res2 = await request(res1);//输出2，res2 = 3
    const res3 = await request(res2);//输出3，res3 = 4
    const res4 = await request(res3);//输出4，res4 = 5
    const res5 = await request(res4);//输出5，res5 = 6

    console.log(res5);               //输出6
}

fn()