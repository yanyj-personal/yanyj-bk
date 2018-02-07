let Match = require('../models/Match');

export let save = (account = {time: new Date(), amount: 0.0}) => {
  let _match = new Match({ ...account });
  return _match.save((error, docs) => {
    if (error) throw new Error(error);
  });
};

export let find = (condition, column) => {
  return Match.find({...condition}, column, (error) => {
    if (error) throw new Error(error);
  });
};


