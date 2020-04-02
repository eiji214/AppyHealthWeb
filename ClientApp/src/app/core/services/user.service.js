"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserService = /** @class */ (function () {
    function UserService(httpClient) {
        this.httpClient = httpClient;
        this.url = '/api/';
    }
    UserService.prototype.getMe = function () {
        return this.httpClient.get(this.url + 'get?url=user/');
    };
    UserService.prototype.getAll = function () {
        return this.httpClient.get(this.url + 'get?url=user/all');
    };
    UserService.prototype.getAppyHealthUsers = function (searchTerm) {
        return this.httpClient.get(encodeURI(this.url + 'get?url=user/appyhealth/?searchTerm=' + searchTerm));
    };
    UserService.prototype.getProviders = function (status, searchTerm) {
        return this.httpClient.get(encodeURI(this.url + 'get?url=user/providers/?status=' + status + '&searchTerm=' + searchTerm));
    };
    UserService.prototype.searchUsers = function (searchTerm) {
        return this.httpClient.get(encodeURI(this.url + 'get?url=user/search/' + searchTerm));
    };
    UserService.prototype.confirm = function (user) {
        return this.httpClient.post(this.url + 'post?url=user/confirm', user);
    };
    UserService.prototype.createPractitionerUser = function (user) {
        return this.httpClient.post(this.url + 'post?url=user/create', user);
    };
    UserService.prototype.impersonatePractitioner = function (practitionerId) {
        return this.httpClient.get(this.url + 'get?url=user/ImpersonatePractitioner/' + practitionerId);
    };
    UserService.prototype.stopImpersonating = function () {
        return this.httpClient.get(this.url + 'get?url=user/StopImpersonating/');
    };
    UserService.prototype.getRoles = function () {
        return this.httpClient.get(this.url + 'get?url=user/roles');
    };
    UserService.prototype.saveUser = function (user) {
        return this.httpClient.post(this.url + "post?url=user/UpdateUserInfo", user);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map