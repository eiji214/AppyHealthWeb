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
var PhysicianDialogComponent = /** @class */ (function () {
    function PhysicianDialogComponent(physicianService, dialogRef, data) {
        this.physicianService = physicianService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.healthSystemDropdownItems = [];
        if (data && data.provider) {
            this.provider = data.provider;
            this.buttonText = "Save Changes";
            this.headerText = "Edit";
        }
        else {
            this.buttonText = "Add to Practice";
            this.headerText = "Add";
        }
        this.healthSystemDropdownItems = data.healthSystems;
    }
    PhysicianDialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    PhysicianDialogComponent.prototype.add = function () {
        this.dialogRef.close(this.provider);
    };
    PhysicianDialogComponent.prototype.locationSelected = function (event) {
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
    PhysicianDialogComponent.prototype.search = function () {
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
    PhysicianDialogComponent.prototype.enterManually = function () {
        var h = new practitionerHealthSystems_1.PractitionerHealthSystems;
        h.practitioner = new practitioner_1.Practitioner;
        h.healthSystems = [];
        this.provider = h;
    };
    PhysicianDialogComponent = __decorate([
        core_1.Component({
            selector: 'physician-dialog',
            templateUrl: './physician-dialog.component.html',
            styleUrls: ['../setup.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], PhysicianDialogComponent);
    return PhysicianDialogComponent;
}());
exports.PhysicianDialogComponent = PhysicianDialogComponent;
//# sourceMappingURL=physician-dialog.component.js.map