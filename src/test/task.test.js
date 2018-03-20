import {forecastTask} from '../task/forecast-task';
let Forecast = require('');
// import {DBConfig} from "../config";
import mongoose from 'mongoose';
import {
	// System as SystemConfig,
	DBConfig
} from '../config';
mongoose.Promise = global.Promise;
mongoose.connect(DBConfig.url, {useMongoClient: DBConfig.useMongoClient});

let db = mongoose.connection;

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', () => {
	console.log('数据库连接成功');
});
forecastTask(2018016)
