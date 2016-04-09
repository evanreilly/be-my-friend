Meteor.publish 'points', (limits)->

  if !limits? or !limits.start? or !limits.stop?
    @ready
    return []

  oneDayActivity = Activities.find {
    lastActive: {
      $gte: limits.start
      $lt: limits.stop
    }
  }, {
    sort: {lastActive: 1}
  }

  console.log 'oneDayActivity', oneDayActivity.count()
  return oneDayActivity