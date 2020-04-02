"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var healthSystem_1 = require("../../models/healthSystem");
var practice_overview_edit_component_1 = require("./practice-overview-edit/practice-overview-edit.component");
var practice_admin_staff_edit_component_1 = require("./practice-admin-staff-edit/practice-admin-staff-edit.component");
var practice_panel_enum_1 = require("../../../shared/enums/practice-panel.enum");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// import { User } from '../../ src/app/common/models/user';
// import { User } from './../../../core/model/user';
var user_1 = require("./../../../physician/models/user");
var PracticeProfileComponent = /** @class */ (function () {
    function PracticeProfileComponent(physicianService, dialog, route) {
        this.physicianService = physicianService;
        this.dialog = dialog;
        this.route = route;
        this.healthSystem = new healthSystem_1.HealthSystem;
        this.adminStaff = [];
        this.displayedColumns = ['Title', 'FullName', 'PrimaryPhoneNumber', 'PrimaryEmail', 'actions'];
        this.unsubscribeAll$ = new rxjs_1.Subject();
    }
    PracticeProfileComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeAll$.next(true);
        this.unsubscribeAll$.unsubscribe();
    };
    PracticeProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.pipe(operators_1.takeUntil(this.unsubscribeAll$)).subscribe(function (params) {
            _this.healthSystemId = params['id'];
            if (_this.healthSystemId) {
                _this.physicianService.getHealthSystem(_this.healthSystemId).subscribe(function (p) {
                    _this.healthSystem = p[0];
                });
                _this.physicianService.getMyHealthSystemAdminUsers(_this.healthSystemId)
                    .subscribe(function (p) {
                    _this.adminStaff = p;
                });
            }
        });
    };
    PracticeProfileComponent.prototype.editOverview = function (panel) {
        var _this = this;
        var dialogRef = this.dialog.open(practice_overview_edit_component_1.PracticeOverviewEditComponent, {
            width: '50vw',
            data: {
                healthSystem: JSON.parse(JSON.stringify(this.healthSystem)),
                panelType: panel
            },
            position: { top: '15vh' },
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.physicianService.saveHealthSystem(result.healthSystem)
                    .subscribe(function (SavedH) {
                    _this.healthSystem = SavedH;
                });
            }
        });
    };
    Object.defineProperty(PracticeProfileComponent.prototype, "practicePanelEnum", {
        get: function () { return practice_panel_enum_1.PracticePanelEnum; },
        enumerable: true,
        configurable: true
    });
    PracticeProfileComponent.prototype.editAdminStaff = function (id) {
        var _this = this;
        var thisUser = new user_1.User;
        if (id && id > 0) {
            thisUser = this.adminStaff.filter(function (a) { return a.Id == id; })[0];
        }
        var dialogRef = this.dialog.open(practice_admin_staff_edit_component_1.PracticeAdminStaffEditComponent, {
            width: '50vw',
            data: {
                user: JSON.parse(JSON.stringify(thisUser)),
                id: id,
            },
            position: { top: '15vh' },
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.physicianService.updateUser(result.user)
                .subscribe(function (SavedH) {
                var user = SavedH;
            });
        });
    };
    PracticeProfileComponent.prototype.remove = function (id) {
    };
    PracticeProfileComponent = __decorate([
        core_1.Component({
            selector: 'practice-profile',
            templateUrl: './practice-profile.component.html',
            styleUrls: ['./practice-profile.component.css']
        })
    ], PracticeProfileComponent);
    return PracticeProfileComponent;
}());
exports.PracticeProfileComponent = PracticeProfileComponent;
//# sourceMappingURL=practice-profile.component.js.map