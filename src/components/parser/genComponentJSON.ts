import Store from 'store'
import { ContainerJSON } from '../containers';
import { ElementJSON } from '../elements';
import banks from './banks.json';

export const getCoreComponentIds = (json) => {
  const results = [];
  for (let id in json) {
    if (json[id].core) {
      results.push(id);
    }
  }
  return results;
}

export const storeImport = {
  getBanks: () => ({}),
  getConsts: () => ({})
}

const transformStyle = (obj) => {
  if (Object.keys(storeImport.getConsts()).length === 0) return obj;
  const newStyle = Object.assign({}, obj);
  const activeTheme = storeImport.getConsts().getActiveTheme();
  const findColorValue = (userValue) => {
    const label = userValue.replace('Color.', '');
    const findColor = storeImport.getConsts().themeData[activeTheme].colors.find(val => val.label === label);
    return !!findColor ? findColor.value : undefined;
  }
  const findSizeValue = (userValue) => {
    const label = userValue.replace('Size.', '');
    const findSize = storeImport.getConsts().sizes.find(val => val.label === label);
    return !!findSize ? findSize.value : undefined;
  }

  if (!!activeTheme) {
    const coloProps = [
      'backgroundColor', 'color',
      'borderColor', 'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor',
    ];
    coloProps.forEach((styleProperty) => {
      if (typeof newStyle[styleProperty] === 'string' && newStyle[styleProperty].includes('Color.')) {
        newStyle[styleProperty] =  findColorValue(newStyle[styleProperty]);
      }
    });
  
    const sizeProps = [
      'fontSize',
      'margin', 'padding', 'marginHoriontal', 'paddingHorizontal',
      'marginRight', 'paddingRight',
      'marginLeft', 'paddingLeft',
      'marginTop', 'paddingTop',
      'marginBottom', 'paddingBottom',
      'borderRadius',
      'borderWidth', 'borderBottomWidth', 'borderTopWidth',
      'borderLeftWidth', 'borderRightWidth',
    ];
    sizeProps.forEach((styleProperty) => {
      if (typeof newStyle[styleProperty] === 'string' && newStyle[styleProperty].includes('Size.')) {
        newStyle[styleProperty] =  findSizeValue(newStyle[styleProperty]);
      }
    });
    if (newStyle.onHoverStyle) {
      newStyle.onHoverStyle = transformStyle(newStyle.onHoverStyle);
    }
  }
  
  return newStyle;
}

export const getResevedList = () => {
  const AllComponents = {
    ...banks,
    ...ContainerJSON,
    ...ElementJSON,
  };
  const coreIds = Object.keys(AllComponents);
  return coreIds;
}

export const genComponentJSON = (json) => {
  // console.log('json', json)

  const AllComponents = {
    ...banks,
    ...ContainerJSON,
    ...ElementJSON,
    // ...Store.Component.banks,
    // ...Store.Component.library,
    ...storeImport.getBanks(),
  };
  // const coreIds = getCoreComponentIds(AllComponents);
  const coreIds = Object.keys(AllComponents);

  if (!json.from || !AllComponents[json.from]) {
    console.log(Object.keys(AllComponents));
    console.log(json, AllComponents[json.from]);
    throw new Error('Not a valid component, unknown source From');
  }

  if (coreIds.includes(json.from)) return {
    ...json,
    props: transformStyle(json.props),
    style: transformStyle(json.style),
  };

  const sourceComponent = AllComponents[json.from];

  const mergedComponent = {
    ...sourceComponent,
    ...json,
    id: json.id,
    // name: json.name,
    from: sourceComponent.from,
    style: transformStyle({
      ...sourceComponent.style,
      ...json.style,
    }),
    props: transformStyle({
      ...sourceComponent.props,
      ...json.props,
    }),
  };

  if (coreIds.includes(mergedComponent.from)) return mergedComponent;
  else return genComponentJSON(mergedComponent);
}

const fillToPropsTreeTemplate = (obj, templateValue, value) => {
  if (!templateValue) return obj;
  if (!!obj.props) {
    for (let key in obj.props) {
      if (obj.props[key] === templateValue) {
        obj.props[key] = value;
      }
    }
  }
  if (!!obj.banks) {
    for (let componentId in obj.banks) {
      obj.banks[componentId] = fillToPropsTreeTemplate(obj.banks[componentId], templateValue, value);
    }
  }
  return obj;
}

export const transformUsageProps = (inputData, jsonComponent) => {
  let result = JSON.parse(JSON.stringify(jsonComponent));
  // console.log('beforeTransform inputData', inputData)
  // console.log('beforeTransform jsonComponent', jsonComponent)
  // let result = {...jsonComponent};
  const { usageProps } = result;
  for (let key in usageProps) {
    // console.log('key', key);
    // console.log('value', inputData[key]);
    result = fillToPropsTreeTemplate(result, `{usageProps.${key}}`, inputData[key]);
  }
  // console.log('afterTransform', result)
  return result;
}