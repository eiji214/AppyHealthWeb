"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var PatientVerificationComponent = /** @class */ (function () {
    function PatientVerificationComponent(dialogRef, data, patientsService, insurancePlanService, fileUploadService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.patientsService = patientsService;
        this.insurancePlanService = insurancePlanService;
        this.fileUploadService = fileUploadService;
        this.frontUploaded = false;
        this.backUploaded = false;
    }
    PatientVerificationComponent.prototype.ngOnInit = function () {
        this.patient$ = this.patientsService.getPatient(this.data.patientId);
        this.insurancePlan$ = this.insurancePlanService.getInsurancePlans();
    };
    PatientVerificationComponent.prototype.verifyPatient = function (patient) {
        var _this = this;
        this.patientsService.updatePatientInsurance(patient).subscribe(function () {
            _this.uploadInsurancePlanFrontPicture(patient.Id).subscribe(function () {
                _this.uploadInsurancePlanBackPicture(patient.Id).subscribe(function () {
                    _this.dialogRef.close();
                });
            });
        });
    };
    PatientVerificationComponent.prototype.uploadFront = function (patientId) {
        this.uploadInsurancePlanFrontPicture(patientId);
        this.frontUploaded = true;
    };
    PatientVerificationComponent.prototype.uploadBack = function (patientId) {
        this.uploadInsurancePlanBackPicture(patientId);
        this.backUploaded = true;
    };
    PatientVerificationComponent.prototype.uploadInsurancePlanFrontPicture = function (patientId) {
        var fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            var fileToUpload = fi.files[0];
            return this.fileUploadService.
                uploadInsurancePlanFrontPicture(fileToUpload, patientId);
        }
    };
    PatientVerificationComponent.prototype.uploadInsurancePlanBackPicture = function (patientId) {
        var fi = this.fileInput2.nativeElement;
        if (fi.files && fi.files[0]) {
            var fileToUpload = fi.files[0];
            return this.fileUploadService.
                uploadInsurancePlanBackPicture(fileToUpload, patientId);
        }
        //window.location.reload();
    };
    __decorate([
        core_1.ViewChild('fileInput')
    ], PatientVerificationComponent.prototype, "fileInput", void 0);
    __decorate([
        core_1.ViewChild('fileInput2')
    ], PatientVerificationComponent.prototype, "fileInput2", void 0);
    PatientVerificationComponent = __decorate([
        core_1.Component({
            selector: 'app-patient-verification',
            templateUrl: './patient-verification.component.html',
            styleUrls: ['./patient-verification.component.scss',
                '../../styles.scss']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], PatientVerificationComponent);
    return PatientVerificationComponent;
}());
exports.PatientVerificationComponent = PatientVerificationComponent;
//# sourceMappingURL=patient-verification.component.js.map