"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppointmentsService = /** @class */ (function () {
    function AppointmentsService(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = '/api/';
    }
    AppointmentsService.prototype.getAssociates = function () {
        return this.httpClient.get(this.baseUrl + "get?url=user/myassociates");
    };
    AppointmentsService.prototype.getReferrals = function (practitionerId) {
        //let today = new Date();
        //let yyyy = today.getFullYear();
        //let m = today.getMonth() + 1;
        //let d = today.getDate();
        return this.httpClient.get(this.baseUrl + ("get?url=GetPractitionerNewPatientDashboard/" + practitionerId));
    };
    AppointmentsService.prototype.getPracticeIncoming = function () {
        return this.httpClient.get(this.baseUrl + "get?url=referrals/PracticeIncoming");
    };
    AppointmentsService.prototype.getPracticePatient = function () {
        return this.httpClient.get(this.baseUrl + "get?url=referrals/PracticePatient");
    };
    AppointmentsService.prototype.createReferral = function (referral) {
        return this.httpClient.post(this.baseUrl + 'post?url=referrals/CreateReferral', referral);
    };
    AppointmentsService = __decorate([
        core_1.Injectable()
    ], AppointmentsService);
    return AppointmentsService;
}());
exports.AppointmentsService = AppointmentsService;
//# sourceMappingURL=appointments.service.js.map