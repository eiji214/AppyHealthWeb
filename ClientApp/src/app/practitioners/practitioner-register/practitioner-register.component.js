"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PractitionerRegisterComponent = /** @class */ (function () {
    function PractitionerRegisterComponent(httpClient, practitionerService, userService) {
        this.httpClient = httpClient;
        this.practitionerService = practitionerService;
        this.userService = userService;
        this.npiNumber = '';
        this.isSubscribed = false;
        this.isSearching = false;
    }
    PractitionerRegisterComponent.prototype.ngOnInit = function () {
        this.practitioner = {};
        this.practitioner.Address = {};
    };
    PractitionerRegisterComponent.prototype.npiLookup = function (npi) {
        var _this = this;
        this.isSearching = true;
        this.practitionerService.npiLookup(npi).subscribe(function (data) {
            _this.isSearching = false;
            _this.practitioner.FirstName = data.basic.first_name,
                _this.practitioner.LastName = data.basic.last_name,
                _this.practitioner.PrimaryPhoneNumber = data.addresses[0].telephone_number,
                _this.practitioner.Gender = data.basic.gender,
                _this.practitioner.NPI = _this.npiNumber,
                _this.practitioner.Specialty = data.taxonomies[0].desc,
                _this.practitioner.Address.Line = data.addresses[0].address_1,
                _this.practitioner.Address.Line2 = data.addresses[0].address_2,
                _this.practitioner.Address.City = data.addresses[0].city,
                _this.practitioner.Address.State = data.addresses[0].state,
                _this.practitioner.Address.ZipCode = data.addresses[0].postal_code;
        });
    };
    PractitionerRegisterComponent.prototype.saveNewProvider = function (practitioner) {
        var _this = this;
        return this.practitionerService.createPractitioner(practitioner).subscribe(function (newPractitioner) {
            _this.createPractitionerUser(newPractitioner);
        });
    };
    PractitionerRegisterComponent.prototype.createPractitionerUser = function (practitioner) {
        var _this = this;
        return this.userService.createPractitionerUser(practitioner).subscribe(function (x) {
            _this.isSubscribed = true;
            console.log(window.location.href);
        });
    };
    PractitionerRegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-practitioner-register',
            templateUrl: './practitioner-register.component.html',
            styleUrls: ['./practitioner-register.component.scss',
                '../../styles.scss']
        })
    ], PractitionerRegisterComponent);
    return PractitionerRegisterComponent;
}());
exports.PractitionerRegisterComponent = PractitionerRegisterComponent;
//# sourceMappingURL=practitioner-register.component.js.map