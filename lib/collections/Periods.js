const Periods = new Mongo.Collection('periods')

Meteor.startup(function() {
  if (!Meteor.isServer) return
  Periods._ensureIndex({"userID": 1, "firstActive": 1, "lastActive": 1})
})

export default Periods