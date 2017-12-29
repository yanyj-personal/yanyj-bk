import moment from 'moment';
let AccountService = require('../services/index').AccountService;

let addNewAccount = async (ctx) => {
  await AccountService.save({...ctx.request.body, createTime: moment().format('YYYY-MM-DD HH:mm:ss')}).then(_message => {
    ctx.body = _message;
  });
};

let getAccuntsByCondition = async (ctx) => {
  await AccountService.find({}).then(_message => {
    ctx.body = _message;
  });
};

export let apis = [
  ['get', '/accounts', getAccuntsByCondition],
  ['post', '/accounts', addNewAccount]
];
