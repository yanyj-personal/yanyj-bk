
let ForecastService = require('../services/index').ForecastService;
import { getPage, getString } from '../tool/Common';
import cheerio from 'cheerio';
import Forecast from '../models/Forecast';
let schedule = require('node-schedule')


let forecastTask = async (periods = '') => {
   getPage('http://odds.zgzcw.com/macao/sfc/' + periods).then(async res => {
    let $ = cheerio.load(res);
	   if(!$('#xchg').length ) {
		   return;
	   }
    // 期数
    let periodS = periods;
    periodS = periodS ? periodS : $('#xchg').find("option:selected").val();

    let forecast;

    $('.xs_trbg').map(function (tag) {
	  forecast = {};
	  forecast.periods = periodS;
	  forecast.matchNo = +$(this).find('.wtd01').html();
	  forecast.matchName = getString($(this).find('.g_lmb').html());
	  forecast.hostName = getString($(this).find('.wtd04  a').html().trim());
	  forecast.awayName = getString($($(this).find('.xs_tema  a').get(1)).html().trim());
	  // forecast.hostTrend = getString($($(this).find('.xs_tema  a').get(1)).html());

	  let forecastResult = getString($(this).find('.wtd07 > h4').html());
	  if (forecastResult === forecast.hostName) {
		forecast.forecast = 3;
	  } else if (forecastResult === forecast.awayName) {
		forecast.forecast = 0;
	  } else {
		  forecast.forecast = 1;
	  }

	   forecast.startNumber = +$(this).find('.xs_star').length;
	  let socre = $(this).find('.wtd09').html().trim();

	  if(socre) {
	  		let socres = socre.split('(');
		  forecast.hostFinalNumber = +socres[0].split(':')[0] ?  +socres[0].split(':')[0]: 0;
		  forecast.awayFinalNumber = +socres[0].split(':')[1]?  +socres[0].split(':')[1]: 0;
		  forecast.hostHalfNumber = +socres[1].split(':')[0]?  +socres[1].split(':')[0]: 0;
		  forecast.awayHalfNumber = parseInt(socres[1].split(':')[1]) ? parseInt(socres[1].split(':')[1]): 0;
		  if(forecast.hostFinalNumber > forecast.awayFinalNumber) {
		  	forecast.finalResult = 3;
		  } else if(forecast.hostFinalNumber < forecast.awayFinalNumber) {
			  forecast.finalResult = 0;
		  } else {
			  forecast.finalResult = 1;
		  }

		  if(forecast.forecast === forecast.finalResult) {
			  forecast.forecastResult = 1;
		  } else {
			  forecast.forecastResult = 0;
		  }
	  } else {
		  forecast.finalResult = -1;
	  }

		ForecastService.update({periods: forecast.periods, matchName: forecast.matchName, hostName: forecast.hostName, awayName: forecast.awayName}, forecast);

    });
  });
};

// 入口方法
// export let run = () => {
// 	//设置定时任务
//
// 	var rule     = new schedule.RecurrenceRule();
// 	var hours    = [1,4,8,12,16,17,20,24];
// 	rule.hour  = hours;
// 	schedule.scheduleJob(rule, function () {
// 		forecastTask();
// 		getPage('http://odds.zgzcw.com/macao/sfc/').then(async res => {
// 			let $ = cheerio.load(res);
// 			if (!$('#xchg').length) {
// 				return;
// 			} else {
// 				forecastTask($($('#xchg').find('option').get(1)).val())
// 			}
//
// 		});
// 	});
// 	// forecastTask();
// }

export let run = () => {
	//设置定时任务


		forecastTask(2018018);
		forecastTask(2018017);
		forecastTask(2018016);
		forecastTask(2018015);
		forecastTask(2018014);
		forecastTask(2018013);
		forecastTask(2018012);
		forecastTask(2018011);
		forecastTask(2018010);
		forecastTask(2018009);
		forecastTask(2018008);
		forecastTask(2018007);
		forecastTask(2018006);
		forecastTask(2018005);
		forecastTask(2018004);
		forecastTask(2018003);
		forecastTask(2018002);
		forecastTask(2018001);
	forecastTask();
}

