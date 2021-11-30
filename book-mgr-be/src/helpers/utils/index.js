const getBody = (ctx) => {
    return ctx.request.body || {};//ctx.request.body：请求体，若无，则返回空对象{}
};

module.exports = {
    getBody,
}