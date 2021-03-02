import { ITree, IComponentJson, IComponentBanks, TTreeAddress } from './ComponentJsonType';

import _ from 'lodash';

class TreeAllocation {

  convertTreeObjToAddressArray(
    treeObj : ITree,
    resultArr : Array<TTreeAddress> = [],
    address = '0'
  ) {
    if (!treeObj) return resultArr;
    resultArr.push({
      id: treeObj.id,
      address,
    })
    if (!treeObj.children || treeObj.children.length === 0) return resultArr;
    for (let i = 0; i <= treeObj.children.length; i++) {
      this.convertTreeObjToAddressArray(treeObj.children[i], resultArr, `${address}.${i}`);
    }
    return resultArr;
  }

  getMergedJSON(id : string, banks : IComponentBanks, tree : ITree) : IComponentJson {
    const arrAddress = this.convertTreeObjToAddressArray(JSON.parse(JSON.stringify(tree)));
    const find = arrAddress.find(val => val.id === id);
    if (!find) {
      // dont have any children
      const component = {
        ...banks[id]
      };
      delete component.banks;
      delete component.tree;
      delete component.children;
      return JSON.parse(JSON.stringify(component));
    }
    const realAddress = find.address.replace(/\./g, ".children.").replace("0", 'tree');
    // const parentTree = this.getValue(realAddress);
    const parentTree = _.get({ tree }, realAddress);
    const component = banks[parentTree.id];
    if (!component) throw new Error(`Component ${parentTree.id} not found`);
    parentTree.from = component.from;
    parentTree.props = component.props;
    parentTree.style = component.style;
    // parentTree.banks = banks;
    parentTree.tree = {
      children: parentTree.children.slice(),
    }
    delete parentTree.children;
    const idArr = this.convertTreeObjToAddressArray(parentTree.tree).filter(val => !!val.id).map(val => val.id);
    parentTree.banks = {};
    idArr.forEach(componentId => {
      parentTree.banks[componentId] = banks[componentId];
    });
    return JSON.parse(JSON.stringify(parentTree));
  }
}

export default new TreeAllocation();