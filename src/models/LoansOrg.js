import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Loans = new Schema({
 orgName: {
   type: String,
   require: true
 },

});

module.exports = mongoose.model('Loans', Loans);
