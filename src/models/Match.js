import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Match = new Schema({
  matchNo: {type: String, index: true, unique: true}, //  赛事编号
  matchDate: {type: String, index: true}, //  日期精确到日
  matchTime: {type: String, index: true}, //  日期精确到分 unique:true
  matchResult: Number, // 3:主胜 0：平 1:客胜 -1：未知结果（中断之类的问题）
  matchName: String, // 赛事名
  homeTeamName: String, // 主队名
  guestTeamName: String, // 客队名
  weather: String, // 天气
  temperature: String, // 温度
  homeTeamRank: String, // 主队排名
  guestTeamRank: String, // 客队排名
  guestTeamNo: String, // 客队编号
  homeTeamNo: String, // 主队编号
  tvStation: String, // 可看比赛的电视台
  letBalls: String, // 让球
  extra: String, // 额外信息(开球，角球)
  homeHalfSoccer: Number, // 主队半场球
  guestHalfSoccer: Number, // 客队半场球
  guestSoccer: Number, // 客队终场球
  homeSoccer: Number, // 主队终场球
  homeRedNumber: Number, // 主队红卡
  guestRedNumber: Number, // 客队红卡
  matchStatus: String, // 比赛状态 （0：）
});

module.exports = mongoose.model('Match', Match);
