//Schemas创建修改时间
const getMeta = () => {
    return {
        // 创建时间
        createdAt: {
            type: Number,
            default: (new Date()).getTime(),
        },
        // 更新时间
           updateAt: {
            type: Number,
            default: (new Date()).getTime(),
        },
    };
};

module.exports = {
    getMeta,
};