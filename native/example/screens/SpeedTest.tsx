import React, { Component, PureComponent } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';

import { Col, Row } from 'react-quick-style-components/native';
import styled from 'styled-components';

const StyledSquareView = styled.View`
  width: 50px;
  height: 50px;
  margin: 10px;
  background-color: green;
  justify-content: center;
  align-items: center;
`

const NUMBER_OF_ITEMS = 10000;

export default class RerenderTest extends Component<any> {

  state = {
    count: 0,
    durationVIEW: 0,
    durationCOL: 0,
    durationROW: 0,
    durationSTYLED_COMP: 0,
    durationCOL_WITHOUT_QUICK_PROP: 0,
    type: 'VIEW',
    startTesting: false,
  }
  startTime = 0;
  endTime = 0;

  componentDidUpdate() {
    if (this.state.startTesting) {
      this.endTime = new Date().getTime();
      this.setState({
        ['duration' + this.state.type]: this.endTime - this.startTime,
        startTesting: false,
      })
    }
  }

  onBack = () => {
    this.props.onBack();
  }

  handlePress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  }

  testView = () => {
    this.startTime = new Date().getTime();
    this.setState({
      type: 'VIEW',
      count: NUMBER_OF_ITEMS,
      startTesting: true,
    });
  }

  testCol = () => {
    this.startTime = new Date().getTime();
    this.setState({
      type: 'COL',
      count: NUMBER_OF_ITEMS,
      startTesting: true,
    });
  }

  testColWithoutQuickProp = () => {
    this.startTime = new Date().getTime();
    this.setState({
      type: 'COL_WITHOUT_QUICK_PROP',
      count: NUMBER_OF_ITEMS,
      startTesting: true,
    });
  }

  testRow = () => {
    this.startTime = new Date().getTime();
    this.setState({
      type: 'ROW',
      count: NUMBER_OF_ITEMS,
      startTesting: true,
    });
  }

  testStyledComponent = () => {
    this.startTime = new Date().getTime();
    this.setState({
      type: 'STYLED_COMP',
      count: NUMBER_OF_ITEMS,
      startTesting: true,
    });
  }

  clear = () => {
    this.setState({ count: 0, duration: 0 });
  }

  render() {

    const arr = new Array(this.state.count).fill(1);
    let Comp;
    let compProps;
    switch(this.state.type) {
      case 'VIEW':
        Comp = View;
        compProps = {
          style: styles.squareView,
        };
        break;
      case 'COL':
        Comp = Col;
        compProps = {
          width50: true,
          height50: true,
          margin10: true,
          backgroundColor: "green",
          middle: true,
        };
        break;
      case 'STYLED_COMP':
        Comp = StyledSquareView;
        compProps = {};
        break;
      case 'COL_WITHOUT_QUICK_PROP':
        Comp = Col;
        compProps = {
          style: styles.squareView,
        };
        break;
      case 'ROW':
        Comp = Row;
        compProps = {
          width50: true,
          height50: true,
          margin10: true,
          backgroundColor: "green",
          middle: true,
        };
        break;
      default: 
        Comp = View;
        compProps = {
          width50: true,
          height50: true,
          margin10: true,
          backgroundColor: "green",
          middle: true,
        };
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText} onPress={this.onBack}>Back</Text>
        </View>
        <View style={styles.content}>
          <Text>Press (and wait) for {NUMBER_OF_ITEMS} items rendered!</Text>
          <Text style={styles.testText} onPress={this.testView}>Press to start testing View</Text>
          <Text style={styles.testText} onPress={this.testCol}>Press to start testing Col</Text>
          <Text style={styles.testText} onPress={this.testColWithoutQuickProp}>Press to start testing Col without quick prop</Text>
          <Text style={styles.testText} onPress={this.testRow}>Press to start testing Row</Text>
          <Text style={styles.testText} onPress={this.testStyledComponent}>Press to start testing Styled Component</Text>
          <Text style={styles.bold} onPress={this.clear}>Clear</Text>
          <Text style={styles.bold}>Result</Text>
          <Text style={styles.bold}>View: {this.state.durationVIEW} mili seconds</Text>
          <Text style={styles.bold}>Col: {this.state.durationCOL} mili seconds {!!this.state.durationCOL && !!this.state.durationVIEW && `${100 - Math.floor((this.state.durationVIEW) * 100/this.state.durationCOL)} % slower than View`}</Text>
          <Text style={styles.bold}>Col without quick props: {this.state.durationCOL_WITHOUT_QUICK_PROP} mili seconds {!!this.state.durationCOL_WITHOUT_QUICK_PROP && !!this.state.durationVIEW && `${100 - Math.floor((this.state.durationVIEW) * 100/this.state.durationCOL_WITHOUT_QUICK_PROP)} % slower than View`}</Text>
          <Text style={styles.bold}>Row: {this.state.durationROW} mili seconds {!!this.state.durationROW && !!this.state.durationVIEW && `${100 - Math.floor((this.state.durationVIEW) * 100/this.state.durationROW)} % slower than View`}</Text>
          <Text style={styles.bold}>Styled Component: {this.state.durationSTYLED_COMP} mili seconds {!!this.state.durationSTYLED_COMP && !!this.state.durationVIEW && `${100 - Math.floor((this.state.durationVIEW) * 100/this.state.durationSTYLED_COMP)} % slower than View`}</Text>
        </View>
        <View style={styles.content}>
          <ScrollView>
            {arr.map((val, i) => (
              <Comp
                key={"comp-"+i}
                {...compProps}
              />
            ))}
          </ScrollView>
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
  },
  bold: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  testText: {
    margin: 5,
    color: 'green',
  }
})