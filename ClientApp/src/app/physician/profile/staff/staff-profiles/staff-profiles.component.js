"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var lodash_1 = require("lodash");
var StaffProfilesComponent = /** @class */ (function () {
    function StaffProfilesComponent(physicianService) {
        this.physicianService = physicianService;
        this.doctors = [];
    }
    StaffProfilesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.physicianService.getMyHealthSystemPhysicians()
            .subscribe(function (p) {
            var physicians = lodash_1.uniqBy(p, 'Id');
            physicians = physicians.filter(function (p) { return p.Users.length > 0; })
                .filter(function (p) { return p.Users[0].Role !== 'Physician' && p.Users[0].PractitionerID !== null; });
            _this.doctors = physicians;
        });
    };
    StaffProfilesComponent = __decorate([
        core_1.Component({
            selector: 'app-staff-profiles',
            templateUrl: './staff-profiles.component.html',
            styleUrls: ['./staff-profiles.component.css']
        })
    ], StaffProfilesComponent);
    return StaffProfilesComponent;
}());
exports.StaffProfilesComponent = StaffProfilesComponent;
//# sourceMappingURL=staff-profiles.component.js.map