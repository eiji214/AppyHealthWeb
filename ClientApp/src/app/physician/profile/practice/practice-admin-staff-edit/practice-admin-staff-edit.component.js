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
var practice_panel_enum_1 = require("../../../../shared/enums/practice-panel.enum");
var PracticeAdminStaffEditComponent = /** @class */ (function () {
    function PracticeAdminStaffEditComponent(userService, dialogRef, data) {
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.actionName = 'Edit';
        this.panelType = 0;
        this.isEdit = true;
        this.roles = [];
        this.actionName = data.id > 0 ? this.actionName : 'Add';
        this.isEdit = data.id > 0;
    }
    PracticeAdminStaffEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var user = this.data;
        this.userService.getRoles()
            .subscribe(function (result) {
            _this.roles = result.filter(function (x) { return x.Code === "Staff"; }).map(function (x) { return x.Name; });
            _this.roles.sort();
        });
    };
    PracticeAdminStaffEditComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    PracticeAdminStaffEditComponent.prototype.onOkClick = function () {
        this.dialogRef.close(this.data);
    };
    Object.defineProperty(PracticeAdminStaffEditComponent.prototype, "practicePanelEnum", {
        get: function () { return practice_panel_enum_1.PracticePanelEnum; },
        enumerable: true,
        configurable: true
    });
    PracticeAdminStaffEditComponent = __decorate([
        core_1.Component({
            selector: 'app-practice-admin-staff-edit',
            templateUrl: './practice-admin-staff-edit.component.html',
            styleUrls: ['./practice-admin-staff-edit.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], PracticeAdminStaffEditComponent);
    return PracticeAdminStaffEditComponent;
}());
exports.PracticeAdminStaffEditComponent = PracticeAdminStaffEditComponent;
//# sourceMappingURL=practice-admin-staff-edit.component.js.map