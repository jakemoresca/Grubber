import { Home } from './home/Home';
import { Login } from './login/Login';
import { People } from './people/People';
import { CarPools } from './car-pools/Car-Pools';
import { MyCar } from './my-car/My-Car';
import { MySchedule } from './my-schedule/My-Schedule';
import { PersonDetail } from './people/PersonDetail';
import { Route, Router } from 'angular2/router';

export var Routes =
{
    home: new Route({ path: '/', name: 'Home', component: Home }),
    login: new Route({ path: '/login', name: 'Login', component: Login }),
    carPools: new Route({ path: '/carPools', name: 'CarPools', component: CarPools }),
    myCar: new Route({ path: '/myCar', name: 'MyCar', component: MyCar }),
    mySchedule: new Route({ path: '/mySchedule', name: 'MySchedule', component: MySchedule }),
    people: new Route({ path: '/people', name: 'People', component: People }),
    detail: new Route({path: '/people/:id', name: 'Detail', component: PersonDetail })
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
