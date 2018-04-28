// 精选
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let WellChosen = new Schema({

	date:{
		type: String,
		required: true
	},
	matchName: String,
	hostName: String,
	hostInfo: {
		rank: Number, // 排名
		points: Number, //积分，
		trend: String, // 走势， 331110
		trendPoints: Number //走势积分
	},
	guestName: String,
	guestInfo: {
		rank: Number, // 排名
		points: Number, //积分，
		trend: String, // 走势， 331110
		trendPoints: Number //走势积分
	},
	matchTape: Number, // 1：欧，2：亚
	matchScope: Number, // 1, half， 2 whole
	odds: [Number],
	asianDish: Number,
	subjectiveForecast: [Number], //主观推测 3, 1, 0
	objectiveForecast: { //客观预测 (whole有效)
		ai: [Number], // 艾罗
		six: [Number],
	},

	isBet: Boolean, //是否投注
	betAmount: [Number], // 与 主观推测长度一致
	matchResult: [String], //[half, whole]  ['0-0', '0-2']
	isEnd: Boolean,
	result: Number
});
