var Home_1 = require('./home/Home');
var People_1 = require('./people/People');
var Car_Pools_1 = require('./car-pools/Car-Pools');
var PersonDetail_1 = require('./people/PersonDetail');
var router_1 = require('angular2/router');
exports.Routes = {
    home: new router_1.Route({ path: '/', name: 'Home', component: Home_1.Home }),
    carPools: new router_1.Route({ path: '/carPools', name: 'CarPools', component: Car_Pools_1.CarPools }),
    people: new router_1.Route({ path: '/people', name: 'People', component: People_1.People }),
    detail: new router_1.Route({ path: '/people/:id', name: 'Detail', component: PersonDetail_1.PersonDetail })
};
exports.APP_ROUTES = Object.keys(exports.Routes).map(function (r) { return exports.Routes[r]; });
//# sourceMappingURL=routes.config.js.map