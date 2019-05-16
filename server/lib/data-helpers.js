"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  console.log('making data helpers');
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: (callback) => {
      simulateDelay(async () => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        const tweets = await db
          .collection('tweets')
          .find()
          .toArray();

        callback(null, tweets.sort(sortNewestFirst));
      });
    }
  };
}
