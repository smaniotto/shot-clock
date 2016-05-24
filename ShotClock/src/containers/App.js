import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class App extends Component {
  super
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          24
        </Text>
      </View>
    )
  }
}

const stateToProps = (state) => {
  return {}
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c4c4c',
  },
  text: {
    fontSize: 80,
    color: '#efefef',
    padding: 40,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: '#efefef',
  }
})

export default connect(stateToProps, dispatchToProps)(App)
