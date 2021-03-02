
interface IInputObject {
  [property: string]: any,
}

interface IMiddleware {
  (obj : IInputObject): IInputObject,
}


class TransformMiddlewares {

  styleMiddlewares : Array<IMiddleware> = [];

  propsMiddlewares : Array<IMiddleware> = [];

  addStyleMiddleware(h : IMiddleware) {
    this.styleMiddlewares.push(h);
  }

  addPropsMiddleware(h : IMiddleware) {
    this.propsMiddlewares.push(h);
  }

  transformStyle(obj : IInputObject) : IInputObject {
    let newObj = Object.assign({}, obj);
    this.styleMiddlewares.forEach((middleware) => {
      newObj = middleware(newObj);
    });
    return newObj;
  }

  transformProps(obj : IInputObject) : IInputObject {
    let newObj = Object.assign({}, obj);
    this.propsMiddlewares.forEach((middleware) => {
      newObj = middleware(newObj);
    });
    return newObj;
  }

}

export default new TransformMiddlewares();