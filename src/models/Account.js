import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Account = new Schema({
  type: { // 账户类型 1：银行账户， 2：虚拟账户， 3;个人钱包
    type: Number,
    require: true,
    default: 1
  },
  createTime: { // 创建时间
    type: String,
    require: true,
  },
  name: { // 账户名称
    type: String,
    require: true
  },
  amount: { // 账户金额
    type: Number,
    require: true,
    default: 0.0
  },
  rates: { // 七日年利率
    type: Number,
    default: 0.0
  },
  revenueType: { // 0: 手动， 1：本金加利息计算只提供每日计算的（如支付宝），后期扩展
    type: Number,
    default: 0
  },
  activateFlag: { // 使用标志
    type: Boolean,
    default: true
  },
  frozenAmount: { // 未计算收益的总数
    type: Number,
    default: 0
  },
  frozen: [
    {
      cat: String, // 开始计算收益的时间
      amount: Number,
    }
  ],
  deleteFlag: { // 删除标志
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Account', Account);
