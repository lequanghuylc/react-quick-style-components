import React from 'react';
import { propsToStyle } from 'custom-libs';
import * as VectorIcon from '@expo/vector-icons';


type Provider = 'FontAwesome' | 'AntDesign' | 'Feather' | 'Entypo' | 'EvilIcons' | 'Ionicons' | 'MaterialIcons' | 'SimpleLineIcons' | 'MaterialCommunityIcons' | 'FontAwesome5' | 'Octicons' | 'Zocial' | 'SimpleLineIcons' | 'Fontisto';

interface Props {
  provider: Provider,
  name: string,
  size: number,
  color: string,
  style?: any,
  [key: string]: any,
}

const Icon = (props : Props) => {
  const { provider, style } = props;
  const combinedStyle = [
    { display: 'inline-flex', },
    propsToStyle(props),
    style,
  ];
  const newProps = {
    ...props,
    style: combinedStyle,
  };
  const Component  = VectorIcon[provider];
  if (!Component) return null;
  return (
    <Component {...newProps} />
  );
}

export default Icon;

type IconSet = {
  list: Array<{ provider: Provider, name: string }>,
  object: {
    [key: string]: Array<string>,
  },
}

const glyphmapsToIconList = (target : IconSet, provider, jsonFile) => {
  Object.keys(jsonFile).forEach((iconName) => {
    target.list.push({ provider, name: iconName });
    if (!target.object[provider]) {
      target.object[provider] = [iconName]
    } else {
      target.object[provider].push(iconName);
    }
  })
}

export const iconSet : IconSet = (() => {
  const result = {
    list: [],
    object: {}
  };
  glyphmapsToIconList(result, 'AntDesign', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/AntDesign.json'));
  glyphmapsToIconList(result, 'Entypo', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Entypo.json'));
  glyphmapsToIconList(result, 'EvilIcons', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/EvilIcons.json'));
  glyphmapsToIconList(result, 'Feather', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Feather.json'));
  glyphmapsToIconList(result, 'FontAwesome', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/FontAwesome.json'));
  glyphmapsToIconList(result, 'FontAwesome5', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/FontAwesome5Free.json'));
  glyphmapsToIconList(result, 'Fontisto', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Fontisto.json'));
  glyphmapsToIconList(result, 'Foundation', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Foundation.json'));
  glyphmapsToIconList(result, 'Ionicons', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json'));
  glyphmapsToIconList(result, 'MaterialCommunityIcons', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json'));
  glyphmapsToIconList(result, 'MaterialIcons', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json'));
  glyphmapsToIconList(result, 'Octicons', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Octicons.json'));
  glyphmapsToIconList(result, 'SimpleLineIcons', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/SimpleLineIcons.json'));
  glyphmapsToIconList(result, 'Zocial', require('@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Zocial.json'));

  return result;
})();