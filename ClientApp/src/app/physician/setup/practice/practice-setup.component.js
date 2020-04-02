"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var healthSystemLocation_1 = require("../../models/healthSystemLocation");
var healthSystemSetup_1 = require("../../models/healthSystemSetup");
var healthSystemCreate_1 = require("../../models/healthSystemCreate");
var practice_dialog_component_1 = require("./practice-dialog.component");
var PracticeSetupComponent = /** @class */ (function () {
    function PracticeSetupComponent(physicianService, dialog) {
        var _this = this;
        this.physicianService = physicianService;
        this.dialog = dialog;
        //healthSystem: HealthSystem;
        this.isPrimary = true;
        this.healthSystemSetup = new healthSystemSetup_1.HealthSystemSetup;
        this.setHealthSystem = new core_1.EventEmitter();
        this.physicianService.getMe()
            .subscribe(function (result) { return _this.me = result; });
    }
    Object.defineProperty(PracticeSetupComponent.prototype, "hs", {
        set: function (hs) {
            if (hs) {
                this.isPrimary = false;
                this.healthSystemSetup = hs;
            }
        },
        enumerable: true,
        configurable: true
    });
    PracticeSetupComponent.prototype.openDialog = function (healthSystem) {
        var _this = this;
        var dialogRef = this.dialog.open(practice_dialog_component_1.PracticeDialogComponent, {
            width: '900px', disableClose: true,
            data: { healthSystem: healthSystem }
        });
        dialogRef.afterClosed().subscribe(function (hs) {
            if (!hs) {
                return;
            }
            console.log(hs);
            //this.animal = result;
            if (_this.isPrimary) {
                if (hs.Id) {
                    _this.physicianService.saveHealthSystem(hs)
                        .subscribe(function (result) {
                        _this.isPrimary = false;
                        _this.healthSystemSetup.primary = hs;
                    });
                }
                else {
                    var hsc_1 = new healthSystemCreate_1.HealthSystemCreate;
                    hsc_1.healthsystem = hs;
                    hsc_1.location = hsc_1.healthsystem.HealthSystemLocation[0].Location;
                    hsc_1.user = _this.me;
                    hsc_1.location.Name = hsc_1.healthsystem.Name;
                    hsc_1.healthsystem.HealthSystemLocation = null;
                    _this.physicianService.addHealthSystem(hsc_1)
                        .subscribe(function (result) {
                        hs.Id = result.healthsystem.Id;
                        hs.HealthSystemLocation = [];
                        var hsl = new healthSystemLocation_1.HealthSystemLocation;
                        hsl.LocationId = result.location.Id;
                        hsl.Location = hsc_1.location;
                        hsl.Location.Id = result.location.Id;
                        hs.HealthSystemLocation.push(hsl);
                        _this.isPrimary = false;
                        _this.healthSystemSetup.primary = hs;
                    });
                }
            }
            else {
                if (hs.Id) {
                    _this.physicianService.saveHealthSystem(hs)
                        .subscribe(function (result) {
                        _this.physicianService.saveChildHealthSystem(_this.healthSystemSetup.primary.Id, hs.Id)
                            .subscribe(function (r) {
                            var item = _this.healthSystemSetup.children.filter(function (x) { return x.Id == hs.Id; });
                            if (item.length) {
                                item[0] = hs;
                            }
                            else {
                                _this.healthSystemSetup.children.push(hs);
                            }
                        });
                    });
                }
                else {
                    var hsc_2 = new healthSystemCreate_1.HealthSystemCreate;
                    hsc_2.healthsystem = hs;
                    hsc_2.location = hsc_2.healthsystem.HealthSystemLocation[0].Location;
                    hsc_2.user = _this.me;
                    hsc_2.location.Name = hsc_2.healthsystem.Name;
                    hsc_2.healthsystem.HealthSystemLocation = null;
                    _this.physicianService.addHealthSystem(hsc_2)
                        .subscribe(function (result) {
                        hs.Id = result.healthsystem.Id;
                        hs.HealthSystemLocation = [];
                        var hsl = new healthSystemLocation_1.HealthSystemLocation;
                        hsl.LocationId = result.location.Id;
                        hsl.Location = hsc_2.location;
                        hsl.Location.Id = result.location.Id;
                        hs.HealthSystemLocation.push(hsl);
                        _this.physicianService.saveChildHealthSystem(_this.healthSystemSetup.primary.Id, hs.Id)
                            .subscribe(function (r) {
                            var item = _this.healthSystemSetup.children.filter(function (x) { return x.Id == hs.Id; });
                            if (item.length) {
                                item[0] = hs;
                            }
                            else {
                                _this.healthSystemSetup.children.push(hs);
                            }
                        });
                    });
                }
            }
        });
    };
    PracticeSetupComponent.prototype.editPrimary = function () {
        this.openDialog(this.healthSystemSetup.primary);
        this.isPrimary = true;
    };
    PracticeSetupComponent.prototype.edit = function (h) {
        this.openDialog(h);
        this.isPrimary = false;
    };
    PracticeSetupComponent.prototype.remove = function (h, i) {
        var _this = this;
        this.physicianService.removeChildHealthSystem(this.healthSystemSetup.primary.Id, h.Id)
            .subscribe(function (result) {
            _this.healthSystemSetup.children.splice(i, 1);
        });
    };
    PracticeSetupComponent.prototype.confirm = function () {
        this.setHealthSystem.emit(this.healthSystemSetup);
    };
    __decorate([
        core_1.Input()
    ], PracticeSetupComponent.prototype, "hs", null);
    __decorate([
        core_1.Output()
    ], PracticeSetupComponent.prototype, "setHealthSystem", void 0);
    PracticeSetupComponent = __decorate([
        core_1.Component({
            selector: 'practice-setup',
            templateUrl: './practice-setup.component.html',
            styleUrls: ['../setup.component.css']
        })
    ], PracticeSetupComponent);
    return PracticeSetupComponent;
}());
exports.PracticeSetupComponent = PracticeSetupComponent;
//# sourceMappingURL=practice-setup.component.js.map