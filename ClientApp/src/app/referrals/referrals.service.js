"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ReferralsService = /** @class */ (function () {
    function ReferralsService(httpClient) {
        this.httpClient = httpClient;
        this.url = '/api/';
    }
    //new refferal
    ReferralsService.prototype.getPracticeIncoming = function () {
        return this.httpClient.get(this.url + 'get?url=referrals/PracticeIncoming');
    };
    ReferralsService.prototype.getPracticeOutgoing = function () {
        return this.httpClient.get(this.url + 'get?url=referrals/PracticeOutgoing ');
    };
    ReferralsService.prototype.getPracticePatient = function () {
        return this.httpClient.get(this.url + 'get?url=referrals/PracticePatient  ');
    };
    ReferralsService.prototype.getReferrals = function () {
        return this.httpClient.get(this.url + 'get?url=referrals/');
    };
    ReferralsService.prototype.getReferral = function (id) {
        return this.httpClient.get(this.url + 'get?url=referrals/GetReferral/' + id);
    };
    ReferralsService.prototype.getSpecialistReferrals = function (id) {
        return this.httpClient.get(this.url + 'get?url=referrals/Specialist/' + id);
    };
    ReferralsService.prototype.getPatientProviderReferral = function (patientId, doctorId) {
        return this.httpClient.get(this.url + 'get?url=referrals/GetPatientProvider/' + patientId + '/' + doctorId);
    };
    ReferralsService.prototype.getUpcomingReferrals = function (id) {
        return this.httpClient.get(this.url + 'get?url=referrals/GetUpcomingReferrals/' + id);
    };
    ReferralsService.prototype.getActiveReferrals = function (id) {
        return this.httpClient.get(this.url + 'get?url=referrals/PracticeReferrals/' + id);
    };
    ReferralsService.prototype.getPastReferrals = function (id) {
        return this.httpClient.get(this.url + 'get?url=referrals/GetPastReferrals/' + id);
    };
    ReferralsService.prototype.createReferral = function (referral) {
        return this.httpClient.post(this.url + 'post?url=referrals/CreateReferral', referral);
    };
    ReferralsService.prototype.CreateOrUpdateReferral = function (referral) {
        return this.httpClient.post(this.url + 'post?url=referrals/CreateOrUpdateReferral', referral);
    };
    ReferralsService.prototype.deactivateReferral = function (referralId) {
        return this.httpClient.delete(this.url + 'delete?url=referrals/DeactivateReferral/' + referralId);
    };
    ReferralsService.prototype.getPatientAppointmentsNotes = function (id) {
        return this.httpClient.get(this.url + 'get?url=referrals/GetPatientAppointmentsNotes/' + id);
    };
    ReferralsService.prototype.updateAvailability = function (referral) {
        return this.httpClient.put(this.url + 'put?url=referrals/' + referral.Id, referral);
    };
    ReferralsService.prototype.createAppointmentNote = function (appointmentNote) {
        return this.httpClient.post(this.url + 'post?url=referrals/CreateAppointmentNote', appointmentNote);
    };
    ReferralsService.prototype.getSymptoms = function () {
        return this.httpClient.get(this.url + 'get?url=symptoms/');
    };
    ReferralsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ReferralsService);
    return ReferralsService;
}());
exports.ReferralsService = ReferralsService;
//# sourceMappingURL=referrals.service.js.map