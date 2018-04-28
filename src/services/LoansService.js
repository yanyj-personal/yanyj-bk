let Loans = require('../models/Loans');

export let save = (loans = {}) => {
  let _loans = new Loans({ ...loans });
  return _loans.save((error, docs) => {
    if (error) throw new Error(error);
  });
};

export let find = (condition, column) => {
  return Loans.find({...condition}, column, (error) => {
    if (error) throw new Error(error);
  });
};
