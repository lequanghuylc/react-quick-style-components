# React Quick Style Components

Quickly style react-native components (reactjs comming soon) via props

# Contents

- [Installation](#installation)
- [Main Idea](#main-idea)
- [Performance Concern](#performance-concern)
- [Best Practice](#best-practice)
- [Usage](#usage)
- [Styled Props](#styled-props)
- [Col Component](#col-component)
- [Row Component](#row-component)
- [Text Component](#text-component)

# Installation

```
npm install react-quick-style-components --save
```
or
```
yarn add react-quick-style-components
```

No linking required

Dependicies: `js-events-listener`, `react-native-animatable` (Also no linking required)

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

# Styled Props

- Pretty much all the styled properties (take a look at `./utils/globalProps.ts` line 22)
- Auto split number value from Boolean props

```
<Col
  width100
  zIndex1
  flex1
/>
```

Equal to
```
<Col
  width={100}
  zIndex={1}
  flex={1}
/>
```
- Common style sets (take a look at `./utils/commonStyle.ts`)

| Prop | Description |
|---|---|
|**`middle`**|Align items center (vertically and horizontally)|
|**`flex1`**|Flex 1|
|**`absolute`**|Position absolute|
|**`absoluteFill`**|Position absolute and full parent width, height|
|**`bgWhite`**|White background|
|**`colorWhite`**|White color text|
|**`colorMain`**|Main color text, (after run `initQuickStyle.setMainColor`)|
|**`bgMain`**|Main background color, (after run `initQuickStyle.setMainColor`)|
|**`bold`**|bold fontweight text|
|**`width100p`**|width 100%|
|**`height100p`**|height 100%|
|**`overflowH`**|overflow hidden|

# Col Component

- Flex direction `column`
- If `onPress` prop is given, it will operate like a `TouchableOpacity` (activeOpacity `0.9`)
- If `animation` prop is given, it will operate like a `<Animatable.View {...animation} />`

# Row Component

- `onPress` & `animation` work exactly like `Col`
- Flex direction `row`
- Align items `center` by default

# Text Component

| Prop | Description |
|---|---|
|**`bold`**|Change font to Bold font if that font was declared at `initQuickStyle.setFontFamily`|
|**`semiBold`**|Change font to Semi Bold font if that font was declared at `initQuickStyle.setFontFamily`|
