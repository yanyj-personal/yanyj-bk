import moment from 'moment';
import { getAnalysis, getChartDataByAggregate } from '../../tool/Common';
let ticketProfit = require('../../services/index').TicketProfitService;

let getMonthAnalysis = async (ctx) => {
  let analysis = {};
  let startMonth = moment().startOf('month').format('YYYY-MM-DD') + ' 00:00:00';
  let endMonth = moment().endOf('month').format('YYYY-MM-DD') + ' 23:59:59';
  await ticketProfit.findAll({time: { $gte: startMonth, $lte: endMonth }}).count().then(count => { analysis.totalMonth = count; });
  await ticketProfit.findAll({time: { $gte: startMonth, $lte: endMonth }}).then(docs => {
    analysis = {...analysis, ...getAnalysis('month', docs)};
  });
  ctx.body = analysis;
};

let getProfitsAnalysis = async (ctx) => {
  // let analysis = {};
  // let incomeStat = {};
  let startYear = moment().startOf('year').format('YYYY-MM-DD') + ' 00:00:00';
  let endYear = moment().endOf('year').format('YYYY-MM-DD') + ' 23:59:59';

  await ticketProfit.aggretate({startYear, endYear, type: 10}).then(data => {
    ctx.body = { incomeTrendDate: getChartDataByAggregate(data) };
  });
  await ticketProfit.aggretate({startYear, endYear, type: 7}).then(data => {
    ctx.body.incomeTrendMonth = getChartDataByAggregate(data);
  });
  await ticketProfit.aggretate({startYear: moment().subtract(5, 'years').startOf('year').format('YYYY-MM-DD') + ' 00:00:00', endYear, type: 4}).then(data => {
    ctx.body.incomeTrendYear = getChartDataByAggregate(data);
  });
};

let getProfitAmount = async (ctx) => {
  ctx.body = {};
  let startYear = moment().startOf('year').format('YYYY-MM-DD') + ' 00:00:00';
  let endYear = moment().endOf('year').format('YYYY-MM-DD') + ' 23:59:59';
  let counts;
  await ticketProfit.aggretate({startYear, endYear, type: 7}).then(data => {
    counts = getChartDataByAggregate(data);
    ctx.body.year = counts.amount;
    counts = counts.data;
  });

  let income = counts.filter(obj => obj.x === moment().startOf('month').format('YYYY-MM'))[0];
  if (income) {
    ctx.body.month = income.y;
  } else {
    ctx.body.month = 0.0;
  }
  let startWeek = moment().startOf('week').add(1, 'd').format('YYYY-MM-DD') + ' 00:00:00';
  let endWeek = moment().endOf('week').add(1, 'd').format('YYYY-MM-DD') + ' 23:59:59';
  await ticketProfit.aggretate({startWeek, endWeek, type: 10}).then(data => {
    counts = getChartDataByAggregate(data);
    ctx.body.week = counts.amount;
  });
};

export let apis = [
  ['get', '/ticket/analysis/profits/month', getMonthAnalysis],
  ['get', '/ticket/analysis/profits', getProfitsAnalysis],
  ['get', '/ticket/analysis/profits/amount', getProfitAmount],
];
