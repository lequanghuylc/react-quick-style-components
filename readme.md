# React Quick Style Components

Quickly style react-native components (reactjs comming soon) via props

# Main Idea

We usually style our component like this (inline or StyleSheet)

```
{
  width: 50,
  height: 50,
  margin: 10,
  backgroundColor: 'green',
  justifyContent: 'center',
  alignItems: 'center',
}
```

What if we can have a really quick way of styling by using prop. Like:

```
<Col
  width={50}
  height={50}
  margin={10}
  backgroundColor="green"
  justifyContent="center"
  alignItems="center"
/>
```

And with the advantage of boolean prop, we could get it even quicker (in terms of Coding convenience), like:

```
<Col
  width50
  height50
  margin10
  backgroundColor="green"
  middle // common global styleset, equal { justifyContent: 'center', alignItems: 'center'  }
/>
```

# Performance Concern

- Take a look at `/native/example` folder
- In the speed test, we compared it with normal `View` component, and `styled-components`. The test code is really simple, PR is welcome.

![Performance test](./performance_test.png "Performance test")

# Best Practice

1. If you have more than 3 styled props, put it in StyleSheet. Too many styled props will not be convenient anymore.
2. Create your own common style objects to avoid repeating your self
3. Organize the components and keep them small and simple

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