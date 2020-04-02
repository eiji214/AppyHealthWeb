"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var confirm_delete_dialog_component_1 = require("./confirm-delete-dialog.component");
var PatientDetailLeftPanelComponent = /** @class */ (function () {
    function PatientDetailLeftPanelComponent(patientsService, dialog) {
        this.patientsService = patientsService;
        this.dialog = dialog;
    }
    PatientDetailLeftPanelComponent.prototype.ngOnInit = function () {
    };
    PatientDetailLeftPanelComponent.prototype.deactivatePatient = function (patientId) {
        this.patientsService.deactivatePatient(patientId).subscribe(function () {
            window.location.href = '/physician/Patients/' + patientId;
        });
    };
    PatientDetailLeftPanelComponent.prototype.openDeleteDialog = function (patientId) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_dialog_component_1.ConfirmDeleteDialog, {
            data: { patientId: patientId }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.deactivatePatient(result);
        });
    };
    __decorate([
        core_1.Input()
    ], PatientDetailLeftPanelComponent.prototype, "patient", void 0);
    PatientDetailLeftPanelComponent = __decorate([
        core_1.Component({
            selector: 'app-patient-detail-left-panel',
            templateUrl: './patient-detail-left-panel.component.html',
            styleUrls: ['./patient-detail-left-panel.component.scss',
                '../../styles.scss']
        })
    ], PatientDetailLeftPanelComponent);
    return PatientDetailLeftPanelComponent;
}());
exports.PatientDetailLeftPanelComponent = PatientDetailLeftPanelComponent;
//# sourceMappingURL=patient-detail-left-panel.component.js.map