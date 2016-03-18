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
var user_1 = require('./core/user');
var App = (function () {
    function App(_router, _accountService) {
        var _this = this;
        this._router = _router;
        this._accountService = _accountService;
        this.routes = routes_config_1.Routes;
        this.isLoggedIn = false;
        this.user = new user_1.User();
        var self = this;
        _accountService.getCurrentUser()
            .subscribe(function (res) {
            self.user = res;
            if (self.user.userName == null) {
                self.user = new user_1.User();
                self.user.style = "flatly";
                self.isLoggedIn = false;
            }
            else {
                self.isLoggedIn = true;
            }
            var element = document.createElement("link");
            //Assign different attributes to the element.
            element.setAttribute("rel", "stylesheet");
            element.setAttribute("type", "text/css");
            element.setAttribute("href", "../../css/" + _this.user.style + ".css");
            document.body.appendChild(element);
        });
        _router.navigateByUrl("/");
    }
    App.prototype.logout = function () {
        var _this = this;
        this._accountService.logout()
            .subscribe(function (res) { return _this._router.navigateByUrl("/login"); });
    };
    App.prototype.onStyleChange = function (newValue) {
        this.user.style = newValue;
        this._accountService.saveStyle(this.user.id, newValue)
            .subscribe(function (res) {
            location.reload(true);
        });
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