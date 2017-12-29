import {errorMessage, successMessage} from '../tool/Common';
import mongoose from 'mongoose';
let TicketProfit = require('../models/TicketProfit');

export let save = (ticketProfit = {time: new Date(), amount: 0.0}) => {
  console.log(ticketProfit);
  let _ticketProfit = new TicketProfit({...ticketProfit});
  return _ticketProfit.save((error, docs) => {
    if (error) return errorMessage(error);
    return successMessage([]);
  });
};

export let findAll = (condition) => {
  return TicketProfit.find({...condition, deleteFlag: false}, (error, docs) => {
    if (error) return errorMessage(error);
    return successMessage(docs);
  });
};

export let findById = (id) => {
  let ObjectId = mongoose.Types.ObjectId(id);
  return TicketProfit.find({_id: ObjectId, deleteFlag: false}, (error, docs) => {
    if (error) return errorMessage(error);
    return successMessage(docs);
  });
};

export let updateById = async (id, profit) => {
  let ObjectId = mongoose.Types.ObjectId(id);
  return TicketProfit.update({_id: ObjectId}, profit, (error, docs) => {
    if (error) return errorMessage(error);
    return successMessage([docs]);
  });
};

export let aggretate = async (condition) => {
  return TicketProfit.aggregate([{
    $match: {
      deleteFlag: false,
      time: {$lte: condition.endYear, $gte: condition.startYear}
    },

  }, {
    $project: {
      time: {$substr: ['$time', 0, condition.type]},
      principal: '$principal',
      extractAmount: '$extractAmount',
    }
  },
  {
    $group: {
      _id: '$time', // 将_id设置为day数据
      totalPrincipal: { $sum: '$principal' },
      totalExtarctAmount: { $sum: '$extractAmount' }
    }
  },
  {
    $sort: {'_id': 1}
  }]);
};
