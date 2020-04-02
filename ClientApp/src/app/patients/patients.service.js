"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PatientService = /** @class */ (function () {
    function PatientService(httpClient) {
        this.httpClient = httpClient;
        this.url = '/api/';
    }
    PatientService.prototype.getFilters = function () {
        var filter = {
            searchText: '', filters: [
                { ParentCategory: 'Specialty', ChildCategories: [{ Name: 'Allergy & Immunology', Id: 1 },
                        { Name: 'Anatomic/Clinical Pathology', Id: 1 },
                        { Name: 'Anesthesialogy', Id: 1 },
                        { Name: 'Cardiovascular Disease', Id: 1 }] },
                { ParentCategory: 'Hospital', ChildCategories: [{ Name: 'Hosp1', Id: 1 }, { Name: 'Hosp2', Id: 2 }] }
            ]
        };
        return filter;
    };
    PatientService.prototype.getPatients = function () {
        return this.httpClient.get(this.url + 'get?url=patients');
    };
    PatientService.prototype.getPatientsFTS = function (searchTerm) {
        return this.httpClient.get(encodeURI(this.url + 'get?url=patients/GetFTS/' + searchTerm));
    };
    PatientService.prototype.getPatient = function (id) {
        return this.httpClient.get(this.url + 'get?url=patients/' + id);
    };
    PatientService.prototype.createPatient = function (patient) {
        console.log(patient);
        return this.httpClient.post(this.url + 'post?url=patients/Create', patient);
    };
    PatientService.prototype.updatePatient = function (patient) {
        console.log(patient);
        return this.httpClient.put(this.url + 'put?url=patients/Update', patient);
    };
    PatientService.prototype.updatePatientInsurance = function (patient) {
        return this.httpClient.put(this.url + 'put?url=patients/UpdateInsurance', patient);
    };
    PatientService.prototype.deletePatient = function (id) {
        this.httpClient.delete(this.url + 'delete`?url=patients/Delete/' + id);
    };
    PatientService.prototype.deactivatePatient = function (id) {
        this.httpClient.delete(this.url + 'delete?url=patients/Deactivate/' + id);
    };
    PatientService.prototype.sendMessage = function (patientId, emailMessage) {
        console.log(emailMessage);
        return this.httpClient.post(this.url + 'post?url=patients/SendMessage/' + patientId, emailMessage);
    };
    PatientService.prototype.getLandingPagePatients = function (searchTerm) {
        return this.httpClient.get(encodeURI(this.url + 'get?url=patients/GetLandingPage/?searchTerm=' + searchTerm));
    };
    PatientService = __decorate([
        core_1.Injectable()
    ], PatientService);
    return PatientService;
}());
exports.PatientService = PatientService;
//# sourceMappingURL=patients.service.js.map