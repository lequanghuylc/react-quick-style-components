# What is Banks - Allocation pattern

This pattern is an attempt to make cross-platform code writing more convenient. You might not need it, if you dont plan to write code that can run both in mobile app and web.

Usually we have
- desktop web (large screen)
- mobile web (web on mobile - small screen)
- tablet app (mobile app on large screen)
- mobile app (mobile app on small screen)

We want to combine them all, no matter web or mobile app, they all run the same code. The different now is only in screen size.

Introducing the pattern:
- Store UI components in one place, let's call "Banks"
- When we need to display an UI component, get it from Banks, and render it base on the allocation rules (screen width break point).

## What does it look like in practice

1. The data structure is something like this:

```jsx
{
  banks: {
    [componentId_1]: () => <Component1 />,
    [componentId_2]: () => <Component2 />,
    ...
  },
  alloc: {
    [rule1]: () => renderRule1(),
    [rule2]: () => renderRule2(),
  },
}

```

when `rule1` is met, the UI will render `renderRule1()`, which pick some of the UI Component in banks (Component1, Component2,..) and render.


## The "Banks" sound just like reinventing the job of `import` and `export`?

  The main purpose of this pattern is reducing the amount of `if` and more complex code structure. *complex* means involving navigation and native behaviour, the things that often makes you write tons of Platform specific code.

For example, assume that we want:

  - display a header for website, with logo, search box, and some nav menus
  - when the screen is small (mobile app, mobile web), hide the logo, keep the search box, turn nav menus to tab items.

Common approach:

  - write a header for web (large screen) (HeaderWeb), and a header for app (small screen) (HeaderApp)
  - write a navigation for web (NavigationWeb), and another for app (NavigationApp)
  - if the platform is web, show NavigationWeb & HeaderWeb
  - if the platform is app, show NavigationApp & HeaderApp

Banks - Allocation approach:

  - we specify the rules of allocation
  - we render base of the renderer of the rules

  for example

```jsx
  import { HeaderNavigation } from 'react-quick-style-components';

  <HeaderNavigation
    banks={{
      Logo: {
        renderer: () => <Logo />
      },
      SearchBox: {
        renderer: () => <SearchBox />
      },
      NavMenu: {
        renderer: () => <NavMenu />
      }
    }}
    alloc={{
      lg: {
        header: ['Logo', 'SearchBox', 'NavMenu'],
      },
      xs: {
        header: ['SearchBox'],
        tab: ['NavMenu'], // NavMenu now turns to Tab Item
        drawer: ['NavMenu'] // and Drawer Item
      },
    }}
  />
```

For web, we just need stacks navigation, some web navigation libraries are only about stacks navigation (for example `react-router`), but for mobile web, we need tabs and drawers. What `HeaderNavigation` does is defining UI parts one, and put them selectively in stacks, or tabs, or drawers base on screen size.

So it seems like a wrapper and it will does the same thing as common approach? Well yes, the pattern is only about how you manage your UI components. Like `rendering props`, `banks - allocation` receives React components as input parameters, and render them based on your logic

## Some more example of the pattern

- Example A: Form & steps: In web (large screen), we have many space so we can display all the fields of the form in one page. However, in smaller screen (mobile app), we tend to avoid too much scrolling, so we use steps - breaking forms into steps, each steps will be a page and a part of the form.
  - so it's not just about responsive layout here, it involves navigation stacks. In this case, we wants set of screens, so we can divide our components in those sets based on the screen sizes.
  - with banks-allocation, we can do something like:
  ```jsx
  <ScreenSet 
    banks={{
      Input1: {
        rendereder: () => <Input1 />
      },
      Input2: {
        rendereder: () => <Input2 />
      },
      Input3: {
        rendereder: () => <Input3 />
      },
      Input4: {
        rendereder: () => <Input4 />
      },
    }}
    alloc={{
      xs: [
        ['Input1', 'Input2'], // nested navigation, screen 1
        ['Input3'], // screen 2
        ['Input4'], // screen 3
      ],
      lg: [
        ['Input1', 'Input2', 'Input3', 'Input4'], // we only need one screen
      ]
    }}
  />
  ```

- Example B: The way `Parser` is written : `Parser` is a component that receive JSON and render to React Component. It is built to support UI Builder, that will output JSON as result. When dealing with a component with many levels of children, it's hard to manage the nested styles, props and children. With banks-allocation, we can:
  - define all components as first level children, only include props and styles
  - the allocation rule is the tree structure, which based on component id, that send components exactly where it should be

  ```jsx
    {
      banks: {
        Container: {
          id: 'Container',
          from: 'Col',
          style: {
            backgroundColor: 'black',
            padding: 20,
          }
        },
        Sentence: {
          id: 'Sentence',
          from: 'Text',
          style: {
            color: 'pink',
            textAlign: 'center'
          },
          props: {
            text: 'Hello world!',
          }
        }
      },
      tree: {
        id: 'Container',
        children: [
          {
            id: 'Sentence',
            children: [],
          }
        ]
      }
    }

    // will render to
    <Col
      style={{
        backgroundColor: 'black',
        padding: 20,
      }}
    >
      <Text
        text="Hello world!"
        style={{
          color: 'pink',
          textAlign: 'center'
        }}
      />
    </Col>
  ```


## When to use this pattern

- When you deal with complex structure. If it's just about responsive style and layouts, please check out the `Row` component, `onResponsiveLayout` and `onResponsiveStyle` props

- Your components might need to be standalone, meaning no passing data and event via props. You might need to use Context, or other state management library to handle the logic