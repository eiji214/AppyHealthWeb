"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var UserService = /** @class */ (function () {
    function UserService(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = '/api/';
    }
    UserService.prototype.getUser = function () {
        if (!this.user) {
            this.user = this.httpClient
                .get(this.baseUrl + "get?url=user")
                .pipe(operators_1.shareReplay(1));
        }
        return this.user;
    };
    UserService.prototype.saveUser = function (user) {
        return this.httpClient.post(this.baseUrl + "post?url=user/UpdateUserInfo", user);
    };
    UserService.prototype.isLoggedIn = function () {
        return this.httpClient.get("/Session/IsLoggedIn");
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map