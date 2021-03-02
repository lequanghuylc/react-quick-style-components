
import { IComponentJson } from './ComponentJsonType';
import Banks from './Banks';
import TransformMiddlewares from './TransformMiddlewares';
import TreeAllocation from './TreeAllocation';

class ParserJSON {

  genComponentJSON(json : IComponentJson) : IComponentJson {
    const reservedList = Banks.getReservedComponentIds();
    if (!json.from && !reservedList.includes(json.from)) {
      throw new Error('Not a valid component, unknown source From');
    }
    if (reservedList.includes(json.from)) return {
      ...json,
      props: TransformMiddlewares.transformProps(json.props ?? {}),
      style: TransformMiddlewares.transformStyle(json.style ?? {}),
    };
    const sourceComponent = Banks.banks[json.from];
    const mergedComponent = {
      ...sourceComponent,
      ...json,
      id: json.id,
      from: sourceComponent.from,
      style: TransformMiddlewares.transformStyle({
        ...sourceComponent.style,
        ...json.style,
      }),
      onHoverStyle: TransformMiddlewares.transformStyle({
        ...sourceComponent.onHoverStyle,
        ...json.onHoverStyle,
      }),
      onResponsiveStyle: TransformMiddlewares.transformStyle({
        ...sourceComponent.onResponsiveStyle,
        ...json.onResponsiveStyle,
      }),
      props: TransformMiddlewares.transformStyle(TransformMiddlewares.transformProps({
        ...sourceComponent.props,
        ...json.props,
      })),
    };

    if (reservedList.includes(mergedComponent.from)) return mergedComponent;
    else return this.genComponentJSON(mergedComponent);
  }

} 

export default new ParserJSON();