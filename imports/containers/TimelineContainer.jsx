import React from 'react'
import { Meteor } from 'meteor/meteor'
import Periods from '/imports/collections/Periods'
import TimelineLayout from '/imports/layouts/TimelineLayout'

const TimelineContainer = React.createClass({

  componentDidMount() {
    this.fetchData()
    this.interval = setInterval(this.fetchData, 1000)
  },

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval)
  },

  fetchData() {
    Meteor.call('getActivity', null, (err, res) => {
      if (err != null) return console.error('TimelineContainer: getActivity: error:', err)
      this.setState({ res })
    })
  },

  render() {
    if (!this.state) return null
    return <TimelineLayout {...this.state.res} />
  }

})

export default TimelineContainer
