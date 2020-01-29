import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { initQuickStyle } from 'react-quick-style-components/native';
import RerenderTest from './screens/RerenderTest';
import SpeedTest from './screens/SpeedTest';

const PAGE = {
  HOME: 'HOME',
  RERENDER_TEST: 'RERENDER_TEST',
  SPEED_TEST: 'SPEED_TEST',
}

const App = () => {
  const [state, setState] = useState({ page: PAGE.HOME });

  const changePage = (page) => setState({ ...state, page })

  let comp;
  switch(state.page) {
    case PAGE.HOME: comp = (
      <View style={styles.container}>
        <Text onPress={() => changePage(PAGE.RERENDER_TEST)}>Rerender Test</Text>
        <Text onPress={() => changePage(PAGE.RERENDER_TEST)}>Speeed & FPS Test</Text>
      </View>
    );
    break;
    case PAGE.RERENDER_TEST: comp = (
      <RerenderTest onBack={() => changePage(PAGE.HOME)} />
    );
    case PAGE.SPEED_TEST: comp = (
      <SpeedTest onBack={() => changePage(PAGE.HOME)} />
    );
    break;
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.flex1}>
        {comp}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
