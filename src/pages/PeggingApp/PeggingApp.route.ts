import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/papps';

const PeggingAppRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./PeggingApp.home')),
  name: 'Use',
  to: route,
};

export default PeggingAppRoute;
