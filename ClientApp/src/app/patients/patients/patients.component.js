"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var patient_new_component_1 = require("../../patients/patient-new/patient-new.component");
var automated_message_component_1 = require("../automated-message/automated-message.component");
var patient_verification_component_1 = require("../patient-verification/patient-verification.component");
var PatientsComponent = /** @class */ (function () {
    function PatientsComponent(patientsService, userService, chatService, dialog) {
        this.patientsService = patientsService;
        this.userService = userService;
        this.chatService = chatService;
        this.dialog = dialog;
        this.currentUserId = 2;
    }
    PatientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filteredPatients = [];
        this.patients = [];
        // this.patientsService.getPatients().subscribe(patients => {
        //   this.patients = patients as Patient[];
        //   // this.filteredPatients = this.patients;
        // });
        this.filter = this.patientsService.getFilters();
        this.userService.getUser().subscribe(function (x) { return _this.user = x; });
    };
    PatientsComponent.prototype.openNewPatientDialog = function () {
        var dialogRef = this.dialog.open(patient_new_component_1.PatientNewComponent, {
            width: '982px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    PatientsComponent.prototype.openPatientVerificationDialog = function ($event, patientId) {
        $event.stopPropagation();
        var dialogref = this.dialog.open(patient_verification_component_1.PatientVerificationComponent, {
            width: '60vw',
            data: { patientId: patientId }
        });
        dialogref.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    PatientsComponent.prototype.openAutomatedMessageDialog = function ($event, patientId) {
        $event.stopPropagation();
        var dialogref = this.dialog.open(automated_message_component_1.AutomatedMessageComponent, {
            width: '60vw',
            data: { patientId: patientId }
        });
        dialogref.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    PatientsComponent.prototype.startChat = function (patientId) {
        this.chatService.startChat(patientId).subscribe(function (data) {
            location.href = '/chats?patientId=' + patientId;
        });
    };
    PatientsComponent = __decorate([
        core_1.Component({
            selector: 'app-patients',
            templateUrl: './patients.component.html',
            styleUrls: ['./patients.component.scss',
                '../../styles.scss']
        })
    ], PatientsComponent);
    return PatientsComponent;
}());
exports.PatientsComponent = PatientsComponent;
//# sourceMappingURL=patients.component.js.map