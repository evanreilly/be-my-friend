import Friends from '/imports/collections/Friends'
import Periods from '/imports/collections/Periods'
import moment from 'moment'

Meteor.methods({
  getOneDayActivity(limits) {
    let out = {
      friends: [],
      now: Date.now()
    }
    console.log('getOneDayActivity start', out.now)

    // find all friends
    const friends = Friends.find({}, {sort: {fullName: 1}}).fetch()
    friends.forEach(each => {
      out.friends.push({userID: each.userID, label: each.fullName})
    })

    // if (limits == null) {
    //   limits = {}
    // }
    // if (limits.start == null) {
    //   limits.stop = now
    //   limits.start = limits.stop - (24*60*60*1000)
    // }
    // if (limits.stop == null) {
    //   limits.stop = moment(limits.start).add(1,'days').valueOf()
    // }

    // get all associated periods
    let ids = out.friends.map(each => each.userID)
    let periods = Periods.find({
      userID: {$in: ids},
      // lastActive: {
      //   $gte: limits.start
      //   $lt: limits.stop
      // }
      finished: true
    }, {
      sort: {lastActive: 1}
    }).fetch()

    // add statistics to output
    out.length = periods.length
    out.min = periods[0].firstActive
    out.max = periods[periods.length - 1].lastActive

    // connect periods to friends
    out.friends.map(function(friend, index) {
      friend.periods = []

      periods.forEach(function(period) {
        if (friend.userID !== period.userID) return

        // create new period
        let ret = {
          from: period.firstActive,
          to: (period.finished !== true || period.lastActive == null)
            ? out.now
            : period.lastActive
        }

        // hide periods longer than 200 minuts
        if (ret.to - ret.from > 200 * 60 * 1000) return

        // summarize full online activity of each friend
        friend.summ = (friend.summ || 0) + ret.to - ret.from

        // push processed period
        friend.periods.push(ret)
      })

      return friend
    })

    // out.friends.sort (a, b)-> a.summ - b.summ
    // out.friends = out.friends.slice(out.friends.length - 200)

    console.log('getOneDayActivity stop', new Date())
    return out
  }
})
