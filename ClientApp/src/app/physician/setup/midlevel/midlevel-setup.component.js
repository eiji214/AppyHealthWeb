"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var staff_1 = require("../../models/staff");
var midlevel_dialog_component_1 = require("./midlevel-dialog.component");
var MidLevelSetupComponent = /** @class */ (function () {
    function MidLevelSetupComponent(physicianService, dialog) {
        this.physicianService = physicianService;
        this.dialog = dialog;
        this.healthSystems = [];
        this.navigate = new core_1.EventEmitter();
        this.setHealthSystem = new core_1.EventEmitter();
        this.practitionerHealthSystems = [];
    }
    Object.defineProperty(MidLevelSetupComponent.prototype, "hs", {
        set: function (hs) {
            var _this = this;
            this.healthSystem = hs;
            this.practitionerHealthSystems = hs.midLevels;
            if (!hs.midLevels) {
                this.practitionerHealthSystems = [];
            }
            this.healthSystems.push(this.healthSystem.primary);
            this.healthSystem.children.map(function (x) {
                _this.healthSystems.push(x);
            });
        },
        enumerable: true,
        configurable: true
    });
    MidLevelSetupComponent.prototype.openDialog = function (p) {
        var _this = this;
        var dialogRef = this.dialog.open(midlevel_dialog_component_1.MidLevelDialogComponent, {
            width: '900px', disableClose: true,
            data: { provider: p, healthSystems: this.healthSystems }
        });
        dialogRef.afterClosed().subscribe(function (pResult) {
            if (pResult) {
                _this.confirm(pResult.provider, pResult.role);
            }
        });
    };
    MidLevelSetupComponent.prototype.edit = function (p) {
        this.openDialog(p);
    };
    MidLevelSetupComponent.prototype.remove = function (p, index) {
        var _this = this;
        p.healthSystems.forEach(function (x) {
            _this.physicianService.removePractitionerFromHealthSystem(x.Id, p.practitioner.Id)
                .subscribe(function (result) {
                _this.practitionerHealthSystems.splice(index, 1);
            });
            _this.physicianService.removeUserFromHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, p.staff.Id)
                .subscribe();
        });
    };
    MidLevelSetupComponent.prototype.back = function () {
        this.navigate.emit(false);
    };
    MidLevelSetupComponent.prototype.continue = function () {
        this.healthSystem.midLevels = this.practitionerHealthSystems;
        this.setHealthSystem.emit(this.healthSystem);
    };
    MidLevelSetupComponent.prototype.confirm = function (provider, role) {
        var _this = this;
        var p = provider.practitioner;
        var h = provider.healthSystems;
        if (p.Id) {
            this.physicianService.saveProvider(p)
                .subscribe(function (result) {
                var staff = _this.createStaff(provider, role);
                provider.staff = staff;
                for (var i = 0; i < provider.healthSystems.length; i++) {
                    _this.physicianService.addPractitionerToHealthSystem(provider.healthSystems[i].Id, provider.practitioner.Id)
                        .subscribe(function (result) {
                    });
                }
                var item = _this.practitionerHealthSystems.filter(function (x) { return x.practitioner.NPI == provider.practitioner.NPI; });
                if (item.length) {
                    item[0] = provider;
                }
                else {
                    _this.practitionerHealthSystems.push(provider);
                }
            });
        }
        else {
            var names = p.FullName.split(" ");
            p.FirstName = names[0];
            p.LastName = names.length > 0 ? names[1] : "";
            this.physicianService.addPractitioner(p)
                .subscribe(function (result) {
                p.Id = result.PractitionerID;
                result.RequiresPayment = role == "NP" || role == "PA";
                result.Role = role;
                _this.physicianService.updateStaff(result)
                    .subscribe(function (r) {
                    provider.healthSystems.forEach(function (x) {
                        _this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, result.Id, 1)
                            .subscribe();
                    });
                });
                //let staff = this.createStaff(provider, role);
                provider.staff = result;
                for (var i = 0; i < provider.healthSystems.length; i++) {
                    _this.physicianService.addPractitionerToHealthSystem(provider.healthSystems[i].Id, provider.practitioner.Id)
                        .subscribe(function (result) {
                    });
                }
                var item = _this.practitionerHealthSystems.filter(function (x) { return x.practitioner.NPI == provider.practitioner.NPI; });
                if (item.length) {
                    item[0] = provider;
                }
                else {
                    _this.practitionerHealthSystems.push(provider);
                }
            });
        }
    };
    MidLevelSetupComponent.prototype.createStaff = function (provider, role) {
        var _this = this;
        if (!provider.staff) {
            var p = provider.practitioner;
            var s = new staff_1.Staff;
            s.Email = p.PrimaryEmailAddress;
            s.Name = p.FullName;
            s.PractitionerID = p.Id;
            s.CreateDate = new Date;
            s.RequiresPayment = true;
            s.Role = role;
            this.physicianService.addUser(s)
                .subscribe(function (result) {
                provider.healthSystems.forEach(function (x) {
                    _this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, result.Id, 1)
                        .subscribe();
                });
                return result;
            });
            return s;
        }
        else {
            provider.healthSystems.forEach(function (x) {
                _this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, provider.staff.Id, 1)
                    .subscribe();
            });
            return provider.staff;
        }
    };
    __decorate([
        core_1.Input()
    ], MidLevelSetupComponent.prototype, "hs", null);
    __decorate([
        core_1.Output()
    ], MidLevelSetupComponent.prototype, "navigate", void 0);
    __decorate([
        core_1.Output()
    ], MidLevelSetupComponent.prototype, "setHealthSystem", void 0);
    MidLevelSetupComponent = __decorate([
        core_1.Component({
            selector: 'midlevel-setup',
            templateUrl: './midlevel-setup.component.html',
            styleUrls: ['../setup.component.css']
        })
    ], MidLevelSetupComponent);
    return MidLevelSetupComponent;
}());
exports.MidLevelSetupComponent = MidLevelSetupComponent;
//# sourceMappingURL=midlevel-setup.component.js.map