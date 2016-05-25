import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { startTimer, stopTimer, resetTimer } from '../actions'


// Container constants
const UPDATE_INTERVAL = 100


class ShotTimerContainer extends Component {
  constructor(props) {
    super(props)

    // Internal Methods
    this.updateTimer = this.updateTimer.bind(this)
    this.toggleTicking = this.toggleTicking.bind(this)
    this.getTimeStarted = this.getTimeStarted.bind(this)

    // Internal Attributes
    this.intervalId = undefined

    // State
    this.state = {
      time: 24,
      timeStarted: this.getTimeStarted(24)
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
    return (
      <Text style={styles.timer} onPress={this.toggleTicking}>
        {this.state.time.toFixed(1)}
      </Text>
    )
  }

  // Listeners
  updateTimer() {
    if (this.state.time > 0) {
      this.setState({
        time: (this.state.timeStarted - (new Date()).getTime()) / 1000
      })
    } else {
      this.props.stopTimer(0.0)
      this.props.resetTimer()
    }
  }

  toggleTicking() {
    if (this.props.ticking)
      this.props.stopTimer(this.state.time)
    else
      this.props.startTimer()
  }

  // Helpers
  getTimeStarted(time) {
    return (new Date()).getTime() + 1000 * time
  }
}

const stateToProps = (state) => ({
  ticking: state.ticking,
  time: state.shotTime,
})

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    startTimer,
    stopTimer,
    resetTimer
  }, dispatch)
}

const styles = StyleSheet.create({
  timer: {
    fontFamily: 'Courier New',
    fontSize: 80,
    color: '#efefef',
  }
})

export default connect(stateToProps, dispatchToProps)(ShotTimerContainer)
