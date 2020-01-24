# React Quick Style Components

Quickly style react-native components (reactjs comming soon) via props

## Usage

### Initial setup

```
import { StyleSheet } from 'react-native';
import { initQuickStyle } from 'react-quick-style-components/native';
import { FONT, COLOR } from './some-where/in/your/project'

// Use for quick prop like: colorMain, bgMain.

initQuickStyle.setMainColor(COLOR.MAIN);

// Use for default text style

initQuickStyle.setFontFamily({
  family: {
    regular: FONT.FAMILY.REGULAR,
    bold: FONT.FAMILY.BOLD,
    semiBold: FONT.FAMILY.SEMI_BOLD,
  },
  color: FONT.COLOR,
});

// Use for quick style, e.g: if you pass Style.create({ white: { color: 'white' } }). You will be able to use <Text white>Hello World!</Text>

const additionStyles = StyleSheet.create({
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
});

initQuickStyle.setAdditionStyles(additionStyles);
```

### Usage

#### Text

```
  import { Text } from 'react-quick-style-components/native';

  const App = () => (
    <Text colorMain bold fontsize20>Hello World!</Text>
  )
```

#### Col

```
  import { Col } from 'react-quick-style-components/native';

  const handlePress = () => alert('Hello World!');

  const App = () => (
    <Col flex1 bgMain onPress={handlePress}></Col>
  )
```

#### Row

```
  import { Col } from 'react-quick-style-components/native';

  const handlePress = () => alert('Hello World!');

  const App = () => (
    <Row flex1 bgMain onPress={handlePress}></Row>
  )
```