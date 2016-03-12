var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ng = require('angular2/core');
var router = require('angular2/router');
var routes_config_1 = require('./routes.config');
var account_service_1 = require('./login/account.service');
var App = (function () {
    function App(_router, _accountService) {
        this._router = _router;
        this._accountService = _accountService;
        this.routes = routes_config_1.Routes;
        _router.navigateByUrl("/");
    }
    App.prototype.logout = function () {
        var _this = this;
        this._accountService.logout()
            .subscribe(function (res) { return _this._router.navigateByUrl("/login"); });
    };
    App = __decorate([
        ng.Component({
            selector: 'app',
            moduleId: module.id,
            templateUrl: 'app.html',
            styleUrls: ['app.css'],
            directives: [router.ROUTER_DIRECTIVES]
        }),
        router.RouteConfig(routes_config_1.APP_ROUTES), 
        __metadata('design:paramtypes', [router.Router, account_service_1.AccountService])
    ], App);
    return App;
})();
exports.App = App;
//# sourceMappingURL=app.js.map