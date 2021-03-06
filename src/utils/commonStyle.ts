import {
  StyleSheet, Platform,
  TextStyle, ViewStyle,ImageStyle,
} from 'react-native';

interface ICommonStyle {
  [styleName : string]: TextStyle & ViewStyle & ImageStyle,
}

const styles : ICommonStyle = {
  bgWhite: {
    backgroundColor: '#ffffff',
  },
  bold: {
    fontWeight: 'bold',
  },
  colorWhite: {
    color: '#ffffff',
  },
  middle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  width100p: {
    width: '100%',
  },
  height100p: {
    height: '100%',
  },
  overflowH: {
    overflow: 'hidden'
  }
};

export const commonStyle : ICommonStyle = Platform.OS === 'web' ? styles : StyleSheet.create({ ...styles });
