import {errorMessage, successMessage} from "../tool/Common";

let Forecast = require('../models/Forecast');

export let save = (forecast = {}) => {
	let _forecast = new Forecast({ ...forecast });
	return _forecast.save((error, docs) => {
		if (error) throw new Error(error);
	});
};


export let find = async (condition = {}) => {
	return await Forecast.find({...condition}, (error, docs) => {
		if (error) return errorMessage(error);
		return successMessage(docs);
	});
};

export let update = async (condition = {}, doc) => {
	return await Forecast.update({...condition}, doc,{upsert: true}).then(function (res) {
		if(res.nModified) {
			console.log(`第[${doc.periods}]期 ${doc.matchName} ${doc.hostName} VS ${doc.awayName} 更新成功！`)
		} else if(res.upserted) {
			console.log(`第[${doc.periods}]期 ${doc.matchName} ${doc.hostName} VS ${doc.awayName} 保存成功！`)
		}
	});
};

export let isExsist = async (condition = {}) => {
	let is;
	await Forecast.find({...condition}).then(function (docs) {
		if(docs.length === 0) {
			is = false;
		} else {
			is = true
		}
	});
	// console.log('1' + is)
	return is;
};

