import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Forecast = new Schema({
  periods: Number, // 周期
  matchNo: Number, // 编号
  matchName: String, // 赛事名称
  hostName: String, // 主队名
  awayName: String, // 客队名
  hostTrend: String, // 主队走势 Cancel
  awayTrend: String, // 客队走势 Cancel
  hostTapeTrend: String, // 主队盘口走势 Cancel
  awayTapeTrend: String, // 客队盘口走势 Cancel
  forecast: Number, // 预测结局 相对于主队， 3,1,0
  startNumber: Number, // 信息指数， 5个最满
  against: String, // 对战信息，
  hostHalfNumber: Number, // 主队半场得分
  awayHalfNumber: Number, // 客队半场得分
  hostFinalNumber: Number, // 主队最终得分
  awayFinalNumber: Number, // 客队最终得分
  finalResult: Number, // 最终结果 3,1,0,-1 -- 未结束
  forecastResult: Number, // 预测结果输赢 1-赢,0-输
});

module.exports = mongoose.model('Forecast', Forecast);
