// import moment from 'moment';
import {errorMessage, successMessage, MathUtil} from '../../tool/Common';
let ticketProfit = require('../../services/index').TicketProfitService;

// 添加
let addNewProfit = async (ctx) => {
  let updateProfit = {...ctx.request.body};
  updateProfit.extractAmount = MathUtil.getSum(updateProfit.extractRecords, 'amount');
  updateProfit.occupancy = MathUtil.getRatio(updateProfit.extractAmount / updateProfit.principal);
  console.log(updateProfit.extractAmount);
  console.log(updateProfit.occupancy);
  await ticketProfit.save({...updateProfit}).then(_message => {
    ctx.body = _message;
  });
};

// 查询所有
let findAllProfit = async (ctx) => {
  let condition = ctx.query;
  if (+condition.occupancy === 1) {
    condition.occupancy = {
      $gte: 100
    };
  } else if (+condition.occupancy === -1) {
    condition.occupancy = {
      $lt: 100
    };
  }
  let page = condition.page || 1;
  let pageSize = condition.pageSize || 5;
  delete condition.page;
  delete condition.pageSize;
  let data = {};
  console.log(pageSize);
  await ticketProfit.findAll(condition).count().then(count => { data.total = count; });
  await ticketProfit.findAll(condition).sort({time: -1}).skip((page - 1) * pageSize).limit(+pageSize).then(_message => {
    data.data = _message;
  });
  ctx.body = data;
};

// 查询单个
let findProfitById = async ctx => {
  await ticketProfit.findById(ctx.params.id).then(docs => {
    ctx.body = successMessage(docs);
  }).catch(error => {
    ctx.body = errorMessage(error);
  });
};

// 更新单个
let updateProfitById = async ctx => {
  let updateProfit = {...ctx.request.body};
  updateProfit.extractAmount = MathUtil.getSum(updateProfit.extractRecords, 'amount');
  updateProfit.occupancy = MathUtil.getRatio(updateProfit.extractAmount / updateProfit.principal);
  await ticketProfit.updateById(ctx.params.id, updateProfit).then(_message => {
    ctx.body = successMessage([]);
  }).catch(error => {
    ctx.body = error;
  });
};

let updateProfitPartById = async ctx => {
  let profit = {};
  await ticketProfit.findById(ctx.params.id).then(docs => {
    profit = docs[0];
    console.log(profit);
  }).catch(error => {
    ctx.body = errorMessage(error);
  });
  let updateProfit = {...(profit._doc), ...ctx.request.body};

  if (ctx.request.body.extractRecords) {
    updateProfit.extractRecords = ctx.request.body.extractRecords;
  }

  updateProfit.extractAmount = MathUtil.getSum(updateProfit.extractRecords, 'amount');

  updateProfit.occupancy = MathUtil.getRatio(updateProfit.extractAmount / updateProfit.principal);

  await ticketProfit.updateById(ctx.params.id, updateProfit).then(_message => {
    ctx.body = successMessage(_message);
  }).catch(error => {
    ctx.body = errorMessage(error);
  });
};

let deleteProfitById = async ctx => {
  let updateProfit = {...ctx.request.body, ...{deleteFlag: true}};
  await ticketProfit.updateById(ctx.params.id, updateProfit).then(_message => {
    ctx.body = successMessage([]);
  }).catch(error => {
    ctx.body = error;
  });
};

export let apis = [
  [ 'post', '/ticket/profits', addNewProfit ],
  [ 'get', '/ticket/profits', findAllProfit ],
  [ 'get', '/ticket/profits/:id', findProfitById ],
  [ 'put', '/ticket/profits/:id', updateProfitById ],
  [ 'patch', '/ticket/profits/:id', updateProfitPartById ],
  [ 'delete', '/ticket/profits/:id', deleteProfitById ],
  [ 'options', '/ticket/profits/:id', findAllProfit ],
];
