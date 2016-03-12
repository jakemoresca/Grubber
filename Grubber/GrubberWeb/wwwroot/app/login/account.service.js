var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
/**
 * car service
 */
var AccountService = (function () {
    function AccountService(_http) {
        this._http = _http;
        this.isAuthenticated = false;
        this.apiUrl = "/api/account/";
    }
    AccountService.prototype.login = function (username, password) {
        var _this = this;
        var body = "{'userName'='" + username + "','password'='" + password + "'}";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.apiUrl + 'login', body, {
            headers: headers
        }).map(function (response) {
            if (response.ok) {
                _this.isAuthenticated = true;
                return true;
            }
            _this.isAuthenticated = false;
            return false;
        });
    };
    AccountService.prototype.logout = function () {
        var _this = this;
        return this._http.post(this.apiUrl + 'logout', "").map(function (response) {
            if (response.ok) {
                _this.isAuthenticated = false;
                return true;
            }
            return false;
        });
    };
    AccountService.prototype.getCurrentUser = function () {
        return this._http.get(this.apiUrl + 'getcurrentuser/')
            .map(function (response) {
            return response.json();
        })
            .map(function (car) {
            var result = null;
            if (car) {
                result = car;
            }
            ;
            return result;
        });
    };
    AccountService.prototype._fetchFailed = function (error) {
        console.error(error);
        return Promise.reject(error);
    };
    AccountService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AccountService);
    return AccountService;
})();
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map