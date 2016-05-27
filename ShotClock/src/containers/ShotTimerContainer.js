import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetTimer } from '../actions'


// Container constants
const UPDATE_INTERVAL = 100


class ShotTimerContainer extends Component {
  constructor(props) {
    super(props)

    // Internal Attributes
    this.intervalId = undefined

    // Internal methods
    this.updateTimer = this.updateTimer.bind(this)
    this.getTimeStarted = this.getTimeStarted.bind(this)

    // State
    this.state = {
      time: 24000,
      timeStarted: this.getTimeStarted(24000)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.time !== nextProps.time) {
      this.setState({
        time: nextProps.time,
      })
    }

    if (this.props.ticking !== nextProps.ticking) {
      clearInterval(this.intervalId)
    }

    if (!this.props.ticking && nextProps.ticking) {
      this.intervalId = setInterval(this.updateTimer, UPDATE_INTERVAL)
      this.setState({
        timeStarted: this.getTimeStarted(nextProps.time),
      })
    }
  }

  render() {
    let timeInSecs = this.state.time / 1000
    timeInSecs = Math.max(timeInSecs, 0)

    let decimalPlaces = timeInSecs >= 10 ? 0 : 1

    return (
      <Text style={styles.timer}>
        {timeInSecs.toFixed(decimalPlaces)}
      </Text>
    )
  }

  // Listeners
  updateTimer() {
    if (this.state.time > 0) {
      this.setState({
        time: this.state.timeStarted - (new Date()).getTime()
      })
    }
  }

  // Helpers
  getTimeStarted(time) {
    return (new Date()).getTime() + time
  }
}

const stateToProps = (state) => ({
  ticking: state.ticking,
  time: state.shotTime,
})

const styles = StyleSheet.create({
  timer: {
    fontSize: 80,
    color: '#efefef',
  }
})

export default connect(stateToProps)(ShotTimerContainer)
