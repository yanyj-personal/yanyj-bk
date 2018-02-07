let mongoose = require('mongoose');
let matchService = require('../../services/index').MatchService;

let getMatches = async (ctx) => {
  let limit = +ctx.query.limit;
  await matchService.find({}, 'homeTeamName guestTeamName').limit(limit).then(docs => {
    ctx.body = {data: docs};
  });
};

let getHistory = async (ctx) => {
  let id = ctx.params.id;
  await matchService.find({_id: mongoose.Types.ObjectId(id)}, 'homeTeamName guestTeamName');
};

export let apis = [
  ['get', '/ticket/matches', getMatches],
  ['get', '/ticket/matches/history/:id', getHistory],
];
