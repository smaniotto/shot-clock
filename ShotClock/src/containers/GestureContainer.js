import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { startTimer, stopTimer, resetShotTime } from '../actions'


class GestureContainer extends Component {
  constructor(props) {
    super(props)

    // Internal attributes
    this.shotClockStartedAt = undefined;

    // Internal methods
    this.toggleTicking = this.toggleTicking.bind(this)
    this.resetShotTime = this.resetShotTime.bind(this)
  }

  render() {
    return (
      <TouchableHighlight style={styles.container}
                          onPress={this.toggleTicking}
                          onLongPress={this.resetShotTime}>
        <View style={styles.content}>
          {this.props.children}
        </View>
      </TouchableHighlight>
    )
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
      this.props.resetShotTime();
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
    resetShotTime
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
