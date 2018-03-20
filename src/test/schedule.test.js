let ForecastService = require('../services/index').ForecastService;

ForecastService.find({periods: '2018018'}).then(function (docs) {
	console.log(docs.length)
});
