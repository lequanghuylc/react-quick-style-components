
type TTreeChildren = Array<{ id: string, children: TTreeChildren }>
export type TTreeAddress = {
  id: string,
  address: string,
}

export interface ITree {
  id: string,
  children: TTreeChildren,
}

export interface IComponentBanks {
  [componentId : string]: ComponentType,
}

export interface ComponentType  {
  id: string,
  from: string,
  props?: {
    [property: string]: any,
  },
  style?: {
    [property: string]: any,
  },
  onHoverStyle?: {
    [property: string]: any,
  },
  onResponsiveStyle?: {
    [property: string]: any,
  },
  onResponsiveLayout?: {
    [property: string]: any,
  },
  tree?: ITree,
  banks?: IComponentBanks,
  [key: string]: any,
}

export interface IComponentJson extends ComponentType {

}