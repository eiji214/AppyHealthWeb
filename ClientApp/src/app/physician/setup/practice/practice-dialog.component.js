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
var healthSystem_1 = require("../../models/healthSystem");
var healthSystemLocation_1 = require("../../models/healthSystemLocation");
var location_1 = require("../../models/location");
var PracticeDialogComponent = /** @class */ (function () {
    function PracticeDialogComponent(physicianService, dialogRef, data) {
        this.physicianService = physicianService;
        this.dialogRef = dialogRef;
        this.data = data;
        if (data.healthSystem && data.healthSystem.Id) {
            this.healthSystem = data.healthSystem;
            this.buttonText = "Save Changes";
            this.headerText = "Edit";
        }
        else {
            //this.healthSystem = new HealthSystem;
            this.buttonText = "Add New Practice to Profile";
            this.headerText = "Add";
        }
    }
    PracticeDialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    PracticeDialogComponent.prototype.add = function () {
        this.dialogRef.close(this.healthSystem);
    };
    PracticeDialogComponent.prototype.search = function () {
        var _this = this;
        this.showWarning = false;
        this.showError = false;
        this.physicianService.searchHealthSystem(this.npi)
            .subscribe(function (result) {
            if (!result) {
                _this.showWarning = true;
                return;
            }
            else {
                _this.healthSystem = result;
                if (_this.healthSystem.HealthSystemLocation && _this.healthSystem.HealthSystemLocation.length) {
                    _this.location = _this.healthSystem.HealthSystemLocation[0];
                }
            }
        }, function (error) {
            _this.showError = true;
        });
    };
    PracticeDialogComponent.prototype.enterManually = function () {
        var h = new healthSystem_1.HealthSystem;
        h.HealthSystemLocation = [];
        var l = new healthSystemLocation_1.HealthSystemLocation;
        l.Location = new location_1.Location;
        h.HealthSystemLocation.push(l);
        this.healthSystem = h;
    };
    PracticeDialogComponent = __decorate([
        core_1.Component({
            selector: 'practice-dialog',
            templateUrl: './practice-dialog.component.html',
            styleUrls: ['../setup.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], PracticeDialogComponent);
    return PracticeDialogComponent;
}());
exports.PracticeDialogComponent = PracticeDialogComponent;
//# sourceMappingURL=practice-dialog.component.js.map