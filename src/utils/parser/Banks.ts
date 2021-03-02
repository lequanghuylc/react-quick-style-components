import { IComponentBanks } from './ComponentJsonType';

import { Col, Row, Text, Scroll } from '../../index';

const core : IComponentBanks = {
  Col: {
    "id": "Col",
    "name": "Col",
    "from": "Col",
  },
  Row: {
    "id": "Row",
    "name": "Row",
    "from": "Row",
  },
  Text: {
    "id": "Text",
    "name": "Text",
    "from": "Text",
  },
  Input: {
    "id": "Input",
    "name": "Input",
    "from": "Input",
  },
  Scroll: {
    "id": "Scroll",
    "name": "Scroll",
    "from": "Scroll",
  },
  Img: {
    "id": "Img",
    "name": "Img",
    "from": "Img",
  }
};

interface ICustomReactFrom {
  [from: string]: {
    reactComponent: any,
  }
}

class ComponentBanks {

  core = core;
  banks : IComponentBanks = {};
  reactFrom : ICustomReactFrom = {
    Col: { reactComponent: Col },
    Row: { reactComponent: Row },
    Text: { reactComponent: Text },
    Scroll: { reactComponent: Scroll },
  };

  addBanks(comps : IComponentBanks) {
    this.banks = {
      ...this.banks,
      ...comps,
    }
  }

  addCustomFrom(customComps : ICustomReactFrom) {
    this.reactFrom = {
      ...this.reactFrom,
      ...customComps,
    }
  }

  getReservedComponentIds() {
    const list = Object.keys({
      ...this.core,
      ...this.banks,
    });
    return list;
  }
}

export default new ComponentBanks();