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
var practitionerHealthSystems_1 = require("../../models/practitionerHealthSystems");
var practitioner_1 = require("../../profile/models/practitioner");
var StaffDialogComponent = /** @class */ (function () {
    function StaffDialogComponent(userService, dialogRef, data) {
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.healthSystemDropdownItems = [];
        this.physicians = [];
        this.roles = [];
        if (data && data.provider) {
            this.provider = data.provider;
            this.buttonText = "Save Changes";
            this.headerText = "Edit";
        }
        else {
            var phs = new practitionerHealthSystems_1.PractitionerHealthSystems;
            phs.practitioner = new practitioner_1.Practitioner;
            this.provider = phs;
            this.headerText = "Add";
            this.buttonText = "Add to Practice";
        }
        this.healthSystemDropdownItems = data.healthSystems;
        this.physicians = data.physicians;
    }
    StaffDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getRoles()
            .subscribe(function (result) {
            _this.roles = result.filter(function (x) { return x.Code === "Staff" || x.Code === "Medical Staff"; }).map(function (x) { return x.Name; });
            _this.roles.sort();
        });
    };
    StaffDialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    StaffDialogComponent.prototype.add = function () {
        this.dialogRef.close({ provider: this.provider, role: this.role });
    };
    StaffDialogComponent.prototype.locationSelected = function (event) {
        var val = event.value;
        if (!val) {
            this.selectedHealthSystem = null;
            return;
        }
        var dup = this.provider.healthSystems.filter(function (x) { return x.Id == val; });
        if (dup.length) {
            this.selectedHealthSystem = null;
            return;
        }
        var item = this.healthSystemDropdownItems.filter(function (x) { return x.Id == val; });
        this.provider.healthSystems.push(item[0]);
        this.selectedHealthSystem = null;
    };
    StaffDialogComponent.prototype.isValid = function () {
        return this.provider.healthSystems && this.provider.healthSystems.length > 0 &&
            this.role && this.role.length > 0 &&
            this.provider.practitioner.PrimaryEmailAddress && this.provider.practitioner.PrimaryEmailAddress.length > 0;
    };
    StaffDialogComponent = __decorate([
        core_1.Component({
            selector: 'staff-dialog',
            templateUrl: './staff-dialog.component.html',
            styleUrls: ['../setup.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], StaffDialogComponent);
    return StaffDialogComponent;
}());
exports.StaffDialogComponent = StaffDialogComponent;
//# sourceMappingURL=staff-dialog.component.js.map