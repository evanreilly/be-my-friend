import React from 'react'
import moment from 'moment'
import TimelineContainer from '/imports/containers/TimelineContainer'
import OnlineReactiveContainer from '/imports/containers/OnlineReactiveContainer'
import Timeline from '/imports/components/Timeline'
import TimelineSVG from '/imports/components/TimelineSVG'
import FriendsSVG from '/imports/components/FriendsSVG'

const TimelineLayout = React.createClass({

  getInitialState() {
    return {
      name: '',
      timepoint: '',
      style: {
        display: 'none'
      }
    }
  },

  formatData(timestamp) {
    return (timestamp)
      ? moment(timestamp).format('DD.MM HH:mm:ss')
      : ''
  },

  transmitTimelineData({min, now}) {
    this.setState({now})
  },

  transmitFriendOnHover(e, friend) {
    this.setState({
      name: friend.fullName
    })
  },

  onMouseMove(e) {
    const offsetY = e.nativeEvent.offsetY || 0
    const now = this.state.now || Date.now()
    const timestamp = now - offsetY * 1000 * 30

    this.setState({
      timepoint: this.formatData(timestamp),
      style: {
        display: 'inline-block',
        top: e.nativeEvent.clientY,
        left: e.nativeEvent.clientX
      }
    })
  },

  render() {
    const lastTimeUpdated = (!this.state.now) ? '' : 'Last time updated: ' + this.formatData(this.state.now)

    return <div className="TimelineLayout" onMouseMove={this.onMouseMove}>
      <div className="TimelineLayout__info" style={this.state.style}>
        {this.state.timepoint} <br />
        {this.state.name}
      </div>
      <div className="TimelineLayout__emptyMessage">Please leave this window open, and return back in a few hours</div>
      <div className="TimelineLayout__statusBar">{lastTimeUpdated}</div>
      <div className="TimelineLayout__svgs">
        <OnlineReactiveContainer
          transmitFriendOnHover={this.transmitFriendOnHover}
        />
        <TimelineContainer
          transmitTimelineData={this.transmitTimelineData}
          component={TimelineSVG}
          interval={10000}
        />
      </div>
    </div>
  }

})

export default TimelineLayout
