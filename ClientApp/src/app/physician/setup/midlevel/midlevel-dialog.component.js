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
var MidLevelDialogComponent = /** @class */ (function () {
    function MidLevelDialogComponent(physicianService, userService, dialogRef, data) {
        this.physicianService = physicianService;
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.healthSystemDropdownItems = [];
        this.roles = [];
        this.healthSystemDropdownItems = data.healthSystems;
        if (data && data.provider) {
            this.provider = data.provider;
            this.buttonText = "Save Changes";
            this.headerText = "Edit";
            this.role = data.provider.staff.Role;
        }
        else {
            this.buttonText = "Add to Practice";
            this.headerText = "Add";
        }
    }
    MidLevelDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getRoles()
            .subscribe(function (result) {
            _this.roles = result.filter(function (x) { return x.Code === "Midlevel"; }).map(function (x) { return x.Name; });
            _this.roles.sort();
        });
    };
    MidLevelDialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    MidLevelDialogComponent.prototype.add = function () {
        this.dialogRef.close({ provider: this.provider, role: this.role });
    };
    MidLevelDialogComponent.prototype.locationSelected = function (event) {
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
    MidLevelDialogComponent.prototype.search = function () {
        var _this = this;
        this.showWarning = false;
        this.showError = false;
        this.physicianService.searchProvider(this.npi)
            .subscribe(function (result) {
            if (!result) {
                _this.showWarning = true;
                return;
            }
            else {
                _this.provider = new practitionerHealthSystems_1.PractitionerHealthSystems;
                _this.provider.practitioner = result;
            }
        }, function (error) {
            _this.showError = true;
        });
    };
    MidLevelDialogComponent.prototype.enterManually = function () {
        var h = new practitionerHealthSystems_1.PractitionerHealthSystems;
        h.practitioner = new practitioner_1.Practitioner;
        h.healthSystems = [];
        this.provider = h;
    };
    MidLevelDialogComponent.prototype.isValid = function () {
        return this.provider &&
            this.provider.healthSystems && this.provider.healthSystems.length > 0 &&
            this.role && this.role.length > 0 &&
            this.provider.practitioner.PrimaryEmailAddress && this.provider.practitioner.PrimaryEmailAddress.length > 0;
    };
    MidLevelDialogComponent = __decorate([
        core_1.Component({
            selector: 'midlevel-dialog',
            templateUrl: './midlevel-dialog.component.html',
            styleUrls: ['../setup.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], MidLevelDialogComponent);
    return MidLevelDialogComponent;
}());
exports.MidLevelDialogComponent = MidLevelDialogComponent;
//# sourceMappingURL=midlevel-dialog.component.js.map