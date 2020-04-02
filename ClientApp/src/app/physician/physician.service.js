"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PhysicianService = /** @class */ (function () {
    function PhysicianService(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = '/api/';
        //url = 'https://appyhealthapitest.azurewebsites.net/api';
        this.baseUrlProviders = '/api/providers';
    }
    PhysicianService.prototype.getPractitioner = function (id) {
        return this.httpClient.get(this.baseUrl + "get?url=providers/" + id);
    };
    PhysicianService.prototype.updatePractitioner = function (practitioner) {
        console.log(practitioner);
        return this.httpClient.put(this.baseUrl + "put?url=providers/Update", practitioner);
    };
    PhysicianService.prototype.getHealthSystem = function (id) {
        return this.httpClient.get(this.baseUrl + "get?url=healthsystem/" + id);
    };
    PhysicianService.prototype.getMyHealthSystems = function () {
        return this.httpClient.get(this.baseUrl + "get?url=user/myhealthsystems");
    };
    PhysicianService.prototype.getChildHealthSystems = function (id) {
        return this.httpClient.get(this.baseUrl + "get?url=healthsystem/Children/" + id);
    };
    PhysicianService.prototype.getHealthSystemPractitioners = function (id) {
        return this.httpClient.get(this.baseUrl + "get?url=healthsystem/Practitioners/" + id);
    };
    PhysicianService.prototype.getMyHealthSystemPhysicians = function () {
        return this.httpClient.get(this.baseUrl + "get?url=user/myassociates");
    };
    PhysicianService.prototype.getMyHealthSystemAdminUsers = function (healtSystemId) {
        return this.httpClient.get(this.baseUrl + "get?url=healthsystem/AdminUsers/" + healtSystemId);
    };
    PhysicianService.prototype.getMyHealthSystemNonphysicians = function () {
        return this.httpClient.get(this.baseUrl + "get?url=user/mynonphysicians");
    };
    PhysicianService.prototype.saveHealthSystem = function (healthSystem) {
        return this.httpClient.put(this.baseUrl + "put?url=healthsystem/update", healthSystem);
    };
    PhysicianService.prototype.updateHealthSystemLogo = function (providerId, file) {
        var input = new FormData();
        input.append('file', file, file.name);
        return this.httpClient.post(this.baseUrl + "PostForm?url=healthsystem/Photo/" + providerId, input);
    };
    PhysicianService.prototype.addHealthSystem = function (healthSystem) {
        return this.httpClient.post(this.baseUrl + "post?url=user/createhealthsystem", healthSystem);
    };
    PhysicianService.prototype.saveChildHealthSystem = function (id, childId) {
        return this.httpClient.put(this.baseUrl + "putnobody?url=healthsystem/Children/" + id + "/" + childId, null);
    };
    PhysicianService.prototype.getProvider = function (id) {
        return this.httpClient.get(this.baseUrl + "get?url=providers/" + id);
    };
    PhysicianService.prototype.saveProvider = function (provider) {
        return this.httpClient.put(this.baseUrl + "put?url=providers/Update", provider);
    };
    PhysicianService.prototype.addPractitioner = function (provider) {
        return this.httpClient.post(this.baseUrl + "post?url=user/create", provider);
    };
    PhysicianService.prototype.addLocation = function (healthSystem) {
        return this.httpClient.post(this.baseUrl + "post?url=healthsystem/createlocation", healthSystem);
    };
    PhysicianService.prototype.deleteLocation = function (id) {
        return this.httpClient.delete(this.baseUrl + "delete?url=healthsystem/deletelocation/" + id);
    };
    PhysicianService.prototype.searchHealthSystem = function (npi) {
        return this.httpClient.get(this.baseUrl + "get?url=NPI/SearchNPI/2/" + npi);
    };
    PhysicianService.prototype.searchProvider = function (npi) {
        return this.httpClient.get(this.baseUrl + "get?url=NPI/SearchNPI/1/" + npi);
    };
    PhysicianService.prototype.addPractitionerToHealthSystem = function (healthSystemId, practitionerId) {
        return this.httpClient.put(this.baseUrl + "putnobody?url=healthsystem/AddPractitioner/" + healthSystemId + "/" + practitionerId, null);
    };
    PhysicianService.prototype.removePractitionerFromHealthSystem = function (healthSystemId, practitionerId) {
        return this.httpClient.delete(this.baseUrl + "delete?url=healthsystem/RemovePractitioner/" + healthSystemId + "/" + practitionerId);
    };
    PhysicianService.prototype.removeChildHealthSystem = function (id, childId) {
        return this.httpClient.delete(this.baseUrl + "delete?url=healthsystem/Children/" + id + "/" + childId);
    };
    PhysicianService.prototype.getMe = function () {
        return this.httpClient.get(this.baseUrl + 'get?url=user/');
    };
    PhysicianService.prototype.addUser = function (s) {
        return this.httpClient.post(this.baseUrl + "post?url=user/createstaff", s);
    };
    PhysicianService.prototype.updateStaff = function (s) {
        return this.httpClient.post(this.baseUrl + "post?url=user/updatestaff", s);
    };
    PhysicianService.prototype.updateUser = function (u) {
        return this.httpClient.post(this.baseUrl + "post?url=user/updatestaff", u);
    };
    PhysicianService.prototype.addUserToHealthSystem = function (healthSystemId, locationId, userId, userRoleId) {
        return this.httpClient.put(this.baseUrl + "putnobody?url=healthsystem/AddLocationUser/" + healthSystemId + "/" + locationId + "/" + userId + "/" + userRoleId, null);
    };
    PhysicianService.prototype.removeUserFromHealthSystem = function (healthSystemId, locationId, userId) {
        return this.httpClient.delete(this.baseUrl + "delete?url=healthsystem/RemoveLocationUser/" + healthSystemId + "/" + locationId + "/" + userId);
    };
    PhysicianService.prototype.uploadPhoto = function (file, providerId) {
        var input = new FormData();
        input.append('file', file, file.name);
        return this.httpClient.post(this.baseUrl + "PostForm?url=providers/Photo/" + providerId, input);
    };
    PhysicianService.prototype.getTiers = function () {
        return this.httpClient.get(this.baseUrl + "get?url=healthSystem/Tiers");
    };
    PhysicianService.prototype.putSubscribeTire = function (healthSystem, tierId) {
        return this.httpClient.put(this.baseUrl + "put?url=healthsystem/SubscribeTier/" + healthSystem.Id + "/" + tierId, healthSystem);
    };
    PhysicianService.prototype.putUpdateMyAssociates = function (User) {
        return this.httpClient.post(this.baseUrl + "post?url=user/updatestaff", User);
    };
    PhysicianService.prototype.updatePaymentInformation = function (paymentInfo) {
        return this.httpClient.post(this.baseUrl + "post?url=healthsystem/UpdatePaymentInformation", paymentInfo);
    };
    PhysicianService = __decorate([
        core_1.Injectable()
    ], PhysicianService);
    return PhysicianService;
}());
exports.PhysicianService = PhysicianService;
//# sourceMappingURL=physician.service.js.map