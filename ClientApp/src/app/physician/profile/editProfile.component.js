"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var staff_1 = require("./models/staff");
var location_1 = require("../models/location");
var practitioner_1 = require("./models/practitioner");
var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(physicianService) {
        this.physicianService = physicianService;
        this.provider = new practitioner_1.Practitioner;
        this.staff = [];
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.physicianService.getProvider(6597551)
            .subscribe(function (p) {
            _this.provider = p;
        });
    };
    EditProfileComponent.prototype.addLocation = function () {
        var loc = new practitioner_1.PractitionerLocation;
        loc.Location = new location_1.Location;
        this.provider.PractitionerLocation.push(loc);
    };
    EditProfileComponent.prototype.addStaff = function () {
        this.staff.push(new staff_1.Staff);
    };
    EditProfileComponent.prototype.save = function () {
        //this.physicianService.saveProvider(this.provider)
        //  .subscribe(x => x);
    };
    EditProfileComponent = __decorate([
        core_1.Component({
            selector: 'edit-profile',
            templateUrl: './editProfile.component.html',
            styleUrls: ['./practice/practice-profile.component.css']
        })
    ], EditProfileComponent);
    return EditProfileComponent;
}());
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=editProfile.component.js.map