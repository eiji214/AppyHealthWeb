"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var referrals_edit_component_1 = require("../referrals-edit/referrals-edit.component");
var confirm_dialog_component_1 = require("../confirm-dialog/confirm-dialog.component");
var patient_next_appt_component_1 = require("../patient-next-appt/patient-next-appt.component");
var ReferralsListComponent = /** @class */ (function () {
    function ReferralsListComponent(referralService, dialog) {
        this.referralService = referralService;
        this.dialog = dialog;
        this.statuses = ['Created', 'Patient Availability Set', 'Provider Availability Set', 'User Selected Appointment', 'Appointment Scheduled'];
    }
    ReferralsListComponent.prototype.getStatusIndex = function (status) {
        return this.statuses.indexOf(status);
    };
    ReferralsListComponent.prototype.setAppointment = function (referralId, event) {
        var _this = this;
        event.stopPropagation();
        this.referralService.getReferral(referralId).subscribe(function (x) {
            _this.dialog.open(referrals_edit_component_1.ReferralsEditComponent, { data: x });
        });
    };
    ReferralsListComponent.prototype.setNextAppointment = function (referralId, patientId, provider) {
        var _this = this;
        this.referralService.getReferral(referralId).subscribe(function (d) {
            _this.referral = d;
            if (d == null) {
                _this.newReferral.PractitionerId = provider.Id;
                _this.newReferral.PatientId = patientId;
                _this.referralService.createReferral(_this.newReferral).subscribe(function (x) {
                    _this.newReferral = x;
                    _this.dialog.open(patient_next_appt_component_1.PatientNextApptComponent, { data: _this.newReferral });
                });
            }
            else {
                _this.dialog.open(patient_next_appt_component_1.PatientNextApptComponent, { data: _this.referral });
            }
        });
    };
    ReferralsListComponent.prototype.deactivateReferral = function (referralId) {
        this.referralService.deactivateReferral(referralId).subscribe(function (result) {
            var abc = result;
        });
        window.location.reload(false);
        // for (var i = 0; i < this.referrals.length; i++) {
        //  var removedReferral = this.referrals.find(y => y.Id === referralId);
        //  this.referrals.splice(this.referrals.indexOf(removedReferral), 1);
        // }
    };
    ReferralsListComponent.prototype.openDeactivateReferralDialog = function (referralId) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialog, {
            data: { entryId: referralId, confirmTitle: 'Would you like to delete this referral?' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.deactivateReferral(result);
            }
        });
    };
    __decorate([
        core_1.Input()
    ], ReferralsListComponent.prototype, "referrals", void 0);
    ReferralsListComponent = __decorate([
        core_1.Component({
            selector: 'app-referrals-list',
            templateUrl: './referrals-list.component.html',
            styleUrls: ['./referrals-list.component.scss']
        })
    ], ReferralsListComponent);
    return ReferralsListComponent;
}());
exports.ReferralsListComponent = ReferralsListComponent;
//# sourceMappingURL=referrals-list.component.js.map