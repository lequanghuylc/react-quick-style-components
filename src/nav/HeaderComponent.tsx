import React, { createContext } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import Col from '../components/Col';
import Row from '../components/Row';
import { useResponsiveData } from '../components/hooks';

type JSXRenderer = (props: any) => JSX.Element | null;
type ReactComp = new(props: any) => React.Component;

export type THeaderComponent = {
  name: string,
  navigationType?: 'tab' | 'drawer',
  isMainNav: boolean,
  renderer: JSXRenderer | ReactComp,
}

export type THeaderStyle = any
export type TUIAllocation = {
  header?: Array<string>,
  drawer?: Array<string>,
  tab?: Array<string>,
  options?: {
    stack?: {
      name?: string,
    },
    header?: {
      wrapper: JSXRenderer | ReactComp,
    },
    drawer?: {
      name?: string,
      sideBar?: JSXRenderer | ReactComp,
    },
    tab?: {
      name?: string,
      bottomTab?: JSXRenderer | ReactComp,
    }
  },
}

interface IMakeHeader {
  (data: {
    style?: THeaderStyle,
    initialState?: {
      [key: string]: any,
    },
    banks: {
      [name: string]: THeaderComponent,
    },
    alloc: {
      [breakpoint: string]: TUIAllocation,
    }
  }): [
    JSXRenderer | null,
    TUIAllocation,
  ]
}

export const HeaderContext = createContext({});

export const makeHeader : IMakeHeader = ({ banks, style, alloc, initialState }) => {

  const blankUIAllocation :TUIAllocation = {
    header: undefined,
    tab: undefined,
    drawer: undefined,
  }

  const rule = useResponsiveData<TUIAllocation>(alloc);
  if (!rule || !rule.header) return [null, blankUIAllocation];

  const Wrapper = ({ children } : any) => {
    const customStyle = style || {};
    if (rule.options && rule.options.header && rule.options.header.wrapper) {
      const Renderer = rule.options.header.wrapper;
      return (
        <Renderer style={customStyle}>
          {children}
        </Renderer>
      );
    }
    return (
      <Row style={[styles.headerDefaultStyle, customStyle]}>
        {children}
      </Row>
    );
  }

  const comps = rule.header.map(name => banks[name]);

  const Header = () => (
    <HeaderContext.Provider value={initialState || {}}>
      <Wrapper>
        {comps.map((val, i) => {
          const HeaderItem = val.renderer;
          return (
            <HeaderItem
              key={'header-item-'+val.name+i}
            />
          )
        })}
      </Wrapper>
    </HeaderContext.Provider>
  );

  return [Header, rule];
}

const styles = StyleSheet.create({
  headerDefaultStyle: {
    height: 64,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 0.5,
  }
});

export const withHeaderLayout = (Component : any, HeaderComponent : any) => (props : any) => {
  if (Component.header === null) return <Component {...props} />;
  return (
    <Col flex1 height={Dimensions.get('window').height}>
      <HeaderComponent navigation={props.navigation} />
      <Component {...props} />
    </Col>
  );
}