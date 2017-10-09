import App from '../containers/app/app.container';
import Home from '../containers/home/home.container';

export const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
    ],
  },
];
