var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Vote = new Schema({
  createdAt : Date,
  voter     : ObjectId,
  value     : Number,
  imgUrl    : String
});

var Idea = new Schema({
  createdAt    : Date,
  updatedAt    : Date,
  shortId      : String,
  userId       : ObjectId,
  slackId      : String,
  sUserName    : String,
  img          : String,
  sTeamId      : String,
  sChannelId   : String,
  sChannelName : String,
  sTeamDomain  : String,
  sCommand     : String,
  title        : String,
  body         : String,
  tags         : [String],
  status       : String,
  voters       : [Vote],
  voteCount    : Number,
  comments     : [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  commentCount : Number,
  rating       : Number
});

module.exports = mongoose.model('Idea', Idea);
