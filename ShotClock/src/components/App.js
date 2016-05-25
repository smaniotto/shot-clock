import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import ShotTimerContainer from '../containers/ShotTimerContainer'


class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ShotTimerContainer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c4c4c',
  }
})

export default App
