let Account = require('../models/Account');

export let save = (account = {time: new Date(), amount: 0.0}) => {
  let _account = new Account({ ...account });
  return _account.save((error, docs) => {
    if (error) throw new Error(error);
  });
};

export let find = (condition) => {
  return Account.find({...condition, deleteFlag: false}, (error) => {
    if (error) throw new Error(error);
  });
};
