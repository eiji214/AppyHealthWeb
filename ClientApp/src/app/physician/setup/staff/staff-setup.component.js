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
var staff_dialog_component_1 = require("./staff-dialog.component");
var StaffSetupComponent = /** @class */ (function () {
    function StaffSetupComponent(physicianService, dialog) {
        this.physicianService = physicianService;
        this.dialog = dialog;
        this.healthSystems = [];
        this.navigate = new core_1.EventEmitter();
        this.setHealthSystem = new core_1.EventEmitter();
        this.practitionerHealthSystems = [];
    }
    Object.defineProperty(StaffSetupComponent.prototype, "hs", {
        set: function (hs) {
            var _this = this;
            this.healthSystem = hs;
            this.practitionerHealthSystems = hs.staff;
            if (!this.practitionerHealthSystems) {
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
    StaffSetupComponent.prototype.openDialog = function (p) {
        var _this = this;
        var dialogRef = this.dialog.open(staff_dialog_component_1.StaffDialogComponent, {
            width: '900px', disableClose: true,
            data: { provider: p, healthSystems: this.healthSystems, physicians: this.healthSystem.physicians }
        });
        dialogRef.afterClosed().subscribe(function (pResult) {
            if (pResult) {
                _this.confirm(pResult.provider, pResult.role);
            }
        });
    };
    StaffSetupComponent.prototype.edit = function (p) {
        this.openDialog(p);
    };
    StaffSetupComponent.prototype.remove = function (p, index) {
        var _this = this;
        p.healthSystems.forEach(function (x) {
            _this.physicianService.removeUserFromHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, p.staff.Id)
                .subscribe(function (result) {
                _this.practitionerHealthSystems.splice(index, 1);
            });
        });
    };
    StaffSetupComponent.prototype.back = function () {
        this.navigate.emit(false);
    };
    StaffSetupComponent.prototype.continue = function () {
        this.healthSystem.staff = this.practitionerHealthSystems;
        this.setHealthSystem.emit(this.healthSystem);
    };
    StaffSetupComponent.prototype.confirm = function (provider, role) {
        var _this = this;
        var p = provider.practitioner;
        p.Title = role;
        var h = provider.healthSystems;
        var staff = provider.staff;
        if (!staff) {
            var s = new staff_1.Staff;
            s.Email = p.PrimaryEmailAddress;
            s.Name = p.FullName;
            s.CreateDate = new Date;
            s.RequiresPayment = false;
            s.Role = role;
            this.physicianService.addUser(s)
                .subscribe(function (result) {
                provider.staff = result;
                h.forEach(function (x) {
                    _this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, result.Id, 1)
                        .subscribe();
                });
                _this.practitionerHealthSystems.push(provider);
            });
        }
        else {
            h.forEach(function (x) {
                _this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, staff.Id, 1)
                    .subscribe();
            });
        }
    };
    __decorate([
        core_1.Input()
    ], StaffSetupComponent.prototype, "hs", null);
    __decorate([
        core_1.Output()
    ], StaffSetupComponent.prototype, "navigate", void 0);
    __decorate([
        core_1.Output()
    ], StaffSetupComponent.prototype, "setHealthSystem", void 0);
    StaffSetupComponent = __decorate([
        core_1.Component({
            selector: 'staff-setup',
            templateUrl: './staff-setup.component.html',
            styleUrls: ['../setup.component.css']
        })
    ], StaffSetupComponent);
    return StaffSetupComponent;
}());
exports.StaffSetupComponent = StaffSetupComponent;
//# sourceMappingURL=staff-setup.component.js.map