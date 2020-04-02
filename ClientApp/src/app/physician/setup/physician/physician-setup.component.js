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
var physician_dialog_component_1 = require("./physician-dialog.component");
var PhysicianSetupComponent = /** @class */ (function () {
    function PhysicianSetupComponent(physicianService, dialog) {
        this.physicianService = physicianService;
        this.dialog = dialog;
        this.healthSystems = [];
        this.navigate = new core_1.EventEmitter();
        this.setHealthSystem = new core_1.EventEmitter();
        this.practitionerHealthSystems = [];
    }
    Object.defineProperty(PhysicianSetupComponent.prototype, "hs", {
        set: function (hs) {
            var _this = this;
            this.healthSystem = hs;
            this.practitionerHealthSystems = hs.physicians;
            if (!hs.physicians) {
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
    PhysicianSetupComponent.prototype.openDialog = function (p) {
        var _this = this;
        var dialogRef = this.dialog.open(physician_dialog_component_1.PhysicianDialogComponent, {
            width: '900px', disableClose: true,
            data: { provider: p, healthSystems: this.healthSystems }
        });
        dialogRef.afterClosed().subscribe(function (pResult) {
            if (pResult) {
                _this.confirm(pResult);
            }
        });
    };
    PhysicianSetupComponent.prototype.edit = function (p) {
        this.openDialog(p);
    };
    PhysicianSetupComponent.prototype.remove = function (p, index) {
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
    PhysicianSetupComponent.prototype.back = function () {
        this.navigate.emit(false);
    };
    PhysicianSetupComponent.prototype.continue = function () {
        this.healthSystem.physicians = this.practitionerHealthSystems;
        this.setHealthSystem.emit(this.healthSystem);
    };
    PhysicianSetupComponent.prototype.confirm = function (provider) {
        var _this = this;
        var p = provider.practitioner;
        var h = provider.healthSystems;
        if (p.Id) {
            this.physicianService.saveProvider(p)
                .subscribe(function (result) {
                var staff = _this.createStaff(provider);
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
                result.Role = "Physician";
                _this.physicianService.updateStaff(result)
                    .subscribe(function (r) {
                    provider.healthSystems.forEach(function (x) {
                        _this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, result.Id, 1)
                            .subscribe();
                    });
                });
                //let staff = this.createStaff(provider);
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
    PhysicianSetupComponent.prototype.createStaff = function (provider) {
        var _this = this;
        if (!provider.staff) {
            var p = provider.practitioner;
            var s = new staff_1.Staff;
            s.Email = p.PrimaryEmailAddress;
            s.Name = p.FullName;
            s.PractitionerID = p.Id;
            s.RequiresPayment = true;
            s.CreateDate = new Date;
            s.Role = "Physician";
            this.physicianService.addUser(s)
                .subscribe(function (result) {
                provider.healthSystems.forEach(function (x) {
                    _this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, result.Id, 1)
                        .subscribe();
                });
                return result;
            });
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
    ], PhysicianSetupComponent.prototype, "hs", null);
    __decorate([
        core_1.Output()
    ], PhysicianSetupComponent.prototype, "navigate", void 0);
    __decorate([
        core_1.Output()
    ], PhysicianSetupComponent.prototype, "setHealthSystem", void 0);
    PhysicianSetupComponent = __decorate([
        core_1.Component({
            selector: 'physician-setup',
            templateUrl: './physician-setup.component.html',
            styleUrls: ['../setup.component.css']
        })
    ], PhysicianSetupComponent);
    return PhysicianSetupComponent;
}());
exports.PhysicianSetupComponent = PhysicianSetupComponent;
//# sourceMappingURL=physician-setup.component.js.map