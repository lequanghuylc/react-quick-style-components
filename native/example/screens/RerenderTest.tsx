import React, { Component, PureComponent } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';

import { Col } from 'react-quick-style-components/native';

let rerenderViewCount = 0;
let rerenderColCount = 0;

class SquareView extends PureComponent<any> {
  render() {
    rerenderViewCount++;
    console.log('re-render View', rerenderViewCount);
    return <View {...this.props} ><Text>{rerenderViewCount}</Text></View>;
  }
};

class SquareCol extends PureComponent<any> {
  render() {
    rerenderColCount++;
    console.log('re-render Col', rerenderColCount);
    return <Col {...this.props} ><Text>{rerenderViewCount}</Text></Col>;
  }
};


export default class RerenderTest extends Component<any> {

  state = {
    count: 0,
  }

  onBack = () => {
    this.props.onBack();
  }

  handlePress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText} onPress={this.onBack}>Back</Text>
        </View>
        <View style={styles.content}>
          <Text onPress={this.handlePress}>Press to rerender & Check console.log</Text>
          <Text>Count: {this.state.count}</Text>
          <SquareView
            style={styles.squareView}
          />
          <SquareCol
            width50
            height50
            margin10
            backgroundColor="green"
            middle
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 64,
  },
  headerText: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareView: {
    width: 50,
    height: 50,
    margin: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  }
})