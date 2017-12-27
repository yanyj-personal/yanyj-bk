import moment from 'moment';
import { getAnalysis } from '../../tool/Common';
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

export let apis = [
  ['get', '/ticket/analysis/profit/month', getMonthAnalysis]
];
