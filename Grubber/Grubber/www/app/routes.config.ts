import { Home } from './home/Home';
import { People } from './people/People';
import { CarPools } from './car-pools/Car-Pools';
import { PersonDetail } from './people/PersonDetail';
import { Route, Router } from 'angular2/router';

export var Routes =
{
    home: new Route({ path: '/', name: 'Home', component: Home }),
    carPools: new Route({ path: '/carPools', name: 'CarPools', component: CarPools }),
    people: new Route({ path: '/people', name: 'People', component: People }),
    detail: new Route({path: '/people/:id', name: 'Detail', component: PersonDetail })
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
