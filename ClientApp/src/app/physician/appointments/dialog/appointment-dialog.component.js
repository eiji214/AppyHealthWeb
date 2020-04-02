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
var dialog_1 = require("@angular/material/dialog");
var AppointmentDialogComponent = /** @class */ (function () {
    function AppointmentDialogComponent(appointmentsService, dialogRef, data) {
        this.appointmentsService = appointmentsService;
        this.dialogRef = dialogRef;
        this.data = data;
        if (data && data.appointment) {
            this.buttonText = "Save Changes";
            this.headerText = "Edit";
        }
        else {
            this.headerText = "Add";
            this.buttonText = "Add Appointment";
        }
        this.referral = {};
        this.referral.PractitionerId = data.practitionerId;
        this.referral.AppointmentDate = data.date.date;
    }
    AppointmentDialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    AppointmentDialogComponent.prototype.add = function () {
        var _this = this;
        this.appointmentsService.createReferral(this.referral)
            .subscribe(function (result) {
            _this.dialogRef.close({});
        });
    };
    AppointmentDialogComponent = __decorate([
        core_1.Component({
            selector: 'appointment-dialog',
            templateUrl: './appointment-dialog.component.html',
            styleUrls: ['./appointment-dialog.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AppointmentDialogComponent);
    return AppointmentDialogComponent;
}());
exports.AppointmentDialogComponent = AppointmentDialogComponent;
//# sourceMappingURL=appointment-dialog.component.js.map