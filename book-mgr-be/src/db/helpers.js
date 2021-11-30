// Schemas创建修改时间
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

const preSave = function(next) {
    if (this.isNew) {
      const ts = Date.now();
  
      this['meta'].createdAt = ts;
      this['meta'].updatedAt = ts;
    } else {
      this['meta'].updatedAt = Date.now();
    }
  
    next();
  };
  
  module.exports = {
    getMeta,
    preSave,
  };