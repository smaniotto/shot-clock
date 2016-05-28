import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { startTimer, stopTimer, resetShotTime, forceShotTime } from '../actions'


class GestureContainer extends Component {
  constructor(props) {
    super(props)

    // Internal attributes
    this.shotClockStartedAt = undefined
    this.triplePress = {timer: undefined, count: 0}

    // Internal methods
    this.handlePress = this.handlePress.bind(this)
    this.handleLongPress = this.handleLongPress.bind(this)
    this.toggleTicking = this.toggleTicking.bind(this)
    this.resetShotTime = this.resetShotTime.bind(this)
  }

  render() {
    return (
      <TouchableHighlight style={styles.container}
                          onPress={this.handlePress}
                          onLongPress={this.handleLongPress}>
        <View style={styles.content}>
          {this.props.children}
        </View>
      </TouchableHighlight>
    )
  }

  handlePress() {
    clearTimeout(this.triplePress.timer)

    if (this.triplePress.count >= 2) {
      this.props.forceShotTime(19000)
      this.triplePress = {timer: undefined, count: 0}
    } else {
      this.triplePress.timer = setTimeout(function() {
        this.toggleTicking()
        this.triplePress = {timer: undefined, count: 0}
      }.bind(this), 200)
      this.triplePress.count += 1
    }
  }

  handleLongPress() {
    this.resetShotTime()
  }

  toggleTicking() {
    if (this.props.ticking) {
      let elapsedTime = (new Date()).getTime() - this.shotClockStartedAt
      this.props.stopTimer(elapsedTime)
    } else {
      this.shotClockStartedAt = (new Date()).getTime()
      this.props.startTimer()
    }
  }

  resetShotTime() {
    if (!this.props.ticking)
      this.props.resetShotTime()
  }
}

const stateToProps = (state) => ({
  ticking: state.ticking,
  shotTime: state.shotTime,
})

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    startTimer,
    stopTimer,
    resetShotTime,
    forceShotTime,
  }, dispatch)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  content: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }
})

export default connect(stateToProps, dispatchToProps)(GestureContainer)
