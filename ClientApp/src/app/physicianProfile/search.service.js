"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchService = /** @class */ (function () {
    function SearchService(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = 'https://appyhealthapitest.azurewebsites.net/api/';
    }
    SearchService.prototype.getSpecialty = function () {
        return this.httpClient.get(this.baseUrl + "specialty/v2");
    };
    SearchService.prototype.callSearchWeb = function (body) {
        return this.httpClient.post(this.baseUrl + "providers/CallSearchWeb", body);
    };
    SearchService.prototype.discoverByCategory = function (body) {
        return this.httpClient.post(this.baseUrl + "providers/DiscoverByCategory", body);
    };
    SearchService.prototype.getProviders = function (id) {
        return this.httpClient.get(this.baseUrl + "providers/Get/" + id);
    };
    SearchService.prototype.getProvidersFromSearch = function (data) {
        return this.httpClient.post(this.baseUrl + "providers/GetProvidersFromSearch", data);
    };
    SearchService.prototype.getHealthSystem = function (id) {
        return this.httpClient.get(this.baseUrl + "healthsystem/Get/" + id);
    };
    SearchService = __decorate([
        core_1.Injectable()
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map