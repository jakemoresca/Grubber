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
 * people service
 */
var PeopleService = (function () {
    //   person: Person = null;
    function PeopleService(_http) {
        this._http = _http;
        this.people = [];
    }
    PeopleService.prototype.getPeople = function () {
        //return an observable
        return this._http.get('/api/people')
            .map(function (response) {
            return response.json();
        })
            .map(function (people) {
            var result = [];
            if (people) {
                people.forEach(function (p) {
                    result.push(p);
                });
            }
            return result;
        });
    };
    PeopleService.prototype.getPerson = function (id) {
        return this._http.get('/api/people/' + id.toString())
            .map(function (response) {
            return response.json();
        })
            .map(function (person) {
            var result = null;
            if (person) {
                result = person;
            }
            ;
            return result;
        });
    };
    PeopleService.prototype._fetchFailed = function (error) {
        console.error(error);
        return Promise.reject(error);
    };
    PeopleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PeopleService);
    return PeopleService;
})();
exports.PeopleService = PeopleService;
//# sourceMappingURL=people.service.js.map