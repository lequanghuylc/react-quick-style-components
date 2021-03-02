
type RouteArray = Array<{
  name: string,
  path: string,
  component: any,
  parse?: any,
}>

export const makeLinkingConfig = (routes: RouteArray) => {
  const screens : any = {};
  routes.forEach((r) => {
    if (!r.parse) screens[r.name] = r.path;
    else screens[r.name] = {
      path: r.path,
      parse: r.parse,
    };
  })
  return {
    initialRouteName: routes[0].name,
    screens,
  }
}

export const withoutHeader = { header: () => null };

export const routeWithFirstFromName = (routes: RouteArray, name : string) : RouteArray => {
  const findIndex = routes.findIndex(r => r.name === name);
  console.log('findIndex', findIndex);
  if (findIndex !== -1) {
    return [
      routes[findIndex],
      ...routes.slice(0, findIndex),
      ...routes.slice(findIndex + 1, routes.length),
    ];
  }
  return routes;
}